// react
import React, { Component } from "react";
import PropTypes from 'prop-types';
// third-party
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {
    Select
} from "@mui/material";
// application
import Currency from "../shared/Currency";
// data stubs
import payments from "../../data/shopPayments";
import { GitAction } from "../../../store/action/gitAction";
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
import DeliveryFee from "./ShopPageDeliveryFee";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Grid, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
const crypto = require('crypto');

const initialState = {
    paymentMethods: "",
    paymentMethodsID: "",
    cart: [],
    cardList: [],
    subtotal: 1,
    total: 0,
    totalApplyPromo: 0,
    totalDeduction: 0,
    // shipping: 1,
    shipping: 0,
    isShippingPromo: false,
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
    fpx_msgType: "AR",
    fpx_msgToken: "01",
    // fpx_sellerExId: "EX00013776",
    fpx_sellerExId: "EX00012067", // live FPX
    fpx_sellerExOrderNo: "",
    fpx_sellerTxnTime: "",
    fpx_sellerOrderNo: "",
    // fpx_sellerId: "SE00015397",
    fpx_sellerId: "SE00055564",  // live FPX
    fpx_sellerBankCode: "01",
    fpx_txnCurrency: "MYR",
    fpx_txnAmount: "",
    fpx_buyerEmail: "",
    fpx_buyerName: "",

    fpx_buyerBankBranch: "",
    fpx_buyerAccNo: "",
    fpx_buyerId: "",
    fpx_makerName: "",
    fpx_buyerIban: "",
    fpx_productDesc: "Emporia Hardware",
    fpx_version: "6.0",
    bankingdata: "",

    isSetDetail: false,

    BankingType: "",
    isLimitAlert: false,
    limitMsg: "",
    isLimitCheck: false,

    promoVoucher: "",
    isVoucherApply: false,
    applyPromo: [],
    promoError: "",
    promoData: [
        { id: 1, promoCode: "PROMO2022", discount: "10", startDate: "2022-12-01", endDate: "2022-12-12", type: "percent" },
        { id: 2, promoCode: "PROMO0101", discount: "15", startDate: "2022-12-01", endDate: "2022-12-27", type: "cash" },
        { id: 3, promoCode: "PROMO1212", discount: "20", startDate: "2022-12-01", endDate: "2022-12-30", type: "shipping" }
    ]
}
class PagePayment extends Component {
    payments = payments;

    constructor(props) {
        super(props);

        this.state = initialState
        // this.handleShipping = this.handleShipping.bind(this)
        // this.setDetails = this.setDetails.bind(this)
        this.props.CallAllCreditCard(window.localStorage.getItem("id"));
        this.props.CallAllPaymentMethod();
        this.handleBanking = this.handleBanking.bind(this)
    }
    static propTypes = {
        onReset: PropTypes.func,
        checkout: PropTypes.object,
        onBackStep: PropTypes.func,
        onGotoStep: PropTypes.func,
        onNextStep: PropTypes.func,
        onApplyShipping: PropTypes.func,
    };


