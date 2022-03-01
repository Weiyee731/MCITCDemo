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
import input from "@material-ui/core"
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
  cardtype: "",

  setAddress: false,
  Userdetails: []
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


    if (this.props.addresss !== undefined && this.props.addresss.state !== undefined && this.state.setAddress === false) {

      if (this.props.addresss.state.address !== 0) {
        this.props.addresses.length > 0 && this.props.addresses !== undefined && this.props.addresses.filter((x) =>
          parseInt(x.UserAddressBookID) === parseInt(this.props.addresss.state.address)).map((address) => {
            let Userdetails = []
            console.log("addressaddress", address)

            Userdetails = {
              email: address.UserEmail,
              addressLine1: address.UserAddressLine1,
              addressLine2: address.UserAddressLine2,
              addressName: address.UserAddressName,

              poscode: address.UserPoscode,
              city: address.UserCity,
              state: address.UserState,
              contact: address.UserContactNo,
              total: this.props.data.reduce((subtotal, item) => subtotal + item.total, 0) + this.state.shipping
            }
            this.setState({
              Userdetails: Userdetails,
              setAddress: true
            })
            this.props.handleUserData(Userdetails)
          })
      }
      else {
        let Userdetails = []
        Userdetails = {
          email: localStorage.getItem("email"),
          addressLine1: "Self Collect",
          addressLine2: "Self Collect",
          addressName: localStorage.getItem("firstname") + localStorage.getItem("lastname"),

          poscode: "Self Collect",
          city: "Self Collect",
          state: "Self Collect",
          contact: localStorage.getItem("contact"),
          total: this.props.data.reduce((subtotal, item) => subtotal + item.total, 0) + this.state.shipping
        }
        this.setState({
          Userdetails: Userdetails,
          setAddress: true
        })
        this.props.handleUserData(Userdetails)
      }
    }


  }

  componentDidMount() {
    if (this.props.data !== undefined && this.props.data.length > 0) {
      this.setDetails(this.props.data)
    }
    this.props.handleGetPaymentId(null, 0, 0)
  }


  getItemList(FilteredList) {
    return (
      <>
        {FilteredList.map((item) => (
          <tr key={item.id}>
            <td>
              {/* {`${item.product.ProductName} × ${item.quantity}`} */}
              <div style={{ fontSize: "13px" }}>    {`${item.product.ProductName} × ${item.quantity}`}  </div>
              <div style={{ fontSize: "11px" }}>  Variation : {item.product.ProductVariationValue} </div>
            </td>
            <td>
              <Currency value={item.total} />
            </td>
          </tr>
        ))}
      </>
    )
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

        if (e.target.value.length > 1) {
          e.target.value = formatCreditCardNumber(e.target.value)[1].replace(
            /\s+/g,
            ""
          );
        }
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
        e.target.value = formatCVC(e.target.value);
        if (formatCVC(e.target.value).length === 3) {
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

  handlePaymentClick = (id, value) => {
    if (value === true) {
      this.setState({ paymentMethodsID: id })
    } else {
      this.setState({ paymentMethodsID: "" })
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

  renderPaymentsList() {

    const paymentMethod = [{ id: 1, method: "Online Banking" }, { id: 2, method: "Debit/Credit Card" }]
    const payments = paymentMethod !== undefined && paymentMethod.length > 0 &&
      paymentMethod.map((payment) => {
        return <Tab label={payment} />;
      });



    // const payments = this.props.paymentmethod !== undefined && this.props.paymentmethod.length > 0 &&
    //   this.props.paymentmethod.map((payment) => {
    //     return <Tab label={payment.PaymentMethodType} />;
    //   });

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
        <div className="container" style={{ textAlign: "left" }}>
          <hr />
          <h5>Payment Method</h5>
          {
            paymentMethod.length > 0 && paymentMethod.map((payment, index) => {
              return (
                <>
                  {
                    parseInt(this.state.paymentMethodsID) === parseInt(payment.id) ?
                      <div>
                        <IconButton aria-label="payment">
                          <RadioButtonCheckedIcon
                            fontSize="small"
                            onClick={() => this.handlePaymentClick(payment.id, false)} />
                        </IconButton><label style={{ fontSize: "16px" }}>{payment.method}</label>
                      </div>
                      :
                      <div>
                        <IconButton aria-label="payment">
                          <RadioButtonUncheckedIcon
                            fontSize="small"
                            onClick={() => this.handlePaymentClick(payment.id, true)} />
                        </IconButton><label style={{ fontSize: "16px" }}>{payment.method}</label>
                      </div>
                  }
                </>
              )
            })
          }
          {console.log("this.props.addresss.state.address", this.props.addresss.state.address)}

          {/* <form id="payment_form" action="payment_confirmation.php" method="post"> */}
          <form id="payment_confirmation" action="https://testsecureacceptance.cybersource.com/pay" method="post">
            <input type="hidden" name="access_key" value="0646aa159df03a8fa52c81ab8a5bc4a7" />
            <input type="hidden" name="profile_id" value="9D4BDAEB-A0D5-4D05-9E4B-40DB52678DF0" />
            <input type="hidden" name="transaction_uuid" value="123456" />
            <input type="hidden" name="signed_field_names" value="access_key,profile_id,transaction_uuid,signed_field_names,signed_date_time,locale,transaction_type,reference_number,amount,currency,bill_to_surname,bill_to_forename,bill_to_email,bill_to_address_line1,bill_to_address_city,bill_to_address_postal_code,bill_to_address_state,bill_to_address_country" />
            <input type="hidden" name="signed_date_time" value={new Date()} />
            <input type="hidden" name="locale" value="en" />

            <input type="hidden" name="transaction_type" value="authorization" />
            <input type="hidden" name="reference_number" value="9D4BDAEB-A0D5-4D05-9E4B-40DB52678DF0" />
            <input type="hidden" name="amount" value={this.state.tota} />
            <input type="hidden" name="currency" value="USD" />


            <input type="hidden" name="bill_to_surname" value={localStorage.getItem("lastname")} />
            <input type="hidden" name="bill_to_forename" value={localStorage.getItem("firstname")} />
            <input type="hidden" name="bill_to_email" value={this.state.Userdetails.email} />
            <input type="hidden" name="bill_to_address_line1" value={this.state.Userdetails.addressLine1} />
            <input type="hidden" name="bill_to_address_city" value={this.state.Userdetails.city} />

            <input type="hidden" name="bill_to_address_postal_code" value={this.state.Userdetails.poscode} />
            <input type="hidden" name="bill_to_address_state" value={this.state.Userdetails.state} />
            <input type="hidden" name="bill_to_address_country" value="MY" />
          </form>

          {console.log("CHECK", new Date())}


          {/* <Tabs
            value={this.state.tabvalue}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChange}
            aria-label="disabled tabs example"
          >
            {payments}
          </Tabs> */}

          {/* <SwipeableViews
            enableMouseEvents
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={this.state.tabvalue}
            onChangeIndex={handleChangeIndex}
          >

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
                                    pattern="\d{3}"
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
                    :
                    <div className="block-empty__message" style={{ textAlign: "center" }}> No cards saved. Please add a new card</div>
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
          </SwipeableViews> */}
        </div>
      </div >
    );
  }

  render() {
    if (this.props.data.length < 1) {
      return <Redirect to="cart" />;
    }
    console.log("this.propsssss12345", this.props)
    console.log("this.propsssss", this.props.addresss)
    console.log("this.propsssss", this.props.addresss.state)



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
      </React.Fragment >
    );
  }
}

const mapStateToProps = (state) => ({
  creditcard: state.counterReducer["creditcards"],
  paymentmethod: state.counterReducer["paymentmethod"],
  addresses: state.counterReducer["addresses"],
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