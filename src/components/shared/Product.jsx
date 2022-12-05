// react
import React, { Component } from "react";

// third-party
import classNames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
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
import { browserHistory } from "react-router";
import Logo from "../../assets/Emporia.png"
import BlockProductsCarousel from '../blocks/BlockProductsCarousel';
import { toast } from "react-toastify";
import LoadingPanel from "./loadingPanel";
import ProductSkeleton from "./ProductSkeleton";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

class Product extends Component {
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
      isTimerEnd: false

    };
    this.addCart = this.addCart.bind(this)
    this.handleWishlist = this.handleWishlist.bind(this)
    this.wishlisting = this.wishlisting.bind(this)
    this.login = this.login.bind(this)
    this.checkCart = this.checkCart.bind(this)

  }

  componentDidMount() {
    const { product } = this.props
    // this.props.CallProductReviewByProductID({ ProductID: product.ProductID, ParentProductReviewID: 0 })
    window.scrollTo(0, 0) // Temporary fixing randomly show when page loads
    let productID = ""
    if (window.location.pathname !== undefined) {
      let length = window.location.pathname.split("/").length
      productID = window.location.pathname.split("/")[length - 1]
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
      let length = window.location.pathname.split("/").length
      productID = window.location.pathname.split("/")[length - 1]
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
      }
    } else
      this.login()
  }

  login() {
    browserHistory.push("/login");
    window.location.reload(false);
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

    let merchant = product.ReturnVal !== "0" && product.MerchantDetail !== null ? JSON.parse(product.MerchantDetail)[0] : ""
    let variation = product.ReturnVal !== "0" && product.ProductVariation !== null ? JSON.parse(product.ProductVariation)[0] : ""

    return (
      <div className="block" >

        <div
          style={{ backgroundColor: "white", padding: "20px" }}
          className={`product product--layout--${layout}`}
        >
          <div className="product__content">
            {
              this.state.isProductSet === true &&
              <ProductGallery
                layout={layout}
                currentData={this.state}
                images={typeof product.ProductImages === "string" ? JSON.parse(product.ProductImages) : [Logo]}
                baseColor={baseColor}
                highlightColor={highlightColor}
              />
            }
            {
              this.state.isTimerEnd === true && this.state.isProductSet === true ?
                <div>
                  <div className="product__info">
                    <div className="product__wishlist-compare">
                      {this.wishlisting(product)}
                    </div>
                    <h1 className="product__name">{product.ProductName}</h1>
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
                      <li className="product__meta-availability">
                        Availability: {" "}
                        {
                          this.state.isVariationSet === true ?
                            this.state.productQuantity > 0 ?
                              <span className="text-success">In Stock</span> :
                              <span className="text-danger">Out of Stock</span>
                            :
                            product.ProductStockAmount !== null && product.ProductStockAmount > 0 ?
                              <span className="text-success">In Stock</span> :
                              <span className="text-danger">Out of Stock</span>
                        }
                        &nbsp;
                        ({this.state.isVariationSet === true ? this.state.productQuantity : product.ProductStockAmount > 0 ? product.ProductStockAmount : 0})
                      </li>
                      <li>
                        Brand:{" "}
                        <Link to="/">{product.Brand}</Link>
                      </li>
                      <li>SKU:{" "}{product.SKU}</li>
                      <li className="product__seller">
                        Seller:{" "}
                        {
                          product.MerchantDetail !== null && JSON.parse(product.MerchantDetail).map((merchantDetails) => {
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
                      </li>
                    </ul>
                  </div>
                  <div className="product__sidebar">
                    <div className="product__prices">{prices}</div>
                    {
                      variation !== null && variation !== "" && variation.ProductVariation !== "None" &&
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
                              disabled={this.state.isVariationSet === true ?
                                (this.state.productQuantity > 0 ? false : true) :
                                (product.ProductStockAmount > 0 ? false : true)
                              }
                              onClick={() => window.localStorage.getItem("id") && window.localStorage.getItem("isLogin") === "true" ? this.checkCart(product, quantity) : this.login()}
                              className="btn btn-primary product-card__addtocart"
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
        </div>

        {
          this.props.version === "1" ? (
            <ProductTabs
              withSidebar
              currentTab={this.state}
              setCurrentTab={this.changeCurrentTab}
            />
          ) : (
            <ProductTabs
              product={product}
              currentTab={this.state}
              setCurrentTab={this.changeCurrentTab}
            />
          )
        }

        <BlockProductsCarousel
          title="Recommended Product"
          layout="grid-4"
          rows={1}
          currentData={this.state}
          highlightColor={highlightColor}
          baseColor={baseColor}
          products={product.ProductRecommendation !== null && product.ProductRecommendation !== undefined
            ? JSON.parse(product.ProductRecommendation) : []}
        />

      </div >
    );
  }
}

Product.propTypes = {
  /** product object */
  product: PropTypes.object.isRequired,
  /** one of ['standard', 'sidebar', 'columnar', 'quickview'] (default: 'standard') */
  layout: PropTypes.oneOf(["standard", "sidebar", "columnar", "quickview"]),
};

Product.defaultProps = {
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
    CallProductReviewByProductID: (PropsData) => dispatch(GitAction.CallProductReviewByProductID(PropsData)),
    // CallAllProducts: (prodData) => dispatch(GitAction.CallProductReviewByProductID(prodData)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
