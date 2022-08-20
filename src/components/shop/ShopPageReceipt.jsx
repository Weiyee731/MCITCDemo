// react
import React, { Component } from 'react';

// third-party
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { browserHistory } from "react-router";
import { GitAction } from "../../store/action/gitAction";

// application
import PageHeader from '../shared/PageHeader';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import axios from "axios";
import { toast } from "react-toastify";

class ShopPageReceipt extends Component {
    constructor(props) {
        super(props);

        this.state = {

            isProduceChecksum: false,
            fpx_checkSum: "",

            fpx_msgType: "AE",
            fpx_sellerExId: "EX00013776",
            fpx_sellerId: "SE00015397",
            fpx_txnCurrency: "MYR",

            responseCode: "",
            isStatusCheck: false,
            isFPXStatusCall: false,
            isOrderUpdated: false,
        };
    }

    componentDidMount() {

        if (parseInt(this.props.type) === 2) {
            this.props.CallGetFPXResponseList()
            if (this.props !== undefined && this.props.transactionuuid !== undefined) {
                this.props.CallViewFPXStatus({
                    Transactionuuid: this.props.transactionuuid,
                })
            }
        }

    }

    componentDidUpdate(prevProps) {

        if (this.props !== undefined && this.props.transactionuuid !== undefined && this.state.isFPXStatusCall === false && parseInt(this.props.type) === 2) {
            this.props.CallViewFPXStatus({ Transactionuuid: this.props.transactionuuid })
            this.setState({ isFPXStatusCall: true })
        }

        if (prevProps.orderstatus !== this.props.orderstatus) {
            if (this.props.orderstatus.length > 0 && this.props.orderstatus[0].ReturnVal === 1) {
                this.props.CallClearOrderStatus()
            }
            // else {
            //     setTimeout(() => {
            //         window.location.href = "/"
            //         window.reload(false)
            //     }, 4000);
            // }
        }
    }

    UpdateOrderStatus() {
        if (this.state.isOrderUpdated === false) {
            let orderVariationDetailIDs = []
            let orderDetailQtys = []
            this.props.orderfpxstatus.length > 0 && this.props.orderfpxstatus.map((data) => {
                data.OrderProductDetail !== undefined && JSON.parse(data.OrderProductDetail).map((dataDetails) => {
                    orderVariationDetailIDs.push(dataDetails.ProductVariationDetailID)
                    orderDetailQtys.push(dataDetails.ProductQuantity)
                })
            })

            console.log("UpdateOrderStatus")
            this.props.CallUpdateOrderStatus({
                Transactionuuid: this.props.transactionuuid,
                TrackingStatusID: 1,
                OrderPaidAmount: this.props.amount,
                TxnID: parseInt(this.props.type) === 2 ? this.props.reference : "-",
                orderVariationDetailIDs: orderVariationDetailIDs,
                orderDetailQtys: orderDetailQtys
            })
            this.setState({ isOrderUpdated: true })
        }

    }

    checkFPXResponse() {
        let responseMsg = ""
        if (this.props.fpxResponseList.length > 0 && this.state.responseCode !== "") {
            this.props.fpxResponseList.filter((x) => x.ResponseCode == this.state.responseCode.toString()).map((code) => {
                responseMsg = code.ResponseDesc
            })
        }
        return responseMsg
    }


