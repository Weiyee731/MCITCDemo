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
import TextField from '@mui/material/TextField';
import Logo from "../../assets/Emporia.png";
import {
  Link,
} from "react-router-dom";
// import text from './EX00013776.key'; // Relative path to your File
import axios from "axios";
import FormControl from "@material-ui/core/FormControl";

import {
  formatCreditCardNumber,
  formatExpirationDate,
  formatCVC,
} from "../account/AccountPageCreditCard/utils";
import AddCreditCard from '../shared/AddCreditCard'
import moment from "moment";
import FPX from '../../assets/fpx-logo.png';
import { Image } from 'react-bootstrap';
const crypto = require('crypto');
// const CyberSource = require('CyberSource');



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
  fpx_buyerBankId: "",
  FPXBankList: [],

  isAllBankSet: false,
  allBankDetails: [],
  finalAllBankDetails: [],


  // FPX Online Banking
  fpx_msgType: "AC",
  fpx_msgToken: "02",
  fpx_sellerExId: "EX00013776",
  fpx_sellerExOrderNo: "",
  fpx_sellerTxnTime: "",
  fpx_sellerOrderNo: "",
  fpx_sellerId: "SE00015397",
  fpx_sellerBankCode: "01",
  fpx_txnCurrency: "MYR",
  fpx_txnAmount: "20.00",
  fpx_buyerEmail: "weiyee731@gmail.com",
  fpx_buyerName: "weiyee",

  fpx_buyerBankBranch: "",
  fpx_buyerAccNo: "",
  fpx_buyerId: "",
  fpx_makerName: "",
  fpx_buyerIban: "",
  fpx_productDesc: "SampleProduct",
  fpx_version: "6.0",
  bankingdata: "",

  isSetDetail: false,
}
class PagePayment extends Component {
  payments = payments;

