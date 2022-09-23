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
import LoadingPanel from '../shared/loadingPanel';

class ShopPageReceipt extends Component {
    constructor(props) {
        super(props);

        this.state = {

            isProduceChecksum: false,

            fpx_msgType: "AE",
            fpx_sellerExId: "EX00013776",
            fpx_sellerId: "SE00015397",
            fpx_txnCurrency: "MYR",

            responseCode: "",
            isStatusCheck: false,
            isOrderStatusCall: false,
            isOrderUpdated: false,
            fpxResult: null,
            isCheckSum: false
        };
    }

    componentDidMount() {

        if (parseInt(this.props.type) === 2) {
            this.props.CallGetFPXResponseList()
        }

        if (this.props !== undefined && this.props.transactionuuid !== undefined) {
            this.props.CallViewOrderStatus({
                Transactionuuid: this.props.transactionuuid,
                paymentType: this.props.type
            })
        }


    }

    componentDidUpdate(prevProps, prevState) {

        if (this.props !== undefined && this.props.transactionuuid !== undefined && this.state.isOrderStatusCall === false) {
            this.props.CallViewOrderStatus({ Transactionuuid: this.props.transactionuuid, paymentType: this.props.type })
            this.setState({ isOrderStatusCall: true })
        }

        if (this.props.orderstatusdata !== undefined && this.props.orderstatusdata.length > 0 && this.state.isOrderStatusCall === true &&
            this.props.orderstatusdata[0].ReturnVal !== '0' && this.props.orderstatusdata[0].Transactionuuid !== undefined
            && this.props.orderstatusdata[0].Transactionuuid !== this.props.transactionuuid) {
            this.props.CallViewOrderStatus({ Transactionuuid: this.props.transactionuuid, paymentType: this.props.type })
        } else {
            if (parseInt(this.props.type) === 2 && this.props.orderstatusdata !== undefined && this.props.orderstatusdata.length > 0
                && this.props.orderstatusdata[0].Transactionuuid !== undefined && this.props.orderstatusdata[0].Transactionuuid === this.props.transactionuuid && this.state.isCheckSum === false)
                this.CreateCheckSum()
        }

        // }
        // if (prevProps.orderstatus !== this.props.orderstatus) {
        //     if (this.props.orderstatus.length > 0 && this.props.orderstatus[0].ReturnVal === 1) {
        //         this.props.CallClearOrderStatus()
        //     }
        //     // else {
        //     //     setTimeout(() => {
        //     //         window.location.href = "//"
        //     //         window.reload(false)
        //     //     }, 4000);
        //     // }
        // }

        if (prevState.fpxResult !== this.state.fpxResult) {
            if (parseInt(this.props.type) === 2 && this.props.orderstatusdata !== undefined && this.props.orderstatusdata.length > 0) {
                this.props.orderstatusdata.map((data) => {
                    this.checkFPXStatus(data)
                })
            }
        }
    }

    UpdateOrderStock() {
        if (this.state.isOrderUpdated === false) {
            let orderVariationDetailIDs = []
            let orderDetailQtys = []
            this.props.orderstatusdata !== undefined && this.props.orderstatusdata.length > 0 && this.props.orderstatusdata.map((data) => {
                data.OrderProductDetail !== undefined && JSON.parse(data.OrderProductDetail).map((dataDetails) => {
                    orderVariationDetailIDs.push(dataDetails.ProductVariationDetailID)
                    orderDetailQtys.push(dataDetails.ProductQuantity)
                })
            })
            this.props.CallUpdateOrderStock({
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


    successPage(propsData) {
        const breadcrumb = [
            { title: 'Home', url: '' },
            { title: 'Receipt', url: '' },
        ];
        const receiptTextStyle = { color: "midnightblue", fontWeight: "bold", fontSize: "18px" }
        this.UpdateOrderStock()
        return (
            <div className="cart block container_" >
                <PageHeader header="Shopping Cart" breadcrumb={breadcrumb} /> <PageHeader />
                <div className="container">
                    <div className="block" style={{ backgroundColor: "white", height: "500px" }} >
                        <div style={{ textAlign: "center", margin: 2, paddingTop: "2%" }}>
                            <CheckCircleOutlineIcon style={{ color: "green", width: "15%", height: "50%" }} />
                            <div style={{ textAlign: "center", margin: 2 }}>
                                <label style={{ color: "green", fontWeight: "bold", fontSize: "28px" }}>Order Confirmed</label>
                            </div>
                            <div style={{ textAlign: "center", margin: 2 }}>
                                <label style={receiptTextStyle}>Order Number: {propsData.OrderID}</label>
                            </div>
                            <div style={{ textAlign: "center", margin: 2 }}>
                                <label style={receiptTextStyle}>Transaction Id: {this.props.transactionuuid}</label>
                            </div>
                            <div style={{ textAlign: "center" }}>
                                <label style={receiptTextStyle}>Transaction Amount: RM {parseFloat(propsData.OrderTotalAmount).toFixed(2)}</label>
                            </div>
                        </div>
                        <div style={{ textAlign: "center", margin: 5 }}>
                            <div style={{ textAlign: "center", margin: 2 }}>
                                <label style={receiptTextStyle}>Your payment had been processed successfully</label>
                            </div>
                            <div style={{ textAlign: "center", margin: 2 }}>
                                <label >Page will be automatically redirected to the main page or click button below</label>
                            </div>
                            <div style={{ textAlign: "center", margin: 2 }}>
                                <button onClick={() =>
                                    <>
                                        {window.location.href = "//"}
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


    pendingPage(propsData) {
        const breadcrumb = [
            { title: 'Home', url: '' },
            { title: 'Error Page', url: '' },
        ];
        const receiptTextStyle = { color: "midnightblue", fontWeight: "bold", fontSize: "18px" }

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
                                <label style={receiptTextStyle}>Order Number: {propsData.OrderID}</label>
                            </div>
                            <div style={{ textAlign: "center", margin: 2 }}>
                                <label style={receiptTextStyle}>Transaction Id: {this.props.transactionuuid}</label>
                            </div>
                            <div style={{ textAlign: "center" }}>
                                <label style={receiptTextStyle}>Order Amount: RM {parseFloat(propsData.OrderTotalAmount).toFixed(2)}</label>
                            </div>
                        </div>
                        <div style={{ textAlign: "center", margin: 5 }}>

                            <div style={{ textAlign: "center", margin: 2 }}>
                                <label style={receiptTextStyle}>Your request has been sent. Pending for authorizer Approval</label>
                            </div>
                            <div style={{ textAlign: "center", margin: 2 }}>
                                <label >Page will be automatically redirected to the main page or click button below</label>
                            </div>
                            <div style={{ textAlign: "center", margin: 2 }}>
                                <button onClick={() =>
                                    <>
                                        {window.location.href = "//"}
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

    errorPage(propsData) {
        const breadcrumb = [
            { title: 'Home', url: '' },
            { title: 'Error Page', url: '' },
        ];
        const receiptTextStyle = { color: "midnightblue", fontWeight: "bold", fontSize: "18px" }

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
                            {
                                propsData !== undefined &&
                                <div style={{ textAlign: "center", margin: 2 }}>
                                    <label style={receiptTextStyle}>Order Number: {propsData.OrderID}</label>
                                </div>
                            }
                            <div style={{ textAlign: "center", margin: 2 }}>
                                <label style={receiptTextStyle}>Transaction Id: {this.props.transactionuuid}</label>
                            </div>
                            {
                                propsData !== undefined ?
                                    <div style={{ textAlign: "center" }}>
                                        <label style={receiptTextStyle}>Transaction Amount: RM {parseFloat(propsData.OrderTotalAmount).toFixed(2)}</label>
                                    </div>
                                    :
                                    <div style={{ textAlign: "center" }}>
                                        <label style={receiptTextStyle}>Transaction Id is Not Found</label>
                                    </div>
                            }
                        </div>
                        <div style={{ textAlign: "center", margin: 5 }}>
                            <div style={{ textAlign: "center", margin: 2 }}>
                                <label style={receiptTextStyle}>Unfortunately payment was unsuccessful
                                    {parseInt(this.props.type) === 2 && this.props.amount > 30000 ? ". Maximum Transaction Limit Exceeded RM30000.00" : parseInt(this.props.type) === 2 && this.props.amount < 1 ? ". Transaction Amount is Lower than the Minimum Limit RM1.00" : ""}
                                </label>
                            </div>
                            {
                                parseInt(this.props.type) === 2 && propsData !== undefined &&
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
                                        {window.location.href = "//"}
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
                            window.location.href = "//"
                            window.reload(false);
                        }.bind(this),
                        500
                    )
                } */}
            </div>
        );
    }


    checkEmptyData = (data) => {
        if (data === "-")
            return ""
        else
            return data
    }

    CreateCheckSum = async () => {
        let FPXData = this.props.orderstatusdata[0]
        let bankingdata = this.checkEmptyData(FPXData.fpx_buyerAccNo) + "|" + this.checkEmptyData(FPXData.fpx_buyerBankBranch) + "|" + this.checkEmptyData(FPXData.fpx_buyerBankId) + "|" + this.checkEmptyData(FPXData.fpx_buyerEmail) + "|" + this.checkEmptyData(FPXData.fpx_buyerIban)
            + "|" + this.checkEmptyData(FPXData.fpx_buyerId) + "|" + this.checkEmptyData(FPXData.fpx_buyerName) + "|" + this.checkEmptyData(FPXData.fpx_makerName) + "|" + this.checkEmptyData(FPXData.fpx_msgToken) + "|" + this.state.fpx_msgType + "|" + this.checkEmptyData(FPXData.fpx_productDesc)
            + "|" + this.checkEmptyData(FPXData.fpx_sellerBankCode) + "|" + this.state.fpx_sellerExId + "|" + this.checkEmptyData(FPXData.fpx_sellerExOrderNo) + "|" + this.state.fpx_sellerId + "|" + this.checkEmptyData(FPXData.fpx_sellerOrderNo) + "|" + this.checkEmptyData(FPXData.fpx_sellerTxnTime) + "|" + parseFloat(FPXData.OrderTotalAmount).toFixed(2) + "|" + this.state.fpx_txnCurrency + "|" + this.checkEmptyData(FPXData.fpx_version)

        let URL = "https://myemporia.my/payment/check.php"
        const config = { headers: { 'Content-Type': 'multipart/form-data' } }
        const formData = new FormData()
        formData.append("bankingdata", bankingdata);
        const res = await axios.post(URL, formData, config)
        if (res.status === 200) {
            this.setState({
                fpxResult: res.data.split('"')[1],
                isCheckSum: true
            })
        }
        // .then((res) => {
        //     if (res.status === 200) {
        //         this.setState({
        //             fpxResult: res.data.split('"')[1]
        //         })
        //         // return res.data.split('"')[1]
        //     }
        //     else {
        //         toast.error("There is something wrong with uploading images. Please try again.")
        //     }
        // })
        // .catch(e => {
        //     toast.error("There is something wrong with uploading images. Please try again.")
        // })

    }

    checkFPXStatus = (data) => {
        const formData = new FormData();
        formData.append("fpx_sellerExId", this.state.fpx_sellerExId);
        formData.append("fpx_sellerExOrderNo", this.checkEmptyData(data.fpx_sellerExOrderNo));
        formData.append("fpx_sellerTxnTime", this.checkEmptyData(data.fpx_sellerTxnTime));
        formData.append("fpx_sellerOrderNo", this.checkEmptyData(data.fpx_sellerOrderNo));
        formData.append("fpx_sellerBankCode", this.checkEmptyData(data.fpx_sellerBankCode));
        formData.append("fpx_txnAmount", parseFloat(data.OrderTotalAmount).toFixed(2));
        formData.append("fpx_buyerEmail", this.checkEmptyData(data.fpx_buyerEmail));
        formData.append("fpx_checkSum", this.state.fpxResult);
        formData.append("fpx_buyerName", this.checkEmptyData(data.fpx_buyerName));
        formData.append("fpx_buyerBankId", this.checkEmptyData(data.fpx_buyerBankId));
        formData.append("fpx_buyerBankBranch", this.checkEmptyData(data.fpx_buyerBankBranch));
        formData.append("fpx_buyerAccNo", this.checkEmptyData(data.fpx_buyerAccNo));
        formData.append("fpx_buyerId", this.checkEmptyData(data.fpx_buyerId));
        formData.append("fpx_makerName", this.checkEmptyData(data.fpx_makerName));
        formData.append("fpx_buyerIban", this.checkEmptyData(data.fpx_buyerIban));
        formData.append("fpx_version", this.checkEmptyData(data.fpx_version));
        formData.append("fpx_productDesc", this.checkEmptyData(data.fpx_productDesc));
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
                        this.setState({ responseCode: responseCode[1].replace(/[\r\n]/gm, '') })
                    }
                }
            });
        this.setState({ isStatusCheck: true })
    }




    render() {

        const checkPropsData = (data) => {
            if (data !== undefined && data.length > 0 && data[0].Transactionuuid === this.props.transactionuuid)
                return true
            else {
                if (data !== undefined && data.length > 0 && data[0].Transactionuuid === undefined && this.props.orderstatusdata[0].ReturnVal === '0')
                    return true
                else
                    return false
            }
        }

        const returnPage = (type) => {
            switch (type) {
                case "bank":
                    if (this.props.orderstatusdata !== undefined && this.props.orderstatusdata.length > 0 && this.props.orderstatusdata[0].ReturnVal !== 1 && this.props.orderstatusdata[0].ReturnVal !== '0') {
                        if (this.state.responseCode === "00")
                            return (this.successPage(this.props.orderstatusdata[0]))
                        else {
                            if (this.state.responseCode === "99")
                                return (this.pendingPage(this.props.orderstatusdata[0]))
                            else
                                return (this.errorPage(this.props.orderstatusdata[0]))
                        }
                    }
                    else
                        return (this.errorPage())

                case "card":
                    if (this.props.orderstatusdata !== undefined && this.props.orderstatusdata.length > 0 && this.props.orderstatusdata[0].ReturnVal !== 1) {
                        if (this.props.orderstatusdata[0].TrackingStatusID === 1)
                            return (this.successPage(this.props.orderstatusdata[0]))
                        else
                            return (this.errorPage(this.props.orderstatusdata[0]))
                    }
                    else
                        return (this.errorPage())

                default:
                    break;
            }
        }

        return (
            <React.Fragment>
                {
                    this.state.isOrderStatusCall === true && checkPropsData(this.props.orderstatusdata) === true ?
                        parseInt(this.props.type) === 2 ? returnPage("bank") : returnPage("card")
                        :
                        <LoadingPanel />
                }

            </React.Fragment>
        );
    }
}


const mapStateToProps = (state) => ({
    orderstatus: state.counterReducer.orderstatus,
    orderstatusdata: state.counterReducer.orderstatusdata,
    fpxResponseList: state.counterReducer.fpxResponseList
});

const mapDispatchToProps = (dispatch) => {
    return {
        CallUpdateOrderStock: (prodData) => dispatch(GitAction.CallUpdateOrderStock(prodData)),
        CallViewOrderStatus: (prodData) => dispatch(GitAction.CallViewOrderStatus(prodData)),
        CallClearOrderStatus: () => dispatch(GitAction.CallClearOrderStatus()),
        CallGetFPXResponseList: () => dispatch(GitAction.CallGetFPXResponseList()),
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(ShopPageReceipt);
