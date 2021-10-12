// react
import React, { Component } from "react";

// third-party
import { connect } from "react-redux";
import { Helmet } from "react-helmet-async";
import { Link, Redirect } from "react-router-dom";
import { browserHistory } from "react-router";

// application
import Collapse from "../shared/Collapse";
import Currency from "../shared/Currency";
import PageHeader from "../shared/PageHeader";
import { Check9x7Svg } from "../../svg";

// data stubs
import payments from "../../data/shopPayments";
import theme from "../../data/theme";
import PageCheckOrder from "../shop/ShopPageCheckOrder";
import PagePayment from "../shop/ShopPagePayment";
import PageCheckoutQr from "../shop/ShopPageCheckoutQr";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SwipeableViews from "react-swipeable-views";
import { GitAction } from "../../store/action/gitAction";
import queryString from "query-string";
import StepProgressBar from "react-step-progress";
import "react-step-progress/dist/index.css";
import PageCart from "../shop/ShopPageCart";
import PageCompleted from "../shop/ShopPageCompleted";
import { toast } from "react-toastify";
import {
    Card,
    Divider,
} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import { OutlinedInput, InputAdornment, IconButton, TextField } from "@material-ui/core";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import FormControl from '@mui/material/FormControl';
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';

function mapStateToProps(state) {
    return {
        currentUser: state.counterReducer["currentUser"],
        productcart: state.counterReducer.productcart,
        order: state.counterReducer.order
    };
}

