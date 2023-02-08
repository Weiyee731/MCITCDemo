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
import { MuiOtpInput } from 'mui-one-time-password-input'
// import OtpInput from "react-otp-input";
import PhoneInput, {
  formatPhoneNumber,
  formatPhoneNumberIntl,
  isValidPhoneNumber,
  isPossiblePhoneNumber,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";

function mapStateToProps(state) {
  return {
    currentUser: state.counterReducer["currentUser"],
    productcart: state.counterReducer.productcart,
    order: state.counterReducer.order,
    profileUpdate: state.counterReducer["profileUpdate"],
    emailUpdated: state.counterReducer["emailUpdated"],
    verifyPassword: state.counterReducer["verifyPassword"],
    verifyOTP: state.counterReducer["verifyOTP"],
    emailVerification: state.counterReducer["emailVerification"],
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
    CallCheckUserExists: (credentials) =>
      dispatch(GitAction.CallCheckUserExists(credentials)),
    CallUpdateEmail: (credentials) =>
      dispatch(GitAction.CallUpdateEmail(credentials)),
    CallSendOTP: (credentials) => dispatch(GitAction.CallSendOTP(credentials)),
  };
}
class PageChangeEmail extends Component {
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
      validEmail: false,
      isEmailSet: false,

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

      UPDATETYPE: "EMAIL",
      otp: "", //OTP
    };
    this.handleChangeForPassword = this.handleChangeForPassword.bind(this);
    this.handleChangeforEmail = this.handleChangeforEmail.bind(this);
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
      this.props.CallUserProfile(this.state);
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

  componentDidUpdate(prevProps) {
    if (prevProps.verifyPassword !== this.props.verifyPassword)
      this.checkPassword()

    if (prevProps.emailUpdated !== this.props.emailUpdated) {
      if (this.props.emailUpdated && this.props.emailUpdated[0].ReturnMsg !== "The OTP was Wrong") {
        toast.success("Your email  has been updated");
        // this.props.history.push("/account/profile")
        // this.props.history.push("/account/profile");
        // window.location.reload(false);
      } else {
        toast.warn("The OTP key are incorrect. Please try again");
      }
    }
    if (prevProps.emailVerification !== this.props.emailVerification)
      if (this.props.emailVerification.length > 0 && this.state.isEmailSet === true && this.props.emailVerification[0].ReturnVal === 0) {
        this.getNewOTP();
        this.setState({ isEmailSet: false })
      }
    if(prevProps.verifyOTP !== this.props.verifyOTP){
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

  handleChangeforEmail(e) {
    // const { value } = e.target;
    var EmailPattern =
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/im;
    if (e !== null) {
      this.setState({
        UpdatedValue: e.target.value,
      });
      if (e.target.value.length > 0 && e.target.value.match(EmailPattern)) {
        this.setState({ validEmail: true });
      } else {
        this.setState({ validEmail: false });
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
      this.props.CallUpdateEmail(this.state, otp);

      this.props.CallUpdateEmail({
        USERID: this.state.USERID,
        UPDATETYPE: this.state.UPDATETYPE,
        otp: otp,
        UpdatedValue: this.state.UpdatedValue,
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
      // this.checkPassword();
    }
  };

  checkPassword = (e) => {
    if (
      this.props.verifyPassword !== undefined &&
      this.props.verifyPassword[0].UserID !== 0 &&
      // this.props.verifyPassword[0].ValidationInd !== undefined &&
      // this.props.verifyPassword[0].ValidationInd !== 0 &&
      this.props.verifyPassword.length > 0
    ) {
      this.setState({ confirmPasswordPage: false });
    } else {
      toast.warning("The password is incorrect! Please try again");
    }
  }


  getNewOTP = (e) => {
    this.props.CallSendOTP(this.state); //send otp
  }


  verifyEmail = (e) => {

    // this.props.CallCheckUserExists(this.state.UpdatedValue)
    this.props.CallCheckUserExists({Email:this.state.UpdatedValue, Value:"checkEmail"})
    this.setState({ isEmailSet: true })
    // setEmailVefication(true)
  }

  submitOTP = (e) => {
    this.props.CallUpdateProfileSpecificField(this.state);
    if (this.state.counter <= 0) {
      this.setState({ startCountDown: false });
      this.stopTimer(60);
    }
    if (this.props.currentUser[0].ReturnMsg === "The OTP was Wrong") {
      this.props.history.push("/account/profile")
      // this.props.history.push("/account/profile");
      // window.location.reload(false);
    } else {
    }
  };

  runTimer() {
    this.setState({ validEmail: false });
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
    this.setState({ counter: counter, validEmail: true });
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
      caretColor: "blue",
    };

    return (
      <Card>
        <CardContent>
          <React.Fragment>
            <Helmet>
              <title>{`ChangeEmail — ${theme.name}`}</title>
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
                    Change Email
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
                        className="btn btn-primary "
                        onClick={() => this.submitpassword()}
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
                        this.props.currentUser[0].UserEmailAddress !== undefined &&
                        this.props.currentUser[0].UserEmailAddress !== null
                        ? this.censorEmail(
                          this.props.currentUser[0].UserEmailAddress
                        )
                        : ["No Email Address was found"]}
                    </div>
                  </div>
                  <div className="row contactrowStyle">
                    <div className="col-12 font">New Email Address</div>
                    <div className="col-6 pr-0 font">
                      <TextField
                        // label="Email address"
                        id="outlined-size-normal"
                        variant="outlined"
                        style={{ width: "100%" }}
                        size="small"
                        onChange={this.handleChangeforEmail.bind(this)}
                        required
                      />
                    </div>
                    <div className="font col-4 link-button  change-contact-mail d-flex align-items-center pl-2">
                      {this.state.startCountDown === true ? (
                        <div className="link-button" disabled>
                          {this.state.counter + " seconds is remaining"}
                        </div>
                      ) : (
                        <button
                          className="font link-button change-contact-mail d-flex align-items-center pl-2"
                          disabled={this.state.validEmail ? false : true}
                          onClick={() => this.verifyEmail()}
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
                      <MuiOtpInput id="OTP" label="OTP" variant="outlined" className="w-100" length={6} value={this.state.otp} onChange={this.handleChange} />
                      {/* <div className="row contactrowStyle">
                        <div className="col-6 font otp"> */}
                          {/* <OtpInput
                            value={this.state.otp}
                            onChange={this.handleChange}
                            numInputs={6}
                            separator={<span>-</span>}
                            inputStyle={inputstyle}
                          /> */}
                        {/* </div>
                      </div> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(PageChangeEmail);
