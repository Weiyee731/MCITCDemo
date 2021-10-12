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

// Credit Card
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { toast } from "react-toastify";
import Logo from "../../assets/Emporia.png";

import {
  formatCreditCardNumber,
  formatExpirationDate,
  formatFormData,
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
      total: 6,
      shipping: 25,
      tax: 0,

      tabvalue: 0,
      cvcVisible: false,
      cvc: "",


      isAddNewCard: false,
      newexpiry: "",
      focus: "",
      newname: "",
      newnumber: "",
      cardtype: ""
    };
    this.setDetails = this.setDetails.bind(this)
    this.handleInputFocus = this.handleInputFocus.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlePaymentChange = this.handlePaymentChange.bind(this);
    this.handleAddNewCard = this.handleAddNewCard.bind(this);
    this.handleAddCreditCard = this.handleAddCreditCard.bind(this);
    this.handleChangeCardType = this.handleChangeCardType.bind(this);
    this.resetData = this.resetData.bind(this);
    this.props.CallAllCreditCard(window.localStorage.getItem("id"));
    this.props.CallAllPaymentMethod();
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

  resetData() {
    this.setState({
      isAddNewCard: false,
      newexpiry: "",
      focus: "",
      newname: "",
      newnumber: "",
      cardtype: "",

      cvcVisible: false,
      paymentMethods: "",
      cvc: ""
    })
  }

  handleChangeCardType = (e) => {
    const { value } = e.target;

    this.setState({
      cardtype: value,
    });
  };

  handleInputFocus = (e) => {
    console.log("handleInputFocus", e.target.name)
    this.setState({ focus: e.target.name });
  };

  handleInputChange = ({ target }) => {
    console.log("handleInputChange", target)
    console.log("handleInputChange", target.name)
    console.log("handleInputChange", target.value)
    if (target.name === "newnumber") {
      if (target.value.length > 1) {
        target.value = formatCreditCardNumber(target.value)[1].replace(
          /\s+/g,
          ""
        );
      }
      if (formatCreditCardNumber(target.value)[0] !== undefined) {
        this.setState({ issuer: formatCreditCardNumber(target.value)[0] });
      } else {
        toast.error("Card Number's format is incorrect");
      }
    } else if (target.name === "newexpiry") {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === "cvc") {
      target.value = formatCVC(target.value);
    }

    this.setState({ [target.name]: target.value });
    this.props.handleGetPaymentId(this.state.tabvalue, this.state.paymentMethods)
  };

  handlePaymentChange = (value, typeid, typevalue) => {

    console.log("handlepaymentchange", value)
    console.log("typeid", typeid)
    console.log("typevalue", typevalue)
    this.setState({ paymentMethods: value.PaymentMethod })
    this.props.handleGetPaymentId(value, typeid, typevalue)
  };

  handleAddNewCard = () => {
    this.setState({ isAddNewCard: true })
  }

  handleAddCreditCard = () => {
    console.log("THIS TO ADD NEW CARD")
    console.log("this.state", this.state)
    console.log("HERE")
    if (this.state.newname.length && this.state.newnumber.length && this.state.newexpiry.length && this.state.cardtype.length && this.state.cardtype.length) {
      console.log("handleAddCreditCard")
      this.props.CallAddCreditCard({
        USERID: localStorage.getItem("id"),
        name: this.state.newname,
        number: this.state.newnumber,
        expiry: this.state.newexpiry,
        cardtype: this.state.cardtype
      });
      this.setState({ isAddNewCard: false })
    } else {
      toast.error("Please fill in all required card data");
    }
  }



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
    const payments = this.props.paymentmethod !== undefined && this.props.paymentmethod.length > 0 &&
      this.props.paymentmethod.map((payment) => {
        return <Tab label={payment.PaymentMethodType} />;
      });

    const handleChangeIndex = (index) => {
      this.setState({ tabvalue: index });
      this.resetData()
    };

    const handleChange = (event, newValue) => {
      this.setState({ tabvalue: newValue });
      this.resetData()
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
                  <div style={{ textAlign: "right", position: "absolute" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => this.handleAddNewCard()}
                    >Add New Card </Button>
                  </div>
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
                        this.props.creditcard.length > 0 && this.props.creditcard[0].ReturnVal !== "0" && this.props.creditcard[0].ReturnVal === undefined ?
                          // this.props.creditcard.length > 0 ?
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
                      {
                        this.state.isAddNewCard === true ?
                          <div className="row">
                            <div className="col-6" style={{ marginTop: "20px" }}>
                              <Cards
                                cvc={this.state.cvc}
                                expiry={this.state.newexpiry}
                                focused={this.state.focus}
                                name={this.state.newname}
                                number={this.state.newnumber}
                                preview={true}
                              />
                              <div style={{ textAlign: "center", marginTop: "10px", position: "absolute" }}>
                                <button
                                  onClick={() => this.handleAddCreditCard()}
                                  className="btn btn-primary btn-block"
                                  type="button"
                                >
                                  Add this Credit Card
                                </button>
                              </div>
                            </div>
                            <div className="col-6" style={{ marginTop: "20px" }}>
                              <form ref={(c) => (this.form = c)} onSubmit={this.handleSubmit}>
                                <div style={{ marginTop: "10px" }}>
                                  <TextField
                                    variant="outlined"
                                    style={{ width: '100%' }}
                                    size="small"
                                    label="Card Number"
                                    type="tel"
                                    name="newnumber"
                                    className="form-control"
                                    placeholder="Card Number"
                                    pattern="[\d| ]{16,22}"
                                    maxLength="16"
                                    required
                                    onChange={this.handleInputChange}
                                    onFocus={this.handleInputFocus}
                                  />
                                </div>
                                <div style={{ marginTop: "10px" }}>
                                  <TextField
                                    variant="outlined"
                                    style={{ width: '100%' }}
                                    size="small"
                                    label="Card Name"
                                    type="text"
                                    name="newname"
                                    className="form-control"
                                    placeholder="Name"
                                    required
                                    onChange={this.handleInputChange}
                                    onFocus={this.handleInputFocus}
                                  />
                                </div>

                                <div style={{ marginTop: "10px" }}>
                                  <TextField
                                    variant="outlined"
                                    style={{ width: '100%' }}
                                    size="small"
                                    label="Valid Thru"
                                    type="tel"
                                    name="newexpiry"
                                    className="form-control"
                                    placeholder="Valid Thru"
                                    pattern="\d\d/\d\d"
                                    required
                                    onChange={this.handleInputChange}
                                    onFocus={this.handleInputFocus}
                                  />
                                </div>
                                <div style={{ marginTop: "10px" }}>
                                  <TextField
                                    variant="outlined"
                                    style={{ width: '100%' }}
                                    type="tel"
                                    name="cvc"
                                    size="small"
                                    className="form-control"
                                    placeholder="CVC"
                                    value={this.state.cvc}
                                    pattern="\d{3,4}"
                                    required
                                    onChange={this.handleInputChange}
                                    onFocus={this.handleInputFocus}
                                  />
                                </div>
                                <div>
                                  <FormControl component="fieldset">
                                    <RadioGroup
                                      row aria-label="cardtype"
                                      name="cardtype"
                                      value={this.state.cardtype}
                                      onChange={this.handleChangeCardType}
                                    >
                                      <div className="row">
                                        <FormControlLabel
                                          value="MasterCard"
                                          control={<Radio />}
                                          label="Master Card"
                                        />
                                        <FormControlLabel
                                          value="VisaCard"
                                          control={<Radio />}
                                          label="Visa Card"
                                        />
                                      </div>
                                    </RadioGroup>
                                  </FormControl>
                                </div>
                                <div>
                                </div>
                              </form>
                            </div>
                          </div>
                          : ""
                      }

                    </Grid>
                  </div>

                </CardContent>
              </Card>
            </div>
            {
              this.props.paymentmethod !== undefined && this.props.paymentmethod.length !== 0 &&
              this.props.paymentmethod.map((payment) => {
                return (
                  <>
                    <div style={Object.assign({})}>
                      <Card style={cardStyle}>
                        <CardContent>
                          {
                            this.props.paymentmethod.filter(x => x.PaymentMethodTypeID === (parseInt(this.state.tabvalue) + 1)).map((method) => {
                              return (
                                <>
                                  <div style={Object.assign({})}>
                                    <Card style={cardStyle}>
                                      <CardContent>
                                        <h4>{method.PaymentMethodType !== undefined && method.PaymentMethodType !== null ? method.PaymentMethodType : ""}</h4>
                                        {/* <h5>Selected : {isNaN(this.state.paymentMethods) === true && this.state.paymentMethods.toUpperCase()}</h5> */}
                                        {console.log("method.PaymentMethodTypeID", method.PaymentMethodTypeID)}
                                        {console.log("this.state.paymentMethods", this.state.paymentMethods)}
                                        <h5>Selected : {method.PaymentMethodTypeID !== 6 ?
                                          this.state.paymentMethods.toUpperCase()
                                          : method.PaymentMethodType.toUpperCase()}</h5>
                                        <br />
                                        {
                                          method.PaymentMethod !== null && method.PaymentMethod !== undefined && method.PaymentMethod.length > 0 && JSON.parse(method.PaymentMethod).map((paymentList) => {
                                            return (
                                              <Button onClick={() => this.handlePaymentChange(paymentList, method.PaymentMethodTypeID, method.PaymentMethodType)}>
                                                <img width="250" src={paymentList.PaymentMethodImage !== null ? paymentList.PaymentMethodImage : Logo}
                                                  alt={paymentList.PaymentMethod !== null ? paymentList.PaymentMethod : "Emporia"} onError={(e) => { e.target.onerror = null; e.target.src = Logo }} />
                                              </Button>
                                            )

                                          })
                                        }
                                      </CardContent>
                                    </Card>
                                  </div>
                                </>
                              )
                            })
                          }
                        </CardContent>
                      </Card>
                    </div>
                  </>
                )
              })
            }
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
  paymentmethod: state.counterReducer["paymentmethod"],
});

const mapDispatchToProps = (dispatch) => {
  return {
    CallAllCreditCard: (prodData) =>
      dispatch(GitAction.CallAllCreditCard(prodData)),
    CallAddCreditCard: (prodData) =>
      dispatch(GitAction.CallAddCreditCard(prodData)),
    CallAllPaymentMethod: () =>
      dispatch(GitAction.CallAllPaymentMethod()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PagePayment);
