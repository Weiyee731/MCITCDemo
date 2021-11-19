// react
import React, { Component } from "react";

// third-party
import classNames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

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
      selectedVariation: ""
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

    product.ProductVariation !== null && JSON.parse(product.ProductVariation).map((variation) => {
      variation.ProductVariationValue === "-" &&
        this.setState({
          productVariation: variation.ProductVariationValue,
          productQuantity: variation.ProductStockAmount,
          productVariationDetailID: variation.ProductVariationDetailID
        })
    })
    this.setState({ productPrice: product.ProductPrice })
  }

  checkCart(product, quantity) {
    if (this.state.productVariationDetailID === "")
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
    browserHistory.push("/Emporia/login");
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
              <button type="button" onClick={() => window.localStorage.getItem("id") ? this.handleWishlist(product) : this.login()}
                className={classNames('btn btn-light btn-sm btn-svg-icon')}
              ><Wishlist16Svg fill="red" />
              </button>
            )
          }) :
          (
            <button type="button" onClick={() => window.localStorage.getItem("id") ? this.handleWishlist(product) : this.login()}
              className={classNames("btn btn-light btn-svg-icon btn-svg-icon--fake-svg product-card__wishlist")}
            ><Wishlist16Svg />
            </button>
          ) :
        (
          <button type="button" onClick={() => window.localStorage.getItem("id") ? this.handleWishlist(product) : this.login()}
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
    
    prices = <Currency value={this.state.productPrice !== null && this.state.productPrice !== undefined ? this.state.productPrice : 0} currency={"RM"} />;

    let merchant = JSON.parse(product.MerchantDetail)[0]
    let variation = JSON.parse(product.ProductVariation)[0]

    return (
      <div className="block" >
        {/* Product info */}
        <div
          style={{ backgroundColor: "white", padding: "20px" }}
          className={`product product--layout--${layout}`}
        >
          <div className="product__content">
            <ProductGallery
              layout={layout}
              images={typeof product.ProductImages === "string" ? JSON.parse(product.ProductImages) : [Logo]}
            />
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
                  <span className="text-success">
                    {product.ProductStockAmount !== null && product.ProductStockAmount > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                  &nbsp;
                  ({this.state.productQuantity})
                </li>
                <li>
                  Brand:{" "}
                  <Link to="/">{product.Brand}</Link>
                </li>
                <li>SKU:{" "}{product.SKU}</li>
                <li className="product__seller">
                  Seller:{" "}
                  {merchant.ShopName}
                  <span className="product__seller-info">
                    <div className="row">
                      <div className="col-4">
                        <img
                          className="product__seller-info-image"
                          src={product.merchantImg !== undefined ? product.merchantImg : Logo}
                          alt="Emporia"
                          onError={(e) => {
                            e.target.onerror = null; e.target.src = Logo
                          }}
                        />
                      </div>
                      <div className="col-4">
                        Seller:{" "}
                        {merchant.ShopName}
                        <br />
                        State:{" "}
                        {merchant.ShopState}
                        <br />
                        Shop Rating:{" "}
                        <div className="product__rating-stars">
                          <Rating value={merchant.ShopRating !== null ? merchant.ShopRating : 0} />
                          {merchant.ShopRating}
                        </div>
                      </div>
                      <div className="col-4">
                        Products:{" "}
                        {merchant.MerchantTotalProduct}
                        <br />
                        Last Joined:{" "}
                        {merchant.LastJoined}
                      </div>
                    </div>
                  </span>
                </li>
              </ul>
            </div>

            <div className="product__sidebar">
              <div className="product__prices">{prices}</div>
              {
                variation !== null && variation.ProductVariation !== "None" &&
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
                                selectedVariation: variation
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
                        disabled={product.ProductStockAmount > 0 ? false : true}
                        onClick={() => window.localStorage.getItem("id") ? this.checkCart(product, quantity) : this.login()}
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
        </div>

        {this.props.version === "1" ? (
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
        )}

        <BlockProductsCarousel
          title="Recommended Product"
          layout="grid-4"
          rows={1}
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
  productcart: state.counterReducer.productcart,
  productsByMerchantID: state.counterReducer.productsByMerchantID,
});


const mapDispatchToProps = (dispatch) => {
  return {
    CallUpdateProductCart: (prodData) => dispatch(GitAction.CallUpdateProductCart(prodData)),
    CallAddProductCart: (prodData) => dispatch(GitAction.CallAddProductCart(prodData)),
    CallDeleteProductWishlist: (prodData) => dispatch(GitAction.CallDeleteProductWishlist(prodData)),
    CallAddProductWishlist: (prodData) => dispatch(GitAction.CallAddProductWishlist(prodData)),
    // CallAllProducts: (prodData) => dispatch(GitAction.CallAllProducts(prodData)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
