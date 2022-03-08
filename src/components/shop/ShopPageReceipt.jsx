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


class ShopPageReceipt extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps) {

        if (prevProps.orderstatus !== this.props.orderstatus) {
            if (this.props.orderstatus.length > 0 && this.props.orderstatus[0].ReturnVal === 1) {
                this.props.CallClearOrderStatus()
            }
            else {
                console.log("this.props", this.props)
                // setTimeout(() => {
                //     window.location.href = "/"
                //     window.reload(false)
                // }, 4000);
            }
        }
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

                    <div className="block" style={{ backgroundColor: "white", height: "500px" }} >
                        <div style={{ textAlign: "center", margin: 2, paddingTop: "5%" }}>
                            <CheckCircleOutlineIcon style={{ color: "green", width: "15%", height: "50%" }} />
                            <div style={{ textAlign: "center", margin: 2 }}>
                                <label style={{ color: "green", fontWeight: "bold", fontSize: "28px" }}>Order Confirmed</label>
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
                        <div style={{ textAlign: "center", margin: 2, paddingTop: "5%" }}>
                            <HourglassTopIcon style={{ color: "blue", width: "15%", height: "50%" }} />
                            <div style={{ textAlign: "center", margin: 2 }}>
                                <label style={{ color: "blue", fontWeight: "bold", fontSize: "28px" }}>Pending Approvel</label>
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
                        <div style={{ textAlign: "center", margin: 2, paddingTop: "5%" }}>
                            <CancelIcon style={{ color: "red", width: "15%", height: "50%" }} />
                            <div style={{ textAlign: "center", margin: 2 }}>
                                <label style={{ color: "red", fontWeight: "bold", fontSize: "28px" }}>Transaction Failed</label>
                            </div>
                        </div>
                        <div style={{ textAlign: "center", margin: 5 }}>

                            <div style={{ textAlign: "center", margin: 2 }}>
                                <label style={{ color: "midnightblue", fontWeight: "bold", fontSize: "18px" }}>Unfortunately payment was unsuccessful</label>
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
                {
                    setTimeout(
                        function () {
                            // window.location.href = "/"
                            // window.reload(false);
                        }.bind(this),
                        500
                    )
                }
            </div>
        );
    }

    render() {
        console.log("CHECK", this.props)
        let content;

        if ((this.props.match.params.decision).toLowerCase() === "accept") {
            // this.props.CallUpdateOrderStatus({
            //     Transactionuuid: this.props.match.params.transactionuuid,
            //     TrackingStatusID: 1,
            //     OrderPaidAmount: this.props.match.params.amount,
            // })
            content = this.successPage()
        }
        else {
            if ((this.props.match.params.decision).toLowerCase() === "pending")
                content = this.pendingPage()
            else
                content = this.errorPage()
        }

        return (
            <React.Fragment>
                {content}
            </React.Fragment>
        );
    }
}


const mapStateToProps = (state) => ({
    orderstatus: state.counterReducer.orderstatus

});

const mapDispatchToProps = (dispatch) => {
    return {
        CallUpdateOrderStatus: (prodData) => dispatch(GitAction.CallUpdateOrderStatus(prodData)),
        CallClearOrderStatus: () => dispatch(GitAction.CallClearOrderStatus()),
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(ShopPageReceipt);