  constructor(props) {
    super(props);

    this.state = initialState
    this.setDetails = this.setDetails.bind(this)
    // this.handleInputFocus = this.handleInputFocus.bind(this);
    // this.handleInputChange = this.handleInputChange.bind(this);
    // this.handlePaymentChange = this.handlePaymentChange.bind(this);
    // this.handleAddNewCard = this.handleAddNewCard.bind(this);
    // this.handleAddCreditCard = this.handleAddCreditCard.bind(this);
    // this.handleChangeCardType = this.handleChangeCardType.bind(this);
    // this.handleCardClick = this.handleCardClick.bind(this);
    // this.resetData = this.resetData.bind(this);
    this.props.CallAllCreditCard(window.localStorage.getItem("id"));
    this.props.CallAllPaymentMethod();
    this.handleBanking = this.handleBanking.bind(this)
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

    let URL2 = "https://myemporia.my/payment/06_fpx_bankListRequest.php"
    const config = { headers: { 'Content-Type': 'multipart/form-data' } }
    axios.post(URL2, {}, config).then((res) => {
      if (res.status === 200) {
        let bankFinalList = []
        let bankList = res.data.split('|')[0]
        bankList = bankList.split(',')
        bankList.length > 0 && bankList.map((bank) => {
          this.state.allBankDetails.filter((x) => x.BankID === bank.split("~")[0]).map((x) => {
            let bankListing = {
              BankID: bank.split("~")[0],
              BankStatus: bank.split("~")[1],
              BankName: x.BankName,
              BankType: x.BankType,
              PaymentMethod: x.PaymentMethod,
              PaymentMethodCharges: x.PaymentMethodCharges,
              PaymentMethodDesc: x.PaymentMethodDesc,
              PaymentMethodID: x.PaymentMethodID,
              PaymentMethodImage: x.PaymentMethodImage,
              TestingInd: x.TestingInd
            }
            bankFinalList.push(bankListing)
          })
        })
        // let removeDuplicate = bankFinalList.length > 0 ? bankFinalList.filter((ele, ind) => ind === bankFinalList.findIndex(elem => elem.BankID === ele.BankID)) : []
        this.setState({ finalAllBankDetails: bankFinalList, BankID: this.state.allBankDetails[0].BankID })
        // let removeDuplicate = bankFinalList.length > 0 ? bankFinalList.filter((ele, ind) => ind === bankFinalList.findIndex(elem => elem.BankID === ele.BankID)) : []
        // this.setState({ finalAllBankDetails: removeDuplicate, BankID: this.state.allBankDetails[0].BankID })
      }
    }).catch(e => {
      toast.error("There is something wrong with 111. Please try again.")
    })

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
      if (id === 1)
        this.handleBanking(this.state.BankID)

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

  handleBanking = (bankid) => {
    let date = moment(new Date()).format("YYYYMMDDHHmm").toString()
    let fpx_sellerExOrderNo = date + "12"
    let fpx_sellerTxnTime = date + "12"
    let fpx_sellerOrderNo = date + "12"

    let bankingdata = this.state.fpx_buyerAccNo + "|" + this.state.fpx_buyerBankBranch + "|" + bankid + "|" + this.state.fpx_buyerEmail + "|" + this.state.fpx_buyerIban + "|" + this.state.fpx_buyerId + "|" + this.state.fpx_buyerName + "|" + this.state.fpx_makerName + "|" + this.state.fpx_msgToken + "|" + this.state.fpx_msgType + "|" + this.state.fpx_productDesc + "|" + this.state.fpx_sellerBankCode + "|" + this.state.fpx_sellerExId + "|" + fpx_sellerExOrderNo + "|" + this.state.fpx_sellerId + "|" + fpx_sellerOrderNo + "|" + fpx_sellerTxnTime + "|" + parseFloat(this.state.fpx_txnAmount).toFixed(2) + "|" + this.state.fpx_txnCurrency + "|" + this.state.fpx_version

    let URL = "https://myemporia.my/payment/check.php"
    const config = { headers: { 'Content-Type': 'multipart/form-data' } }
    const formData = new FormData()
    formData.append("bankingdata", bankingdata);
    axios.post(URL, formData, config).then((res) => {
      if (res.status === 200) {
        this.setState({
          fpx_checkSum: res.data.split('"')[1],
          fpx_buyerBankId: bankid,
          fpx_sellerExOrderNo: fpx_sellerExOrderNo,
          fpx_sellerTxnTime: fpx_sellerTxnTime,
          fpx_sellerOrderNo: fpx_sellerOrderNo
        })
      }
      else {
        toast.error("There is something wrong with uploading images. Please try again.")
      }
    }).catch(e => {
      toast.error("There is something wrong with uploading images. Please try again.")
    })
    this.setState({ BankID: bankid })
  }


  renderPaymentsList = () => {

    const paymentMethod = [{ id: 1, method: "Online Banking", image: { FPX } }, { id: 2, method: "Debit/Credit Card", image: "" }]
    // const payments = paymentMethod !== undefined && paymentMethod.length > 0 &&
    //   paymentMethod.map((payment) => {
    //     return <Tab label={payment} />;
    //   });

    // if (this.props.paymentmethod.length > 0 && this.state.isBankSet === false) {
    //   this.props.paymentmethod !== null && this.props.paymentmethod.filter((x) => parseInt(x.PaymentMethodTypeID) === 2).map((bank) => {
    //     bank.PaymentMethod !== null && JSON.parse(bank.PaymentMethod).filter((x) => x.TestingInd !== null && x.TestingInd === 1).map((details) => {
    //       this.state.bankDetails.push(details)
    //       this.setState({ isBankSet: true, BankID: this.state.bankDetails[0].BankID })
    //     })
    //   })
    // }

    if (this.props.paymentmethod.length > 0 && this.state.isAllBankSet === false) {
      this.props.paymentmethod !== null && this.props.paymentmethod.filter((x) => parseInt(x.PaymentMethodTypeID) === 2).map((bank) => {
        bank.PaymentMethod !== null && JSON.parse(bank.PaymentMethod).map((details) => {
          this.state.allBankDetails.push(details)
          this.setState({ isAllBankSet: true, })
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
    const time = d.getTime();
    var n = Math.floor(Math.random() * 11);
    var k = Math.floor(Math.random() * 1000000);
    var m = String.fromCharCode(n) + k;

    // let totalPrice = parseFloat(this.state.total).toFixed(2)
    // let lastname = ""
    // let firstname = ""
    // let email = ""
    // let addressLine1 = ""
    // let city = ""
    // let state = ""
    // let poscode = ""
    // let PickUpIndicator = ""


    let totalPrice = parseFloat(this.state.total).toFixed(2)
    let lastname = this.props.addresss.state.address === 0 ? localStorage.getItem("lastname") != null && localStorage.getItem("lastname") !== undefined && localStorage.getItem("lastname") != "-" ? localStorage.getItem("lastname") : "Emporia" : this.state.Userdetails.addressName
    let firstname = this.props.addresss.state.address === 0 ? localStorage.getItem("firstname") != null && localStorage.getItem("firstname") !== undefined && localStorage.getItem("firstname") != "-" ? localStorage.getItem("firstname") : "Emporia" : this.state.Userdetails.addressName
    let email = this.props.addresss.state.address === 0 ? localStorage.getItem("email") != null && localStorage.getItem("email") !== undefined && localStorage.getItem("email") != "-" ? localStorage.getItem("email") : "Emporia.gmail.com" : this.state.Userdetails.email
    let addressLine1 = this.props.addresss.state.address === 0 ? "SELFCOLECT" : this.state.Userdetails.addressLine1
    let city = this.props.addresss.state.address === 0 ? "SELFCOLECT" : this.state.Userdetails.city
    let state = this.props.addresss.state.address === 0 ? "SELFCOLECT" : this.state.Userdetails.state
    let poscode = this.props.addresss.state.address === 0 ? "94300" : this.state.Userdetails.poscode
    let PickUpIndicator = this.props.addresss.state.address === 0 ? 1 : 0

    const APIKey = "f783628784ec4418af60cd35a0825d7348e554e1b51d4904a3f724e7cc089a64017e565d08d34592ae97a223a0ffa5ed430d202f43454968897b9cddcb604ee2316f500b3cd24cba9cb44b54a1ca43d3bdf35062728945b28b5144f4a6f22bffc43072e5a41c456c9d0ba003c81ad4097c65c2fa2aa147fb9d72bdb336df288e";

    let access_key = ""
    let profile_id = ""
    let transaction_uuid = ""
    let signed_date_time = ""
    let locale = ""
    let transaction_type = ""
    let reference_number = ""
    let amount = ""

    let currency = ""
    let bill_to_surname = ""
    let bill_to_forename = ""

    let bill_to_email = ""
    let bill_to_address_line1 = ""
    let bill_to_address_city = ""

    let bill_to_address_postal_code = ""
    let bill_to_address_state = ""
    let bill_to_address_country = ""
    let signature = ""
    let signed_field_names = ""


    if (this.state.isSetDetail === false) {
      if (this.props.addresss.state.address === 0) {
        // lastname = localStorage.getItem("lastname") != null && localStorage.getItem("lastname") !== undefined && localStorage.getItem("lastname") != "-" ? localStorage.getItem("lastname") : "Emporia"
        // firstname = localStorage.getItem("firstname") != null && localStorage.getItem("firstname") !== undefined && localStorage.getItem("firstname") != "-" ? localStorage.getItem("firstname") : "Emporia"
        // email = localStorage.getItem("email") != null && localStorage.getItem("email") !== undefined && localStorage.getItem("email") != "-" ? localStorage.getItem("email") : "Emporia.gmail.com"
        // addressLine1 = "SELFCOLECT"
        // city = "SELFCOLECT"
        // state = "SELFCOLECT"
        // poscode = "94300"
        // PickUpIndicator = 1
        this.setState({
          isSetDetail: true,
          fpx_buyerName: localStorage.getItem("lastname") != null && localStorage.getItem("lastname") !== undefined && localStorage.getItem("lastname") != "-" ? localStorage.getItem("lastname") + " " + localStorage.getItem("firstname") : "Emporia",
          fpx_buyerEmail: "weiyee731@gmail.com"

        })
        // fpx_buyerName = localStorage.getItem("lastname") != null && localStorage.getItem("lastname") !== undefined && localStorage.getItem("lastname") != "-" ? localStorage.getItem("lastname") + " " + localStorage.getItem("firstname") : "Emporia"
        // // // fpx_buyerEmail = localStorage.getItem("email") != null && localStorage.getItem("email") !== undefined && localStorage.getItem("email") != "-" ? localStorage.getItem("email") : "Emporia.gmail.com"
        // fpx_buyerEmail = "weiyee731@gmail.com"
      } else {
        // lastname = this.state.Userdetails.addressName
        // firstname = this.state.Userdetails.addressName
        // email = this.state.Userdetails.email
        // addressLine1 = this.state.Userdetails.addressLine1
        // city = this.state.Userdetails.city
        // state = this.state.Userdetails.state
        // poscode = this.state.Userdetails.poscode
        // PickUpIndicator = 0
        this.setState({
          isSetDetail: true,
          fpx_buyerName: lastname,
          fpx_buyerEmail: email

        })
      }
    }
    else {

      access_key = "fb2033f6e3fe3bb29fa96ebc01c911ae"
      profile_id = "FCC3E6E0-639C-4A4E-B58B-9C759897778F"
      transaction_uuid = time + '123'
      signed_date_time = now
      locale = "en"
      transaction_type = "sale"
      reference_number = time
      amount = totalPrice
      currency = "MYR"
      bill_to_surname = lastname
      bill_to_forename = firstname
      bill_to_email = email
      bill_to_address_line1 = addressLine1
      bill_to_address_city = city

      bill_to_address_postal_code = poscode
      bill_to_address_state = state
      bill_to_address_country = "MY"
      signed_field_names ="access_key,profile_id,transaction_uuid,signed_field_names,signed_date_time,locale,transaction_type,reference_number,amount,currency,bill_to_surname,bill_to_forename,bill_to_email,bill_to_address_line1,bill_to_address_city,bill_to_address_country"


      // access_key = crypto
      //   .createHmac('sha256', APIKey)
      //   .update("fb2033f6e3fe3bb29fa96ebc01c911ae")
      //   .digest('base64');

        

      // profile_id = crypto
      //   .createHmac('sha256', APIKey)
      //   .update("FCC3E6E0-639C-4A4E-B58B-9C759897778F")
      //   .digest('base64');

      // transaction_uuid = crypto
      //   .createHmac('sha256', APIKey)
      //   .update(time + '123')
      //   .digest('base64');

      // signed_date_time = crypto
      //   .createHmac('sha256', APIKey)
      //   .update(now)
      //   .digest('base64');


      // signed_field_names = crypto
      //   .createHmac('sha256', APIKey)
      //   .update("access_key,profile_id,transaction_uuid,signed_field_names,signed_date_time,locale,transaction_type,reference_number,amount,currency,bill_to_surname,bill_to_forename,bill_to_email,bill_to_address_line1,bill_to_address_city,bill_to_address_postal_code,bill_to_address_state,bill_to_address_country")
      //   .digest('base64');



      // locale = crypto
      //   .createHmac('sha256', APIKey)
      //   .update("en")
      //   .digest('base64');

      // transaction_type = crypto
      //   .createHmac('sha256', APIKey)
      //   .update("sale")
      //   .digest('base64');


      // reference_number = crypto
      //   .createHmac('sha256', APIKey)
      //   .update(time)
      //   .digest('base64');

      // amount = crypto
      //   .createHmac('sha256', APIKey)
      //   .update(totalPrice)
      //   .digest('base64');


      // currency = crypto
      //   .createHmac('sha256', APIKey)
      //   .update("MYR")
      //   .digest('base64');

      // bill_to_surname = crypto
      //   .createHmac('sha256', APIKey)
      //   .update(lastname)
      //   .digest('base64');

      // bill_to_forename = crypto
      //   .createHmac('sha256', APIKey)
      //   .update(firstname)
      //   .digest('base64');

      // bill_to_email = crypto
      //   .createHmac('sha256', APIKey)
      //   .update(email)
      //   .digest('base64');


      // bill_to_address_line1 = crypto
      //   .createHmac('sha256', APIKey)
      //   .update(addressLine1)
      //   .digest('base64');

      // bill_to_address_city = crypto
      //   .createHmac('sha256', APIKey)
      //   .update(city)
      //   .digest('base64');

      // bill_to_address_postal_code = crypto
      //   .createHmac('sha256', APIKey)
      //   .update(poscode)
      //   .digest('base64');

      // bill_to_address_state = crypto
      //   .createHmac('sha256', APIKey)
      //   .update(state)
      //   .digest('base64');

      // bill_to_address_country = crypto
      //   .createHmac('sha256', APIKey)
      //   .update("MY")
      //   .digest('base64');


      // "signed_field_names=access_key,profile_id,transaction_uuid,signed_field_names,signed_date_time,locale,transaction_type,reference_number,amount,currency,bill_to_surname,bill_to_forename,bill_to_email,bill_to_address_line1,bill_to_address_city,bill_to_address_postal_code,bill_to_address_state,bill_to_address_country" + 
      // ",locale=en,transaction_type=sale,reference_number=" + time + ",amount=" + totalPrice + ",currency=MYR,bill_to_surname=" + lastname + ",bill_to_forename=" + firstname + ",bill_to_email=" + email + 
      // ",bill_to_address_line1=" + addressLine1 + ",bill_to_address_city=" + city + ",bill_to_address_postal_code=" + poscode + ",bill_to_address_state=" + state + ",bill_to_address_country=MY"


      signature = "access_key=" + access_key + ",profile_id=" + profile_id + ",transaction_uuid=" + transaction_uuid + ",signed_field_names=" + signed_field_names + ",signed_date_time=" + signed_date_time + ",locale=" + locale + ",transaction_type=sale,reference_number=" + reference_number + ",amount=" + amount + ",currency=" + currency + ",bill_to_surname=" + bill_to_surname + ",bill_to_forename=" + bill_to_forename + ",bill_to_email=" + bill_to_email + ",bill_to_address_line1=" + bill_to_address_line1 + ",bill_to_address_city=" + bill_to_address_city + ",bill_to_address_country=" + bill_to_address_country

      // const signature = "access_key=fb2033f6e3fe3bb29fa96ebc01c911ae,profile_id=FCC3E6E0-639C-4A4E-B58B-9C759897778F,transaction_uuid=" + (time + '123') + ",signed_field_names=access_key,profile_id,transaction_uuid,signed_field_names,signed_date_time,locale,transaction_type,reference_number,amount,currency,bill_to_surname,bill_to_forename,bill_to_email,bill_to_address_line1,bill_to_address_city,bill_to_address_postal_code,bill_to_address_state,bill_to_address_country,signed_date_time=" + now + ",locale=en,transaction_type=sale,reference_number=" + time + ",amount=" + totalPrice + ",currency=MYR,bill_to_surname=" + lastname + ",bill_to_forename=" + firstname + ",bill_to_email=" + email + ",bill_to_address_line1=" + addressLine1 + ",bill_to_address_city=" + city + ",bill_to_address_postal_code=" + poscode + ",bill_to_address_state=" + state + ",bill_to_address_country=MY"


      console.log("signature", signature)
      var signed = crypto
        .createHmac('sha256', APIKey)
        .update(signature)
        .digest('base64');

    }

    //Ashley Account 
    // const signature = "access_key=0646aa159df03a8fa52c81ab8a5bc4a7,profile_id=9D4BDAEB-A0D5-4D05-9E4B-40DB52678DF0,transaction_uuid=" + (time + '123') + ",signed_field_names=access_key,profile_id,transaction_uuid,signed_field_names,signed_date_time,locale,transaction_type,reference_number,amount,currency,bill_to_surname,bill_to_forename,bill_to_email,bill_to_address_line1,bill_to_address_city,bill_to_address_postal_code,bill_to_address_state,bill_to_address_country,signed_date_time=" + now + ",locale=en,transaction_type=authorization,reference_number=" + time + ",amount=" + totalPrice + ",currency=MYR,bill_to_surname=" + lastname + ",bill_to_forename=" + firstname + ",bill_to_email=" + email + ",bill_to_address_line1=" + addressLine1 + ",bill_to_address_city=" + city + ",bill_to_address_postal_code=" + poscode + ",bill_to_address_state=" + state + ",bill_to_address_country=MY"
    // const APIKey = "08fd3b4b9f8d4866b5b58c5039ed1c795393402695da4b7fb8e33aac2929bf5d8bc43156efb34d5b97a632dad2e0b55001e3d1a751f4420f90b42b140594a3adfcb2852df84a4bb59d9f8f47458dacf12316b373362a419a99fe32a3286b3d0b5056c6c1923f4ded83014852dcce8c7085baaf83536c4e65933f6ecbd96fe3fb";


    // Emporia Account
    // const signature = "access_key=fb2033f6e3fe3bb29fa96ebc01c911ae,profile_id=FCC3E6E0-639C-4A4E-B58B-9C759897778F,transaction_uuid=" + (time + '123') + ",signed_field_names=access_key,profile_id,transaction_uuid,signed_field_names,signed_date_time,locale,transaction_type,reference_number,amount,currency,bill_to_surname,bill_to_forename,bill_to_email,bill_to_address_line1,bill_to_address_city,bill_to_address_postal_code,bill_to_address_state,bill_to_address_country,signed_date_time=" + now + ",locale=en,transaction_type=authorization,reference_number=" + time + ",amount=" + totalPrice + ",currency=MYR,bill_to_surname=" + lastname + ",bill_to_forename=" + firstname + ",bill_to_email=" + email + ",bill_to_address_line1=" + addressLine1 + ",bill_to_address_city=" + city + ",bill_to_address_postal_code=" + poscode + ",bill_to_address_state=" + state + ",bill_to_address_country=MY"
    // const APIKey = "f783628784ec4418af60cd35a0825d7348e554e1b51d4904a3f724e7cc089a64017e565d08d34592ae97a223a0ffa5ed430d202f43454968897b9cddcb604ee2316f500b3cd24cba9cb44b54a1ca43d3bdf35062728945b28b5144f4a6f22bffc43072e5a41c456c9d0ba003c81ad4097c65c2fa2aa147fb9d72bdb336df288e";


    // Emporia Account


    // const access_key = "fb2033f6e3fe3bb29fa96ebc01c911ae"
    // console.log("access_key1", access_key)

    const onSubmit = (Ind, transactionUUID) => {
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
        PickUpInd: Ind,
        TRANSACTIONUUID: transactionUUID
      })
    }

    // if (document.getElementById("payment_form2")) {
    //   console.log("hahaha")
    //   setTimeout(() => {
    //     "submitForm()"
    //   }, 10000);
    // }

    return (
      <div className="checkout">
        <div className="container" style={{ textAlign: "left" }}>
          <hr />
          <div>
            <TextField fullWidth label="Total" value={this.state.fpx_txnAmount} name="total" onChange={(e) => this.setState({ fpx_txnAmount: e.target.value })} />
          </div>
          <div>
            <TextField fullWidth label="Msg Type" value={this.state.fpx_msgType} name="msgType" onChange={(e) => this.setState({ fpx_msgType: e.target.value })} />
          </div>
          <div>
            <TextField fullWidth label="Msg Token" value={this.state.fpx_msgToken} name="msgToken" onChange={(e) => this.setState({ fpx_msgToken: e.target.value })} />
          </div>
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
                        </IconButton><label onClick={() => this.handlePaymentClick(payment.id, true)} style={{ fontSize: "16px" }}>{payment.method}  {payment.image !== "" && <Image paddingRight="20px" width="150px" height="60px" src={FPX} />} {payment.id !== 1 && <Image paddingRight="20px" width="150px" height="60px" src="https://www.kindpng.com/picc/m/35-351793_credit-or-debit-card-mastercard-logo-visa-card.png" />}</label>
                        {
                          parseInt(this.state.paymentMethodsID) === 1 &&
                          <FormControl variant="outlined" size="small" style={{ width: "100%" }}>
                            <Select
                              native
                              id="Bank"
                              value={this.state.BankID}
                              onChange={(x) => this.handleBanking(x.target.value)}
                              className="select"
                            >
                              {/* {
                                this.state.bankDetails !== null && this.state.bankDetails.map((details) =>
                                  <option value={details.BankID} key={details.BankID}  >
                                    {details.PaymentMethod}
                                  </option>
                                )
                              } */}
                              {
                                this.state.finalAllBankDetails !== null && this.state.finalAllBankDetails.map((details) =>
                                  <option disabled={details.BankStatus === "B" ? true : false} value={details.BankID} key={details.BankID}  >
                                    {details.BankName}{details.BankStatus === "B" ? " (Offline)" : ""}
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
                        </IconButton><label onClick={() => this.handlePaymentClick(payment.id, true)} style={{ fontSize: "16px" }}>{payment.method}  {payment.image !== "" && <Image paddingRight="20px" width="150px" height="60px" src={FPX} />}{payment.id !== 1 && <Image paddingRight="20px" width="150px" height="60px" src="https://www.kindpng.com/picc/m/35-351793_credit-or-debit-card-mastercard-logo-visa-card.png" />}</label>
                      </div>
                  }
                </>
              )
            })
          }
          {
            this.state.paymentMethodsID === 1 && this.state.BankID !== "" ?
              <React.Fragment>
                <label style={{ fontSize: "14px" }}>By Clicking on the "Proceed" button , you hereby agree with <a href={"https://www.mepsfpx.com.my/FPXMain/termsAndConditions.jsp"} style={{ color: "blue" }} >FPX's Term & Condition</a> </label>
                <div>
                  <form id="payment_form2" action="https://uat.mepsfpx.com.my/FPXMain/seller2DReceiver.jsp" method="post">
                    <input type="hidden" value={this.state.fpx_msgType} id="fpx_msgType" name="fpx_msgType"></input>
                    <input type="hidden" value={this.state.fpx_msgToken} id="fpx_msgToken" name="fpx_msgToken"></input>
                    <input type="hidden" value={this.state.fpx_sellerExId} id="fpx_sellerExId" name="fpx_sellerExId"></input>
                    <input type="hidden" value={this.state.fpx_sellerExOrderNo} id="fpx_sellerExOrderNo" name="fpx_sellerExOrderNo"></input>
                    <input type="hidden" value={this.state.fpx_sellerTxnTime} id="fpx_sellerTxnTime" name="fpx_sellerTxnTime"></input>
                    <input type="hidden" value={this.state.fpx_sellerOrderNo} id="fpx_sellerOrderNo" name="fpx_sellerOrderNo"></input>
                    <input type="hidden" value={this.state.fpx_sellerId} id="fpx_sellerId" name="fpx_sellerId"></input>
                    <input type="hidden" value={this.state.fpx_sellerBankCode} id="fpx_sellerBankCode" name="fpx_sellerBankCode"></input>
                    <input type="hidden" value={this.state.fpx_txnCurrency} id="fpx_txnCurrency" name="fpx_txnCurrency"></input>
                    <input type="hidden" value={parseFloat(this.state.fpx_txnAmount).toFixed(2)} id="fpx_txnAmount" name="fpx_txnAmount"></input>
                    <input type="hidden" value={this.state.fpx_buyerEmail} id="fpx_buyerEmail" name="fpx_buyerEmail"></input>
                    <input type="hidden" value={this.state.fpx_checkSum} id="fpx_checkSum" name="fpx_checkSum"></input>
                    <input type="hidden" value={this.state.fpx_buyerName} id="fpx_buyerName" name="fpx_buyerName"></input>
                    <input type="hidden" value={this.state.fpx_buyerBankId} id="fpx_buyerBankId" name="fpx_buyerBankId"></input>
                    <input type="hidden" value={this.state.fpx_buyerBankBranch} id="fpx_buyerBankBranch" name="fpx_buyerBankBranch"></input>
                    <input type="hidden" value={this.state.fpx_buyerAccNo} id="fpx_buyerAccNo" name="fpx_buyerAccNo"></input>
                    <input type="hidden" value={this.state.fpx_buyerId} id="fpx_buyerId" name="fpx_buyerId"></input>
                    <input type="hidden" value={this.state.fpx_makerName} id="fpx_makerName" name="fpx_makerName"></input>
                    <input type="hidden" value={this.state.fpx_buyerIban} id="fpx_buyerIban" name="fpx_buyerIban"></input>
                    <input type="hidden" value={this.state.fpx_version} id="fpx_version" name="fpx_version"></input>
                    <input type="hidden" value={this.state.fpx_productDesc} id="fpx_productDesc" name="fpx_productDesc"></input>
                    <input type="submit"
                      style={{
                        backgroundColor: "#04AA6D",
                        border: "none",
                        color: "white",
                        fontSize: "14px",
                        textDecoration: "none",
                      }} id="submit" name="submit" value="Proceed" onClick={() => onSubmit(PickUpIndicator, this.state.fpx_sellerOrderNo)} />
                  </form>
                </div>
              </React.Fragment>
              :
              <React.Fragment>
                {/* const signature = "access_key="+ access_key +",profile_id="+ profile_id +",transaction_uuid=" + transaction_uuid + ",
                  signed_field_names=access_key,profile_id,transaction_uuid,signed_field_names,signed_date_time,locale,transaction_type,reference_number,amount,currency,bill_to_surname,bill_to_forename,bill_to_email,bill_to_address_line1,bill_to_address_city,bill_to_address_postal_code,bill_to_address_state,bill_to_address_country,
                  signed_date_time=" + signed_date_time + ",locale" + locale + ",transaction_type=" + transaction_type + ",reference_number=" + reference_number + ",amount=" + amount + ",currency=" + currency + ",bill_to_surname=" + bill_to_surname + ",bill_to_forename=" + bill_to_forename + ",bill_to_email=" + bill_to_email + ",bill_to_address_line1=" + bill_to_address_line1 + ",bill_to_address_city=" + bill_to_address_city + ",bill_to_address_postal_code=" + bill_to_address_postal_code + ",bill_to_address_state=" + bill_to_address_state + ",bill_to_address_country="+bill_to_address_country  */}

                {console.log("AAA access_key", access_key)}
                {console.log("AAA profile_id", profile_id)}
                {console.log("AAA transaction_uuid", transaction_uuid)}
                {console.log("AAA signed_date_time", signed_date_time)}
                {console.log("AAA locale", locale)}

                {console.log("AAA transaction_type", transaction_type)}
                {console.log("AAA reference_number", reference_number)}
                {console.log("AAA amount", amount)}
                {console.log("AAA currency", currency)}
                {console.log("AAA bill_to_surname", bill_to_surname)}

                {console.log("AAA bill_to_forename", bill_to_forename)}
                {console.log("AAA bill_to_email", bill_to_email)}
                {console.log("AAA bill_to_address_line1", bill_to_address_line1)}
                {console.log("AAA bill_to_address_city", bill_to_address_city)}
                {console.log("AAA bill_to_address_postal_code", bill_to_address_postal_code)}

                {console.log("AAA bill_to_address_country", bill_to_address_country)}
                {console.log("AAA bill_to_address_state", bill_to_address_state)}
                {console.log("AAA signed", signed)}
                {console.log("AAA signature", signature)}
                <div>
                  <form id="payment_form" action="https://testsecureacceptance.cybersource.com/pay" method="post">
                    <input type="hidden" id="access_key" name="access_key" value={access_key}></input>
                    <input type="hidden" id="profile_id" name="profile_id" value={profile_id}></input>
                    <input type="hidden" id="transaction_uuid" name="transaction_uuid" value={transaction_uuid}></input>
                    <input type="hidden" id="signed_field_names" name="signed_field_names" value={signed_field_names}></input>
                    <input type="hidden" id="signed_date_time" name="signed_date_time" value={signed_date_time}></input>
                    <input type="hidden" id="locale" name="locale" value={locale}></input>
                    <input type="hidden" id="transaction_type" name="transaction_type" value="sale"></input>
                    <input type="hidden" id="reference_number" name="reference_number" value={reference_number}></input>
                    <input type="hidden" id="amount" name="amount" value={amount}></input>
                    <input type="hidden" id="currency" name="currency" value={currency}></input>
                    <input type="hidden" id="bill_to_surname" name="bill_to_surname" value={bill_to_surname}></input>
                    <input type="hidden" id="bill_to_forename" name="bill_to_forename" value={bill_to_forename}></input>
                    <input type="hidden" id="bill_to_email" name="bill_to_email" value={bill_to_email}></input>
                    <input type="hidden" id="bill_to_address_line1" name="bill_to_address_line1" value={bill_to_address_line1}></input>
                    <input type="hidden" id="bill_to_address_city" name="bill_to_address_city" value={bill_to_address_city}></input>
                    {/* <input type="hidden" id="bill_to_address_postal_code" name="bill_to_address_postal_code" value={bill_to_address_postal_code}></input>
                    <input type="hidden" id="bill_to_address_state" name="bill_to_address_state" value={bill_to_address_state}></input> */}
                    <input type="hidden" id="bill_to_address_country" name="bill_to_address_country" value={bill_to_address_country}></input>
                    <input type="hidden" id="signature" name="signature" value={signed}></input>
                    <input type="submit" style={{
                      backgroundColor: this.state.paymentMethodsID === 2 ? "#04AA6D" : "#808080",
                      border: "none",
                      color: "white",
                      fontSize: "14px",
                      textDecoration: "none",
                    }} id="submit" name="submit" value="Proceed" onClick={() =>
                      onSubmit(PickUpIndicator, time + '123')
                    } disabled={this.state.paymentMethodsID === 2 ? false : true} />
                  </form>
                  {/* <form id="payment_form" action="https://testsecureacceptance.cybersource.com/pay" method="post">
                    <input type="hidden" id="access_key" name="access_key" value="fb2033f6e3fe3bb29fa96ebc01c911ae"></input>
                    <input type="hidden" id="profile_id" name="profile_id" value="FCC3E6E0-639C-4A4E-B58B-9C759897778F"></input>
                    <input type="hidden" id="transaction_uuid" name="transaction_uuid" value={time + '123'}></input>
                    <input type="hidden" id="signed_field_names" name="signed_field_names" value="access_key,profile_id,transaction_uuid,signed_field_names,signed_date_time,locale,transaction_type,reference_number,amount,currency,bill_to_surname,bill_to_forename,bill_to_email,bill_to_address_line1,bill_to_address_city,bill_to_address_postal_code,bill_to_address_state,bill_to_address_country"></input>
                    <input type="hidden" id="signed_date_time" name="signed_date_time" value={now}></input>
                    <input type="hidden" id="locale" name="locale" value="en"></input>
                    <input type="hidden" id="transaction_type" name="transaction_type" value="sale"></input>
                    <input type="hidden" id="reference_number" name="reference_number" value={time}></input>
                    <input type="hidden" id="amount" name="amount" value={totalPrice}></input>
                    <input type="hidden" id="currency" name="currency" value="MYR"></input>
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
                    }} id="submit" name="submit" value="Proceed" onClick={() =>
                      onSubmit(PickUpIndicator, time + '123')
                    } disabled={this.state.paymentMethodsID === 2 ? false : true} />
                  </form> */}
                </div>
              </React.Fragment>
          }
        </div >
      </div >
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