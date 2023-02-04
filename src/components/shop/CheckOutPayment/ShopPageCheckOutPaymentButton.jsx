import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GitAction } from '../../../store/action/gitAction';

CheckoutCartCheckOutButton.propTypes = {
    PaymentType: PropTypes.string,
    textInside: PropTypes.string,
    isVoucherApply: PropTypes.bool,
    totalApplyPromo: PropTypes.number,
    total: PropTypes.number,
    Userdetails: PropTypes.object,
    BankID: PropTypes.string,
    fpx_information: PropTypes.object,
    paymentData: PropTypes.object,
};

export default function CheckoutCartCheckOutButton({
    PaymentType,
    textInside,
    isVoucherApply,
    totalApplyPromo,
    total,
    Userdetails,
    BankID,
    fpx_information,
    paymentData
}) {
    const crypto = require('crypto');

    const dispatch = useDispatch()

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
        console.log("onSubmit")
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
            OrderTotalAmount: paymentData.totalPrice,
            OrderPaidAmount: 0,
            ProductVariationDetailID: ProductVariationDetailID,
            TrackingStatusID: 2,
            PickUpInd: Ind,
            TRANSACTIONUUID: checkFPXdata(fpx_information.fpx_sellerOrderNo),
            fpx_msgToken: checkFPXdata(fpx_information.fpx_msgToken),
            fpx_sellerExOrderNo: checkFPXdata(fpx_information.fpx_sellerExOrderNo),
            fpx_sellerTxnTime: checkFPXdata(fpx_information.fpx_sellerTxnTime),
            fpx_sellerOrderNo: checkFPXdata(fpx_information.fpx_sellerOrderNo),
            fpx_sellerBankCode: checkFPXdata(fpx_information.fpx_sellerBankCode),
            fpx_txnAmount: checkFPXdata(fpx_information.fpx_txnAmount),
            fpx_buyerEmail: checkFPXdata(fpx_information.fpx_buyerEmail),
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
    }

    const onSubmitCreditCard = (Ind, transactionUUID) => {
        console.log("onSubmitCreditCard", paymentData)
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
            OrderTotalAmount: paymentData.totalPrice,
            OrderPaidAmount: 0,
            ProductVariationDetailID: ProductVariationDetailID,
            TrackingStatusID: 2,
            PickUpInd: Ind,

            TRANSACTIONUUID: paymentData.transaction_uuid,

            signed_field_names: paymentData.signed_field_names,
            signed_date_time: paymentData.signed_date_time,
            locale: paymentData.locale,
            reference_number: paymentData.reference_number,
            currency: paymentData.currency,
            bill_to_surname: paymentData.bill_to_surname,
            bill_to_forename: paymentData.bill_to_forename,
            bill_to_email: paymentData.bill_to_email,
            bill_to_address_line1: paymentData.bill_to_address_line1,
            bill_to_address_city: paymentData.bill_to_address_city,
            bill_to_address_country: paymentData.bill_to_address_country
        }))
        // this.props.CallAddOrderCreditCard()

    }

    return (
        <div className="checkout">
            <div className="" style={{ textAlign: "left" }}>
                {
                    PaymentType === "1" && BankID !== "0" ?
                        <React.Fragment>
                            <label style={{ fontSize: "12px" }}>By Clicking on the "Proceed" button , you hereby agree with <a href={"https://www.mepsfpx.com.my/FPXMain/termsAndConditions.jsp"} style={{ color: "blue" }} >FPX's Terms & Conditions</a> </label>
                            <div>
                                {console.log("aded", fpx_information)}
                                {
                                    //live
                                    <form id="payment_form2" action="https://www.mepsfpx.com.my/FPXMain/seller2DReceiver.jsp" method="post">
                                        {/* <form id="payment_form2" action="https://uat.mepsfpx.com.my/FPXMain/seller2DReceiver.jsp" method="post"> */}
                                        <input type="visible" value={fpx_information.fpx_msgType} id="fpx_msgType" name="fpx_msgType"></input>
                                        <input type="visible" value={fpx_information.fpx_msgToken} id="fpx_msgToken" name="fpx_msgToken"></input>
                                        <input type="visible" value={fpx_information.fpx_sellerExId} id="fpx_sellerExId" name="fpx_sellerExId"></input>
                                        <input type="visible" value={fpx_information.fpx_sellerExOrderNo} id="fpx_sellerExOrderNo" name="fpx_sellerExOrderNo"></input>
                                        <input type="visible" value={fpx_information.fpx_sellerTxnTime} id="fpx_sellerTxnTime" name="fpx_sellerTxnTime"></input>
                                        <input type="visible" value={fpx_information.fpx_sellerOrderNo} id="fpx_sellerOrderNo" name="fpx_sellerOrderNo"></input>
                                        <input type="visible" value={fpx_information.fpx_sellerId} id="fpx_sellerId" name="fpx_sellerId"></input>
                                        <input type="visible" value={fpx_information.fpx_sellerBankCode} id="fpx_sellerBankCode" name="fpx_sellerBankCode"></input>
                                        <input type="visible" value={fpx_information.fpx_txnCurrency} id="fpx_txnCurrency" name="fpx_txnCurrency"></input>
                                        <input type="visible" value={parseFloat(fpx_information.fpx_txnAmount).toFixed(2)} id="fpx_txnAmount" name="fpx_txnAmount"></input>
                                        <input type="visible" value={fpx_information.fpx_buyerEmail} id="fpx_buyerEmail" name="fpx_buyerEmail"></input>
                                        <input type="visible" value={fpx_information.fpx_checkSum} id="fpx_checkSum" name="fpx_checkSum"></input>
                                        <input type="visible" value={fpx_information.fpx_buyerName} id="fpx_buyerName" name="fpx_buyerName"></input>
                                        <input type="visible" value={fpx_information.fpx_buyerBankId} id="fpx_buyerBankId" name="fpx_buyerBankId"></input>
                                        <input type="visible" value={fpx_information.fpx_buyerBankBranch} id="fpx_buyerBankBranch" name="fpx_buyerBankBranch"></input>
                                        <input type="visible" value={fpx_information.fpx_buyerAccNo} id="fpx_buyerAccNo" name="fpx_buyerAccNo"></input>
                                        <input type="visible" value={fpx_information.fpx_buyerId} id="fpx_buyerId" name="fpx_buyerId"></input>
                                        <input type="visible" value={fpx_information.fpx_makerName} id="fpx_makerName" name="fpx_makerName"></input>
                                        <input type="visible" value={fpx_information.fpx_buyerIban} id="fpx_buyerIban" name="fpx_buyerIban"></input>
                                        <input type="visible" value={fpx_information.fpx_version} id="fpx_version" name="fpx_version"></input>
                                        <input type="visible" value={fpx_information.fpx_productDesc} id="fpx_productDesc" name="fpx_productDesc"></input>
                                        <input type="submit"
                                            style={{
                                                backgroundColor: "#04AA6D",
                                                border: "none",
                                                color: "white",
                                                fontSize: "14px",
                                                textDecoration: "none",
                                                width: "100%"
                                            }} id="submit" name="submit" value={textInside + "rrr"} onClick={() => onSubmit(paymentData.PickUpIndicator, fpx_information.fpx_sellerOrderNo)} />
                                    </form>
                                }
                            </div>
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <div>
                                {/*live*/}
                                <form id="payment_form" action="https://secureacceptance.cybersource.com/pay" method="post">
                                    {console.log("paymentData11", paymentData)}
                                    {/* <form id="payment_form" action="https://testsecureacceptance.cybersource.com/pay" method="post">  */}
                                    <input type="visible" id="access_key" name="access_key" value={paymentData.access_key}></input>
                                    <input type="visible" id="profile_id" name="profile_id" value={paymentData.profile_id}></input>
                                    <input type="visible" id="transaction_uuid" name="transaction_uuid" value={paymentData.transaction_uuid}></input>
                                    <input type="visible" id="signed_field_names" name="signed_field_names" value={paymentData.signed_field_names}></input>
                                    <input type="visible" id="signed_date_time" name="signed_date_time" value={paymentData.signed_date_time}></input>
                                    <input type="visible" id="locale" name="locale" value={paymentData.locale}></input>
                                    <input type="visible" id="transaction_type" name="transaction_type" value="sale"></input>
                                    <input type="visible" id="reference_number" name="reference_number" value={paymentData.reference_number}></input>
                                    <input type="visible" id="amount" name="amount" value={paymentData.amount}></input>
                                    <input type="visible" id="currency" name="currency" value={paymentData.currency}></input>
                                    <input type="visible" id="bill_to_surname" name="bill_to_surname" value={paymentData.bill_to_surname}></input>
                                    <input type="visible" id="bill_to_forename" name="bill_to_forename" value={paymentData.bill_to_forename}></input>
                                    <input type="visible" id="bill_to_email" name="bill_to_email" value={paymentData.bill_to_email}></input>
                                    <input type="visible" id="bill_to_address_line1" name="bill_to_address_line1" value={paymentData.bill_to_address_line1}></input>
                                    <input type="visible" id="bill_to_address_city" name="bill_to_address_city" value={paymentData.bill_to_address_city}></input>
                                    <input type="visible" id="bill_to_address_country" name="bill_to_address_country" value={paymentData.bill_to_address_country}></input>
                                    <input type="visible" id="signature" name="signature" value={paymentData.signed}></input>
                                    <input type="submit" style={{
                                        backgroundColor: PaymentType === "2" ? "#04AA6D" : "#808080",
                                        border: "none",
                                        color: "white",
                                        fontSize: "14px",
                                        textDecoration: "none",
                                        width: "100%"
                                    }} id="submit" name="submit" value={textInside + "cv"} onClick={() =>
                                        onSubmitCreditCard(paymentData.PickUpIndicator, paymentData.time + '123')
                                    } disabled={PaymentType === "2" ? false : true} />
                                </form>
                            </div>
                        </React.Fragment>
                }
            </div >
        </div >
    );
}
