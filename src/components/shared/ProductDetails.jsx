// react
import React, { Component, memo } from "react";

// third-party
import classNames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { url } from "../../services/utils";

// application
import Currency from "./Currency";
import InputNumber from "./InputNumber";
import ProductGallery from "./ProductGallery";
import Rating from "./Rating";
import { Wishlist16Svg } from "../../svg";
import { HashLink } from "react-router-hash-link";
import ProductTabs from "../shop/ProductTabs";
import { GitAction } from "../../store/action/gitAction";
import Logo from "../../assets/Emporia.png"
import BlockProductsCarousel from '../blocks/BlockProductsCarousel';
import { toast } from "react-toastify";
import LoadingPanel from "./loadingPanel";
import ProductSkeleton from "./ProductSkeleton";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Typography, Card, } from "@mui/material";
import Chip from '@mui/material/Chip';
import ReactTooltip from "react-tooltip";
import { FacebookIcon, TelegramIcon, TwitterIcon, WhatsappIcon, FacebookShareButton, TelegramShareButton, TwitterShareButton, WhatsappShareButton, } from "react-share";
import IndicatorAccount from "../header/IndicatorAccount";
import LoginComponent from "../../pages/login/login.component";

const PriceSection = memo(({ product }) => {
    let component;
    let price = product.ProductPrice === null ? "N/A" : <Currency value={product.ProductPrice} currency={"RM"} />;
    if (product.ProductPromotion && JSON.parse(product.ProductPromotion).length > 0) {
        let promotion = JSON.parse(product.ProductPromotion)[0];
        component =
            <div className="wrapper">
                <div className="product__prices">
                    <span className="product__old-price mr-2">
                        <Currency value={product.ProductPrice !== null && product.ProductPrice !== undefined ? parseFloat(product.ProductPrice) : 0} currency={"RM"} />
                    </span>
                    <span className="product__new-price">
                        <Currency value={JSON.parse(product.ProductPromotion)[0].PromotionPrice} currency={"RM"} />
                    </span>
                    {/* <span className="ml-2">
                        <Chip variant="filled" label={<div>{JSON.parse(product.ProductPromotion)[0].ProductDiscount}% OFF</div>} color='primary' style={{ backgroundColor: "#d23f57" }} />
                    </span> */}
                </div>
            </div>
    }
    else {
        component = <div className="product__prices">{price}</div>
    }
    return component;
});


class ProductDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            quantity: 1,
            currentTab: "description",
            productVariation: "",
            productPrice: "",
            productQuantity: 0,
            productVariationDetailID: "",
            selectedVariation: "",
            isVariationSet: false,
            productVariationType: "",
            isProductSet: false,
            isTimerEnd: false,
            pathname: "",
            count: 0,

            productId: 0
        };
        this.addCart = this.addCart.bind(this)
        this.handleWishlist = this.handleWishlist.bind(this)
        this.wishlisting = this.wishlisting.bind(this)
        this.login = this.login.bind(this)
        this.checkCart = this.checkCart.bind(this)

    }

    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state, callback) => {
            return;
        };
    }

    componentDidMount() {
        const { product, quickViewIndicator } = this.props
        // window.scrollTo(0, 0) // Temporary fixing randomly show when page loads
        let productID = ""
        let pathnameLength = window.location.pathname.split("/").length
        if (window.location.pathname !== undefined) {
            if (quickViewIndicator !== true && window.location.pathname.split("/")[pathnameLength - 3] === "shop" && window.location.pathname.split("/")[pathnameLength - 2] === "products") {

                productID = window.location.pathname.split("/")[pathnameLength - 1]
            }
            else {
                productID = product.ProductID
            }
        }
        if (product !== undefined && productID !== "" && product.ProductID === parseInt(productID) && product.ProductVariation !== undefined) {
            product.ProductVariation !== null && JSON.parse(product.ProductVariation).map((variation) => {
                variation.ProductVariationValue === "-" &&
                    this.setState({
                        productVariation: variation.ProductVariationValue,
                        productQuantity: variation.ProductStockAmount,
                        productVariationDetailID: variation.ProductVariationDetailID,
                        productVariationType: variation.ProductVariation,
                    })
            })
            this.setState({ productPrice: product.ProductPrice, isProductSet: true, productId: product.ProductID })
        } else {
            this.setState({ isProductSet: false })
        }
    }

    componentDidUpdate(props) {
        const { product, quickViewIndicator } = this.props
        let productID = ""
        let pathnameLength = window.location.pathname.split("/").length
        if (window.location.pathname !== undefined) {
            if (quickViewIndicator !== true && window.location.pathname.split("/")[pathnameLength - 3] === "shop" && window.location.pathname.split("/")[pathnameLength - 2] === "products") {
                productID = window.location.pathname.split("/")[pathnameLength - 1]
            }
            else {
                productID = product.ProductID
            }
        }
        if (product !== undefined && productID !== "" && product.ProductID === parseInt(productID) && this.state.isProductSet === false && product.ProductVariation !== undefined) {
            product.ProductVariation !== null && JSON.parse(product.ProductVariation).map((variation) => {
                variation.ProductVariationValue === "-" &&
                    this.setState({
                        productVariation: variation.ProductVariationValue,
                        productQuantity: variation.ProductStockAmount,
                        productVariationDetailID: variation.ProductVariationDetailID,
                        productVariationType: variation.ProductVariation,
                    })
            })
            this.setState({ productPrice: product.ProductPrice, isProductSet: true })
        }
        if (quickViewIndicator === true && product !== undefined && productID !== "" && product.ProductID === parseInt(productID) && this.state.isProductSet === false) {
            this.setState({ productPrice: product.ProductPrice, isProductSet: true })
        }
    }

    checkCart(product, quantity) {
        if (this.state.productVariationDetailID === "" && this.state.productVariationType !== "None")
            toast.error("Please Select One of the Variation")
        else
            this.addCart(product, quantity)
    }

    handleChangeQuantity = (quantity) => {
        this.setState({ quantity });
    };

    changeCurrentTab = (value) => {
        this.setState({
            currentTab: value,
        });
    };

    addCart = (product, quantity) => {
        let found = false
        if (this.props.productcart) {
            this.props.productcart.filter(x => x.ProductID === product.ProductID).map((x) => {
                if (x.ProductVariationDetailID !== null && x.ProductVariationDetailID === this.state.productVariationDetailID) {
                    found = true
                    this.props.CallUpdateProductCart({
                        userID: localStorage.getItem("id"),
                        userCartID: x.UserCartID,
                        productQuantity: parseInt(x.ProductQuantity) + quantity,
                        productName: product.ProductName
                    })
                    toast.success("The item is successfully added to the cart")
                }
            })

            if (found === false) {
                this.props.CallAddProductCart({
                    userID: window.localStorage.getItem("id"),
                    productID: product.ProductID,
                    productQuantity: quantity,
                    productVariationDetailID: this.state.productVariationDetailID,
                    applyingPromoCode: 0,
                    productName: product.ProductName
                })
                toast.success("The item is successfully added to the cart")
            }
        } else
            this.login()
    }

    login() {
        // browserhistory.push("/login");
        // window.location.reload(false);
        // this.props.history.push({pathname: "/login", loginPopOut: true});
        this.setState({ loginPopOut: true })
        this.props.getpopOutDetailsCard(false,true)
    }

    handleWishlist = (product) => {
        let selectedProductID = product.ProductID

        let allWishListProd = this.props.wishlist.map((x) => (x.ProductID))

        if (allWishListProd.findIndex((index) => (index === selectedProductID)) !== -1) {
            this.props.CallDeleteProductWishlist({
                userID: localStorage.getItem("id"),
                userWishlistID: this.props.wishlist.filter((f) => (f.ProductID === selectedProductID)).map((x) => (x.UserWishlistID)),
                productName: product.ProductName
            })
            toast.success("Successfully Deleted Wishlist, you can continue enjoy your shopping")
            setTimeout(() => {
                window.location.reload(true);
            }, 3000)

        }

        else {
            this.props.CallAddProductWishlist({
                userID: window.localStorage.getItem("id"),
                productID: product.ProductID,
                productName: product.ProductName
            })
            toast.success("Successfully Added Wishlist, you can continue enjoy your shopping")
            setTimeout(() => {
                window.location.reload(true);
            }, 3000)

        }
    }

    wishlisting(product) {


        return (
            typeof this.props.wishlist !== undefined && this.props.wishlist.length > 0 ?
                this.props.wishlist.filter(x => x.ProductID === product.ProductID).length > 0 ?
                    this.props.wishlist.filter(x => x.ProductID === product.ProductID).map((x, ind) => {
                        return (
                            <button type="button" key={ind} onClick={() => window.localStorage.getItem("id") && window.localStorage.getItem("isLogin") === "true" ? this.handleWishlist(product) : this.login()}
                                className={classNames('btn btn-light btn-sm btn-svg-icon')}
                            ><Wishlist16Svg fill="red" />
                            </button>
                        )
                    }) :
                    (
                        <button type="button" onClick={() => window.localStorage.getItem("id") && window.localStorage.getItem("isLogin") === "true" ? this.handleWishlist(product) : this.login()}
                            className={classNames("btn btn-light btn-svg-icon btn-svg-icon--fake-svg product-card__wishlist")}
                        ><Wishlist16Svg />
                        </button>
                    ) :
                (
                    <button type="button" onClick={() => window.localStorage.getItem("id") && window.localStorage.getItem("isLogin") === "true" ? this.handleWishlist(product) : this.login()}
                        className={classNames("btn btn-light btn-svg-icon btn-svg-icon--fake-svg product-card__wishlist")}
                    ><Wishlist16Svg />
                    </button>
                )
        )
    }

    getpopOutState = (loginPopOut) => {
        if (this.state.loginPopOut === true)
            this.setState({ loginPopOut: false })
    }

    render() {
        const {
            product,
            layout,
            quickViewIndicator,
        } = this.props;
        const { quantity } = this.state;
        let prices;

        const baseColor = "#c4c4c4"
        const highlightColor = "#ffffff"

        if (this.state.isTimerEnd === false)
            setInterval(() => {
                this.setState({ isTimerEnd: true })
            }, 2000)

        prices = <Currency value={this.state.productPrice !== null && this.state.productPrice !== undefined ? this.state.productPrice : 0} currency={"RM"} />;
        let merchant = product.ReturnVal !== undefined && product.ReturnVal !== "0" && product.MerchantDetail !== null ? JSON.parse(product.MerchantDetail)[0] : ""
        // let variation = product.ProductVariation !== null ? JSON.parse(product.ProductVariation)[0] : ""
        let variation = ""


        if (localStorage.getItem("isLogin") === "true" && localStorage.getItem("id") !== undefined && this.state.count === 0) {
            // this.props.CallViewProductCart({
            //     userID: localStorage.getItem("id")
            // })
            // this.props.CallViewProductWishlist({
            //     userID: localStorage.getItem("id")
            // })

            this.setState({ count: 1 })

        }

        const LayoutListing = () => {
            let pathnameLength = window.location.pathname.split("/").length
            return (
                <div className="product__content">
                    {
                        quickViewIndicator !== true && window.location.pathname.split("/")[pathnameLength - 3] === "shop" && window.location.pathname.split("/")[pathnameLength - 2] === "products" ?
                            this.state.isProductSet === true &&
                            <ProductGallery
                                layout={layout}
                                currentData={this.state}
                                images={typeof product.ProductImages === "string" && product.ProductImages !== "[]" ? JSON.parse(product.ProductImages) : [Logo]}
                                baseColor={baseColor}
                                highlightColor={highlightColor}
                                product={product}
                            />
                            :
                            <Link to={url.product(product)}>
                                <div className="product-card__image product-image">
                                    <div className="product-image__body">

                                        {
                                            this.state.isTimerEnd === true && this.state.isProductSet === true ?
                                                <img
                                                    className="product-image__img"
                                                    src={product.ProductImage !== null ? product.ProductImage : Logo}
                                                    onError={(e) => { e.target.onerror = null; e.target.src = Logo }}
                                                    alt={product.ProductName}
                                                />
                                                :
                                                <Skeleton height={350} baseColor={baseColor} highlightColor={highlightColor} />
                                        }
                                    </div>
                                </div>
                            </Link>
                    }
                    {
                        this.state.isTimerEnd === true && this.state.isProductSet === true ?
                            <div>
                                <div className="product__info">
                                    <div className="product__wishlist-compare">
                                        {this.wishlisting(product)}
                                    </div>
                                    <div className="row" style={{ display: "flex", flexDirection: "row", }}>
                                        <h3 className="col-12 product__name">{product.ProductName}</h3>
                                        <Typography className="col-12 product__name" >
                                            Merchant Shop:  <Link to={url.cartMerchant(product.MerchantID)}>{product.ShopName}</Link>
                                        </Typography>

                                        {/* <div className="col-1"> */}
                                        {/* <a data-tip data-event='click focus'>
                                                <img src="https://img.icons8.com/external-anggara-basic-outline-anggara-putra/24/null/external-share-basic-user-interface-anggara-basic-outline-anggara-putra.png"
                                                    style={{ cursor: "pointer" }} />
                                            </a>
                                            <ReactTooltip globalEventOff='click' place="top" type="dark" effect="solid" clickable={true} zIndex={10}> */}
                                        <div className="sticky_share_btn">
                                            <div className="fixed_share">
                                                <ul className="listing">
                                                    <li className="facebook">
                                                        <FacebookShareButton
                                                            className="fadeIn"
                                                            openShareDialogOnClick
                                                            url={"https://myemporia.my/shop/products/" + product.ProductID}
                                                            quote="Check this out at MyEmporia, Get it now!"
                                                            hashtag={"#MyEmporia"}>
                                                            <FacebookIcon size={35} round={true} />
                                                        </FacebookShareButton>
                                                    </li>
                                                    <li className="pinterest">
                                                        <TelegramShareButton
                                                            className="fadeIn"
                                                            openShareDialogOnClick
                                                            title={'Check this out at MyEmporia, Get it now!' + product.ProductName}
                                                            url={"https://myemporia.my/shop/products/" + product.ProductID} >
                                                            <TelegramIcon size={35} round={true} />
                                                        </TelegramShareButton>
                                                    </li>
                                                    <li className="twitter">
                                                        <TwitterShareButton
                                                            className="fadeIn"
                                                            openShareDialogOnClick
                                                            url={"https://myemporia.my/shop/products/" + product.ProductID} >
                                                            <TwitterIcon size={35} round={true} />
                                                        </TwitterShareButton>
                                                    </li>
                                                    <li className="whatsapp">
                                                        <WhatsappShareButton
                                                            className="fadeIn"
                                                            openShareDialogOnClick
                                                            title={'Check this out at MyEmporia, Get it now!' + product.ProductName}
                                                            separator={"/n "}
                                                            url={"https://myemporia.my/shop/products/" + product.ProductID}>
                                                            <WhatsappIcon size={35} round={true} />
                                                        </WhatsappShareButton>
                                                    </li>
                                                </ul>
                                                <span className="share-toggle">
                                                    <i className="fa fa-share-alt"></i>
                                                </span>
                                            </div>
                                        </div>
                                        {/* </ReactTooltip> */}
                                        {/* </div> */}
                                    </div>

                                    <div className="product__rating">
                                        <div className="product__rating-stars">
                                            <Rating value={product.ProductRating !== null ? product.ProductRating : 0} />
                                        </div>
                                        <div className="product__rating-legend">
                                            <HashLink
                                                onClick={this.changeCurrentTab.bind(this, "reviews")}
                                                to="#reviews"
                                            >
                                                {`${product.ProductRating !== null
                                                    ? parseFloat(product.ProductRating).toFixed(1)
                                                    : "0"
                                                    }/5 (`}{`${product.ProductReviewCount !== null
                                                        ? product.ProductReviewCount
                                                        : "0"
                                                        } Reviews)`}
                                            </HashLink>
                                            <span>/</span>
                                            <HashLink
                                                onClick={this.changeCurrentTab.bind(this, "reviews")}
                                                to="#writeReviews"
                                            >
                                                Write A Review
                                            </HashLink>
                                        </div>
                                    </div>
                                    <ul className="product__meta">
                                        {/* {
                                            product.ProductPromotion && JSON.parse(product.ProductPromotion).length > 0 &&
                                            <Chip size="small" variant="outlined" label={`${JSON.parse(product.ProductPromotion)[0].ProductDiscount} % OFF`} style={{ backgroundColor: "#d23f57", color: '#ffffff',borderRadius:'0px' }} />
                                        }
                                        &nbsp; */}
                                        {
                                            this.state.isVariationSet === true ?
                                                this.state.productQuantity > 0 ?
                                                    <Chip size="small" variant="outlined" color="success" label={"In Stock" + " (" + (this.state.isVariationSet === true ? this.state.productQuantity : product.ProductStockAmount > 0 ? product.ProductStockAmount : 0) + ")"} />
                                                    :
                                                    <Chip size="small" variant="outlined" color="success" label={"Out of Stock" + " (" + (this.state.isVariationSet === true ? this.state.productQuantity : product.ProductStockAmount > 0 ? product.ProductStockAmount : 0) + ")"} />
                                                :
                                                product.ProductStockAmount !== null && product.ProductStockAmount > 0 ?
                                                    <Chip size="small" variant="outlined" color="success" label={"In Stock" + " (" + (this.state.isVariationSet === true ? this.state.productQuantity : product.ProductStockAmount > 0 ? product.ProductStockAmount : 0) + ")"} />
                                                    :
                                                    <Chip size="small" variant="outlined" color="success" label={"Out of Stock" + " (" + (this.state.isVariationSet === true ? this.state.productQuantity : product.ProductStockAmount > 0 ? product.ProductStockAmount : 0) + ")"} />
                                        }
                                        &nbsp;
                                        <Chip variant="outlined" color="secondary" label={"Brand: " + (product.Brand === "-" ? "None" : product.Brand)} size="small">
                                            {/* <Link to="/">{product.Brand}</Link> */}
                                        </Chip>&nbsp;

                                        <Chip variant="outlined" color="info" label={"SKU: " + (product.SKU === "-" ? "N/A" : product.SKU)} size="small" />&nbsp;
                                    </ul>
                                    {/* <div className="product__seller">
                                        <Typography variant="caption">Seller:{" "}</Typography>
                                        {
                                            product.MerchantDetail !== undefined && product.MerchantDetail !== null && JSON.parse(product.MerchantDetail).map((merchantDetails) => {
                                                return (
                                                    <>
                                                        <Link to={{ pathname: url.merchant(merchantDetails), state: { id: merchantDetails.UserID, merchantDetails: merchantDetails } }}>
                                                            {merchantDetails.ShopName !== null && merchantDetails.ShopName}</Link>
                                                        <span className="product__seller-info">
                                                            <div className="row">
                                                                <div className="col-4">
                                                                    <img
                                                                        className="product__seller-info-image"
                                                                        src={merchantDetails.ShopImage !== null ? merchantDetails.ShopImage : Logo}
                                                                        alt="MyEmporia"
                                                                        onError={(e) => {
                                                                            e.target.onerror = null; e.target.src = Logo
                                                                        }}
                                                                    />
                                                                </div>
                                                                <div className="col-4">
                                                                    Seller:{" "}
                                                                    {merchantDetails.ShopName !== null && merchantDetails.ShopName}
                                                                    <br />
                                                                    State:{" "}
                                                                    {merchantDetails.ShopState !== null && merchantDetails.ShopState}
                                                                    <br />
                                                                    Shop Rating:{" "}
                                                                    <div className="product__rating-stars">
                                                                        <Rating value={merchantDetails.length > 0 && merchantDetails.ShopRating !== null ? merchantDetails.ShopRating : 0} />
                                                                        {merchantDetails.length > 0 && merchantDetails.ShopRating}
                                                                    </div>
                                                                </div>
                                                                <div className="col-4">
                                                                    Products:{" "}
                                                                    {merchantDetails.MerchantTotalProduct !== null && merchantDetails.MerchantTotalProduct}
                                                                    <br />
                                                                    Last Joined:{" "}
                                                                    {merchantDetails.LastJoined !== null && merchantDetails.LastJoined}
                                                                </div>
                                                            </div>
                                                        </span>
                                                    </>
                                                )
                                            })
                                        }
                                    </div> */}
                                </div>
                                <div className="product__sidebar">
                                    <PriceSection product={product} />
                                    {
                                        variation !== null && variation !== "" && variation !== undefined && variation.ProductVariation !== "None" &&
                                        (
                                            <div className="product__option">
                                                <label className="product__option-label">
                                                    {variation.ProductVariation}
                                                </label>
                                                <div className="product__variation">
                                                    {
                                                        variation !== null &&
                                                        JSON.parse(product.ProductVariation).map((variation, index) => {
                                                            return (
                                                                <button
                                                                    key={index}
                                                                    type="button"
                                                                    className={
                                                                        variation.ProductVariationDetailID === this.state.productVariationDetailID ?
                                                                            'btn product__variation-button--selected'
                                                                            : 'btn product__variation-button'
                                                                    }
                                                                    onClick={() => this.setState({
                                                                        productVariation: variation.ProductVariationValue,
                                                                        productQuantity: variation.ProductStockAmount,
                                                                        productPrice: variation.ProductVariationPrice,
                                                                        productVariationDetailID: variation.ProductVariationDetailID,
                                                                        selectedVariation: variation,
                                                                        isVariationSet: true
                                                                    })}
                                                                >
                                                                    {variation.ProductVariationValue}
                                                                </button>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        )
                                    }

                                    <div className="product__option">
                                        <div className="row form-group product__option d-flex align-items-center">
                                            <div className="col-12 col-lg-3 col-xl-2">
                                                <label
                                                    htmlFor="product-quantity"
                                                    className="product__option-label"
                                                >
                                                    Quantity
                                                </label>
                                            </div>
                                            <div className="col-12 col-lg-3 col-xl-2 product__actions-item">
                                                <InputNumber
                                                    id="product-quantity"
                                                    aria-label="Quantity"
                                                    className="product__quantity"
                                                    size="lg"
                                                    min={1}
                                                    value={quantity}
                                                    onChange={this.handleChangeQuantity}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group product__option product__add-to-cart" >
                                            <div className="product__actions">
                                                <div className="product__actions-item product__actions-item--addtocart mx-1">
                                                    <button
                                                        type="button"
                                                        disabled={this.state.isVariationSet !== false ?
                                                            (product.ProductStockAmount > 0 ? false : true) :
                                                            (this.state.productQuantity > 0 ? false : true)
                                                        }
                                                        onClick={() => window.localStorage.getItem("id") && window.localStorage.getItem("isLogin") === "true" ? this.checkCart(product, quantity) : this.login()}
                                                        className="btn btn-primary product-card__addtocart"
                                                        style={{ borderRadius: "5px" }}
                                                    >
                                                        Add To Cart
                                                    </button>
                                                </div>
                                                <div className="product__actions-item product__actions-item--wishlist mx-1">
                                                    {this.wishlisting(product)}
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            :
                            <ProductSkeleton
                                highlightColor={highlightColor}
                                baseColor={baseColor} />
                    }
                </div>
            )
        }

        let pathnameLength = window.location.pathname.split("/").length
        return (
            quickViewIndicator !== true && window.location.pathname.split("/")[pathnameLength - 3] === "shop" && window.location.pathname.split("/")[pathnameLength - 2] === "products" ?
                <div className="block" >
                    <Card elevation={2}
                        style={{ backgroundColor: "white", padding: "20px" }}
                        className={`product product--layout--${layout}`}
                    >
                        {LayoutListing()}
                    </Card>
                    {this.state.loginPopOut !== undefined && this.state.loginPopOut !== false &&
                        <LoginComponent loginPopOut={this.state.loginPopOut} getpopOutState={this.getpopOutState} />
                    }
                </div >
                :
                <>
                {/* {this.state.loginPopOut !== undefined && this.state.loginPopOut !== false ?
                    <LoginComponent loginPopOut={this.state.loginPopOut} getpopOutState={this.getpopOutState} />
                : */}
                { LayoutListing()}
                {/* } */}
                    
                </>
        );
    }
}

ProductDetails.propTypes = {
    /** product object */
    product: PropTypes.object.isRequired,
    /** one of ['standard', 'sidebar', 'columnar', 'quickview'] (default: 'standard') */
    layout: PropTypes.oneOf(["standard", "sidebar", "columnar", "quickview"]),
};

ProductDetails.defaultProps = {
    layout: "standard",
};

const mapStateToProps = (state) => ({
    wishlist: state.counterReducer.wishlist,
    productcart: state.counterReducer.productcart
});


const mapDispatchToProps = (dispatch) => {
    return {
        CallUpdateProductCart: (prodData) => dispatch(GitAction.CallUpdateProductCart(prodData)),
        CallAddProductCart: (prodData) => dispatch(GitAction.CallAddProductCart(prodData)),
        CallDeleteProductWishlist: (prodData) => dispatch(GitAction.CallDeleteProductWishlist(prodData)),
        CallAddProductWishlist: (prodData) => dispatch(GitAction.CallAddProductWishlist(prodData)),
        CallViewProductCart: (prodData) => dispatch(GitAction.CallViewProductCart(prodData)),
        CallViewProductWishlist: (prodData) => dispatch(GitAction.CallViewProductWishlist(prodData)),
        // CallProductReviewByProductID: (PropsData) => dispatch(GitAction.CallProductReviewByProductID(PropsData)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductDetails));