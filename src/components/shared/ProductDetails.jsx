// react
import React, { Component } from "react";

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

        };
        this.addCart = this.addCart.bind(this)
        this.handleWishlist = this.handleWishlist.bind(this)
        this.wishlisting = this.wishlisting.bind(this)
        this.login = this.login.bind(this)
        this.checkCart = this.checkCart.bind(this)

    }

    componentDidMount() {
        const { product } = this.props
        window.scrollTo(0, 0) // Temporary fixing randomly show when page loads
        let productID = ""
        if (window.location.pathname !== undefined) {
            if (window.location.pathname !== "/") {
                let length = window.location.pathname.split("/").length
                productID = window.location.pathname.split("/")[length - 1]
            }
            else {
                productID = product.ProductID
            }
        }

        if (product !== undefined && productID !== "" && product.ProductID === parseInt(productID)) {
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
        } else {
            this.setState({ isProductSet: false })
        }
    }
    componentDidUpdate(props) {
        const { product } = this.props
        let productID = ""
        if (window.location.pathname !== undefined) {
            if (window.location.pathname !== "/") {
                let length = window.location.pathname.split("/").length
                productID = window.location.pathname.split("/")[length - 1]
            }
            else {
                productID = product.ProductID
            }
        }

        if (product !== undefined && productID !== "" && product.ProductID === parseInt(productID) && this.state.isProductSet === false) {
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
        // browserHistory.push("/login");
        // window.location.reload(false);
        this.props.history.push("/login");
    }

    handleWishlist = (product) => {
        let found = false
        if (this.props.wishlist !== undefined) {
            this.props.wishlist.filter(x => x.ProductID === product.ProductID).map((x) => {
                found = true
                this.props.CallDeleteProductWishlist({
                    userID: localStorage.getItem("id"),
                    userWishlistID: x.UserWishlistID,
                    productName: product.ProductName
                })
            })
            if (found === false) {
                this.props.CallAddProductWishlist({
                    userID: window.localStorage.getItem("id"),
                    productID: product.ProductID,
                    productName: product.ProductName
                })
            }
        }
        else
            this.login()
    }

    wishlisting(product) {
        return (
            typeof this.props.wishlist !== "undefined" && this.props.wishlist.length > 0 ?
                this.props.wishlist.filter(x => x.ProductID === product.ProductID).length > 0 ?
                    this.props.wishlist.filter(x => x.ProductID === product.ProductID).map((x) => {
                        return (
                            <button type="button" onClick={() => window.localStorage.getItem("id") && window.localStorage.getItem("isLogin") === "true" ? this.handleWishlist(product) : this.login()}
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

    render() {
        const {
            product,
            layout,
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
        let variation = product.ProductVariation !== null ? JSON.parse(product.ProductVariation)[0] : ""

        const LayoutListing = () => {
            return (
                <div className="product__content">
                    {
                        window.location.pathname !== "/" ?
                            this.state.isProductSet === true &&
                            <ProductGallery
                                layout={layout}
                                currentData={this.state}
                                images={typeof product.ProductImages === "string" ? JSON.parse(product.ProductImages) : [Logo]}
                                baseColor={baseColor}
                                highlightColor={highlightColor}
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
                                        <h3 className="col-11 product__name">{product.ProductName}</h3>
                                        <div className="col-1">
                                            {/* <a data-tip data-event='click focus'>
                                                <img src="https://img.icons8.com/external-anggara-basic-outline-anggara-putra/24/null/external-share-basic-user-interface-anggara-basic-outline-anggara-putra.png"
                                                    style={{ cursor: "pointer" }} />
                                            </a>
                                            <ReactTooltip globalEventOff='click' place="top" type="dark" effect="solid" clickable={true} zIndex={10}> */}
                                            <div class="sticky_share_btn">
                                                <div class="fixed_share">
                                                    <ul class="listing">
                                                        <li class="facebook">
                                                            <FacebookShareButton
                                                                className="fadeIn"
                                                                openShareDialogOnClick
                                                                url={"https://myemporia.my/shop/products/" + product.ProductID}
                                                                quote="Check this out at MyEmporia, Get it now!"
                                                                hashtag={"#MyEmporia"}>
                                                                <FacebookIcon size={35} round={true} />
                                                            </FacebookShareButton>
                                                        </li>
                                                        <li class="pinterest">
                                                            <TelegramShareButton
                                                                className="fadeIn"
                                                                openShareDialogOnClick
                                                                title={'Check this out at MyEmporia, Get it now!' + product.ProductName}
                                                                url={"https://myemporia.my/shop/products/" + product.ProductID} >
                                                                <TelegramIcon size={35} round={true} />
                                                            </TelegramShareButton>
                                                        </li>
                                                        <li class="twitter">
                                                            <TwitterShareButton
                                                                className="fadeIn"
                                                                openShareDialogOnClick
                                                                url={"https://myemporia.my/shop/products/" + product.ProductID} >
                                                                <TwitterIcon size={35} round={true} />
                                                            </TwitterShareButton>
                                                        </li>
                                                        <li class="whatsapp">
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
                                                    <span class="share-toggle">
                                                        <i class="fa fa-share-alt"></i>
                                                    </span>
                                                </div>
                                            </div>
                                            {/* </ReactTooltip> */}
                                        </div>
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
                                        <Chip variant="outlined" color="secondary" label="Brand: " size="small"><Link to="/">{product.Brand}</Link></Chip>&nbsp;
                                        <Chip variant="outlined" color="info" label={"SKU: " + product.SKU} size="small"><Link to="/">{product.Brand}</Link></Chip>&nbsp;
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
                                    <div className="product__prices">{prices}</div>
                                    {
                                        variation !== null && variation !== "" && variation !== undefined && variation.ProductVariation !== "None" &&
                                        (
                                            <div className="product__option">
                                                <label
                                                    className="product__option-label"
                                                >
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
                                            <div className="col-3">
                                                <label
                                                    htmlFor="product-quantity"
                                                    className="product__option-label"
                                                >
                                                    Quantity
                                                </label>
                                            </div>
                                            <div className="col-2 product__actions-item">
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

        return (
            window.location.pathname !== "/" ?
                <div className="block" >
                    <Card elevation={2}
                        style={{ backgroundColor: "white", padding: "20px" }}
                        className={`product product--layout--${layout}`}
                    >
                        {LayoutListing()}
                    </Card>
                </div >
                :
                <>
                    {LayoutListing()}
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
        // CallProductReviewByProductID: (PropsData) => dispatch(GitAction.CallProductReviewByProductID(PropsData)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductDetails));
