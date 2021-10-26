// react
import React, { Component, useState } from "react";

// third-party
import { connect } from "react-redux";
import { Helmet } from "react-helmet-async";
import { browserHistory } from "react-router";
// application

// data stubs
import payments from "../../data/shopPayments";
import theme from "../../data/theme";
import { GitAction } from "../../store/action/gitAction";
import "react-step-progress/dist/index.css";
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
import FormHelperText from '@material-ui/core/FormHelperText';
import OtpInput from 'react-otp-input';

function mapStateToProps(state) {
    return {
        currentUser: state.counterReducer["currentUser"],
        productcart: state.counterReducer.productcart,
        order: state.counterReducer.order,
        profileUpdate: state.counterReducer["profileUpdate"],
    };
}

function mapDispatchToProps(dispatch) {
    return {
        CallAddOrder: (propsData) => dispatch(GitAction.CallAddOrder(propsData)),
        CallClearOrder: () => dispatch(GitAction.CallClearOrder()),
        CallUserProfile: (propsData) =>
            dispatch(GitAction.CallUserProfile(propsData)),
        CallUpdateProfileSpecificField: (propsData) =>
            dispatch(GitAction.CallUpdateProfileSpecificField(propsData)),
        loginUser: (credentials) => dispatch(GitAction.CallLogin(credentials)),
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
            validpassword: false,
            // otp: '',
            startCountDown: false,
            hidden: true,
            counter: 300,
            confirmPasswordPage: true,

            TYPE: "UserProfile",
            TYPEVALUE: localStorage.getItem("isLogin") === false ? 0 : localStorage.getItem("id"),
            USERROLEID: "0",
            LISTPERPAGE: "999",
            PAGE: "1",

            username: localStorage.getItem("isLogin") === false ? 0 : localStorage.getItem("userName"),
            password: "",
            contactEntered: false,
            passwordEntered: false,
            passwordErr: false,

            USERID: localStorage.getItem("isLogin") === false ? 0 : localStorage.getItem("id"),
            USERFIRSTNAME: '',
            USERLASTNAME: '',
            USERCONTACTNO: '',
            USERDATEBIRTH: '',
            USEREMAIL: '',
            USERGENDER: '',

            UPDATETYPE: 'CONTACT',
            otp: '', //OTP
            // UPDATEDFIELD: '',
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.handleChangeForPassword = this.handleChangeForPassword.bind(this);
        this.handleChangeforContact = this.handleChangeforContact.bind(this);
        this.submitpassword = this.submitpassword.bind(this);
        this.toggleShow = this.toggleShow.bind(this);
        this.OnSubmitChangeContact = this.OnSubmitChangeContact.bind(this);
        this.runTimer = this.runTimer.bind(this);
        this.clickedBack = this.clickedBack.bind(this);
    }

    componentDidMount() {
        if (this.state.USERID !== undefined && this.state.USERID !== null && this.state.TYPEVALUE !== undefined) {
            this.props.CallUserProfile(this.state);
            if (this.props.currentUser.length > 0 && this.props.currentUser !== undefined) {
                this.setState({
                    USEREMAIL: this.props.currentUser[0].UserEmailAddress,
                    USERFIRSTNAME: this.props.currentUser[0].FirstName,
                    USERLASTNAME: this.props.currentUser[0].LastName,
                    USERDATEBIRTH: this.props.currentUser[0].UserDOB,
                    USERGENDER: this.props.currentUser[0].UserGender,
                });
            }
        }
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

    componentWillUnmount(prevProps) {
        clearInterval(this.timerId); // stop/pause the timer
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

    // censorContact = (str) => {
    //     return str[0] + str[1] + "*".repeat(str.length - 2) + str.slice(-2);
    // };

    censorWord = (str) => {
        return str[0] + "*".repeat(str.length - 2) + str.slice(-1);
    };

    censorEmail = (email) => {
        if (email !== null && email.length > 5) {
            var arr = email.split("@");
            return this.censorWord(arr[0]) + "@" + arr[1];
        } else return "No email was found";
    };

    toggleShow() {
        this.setState({ hidden: !this.state.hidden });
    }

    OnSubmitChangeContact(e) {
        e.preventDefault();
        this.props.loginUser(this.state);
    }

    handleChangeforContact = (e) => {
        const { value } = e.target;

        if (value !== null) {
            this.setState({
                USERCONTACTNO: value,
                // validlastName: true,
            });
        } else {
            this.setState({
                // validlastName: false,
            });
        }
    };

    handleChange = (otp) => this.setState({ otp });
    handleCounter = (counter) => this.setState({ counter });

    submitpassword = (e) => {
        this.props.loginUser(this.state);
        console.log(this.props.currentUser)
        if (this.props.currentUser !== undefined && this.props.currentUser.length > 0) {
            this.setState({ confirmPasswordPage: false, startCountDown: true });
            this.runTimer();
        } else { toast.warning("The password is incorrect! Please try again") }
    }

    getNewOTP = (e) => {
        this.props.loginUser(this.state); //send otp
        console.log(this.props.currentUser)
        if (this.props.currentUser !== undefined && this.props.currentUser.length > 0) {
            this.stopTimer(300);
            this.setState({ startCountDown: true });
            this.runTimer();
        } else { toast.warning("Request failed! Please try again") }
    }

    submitOTP = (e) => {

        this.props.CallUpdateProfileSpecificField(this.state);
        this.stopTimer(0);
        console.log(this.props.profileUpdate[0].ReturnMsg)
        if (this.props.currentUser[0].ReturnMsg === "The OTP was Wrong") {
            browserHistory.push("/Emporia/account/profile");
            window.location.reload(false);
        } else { }
        // toast.error// remain in page
    };

    runTimer() {
        // console.log(this.timerId)
        // if (!this.timerId) {
        this.timerId = this.state.counter > 0 && setInterval(() => {

            this.setState({ counter: this.state.counter - 1 });
            if (this.state.counter <= 0) {
                this.setState({ startCountDown: false });
                this.stopTimer(300);
            }
        }, 1000);
        // }
    }

    clickedBack = (e) => {
        this.setState({ confirmPasswordPage: true, password: "" });
        this.stopTimer(300);
    }

    stopTimer(counter) {
        clearInterval(this.timerId); // stop/pause the timer
        this.setState({ counter: counter })
    }

    render() {
        const breadcrumb = [
            { title: "Home", url: "" },
            // { title: "Shopping Cart", url: "/shop/cart" },
            { title: "Change Contact", url: "" },
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

        return (
            <Card>
                <CardContent>
                    <React.Fragment>
                        <Helmet>
                            <title>{`ChangeContact — ${theme.name}`}</title>
                        </Helmet>
                        {this.state.confirmPasswordPage ? (<div className="checkout block" style={{ width: "100%" }}>
                            <div className="container" style={{ width: "100%" }}> <h5
                                style={{
                                    textAlign: "left"
                                }}
                            >
                                Change Email
                            </h5>
                                <div className="font font-subtitle">
                                    Please be informed that OTP generated will valid for 5 minutes. This information will not shared to merchant.
                                </div>
                                <Divider variant="fullWidth" className="dividerbottom" />
                                <form onSubmit={this.OnSubmitChangeContact} className="container block">
                                    <div className="row contactrowStyle">
                                        <div className="col-6 font">Your Current Email is  {this.props.currentUser[0] !== undefined && this.props.currentUser[0].UserEmailAddress !== undefined ? this.censorContact(this.props.currentUser[0].UserEmailAddress) : ["No Email was found"]}</div>
                                    </div>
                                    <div className="row contactrowStyle">
                                        <div className="col-6 font">New Email</div>
                                        <div className="col-6 font">
                                            <TextField
                                                className="font"
                                                variant="outlined"
                                                size="small"
                                                id="mewcontact"
                                                type="tel"
                                                onChange={this.handleChangeforContact.bind(this)}
                                            />

                                        </div>
                                    </div>
                                    <div className="row contactrowStyle">
                                        <div className="col-6 font">Password</div>
                                        <div className="col-6 ">
                                            <TextField
                                                id="password"
                                                size="small"
                                                className="font"
                                                variant="outlined"
                                                error={this.state.passwordErr}
                                                type={this.state.hidden ? "password" : "text"}
                                                value={this.state.password}
                                                onChange={({ target }) => {
                                                    this.setState({ password: target.value });
                                                }}
                                                InputProps={{
                                                    endAdornment: <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={this.toggleShow}
                                                        >
                                                            {this.state.hidden ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }}
                                            />
                                            {this.state.passwordErr && <FormHelperText style={{ color: "red" }}>Invalid password</FormHelperText>}
                                        </div>
                                    </div>
                                    <div style={{ textAlign: "left" }}>
                                        <button
                                            variant="contained"
                                            className="btn btn-primary "
                                            onClick={() => this.submitpassword()}
                                        >
                                            <DoneIcon className="saveicon" />
                                            Next
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>) : (<div className="checkout block" style={{ width: "100%" }}>
                            <div className="container" style={{ width: "100%" }}>
                                <div className="row">
                                    <div className="col-6">
                                        <p className=" font">
                                            Enter the code we sent to new email {this.props.currentUser.length > 0 && this.props.currentUser[0].UserEmailAddress !== undefined && this.props.currentUser[0].UserEmailAddress ? this.censorEmail(this.props.currentUser[0].UserEmailAddress) : "-"}
                                            <a className=" font font-subtitle" href onClick={() => this.getNewOTP()}>Send new OTP to my email</a>
                                        </p>
                                    </div>
                                    {/* <div className="col-6">
                                       
                                    </div> */}
                                </div>
                                <div className="row contactrowStyle">
                                    <div className="col-6 font otp">
                                        <OtpInput
                                            value={this.state.otp}
                                            onChange={this.handleChange}
                                            numInputs={6}
                                            separator={<span>-</span>}
                                            inputStyle={inputstyle}
                                        />
                                    </div>
                                    <div className="col-4 d-flex align-items-center font">  {this.state.startCountDown === true ? this.state.counter + " seconds is remaining" : ""}</div>
                                </div>
                                <div className="row mt-4">
                                    <div className="col-3 " style={{ textAlign: "left" }}>
                                        <button
                                            variant="contained"
                                            className="btn btn-primary "
                                            onClick={this.clickedBack}
                                        >
                                            <ClearIcon className="saveicon" />
                                            Back
                                        </button>
                                    </div>
                                    <div className="col-3" style={{ textAlign: "right" }}>
                                        <button
                                            variant="contained"
                                            className="btn btn-primary "
                                            onClick={this.submitOTP}
                                        >
                                            <DoneIcon className="saveicon" />
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        )}
                    </React.Fragment>
                </CardContent >
            </Card >
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageChangeContact);
