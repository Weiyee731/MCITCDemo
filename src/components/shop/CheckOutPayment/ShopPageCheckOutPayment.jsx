import PropTypes from 'prop-types';
// @mui
import { Grid, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import CheckoutSummary from '../ShopPageCheckoutCartSummary';
import CheckoutDelivery from './ShopPageCheckOutDelivery';
import CheckoutBillingInfo from './ShopPageCheckOutBillingInfo';
import CheckoutPaymentMethods from './ShopPageCheckOutPaymentMethods';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CheckoutCartCheckOutButton from './ShopPageCheckOutPaymentButton';
import sum from 'lodash/sum';
// import DeliveryFee from "../ShopPageDeliveryFee";

// import DeliveryFee from "../deliveryFee"
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GitAction } from '../../../store/action/gitAction';
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";

import { HmacSHA256 } from 'crypto-js';
// ----------------------------------------------------------------------
// const crypto = require('crypto');
var CryptoJS = require("crypto-js");



const DELIVERY_OPTIONS = [
    {
        value: 0,
        title: 'Standard delivery',
        description: '',
    },
];

CheckoutPayment.propTypes = {
    onReset: PropTypes.func,
    checkout: PropTypes.object,
    onBackStep: PropTypes.func,
    onGotoStep: PropTypes.func,
    onNextStep: PropTypes.func,
    deliveryFee: PropTypes.array,
    onApplyShipping: PropTypes.func,

    onHandleDiscount: PropTypes.func,
    handleRemovePromoError: PropTypes.func,
    onHandlePromoCode: PropTypes.func,
    handleApplyDiscount: PropTypes.func,
};

