// react
import React, { Component } from "react";
import { Card, CardContent } from "@material-ui/core";
// third-party
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Button } from "@material-ui/core";
// application
import Currency from "../shared/Currency";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SwipeableViews from "react-swipeable-views";
// data stubs
import payments from "../../data/shopPayments";
import theme from "../../data/theme";

import { GitAction } from "../../store/action/gitAction";
import Cards from "react-credit-cards";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { toast } from "react-toastify";
import Logo from "../../assets/Emporia.png";

import {
  formatCreditCardNumber,
  formatExpirationDate,
  formatCVC,
} from "../account/AccountPageCreditCard/utils";
import AddCreditCard from '../shared/AddCreditCard'

const initialState = {
  paymentMethods: "",
  paymentMethodsID: "",
  cart: [],
  cardList: [],
  subtotal: 0,
  total: 0,
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
}
class PagePayment extends Component {
  payments = payments;

  constructor(props) {
    super(props);

    this.state = initialState
    this.setDetails = this.setDetails.bind(this)
    this.handleInputFocus = this.handleInputFocus.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlePaymentChange = this.handlePaymentChange.bind(this);
    this.handleAddNewCard = this.handleAddNewCard.bind(this);
    this.handleAddCreditCard = this.handleAddCreditCard.bind(this);
    this.handleChangeCardType = this.handleChangeCardType.bind(this);
    this.handleCardClick = this.handleCardClick.bind(this);
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
    this.props.handleGetPaymentId(null, 0, 0)
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
      paymentMethodsID: "",
      cvc: ""
    })
  }

  handleChangeCardType = (e) => {
    this.setState({
      cardtype: e.target.value,
    });
  };

  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name });
  };

  handleInputChange = (e) => {
    switch (e.target.name) {
      case "newnumber":
        e.target.value = formatCreditCardNumber(e.target.value)[1].replace(/\s+/g, "");
        if (formatCreditCardNumber(e.target.value)[0] !== undefined) {
          this.setState({ issuer: formatCreditCardNumber(e.target.value)[0] });
        } else {
          toast.error("Card Number's format is incorrect");
        }
        break;

      case "newexpiry":
        e.target.value = formatExpirationDate(e.target.value);
        break;

      case "cvc":
        // console.log("e.target.value", e.target.value)
        // console.log("formatCVC(e.target.value)", formatCVC(e.target.value))
        e.target.value = formatCVC(e.target.value);
        if (formatCVC(e.target.value).length === 4) {
          // console.log("this.state.cardList[0]", this.state.cardList[0])
          this.props.handleGetPaymentId(this.state.cardList[0], 1, "Credit Card")
        }

        break;

      default:
        this.setState({ [e.target.name]: e.target.value })
    }

    this.setState({ [e.target.name]: e.target.value });
    // this.props.handleGetPaymentId(this.state.cardList[0], 1, "Credit Card")
  };

  handlePaymentChange = (value, typeid, typevalue) => {
    this.setState({ paymentMethods: value.PaymentMethod })
    this.props.handleGetPaymentId(value, typeid, typevalue)
  };

  handleAddNewCard = () => {
    this.setState({ isAddNewCard: !this.state.isAddNewCard })
  }

  handleCardClick = (cards, value) => {
    if (value === true) {
      this.setState({ cvcVisible: true, paymentMethodsID: cards.UserPaymentMethodID, cvc: "" })
      this.state.cardList.push(cards)
    } else {
      this.setState({ cvcVisible: false, paymentMethodsID: cards.UserPaymentMethodID, cvc: "" })
      this.state.cardList.splice(0, this.state.cardList.length)
    }
  }

  handleAddCreditCard = () => {
    const { newname, newnumber, newexpiry, cardtype } = this.state
    if (newname !== "" && newnumber !== "" && newexpiry !== "" && cardtype !== "") {
      this.props.CallAddCreditCard({
        USERID: localStorage.getItem("id"),
        name: this.state.newname,
        number: this.state.newnumber,
        expiry: this.state.newexpiry,
        cardtype: this.state.cardtype
      });
      this.setState({ isAddNewCard: false })
      this.handleAddNewCard()
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
      <div className="checkout">
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
            {/* Credit Card */}
            <div className="mt-3 mx-2">
              <Button
                variant="contained"
                color="primary"
                style={{
                  float: 'right'
                }}
                onClick={() => this.handleAddNewCard()}
              >
                Add New Card
              </Button>
              {/* <div style={{ float: "right", marginBottom: "10px" }}>
                <img width="50" src="images/creditcard/visa.png" />
                &nbsp;
                <img
                  width="50"
                  src="images/creditcard/mastercard.png"
                />
              </div> */}

              <Grid container>
                {
                  this.props.creditcard.length > 0 && this.props.creditcard[0].ReturnVal !== "0" && this.props.creditcard[0].ReturnVal === undefined ?
                    this.props.creditcard.map((cards) => {
                      return (
                        <Grid item>
                          {
                            this.state.cvcVisible === true && cards.UserPaymentMethodID === this.state.paymentMethodsID ?
                              <>
                                <div className="d-flex mt-3">
                                  <Tooltip title="Edit">
                                    <IconButton aria-label="Edit">
                                      <RadioButtonCheckedIcon
                                        fontSize="small"
                                        onClick={() => this.handleCardClick(cards, false)} />
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
                                </div>
                                <div className="mt-3">
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
                              <div className="d-flex">
                                <Tooltip title="Edit">
                                  <IconButton aria-label="Edit">
                                    <RadioButtonUncheckedIcon
                                      fontSize="small"
                                      onClick={() => this.handleCardClick(cards, true)} />
                                  </IconButton>
                                </Tooltip>
                                <Cards
                                  expiry={cards.UserCardExpireDate}
                                  name={cards.UserCardName}
                                  number={cards.UserCardNo}
                                  preview={true}
                                />
                              </div>
                          }
                        </Grid>
                      )
                    })
                    : <div>No cards saved. Please add a new card</div>
                }
                <AddCreditCard
                  isOpen={this.state.isAddNewCard}
                  handleOpen={this.handleAddNewCard}
                  handleAddCreditCard={this.handleAddCreditCard}
                  handleOnChange={this.handleInputChange}
                  handleInputFocus={this.handleInputFocus}
                  state={this.state}
                  handleChangeCardType={this.handleChangeCardType}
                />
              </Grid>
            </div>

            {
              this.props.paymentmethod !== undefined && this.props.paymentmethod.length !== 0 &&
              this.props.paymentmethod.map((payment) => {
                return (
                  <>
                    {
                      this.props.paymentmethod.filter(x => x.PaymentMethodTypeID === (parseInt(this.state.tabvalue) + 1)).map((method) => {
                        return (
                          <div className="mt-3">
                            <div className="text-left h6 mb-3">Selected : {method.PaymentMethodTypeID !== 6 ?
                              isNaN(this.state.paymentMethods) === true && this.state.paymentMethods.toUpperCase()
                              : method.PaymentMethodType.toUpperCase()}
                            </div>
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
                          </div>
                        )
                      })
                    }
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
    if (this.props.data.length < 1) {
      return <Redirect to="cart" />;
    }

    return (
      <React.Fragment>
        <div className="cart">
          <div className="container">
            <div className="card mt-3">
              <div className="card-body">
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