    successPage() {
        const breadcrumb = [
            { title: 'Home', url: '' },
            { title: 'Receipt', url: '' },
        ];

        return (
            <div className="cart block container_" >
                <PageHeader header="Shopping Cart" breadcrumb={breadcrumb} /> <PageHeader />
                <div className="container">
                    {this.UpdateOrderStatus()}
                    <div className="block" style={{ backgroundColor: "white", height: "500px" }} >
                        <div style={{ textAlign: "center", margin: 2, paddingTop: "2%" }}>
                            <CheckCircleOutlineIcon style={{ color: "green", width: "15%", height: "50%" }} />
                            <div style={{ textAlign: "center", margin: 2 }}>
                                <label style={{ color: "green", fontWeight: "bold", fontSize: "28px" }}>Order Confirmed</label>
                            </div>
                            <div style={{ textAlign: "center", margin: 2 }}>
                                <label style={{ color: "midnightblue", fontWeight: "bold", fontSize: "18px" }}>Order Number: {this.props.transactionuuid}</label>
                            </div>
                            <div style={{ textAlign: "center" }}>
                                <label style={{ color: "midnightblue", fontWeight: "bold", fontSize: "18px" }}>Transaction Amount: {this.props.amount}</label>
                            </div>
                        </div>
                        <div style={{ textAlign: "center", margin: 5 }}>
                            <div style={{ textAlign: "center", margin: 2 }}>
                                <label style={{ color: "midnightblue", fontWeight: "bold", fontSize: "18px" }}>Your payment had been processed successfully</label>
                            </div>
                            <div style={{ textAlign: "center", margin: 2 }}>
                                <label >Page will be automatically redirected to the main page or click button below</label>
                            </div>
                            <div style={{ textAlign: "center", margin: 2 }}>
                                <button onClick={() =>
                                    <>
                                        {window.location.href = "/"}
                                        {window.reload(false)}
                                    </>
                                } className="btn btn-primary mt-2 mt-md-3 mt-lg-4" style={{ backgroundColor: "forestgreen", borderWidth: 0 }}>
                                    Continue Shopping
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


    pendingPage() {
        const breadcrumb = [
            { title: 'Home', url: '' },
            { title: 'Error Page', url: '' },
        ];

        return (
            <div className="cart block container_" >
                <PageHeader header="Shopping Cart" breadcrumb={breadcrumb} /> <PageHeader />
                <div className="container">

                    <div className="block" style={{ backgroundColor: "white", height: "500px" }} >
                        <div style={{ textAlign: "center", margin: 2, paddingTop: "2%" }}>
                            <HourglassTopIcon style={{ color: "blue", width: "15%", height: "50%" }} />
                            <div style={{ textAlign: "center", margin: 2 }}>
                                <label style={{ color: "blue", fontWeight: "bold", fontSize: "28px" }}>Pending Approval</label>
                            </div>
                            <div style={{ textAlign: "center", margin: 2 }}>
                                <label style={{ color: "midnightblue", fontWeight: "bold", fontSize: "18px" }}>Order Number: {this.props.transactionuuid}</label>
                            </div>
                            <div style={{ textAlign: "center" }}>
                                <label style={{ color: "midnightblue", fontWeight: "bold", fontSize: "18px" }}>Transaction Amount: {this.props.amount}</label>
                            </div>
                        </div>
                        <div style={{ textAlign: "center", margin: 5 }}>

                            <div style={{ textAlign: "center", margin: 2 }}>
                                <label style={{ color: "midnightblue", fontWeight: "bold", fontSize: "18px" }}>Your request has been sent. Pending for authorizer Approval</label>
                            </div>
                            <div style={{ textAlign: "center", margin: 2 }}>
                                <label >Page will be automatically redirected to the main page or click button below</label>
                            </div>
                            <div style={{ textAlign: "center", margin: 2 }}>
                                <button onClick={() =>
                                    <>
                                        {window.location.href = "/"}
                                        {window.reload(false)}
                                    </>
                                } className="btn btn-primary mt-2 mt-md-3 mt-lg-4" style={{ backgroundColor: "forestgreen", borderWidth: 0 }}>
                                    Continue Shopping
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    errorPage() {
        const breadcrumb = [
            { title: 'Home', url: '' },
            { title: 'Error Page', url: '' },
        ];

        return (
            <div className="cart block container_" >
                <PageHeader header="Shopping Cart" breadcrumb={breadcrumb} /> <PageHeader />
                <div className="container">

                    <div className="block" style={{ backgroundColor: "white", height: "500px" }} >
                        <div style={{ textAlign: "center", margin: 2, paddingTop: "2%" }}>
                            <CancelIcon style={{ color: "red", width: "15%", height: "50%" }} />
                            <div style={{ textAlign: "center", margin: 2 }}>
                                <label style={{ color: "red", fontWeight: "bold", fontSize: "28px" }}>Transaction Failed</label>
                            </div>
                            <div style={{ textAlign: "center", margin: 2 }}>
                                <label style={{ color: "midnightblue", fontWeight: "bold", fontSize: "18px" }}>Order Number: {this.props.transactionuuid}</label>
                            </div>
                            <div style={{ textAlign: "center" }}>
                                <label style={{ color: "midnightblue", fontWeight: "bold", fontSize: "18px" }}>Transaction Amount: {this.props.amount}</label>
                            </div>
                        </div>
                        <div style={{ textAlign: "center", margin: 5 }}>
                            <div style={{ textAlign: "center", margin: 2 }}>
                                <label style={{ color: "midnightblue", fontWeight: "bold", fontSize: "18px" }}>Unfortunately payment was unsuccessful
                                    {parseInt(this.props.type) === 2 && this.props.amount > 30000 ? ". Maximum Transaction Limit Exceeded RM30000.00" : parseInt(this.props.type) === 2 && this.props.amount < 1 ? ". Transaction Amount is Lower than the Minimum Limit RM1.00" : ""}
                                </label>
                            </div>
                            {
                                parseInt(this.props.type) === 2 &&
                                <div style={{ textAlign: "center", margin: 2 }}>
                                    <label style={{ color: "midnightblue", fontWeight: "bold", fontSize: "16px" }}>Reject Reason :   {this.checkFPXResponse()}  </label>
                                </div>
                            }
                            <div style={{ textAlign: "center", margin: 2 }}>
                                <label >Page will be automatically redirected to the main page or click button below</label>
                            </div>
                            <div style={{ textAlign: "center", margin: 2 }}>
                                <button onClick={() =>
                                    <>
                                        {window.location.href = "/"}
                                        {window.reload(false)}
                                    </>
                                } className="btn btn-primary mt-2 mt-md-3 mt-lg-4" style={{ backgroundColor: "forestgreen", borderWidth: 0 }}>
                                    Continue Shopping
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* {
                    setTimeout(
                        function () {
                            window.location.href = "/"
                            window.reload(false);
                        }.bind(this),
                        500
                    )
                } */}
            </div>
        );
    }

    render() {

        const checkEmptyData = (data) => {
            if (data === "-")
                return ""
            else
                return data
        }

        const CreateCheckSum = () => {
            let FPXData = this.props.orderfpxstatus[0]
            let bankingdata = checkEmptyData(FPXData.fpx_buyerAccNo) + "|" + checkEmptyData(FPXData.fpx_buyerBankBranch) + "|" + checkEmptyData(FPXData.fpx_buyerBankId) + "|" + checkEmptyData(FPXData.fpx_buyerEmail) + "|" + checkEmptyData(FPXData.fpx_buyerIban)
                + "|" + checkEmptyData(FPXData.fpx_buyerId) + "|" + checkEmptyData(FPXData.fpx_buyerName) + "|" + checkEmptyData(FPXData.fpx_makerName) + "|" + checkEmptyData(FPXData.fpx_msgToken) + "|" + this.state.fpx_msgType + "|" + checkEmptyData(FPXData.fpx_productDesc)
                + "|" + checkEmptyData(FPXData.fpx_sellerBankCode) + "|" + this.state.fpx_sellerExId + "|" + checkEmptyData(FPXData.fpx_sellerExOrderNo) + "|" + this.state.fpx_sellerId + "|" + checkEmptyData(FPXData.fpx_sellerOrderNo) + "|" + checkEmptyData(FPXData.fpx_sellerTxnTime) + "|" + parseFloat(FPXData.OrderTotalAmount).toFixed(2) + "|" + this.state.fpx_txnCurrency + "|" + checkEmptyData(FPXData.fpx_version)

            let URL = "https://myemporia.my/payment/check.php"
            const config = { headers: { 'Content-Type': 'multipart/form-data' } }
            const formData = new FormData()
            formData.append("bankingdata", bankingdata);
            axios.post(URL, formData, config).then((res) => {
                if (res.status === 200) {
                    this.setState({
                        fpx_checkSum: res.data.split('"')[1],
                    })
                }
                else {
                    toast.error("There is something wrong with uploading images. Please try again.")
                }
            }).catch(e => {
                toast.error("There is something wrong with uploading images. Please try again.")
            })
            this.setState({ isProduceChecksum: true })
        }

        const checkFPXStatus = (data) => {
            const formData = new FormData();
            formData.append("fpx_sellerExId", this.state.fpx_sellerExId);
            formData.append("fpx_sellerExOrderNo", checkEmptyData(data.fpx_sellerExOrderNo));
            formData.append("fpx_sellerTxnTime", checkEmptyData(data.fpx_sellerTxnTime));
            formData.append("fpx_sellerOrderNo", checkEmptyData(data.fpx_sellerOrderNo));
            formData.append("fpx_sellerBankCode", checkEmptyData(data.fpx_sellerBankCode));
            formData.append("fpx_txnAmount", parseFloat(data.OrderTotalAmount).toFixed(2));
            formData.append("fpx_buyerEmail", checkEmptyData(data.fpx_buyerEmail));
            formData.append("fpx_checkSum", this.state.fpx_checkSum);
            formData.append("fpx_buyerName", checkEmptyData(data.fpx_buyerName));
            formData.append("fpx_buyerBankId", checkEmptyData(data.fpx_buyerBankId));
            formData.append("fpx_buyerBankBranch", checkEmptyData(data.fpx_buyerBankBranch));
            formData.append("fpx_buyerAccNo", checkEmptyData(data.fpx_buyerAccNo));
            formData.append("fpx_buyerId", checkEmptyData(data.fpx_buyerId));
            formData.append("fpx_makerName", checkEmptyData(data.fpx_makerName));
            formData.append("fpx_buyerIban", checkEmptyData(data.fpx_buyerIban));
            formData.append("fpx_version", checkEmptyData(data.fpx_version));
            formData.append("fpx_productDesc", checkEmptyData(data.fpx_productDesc));
            axios
                .post(
                    "https://myemporia.my/payment/statusTracking.php",
                    formData,
                    {}
                )
                .then((res) => {
                    if (res.data !== "" && res.data.split("=").length === 2) {
                        let responseCode = res.data.split("=")
                        if (responseCode.length > 0) {
                            this.setState({ responseCode: responseCode[1].replace(/[\r\n]/gm, ''), isStatusCheck: true })
                        }
                    }
                });
        }


        if (this.props.orderfpxstatus.length > 0 && this.state.isProduceChecksum === false)
            CreateCheckSum()


        if (this.props.orderfpxstatus.length > 0 && this.state.isStatusCheck === false) {
            this.props.orderfpxstatus.map((data) => {
                checkFPXStatus(data)
            })
        }

        const returnPage = (type) => {

            switch (type) {
                case "bank":
                    if (this.state.responseCode === "00")
                        return (this.successPage())
                    else {
                        if (this.state.responseCode === "99")
                            return (this.pendingPage())
                        else
                            return (this.errorPage())
                    }

                case "card":
                    if (this.props.reference === "ACCEPT")
                        return (this.successPage())
                    else
                        return (this.errorPage())

                default:
                    break;
            }

        }
        console.log("this.props", this.props)
        console.log("this.state", this.state)

        return (
            <React.Fragment>
                {parseInt(this.props.type) === 2 ? this.state.isStatusCheck && returnPage("bank") : returnPage("card")}
            </React.Fragment>
        );
    }
}


const mapStateToProps = (state) => ({
    orderstatus: state.counterReducer.orderstatus,
    orderfpxstatus: state.counterReducer.orderfpxstatus,
    fpxResponseList: state.counterReducer.fpxResponseList
});

const mapDispatchToProps = (dispatch) => {
    return {
        CallUpdateOrderStatus: (prodData) => dispatch(GitAction.CallUpdateOrderStatus(prodData)),
        CallViewFPXStatus: (prodData) => dispatch(GitAction.CallViewFPXStatus(prodData)),
        CallClearOrderStatus: () => dispatch(GitAction.CallClearOrderStatus()),
        CallGetFPXResponseList: () => dispatch(GitAction.CallGetFPXResponseList()),
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(ShopPageReceipt);
