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
    this.setState({
      cart: productcart
    })
    this.setState({ subtotal: this.props.data.reduce((subtotal, item) => subtotal + item.total, 0) })
    this.setState({ total: this.props.data.reduce((subtotal, item) => subtotal + item.total, 0) + this.state.shipping })

    this.props.handleGetTotal(this.props.data.reduce((subtotal, item) => subtotal + item.total, 0) + this.state.shipping)
  }

  componentDidMount() {
    if (this.props.data !== undefined && this.props.data.length > 0) {
      this.setDetails(this.props.data)
    }
  }

  getItemList(FilteredList) {
    return (
      <>
        {FilteredList.map((item) => (
          <tr key={item.id}>
            <td>{`${item.product.ProductName} × ${item.quantity}`}</td>
            <td>
              <Currency value={item.total} />
            </td>
          </tr>
        ))}
      </>
    )
  }


  handlePaymentChange = (event) => {
    if (event.target.checked) {
      this.setState({ payment: event.target.value });
    }
  };

  renderTotals() {
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
    return (
      <table className="checkout__totals">
        <thead className="checkout__totals-header">
          <tr>
            <th>Product</th>
            <th>Total</th>
          </tr>
        </thead>
        {
          this.props.merchant.map((shop, i) => {
            return (
              <>
                <div style={{ textAlign: "left", fontSize: "13px" }}>{"Order " + parseInt(i + 1) + " : " + shop.MerchantShopName}</div>
                <tbody className="checkout__totals-products">{this.getItemList(this.state.cart.filter((x) => x.MerchantShopName === shop.MerchantShopName))}</tbody>
              </>
            )
          })
        }
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

    if (this.props.data.length < 1) {
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
        <div className="cart">
          <div className="container">
            <div className="card mt-3">
              <div className="card-body">
                <h5 className="card-title">Emporia</h5>
                {
                  this.props.addresss !== undefined && this.props.addresss.state !== undefined && this.props.addresss.state.address !== 0 ?
                    this.props.addresses.length > 0 && this.props.addresses !== undefined && this.props.addresses.filter((x) =>
                      x.UserAddressBookID === this.props.addresss.state.address).map((address) => {
                        return (
                          <h6>
                            Deivery Address: {address.UserAddressLine1 + " " + address.UserAddressLine2} <br />
                            Tel No. : (60) {address.UserContactNo}
                          </h6>
                        )
                      })
                    :
                    <h6>
                      User Self Pick Up
                    </h6>
                }
                {
                  this.props.addresss !== undefined && this.props.addresss.state !== undefined && this.props.addresss.state.PaymentMethodID !== 0 ?
                    <h6>Payment Method: {this.props.addresss.state.PaymentMethodType} - {this.props.addresss.state.PaymentMethod}</h6> :
                    <h6>Payment Method: No Payment Method Selected</h6>
                }
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
  addresses: state.counterReducer["addresses"],
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PageCompleted);