// react
import React, { Component } from "react";
// third-party
import { connect } from "react-redux";
import {
  Select
} from "@mui/material";
// application
import Currency from "../shared/Currency";
// data stubs
import payments from "../../data/shopPayments";
import { GitAction } from "../../store/action/gitAction";
import IconButton from "@mui/material/IconButton";
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { toast } from "react-toastify";
import TextField from '@mui/material/TextField';
// import text from './EX00013776.key'; // Relative path to your File
import axios from "axios";
import FormControl from "@mui/material/FormControl";

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';

// Display Card
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import {
  formatCreditCardNumber,
  formatExpirationDate,
  formatCVC,
} from "../account/AccountPageCreditCard/utils";
import moment from "moment";
import FPX from '../../assets/fpx-logo.png';
import { Image } from 'react-bootstrap';
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
  BankID: "",
  bankDetails: [],
  isBankSet: false,
  fpx_buyerBankId: "",
  FPXBankList: [],

  isAllBankSet: false,
  allBankDetails: [],
  finalAllBankDetails: [],


  // FPX Online Banking
  fpx_msgType: "",
  fpx_msgToken: "",
  fpx_sellerExId: "EX00013776",
  fpx_sellerExOrderNo: "",
  fpx_sellerTxnTime: "",
  fpx_sellerOrderNo: "",
  fpx_sellerId: "SE00015397",
  fpx_sellerBankCode: "",
  fpx_txnCurrency: "",
  fpx_txnAmount: "",
  fpx_buyerEmail: "",
  fpx_buyerName: "",
  fpx_checkSum: "",

  fpx_buyerBankBranch: "",
  fpx_buyerAccNo: "",
  fpx_buyerId: "",
  fpx_makerName: "",
  fpx_buyerIban: "",
  fpx_productDesc: "",
  fpx_version: "",
  bankingdata: "",

  isSetDetail: false,

  BankingType: "",
  isLimitAlert: false,
  limitMsg: "",
  isLimitCheck: false,
}
class CheckPaymentStatus extends Component {
  payments = payments;

