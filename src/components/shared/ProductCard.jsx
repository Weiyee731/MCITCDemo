// react
import React, { useEffect, useState } from "react";

// third-party
import classNames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// application
import AsyncAction from "./AsyncAction";
import Currency from "./Currency";
import Rating from "./Rating";
import { cartAddItem } from "../../store/cart";
import { Compare16Svg, Quickview16Svg, Wishlist16Svg } from "../../svg";
import { compareAddItem } from "../../store/compare";
import { quickviewOpen } from "../../store/quickview";
import { url } from "../../services/utils";
import { wishlistAddItem, wishlistRemoveItem } from "../../store/wishlist";
import { mobileMenuOpen } from '../../store/mobile-menu';
import Logo from "../../assets/Emporia.png"
import { GitAction } from "../../store/action/gitAction";

// application
import { Modal } from 'reactstrap';
import Product from './Product';
import { Cross20Svg } from '../../svg';
import { browserHistory } from "react-router";


function ProductCard(props) {
  const {
    product,
    layout,
  } = props;

  const [isQuickViewOpen, setModal] = useState(false)
  const [isCartSet, setCart] = useState(false)
  const containerClasses = classNames("product-card", {
    "product-card--layout--grid product-card--size--sm": layout === "grid-sm",
    "product-card--layout--grid product-card--size--nl": layout === "grid-nl",
    "product-card--layout--grid product-card--size--lg": layout === "grid-lg",
    "product-card--layout--list": layout === "list",
    "product-card--layout--horizontal": layout === "horizontal",
  });

  if (window.localStorage.getItem("id") && isCartSet === true) {
    props.CallViewProductCart({ userID: localStorage.getItem("id") })
    props.CallViewProductWishlist({ userID: localStorage.getItem("id") })
    setCart(true)
  }


  let badges = [];
  let image;
  let price;
  let features;
  let productView;

  // if (product !== null && isQuickViewOpen) {
  //   console.log(product.ProductID)
  //   props.CallProductsByID({ ProductID: product.ProductID })
  //   // if (props.productsByID !== undefined)
  //   //   productView = <Product product={props.productsByID} layout="quickview" />;
  // }

  // useEffect(() => {
  //   console.log("props.productsByID", props.productsByID)
  //   if (product !== null && isQuickViewOpen) {
  //     productView = <Product product={props.productsByID} layout="quickview" />;
  //     setModal(false)
  //   }
  // }, [props.productsByID]);

  const login = () => {
    browserHistory.push("/Emporia/login");
    window.location.reload(false);
  }

  const handleQuickView = () => {
    props.CallProductsByID({ ProductID: product.ProductID })
  }

  const handleCart = (product) => {
    let found = false

    if (props.productcart !== undefined) {
      props.productcart.filter(x => x.ProductID === product.ProductID).map((x) => {
        found = true
        props.CallUpdateProductCart({
          userID: localStorage.getItem("id"),
          userCartID: x.UserCartID,
          productQuantity: parseInt(x.ProductQuantity) + 1,
          productName: product.ProductName
        })
      })

      if (found === false) {
        props.CallAddProductCart({
          userID: window.localStorage.getItem("id"),
          productID: product.ProductID,
          productQuantity: 1,
          productVariationDetailID: 1,
          applyingPromoCode: 0,
          productName: product.ProductName
        })
      }
    } else
      login()

  }

  const handleWishlist = (product) => {
    let found = false

    if (props.wishlist !== undefined) {
      props.wishlist.filter(x => x.ProductID === product.ProductID).map((x) => {
        found = true
        props.CallDeleteProductWishlist({
          userID: localStorage.getItem("id"),
          userWishlistID: x.UserWishlistID,
          productName: product.ProductName
        })
      })
      if (found === false) {
        props.CallAddProductWishlist({
          userID: window.localStorage.getItem("id"),
          productID: product.ProductID,
          productName: product.ProductName
        })
      }
    } else
      login()
  }

  if (product.ProductImage && product.ProductImage.length > 0) {
    image = (
      <div className="product-card__image product-image">
        <Link to={url.product(product)} className="product-image__body">
          <img
            className="product-image__img"
            src={product.ProductImage !== undefined ? product.ProductImage : Logo}
            onError={(e) => { e.target.onerror = null; e.target.src = Logo }}
            alt=""
          />
        </Link>
      </div>
    );
  }

  if (product.compareAtPrice) {
    price = (
      <div className="product-card__prices">
        <span className="product-card__new-price">
          <Currency value={product.ProductPrice} currency={"RM"} />
        </span>{" "}
        <span className="product-card__old-price">
          <Currency value={product.compareAtPrice} currency={"RM"} />
        </span>
      </div>
    );
  } else {
    price = (
      <div className="product-card__prices">
        <Currency value={product.ProductPrice !== null && product.ProductPrice !== undefined ? parseFloat(product.ProductPrice) : 0} currency={"RM"} />
      </div>
    );
  }

  if (product.attributes && product.attributes.length) {
    features = (
      <ul className="product-card__features-list">
        {product.attributes
          .filter((x) => x.Model)
          .map((attribute, index) => (
            <li key={index}>{`${attribute.ProductName}: ${attribute.values
              .map((x) => x.ProductName)
              .join(", ")}`}</li>
          ))}
      </ul>
    );
  }

  return (
    <div className={containerClasses}>
      {/* <button
        type="button"
        onClick={() => setModal(true)}
        className={classNames("product-card__quickview")}
      >
        <Quickview16Svg />
      </button> */}
      {badges}
      {image}
      <div className="product-card__info">
        <div className="product-card__name">
          <Link to={url.product(product)}>{product.ProductName}</Link>
        </div>
        <div className="product-card__rating">
          <Rating value={product.ProductRating !== null ? product.ProductRating : 0} />
          <div className=" product-card__rating-legend">{`${product.ProductRating !== null ? product.ProductRating : 0}/5 (`}</div>
          <div className=" product-card__rating-legend">{`${product.ProductReviewCount !== null ? product.ProductReviewCount : 0} Reviews )`}</div>
        </div>
        {features}
      </div>

      <div className="product-card__actions">
        <div className="product-card__availability">
          Availability:{" "}
          <span style={{ color: "#3d464d" }}>In Stock</span>
        </div>
        {price}
        <div className="product-card__buttons">
          <button
            type="button"
            onClick={() => window.localStorage.getItem("id") ? handleCart(product) : login()}
            className={classNames("btn btn-primary product-card__addtocart")}
          >
            Add To Cart
          </button>

          {
            props.wishlist.length > 0 ?
              props.wishlist.filter(x => x.ProductID === product.ProductID).length > 0 ?
                props.wishlist.filter(x => x.ProductID === product.ProductID).map((x) => {
                  return (
                    <button type="button" onClick={() => window.localStorage.getItem("id") ? handleWishlist(product) : login()}
                      className={classNames('btn btn-light btn-sm btn-svg-icon')}
                    ><Wishlist16Svg fill="red" />
                    </button>
                  )
                }) :
                (
                  <button type="button" onClick={() => window.localStorage.getItem("id") ? handleWishlist(product) : login()}
                    className={classNames("btn btn-light btn-svg-icon btn-svg-icon--fake-svg product-card__wishlist")}
                  ><Wishlist16Svg />
                  </button>
                ) :
              (
                <button type="button" onClick={() => window.localStorage.getItem("id") ? handleWishlist(product) : login()}
                  className={classNames("btn btn-light btn-svg-icon btn-svg-icon--fake-svg product-card__wishlist")}
                ><Wishlist16Svg />
                </button>
              )
          }
        </div>
      </div>

      {/* <Modal isOpen={isQuickViewOpen} centered size="xl">
        <div className="quickview">
          <button className="quickview__close" type="button" onClick={() => handleQuickView()}>
            <Cross20Svg />
          </button>
          {productView}
        </div>
      </Modal> */}

    </div>
  );


}

