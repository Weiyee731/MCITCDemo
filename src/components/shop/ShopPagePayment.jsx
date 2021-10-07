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

import { GitAction } from "../../store/action/gitAction";
import Cards from "react-credit-cards";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';


import {
  formatCVC,
} from "../account/AccountPageCreditCard/utils";


class PagePayment extends Component {
  payments = payments;

  constructor(props) {
    super(props);

    this.state = {
      payment: "bank",
      paymentMethods: "",

      cart: [],
      subtotal: 0,
      total: 0,
      shipping: 25,
      tax: 0,

      tabvalue: 0,
      cvcVisible: false,
      cvc: ""
    };
    this.setDetails = this.setDetails.bind(this)
    this.handleInputFocus = this.handleInputFocus.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlePaymentChange = this.handlePaymentChange.bind(this);
    this.props.CallAllCreditCard(window.localStorage.getItem("id"));

  }

  setDetails(productcart) {
    this.setState({
      cart: productcart
    })
    this.setState({ subtotal: this.props.data.reduce((subtotal, item) => subtotal + item.total, 0) })
    this.setState({ total: this.props.data.reduce((subtotal, item) => subtotal + item.total, 0) + this.state.shipping })
  }

  componentDidMount() {
    if (this.props.data !== undefined && this.props.data.length > 0) {
      this.setDetails(this.props.data)
    }
  }

  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name });
  };

  handleInputChange = ({ target }) => {
    if (target.name === "cvc") {
      target.value = formatCVC(target.value);
    }
    this.setState({ [target.name]: target.value });
    this.props.handleGetPaymentId(this.state.tabvalue, this.state.paymentMethods)
  };

  handlePaymentChange = (value) => {
    this.setState({ paymentMethods: value })
    this.props.handleGetPaymentId(this.state.tabvalue, value)
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
      this.setState({ tabvalue: index, cvcVisible: false, paymentMethods: "", cvc: "" });
    };

    const handleChange = (event, newValue) => {
      this.setState({ tabvalue: newValue, cvcVisible: false, paymentMethods: "", cvc: "" });
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
                  <h4>Credit Card</h4>
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

                  <div>
                    <Grid
                      container
                      style={{
                        margin: "auto",
                        justifyContent: "Space-between",
                      }}
                    >
                      {
                        // this.props.creditcard.length > 0 && this.props.creditcard[0].ReturnVal !== "0" && this.props.creditcard[0].ReturnVal === undefined ?
                        this.props.creditcard.length > 0 ?
                          this.props.creditcard.map((cards) => {
                            return (
                              <Grid item style={{ margin: "2vw", marginTop: "1vw", marginBottom: "1vw", }} >
                                <div>
                                  {
                                    this.state.cvcVisible === true && cards.UserPaymentMethodID === this.state.paymentMethods ?
                                      <>
                                        <Tooltip title="Edit" style={{ right: "-230px" }}  >
                                          <IconButton aria-label="Edit">
                                            <RadioButtonCheckedIcon
                                              fontSize="small"
                                              onClick={() => this.setState({ cvcVisible: false, paymentMethods: cards.UserPaymentMethodID, cvc: "" })} />
                                          </IconButton>
                                        </Tooltip>
                                        <Cards
                                          cvc={this.state.cvc}
                                          expiry={cards.UserCardExpireDate}
                                          focused={this.state.focus}
                                          name={cards.UserCardName}
                                          number={cards.UserCardNo}
                                          preview={true}
                                        />
                                        <br />
                                        <div>
                                          <input
                                            type="tel"
                                            name="cvc"
                                            className="form-control"
                                            placeholder="CVC"
                                            pattern="\d{3,4}"
                                            required
                                            value={this.state.cvc}
                                            onChange={this.handleInputChange}
                                            onFocus={this.handleInputFocus}
                                          />
                                        </div>
                                      </>
                                      :
                                      <>
                                        <Tooltip title="Edit" style={{ right: "-230px" }}   >
                                          <IconButton aria-label="Edit">
                                            <RadioButtonUncheckedIcon
                                              fontSize="small"
                                              onClick={() => this.setState({ cvcVisible: true, paymentMethods: cards.UserPaymentMethodID, cvc: "" })} />
                                          </IconButton>
                                        </Tooltip>
                                        <Cards
                                          expiry={cards.UserCardExpireDate}
                                          name={cards.UserCardName}
                                          number={cards.UserCardNo}
                                          preview={true}
                                        />
                                      </>
                                  }

                                </div>
                              </Grid>
                            )
                          })
                          : ""
                      }
                    </Grid>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div style={Object.assign({})}>
              <Card style={cardStyle}>
                <CardContent>
                  <h4>E-Wallet</h4>
                  <h5>Selected : {isNaN(this.state.paymentMethods) === true && this.state.paymentMethods.toUpperCase()}</h5>
                  <br />
                  {/* <div class="row"> */}
                  <Button onClick={() => this.handlePaymentChange("touch and go")}>
                    <img width="250" src="images/payment/touchandgo.png"></img>
                  </Button>
                  <Button onClick={() => this.handlePaymentChange("boost")}>
                    <img width="250" src="images/payment/boost.png"></img>
                  </Button>
                  <Button onClick={() => this.handlePaymentChange("grab")}>
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
                  <h5>Selected : {isNaN(this.state.paymentMethods) === true && this.state.paymentMethods.toUpperCase()}</h5>
                  <br />
                  {/* <div class="row"> */}
                  <Button onClick={() => this.handlePaymentChange("hong leong bank")}>
                    {" "}
                    <img width="250" src="images/payment/hongleong.png"></img>
                  </Button>
                  <Button onClick={() => this.handlePaymentChange("maybank")}>
                    {" "}
                    <img width="250" src="images/payment/maybank.png"></img>
                  </Button>
                  <Button onClick={() => this.handlePaymentChange("public bank")}>
                    {" "}
                    <img width="250" src="images/payment/public.png"></img>
                  </Button>
                  {/* </div> */}
                  {/* <div class="row"> */}
                  <Button onClick={() => this.handlePaymentChange("cimb bank")}>
                    {" "}
                    <img width="250" src="images/payment/cimb.png"></img>
                  </Button>
                  <Button onClick={() => this.handlePaymentChange("rhb bank")}>
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
                  <h5>Selected : {isNaN(this.state.paymentMethods) === true && this.state.paymentMethods.toUpperCase()}</h5>
                  <br />
                  <Button onClick={() => this.handlePaymentChange("pay pal")}>
                    <img width="200" src="images/payment/paypal.png"></img>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </SwipeableViews>
        </div>
      </div>
    );
  }

  render() {

    console.log("this.props.data. in page payment", this.props.data)
    if (this.props.data.length < 1) {
      return <Redirect to="cart" />;
    }

    const breadcrumb = [
      { title: "Home", url: "" },
      // { title: "Shopping Cart", url: "/shop/cart" },
      // { title: "Checkout", url: "/shop/checkout" },
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
  creditcard: state.counterReducer["creditcards"],
});

const mapDispatchToProps = (dispatch) => {
  return {
    CallAllCreditCard: (prodData) =>
      dispatch(GitAction.CallAllCreditCard(prodData)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PagePayment);