    componentDidMount() {
        if (this.props.data !== undefined && this.props.data.length > 0) {
            // this.setDetails(this.props.data)
        }

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
            toast.error("There is something wrong for bank retrieve. Please try again.")
        })

        // const selectedAddress = this.props.addresses.filter((x) => parseInt(x.UserAddressBookID) === parseInt(this.props.addressID))
        // this.handleShipping(selectedAddress)
        // console.log(selectedAddress, "selectedAddress")
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

                    {
                        this.state.isVoucherApply === true &&
                        <tr>
                            <th style={{ textAlign: "right" }}>Discount</th>
                            <td style={{ color: "red" }}>
                                - <Currency value={this.state.totalDeduction} />
                            </td>
                        </tr>
                    }
                </tbody>
            </React.Fragment>
        );
    }

    verifyPromoCode() {
        let promoListing = this.state.promoData
        let verify = false
        let deduction = 0
        let totalAfterPromo = 0
        let isShippingPromo = false
        let todayDate = moment(new Date()).format("YYYY-MM-DD")

        const promoDeduction = (data) => {
            if (data.length > 0) {
                let discount = parseFloat(data[0].discount)
                let originalTotal = this.state.total
                let originalShipping = this.state.shipping

                switch (data[0].type) {
                    case "percent":
                        deduction = originalTotal * (discount / 100)
                        if (deduction > originalTotal)
                            totalAfterPromo = 0
                        else
                            totalAfterPromo = originalTotal - deduction

                        break;

                    case "cash":
                        deduction = discount
                        if (deduction > originalTotal)
                            totalAfterPromo = 0
                        else
                            totalAfterPromo = originalTotal - deduction

                        break;

                    case "shipping":
                        if (originalShipping > discount)
                            deduction = discount
                        else
                            deduction = originalShipping

                        totalAfterPromo = originalTotal - deduction
                        isShippingPromo = true
                        break;

                    default:
                        break;
                }
            }
        }

        let promoError = ""
        let applyPromo = []

        if (promoListing.length > 0) {
            let data = promoListing.filter((x) => x.promoCode === this.state.promoVoucher)
            if (data.length > 0) {
                if (data[0].startDate < todayDate && data[0].endDate > todayDate) {
                    promoDeduction(data)
                    applyPromo = data
                    promoError = ""
                    verify = true
                }
                else {
                    if (data[0].startDate > todayDate)
                        promoError = "Promotion will start on " + data[0].startDate
                    if (data[0].endDate < todayDate)
                        promoError = "Promo Voucher Expired"
                }
            }
            else
                promoError = "Invalid Promo Code"
        } else
            promoError = "Invalid Promo Code"

        this.setState({ applyPromo: applyPromo, promoError: promoError, isVoucherApply: verify, totalApplyPromo: totalAfterPromo, totalDeduction: deduction, isShippingPromo: isShippingPromo })
        return verify
    }


    handleBanking = (bankid) => {
        let date = moment(new Date()).format("YYYYMMDDHHmmss").toString()
        let fpx_sellerExOrderNo = date
        let fpx_sellerTxnTime = date
        let fpx_sellerOrderNo = date

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

        {/* this.setState({ applyPromo: applyPromo, promoError: promoError, isVoucherApply: verify, totalApplyPromo: totalAfterPromo, totalDeduction: deduction, isShippingPromo: isShippingPromo }) */ }

        let totalPrice = this.state.isVoucherApply ? parseFloat(this.state.totalApplyPromo).toFixed(2) : parseFloat(this.state.total).toFixed(2)
        let lastname = this.props.addressID === 0 ? localStorage.getItem("lastname") != null && localStorage.getItem("lastname") !== undefined && localStorage.getItem("lastname") != "-" ? localStorage.getItem("lastname") : "Emporia" : this.state.Userdetails.addressName
        let firstname = this.props.addressID === 0 ? localStorage.getItem("firstname") != null && localStorage.getItem("firstname") !== undefined && localStorage.getItem("firstname") != "-" ? localStorage.getItem("firstname") : "Emporia" : this.state.Userdetails.addressName
        let email = this.props.addressID === 0 ? localStorage.getItem("email") != null && localStorage.getItem("email") !== undefined && localStorage.getItem("email") != "-" ? localStorage.getItem("email") : "Emporia.gmail.com" : this.state.Userdetails.email
        let addressLine1 = this.props.addressID === 0 ? "SELFCOLECT" : this.state.Userdetails.addressLine1
        let city = this.props.addressID === 0 ? "SELFCOLECT" : this.state.Userdetails.city
        let state = this.props.addressID === 0 ? "SELFCOLECT" : this.state.Userdetails.state
        let poscode = this.props.addressID === 0 ? "94300" : this.state.Userdetails.poscode
        let PickUpIndicator = this.props.addressID === 0 ? 1 : 0

        // const APIKey = "f783628784ec4418af60cd35a0825d7348e554e1b51d4904a3f724e7cc089a64017e565d08d34592ae97a223a0ffa5ed430d202f43454968897b9cddcb604ee2316f500b3cd24cba9cb44b54a1ca43d3bdf35062728945b28b5144f4a6f22bffc43072e5a41c456c9d0ba003c81ad4097c65c2fa2aa147fb9d72bdb336df288e";
        // live credit card
        const APIKey = "2c57e2f0161a450ebe5fb67ffbdd51fc196b0256ed1940158f54990b57f4ec3c1e08823fa84c4596bea898bb2b53e6d124414d118b954914806c182092123d4008ba628a8eaf403faa7e3c1adb470ee9d6044313451442d2acd532b47d42e00a2fdecfa996334065a94e0d46d32b7534b3fb4016198047568afd83c99823f6ed"
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
            if (this.props.addressID === 0) {
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
            // access_key = "51f40be210ff34cba0079b19efd3ab42"  //live credit card
            // profile_id = "0CE666B6-7064-4D68-9DFE-EC46776C02A4"  //live credit card
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
        // Emporia Account
        // const signature = "access_key=fb2033f6e3fe3bb29fa96ebc01c911ae,profile_id=FCC3E6E0-639C-4A4E-B58B-9C759897778F,transaction_uuid=" + (time + '123') + ",signed_field_names=access_key,profile_id,transaction_uuid,signed_field_names,signed_date_time,locale,transaction_type,reference_number,amount,currency,bill_to_surname,bill_to_forename,bill_to_email,bill_to_address_line1,bill_to_address_city,bill_to_address_postal_code,bill_to_address_state,bill_to_address_country,signed_date_time=" + now + ",locale=en,transaction_type=sale,reference_number=" + time + ",amount=" + totalPrice + ",currency=MYR,bill_to_surname=" + lastname + ",bill_to_forename=" + firstname + ",bill_to_email=" + email + ",bill_to_address_line1=" + addressLine1 + ",bill_to_address_city=" + city + ",bill_to_address_postal_code=" + poscode + ",bill_to_address_state=" + state + ",bill_to_address_country=MY"
        // const APIKey = "f783628784ec4418af60cd35a0825d7348e554e1b51d4904a3f724e7cc089a64017e565d08d34592ae97a223a0ffa5ed430d202f43454968897b9cddcb604ee2316f500b3cd24cba9cb44b54a1ca43d3bdf35062728945b28b5144f4a6f22bffc43072e5a41c456c9d0ba003c81ad4097c65c2fa2aa147fb9d72bdb336df288e";


        const checkFPXdata = (data) => {
            let dataValue = data
            let returnData = "-"

            if (this.state.paymentMethodsID !== 1)
                return returnData
            else {
                if (dataValue === "")
                    return returnData
                else
                    return dataValue
            }
        }

        const onSubmit = (Ind, transactionUUID) => {

            let ProductID = ""
            let UserCartID = []
            let ProductQuantity = []
            let ProductVariationDetailID = []

            this.props.data.map((x, index) => {
                ProductID = index === 0 ? x.product.ProductID : ProductID + "," + x.product.ProductID
                UserCartID.push(x.product.UserCartID)
                ProductQuantity = index === 0 ? x.product.ProductQuantity : ProductQuantity + "," + x.product.ProductQuantity
                ProductVariationDetailID = index === 0 ? x.product.ProductVariationDetailID : ProductVariationDetailID + "," + x.product.ProductVariationDetailID
            })
            this.props.CallAddOrder({
                UserID: window.localStorage.getItem("id"),
                ProductID: ProductID,
                ProductQuantity: ProductQuantity,
                UserCartID: UserCartID,
                UserAddressID: this.props.addressID,
                PaymentMethodID: this.state.paymentMethodsID === 1 ? 2 : 1,
                UserPaymentMethodID: this.state.paymentMethodsID === 1 ? 2 : 1,
                OrderTotalAmount: totalPrice,
                OrderPaidAmount: 0,
                ProductVariationDetailID: ProductVariationDetailID,
                TrackingStatusID: 2,
                PickUpInd: Ind,
                TRANSACTIONUUID: checkFPXdata(this.state.fpx_sellerOrderNo),

                // fpx_msgType: checkFPXdata(this.state.fpx_msgType),
                fpx_msgToken: checkFPXdata(this.state.fpx_msgToken),
                // fpx_sellerExId: checkFPXdata(this.state.fpx_sellerExId),
                fpx_sellerExOrderNo: checkFPXdata(this.state.fpx_sellerExOrderNo),
                fpx_sellerTxnTime: checkFPXdata(this.state.fpx_sellerTxnTime),
                fpx_sellerOrderNo: checkFPXdata(this.state.fpx_sellerOrderNo),
                // fpx_sellerId: checkFPXdata(this.state.fpx_sellerId),
                fpx_sellerBankCode: checkFPXdata(this.state.fpx_sellerBankCode),
                // fpx_txnCurrency: checkFPXdata(this.state.fpx_txnCurrency),
                fpx_txnAmount: checkFPXdata(this.state.fpx_txnAmount),
                fpx_buyerEmail: checkFPXdata(this.state.fpx_buyerEmail),
                // fpx_checkSum: checkFPXdata(this.state.fpx_checkSum),
                fpx_buyerName: checkFPXdata(this.state.fpx_buyerName),

                fpx_buyerBankId: checkFPXdata(this.state.fpx_buyerBankId),
                fpx_buyerBankBranch: checkFPXdata(this.state.fpx_buyerBankBranch),
                fpx_buyerAccNo: checkFPXdata(this.state.fpx_buyerAccNo),
                fpx_buyerId: checkFPXdata(this.state.fpx_buyerId),
                fpx_makerName: checkFPXdata(this.state.fpx_makerName),
                fpx_buyerIban: checkFPXdata(this.state.fpx_buyerIban),
                fpx_version: checkFPXdata(this.state.fpx_version),
                fpx_productDesc: checkFPXdata(this.state.fpx_productDesc)
            })
        }

        const onSubmitCreditCard = (Ind, transactionUUID) => {
            let ProductID = ""
            let UserCartID = []
            let ProductQuantity = []
            let ProductVariationDetailID = []

            this.props.data.map((x, index) => {
                ProductID = index === 0 ? x.product.ProductID : ProductID + "," + x.product.ProductID
                UserCartID.push(x.product.UserCartID)
                ProductQuantity = index === 0 ? x.product.ProductQuantity : ProductQuantity + "," + x.product.ProductQuantity
                ProductVariationDetailID = index === 0 ? x.product.ProductVariationDetailID : ProductVariationDetailID + "," + x.product.ProductVariationDetailID
            })

            this.props.CallAddOrderCreditCard({
                UserID: window.localStorage.getItem("id"),
                ProductID: ProductID,
                ProductQuantity: ProductQuantity,
                UserCartID: UserCartID,
                UserAddressID: this.props.addressID,
                PaymentMethodID: this.state.paymentMethodsID === 1 ? 2 : 1,
                UserPaymentMethodID: this.state.paymentMethodsID === 1 ? 2 : 1,
                OrderTotalAmount: totalPrice,
                OrderPaidAmount: 0,
                ProductVariationDetailID: ProductVariationDetailID,
                TrackingStatusID: 2,
                PickUpInd: Ind,

                TRANSACTIONUUID: transaction_uuid,

                signed_field_names: signed_field_names,
                signed_date_time: signed_date_time,
                locale: locale,
                reference_number: reference_number,
                currency: currency,
                bill_to_surname: bill_to_surname,
                bill_to_forename: bill_to_forename,
                bill_to_email: bill_to_email,
                bill_to_address_line1: bill_to_address_line1,
                bill_to_address_city: bill_to_address_city,
                bill_to_address_country: bill_to_address_country
            })

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
                    {
                        this.state.paymentMethodsID === 1 && this.state.BankID !== "0" ?
                            <React.Fragment>
                                <label style={{ fontSize: "14px" }}>By Clicking on the "Proceed" button , you hereby agree with <a href={"https://www.mepsfpx.com.my/FPXMain/termsAndConditions.jsp"} style={{ color: "blue" }} >FPX's Terms & Conditions</a> </label>
                                <div>



                                    {
                                        <form id="payment_form2" action="https://www.mepsfpx.com.my/FPXMain/seller2DReceiver.jsp" method="post">
                                            {/* // <form id="payment_form2" action="https://uat.mepsfpx.com.my/FPXMain/seller2DReceiver.jsp" method="post"> */}

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
                                    }
                                </div>
                            </React.Fragment>
                            :
                            <React.Fragment>
                                <div>
                                    {/* */}
                                    <form id="payment_form" action="https://secureacceptance.cybersource.com/pay" method="post">
                                        {/* <form id="payment_form" action="https://testsecureacceptance.cybersource.com/pay" method="post"> */}
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
                                        <input type="hidden" id="bill_to_address_country" name="bill_to_address_country" value={bill_to_address_country}></input>
                                        <input type="hidden" id="signature" name="signature" value={signed}></input>
                                        <input type="submit" style={{
                                            backgroundColor: this.state.paymentMethodsID === 2 ? "#04AA6D" : "#808080",
                                            border: "none",
                                            color: "white",
                                            fontSize: "14px",
                                            textDecoration: "none",
                                        }} id="submit" name="submit" value="Proceed" onClick={() =>
                                            onSubmitCreditCard(PickUpIndicator, time + '123')
                                        } disabled={this.state.paymentMethodsID === 2 ? false : true} />
                                    </form>
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
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8}>
                        <Button
                            size="small"
                            color="inherit"
                            onClick={this.props.onBackStep}
                            startIcon={<ArrowBackIosNewIcon />}
                        >
                            Back
                        </Button>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <LoadingButton
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                        >
                            Complete Order
                        </LoadingButton>
                    </Grid>
                </Grid>
                <Dialog
                    open={this.state.isLimitAlert}
                    onClose={() => this.setState({ isLimitAlert: false })}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent>
                        <div style={{ textAlign: "center", margin: 2 }}>
                            <label style={{ color: "red", fontWeight: "bold", fontSize: "28px" }}>Transaction Limit</label>
                        </div>
                        <div style={{ textAlign: "center" }}>
                            <label style={{ color: "midnightblue", fontWeight: "bold", fontSize: "18px" }}>{this.state.limitMsg}</label>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.setState({ isLimitAlert: false })} autoFocus>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment >
        );
    }
}



const mapStateToProps = (state) => ({
    creditcard: state.counterReducer["creditcards"],
    paymentmethod: state.counterReducer["paymentmethod"],
    addresses: state.counterReducer["addresses"],
    creditCardOrder: state.counterReducer["creditCardOrder"],
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
        CallAddOrderCreditCard: (prodData) =>
            dispatch(GitAction.CallAddOrderCreditCard(prodData)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PagePayment);