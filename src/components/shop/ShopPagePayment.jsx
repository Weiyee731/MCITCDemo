// react
import React, { Component } from "react";
// third-party
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  Select
} from "@material-ui/core";
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
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { toast } from "react-toastify";
import Logo from "../../assets/Emporia.png";
import text from './EX00013776.key'; // Relative path to your File
import axios from "axios";
import FormControl from "@material-ui/core/FormControl";

import {
  formatCreditCardNumber,
  formatExpirationDate,
  formatCVC,
} from "../account/AccountPageCreditCard/utils";
import AddCreditCard from '../shared/AddCreditCard'
import moment from "moment";
const crypto = require('crypto');



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
  Userdetails: [],
  priv_key: "",
  isPrivSet: false,
  fpx_checkSum: "",
  BankID: "",
  bankDetails: [],
  isBankSet: false,
  fpx_buyerBankId: ""
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
            // this.props.handleUserData(Userdetails)
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
        // this.props.handleUserData(Userdetails)
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
      // this.props.handleGetPaymentType(id)
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
    // const payments = paymentMethod !== undefined && paymentMethod.length > 0 &&
    //   paymentMethod.map((payment) => {
    //     return <Tab label={payment} />;
    //   });

    if (this.props.paymentmethod.length > 0 && this.state.isBankSet === false) {
      this.props.paymentmethod !== null && this.props.paymentmethod.filter((x) => parseInt(x.PaymentMethodTypeID) === 2).map((bank) => {
        bank.PaymentMethod !== null && JSON.parse(bank.PaymentMethod).filter((x) => x.TestingInd !== null && x.TestingInd === 1).map((details) => {
          this.state.bankDetails.push(details)
          this.setState({ isBankSet: true, BankID: this.state.bankDetails[0].BankID })
        })
      })
    }

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


    // credit and debit card
    let now = new Date().toISOString().split('.').shift() + 'Z';
    const d = new Date();
    let time = d.getTime();
    var n = Math.floor(Math.random() * 11);
    var k = Math.floor(Math.random() * 1000000);
    var m = String.fromCharCode(n) + k;

    let totalPrice = parseFloat(this.state.total).toFixed(2)
    let lastname = ""
    let firstname = ""
    let email = ""
    let addressLine1 = ""
    let city = ""
    let state = ""
    let poscode = ""
    let PickUpIndicator = ""

    let date = moment(new Date()).format("YYYYMMDDHHmm").toString()
    let date2 = moment(new Date()).format("YYYYMMDDHHmmSS").toString()
    // FPX Online Banking
    let fpx_msgType = "AR"
    let fpx_msgToken = "01"
    let fpx_sellerExId = "EX00013776"
    // let fpx_sellerExOrderNo = moment(new Date()).format("YYYYMMDDHHmmss");
    let fpx_sellerExOrderNo = date + "12"
    // let fpx_sellerTxnTime = "20220305170224"
    let fpx_sellerTxnTime = date + "12"
    let fpx_sellerOrderNo = date + "12"
    console.log(fpx_sellerOrderNo)
    let fpx_sellerId = "SE00015397"
    let fpx_sellerBankCode = "01"
    let fpx_txnCurrency = "MYR"
    let fpx_txnAmount = "10000000.00"
    let fpx_buyerEmail = ""
    // let fpx_checkSum = "693497063FC66DA1127F3C2778941AD1FAA0219FBC1A444FEEE305A2FE9E8B62668FEDD8E0BDCDAD5125FA07BB4988780B955814F2603D209521ECAE5274C52EC3AADA9EB036EF76EC2CCE6954031FBC72331F2B8C59A02988D295C823D15EC12B2E6906346D4A12496825E4A1FFAC2B49EE31806EB0501D82C5CEE95A0A2954579534F2912564D3CDBBA430FDB4641D593C9F97ED20BFE9F20562CB649EFCE256E6D3E9F5D1AC780B7675496543571D27123994F63649D0FBE067E3E76176A322F652A1D4B38A06124650722C67073C4E318A0041BD3AE1940F78CAB6897E0386D5DA705DBAE56B1F415BDA7098F64C128F148A789DD82CD1C45920AFB533E3"
    let fpx_checkSum = ""
    let fpx_buyerName = ""
    let fpx_buyerBankId = "ABB0234"
    // let fpx_buyerBankId = "TEST0021"

    let fpx_buyerBankBranch = ""
    let fpx_buyerAccNo = ""
    let fpx_buyerId = ""
    let fpx_makerName = ""
    let fpx_buyerIban = ""
    let fpx_productDesc = "SampleProduct"
    let fpx_version = "6.0"
    let bankingdata = ""


    if (this.props.addresss.state.address === 0) {
      lastname = localStorage.getItem("lastname") != null && localStorage.getItem("lastname") !== undefined && localStorage.getItem("lastname") != "-" ? localStorage.getItem("lastname") : "Emporia"
      firstname = localStorage.getItem("firstname") != null && localStorage.getItem("firstname") !== undefined && localStorage.getItem("firstname") != "-" ? localStorage.getItem("firstname") : "Emporia"
      email = localStorage.getItem("email") != null && localStorage.getItem("email") !== undefined && localStorage.getItem("email") != "-" ? localStorage.getItem("email") : "Emporia.gmail.com"
      addressLine1 = "SELFCOLECT"
      city = "SELFCOLECT"
      state = "SELFCOLECT"
      poscode = "94300"
      PickUpIndicator = 1

      // fpx_buyerName = localStorage.getItem("lastname") != null && localStorage.getItem("lastname") !== undefined && localStorage.getItem("lastname") != "-" ? localStorage.getItem("lastname") + " " + localStorage.getItem("firstname") : "Emporia"
      // fpx_buyerEmail = localStorage.getItem("email") != null && localStorage.getItem("email") !== undefined && localStorage.getItem("email") != "-" ? localStorage.getItem("email") : "Emporia.gmail.com"

    } else {
      lastname = this.state.Userdetails.addressName
      firstname = this.state.Userdetails.addressName
      email = this.state.Userdetails.email
      addressLine1 = this.state.Userdetails.addressLine1
      city = this.state.Userdetails.city
      state = this.state.Userdetails.state
      poscode = this.state.Userdetails.poscode
      PickUpIndicator = 0

      // fpx_buyerEmail = this.state.Userdetails.email
      // fpx_buyerName = this.state.Userdetails.addressName

    }
    const signature = "access_key=0646aa159df03a8fa52c81ab8a5bc4a7,profile_id=9D4BDAEB-A0D5-4D05-9E4B-40DB52678DF0,transaction_uuid=" + (time + '123') + ",signed_field_names=access_key,profile_id,transaction_uuid,signed_field_names,signed_date_time,locale,transaction_type,reference_number,amount,currency,bill_to_surname,bill_to_forename,bill_to_email,bill_to_address_line1,bill_to_address_city,bill_to_address_postal_code,bill_to_address_state,bill_to_address_country,signed_date_time=" + now + ",locale=en,transaction_type=authorization,reference_number=" + time + ",amount=" + totalPrice + ",currency=USD,bill_to_surname=" + lastname + ",bill_to_forename=" + firstname + ",bill_to_email=" + email + ",bill_to_address_line1=" + addressLine1 + ",bill_to_address_city=" + city + ",bill_to_address_postal_code=" + poscode + ",bill_to_address_state=" + state + ",bill_to_address_country=MY"
    const APIKey = "08fd3b4b9f8d4866b5b58c5039ed1c795393402695da4b7fb8e33aac2929bf5d8bc43156efb34d5b97a632dad2e0b55001e3d1a751f4420f90b42b140594a3adfcb2852df84a4bb59d9f8f47458dacf12316b373362a419a99fe32a3286b3d0b5056c6c1923f4ded83014852dcce8c7085baaf83536c4e65933f6ecbd96fe3fb";

    var signed = crypto
      .createHmac('sha256', APIKey)
      .update(signature)
      .digest('base64');



    const handleBanking = (bankid) => {
      fpx_buyerBankId = bankid
      console.log("bankid", bankid)
      bankingdata = fpx_buyerAccNo + "|" + fpx_buyerBankBranch + "|" + fpx_buyerBankId + "|" + fpx_buyerEmail + "|" + fpx_buyerIban + "|" + fpx_buyerId + "|" + fpx_buyerName + "|" + fpx_makerName + "|" + fpx_msgToken + "|" + fpx_msgType + "|" + fpx_productDesc + "|" + fpx_sellerBankCode + "|" + fpx_sellerExId + "|" + fpx_sellerExOrderNo + "|" + fpx_sellerId + "|" + fpx_sellerOrderNo + "|" + fpx_sellerTxnTime + "|" + fpx_txnAmount + "|" + fpx_txnCurrency + "|" + fpx_version
      console.log(bankingdata)

      let URL = "https://myemporia.my/payment/check.php"
      const config = { headers: { 'Content-Type': 'multipart/form-data' } }
      const formData = new FormData()
      formData.append("bankingdata", bankingdata);

      axios.post(URL, formData, config).then((res) => {
        fpx_checkSum = res.data.split('"')[1]
        if (res.status === 200) {
          this.setState({ fpx_checkSum: res.data.split('"')[1] })
          this.setState({ fpx_buyerBankId: bankid })
          console.log(res.data.split('"')[1])
        }
        else {
          toast.error("There is something wrong with uploading images. Please try again.")
        }
      }).catch(e => {
        toast.error("There is something wrong with uploading images. Please try again.")
      })

      // fpx_checkSum = crypto
      //   .createHmac('sha256', this.state.priv_key)
      //   .update(bankingdata)
      //   .digest('base64');

      // const signer = crypto.createSign('RSA-SHA1');
      // signer.write(bankingdata);
      // signer.end();
      // const data = signer.sign(this.state.priv_key, 'base64')
      // fpx_checkSum = (data.toString('utf-8')).toUpperCase()
      // console.log("fpx_checkSum11", data)
      // fpx_checkSum = data.replace(/\d+./g, char => String.fromCharCode(`0b${char}`)).toUpperCase()

      this.setState({ BankID: bankid })
    }

    const onSubmit = () => {
      let ProductID = []
      let UserCartID = []
      let ProductQuantity = []
      let ProductVariationDetailID = []

      this.props.data.map((x) => {
        ProductID.push(x.product.ProductID)
        UserCartID.push(x.product.UserCartID)
        ProductQuantity.push(x.product.ProductQuantity)
        ProductVariationDetailID.push(x.product.ProductVariationDetailID)
      })


      this.props.CallAddOrder({
        UserID: window.localStorage.getItem("id"),
        ProductID: ProductID,
        ProductQuantity: ProductQuantity,
        UserCartID: UserCartID,
        UserAddressID: this.props.addresss.state.address,
        PaymentMethodID: this.state.paymentMethodsID === 1 ? 2 : 1,
        UserPaymentMethodID: this.state.paymentMethodsID === 1 ? 2 : 1,
        OrderTotalAmount: totalPrice,
        OrderPaidAmount: 0,
        ProductVariationDetailID: ProductVariationDetailID,
        TrackingStatusID: 2,
        PickUpInd: PickUpIndicator,
        TRANSACTIONUUID: this.state.paymentMethodsID === 1 ? time + '123' : fpx_sellerOrderNo
      })


    }


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
                            color="blue"
                            fontSize="small"
                            onClick={() => this.handlePaymentClick(payment.id, false)} />
                        </IconButton><label style={{ fontSize: "16px" }}>{payment.method}</label>
                        {
                          parseInt(this.state.paymentMethodsID) === 1 &&
                          <FormControl variant="outlined" size="small" style={{ width: "100%" }}>
                            <Select
                              native
                              id="Bank"
                              value={this.state.BankID}
                              onChange={(x) => handleBanking(x.target.value)}
                              className="select"
                            >
                              {
                                this.state.bankDetails !== null && this.state.bankDetails.map((details) =>
                                  <option value={details.BankID} key={details.BankID}  >
                                    {details.PaymentMethod}
                                  </option>
                                )
                              }
                            </Select>
                          </FormControl>
                        }

                      </div>
                      :
                      <div>
                        <IconButton aria-label="payment">
                          <RadioButtonUncheckedIcon
                            color="blue"
                            fontSize="small"
                            onClick={() => this.handlePaymentClick(payment.id, true)} />
                        </IconButton><label style={{ fontSize: "16px" }}>{payment.method}</label>
                      </div>
                  }
                </>
              )
            })
          }
          {
            this.state.paymentMethodsID === 1 && this.state.BankID !== "" ?
              <React.Fragment>
                <div>
                  <form id="payment_form2" action="https://uat.mepsfpx.com.my/FPXMain/seller2DReceiver.jsp" method="post">
                    <input type="hidden" value={fpx_msgType} id="fpx_msgType" name="fpx_msgType"></input>
                    <input type="hidden" value={fpx_msgToken} id="fpx_msgToken" name="fpx_msgToken"></input>
                    <input type="hidden" value={fpx_sellerExId} id="fpx_sellerExId" name="fpx_sellerExId"></input>
                    <input type="hidden" value={fpx_sellerExOrderNo} id="fpx_sellerExOrderNo" name="fpx_sellerExOrderNo"></input>
                    <input type="hidden" value={fpx_sellerTxnTime} id="fpx_sellerTxnTime" name="fpx_sellerTxnTime"></input>
                    <input type="hidden" value={fpx_sellerOrderNo} id="fpx_sellerOrderNo" name="fpx_sellerOrderNo"></input>
                    <input type="hidden" value={fpx_sellerId} id="fpx_sellerId" name="fpx_sellerId"></input>
                    <input type="hidden" value={fpx_sellerBankCode} id="fpx_sellerBankCode" name="fpx_sellerBankCode"></input>
                    <input type="hidden" value={fpx_txnCurrency} id="fpx_txnCurrency" name="fpx_txnCurrency"></input>
                    <input type="hidden" value={fpx_txnAmount} id="fpx_txnAmount" name="fpx_txnAmount"></input>
                    <input type="hidden" value={fpx_buyerEmail} id="fpx_buyerEmail" name="fpx_buyerEmail"></input>
                    <input type="hidden" value={this.state.fpx_checkSum} id="fpx_checkSum" name="fpx_checkSum"></input>
                    <input type="hidden" value={fpx_buyerName} id="fpx_buyerName" name="fpx_buyerName"></input>
                    <input type="hidden" value={this.state.fpx_buyerBankId} id="fpx_buyerBankId" name="fpx_buyerBankId"></input>
                    <input type="hidden" value={fpx_buyerBankBranch} id="fpx_buyerBankBranch" name="fpx_buyerBankBranch"></input>
                    <input type="hidden" value={fpx_buyerAccNo} id="fpx_buyerAccNo" name="fpx_buyerAccNo"></input>
                    <input type="hidden" value={fpx_buyerId} id="fpx_buyerId" name="fpx_buyerId"></input>
                    <input type="hidden" value={fpx_makerName} id="fpx_makerName" name="fpx_makerName"></input>
                    <input type="hidden" value={fpx_buyerIban} id="fpx_buyerIban" name="fpx_buyerIban"></input>
                    <input type="hidden" value={fpx_version} id="fpx_version" name="fpx_version"></input>
                    <input type="hidden" value={fpx_productDesc} id="fpx_productDesc" name="fpx_productDesc"></input>

                    <input type="submit" style={{
                      backgroundColor: "#04AA6D",
                      border: "none",
                      color: "white",
                      fontSize: "14px",
                      textDecoration: "none",
                    }} id="submit" name="submit" value="Submit"
                      onClick={() => console.log("YES")} />
                  </form>
                </div>
              </React.Fragment>
              :
              <React.Fragment>
                <div>
                  <form id="payment_form" action="https://testsecureacceptance.cybersource.com/pay" method="post">
                    <input type="hidden" id="access_key" name="access_key" value="0646aa159df03a8fa52c81ab8a5bc4a7"></input>
                    <input type="hidden" id="profile_id" name="profile_id" value="9D4BDAEB-A0D5-4D05-9E4B-40DB52678DF0"></input>
                    <input type="hidden" id="transaction_uuid" name="transaction_uuid" value={time + '123'}></input>
                    <input type="hidden" id="signed_field_names" name="signed_field_names" value="access_key,profile_id,transaction_uuid,signed_field_names,signed_date_time,locale,transaction_type,reference_number,amount,currency,bill_to_surname,bill_to_forename,bill_to_email,bill_to_address_line1,bill_to_address_city,bill_to_address_postal_code,bill_to_address_state,bill_to_address_country"></input>
                    <input type="hidden" id="signed_date_time" name="signed_date_time" value={now}></input>
                    <input type="hidden" id="locale" name="locale" value="en"></input>
                    <input type="hidden" id="transaction_type" name="transaction_type" value="authorization"></input>
                    <input type="hidden" id="reference_number" name="reference_number" value={time}></input>
                    <input type="hidden" id="amount" name="amount" value={totalPrice}></input>
                    <input type="hidden" id="currency" name="currency" value="USD"></input>
                    <input type="hidden" id="bill_to_surname" name="bill_to_surname" value={lastname}></input>
                    <input type="hidden" id="bill_to_forename" name="bill_to_forename" value={firstname}></input>
                    <input type="hidden" id="bill_to_email" name="bill_to_email" value={email}></input>
                    <input type="hidden" id="bill_to_address_line1" name="bill_to_address_line1" value={addressLine1}></input>
                    <input type="hidden" id="bill_to_address_city" name="bill_to_address_city" value={city}></input>
                    <input type="hidden" id="bill_to_address_postal_code" name="bill_to_address_postal_code" value={poscode}></input>
                    <input type="hidden" id="bill_to_address_state" name="bill_to_address_state" value={state}></input>
                    <input type="hidden" id="bill_to_address_country" name="bill_to_address_country" value="MY"></input>
                    <input type="hidden" id="signature" name="signature" value={signed}></input>
                    <input type="submit" style={{
                      backgroundColor: this.state.paymentMethodsID === 2 ? "#04AA6D" : "#808080",
                      border: "none",
                      color: "white",
                      fontSize: "14px",
                      textDecoration: "none",
                    }} id="submit" name="submit" value="Submit" onClick={() =>
                      onSubmit()
                    } disabled={this.state.paymentMethodsID === 2 ? false : true} />
                  </form>
                </div>
              </React.Fragment>
          }



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
        </div >
      </div >
    );
  }

  render() {
    if (this.props.data.length < 1) {
      return <Redirect to="cart" />;
    }

    console.log("checkcheck", this.state)

    return (
      <React.Fragment>
        <div className="cart">
          <div className="container">
            <div className="card mt-3">
              <div className="card-body">
                <h5 className="card-title">Emporia</h5>
                {
                  this.props.addresss.state.address !== 0 ?
                    <div style={{ textAlign: "left" }}>
                      <h6>
                        Receiver Name: {this.state.Userdetails.addressName} <br />
                        Receiver Address: {this.state.Userdetails.addressLine1 + " " + this.state.Userdetails.addressLine2} <br />
                        Receiver Contact: (60) {this.state.Userdetails.contact}<br />
                      </h6>
                      <br />
                    </div>
                    :
                    <div style={{ textAlign: "left" }}>
                      <h6>
                        Receiver Name: {localStorage.getItem("firstname") + localStorage.getItem("lastname")} <br />
                        Receiver Address:  User Self Pick Up <br />
                        Receiver Contact: (60) {localStorage.getItem("contact") == "undefined" ? "-" : localStorage.getItem("contact")} <br />
                      </h6>
                      <br />
                    </div>
                }
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
    CallAddOrder: (prodData) =>
      dispatch(GitAction.CallAddOrder(prodData)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PagePayment);