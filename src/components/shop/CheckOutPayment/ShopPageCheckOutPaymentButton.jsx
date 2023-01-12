import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GitAction } from '../../../store/action/gitAction';

CheckoutCartCheckOutButton.propTypes = {
    PaymentType: PropTypes.string,
    textInside: PropTypes.string,
    isVoucherApply: PropTypes.bool,
    totalApplyPromo: PropTypes.number,
    total: PropTypes.number,
    Userdetails: PropTypes.object,
    BankID: PropTypes.number,
};

export default function CheckoutCartCheckOutButton({
    PaymentType,
    textInside,
    isVoucherApply,
    totalApplyPromo,
    total,
    Userdetails,
    BankID
}) {
    const crypto = require('crypto');

    const dispatch = useDispatch()
    const [isSetDetail, setDetails] = useState(false)
    const fpx_information = {
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
        fpx_version: "6.0"
    }


    // credit and debit card
    let now = new Date().toISOString().split('.').shift() + 'Z';
    const d = new Date();
    const time = d.getTime();
    var n = Math.floor(Math.random() * 11);
    var k = Math.floor(Math.random() * 1000000);
    var m = String.fromCharCode(n) + k;

    {/* this.setState({ applyPromo: applyPromo, promoError: promoError, isVoucherApply: verify, totalApplyPromo: totalAfterPromo, totalDeduction: deduction, isShippingPromo: isShippingPromo }) */ }

    let totalPrice = isVoucherApply ? parseFloat(totalApplyPromo).toFixed(2) : parseFloat(total).toFixed(2)
    let lastname = Userdetails.UserAddressBookID === 0 ? localStorage.getItem("lastname") != null && localStorage.getItem("lastname") !== undefined && localStorage.getItem("lastname") != "-" ? localStorage.getItem("lastname") : "Emporia" : Userdetails.addressName
    let firstname = Userdetails.UserAddressBookID === 0 ? localStorage.getItem("firstname") != null && localStorage.getItem("firstname") !== undefined && localStorage.getItem("firstname") != "-" ? localStorage.getItem("firstname") : "Emporia" : Userdetails.addressName
    let email = Userdetails.UserAddressBookID === 0 ? localStorage.getItem("email") != null && localStorage.getItem("email") !== undefined && localStorage.getItem("email") != "-" ? localStorage.getItem("email") : "Emporia.gmail.com" : Userdetails.email
    let addressLine1 = Userdetails.UserAddressBookID === 0 ? "SELFCOLECT" : Userdetails.addressLine1
    let city = Userdetails.UserAddressBookID === 0 ? "SELFCOLECT" : Userdetails.city
    let state = Userdetails.UserAddressBookID === 0 ? "SELFCOLECT" : Userdetails.state
    let poscode = Userdetails.UserAddressBookID === 0 ? "94300" : Userdetails.poscode
    let PickUpIndicator = Userdetails.UserAddressBookID === 0 ? 1 : 0

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

    if (isSetDetail === false && Userdetails.length !== 0) {
        if (Userdetails.UserAddressBookID === 0) {
            if (parseInt(totalPrice) > 30000)
                this.setState({ isLimitAlert: true, limitMsg: "Maximum Transaction Limit Exceeded" })
            else if (parseInt(totalPrice) < 1)
                this.setState({ isLimitAlert: true, limitMsg: "Transaction Amount Below Transaction Limit" })
            setDetails(true)
            // this.setState({
            //     isSetDetail: true,
            //     fpx_buyerName: localStorage.getItem("lastname") != null && localStorage.getItem("lastname") !== undefined && localStorage.getItem("lastname") != "-" ? localStorage.getItem("lastname") + " " + localStorage.getItem("firstname") : "Emporia",
            //     fpx_buyerEmail: "weiyee731@gmail.com",
            //     fpx_txnAmount: totalPrice
            // })
        } else {

            if (parseInt(totalPrice) > 30000)
                this.setState({ isLimitAlert: true, isLimitCheck: true, limitMsg: "Maximum Transaction Limit Exceeded" })
            else if (parseInt(totalPrice) < 1)
                this.setState({ isLimitAlert: true, isLimitCheck: true, limitMsg: "Transaction Amount Below Transaction Limit" })
            setDetails(true)
            // this.setState({
            //     isSetDetail: true,
            //     fpx_buyerName: lastname,
            //     fpx_buyerEmail: email,
            //     fpx_txnAmount: totalPrice
            // })

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

        // var signed = crypto.createHmac('sha256', APIKey)
        //     .update(signature)
        //     .digest('base64');
    }
    // Emporia Account
    // const signature = "access_key=fb2033f6e3fe3bb29fa96ebc01c911ae,profile_id=FCC3E6E0-639C-4A4E-B58B-9C759897778F,transaction_uuid=" + (time + '123') + ",signed_field_names=access_key,profile_id,transaction_uuid,signed_field_names,signed_date_time,locale,transaction_type,reference_number,amount,currency,bill_to_surname,bill_to_forename,bill_to_email,bill_to_address_line1,bill_to_address_city,bill_to_address_postal_code,bill_to_address_state,bill_to_address_country,signed_date_time=" + now + ",locale=en,transaction_type=sale,reference_number=" + time + ",amount=" + totalPrice + ",currency=MYR,bill_to_surname=" + lastname + ",bill_to_forename=" + firstname + ",bill_to_email=" + email + ",bill_to_address_line1=" + addressLine1 + ",bill_to_address_city=" + city + ",bill_to_address_postal_code=" + poscode + ",bill_to_address_state=" + state + ",bill_to_address_country=MY"
    // const APIKey = "f783628784ec4418af60cd35a0825d7348e554e1b51d4904a3f724e7cc089a64017e565d08d34592ae97a223a0ffa5ed430d202f43454968897b9cddcb604ee2316f500b3cd24cba9cb44b54a1ca43d3bdf35062728945b28b5144f4a6f22bffc43072e5a41c456c9d0ba003c81ad4097c65c2fa2aa147fb9d72bdb336df288e";


    const checkFPXdata = (data) => {
        let dataValue = data
        let returnData = "-"

        if (PaymentType !== "1")
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

        dispatch(GitAction.CallAddOrder({
            UserID: window.localStorage.getItem("id"),
            ProductID: ProductID,
            ProductQuantity: ProductQuantity,
            UserCartID: UserCartID,
            UserAddressID: Userdetails.UserAddressBookID,
            PaymentMethodID: PaymentType === "1" ? "2" : "1",
            UserPaymentMethodID: PaymentType === "1" ? "2" : "1",
            OrderTotalAmount: totalPrice,
            OrderPaidAmount: 0,
            ProductVariationDetailID: ProductVariationDetailID,
            TrackingStatusID: 2,
            PickUpInd: Ind,
            TRANSACTIONUUID: checkFPXdata(fpx_information.fpx_sellerOrderNo),

            // fpx_msgType: checkFPXdata(fpx_information.fpx_msgType),
            fpx_msgToken: checkFPXdata(fpx_information.fpx_msgToken),
            // fpx_sellerExId: checkFPXdata(fpx_information.fpx_sellerExId),
            fpx_sellerExOrderNo: checkFPXdata(fpx_information.fpx_sellerExOrderNo),
            fpx_sellerTxnTime: checkFPXdata(fpx_information.fpx_sellerTxnTime),
            fpx_sellerOrderNo: checkFPXdata(fpx_information.fpx_sellerOrderNo),
            // fpx_sellerId: checkFPXdata(fpx_information.fpx_sellerId),
            fpx_sellerBankCode: checkFPXdata(fpx_information.fpx_sellerBankCode),
            // fpx_txnCurrency: checkFPXdata(fpx_information.fpx_txnCurrency),
            fpx_txnAmount: checkFPXdata(fpx_information.fpx_txnAmount),
            fpx_buyerEmail: checkFPXdata(fpx_information.fpx_buyerEmail),
            // fpx_checkSum: checkFPXdata(fpx_information.fpx_checkSum),
            fpx_buyerName: checkFPXdata(fpx_information.fpx_buyerName),

            fpx_buyerBankId: checkFPXdata(fpx_information.fpx_buyerBankId),
            fpx_buyerBankBranch: checkFPXdata(fpx_information.fpx_buyerBankBranch),
            fpx_buyerAccNo: checkFPXdata(fpx_information.fpx_buyerAccNo),
            fpx_buyerId: checkFPXdata(fpx_information.fpx_buyerId),
            fpx_makerName: checkFPXdata(fpx_information.fpx_makerName),
            fpx_buyerIban: checkFPXdata(fpx_information.fpx_buyerIban),
            fpx_version: checkFPXdata(fpx_information.fpx_version),
            fpx_productDesc: checkFPXdata(fpx_information.fpx_productDesc)
        }));

        // this.props.CallAddOrder()
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
        dispatch(GitAction.CallAddOrder({
            UserID: window.localStorage.getItem("id"),
            ProductID: ProductID,
            ProductQuantity: ProductQuantity,
            UserCartID: UserCartID,
            UserAddressID: Userdetails.UserAddressBookID,
            PaymentMethodID: PaymentType === "1" ? "2" : "1",
            UserPaymentMethodID: PaymentType === "1" ? "2": "1",
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
        }))
    // this.props.CallAddOrderCreditCard()

}

return (
    <div className="checkout">
        <div className="" style={{ textAlign: "left" }}>
            {/* container */}
            {
                PaymentType === "1" && BankID !== "0" ?
                    <React.Fragment>
                        <label style={{ fontSize: "12px" }}>By Clicking on the "Proceed" button , you hereby agree with <a href={"https://www.mepsfpx.com.my/FPXMain/termsAndConditions.jsp"} style={{ color: "blue" }} >FPX's Terms & Conditions</a> </label>
                        <div>



                            {
                                <form id="payment_form2" action="https://www.mepsfpx.com.my/FPXMain/seller2DReceiver.jsp" method="post">
                                    {/* // <form id="payment_form2" action="https://uat.mepsfpx.com.my/FPXMain/seller2DReceiver.jsp" method="post"> */}

                                    <input type="hidden" value={fpx_information.fpx_msgType} id="fpx_msgType" name="fpx_msgType"></input>
                                    <input type="hidden" value={fpx_information.fpx_msgToken} id="fpx_msgToken" name="fpx_msgToken"></input>
                                    <input type="hidden" value={fpx_information.fpx_sellerExId} id="fpx_sellerExId" name="fpx_sellerExId"></input>
                                    <input type="hidden" value={fpx_information.fpx_sellerExOrderNo} id="fpx_sellerExOrderNo" name="fpx_sellerExOrderNo"></input>
                                    <input type="hidden" value={fpx_information.fpx_sellerTxnTime} id="fpx_sellerTxnTime" name="fpx_sellerTxnTime"></input>
                                    <input type="hidden" value={fpx_information.fpx_sellerOrderNo} id="fpx_sellerOrderNo" name="fpx_sellerOrderNo"></input>
                                    <input type="hidden" value={fpx_information.fpx_sellerId} id="fpx_sellerId" name="fpx_sellerId"></input>
                                    <input type="hidden" value={fpx_information.fpx_sellerBankCode} id="fpx_sellerBankCode" name="fpx_sellerBankCode"></input>
                                    <input type="hidden" value={fpx_information.fpx_txnCurrency} id="fpx_txnCurrency" name="fpx_txnCurrency"></input>
                                    <input type="hidden" value={parseFloat(fpx_information.fpx_txnAmount).toFixed(2)} id="fpx_txnAmount" name="fpx_txnAmount"></input>
                                    <input type="hidden" value={fpx_information.fpx_buyerEmail} id="fpx_buyerEmail" name="fpx_buyerEmail"></input>
                                    <input type="hidden" value={fpx_information.fpx_checkSum} id="fpx_checkSum" name="fpx_checkSum"></input>
                                    <input type="hidden" value={fpx_information.fpx_buyerName} id="fpx_buyerName" name="fpx_buyerName"></input>
                                    <input type="hidden" value={fpx_information.fpx_buyerBankId} id="fpx_buyerBankId" name="fpx_buyerBankId"></input>
                                    <input type="hidden" value={fpx_information.fpx_buyerBankBranch} id="fpx_buyerBankBranch" name="fpx_buyerBankBranch"></input>
                                    <input type="hidden" value={fpx_information.fpx_buyerAccNo} id="fpx_buyerAccNo" name="fpx_buyerAccNo"></input>
                                    <input type="hidden" value={fpx_information.fpx_buyerId} id="fpx_buyerId" name="fpx_buyerId"></input>
                                    <input type="hidden" value={fpx_information.fpx_makerName} id="fpx_makerName" name="fpx_makerName"></input>
                                    <input type="hidden" value={fpx_information.fpx_buyerIban} id="fpx_buyerIban" name="fpx_buyerIban"></input>
                                    <input type="hidden" value={fpx_information.fpx_version} id="fpx_version" name="fpx_version"></input>
                                    <input type="hidden" value={fpx_information.fpx_productDesc} id="fpx_productDesc" name="fpx_productDesc"></input>
                                    <input type="submit"
                                        style={{
                                            backgroundColor: "#04AA6D",
                                            border: "none",
                                            color: "white",
                                            fontSize: "14px",
                                            textDecoration: "none",
                                            width: "100%"
                                        }} id="submit" name="submit" value={textInside} onClick={() => onSubmit(PickUpIndicator, fpx_information.fpx_sellerOrderNo)} />
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
                                {/* <input type="hidden" id="signature" name="signature" value={signed}></input> */}
                                <input type="submit" style={{
                                    backgroundColor: PaymentType === "2" ? "#04AA6D" : "#808080",
                                    border: "none",
                                    color: "white",
                                    fontSize: "14px",
                                    textDecoration: "none",
                                    width: "100%"
                                }} id="submit" name="submit" value={textInside} onClick={() =>
                                    onSubmitCreditCard(PickUpIndicator, time + '123')
                                } disabled={PaymentType === "2" ? false : true} />
                            </form>
                        </div>
                    </React.Fragment>
            }
        </div >
    </div >
);
}