ProductCard.propTypes = {
  /**
   * product object
   */
  product: PropTypes.object.isRequired,
  /**
   * product card layout
   * one of ['grid-sm', 'grid-nl', 'grid-lg', 'list', 'horizontal']
   */
  layout: PropTypes.oneOf([
    "grid-sm",
    "grid-nl",
    "grid-lg",
    "list",
    "horizontal",
  ]),
};


const mapStateToProps = (state) => ({
  productcart: state.counterReducer.productcart,
  wishlist: state.counterReducer.wishlist,
  productsByID: state.counterReducer.productsByID

});

const mapDispatchToProps = (dispatch) => {
  return {
    // CallDeleteProductCart: (prodData) => dispatch(GitAction.CallDeleteProductCart(prodData)),
    CallUpdateProductCart: (prodData) => dispatch(GitAction.CallUpdateProductCart(prodData)),
    CallAddProductCart: (prodData) => dispatch(GitAction.CallAddProductCart(prodData)),
    CallViewProductWishlist: (propsData) => dispatch(GitAction.CallViewProductWishlist(propsData)),

    CallViewProductCart: (prodData) => dispatch(GitAction.CallViewProductCart(prodData)),
    CallAddProductWishlist: (prodData) => dispatch(GitAction.CallAddProductWishlist(prodData)),
    CallDeleteProductWishlist: (prodData) => dispatch(GitAction.CallDeleteProductWishlist(prodData)),

    CallProductsByID: (prodData) => dispatch(GitAction.CallProductsByID(prodData)),
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