  constructor(props) {
    super(props);

    this.state = initialState
    this.setDetails = this.setDetails.bind(this)
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
      }
    }
  }

  componentDidMount() {

    let URL2 = "https://myemporia.my/payment/06_fpx_bankListRequest.php"
    const config = { headers: { 'Content-Type': 'multipart/form-data' } }
    axios.post(URL2, {}, config).then((res) => {
      if (res.status === 200) {

        let bankFinalList = []
        let bankList = res.data.split('|')[0]
        bankList = bankList.split(',')
        console.log("bankListbankList", bankList)
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

        console.log("bankList", bankList)
        bankList.length > 0 && bankList.map((bank) => {

          const listing = bankFinalList.filter((data) => data.BankID !== null && data.BankID.toLowerCase().includes(bank.split("~")[0].toLowerCase()))
          if (listing.length === 0) {
            let bankListing = {
              BankID: bank.split("~")[0],
              BankStatus: bank.split("~")[1],
              BankName: bank.split("~")[0],
              BankType: "B2C",
              PaymentMethod: bank.split("~")[0],
              PaymentMethodCharges: 1.2,
              PaymentMethodDesc: "FPX",
              PaymentMethodID: 59,
              PaymentMethodImage: "",
              TestingInd: 0
            }
            bankFinalList.push(bankListing)
          }
        })

        bankFinalList.sort((a, b) => a.PaymentMethod.localeCompare(b.PaymentMethod));
        this.setState({ finalAllBankDetails: bankFinalList, BankID: "0" })
      }
    }).catch(e => {
      toast.error("There is something wrong with 111. Please try again.")
    })
  }

  handlePaymentClick = (id, value) => {
    if (value === true) {
      this.setState({ paymentMethodsID: id })
      if (id === 1)
        this.handleBanking(this.state.BankID)
    } else {
      this.setState({ paymentMethodsID: "" })
    }
  }

  handleBanking = (bankid) => {
      let date = moment(new Date()).format("YYYYMMDDHHmm").toString()
      // let fpx_sellerExOrderNo = date + "12"
      // let fpx_sellerTxnTime = date + "12"
      // let fpx_sellerOrderNo = date + "12"

      let bankingdata = this.state.fpx_buyerAccNo + "|" + this.state.fpx_buyerBankBranch + "|" + bankid + "|" + this.state.fpx_buyerEmail + "|" + this.state.fpx_buyerIban + "|" + this.state.fpx_buyerId + "|" + this.state.fpx_buyerName + "|" + this.state.fpx_makerName + "|" + this.state.fpx_msgToken + "|" + this.state.fpx_msgType + "|" + this.state.fpx_productDesc + "|" + this.state.fpx_sellerBankCode + "|" + this.state.fpx_sellerExId + "|" + this.state.fpx_sellerExOrderNo + "|" + this.state.fpx_sellerId + "|" + this.state.fpx_sellerOrderNo + "|" + this.state.fpx_sellerTxnTime + "|" + parseFloat(this.state.fpx_txnAmount).toFixed(2) + "|" + this.state.fpx_txnCurrency + "|" + this.state.fpx_version

      // console.log("bankingdata", bankingdata)
      // console.log("bankingdata this.state.fpx_buyerAccNo + | + this.state.fpx_buyerBankBranch + | + bankid + | + this.state.fpx_buyerEmail + | + this.state.fpx_buyerIban + |+ this.state.fpx_buyerId + | + this.state.fpx_buyerName +| + this.state.fpx_makerName + | + this.state.fpx_msgToken + | + this.state.fpx_msgType + | + this.state.fpx_productDesc + | + this.state.fpx_sellerBankCode + | + this.state.fpx_sellerExId + | + fpx_sellerExOrderNo + | + this.state.fpx_sellerId + | + fpx_sellerOrderNo + | + fpx_sellerTxnTime + | + this.state.fpx_txnAmount+ | + this.state.fpx_txnCurrency + | + this.state.fpx_version")
      let URL = "https://myemporia.my/payment/check.php"
      const config = { headers: { 'Content-Type': 'multipart/form-data' } }
      const formData = new FormData()
      formData.append("bankingdata", bankingdata);
      axios.post(URL, formData, config).then((res) => {
        if (res.status === 200) {
          this.setState({
            fpx_checkSum: res.data.split('"')[1],
            // fpx_buyerBankId: bankid,
            // fpx_sellerExOrderNo: fpx_sellerExOrderNo,
            // fpx_sellerTxnTime: fpx_sellerTxnTime,
            // fpx_sellerOrderNo: fpx_sellerOrderNo
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
    if (this.props.paymentmethod.length > 0 && this.state.isAllBankSet === false) {
      this.props.paymentmethod !== null && this.props.paymentmethod.filter((x) => parseInt(x.PaymentMethodTypeID) === 2).map((bank) => {
        bank.PaymentMethod !== null && JSON.parse(bank.PaymentMethod).map((details) => {
          this.state.allBankDetails.push(details)
          this.setState({ isAllBankSet: true, })
        })
      })
    }

    // credit and debit card
    let now = new Date().toISOString().split('.').shift() + 'Z';
    const d = new Date();
    const time = d.getTime();
    var n = Math.floor(Math.random() * 11);
    var k = Math.floor(Math.random() * 1000000);
    var m = String.fromCharCode(n) + k;

    let totalPrice = this.state.totalPrice
    let lastname = localStorage.getItem("lastname") != null && localStorage.getItem("lastname") !== undefined && localStorage.getItem("lastname") != "-" ? localStorage.getItem("lastname") : "Emporia"
    let firstname = localStorage.getItem("firstname") != null && localStorage.getItem("firstname") !== undefined && localStorage.getItem("firstname") != "-" ? localStorage.getItem("firstname") : "Emporia"
    let email = localStorage.getItem("email") != null && localStorage.getItem("email") !== undefined && localStorage.getItem("email") != "-" ? localStorage.getItem("email") : "Emporia.gmail.com"
    let addressLine1 = "SELFCOLECT"
    let city = "SELFCOLECT"
    let state = "SELFCOLECT"
    let poscode = "94300"


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

    if (this.state.isSetDetail === false && this.state.Userdetails.length !== 0) {
      if (this.props.addresss.state.address === 0) {
        if (parseInt(totalPrice) > 30000)
          this.setState({ isLimitAlert: true, limitMsg: "Maximum Transaction Limit Exceeded" })
        else if (parseInt(totalPrice) < 1)
          this.setState({ isLimitAlert: true, limitMsg: "Transaction Amount Below Transaction Limit" })

        this.setState({
          isSetDetail: true,
          fpx_buyerName: localStorage.getItem("lastname") != null && localStorage.getItem("lastname") !== undefined && localStorage.getItem("lastname") != "-" ? localStorage.getItem("lastname") + " " + localStorage.getItem("firstname") : "Emporia",
          fpx_buyerEmail: "weiyee731@gmail.com",
          fpx_txnAmount: totalPrice
        })
      } else {

        if (parseInt(totalPrice) > 30000)
          this.setState({ isLimitAlert: true, isLimitCheck: true, limitMsg: "Maximum Transaction Limit Exceeded" })
        else if (parseInt(totalPrice) < 1)
          this.setState({ isLimitAlert: true, isLimitCheck: true, limitMsg: "Transaction Amount Below Transaction Limit" })

        this.setState({
          isSetDetail: true,
          fpx_buyerName: lastname,
          fpx_buyerEmail: email,
          fpx_txnAmount: totalPrice
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
      signed_field_names = "access_key,profile_id,transaction_uuid,signed_field_names,signed_date_time,locale,transaction_type,reference_number,amount,currency,bill_to_surname,bill_to_forename,bill_to_email,bill_to_address_line1,bill_to_address_city,bill_to_address_country"

      signature = "access_key=" + access_key + ",profile_id=" + profile_id + ",transaction_uuid=" + transaction_uuid + ",signed_field_names=" + signed_field_names + ",signed_date_time=" + signed_date_time + ",locale=" + locale + ",transaction_type=sale,reference_number=" + reference_number + ",amount=" + amount + ",currency=" + currency + ",bill_to_surname=" + bill_to_surname + ",bill_to_forename=" + bill_to_forename + ",bill_to_email=" + bill_to_email + ",bill_to_address_line1=" + bill_to_address_line1 + ",bill_to_address_city=" + bill_to_address_city + ",bill_to_address_country=" + bill_to_address_country

      var signed = crypto
        .createHmac('sha256', APIKey)
        .update(signature)
        .digest('base64');
    }

    const bankSelection = (type) => {
      return (
        <FormControl variant="outlined" size="small" style={{ width: "100%" }}>
          <Select
            native
            id="Bank"
            value={this.state.BankID}
            onChange={(x) => this.handleBanking(x.target.value)}
            className="select"
          >
            <option value="0" key="0">Select Bank</option>
            {
              this.state.finalAllBankDetails !== null && this.state.finalAllBankDetails.filter((x) => x.BankType === type).map((details) =>
                <option disabled={details.BankStatus === "B" ? true : false} value={details.BankID} key={details.BankID}  >
                  {console.log("BANKBANK", details)}
                  {details.PaymentMethod}{details.BankStatus === "B" ? " (Offline)" : ""}
                </option>
              )
            }
          </Select>
        </FormControl>
      )
    }

    return (
      <div className="checkout">
        <div className="container" style={{ textAlign: "left" }}>
          <hr />
          {/* <div>
            <TextField fullWidth label="Total" value={this.state.fpx_txnAmount} name="total" onChange={(e) => this.setState({ fpx_txnAmount: e.target.value })} />
          </div>
          <div>
            <TextField fullWidth label="Msg Token" value={this.state.fpx_msgToken} name="msgToken" onChange={(e) => this.setState({ fpx_msgToken: e.target.value })} />
          </div>
          <div>
            <TextField fullWidth label="Seller Order Number" value={this.state.fpx_sellerOrderNo} name="total" onChange={(e) => this.setState({ fpx_sellerOrderNo: e.target.value })} />
          </div>
          <div>
            <TextField fullWidth label="Check Sum" value={this.state.fpx_checkSum} name="total" onChange={(e) => this.setState({ fpx_checkSum: e.target.value })} />
          </div> */}
          <h5>Payment Method</h5>
          
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            value={parseInt(this.state.paymentMethodsID)}
          >
            <Stack spacing={0} direction="row" >
              <div>
                <FormControlLabel value="1" control={<Radio />} label="Online Banking" style={{ justifyContent: 'center' }}
                  onClick={() => this.handlePaymentClick(1, true)}
                  checked={parseInt(this.state.paymentMethodsID) === 1}
                />
              </div>
              <div>
                <img src={FPX} alt="" width="90.7px" height="40.6px" />
              </div>
            </Stack>
            {
              parseInt(this.state.paymentMethodsID) === 1 &&
              <div style={{ paddingLeft: "2vw" }}>
                <div>
                  <FormControlLabel value="Personal" control={<Radio />} label="Personal Bank" style={{ justifyContent: 'center' }}
                    onClick={() => this.setState({ BankingType: "Personal", fpx_msgToken: "01" })}
                    checked={this.state.BankingType === "Personal"}
                  />
                </div>
                {this.state.BankingType === "Personal" && bankSelection("B2C")}
                <div>
                  <FormControlLabel value="Corporate" control={<Radio />} label="Corporate Bank" style={{ justifyContent: 'center' }}
                    onClick={() => this.setState({ BankingType: "Corporate", fpx_msgToken: "02" })}
                    checked={this.state.BankingType === "Corporate"}
                  />
                </div>
                {this.state.BankingType === "Corporate" && bankSelection("B2B")}
              </div>
            }
            <Stack spacing={0} direction="row" >
              <FormControlLabel value="2" control={<Radio />} label="Debit/Credit Card"
                onClick={() => this.handlePaymentClick(2, true)}
                checked={parseInt(this.state.paymentMethodsID) === 2}
              />

              <img src="https://www.kindpng.com/picc/m/35-351793_credit-or-debit-card-mastercard-logo-visa-card.png" alt="" width="90.7px" height="40.6px" />
            </Stack>
          </RadioGroup>

          <div> <TextField fullWidth label="fpx_msgType" value={this.state.fpx_msgType} name="total" onChange={(e) => this.setState({ fpx_msgType: e.target.value })} />   </div>
          <div>  <TextField fullWidth label="Msg Token" value={this.state.fpx_msgToken} name="msgToken" onChange={(e) => this.setState({ fpx_msgToken: e.target.value })} />  </div>
          <div> <TextField fullWidth label="fpx_sellerExId" value={this.state.fpx_sellerExId} name="total" onChange={(e) => this.setState({ fpx_sellerExId: e.target.value })} /> </div>
          <div> <TextField fullWidth label="fpx_sellerExOrderNo" value={this.state.fpx_sellerExOrderNo} name="total" onChange={(e) => this.setState({ fpx_sellerExOrderNo: e.target.value })} /> </div>
          <div>  <TextField fullWidth label="fpx_sellerTxnTime" value={this.state.fpx_sellerTxnTime} name="total" onChange={(e) => this.setState({ fpx_sellerTxnTime: e.target.value })} />  </div>
          <div>  <TextField fullWidth label="fpx_sellerOrderNo" value={this.state.fpx_sellerOrderNo} name="total" onChange={(e) => this.setState({ fpx_sellerOrderNo: e.target.value })} /> </div>
          <div>   <TextField fullWidth label="fpx_sellerId" value={this.state.fpx_sellerId} name="total" onChange={(e) => this.setState({ fpx_sellerId: e.target.value })} /> </div>

          <div>    <TextField fullWidth label="fpx_sellerBankCode" value={this.state.fpx_sellerBankCode} name="total" onChange={(e) => this.setState({ fpx_sellerBankCode: e.target.value })} />   </div>
          <div> <TextField fullWidth label="fpx_txnCurrency" value={this.state.fpx_txnCurrency} name="total" onChange={(e) => this.setState({ fpx_txnCurrency: e.target.value })} /> </div>
          <div>   <TextField fullWidth label="fpx_txnAmount" value={this.state.fpx_txnAmount} name="total" onChange={(e) => this.setState({ fpx_txnAmount: e.target.value })} /> </div>
          <div> <TextField fullWidth label="fpx_buyerEmail" value={this.state.fpx_buyerEmail} name="total" onChange={(e) => this.setState({ fpx_buyerEmail: e.target.value })} />   </div>
          <div> <TextField fullWidth label="Check Sum" value={this.state.fpx_checkSum} name="total" onChange={(e) => this.setState({ fpx_checkSum: e.target.value })} />  </div>

          <div>  <TextField fullWidth label="fpx_buyerName" value={this.state.fpx_buyerName} name="total" onChange={(e) => this.setState({ fpx_buyerName: e.target.value })} /> </div>
          <div>  <TextField fullWidth label="fpx_buyerBankId" value={this.state.fpx_buyerBankId} name="total" onChange={(e) => this.setState({ fpx_buyerBankId: e.target.value })} />  </div>
          <div>  <TextField fullWidth label="fpx_buyerBankBranch" value={this.state.fpx_buyerBankBranch} name="total" onChange={(e) => this.setState({ fpx_buyerBankBranch: e.target.value })} />  </div>
          <div>  <TextField fullWidth label="fpx_buyerAccNo" value={this.state.fpx_buyerAccNo} name="total" onChange={(e) => this.setState({ fpx_buyerAccNo: e.target.value })} /> </div>


          <div> <TextField fullWidth label="fpx_buyerId" value={this.state.fpx_buyerId} name="total" onChange={(e) => this.setState({ fpx_buyerId: e.target.value })} />   </div>
          <div>  <TextField fullWidth label="fpx_makerName" value={this.state.fpx_makerName} name="total" onChange={(e) => this.setState({ fpx_makerName: e.target.value })} /> </div>
          <div> <TextField fullWidth label="fpx_buyerIban" value={this.state.fpx_buyerIban} name="total" onChange={(e) => this.setState({ fpx_buyerIban: e.target.value })} />  </div>
          <div> <TextField fullWidth label="fpx_version" value={this.state.fpx_version} name="total" onChange={(e) => this.setState({ fpx_version: e.target.value })} /> </div>
          <div> <TextField fullWidth label="fpx_productDesc" value={this.state.fpx_productDesc} name="total" onChange={(e) => this.setState({ fpx_productDesc: e.target.value })} />  </div>




          <React.Fragment>
            <label>fpx_msgType</label><input type="" value={this.state.fpx_msgType} id="fpx_msgType" name="fpx_msgType"></input>
            <label>fpx_msgToken</label><input type="" value={this.state.fpx_msgToken} id="fpx_msgToken" name="fpx_msgToken"></input>
            <label>fpx_sellerExId</label><input type="" value={this.state.fpx_sellerExId} id="fpx_sellerExId" name="fpx_sellerExId"></input>
            <label>fpx_sellerExOrderNo</label><input type="" value={this.state.fpx_sellerExOrderNo} id="fpx_sellerExOrderNo" name="fpx_sellerExOrderNo"></input>
            <label>fpx_sellerTxnTime</label><input type="" value={this.state.fpx_sellerTxnTime} id="fpx_sellerTxnTime" name="fpx_sellerTxnTime"></input>
            <label>fpx_sellerOrderNo</label><input type="" value={this.state.fpx_sellerOrderNo} id="fpx_sellerOrderNo" name="fpx_sellerOrderNo"></input>
            <label>fpx_sellerId</label><input type="" value={this.state.fpx_sellerId} id="fpx_sellerId" name="fpx_sellerId"></input>
            <label>fpx_sellerBankCode</label><input type="" value={this.state.fpx_sellerBankCode} id="fpx_sellerBankCode" name="fpx_sellerBankCode"></input>
            <label>fpx_txnCurrency</label><input type="" value={this.state.fpx_txnCurrency} id="fpx_txnCurrency" name="fpx_txnCurrency"></input>
            <label>fpx_txnAmount</label><input type="" value={parseFloat(this.state.fpx_txnAmount).toFixed(2)} id="fpx_txnAmount" name="fpx_txnAmount"></input>
            <label>fpx_buyerEmail</label><input type="" value={this.state.fpx_buyerEmail} id="fpx_buyerEmail" name="fpx_buyerEmail"></input>
            <label>fpx_checkSum</label><input type="" value={this.state.fpx_checkSum} id="fpx_checkSum" name="fpx_checkSum"></input>
            <label>fpx_buyerName</label><input type="" value={this.state.fpx_buyerName} id="fpx_buyerName" name="fpx_buyerName"></input>
            <label>fpx_buyerBankId</label><input type="" value={this.state.fpx_buyerBankId} id="fpx_buyerBankId" name="fpx_buyerBankId"></input>
            <label>fpx_buyerBankBranch</label><input type="" value={this.state.fpx_buyerBankBranch} id="fpx_buyerBankBranch" name="fpx_buyerBankBranch"></input>
            <label>fpx_buyerAccNo</label><input type="" value={this.state.fpx_buyerAccNo} id="fpx_buyerAccNo" name="fpx_buyerAccNo"></input>
            <label>fpx_buyerId</label><input type="" value={this.state.fpx_buyerId} id="fpx_buyerId" name="fpx_buyerId"></input>
            <label>fpx_makerName</label><input type="" value={this.state.fpx_makerName} id="fpx_makerName" name="fpx_makerName"></input>
            <label>fpx_buyerIban</label><input type="" value={this.state.fpx_buyerIban} id="fpx_buyerIban" name="fpx_buyerIban"></input>
            <label>fpx_version</label><input type="" value={this.state.fpx_version} id="fpx_version" name="fpx_version"></input>
            <label>fpx_productDesc</label><input type="" value={this.state.fpx_productDesc} id="fpx_productDesc" name="fpx_productDesc"></input>
            <div>


              <form id="payment_form2" action='https://uat.mepsfpx.com.my/FPXMain/sellerNVPTxnStatus.jsp' method="post">
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
                  }} id="submit" name="submit" value="Proceed" />
              </form>
            </div>
          </React.Fragment>


        </div >
      </div >
    );
  }


  render() {

    return (
      <React.Fragment>
        <div className="cart">
          <div className="container">
            <div className="card mt-3">
              <div className="card-body">
                <h5 className="card-title">MyEmporia</h5>
                <h6 className="card-title">Check FPX status</h6>
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

export default connect(mapStateToProps, mapDispatchToProps)(CheckPaymentStatus);