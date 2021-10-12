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
import { Wishlist16Svg, Compare16Svg } from "../../svg";
import { HashLink } from "react-router-hash-link";
import ProductTabs from "../shop/ProductTabs";
import { GitAction } from "../../store/action/gitAction";
import { browserHistory } from "react-router";
import Logo from "../../assets/Emporia.png"
import {
  Divider,
} from "@material-ui/core";
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
      isVariationClick: false
    };
    this.addCart = this.addCart.bind(this)
    this.handleWishlist = this.handleWishlist.bind(this)
    this.wishlisting = this.wishlisting.bind(this)
    this.login = this.login.bind(this)
    this.checkCart = this.checkCart.bind(this)
    this.props.CallAllProducts({ type: "Merchant", typeValue: this.props.product.MerchantID, userId: 0, productPerPage: 999, page: 1 })
  }

  componentDidMount() {
    JSON.parse(this.props.product.ProductVariation).map((variation) => {
      variation.ProductVariationValue === "-" &&
        this.setState({
          productVariation: variation.ProductVariationValue,
          productQuantity: variation.ProductStockAmount,
          productVariationDetailID: variation.ProductVariationDetailID
        })
    })
    this.setState({ productPrice: this.props.product.ProductPrice })
  }

  checkCart(product, quantity) {
    if (this.state.productVariationDetailID === "")
      toast.error("Please Select One of the Variation")
    else
      this.addCart(product, quantity)
    // this.addCart(product, quantity)
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
        found = true
        this.props.CallUpdateProductCart({
          userID: localStorage.getItem("id"),
          userCartID: x.UserCartID,
          productQuantity: parseInt(x.ProductQuantity) + quantity,
          productName: product.ProductName
        })
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
    console.log("here", product)

    return (
      <div className="block" >
        <div
          style={{ width: "100%", backgroundColor: "white", padding: "20px" }}
          className={`product product--layout--${layout}`}
        >
          <div className="product__content">
            <ProductGallery
              layout={layout}
              // images={typeof product.ProductImages === "string" && product.ProductImages !== null && product.ProductImages !== undefined ? JSON.parse(product.ProductImages) : product.ProductImages}
              images={typeof product.ProductImages === "string" ? JSON.parse(product.ProductImages) : product.ProductImages}
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
                <div className="product__rating-legend" style={{ fontSize: "13pt" }}>
                  <HashLink
                    onClick={this.changeCurrentTab.bind(this, "reviews")}
                    to="#reviews"
                  >{`${product.ProductRating != null
                    ? parseFloat(product.ProductRating)
                    : "0"
                    }/5 (`}{`${product.ProductReviewCount != null
                      ? product.ProductReviewCount
                      : "0"
                      } Reviews)`}</HashLink>
                  <span>/</span>
                  <HashLink
                    onClick={this.changeCurrentTab.bind(this, "reviews")}
                    to="#writeReviews"
                  >
                    Write A Review
                  </HashLink>
                </div>
              </div>
              <ul className="product__meta" style={{ fontSize: "13pt" }}>
                <li className="product__meta-availability">
                  Availability: <span className="text-success">In Stock</span>
                  <span style={{ fontSize: "12pt", paddingTop: "9pt", color: "#A9A9A9", paddingLeft: "20px" }}
                  >({this.state.productQuantity})
                  </span>
                </li>
                <li>
                  Brand:
                  <Link to="/">{product.Brand}</Link>
                </li>
                <li>SKU:{product.SKU}</li>
              </ul>
            </div>

            <div className="product__sidebar">
              <div className="product__availability">
                Availability:{" "}
                <span className="text-success">
                  {product.ProductStockAmount > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </div>
              {console.log("this.props.product.ProductVariation ", JSON.parse(this.props.product.ProductVariation))}
              <div className="product__prices" style={{ fontSize: "28pt" }}>{prices}</div>
              {
                this.props.product.ProductVariation !== null &&
                (
                  <>
                    <label
                      className="product__option-label"
                      style={{ fontSize: "14pt", paddingTop: "9pt" }}
                    >
                      Variation
                    </label>
                    <div className="product__variation">
                      {
                        JSON.parse(this.props.product.ProductVariation).map((variation) => {
                          return (
                            variation.ProductVariationValue !== "null" ?
                              <>
                                <button
                                  type="button"
                                  style={{ paddingLeft: "20px", paddingRight: "20px", paddingTop: "5px", paddingBottom: "5px", backgroundColor: "white", borderColor: "#D3D3D3" }}
                                  onClick={() => this.setState({ productVariation: variation.ProductVariationValue, productQuantity: variation.ProductStockAmount, productPrice: variation.ProductVariationPrice, productVariationDetailID: variation.ProductVariationDetailID, isVariationClick: true })}

                                >{variation.ProductVariationValue}
                                </button>
                                <label style={{ padding: "10px" }}></label>
                              </>
                              :
                              <label
                                className="product__option-label"
                                style={{ fontSize: "12pt", paddingTop: "9pt", color: "#A9A9A9" }}
                              >
                                No Variation
                              </label>
                          )

                        })
                      }
                    </div>
                    {/* <div className="row">
                      <label
                        className="product__option-label"
                        style={{ fontSize: "14pt", paddingTop: "9pt" }}
                      >
                        Available Quantity
                      </label>
                      <div className="product__variation">
                        {
                          JSON.parse(this.props.product.ProductVariation).map((variation) => {
                            return (
                              <label
                                className="product__option-label"
                                style={{ fontSize: "12pt", paddingTop: "9pt", color: "#A9A9A9", paddingLeft:"20px" }}
                              >{variation.ProductVariationValue !== "-" ? variation.QuantityPerUnit : 0}
                              </label>
                            )

                          })
                        }
                      </div>
                    </div> */}
                  </>
                )

              }

              <form className="product__options">
                <div className="row form-group product__option" style={{ marginLeft: "-45pt" }}>
                  <div className="col-3">
                    <label
                      htmlFor="product-quantity"
                      className="product__option-label"
                      style={{ fontSize: "14pt", paddingTop: "9pt" }}
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

                <div className="form-group product__option" >
                  <div className="product__actions" style={{ paddingTop: "10pt", float: "right", marginRight: "-40pt" }}>
                    <div className="product__actions-item product__actions-item--addtocart mx-1">
                      <button
                        type="button"
                        onClick={() => window.localStorage.getItem("id") ? this.checkCart(product, quantity) : this.login()}
                        className={classNames("btn btn-primary product-card__addtocart")}
                      >
                        Add To Cart
                      </button>
                    </div>
                    <div className="product__actions-item product__actions-item--wishlist mx-1">
                      {this.wishlisting(product)}
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div className="product__footer">
              <div className="product__tags tags">
                <div className="tags__list">
                  <Link to="/">{product.ProductTag}</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ backgroundColor: "white", height: "150px", width: "100%", marginTop: "30px" }}>
          <div className="row" style={{ padding: "20px" }}>
            <div className="col-2" style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <img className="product-image__img" style={{ width: "100px", height: "100px" }} src={product.merchantImg !== undefined ? product.merchantImg : Logo} alt="Emporia" onError={(e) => { e.target.onerror = null; e.target.src = Logo }} />
            </div>
            <div className="col-3" >
              <label style={{ fontSize: "17pt", paddingTop: "9pt" }} >{product.MerchantShopName}</label>
            </div>
            <Divider orientation="vertical" style={{ height: "120px" }} />
            <div className="col-3" style={{ paddingLeft: "70px", paddingTop: "20px" }} >
              <div className="row">
                <label style={{ fontSize: "12pt", color: "#808080" }} >Rating : </label>
                <label style={{ fontSize: "13pt", color: "primary", paddingLeft: "10px" }} >5.0</label>
              </div>
              <div className="row">
                <label style={{ fontSize: "12pt", marginTop: "10px", color: "#808080" }} >Products : </label>
                <label style={{ fontSize: "13pt", marginTop: "10px", color: "primary", paddingLeft: "10px" }} >   {this.props.productsByMerchantID.length}</label>
              </div>
            </div>
            <div className="col-3" style={{ paddingLeft: "30px", paddingTop: "20px" }} >
              <div className="row">
                <label style={{ fontSize: "12pt", color: "#808080" }} >Joined :</label>
                <label style={{ fontSize: "13pt", color: "primary", paddingLeft: "10px" }} > 14 months ago</label>
              </div>
              <div className="row">
                <label style={{ fontSize: "12pt", marginTop: "10px", color: "#808080" }} >Response Time : </label>
                <label style={{ fontSize: "13pt", marginTop: "10px", color: "primary", paddingLeft: "10px" }} > within minutes</label>
              </div>
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: "white" }}>
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
        </div>

        <div style={{ marginTop: "20px" }}>
          <BlockProductsCarousel
            title="Recommended Product"
            layout="grid-4"
            rows={1}
            products={this.props.product.ProductRecommendation !== null && this.props.product.ProductRecommendation !== undefined
              ? JSON.parse(this.props.product.ProductRecommendation) : []}
          />
        </div>
      </div>
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
    CallAllProducts: (prodData) => dispatch(GitAction.CallAllProducts(prodData)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