export default function CheckoutPayment({
    checkout,
    onReset,
    onNextStep,
    onBackStep,
    onGotoStep,
    deliveryFee,
    onApplyShipping,
    onApplyDiscount,
    onRemovePromoError,
    onHandleDiscount,
    onHandlePromoCode,
    validPromoData,
    discount,
    total,
    subtotal,
    promoCode,
    isPendingPayment,


}) {
    const { data, address, merchant } = checkout;
    // const total = sum(data.map((item) => item.total));
    // const subtotal = sum(data.map((item) => item.total));
    // const discount = sum(data.map((item) => item.discount));
    const [BankID, setBankID] = useState("0");
    const [PaymentType, setPaymentType] = useState("1");
    const [isSetDetail, setDetails] = useState(false)

    const [fpx_information, setfpx_information] = useState({
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

        fpx_checkSum: 0,
        fpx_buyerBankId: 0,
        fpx_sellerExOrderNo: 0,
        fpx_sellerTxnTime: 0,
        fpx_sellerOrderNo: 0
    })
    const [limit, setlimit] = useState({
        isLimitAlert: false,
        limitMsg: "",
        isLimitCheck: false,
    })

    const [paymentData, setpaymentData] = useState({
        access_key: "",
        profile_id: "",
        transaction_uuid: "",
        signed_date_time: "",
        locale: "",
        transaction_type: "",
        reference_number: "",
        amount: "",

        currency: "",
        bill_to_surname: "",
        bill_to_forename: "",

        bill_to_email: "",
        bill_to_address_line1: "",
        bill_to_address_city: "",

        bill_to_address_postal_code: "",
        bill_to_address_state: "",
        bill_to_address_country: "",
        signature: "",
        signed_field_names: "",


        totalPrice: "",
        PickUpIndicator: "",
        time: "",

        lastname: "",
        firstname: "",
        email: "",
        addressLine1: "",
        city: "",
        state: "",
        poscode: "",
        now: "",

    })
    const isVoucherApply = false;
    const totalApplyPromo = 0

    useEffect(() => {

        // credit and debit card
        let now = new Date().toISOString().split('.').shift() + 'Z';
        const d = new Date().getTime();
        // setpaymentData({ ...paymentData,})
        var n = Math.floor(Math.random() * 11);
        var k = Math.floor(Math.random() * 1000000);
        var m = String.fromCharCode(n) + k;

        console.log("SHIPPING IN OB", deliveryFee)
        {/* this.setState({ applyPromo: applyPromo, promoError: promoError, isVoucherApply: verify, totalApplyPromo: totalAfterPromo, totalDeduction: deduction, isShippingPromo: isShippingPromo }) */ }
        let totalPrice = deliveryFee[0].ShippingCost == null ? parseFloat(total).toFixed(2) : parseFloat(total + deliveryFee[0].ShippingCost).toFixed(2)
        // let totalPrice = isVoucherApply ? parseFloat(totalApplyPromo).toFixed(2) : parseFloat(total).toFixed(2)
        let lastname = address.UserAddressBookID === 0 ? localStorage.getItem("lastname") != null && localStorage.getItem("lastname") !== undefined && localStorage.getItem("lastname") != "-" ? localStorage.getItem("lastname") : "Emporia" : address.UserAddressName
        let firstname = address.UserAddressBookID === 0 ? localStorage.getItem("firstname") != null && localStorage.getItem("firstname") !== undefined && localStorage.getItem("firstname") != "-" ? localStorage.getItem("firstname") : "Emporia" : address.UserAddressName
        let email = address.UserAddressBookID === 0 ? localStorage.getItem("email") != null && localStorage.getItem("email") !== undefined && localStorage.getItem("email") != "-" ? localStorage.getItem("email") : "Emporia.gmail.com" : address.UserEmail
        let addressLine1 = address.UserAddressBookID === 0 ? "SELFCOLECT" : address.UserAddressLine1
        let city = address.UserAddressBookID === 0 ? "SELFCOLECT" : address.UserCity
        let state = address.UserAddressBookID === 0 ? "SELFCOLECT" : address.UserState
        let poscode = address.UserAddressBookID === 0 ? "94300" : address.UserPoscode
        let PickUpIndicator = address.UserAddressBookID === 0 ? 1 : 0
        setpaymentData({
            ...paymentData,
            totalPrice: totalPrice,
            PickUpIndicator: PickUpIndicator,
            lastname: lastname,
            firstname: firstname,
            email: email,
            addressLine1: addressLine1,
            city: city,
            state: state,
            poscode: poscode,
            now: now,
            time: d,
            deliveryPrice: deliveryFee[0].ShippingCost == null ? 0 : deliveryFee[0].ShippingCost
        })

        // const APIKey = "f783628784ec4418af60cd35a0825d7348e554e1b51d4904a3f724e7cc089a64017e565d08d34592ae97a223a0ffa5ed430d202f43454968897b9cddcb604ee2316f500b3cd24cba9cb44b54a1ca43d3bdf35062728945b28b5144f4a6f22bffc43072e5a41c456c9d0ba003c81ad4097c65c2fa2aa147fb9d72bdb336df288e"
        // // live credit card
        // // const APIKey = "2c57e2f0161a450ebe5fb67ffbdd51fc196b0256ed1940158f54990b57f4ec3c1e08823fa84c4596bea898bb2b53e6d124414d118b954914806c182092123d4008ba628a8eaf403faa7e3c1adb470ee9d6044313451442d2acd532b47d42e00a2fdecfa996334065a94e0d46d32b7534b3fb4016198047568afd83c99823f6ed"

        if (isSetDetail === false && data.length !== 0) {
            if (address.UserAddressBookID === 0) {
                if (parseInt(totalPrice) > 30000) {
                    setlimit({ ...limit, isLimitAlert: true, limitMsg: "Maximum Transaction Limit Exceeded" })
                }
                else if (parseInt(totalPrice) < 1) {
                    setlimit({ ...limit, isLimitAlert: true, limitMsg: "Transaction Amount Below Transaction Limit" })
                }
                setDetails(true)
                setfpx_information({
                    ...fpx_information,
                    fpx_buyerName: localStorage.getItem("lastname") != null && localStorage.getItem("lastname") !== undefined && localStorage.getItem("lastname") != "-" ? localStorage.getItem("lastname") + " " + localStorage.getItem("firstname") : "Emporia",
                    fpx_buyerEmail: "weiyee731@gmail.com",
                    fpx_txnAmount: totalPrice
                })

            } else {
                if (parseInt(totalPrice) > 30000) {
                    setlimit({ ...limit, isLimitAlert: true, limitMsg: "Maximum Transaction Limit Exceeded" })
                }
                else if (parseInt(totalPrice) < 1) {
                    setlimit({ ...limit, isLimitAlert: true, limitMsg: "Transaction Amount Below Transaction Limit" })
                }
                setDetails(true)
                setfpx_information({
                    ...fpx_information,
                    fpx_buyerName: lastname,
                    fpx_buyerEmail: email,
                    fpx_txnAmount: totalPrice
                })
            }
        }
        else {
        }

    }, [deliveryFee])


    // const onSubmit = async () => {
    //     try {
    //         onNextStep();
    //         onReset();
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    const handlePaymentTypes = (type) => {
        // type==1 , bankin // type==2 , creditcard
        setPaymentType(type);
        if (type === "2") {
            const APIKey = "f783628784ec4418af60cd35a0825d7348e554e1b51d4904a3f724e7cc089a64017e565d08d34592ae97a223a0ffa5ed430d202f43454968897b9cddcb604ee2316f500b3cd24cba9cb44b54a1ca43d3bdf35062728945b28b5144f4a6f22bffc43072e5a41c456c9d0ba003c81ad4097c65c2fa2aa147fb9d72bdb336df288e"
            // live credit card
            // const APIKey = "2c57e2f0161a450ebe5fb67ffbdd51fc196b0256ed1940158f54990b57f4ec3c1e08823fa84c4596bea898bb2b53e6d124414d118b954914806c182092123d4008ba628a8eaf403faa7e3c1adb470ee9d6044313451442d2acd532b47d42e00a2fdecfa996334065a94e0d46d32b7534b3fb4016198047568afd83c99823f6ed"

            let access_key = "fb2033f6e3fe3bb29fa96ebc01c911ae"
            let profile_id = "FCC3E6E0-639C-4A4E-B58B-9C759897778F"
            // let access_key = "51f40be210ff34cba0079b19efd3ab42";  //live credit card,
            // let profile_id = "0CE666B6-7064-4D68-9DFE-EC46776C02A4";  //live credit card
            let transaction_uuid = paymentData.time + '123';
            let signed_date_time = paymentData.now;
            let locale = "en";
            let transaction_type = "sale";
            let reference_number = paymentData.time;
            // let amount = paymentData.totalPrice;

            let amount = deliveryFee[0].ShippingCost == null ? parseFloat(total).toFixed(2) : parseFloat(total + deliveryFee[0].ShippingCost).toFixed(2)
            let currency = "MYR";
            let bill_to_surname = paymentData.lastname;
            let bill_to_forename = paymentData.firstname;
            let bill_to_email = paymentData.email;
            let bill_to_address_line1 = paymentData.addressLine1;
            let bill_to_address_city = paymentData.city;
            let bill_to_address_postal_code = paymentData.poscode;
            let bill_to_address_state = paymentData.state;
            let bill_to_address_country = "MY";
            let signed_field_names = "access_key,profile_id,transaction_uuid,signed_field_names,signed_date_time,locale,transaction_type,reference_number,amount,currency,bill_to_surname,bill_to_forename,bill_to_email,bill_to_address_line1,bill_to_address_city,bill_to_address_postal_code,bill_to_address_state,bill_to_address_country";
            let signature = "access_key=" + access_key + ",profile_id=" + profile_id + ",transaction_uuid=" + transaction_uuid + ",signed_field_names=" + signed_field_names + ",signed_date_time=" + signed_date_time + ",locale=" + locale + ",transaction_type=sale,reference_number=" + reference_number + ",amount=" + amount + ",currency=" + currency + ",bill_to_surname=" + bill_to_surname + ",bill_to_forename=" + bill_to_forename + ",bill_to_email=" + bill_to_email + ",bill_to_address_line1=" + bill_to_address_line1 + ",bill_to_address_city=" + bill_to_address_city + ",bill_to_address_postal_code=" + bill_to_address_postal_code + ",bill_to_address_state=" + bill_to_address_state + ",bill_to_address_country=" + bill_to_address_country;

            let hash = CryptoJS.HmacSHA256(signature, APIKey);
            var base64EncodedHmac = hash.toString(CryptoJS.enc.Base64);

            setpaymentData({
                ...paymentData,
                access_key: access_key,
                profile_id: profile_id,
                transaction_uuid: transaction_uuid,
                signed_date_time: signed_date_time,
                locale: locale,
                transaction_type: transaction_type,
                reference_number: reference_number,
                amount: amount,
                currency: currency,
                bill_to_surname: bill_to_surname,
                bill_to_forename: bill_to_forename,
                bill_to_email: bill_to_email,
                bill_to_address_line1: bill_to_address_line1,
                bill_to_address_city: bill_to_address_city,
                bill_to_address_postal_code: bill_to_address_postal_code,
                bill_to_address_state: bill_to_address_state,
                bill_to_address_country: "MY",
                signed_field_names: signed_field_names,
                signature: signature,
                signed: base64EncodedHmac,
                deliveryPrice: deliveryFee[0].ShippingCost == null ? 0 : deliveryFee[0].ShippingCost
            })
        }
    }

    const handleBanking = (bankid) => {
        let date = moment(new Date()).format("YYYYMMDDHHmmss").toString()
        let fpx_sellerExOrderNo = date
        let fpx_sellerTxnTime = date
        let fpx_sellerOrderNo = date

        let bankingdata = fpx_information.fpx_buyerAccNo + "|" + fpx_information.fpx_buyerBankBranch + "|" + bankid + "|" + fpx_information.fpx_buyerEmail + "|" + fpx_information.fpx_buyerIban + "|" + fpx_information.fpx_buyerId + "|" + fpx_information.fpx_buyerName + "|" + fpx_information.fpx_makerName + "|" + fpx_information.fpx_msgToken + "|" + fpx_information.fpx_msgType + "|" + fpx_information.fpx_productDesc + "|" + fpx_information.fpx_sellerBankCode + "|" + fpx_information.fpx_sellerExId + "|" + fpx_sellerExOrderNo + "|" + fpx_information.fpx_sellerId + "|" + fpx_sellerOrderNo + "|" + fpx_sellerTxnTime + "|" + parseFloat(fpx_information.fpx_txnAmount).toFixed(2) + "|" + fpx_information.fpx_txnCurrency + "|" + fpx_information.fpx_version
        let URL = "https://myemporia.my/payment/check.php"
        const config = { headers: { 'Content-Type': 'multipart/form-data' } }
        const formData = new FormData()
        formData.append("bankingdata", bankingdata);
        axios.post(URL, formData, config).then((res) => {

            if (res.status === 200) {
                setfpx_information({
                    ...fpx_information,
                    fpx_checkSum: res.data,
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
        setBankID(bankid)
    }

    // const checkPaymentCompletion = () => {
    //     if (PaymentType === 1) {
    //         if (BankID === 0) {return false}
    //         else {return true}
    //     } else {
    //         if (BankID === 0) { return true }
    //         else { return false }
    //     }
    // }



    // const handleGetPostcode = (value) => {
    //     console.log("handleGetPostcode", value)
    //     if (!isNaN(value))
    //         this.setState({ shipping: value, isShipping: true })
    // }


    // const fee = DeliveryFee({ handleGetPostcode: handleGetPostcode, address: address, data: data })
    // console.log("fee", fee)


    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
                <CheckoutDelivery onApplyShipping={onApplyShipping} deliveryOptions={DELIVERY_OPTIONS} />

                <CheckoutPaymentMethods sx={{ my: 3 }}
                    onSelectPaymentTypes={handlePaymentTypes}
                    onSelectBank={handleBanking}
                />
                {
                    isPendingPayment !== true &&
                    <Button
                        size="small"
                        color="inherit"
                        onClick={onBackStep}
                        startIcon={<ArrowBackIosNewIcon />}
                    >
                        Back
                    </Button>
                }
            </Grid>

            <Grid item xs={12} md={4}>
                <CheckoutBillingInfo onBackStep={onBackStep} shipping={deliveryFee} billing={address}
                    isPendingPayment={isPendingPayment} />
                <CheckoutSummary
                    enableEdit
                    isPendingPayment={isPendingPayment}
                    total={total + paymentData.deliveryPrice}
                    subtotal={subtotal}
                    discount={discount}
                    promoCode={promoCode}
                    validPromoData={validPromoData}
                    onRemovePromoError={onRemovePromoError}
                    onHandleDiscount={onHandleDiscount}
                    onApplyDiscount={onApplyDiscount}
                    onHandlePromoCode={onHandlePromoCode}
                    shipping={deliveryFee}
                    onEdit={() => onGotoStep(0)}
                />

                {/* <LoadingButton
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                // loading={isSubmitting}
                >
                    Complete Order
                </LoadingButton> */}
                <CheckoutCartCheckOutButton
                    PaymentType={PaymentType}
                    isPendingPayment={isPendingPayment}
                    textInside={"Complete Order"}
                    isVoucherApply={isVoucherApply}
                    totalApplyPromo={totalApplyPromo}
                    total={total + paymentData.deliveryPrice}
                    shipping={deliveryFee}
                    Userdetails={address}
                    BankID={BankID}
                    fpx_information={fpx_information}
                    paymentData={paymentData}
                    validPromoData={validPromoData}
                    promoCode={promoCode}
                    checkout={checkout}
                />
            </Grid>
        </Grid>
        // </FormProvider>
    );
}
