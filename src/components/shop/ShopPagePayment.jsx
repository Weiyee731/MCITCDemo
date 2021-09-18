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
import QRCode from "qrcode.react";
import shopApi from "../../api/shop";
import { browserHistory } from "react-router";

class PagePayment extends Component {
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

  CheckOutOnClick = (items) => {
    let ProductIDs = [];
    let ProductQuantity = [];
    items.map((row) => {
      ProductIDs.push(row.product.ProductID);
      ProductQuantity.push(row.quantity);
    });
    // alert("ww");
    shopApi
      .addOrder({
        UserID: localStorage.getItem("id"),
        Products: ProductIDs,
        ProductQuantity: ProductQuantity,
      })
      .then((json) => {
        // localStorage.setItem("checkoutind", true);
        // setadd(true);
        // setOrderid(json[0].OrderID);
        browserHistory.push("/shop/checkout?order=" + json[0].OrderID);
        window.location.reload(false);
      });
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

  renderPaymentsList() {
    const { payment: currentPayment } = this.state;
    const payments = this.payments.map((payment) => {
      // const renderPayment = ({ setItemRef, setContentRef }) => (
      return <Tab label={payment.title} />;
    });

    const handleChangeIndex = (index) => {
      this.setState({ tabvalue: index });
    };

    const handleChange = (event, newValue) => {
      this.setState({ tabvalue: newValue });
    };

    const cardStyle = {
      width: "99%",
      margin: "1% auto",
      textAlign: "left",
      fontSize: "16px",
    };

    return (
      <div className="checkout block">
        <div className="container">
          {/* <div className="row"> */}
          <Tabs
            value={this.state.tabvalue}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChange}
            aria-label="disabled tabs example"
          >
            {payments}
          </Tabs>

          <SwipeableViews
            enableMouseEvents
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={this.state.tabvalue}
            onChangeIndex={handleChangeIndex}
          >
            <div style={Object.assign({})}>
              <Card style={cardStyle}>
                <CardContent>
                  <h4>Invoice</h4>
                  <br />
                  <div style={{ float: "right", marginBottom: "10px" }}>
                    <img width="50" src="images/creditcard/visa.png"></img>
                    &nbsp;
                    <img
                      width="50"
                      src="images/creditcard/mastercard.png"
                    ></img>
                  </div>
                  <br />
                  <br />
                  <div className="form-group row">
                    <div className="col-4">
                      <label htmlFor="checkout-company-name">Card Number</label>
                    </div>
                    <div className="col-8">
                      <input
                        type="text"
                        className="form-control"
                        id="checkout-company-name"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-4">
                      <label htmlFor="checkout-street-address">
                        Name of Cardholder
                      </label>
                    </div>
                    <div className="col-8">
                      <input
                        type="text"
                        className="form-control"
                        id="checkout-street-address"
                        placeholder="Ex. John Smith"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-4">
                      <label htmlFor="checkout-street-address">
                        Expiry Date
                      </label>
                    </div>
                    <div className="col-8">
                      <input
                        type="text"
                        className="form-control"
                        id="checkout-street-address"
                        placeholder="01/25"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-4">
                      <label htmlFor="checkout-street-address">CVV</label>
                    </div>
                    <div className="col-8">
                      <input
                        type="text"
                        className="form-control"
                        id="checkout-street-address"
                        placeholder=""
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary btn-xl btn-block"
                  >
                    Place Order
                  </button>
                </CardContent>
              </Card>
            </div>
            <div style={Object.assign({})}>
              <Card style={cardStyle}>
                <CardContent>
                  <h4>To Pay with E-Wallet</h4>
                  <br />
                  {/* <div class="row"> */}
                  <Button>
                    <img width="250" src="images/payment/touchandgo.png"></img>
                  </Button>
                  <Button>
                    <img width="250" src="images/payment/boost.png"></img>
                  </Button>
                  <Button>
                    <img width="250" src="images/payment/grab.png"></img>
                  </Button>
                  {/* </div> */}
                </CardContent>
              </Card>
            </div>
            <div style={Object.assign({})}>
              <Card style={cardStyle}>
                <CardContent>
                  {/* <img width="100" src="images/payment/fpx.png"></img> */}
                  <h4>Online Banking (Current/Saving/Credit Card Account)</h4>
                  <br />
                  {/* <div class="row"> */}
                  <Button>
                    {" "}
                    <img width="250" src="images/payment/hongleong.png"></img>
                  </Button>
                  <Button>
                    {" "}
                    <img width="250" src="images/payment/maybank.png"></img>
                  </Button>
                  <Button>
                    {" "}
                    <img width="250" src="images/payment/public.png"></img>
                  </Button>
                  {/* </div> */}
                  {/* <div class="row"> */}
                  <Button>
                    {" "}
                    <img width="250" src="images/payment/cimb.png"></img>
                  </Button>
                  <Button>
                    {" "}
                    <img width="250" src="images/payment/rhb.jpg"></img>
                  </Button>
                  {/* </div> */}
                </CardContent>
              </Card>
            </div>
            <div style={Object.assign({})}>
              <Card style={cardStyle}>
                <CardContent>
                  {/* <img width="100" src="images/payment/paypal.png"></img> */}
                  <h4>PayPal</h4>
                  <br />
                  <Button style={{}}>
                    <img width="200" src="images/payment/paypal.png"></img>
                  </Button>
                </CardContent>
              </Card>
            </div>
            <div style={Object.assign({})}>
              {/* <PageCheckoutQr qrcode={this.props.qrcode} /> */}
              <div style={{ textAlign: "center" }}>
                {console.log(this.props.qrcode)}
                <QRCode
                  style={{
                    margin: "auto",
                    width: "80%",
                    maxWidth: "600px",
                    maxHeight: "600px",
                    height: "80%",
                    padding: "10px",
                    textAlign: "center",
                  }}
                  id="123456"
                  value={this.props.qrcode.order}
                  size={290}
                  level={"H"}
                  includeMargin={true}
                />
              </div>
            </div>
          </SwipeableViews>
        </div>
      </div>
      // </div>
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
                <h3 className="card-title">Your Order</h3>
                {this.renderCart()}
                {this.renderPaymentsList()}
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

export default connect(mapStateToProps, mapDispatchToProps)(PagePayment);