function mapDispatchToProps(dispatch) {
    return {
        CallAddOrder: (propsData) => dispatch(GitAction.CallAddOrder(propsData)),
        CallClearOrder: () => dispatch(GitAction.CallClearOrder()),
        CallUserProfile: (propsData) =>
            dispatch(GitAction.CallUserProfile(propsData)),
    };
}
class PageChangeContact extends Component {
    payments = payments;
    constructor(props) {
        super(props);

        this.state = {
            payment: "bank",
            tabvalue: 0,
            ProductID: [],
            ProductQuantity: [],
            UserCartID: [],
            ProductVariationDetailID: [],
            address: 0,
            PaymentID: 0,
            PaymentMethodID: 0,
            showpassword: false,
            password: "",
            validpassword: false,
            userid: localStorage.getItem("isLogin") === false ? 0 : localStorage.getItem("id"),
            otp: "",
            startCountDown: false
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.handleChangeForPassword = this.handleChangeForPassword.bind(this);
        this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
        // this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this);
    }

    componentDidMount() {
        this.state.userid && this.state.userid.length > 0 &&
            this.props.CallUserProfile(this.state.userid);
    }
    onFormSubmit() {
        if (this.state.PaymentID === 0) {
            toast.error("Please fill in correct payment method info to continue")
        }
        else {
            this.props.data.map((x) => {
                this.state.ProductID.push(x.product.ProductID)
                this.state.UserCartID.push(x.product.UserCartID)
                this.state.ProductQuantity.push(x.product.ProductQuantity)
                this.state.ProductVariationDetailID.push(x.product.ProductVariationDetailID)
            })
            this.props.CallAddOrder({
                UserID: window.localStorage.getItem("id"),
                ProductID: this.state.ProductID,
                ProductQuantity: this.state.ProductQuantity,
                UserCartID: this.state.UserCartID,
                UserAddressID: this.state.address,
                PaymentMethodID: this.state.PaymentMethodID,
                ProductVariationDetailID: this.state.ProductVariationDetailID,
                PAYMENTID: this.state.PaymentID,
            })
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.order !== this.props.order) {
            browserHistory.push("/Emporia");
            window.location.reload(false);
        }
    }

    handleChangeForPassword = (e) => {
        const { value } = e.target;

        if (value !== null) {
            this.setState({
                password: value,
                validpassword: true,
            });
        } else {
            toast.warning(" Password is null");
            this.setState({
                validpassword: false,
            });
        }
    };

    handleChangeForOTP = otp => {
        this.setState({ otp: otp });
        console.log(this.state.otp)
    }

    censorContact = (str) => {
        // return str[0] + str[1] + "*".repeat(str.length - 2) + str.slice(-4);
        console.log(str)
    };

    censorWord = (str) => {
        return str[0] + "*".repeat(str.length - 2) + str.slice(-1);
    };
    //    const censorMail =  (str)=> {
    //     return str[0] + "*".repeat(str.length - 2) + str.slice(-4);
    //  }

    censorEmail = (email) => {
        if (email !== null && email.length > 5) {
            var arr = email.split("@");
            return this.censorWord(arr[0]) + "@" + arr[1];
        } else return "No email was found";
    };


    handleClickShowPassword = () => {
        console.log(this.state.showpassword)
        this.setState({
            showpassword: !this.state.showpassword,
        });
    };

    // handleChange = (prop) => (event) => {
    //     this.setState({ [prop]: event.target.value });

    //     console.log(this.state.password)
    // };

    handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    submitOTP = () => {
        // this.props.submitotp
    }

    render() {
        const breadcrumb = [
            { title: "Home", url: "" },
            // { title: "Shopping Cart", url: "/shop/cart" },
            { title: "Checkout", url: "" },
        ];

        const inputstyle = {
            border: "1px solid transparent",
            borderRadius: "8px",
            width: "54px",
            height: "54px",
            fontSize: "12px",
            color: "#000",
            fontWeight: "400",
            caretColor: "blue"
        }

        const step1Content = (
            <div style={{ width: "100%" }}>
                {/* <PageCart data={this.props.data} /> */}
                <div className="row">
                    <div className=" col-3 rowStyle vertical-align mt-5">Original Contact Number</div>
                    <div className="col-8 mt-5 vertical-align">
                        {this.state.UserContactNo !== null && this.state.UserContactNo ? this.censorContact(this.state.UserContactNo) : "-"}
                    </div>
                </div>
                <div className="row">
                    <div className=" col-3 rowStyle vertical-align">Password</div>
                    <div className="col-8">
                        {console.log(this.state.showpassword)}
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                            <OutlinedInput
                                id="password"
                                className="font"
                                size="small"
                                type={this.state.showpassword === true ? 'text' : 'password'}
                                // value={this.state.password}
                                onChange={this.handleChangeforPassword}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => this.handleClickShowPassword()}
                                            onMouseDown={this.handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {this.state.showpassword === true ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>

                    </div>
                </div>
            </div>
        );

        var step2Content = (
            <div style={{ width: "100%" }}>
                <div className="row mt-5">
                    <div className="row">
                        <p> Enter the code we sent to  {this.props.currentUser.UserEmailAddress !== null && this.props.currentUser.UserEmailAddress ? this.censorEmail(this.props.currentUser.UserEmailAddress) : "-"} This OTP will valid for 5 minutes. This information will not shared to merchant.</p>
                    </div>
                </div>
                <div className="row otp">
                    {/* <OtpInput
                        id="emailotp"
                        value={this.state.otp ? this.state.otp : ""}
                        onChange={this.handleChangeForOTP}
                        numInputs={6}
                        isInputNum={true}
                        shouldAutoFocus={true}
                        separator={<span> </span>}
                        inputStyle={inputstyle}
                    /> */}
                    {console.log(this.state.otp)}
                    {this.state.startCountDown ? "1" : "2"}
                    {/* <Link>Resend OTP</Link> */}
                    <a>Resend OTP</a>
                </div>
                <div className="row mt-4">
                    <div className="col-6" style={{ textAlign: "right" }}>
                        <button
                            variant="contained"
                            className="btn btn-primary "
                            onClick={() => this.submitOTP()}
                        >
                            <DoneIcon className="saveicon" />
                            Submit
                        </button>
                    </div>
                    <div className="col-6" style={{ textAlign: "left" }}>
                        <button
                            variant="contained"
                            className="btn btn-primary "
                            onClick={() => this.addProfile()}
                        >
                            <ClearIcon className="saveicon" />
                            Cancel
                        </button>
                    </div>
                </div>

            </div>
        );
        var step3Content = (
            <div style={{ width: "100%" }}>
                <div className="row mt-5 rowStyle">
                    <div className="col font">Current Contact Number</div>
                    <div className="col font"></div>
                </div>
                <div className="row rowStyle">
                    <div className="col font">New Contact Number</div>
                    <div className="col font"></div>
                </div>
                <div className="row rowStyle">
                    <div className="col font otp">
                        {/* <OtpInput
                            id="phoneotp"
                            value={this.state.otp ? this.state.otp : ""}
                            onChange={this.handleChangeForOTP}
                            numInputs={6}
                            isInputNum={true}
                            shouldAutoFocus={true}
                            separator={<span> </span>}
                            inputStyle={inputstyle}
                        /> */}
                        <a>Resend OTP</a>
                    </div>
                    <div className="col font">  {this.state.startCountDown ? "1" : "2"}</div>
                </div>
            </div>
        );
        var step4Content = (
            <div style={{ width: "100%" }}>
                {/* <PageCompleted address={this} data={this.props.data} /> */}
            </div>
        );

        const steps =
            [
                {
                    label: "Verification",
                    name: "step 1",
                    content: step1Content,
                },
                {
                    label: "Authentication",
                    name: "step 2",
                    content: step2Content,
                    // validator: step2Validator
                },
                {
                    label: "Update Phone Number",
                    name: "step 3",
                    content: step3Content,
                    // validator: step3Validator
                },
                {
                    label: "Complete",
                    name: "step 4",
                    content: step4Content,
                    // validator: step3Validator
                },
            ];

        // const query = queryString.parse(this.props.location.search);
        return (
            <Card>
                <CardContent>
                    <React.Fragment>
                        {/* <Helmet>
                    <title>{`Checkout — ${theme.name}`}</title>
                </Helmet>
                <PageHeader header="Checkout" breadcrumb={breadcrumb} /> */}
                        <div className="checkout block" style={{ width: "100%" }}>
                            <div className="container" style={{ width: "100%" }}>
                                <StepProgressBar
                                    startingStep={0}
                                    className="row"
                                    primaryBtnClass="btn-lg"
                                    secondaryBtnClass="btn-link"
                                    onSubmit={() => this.onFormSubmit()}
                                    steps={steps}
                                />
                            </div>
                        </div>
                    </React.Fragment>
                </CardContent>
            </Card>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageChangeContact);
