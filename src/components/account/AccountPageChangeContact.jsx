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
import { ConstructionOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
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
    contactUpdated: state.counterReducer["contactUpdated"],
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
    CallUpdateContact: (credentials) =>
      dispatch(GitAction.CallUpdateContact(credentials)),
    CallSendOTP: (credentials) => dispatch(GitAction.CallSendOTP(credentials)),
    CallEmptyVerifyPassword: () => dispatch(GitAction.CallEmptyVerifyPassword()),
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
      contactErr: false,
      address: 0,
      PaymentID: 0,
      PaymentMethodID: 0,
      showpassword: false,
      validpassword: false,
      validContact: false,

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
      // USERCONTACTNO: "",
      UpdatedValue: "",

      USERDATEBIRTH: "",
      USEREMAIL: "",
      USERGENDER: "",

      GETOTPTYPE: "EMAIL",

      UPDATETYPE: "CONTACT",
      otp: "", //OTP
      // UPDATEDFIELD: '',
    };
    this.handleChangeForPassword = this.handleChangeForPassword.bind(this);
    this.handleChangeforContact = this.handleChangeforContact.bind(this);
    this.submitpassword = this.submitpassword.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
    // this.OnSubmitChangeContact = this.OnSubmitChangeContact.bind(this);
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

  componentDidUpdate(prevProps) {

    if (prevProps.verifyPassword !== this.props.verifyPassword)
      this.checkPassword()

    if (prevProps.contactUpdated !== this.props.contactUpdated) {
      if (this.props.contactUpdated && this.props.contactUpdated[0].ReturnMsg !== "The OTP was Wrong") {
        toast.success("Your contact number has been updated");
        this.props.history.push("/EmporiaDev/account/profile")
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

  handleChangeforContact(e) {
    var phoneno = /^[\+]?[(]?[0-9]{4}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if (e !== null) {
      this.setState({
        UpdatedValue: e,
      });
      if (e!== undefined && e.length > 0 && e.match(phoneno)) {
        this.setState({ validContact: true });
      } else {
        this.setState({ validContact: false });
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

      this.props.CallUpdateContact({
        USERID: this.state.USERID,
        UPDATETYPE: this.state.UPDATETYPE,
        otp: otp,
        UpdatedValue: this.state.UpdatedValue,
      }); //submit otp
      this.setState({ startCountDown: false });
      this.stopTimer(60);
    }
  };

  handleCounter = (counter) => this.setState({ counter });

  submitpassword = (e) => {

    if (this.state.password.length > 0) {
      this.props.CallVerifyPassword(this.state);
      // this.checkPassword();
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
    if (this.state.UpdatedValue.length > 0) { this.props.CallSendOTP(this.state); }
    if (this.props.verifyOTP !== undefined && this.props.verifyOTP.length > 0) {
      this.stopTimer(60);
      this.setState({
        startCountDown: true,
        enableOTP: true,
        validContact: false,
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
    //   this.props.history.push("/EmporiaDev/account/profile");
    //   window.location.reload(false);
    // } else {
    // }
  };

  runTimer() {
    this.setState({ validContact: false });
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
    this.setState({ counter: counter, validContact: true });
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
              <title>{`ChangeContact — ${theme.name}`}</title>
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
                    Change Contact
                  </h5>
                  <div className="font font-subtitle">
                    Please key in the password for account verification purpose.
                  </div>
                  <Divider variant="fullWidth" className="dividerbottom" />
                  {/* <form
                    onSubmit={this.OnSubmitChangeContact}
                    className="container block"
                  > */}
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
                    <div className="tooltip_1 d-flex align-items-center">
                      <HelpOutlineIcon />
                      <div className="tooltiptext ">
                        Password is required to verify you are the owner of
                        this account
                      </div>
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
                  {/* </form> */}
                </div>
              </div>
            ) : (
              <div className="checkout block" style={{ width: "100%" }}>
                <div className="container" style={{ width: "100%" }}>
                  <div className="row contactrowStyle">
                    <div className=" font">
                      Your Current Contact Number is{" "}
                      {this.props.currentUser[0] !== undefined &&
                        this.props.currentUser[0].UserContactNo !== undefined &&
                        this.props.currentUser[0].UserContactNo !== null
                        ? this.censorContact(
                          this.props.currentUser[0].UserContactNo
                        )
                        : ["No Contact Number was found"]}
                    </div>
                  </div>
                  <div className="row contactrowStyle">
                    <div className="col-12 font">New Contact Number</div>
                    <div className="col-6 pr-0 font">
                      <PhoneInput
                        international
                        defaultCountry="MY"
                        value={this.state.UpdatedValue}
                        onChange={this.handleChangeforContact.bind(this)}
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
                          disabled={this.state.validContact ? false : true}
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
                              this.props.currentUser[0].UserEmailAddress !== undefined &&
                              this.props.currentUser[0].UserEmailAddress !== null
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
                        {/* <div className="col-4 d-flex align-items-center font">
                          {this.state.startCountDown === true
                            ? this.state.counter + " seconds is remaining"
                            : ""}
                        </div> */}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {/* <div className="row mt-4">
                    <div className="col-3" style={{ textAlign: "left" }}>
                      <button
                        variant="contained"
                        className="btn btn-primary "
                        onClick={this.submitOTP}
                        disabled={this.state.validOTP ? false : true}
                      >
                        <DoneIcon className="saveicon" />
                        Submit
                      </button>
                    </div>
                  </div> */}
                </div>
              </div>
            )}
          </React.Fragment>
        </CardContent>
      </Card>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageChangeContact);
