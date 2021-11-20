// react
import React, { useEffect, useState } from "react";

// third-party
import classNames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// application
import Currency from "./Currency";
import Rating from "./Rating";
import { Wishlist16Svg } from "../../svg";
import { url } from "../../services/utils";
import Logo from "../../assets/Emporia.png"
import { GitAction } from "../../store/action/gitAction";

// application
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import Product from './Product';
import { Cross20Svg } from '../../svg';
import { browserHistory } from "react-router";
import {
  Divider, Button
} from "@material-ui/core";


function ProductCard(props) {
  const {
    product,
    layout,
  } = props;

  const containerClasses = classNames("product-card", {
    "product-card--layout--grid product-card--size--sm": layout === "grid-sm",
    "product-card--layout--grid product-card--size--nl": layout === "grid-nl",
    "product-card--layout--grid product-card--size--lg": layout === "grid-lg",
    "product-card--layout--list": layout === "list",
    "product-card--layout--horizontal": layout === "horizontal",
  });

  let badges = [];
  let image;
  let price;
  let features;
  let wishlistView;

  const login = () => {
    browserHistory.push("/Emporia/login");
    window.location.reload(false);
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

  image = (
    <div className="product-card__image product-image">
      <div className="product-image__body">
        <img
          className="product-image__img"
          src={product.ProductImage !== null ? product.ProductImage : Logo}
          onError={(e) => { e.target.onerror = null; e.target.src = Logo }}
          alt={product.ProductName}
        />
      </div>
    </div>
  );

  // if (product.ProductImage !== null && product.ProductImage !== undefined && product.ProductImage.length > 0) {
  //   image = (
  //     <div className="product-card__image product-image">
  //       <Link to={url.product(product)} className="product-image__body">
  //         <img
  //           className="product-image__img"
  //           src={product.ProductImage !== null ? product.ProductImage : Logo}
  //           onError={(e) => { e.target.onerror = null; e.target.src = Logo }}
  //           alt={product.ProductName}
  //         />
  //       </Link>
  //     </div>
  //   );
  // }
  // else {
  //   image = (
  //     <div className="product-card__image product-image">
  //       <div className="product-image__body">
  //         <img
  //           className="product-image__img"
  //           src={Logo}
  //           onError={(e) => { e.target.onerror = null; e.target.src = Logo }}
  //           alt={product.ProductName}
  //         />
  //       </div>
  //     </div>
  //   );
  // }

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

  wishlistView =
    (
      props.wishlist.length > 0 && props.wishlist[0].ReturnVal !== '0' ?
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
    );

  return (
    <div className={containerClasses}>
      {badges}
      <Link to={url.product(product)}>{image}</Link>
      <div className="product-card__info">
        <div className="product-card__name">
          <Link to={url.product(product)}>{product.ProductName}</Link>
        </div>
        <div className="product-card__rating">
          <Rating value={product.ProductRating !== null ? product.ProductRating : 0} />
          <div className="product-card__rating-legend">{product.ProductRating !== null ? parseFloat(product.ProductRating).toFixed(1) + "/5.0" : "0.0/5.0"}</div>
        </div>
        {
          product.ProductSold !== "0" && product.ProductSold !== null &&
          <div
            className="product-card__rating-legend mt-1"
            style={{
              marginLeft: '0px'
            }}
          >
            {`(${product.ProductSold} Sold)`}
          </div>
        }
        {features}
      </div>

      <div className="product-card__actions">
        <div className="product-card__availability">
          Availability:{" "}
          <span style={{ color: "#3d464d" }}>In Stock</span>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <label style={{ fontSize: "20px" }}>{price}</label>
          {wishlistView}
        </div>
        {
          product.ShopState !== null &&
          <div style={{ textAlign: "right", paddingRight: "10px" }}>
            <label style={{ color: "#2b535e" }}>
              {product.ShopState}
            </label>
          </div>
        }
      </div>
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
  wishlist: state.counterReducer.wishlist,
});

const mapDispatchToProps = (dispatch) => {
  return {
    CallAddProductWishlist: (prodData) => dispatch(GitAction.CallAddProductWishlist(prodData)),
    CallDeleteProductWishlist: (prodData) => dispatch(GitAction.CallDeleteProductWishlist(prodData)),
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
