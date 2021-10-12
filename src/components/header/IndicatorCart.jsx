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
// import { cartRemoveItem, cartItems } from "../../store/cart";
import { url } from "../../services/utils";
import Logo from "../../assets/Emporia.png";
import shopApi from "../../api/shop";
import { Button } from "@material-ui/core";
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
    if (localStorage.getItem("id")) {
      this.props.CallViewProductCart({ userID: localStorage.getItem("id") })
      this.props.CallViewProductWishlist({ userID: localStorage.getItem("id") })
    }
  }

  // const { this.props.cart, cartRemoveItem } = props;
  // const [added, setadd] = useState(localStorage.getItem("checkoutind"));
  // const [orderid, setOrderid] = useState(0);
  // let dropdown;

  // CheckOutOnClick = (items) => {
  //   let ProductIDs = [];
  //   let ProductQuantity = [];
  //   items.map((row) => {
  //     ProductIDs.push(row.product.ProductID);
  //     ProductQuantity.push(row.quantity);
  //   });
  //   // alert("ww");
  //   shopApi
  //     .addOrder({
  //       UserID: localStorage.getItem("id"),
  //       Products: ProductIDs,
  //       ProductQuantity: ProductQuantity,
  //     })
  //     .then((json) => {
  //       // localStorage.setItem("checkoutind", true);
  //       // setadd(true);
  //       // setOrderid(json[0].OrderID);
  //       browserHistory.push("/shop/checkout?order=" + json[0].OrderID);
  //       window.location.reload(false);
  //     });
  // };
  render() {

    // const {cartItems} = this.props
    var totals;
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

      // const removeButton = (
      //   <AsyncAction
      //     action={() => cartRemoveItem(item.id)}
      //     render={({ run, loading }) => {
      //       const classes = classNames(
      //         "dropcart__product-remove btn btn-light btn-sm btn-svg-icon",
      //         {
      //           "btn-loading": loading,
      //         }
      //       );
      //       return (
      //         <button type="button" onClick={run} className={classes}>
      //           <Cross10Svg />
      //         </button>
      //       );
      //     }}
      //   />
      // );

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
                {/* <Currency value={item.price} /> */}
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
    // return (
    //   <Indicator
    //     url="/shop/cart"
    //     // dropdown={dropdown}
    //     value={this.props.cart.items.length}
    //     icon={<Cart20Svg />}
    //     // onClick={cartItems(24)}
    //   />
    // );

    if (this.props.productcart !== undefined && this.props.productcart[0] !== undefined && this.props.productcart[0].ReturnVal === undefined) {
      // const dropdown = (
      //   <div className="dropcart">
      //     <div className="dropcart__products-list">{items}</div>
      //     <div className="dropcart__totals">
      //       <table>
      //         <tbody>
      //           {totals}
      //           <tr>
      //             <th>Total</th>
      //             <td>
      //               <Currency value={this.props.cart.total} />
      //             </td>
      //           </tr>
      //         </tbody>
      //       </table>
      //     </div>
      //     <div className="dropcart__buttons">
      //       <Link className="btn btn-secondary" to="/shop/cart">
      //         View Cart
      //       </Link>
      //       {localStorage.getItem("id") ? (
      //         <Button
      //           onClick={this.CheckOutOnClick.bind(this, this.props.cart.items)}
      //         >
      //           {/* <Link className="btn btn-primary" to="/shop/checkout?id='`dd`'"> */}
      //           Checkout
      //           {/* </Link> */}
      //         </Button>
      //       ) : (
      //         <Link className="btn btn-primary" to="/login">
      //           Checkout
      //         </Link>
      //       )}
      //     </div>
      //   </div>
      // );
      return (
        <Indicator
          url="/shop/cart"
          // dropdown={dropdown}
          value={this.props.productcart.length}
          icon={<Cart20Svg />}
        />
      );
    } else {
      // const dropdown = (
      //   <div className="dropcart">
      //     <div className="dropcart__empty">
      //       Your shopping cart is empty!
      //     </div>
      //   </div>
      // );
      return (
        <Indicator
          url="/shop/cart"
          // dropdown={dropdown}
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
