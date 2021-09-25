// react
import React, { Component } from "react";
import { Card, CardContent } from "@material-ui/core";
// third-party
import { connect } from "react-redux";
import { Helmet } from "react-helmet-async";
import { Link, Redirect } from "react-router-dom";
import { Button } from "@material-ui/core";
// application
import Collapse from "../shared/Collapse";
import Currency from "../shared/Currency";
import PageHeader from "../shared/PageHeader";
import { Check9x7Svg } from "../../svg";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SwipeableViews from "react-swipeable-views";
// data stubs
import payments from "../../data/shopPayments";
import theme from "../../data/theme";
import queryString from "query-string";
import PageCheckoutQr from "./ShopPageCheckoutQr";

class PageCompleted extends Component {
  payments = payments;

  constructor(props) {
    super(props);

    this.state = {
      payment: "bank",

      cart: [],
      subtotal: 0,
      total: 0,
      shipping: 25,
      tax: 0,
    };
    this.setDetails = this.setDetails.bind(this)
  }

  setDetails(productcart) {
    productcart.map((x) => {
      this.state.cart.push(
        {
          id: x.UserCartID,
          product: x,
          options: [],
          price: x.ProductSellingPrice,
          total: x.ProductQuantity * x.ProductSellingPrice,
          quantity: x.ProductQuantity
        }
      )
    })
    this.setState({ subtotal: this.state.cart.reduce((subtotal, item) => subtotal + item.total, 0) })
    this.setState({ total: this.state.cart.reduce((subtotal, item) => subtotal + item.total, 0) + this.state.shipping })
  }

  componentDidMount() {
    if (this.props.productcart !== undefined) {
      this.setDetails(this.props.productcart)
    }
  }

  handlePaymentChange = (event) => {
    if (event.target.checked) {
      this.setState({ payment: event.target.value });
    }
  };

  renderTotals() {
    // const { cart } = this.props;

    // if (cart.extraLines.length <= 0) {
    //   return null;
    // }

    // const extraLines = cart.extraLines.map((extraLine, index) => (
    //   <tr key={index}>
    //     <th style={{ textAlign: "right" }}>{extraLine.title}</th>
    //     <td>
    //       <Currency value={extraLine.price} />
    //     </td>
    //   </tr>
    // ));
    return (
      <React.Fragment>
        <tbody className="checkout__totals-subtotals">
          <tr>
            <th style={{ textAlign: "right" }}>Subtotal</th>
            <td>
              <Currency value={this.state.subtotal} />
            </td>
          </tr>
          <tr>
            <th style={{ textAlign: "right" }}>Shipping</th>
            <td>
              <Currency value={this.state.shipping} />
            </td>
          </tr>
          <tr>
            <th style={{ textAlign: "right" }}>Tax</th>
            <td>
              <Currency value={this.state.tax} />
            </td>
          </tr>
        </tbody>
      </React.Fragment>
    );
  }

  renderCart() {

    const items = this.state.cart.map((item) => (
      <tr key={item.id}>
        <td>{`${item.product.ProductName} × ${item.quantity}`}</td>
        <td>
          <Currency value={item.total} />
        </td>
      </tr>
    ));

    return (
      <table className="checkout__totals">
        <thead className="checkout__totals-header">
          <tr>
            <th>Product</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody className="checkout__totals-products">{items}</tbody>
        {this.renderTotals()}
        <tfoot className="checkout__totals-footer">
          <tr>
            <th style={{ textAlign: "right" }}>Total</th>
            <td>
              <Currency value={this.state.total} />
            </td>
          </tr>
        </tfoot>
      </table>
    );
  }

  render() {

    if (this.props.productcart.length < 1) {
      return <Redirect to="cart" />;
    }

    const breadcrumb = [
      { title: "Home", url: "" },
      { title: "Shopping Cart", url: "/shop/cart" },
      { title: "Checkout", url: "/shop/checkout" },
      { title: "OnlinePayment", url: "" },
    ];

    return (
      <React.Fragment>
        <div className="cart block container_" style={{ width: "100%" }}>
          <div className="container">
            <div className="card mb-0">
              <div className="card-body">
                <h3 className="card-title">Emporia</h3>
                <h5 >
                  {/* Address: Sejingkat, 93050 Kuching, Sarawak | Tel No. : (60) 012-850 9198 */}
                </h5>
                {/* <h5 >
                 Delivery Address: { localStorage.getItem("address")}
                </h5>
                {console.log(localStorage.getItem("address"))} */}
                {this.renderCart()}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  productcart: state.counterReducer.productcart
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PageCompleted);
