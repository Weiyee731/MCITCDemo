// react
import React, { Component, useState } from "react";

// third-party
import { connect } from "react-redux";
import { Helmet } from "react-helmet-async";
// import { browserHistory } from "react-router";
// application

// data stubs
import payments from "../../data/shopPayments";
import theme from "../../data/theme";
import { GitAction } from "../../store/action/gitAction";
import { toast } from "react-toastify";
import { Card, Divider } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import {
  OutlinedInput,
  InputAdornment,
  IconButton,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import FormControl from "@mui/material/FormControl";
import ClearIcon from "@mui/icons-material/Clear";
import DoneIcon from "@mui/icons-material/Done";
import FormHelperText from "@mui/material/FormHelperText";
// import OtpInput from "react-otp-input";
import PhoneInput, {
  formatPhoneNumber,
  formatPhoneNumberIntl,
  isValidPhoneNumber,
  isPossiblePhoneNumber,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

function mapStateToProps(state) {
  return {
    currentUser: state.counterReducer["currentUser"],
    productcart: state.counterReducer.productcart,
    order: state.counterReducer.order,
    profileUpdate: state.counterReducer["profileUpdate"],
    verifyPassword: state.counterReducer["verifyPassword"],
    verifyOTP: state.counterReducer["verifyOTP"],
    updatePassword: state.counterReducer["updatePassword"],
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
    CallVerifyPassword: (credentials) =>
      dispatch(GitAction.CallVerifyPassword(credentials)),
    CallUpdatePassword: (credentials) =>
      dispatch(GitAction.CallUpdatePassword(credentials)),
    CallSendOTP: (credentials) => dispatch(GitAction.CallSendOTP(credentials)),
  };
}
class AccountPagePassword extends Component {
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
      contactErr: false,
      address: 0,
      PaymentID: 0,
      PaymentMethodID: 0,
      showpassword: false,
      validpassword: false,
      validPassword: false,

      startCountDown: false,
      hidden: true,
      counter: 60,
      confirmPasswordPage: true,
      enableOTP: false,

      TYPE: "UserProfile",
      TYPEVALUE:
        localStorage.getItem("isLogin") === false
          ? 0
          : localStorage.getItem("id"),
      USERROLEID: "0",
      LISTPERPAGE: "999",
      PAGE: "1",

      VerifyType: "PASSWORD",
      username:
        localStorage.getItem("isLogin") === false
          ? 0
          : localStorage.getItem("userName"),
      password: "",
      Confirmpassword: "",
      contactEntered: false,
      passwordEntered: false,
      passwordErr: false,

      USERID:
        localStorage.getItem("isLogin") === false
          ? 0
          : localStorage.getItem("id"),
      USERFIRSTNAME: "",
      USERLASTNAME: "",
      USERCONTACTNO: "",
      UpdatedValue: "",
      USERDATEBIRTH: "",
      USEREMAIL: "",
      USERGENDER: "",

      GETOTPTYPE: "EMAIL",
      UPDATETYPE: "PASSWORD",
      otp: "", //OTP

      // passwordTally: "false",
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.handleChangeForPassword = this.handleChangeForPassword.bind(this);
    // this.handleChangeforPassword = this.handleChangeforPassword.bind(this);
    this.submitpassword = this.submitpassword.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
    this.OnSubmitChangeContact = this.OnSubmitChangeContact.bind(this);
    this.runTimer = this.runTimer.bind(this);
    this.clickedBack = this.clickedBack.bind(this);
  }

  componentDidMount() {
    if (
      this.state.USERID !== undefined &&
      this.state.USERID !== null &&
      this.state.TYPEVALUE !== undefined
    ) {
      // this.props.CallUserProfile(this.state);
      if (
        this.props.currentUser.length > 0 &&
        this.props.currentUser !== undefined
      ) {
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
      toast.error("Please fill in correct payment method info to continue");
    } else {
      this.props.data.map((x) => {
        this.state.ProductID.push(x.product.ProductID);
        this.state.UserCartID.push(x.product.UserCartID);
        this.state.ProductQuantity.push(x.product.ProductQuantity);
        this.state.ProductVariationDetailID.push(
          x.product.ProductVariationDetailID
        );
      });
      this.props.CallAddOrder({
        UserID: window.localStorage.getItem("id"),
        ProductID: this.state.ProductID,
        ProductQuantity: this.state.ProductQuantity,
        UserCartID: this.state.UserCartID,
        UserAddressID: this.state.address,
        PaymentMethodID: this.state.PaymentMethodID,
        ProductVariationDetailID: this.state.ProductVariationDetailID,
        PAYMENTID: this.state.PaymentID,
      });
    }
  }

  componentDidUpdate(prevProps) {

    if (prevProps.verifyPassword !== this.props.verifyPassword)
      this.checkPassword()

    if (prevProps.updatePassword !== this.props.updatePassword) {
      if (this.props.updatePassword && this.props.updatePassword[0].ReturnMsg === "The Password had Changed") {
        toast.success("Your password has been updated");
        this.props.history.push("/EmporiaDev/account/profile")
        // this.props.history.push("/EmporiaDev/account/profile");
        // window.location.reload(false);
      } else {
        toast.warn("The OTP key are incorrect. Please try again");
      }
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

  handleChangeforPassword(e) {
    // const { value } = e.target;
    var passwordPattern =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/im;
    //       - at least 8 characters
    // - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number
    // - Can contain special characters
    if (e !== null) {
      this.setState({
        UpdatedValue: e.target.value,
      });
      if (e.target.value.length > 0 && e.target.value.match(passwordPattern)) {
        this.setState({ validPassword: true });
      } else {
        this.setState({ validPassword: false });
        return (
          <div>
            Password must - at least 8 characters - contain at least 1 uppercase
            letter, 1 lowercase letter, and 1 number
          </div>
        );
      }
    } else {
      this.setState({
        // validlastName: false,
      });
    }
  }

  handleChange = (otp) => {
    if (otp !== null) {
      this.setState({ otp });
    }
    if (otp.length === 6) {
      this.props.CallUpdatePassword({
        USERID: this.state.USERID,
        UPDATETYPE: this.state.UPDATETYPE,
        otp: otp,
        UpdatedValue: this.state.UpdatedValue
      });
      this.setState({ startCountDown: false });
      this.stopTimer(60);
    }
  };

  handleCounter = (counter) => this.setState({ counter });

  censorContact = (str) => {
    return str[0] + str[1] + "*".repeat(str.length - 2) + str.slice(-2);
  };

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
  }

  submitpassword = (e) => {

    if (this.state.password.length > 0) {
      this.props.CallVerifyPassword(this.state);
    }
  };

  checkPassword = (e) => {
    if (
      this.props.verifyPassword !== undefined &&
      this.props.verifyPassword[0].ValidationInd !== undefined &&
      this.props.verifyPassword[0].ValidationInd !== 0 &&
      this.props.verifyPassword.length > 0
    ) {
      this.setState({ confirmPasswordPage: false });
    } else {
      toast.warn("The password is incorrect! Please try again");
    }
  }

  getNewOTP = (e) => {
    this.props.CallSendOTP(this.state); //send otp
    if (this.props.verifyOTP !== undefined && this.props.verifyOTP.length > 0) {
      this.stopTimer(60);
      this.setState({
        startCountDown: true,
        enableOTP: true,
        validPassword: false,
      });
      this.runTimer();
    } else {
      toast.warning("Request failed! Please try again");
    }
  };

  submitOTP = (e) => {
    this.props.CallUpdateProfileSpecificField(this.state);
    if (this.state.counter <= 0) {
      this.setState({ startCountDown: false });
      this.stopTimer(60);
    }
    // if (this.props.currentUser[0].ReturnMsg === "The OTP was Wrong") {
    //   this.props.history.push(".account/profile");
    //   window.location.reload(false);
    // } else {
    // }
    // toast.error// remain in page
  };

  runTimer() {
    this.setState({ validPassword: false });
    this.timerId =
      this.state.counter > 0 &&
      setInterval(() => {
        this.setState({ counter: this.state.counter - 1 });
        if (this.state.counter <= 0) {
          this.setState({ startCountDown: false, enableOTP: false });
          this.stopTimer(60);
        }
      }, 1000);
  }

  clickedBack = (e) => {
    this.setState({ confirmPasswordPage: true, password: "" });
    this.stopTimer(60);
  };

  stopTimer(counter) {
    clearInterval(this.timerId); // stop/pause the timer
    this.setState({ counter: counter, validPassword: true });
  }

  render() {
    const passwordTally =
      !this.state.password ||
      !this.state.Confirmpassword ||
      this.state.password !== this.state.Confirmpassword;

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
      caretColor: "blue",
    };
    return (
      <Card>
        <CardContent>
          <React.Fragment>
            <Helmet>
              <title>{`Change Password — ${theme.name}`}</title>
            </Helmet>
            {this.state.confirmPasswordPage ? (
              <div className="checkout block" style={{ width: "100%" }}>
                <div className="container" style={{ width: "100%" }}>
                  {" "}
                  <h5
                    style={{
                      textAlign: "left",
                    }}
                  >
                    Change Password
                  </h5>
                  <div className="font font-subtitle">
                    Please key in the password for account verification purpose.
                  </div>
                  <Divider variant="fullWidth" className="dividerbottom" />
                  <form
                    onSubmit={this.OnSubmitChangeContact}
                    className="container block"
                  >
                    <div className="row contactrowStyle">
                      <div className="col-6 font">Current Password</div>
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
                        />
                      </div>
                    </div>
                    <div className="row contactrowStyle">
                      <div className="col-6 font">Confirm Password</div>
                      <div className="col-6 ">
                        <TextField
                          id="confirmpassword"
                          size="small"
                          className="font"
                          variant="outlined"
                          label="Confirm Password" 
                          error={this.state.passwordErr}
                          type={this.state.hidden ? "password" : "text"}
                          value={this.state.Confirmpassword}
                          onChange={({ target }) => {
                            this.setState({ Confirmpassword: target.value });
                          }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={this.toggleShow}
                                >
                                  {this.state.hidden ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                        {this.state.passwordErr && (
                          <FormHelperText style={{ color: "red" }}>
                            Invalid password
                          </FormHelperText>
                        )}
                      </div>
                    </div>
                    <div style={{ textAlign: "left" }}>
                      <button
                        variant="contained"
                        className="btn btn-primary"
                        onClick={() => this.submitpassword()}
                        disabled={!passwordTally ? false : true}
                      >
                        <DoneIcon className="saveicon" />
                        Next
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              <div className="checkout block" style={{ width: "100%" }}>
                <div className="container" style={{ width: "100%" }}>
                  <div className="row contactrowStyle">
                    <div className=" font">
                      Your Current Email Address is{" "}
                      {this.props.currentUser[0] !== undefined &&
                        this.props.currentUser[0].UserEmailAddress !== undefined
                        ? this.censorEmail(
                          this.props.currentUser[0].UserEmailAddress
                        )
                        : ["No Email Address was found"]}
                    </div>
                  </div>
                  <div className="row contactrowStyle">
                    <div className="col-12 font">New Password</div>
                    <div className="col-6 ">
                      <TextField
                        id="newpassword"
                        size="small"
                        className="font"
                        variant="outlined"
                        error={this.state.passwordErr}
                        type={this.state.hidden ? "password" : "text"}
                        value={this.state.UpdatedValue}
                        // onChange={({ target }) => {
                        //   this.setState({ UpdatedValue: target.value });
                        // }}
                        onChange={this.handleChangeforPassword.bind(this)}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={this.toggleShow}
                              >
                                {this.state.hidden ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      {/* {this.state.validPassword === false && this.state.UpdatedValue !== "" && (
                        <FormHelperText style={{ color: "red" }}>
                          Invalid password
                        </FormHelperText>
                      )} */}
                    </div>
                    <div className="tooltip_1 d-flex align-items-center">
                      <HelpOutlineIcon />
                      <div className="tooltiptext1 ">
                        Password must fullfll following requirement
                        - at least 8 characters
                        - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number
                        - Can contain special characters
                      </div>
                    </div>
                    <div className="font col-4 link-button  change-contact-mail d-flex align-items-center pl-2">
                      {this.state.startCountDown === true ? (
                        <div className="link-button" disabled>
                          {this.state.counter + " seconds is remaining"}
                        </div>
                      ) : (
                        <button
                          className="font link-button change-contact-mail d-flex align-items-center pl-2"
                          disabled={this.state.validPassword ? false : true}
                          onClick={() => this.getNewOTP()}
                        >
                          {" "}
                          Send OTP to my email
                        </button>
                      )}
                    </div>
                  </div>
                  {this.state.enableOTP ? (
                    <div>
                      <div className="row contactrowStyle">
                        <div className="col-6">
                          <p className=" font">
                            Enter the code we sent to your email{" "}
                            {this.props.currentUser.length > 0 &&
                              this.props.currentUser[0].UserEmailAddress !==
                              undefined &&
                              this.props.currentUser[0].UserEmailAddress
                              ? this.censorEmail(
                                this.props.currentUser[0].UserEmailAddress
                              )
                              : "-"}
                          </p>
                        </div>
                      </div>
                      <div className="row contactrowStyle">
                        <div className="col-6 font otp">
                          {/* <OtpInput
                            value={this.state.otp}
                            onChange={this.handleChange}
                            numInputs={6}
                            separator={<span>-</span>}
                            inputStyle={inputstyle}
                          /> */}
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            )}
          </React.Fragment>
        </CardContent>
      </Card>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountPagePassword);
