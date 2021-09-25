// react
import React, { Component } from "react";

// third-party
import classNames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// application
import AsyncAction from "./AsyncAction";
import Currency from "./Currency";
import InputNumber from "./InputNumber";
import ProductGallery from "./ProductGallery";
import Rating from "./Rating";
import { cartAddItem } from "../../store/cart";
import { compareAddItem } from "../../store/compare";
import { Wishlist16Svg, Compare16Svg } from "../../svg";
import { wishlistAddItem, wishlistRemoveItem, } from "../../store/wishlist";
import { HashLink } from "react-router-hash-link";
import ProductTabs from "../shop/ProductTabs";
import { GitAction } from "../../store/action/gitAction";
import { browserHistory } from "react-router";


class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quantity: 1,
      currentTab: "description",
    };
    this.addCart = this.addCart.bind(this)
    this.handleWishlist = this.handleWishlist.bind(this)
    this.wishlisting = this.wishlisting.bind(this)
    this.login = this.login.bind(this)
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
          productVariationDetailID: 1,
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
      this.props.wishlist.length > 0 ?
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

    prices = <Currency value={product.ProductSellingPrice} currency={"RM"} />;



    return (
      <div className="block" >
        <div
          style={{ width: "100%" }}
          className={`product product--layout--${layout}`}
        >
          <div className="product__content">
            <ProductGallery
              layout={layout}
              images={typeof product.ProductImages === "string" ? JSON.parse(product.ProductImages) : product.ProductImages}
            />

            <div className="product__info">
              <div className="product__wishlist-compare">
                {this.wishlisting(product)}
              </div>
              <h1 className="product__name">{product.ProductName}</h1>
              <div className="product__rating">
                <div className="product__rating-stars">
                  <Rating value={product.ProductRating} />
                </div>
                <div className="product__rating-legend" style={{ fontSize: "13pt" }}>
                  <HashLink
                    onClick={this.changeCurrentTab.bind(this, "reviews")}
                    to="#reviews"
                  >{`${product.ProductReview != null
                    ? JSON.parse(product.ProductReview).length
                    : "0"
                    } Reviews`}</HashLink>
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

              <div className="product__prices" style={{ fontSize: "28pt" }}>{prices}</div>

              <form className="product__options">
                {/* <div className="form-group product__option">
                <div className="product__option-label">Color</div>
                <div className="input-radio-color">
                  <div className="input-radio-color__list">
                    <label
                      className="input-radio-color__item input-radio-color__item--white"
                      style={{ color: "#fff" }}
                      data-toggle="tooltip"
                      title="White"
                    >
                      <input type="radio" name="color" />
                      <span />
                    </label>
                    <label
                      className="input-radio-color__item"
                      style={{ color: "#ffd333" }}
                      data-toggle="tooltip"
                      title="Yellow"
                    >
                      <input type="radio" name="color" />
                      <span />
                    </label>
                    <label
                      className="input-radio-color__item"
                      style={{ color: "#ff4040" }}
                      data-toggle="tooltip"
                      title="Red"
                    >
                      <input type="radio" name="color" />
                      <span />
                    </label>
                    <label
                      className="input-radio-color__item input-radio-color__item--disabled"
                      style={{ color: "#4080ff" }}
                      data-toggle="tooltip"
                      title="Blue"
                    >
                      <input type="radio" name="color" disabled />
                      <span />
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-group product__option">
                <div className="product__option-label">Material</div>
                <div className="input-radio-label">
                  <div className="input-radio-label__list">
                    <label>
                      <input type="radio" name="material" />
                      <span>Metal</span>
                    </label>
                    <label>
                      <input type="radio" name="material" />
                      <span>Wood</span>
                    </label>
                    <label>
                      <input type="radio" name="material" disabled />
                      <span>Plastic</span>
                    </label>
                  </div>
                </div>
              </div> */}
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
                        onClick={() => window.localStorage.getItem("id") ? this.addCart(product, quantity) : this.login()}
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

              <div className="product__share-links share-links">
                <ul className="share-links__list">
                  <li className="share-links__item share-links__item--type--like">
                    <Link to="/">Like</Link>
                  </li>
                  <li className="share-links__item share-links__item--type--tweet">
                    <Link to="/">Tweet</Link>
                  </li>
                  <li className="share-links__item share-links__item--type--pin">
                    <Link to="/">Pin It</Link>
                  </li>
                  <li className="share-links__item share-links__item--type--counter">
                    <Link to="/">4K</Link>
                  </li>
                </ul>
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
  productcart: state.counterReducer.productcart
});


const mapDispatchToProps = (dispatch) => {
  return {
    CallUpdateProductCart: (prodData) => dispatch(GitAction.CallUpdateProductCart(prodData)),
    CallAddProductCart: (prodData) => dispatch(GitAction.CallAddProductCart(prodData)),
    CallDeleteProductWishlist: (prodData) => dispatch(GitAction.CallDeleteProductWishlist(prodData)),
    CallAddProductWishlist: (prodData) => dispatch(GitAction.CallAddProductWishlist(prodData)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
