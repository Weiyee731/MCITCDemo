// react
import React, { useEffect, useState } from "react";

// third-party
import classNames from "classnames";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { browserHistory } from "react-router";

// application
import AsyncAction from "../shared/AsyncAction";
import Currency from "../shared/Currency";
import Indicator from "./Indicator";
import { Cart20Svg, Cross10Svg } from "../../svg";
import { url } from "../../services/utils";
import Logo from "../../assets/Emporia.png";
import { Button } from "@mui/material";
import { GitAction } from "../../store/action/gitAction";

class IndicatorCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props;
    this.removeItem = this.removeItem.bind(this)
  }

  removeItem(product) {
    this.props.CallDeleteProductCart({ userCartID: product.UserCartID, userID: localStorage.getItem("id"), productName: product.ProductName })
  }

  componentDidMount() {
    if (localStorage.getItem("isLogin") === true) {
      this.props.CallViewProductCart({ userID: localStorage.getItem("id") })
      this.props.CallViewProductWishlist({ userID: localStorage.getItem("id") })
    }
  }
  setCartOpen(bool) {
    console.log("click".bool);
  }
  render() {
    var totals;
    console.log("this.props",this.props)
    if (this.props.cart.extraLines.length > 0) {
      const extraLines = this.props.cart.extraLines.map((extraLine, index) => (
        <tr key={index}>
          <th>{extraLine.title}</th>
          <td>
            <Currency value={extraLine.price} />
          </td>
        </tr>
      ));

      totals = (
        <React.Fragment>
          <tr>
            <th style={{ textAlign: "right" }}>Subtotal</th>
            <td>
              <Currency value={this.props.cart.subtotal} />
            </td>
          </tr>
          {extraLines}
        </React.Fragment>
      );
    }

    const items = this.props.cart.items.map((item) => {
      let options;
      let image;

      if (item.options) {
        options = (
          <ul className="dropcart__product-options">
            {item.options.map((option, index) => (
              <li
                key={index}
              >{`${option.optionTitle}: ${option.valueTitle}`}</li>
            ))}
          </ul>
        );
      }

      if (item.product.ProductImages) {
        if (item.product.ProductImages.length) {
          image = (
            <div className="product-image dropcart__product-image">
              <Link
                to={url.product(item.product)}
                className="product-image__body"
              >
                <img
                  className="product-image__img"
                  src={
                    JSON.parse(item.product.ProductImages)[0].ProductMediaUrl
                  }
                  alt=""
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = Logo;
                  }}
                />
              </Link>
            </div>
          );
        }
      }

      return (
        <div key={item.id} className="dropcart__product">
          {image}
          <div className="dropcart__product-info">
            <div className="dropcart__product-name">
              <Link to={url.product(item.product)}>{item.product.name}</Link>
            </div>
            {options}
            <div className="dropcart__product-meta">
              {" × "}
              <span className="dropcart__product-quantity">
                {item.quantity}
              </span>
              <span className="dropcart__product-price">
              </span>
            </div>
          </div>
          <Link onClick={() => this.removeItem(item.product)} className={'dropcart__product-remove btn btn-light btn-sm btn-svg-icon'}
          > <Cross10Svg />
          </Link>
          {/* {removeButton} */}
        </div>
      );
    });


    if (this.props.productcart !== undefined && this.props.productcart[0] !== undefined && this.props.productcart[0].ReturnVal === undefined) {
      return (
        <Indicator
          // url="/shop/cart"
          onClick={() => this.props.onClick()}
          value={this.props.productcart.length}
          icon={<Cart20Svg />}
        />
      );
    } else {
      return (
        <Indicator
          // url="/shop/cart"
          onClick={() => this.props.onClick()}
          value={0}
          icon={<Cart20Svg />}
        />
      );
    }
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart,
  productcart: state.counterReducer.productcart
});


const mapDispatchToProps = (dispatch) => {
  return {
    CallDeleteProductCart: (prodData) => dispatch(GitAction.CallDeleteProductCart(prodData)),
    CallViewProductCart: (prodData) => dispatch(GitAction.CallViewProductCart(prodData)),
    CallViewProductWishlist: (propsData) => dispatch(GitAction.CallViewProductWishlist(propsData)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(IndicatorCart);
