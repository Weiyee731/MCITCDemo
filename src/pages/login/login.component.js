/* eslint-disable jsx-a11y/anchor-is-valid */
// React
import React, { Component, useEffect } from "react";
import { connect } from "react-redux";
import { browserHistory } from "react-router";
import { GitAction } from "../../store/action/gitAction";

// Application
import Logo from "../../assets/Emporia.png";

// Third-party
import TextField from "@mui/material/TextField";
import Cookies from "universal-cookie";
import { Row, Col } from "react-bootstrap"
import Divider from '@mui/material/Divider';
import IconButton from "@mui/material/IconButton";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from "@mui/material/Button";
import DialogContentText from '@mui/material/DialogContentText';
import { isEmailValid, isStringNullOrEmpty } from "../../Utilities/UtilRepo"
import emailjs from "emailjs-com"
import { toast } from "react-toastify";
import OtpInput from "react-otp-input";
import { Link } from "react-router-dom";
var CryptoJS = require("crypto-js");

function mapStateToProps(state) {
  return {
    currentUser: state.counterReducer["currentUser"],
    emailVerification: state.counterReducer["emailVerification"],
    verifyOTP: state.counterReducer["verifyOTP"],
    updatePassword: state.counterReducer["updatePassword"],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loginUser: (credentials) => dispatch(GitAction.CallLogin(credentials)),
    CallCheckUserExists: (credentials) => dispatch(GitAction.CallCheckUserExists(credentials)),
    CallResetCheckUserExists: (credentials) => dispatch(GitAction.CallResetCheckUserExists(credentials)),
    CallSendOTP: (credentials) => dispatch(GitAction.CallSendOTP(credentials)),
    CallUpdatePassword: (credentials) => dispatch(GitAction.CallUpdatePassword(credentials)),
  };
}

const cookies = new Cookies();

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

const initialState = {
  username: "",
  password: "",
  usernameErr: false,
  passwordErr: false,
  rememberMe: false,
  isToLogin: false,
  isForgetPassword: false,
  isResetEmailErr: false,
  verifyEmail: false,
  isReturn: false,
  resetEmail: "",
  resetUserID: "",
  isEmailVerify: false,
  UpdatedValue: "",

  showpassword: false,
  validpassword: false,
  validPassword: false,

  hidden: true,
  counter: 60,
  confirmPasswordPage: true,

  startCountDown: false,
  enableOTP: false,

  GETOTPTYPE: "EMAIL",
  UPDATETYPE: "PASSWORD",
  otp: "",
}

class LoginComponent extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.toggleShow = this.toggleShow.bind(this);
    this.OnSubmitLogin = this.OnSubmitLogin.bind(this);
    // this.resetPassword = this.resetPassword.bind(this);
    this.verifyEmail = this.verifyEmail.bind(this);
    this.responseFacebook = this.responseFacebook.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
  }

  OnSubmitLogin(e) {
    e.preventDefault();
    this.props.loginUser(this.state);
  }

  encryptData(data) {

    console.log("data", data)
    var ciphertext = CryptoJS.AES.encrypt(data, 'myemporia@123').toString().replace(/\+/g,'p1L2u3S').replace(/\//g,'s1L2a3S4h').replace(/=/g,'e1Q2u3A4l');

    return ciphertext
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentUser !== this.props.currentUser) {
      if (this.props.currentUser !== undefined && this.props.currentUser[0].ReturnVal !== "0") {

        localStorage.setItem("isLogin", true);
        localStorage.setItem("firstname", this.props.currentUser[0].FirstName);
        localStorage.setItem("lastname", this.props.currentUser[0].LastName);
        localStorage.setItem("role", this.props.currentUser[0].UserType);
        localStorage.setItem("roleid", this.props.currentUser[0].UserTypeID);
        localStorage.setItem("userName", this.state.username);
        localStorage.setItem("password", this.encryptData(this.state.password));
        localStorage.setItem("username_encrypt", this.encryptData(this.state.username));
        localStorage.setItem(
          "productEndorsementBadge",
          this.props.currentUser[0].productEndorsementBadge
        );
        localStorage.setItem(
          "productBadge",
          this.props.currentUser[0].productBadge
        );
        localStorage.setItem("id", this.props.currentUser[0].UserID);

        if (this.state.rememberMe === false) {
          localStorage.setItem("isLogin", true);
          cookies.set("isLogin", true);

          cookies.set("rememberMe", this.state.rememberMe);
          localStorage.setItem("userName", this.state.username);
          localStorage.setItem("username_encrypt", this.encryptData(this.state.username));
          localStorage.setItem("password", this.encryptData(this.state.password));
          localStorage.setItem("firstname", this.props.currentUser[0].FirstName);
          cookies.set("firstname", this.props.currentUser[0].FirstName);
          localStorage.setItem("lastname", this.props.currentUser[0].LastName);
          cookies.set("lastname", this.props.currentUser[0].LastName);
          localStorage.setItem("role", this.props.currentUser[0].UserType);
          cookies.set("role", this.props.currentUser[0].UserType);
          localStorage.setItem("id", this.props.currentUser[0].UserID);


          localStorage.setItem("email", this.props.currentUser[0].UserEmailAddress);
          localStorage.setItem("contact", this.props.currentUser[0].UserContactNo);
        } else {
          let date = new Date();
          date.setTime(date.getTime() + 60 * 60 * 24 * 1000);
          const options = { path: "./", expires: date };
          localStorage.setItem("isLogin", true);
          cookies.set("isLogin", true, options);
          cookies.set("rememberMe", this.state.rememberMe, options);
          localStorage.setItem("id", this.props.currentUser[0].UserID);
          localStorage.setItem("userName", this.state.username);
          localStorage.setItem("username_encrypt", this.encryptData(this.state.username));
          localStorage.setItem("password", this.encryptData(this.state.password));
          localStorage.setItem("firstname", this.props.currentUser[0].FirstName);
          cookies.set("firstname", this.props.currentUser[0].FirstName, options);
          localStorage.setItem("lastname", this.props.currentUser[0].LastName);
          cookies.set("lastname", this.props.currentUser[0].LastName, options);
          localStorage.setItem("role", this.props.currentUser[0].UserType);
          localStorage.setItem("roleid", this.props.currentUser[0].UserTypeID);
          cookies.set("role", this.props.currentUser[0].UserType, options);

          localStorage.setItem("email", this.props.currentUser[0].UserEmailAddress);
          localStorage.setItem("contact", this.props.currentUser[0].UserContactNo);
        }
        console.log("this.props.currentUser[0]", this.props.currentUser[0])

        // if (localStorage.getItem("isLogin") === true) {
        // this.props.CallViewProductCart({ userID: this.props.currentUser[0].UserID })
        // this.props.CallViewProductWishlist({ userID: this.props.currentUser[0].UserID })
        // }

        browserHistory.push("/");
        window.location.reload(false);
      } else {
        toast.error("The username and password does not match.")
      }
    }
    if (this.props.emailVerification.length > 0 && this.state.verifyEmail === true && this.state.isReturn === false) {
      if (this.props.emailVerification[0].UserID !== undefined) {
        this.setState({ resetUserID: this.props.emailVerification[0].UserID, isEmailVerify: true, verifyEmail: false, isReturn: true })
      }
      else {
        toast.warning("This email was not registered")
        this.setState({ isReturn: true })
      }
      this.props.CallResetCheckUserExists()
    }

    if (prevProps.updatePassword !== this.props.updatePassword) {
      if (this.props.updatePassword && this.props.updatePassword[0].ReturnMsg === "The Password had Changed") {
        toast.success("Your password has been updated, try to login with new password");
        setTimeout(() => {
          browserHistory.push("/login");
          window.location.reload(false);
        }, 3000)

      } else {
        toast.warn("The OTP key are incorrect. Please try again");
      }
    }
  }

  toggleShow() {
    this.setState({ hidden: !this.state.hidden });
  }

  handleChangeforPassword(e) {
    var passwordPattern =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/im;
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
        USERID: this.state.resetUserID,
        UPDATETYPE: this.state.UPDATETYPE,
        otp: otp,
        UpdatedValue: this.state.UpdatedValue
      });
      this.setState({ startCountDown: false });
      this.stopTimer(60);
    }
  };

  handleCounter = (counter) => this.setState({ counter });


  censorEmail = (email) => {
    if (email !== null && email.length > 5) {
      var arr = email.split("@");
      return this.censorWord(arr[0]) + "@" + arr[1];
    } else return "No email was found";
  };

  censorWord = (str) => {
    return str[0] + "*".repeat(str.length - 2) + str.slice(-1);
  };

  verifyEmail() {

    if (isEmailValid(this.state.resetEmail))
      this.props.CallCheckUserExists({ Email: this.state.resetEmail, Value: "forgetPassword" })

    // this.props.CallCheckUserExists({ Email: this.state.resetEmail, Value: "forgetPassword" })
    this.setState({ verifyEmail: true, isReturn: false })
  }

  getNewOTP = (e) => {
    this.props.CallSendOTP({
      USERID: this.state.resetUserID,
      GETOTPTYPE: this.state.GETOTPTYPE,
      UpdatedValue: this.state.UPDATETYPE
    }); //send otp.

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

  stopTimer(counter) {
    clearInterval(this.timerId); // stop/pause the timer
    this.setState({ counter: counter, validPassword: true });
  }

  handleChange(e, type) {
    if (type === "username") {
      this.setState({
        username: e.target.value,
      });
    } else if (type === "password") {
      this.setState({
        password: e.target.value,
      });
    } else if (type === "rememberMe") {
      this.setState({
        rememberMe: e.target.checked,
      });
    }
  }

  responseFacebook = (response) => {
    console.log(response);
  }

  responseGoogle = (response) => {
    console.log(response);
  }

  // resetPassword(e) {
  //   e.preventDefault()

  //   if (this.state.resetEmail !== "" && this.state.resetEmail.includes("@")) {
  //     emailjs.sendForm('service_ph326fk', 'template_pwxl4tf', e.target, 'user_c793YoEph6xtuh3ctKtsY')
  //       .then(res => {
  //         toast.success("Reset password message has been successfully sent to " + this.state.resetEmail)
  //         this.setState({ resetEmail: "", isForgetPassword: false })
  //       }).catch(err => console.log(err));
  //   }
  //   else {
  //     this.setState({ isResetEmailErr: true })
  //   }
  // }



  render() {

    return (
      <div>
        <form onSubmit={this.OnSubmitLogin} className="container block block--margin-top">
          <div className="text-center">
            <img
              src={Logo}
              alt="MyEmporia"
              height="250px"
              width="auto"
              className="mx-auto"
            ></img>
          </div>
          <Row className="justify-content-center">
            <Col lg="5" md="5">
              <h4>Sign In</h4>
              <TextField id="username" label="Username" variant="outlined" className="w-100 my-2" value={this.state.username} onChange={({ target }) => { this.setState({ username: target.value }) }} error={this.state.usernameErr} helperText={this.state.usernameErr && "Invalid username"} />
              <FormControl variant="outlined" className="w-100 my-2">
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  id="password"
                  label="Password" 
                  error={this.state.passwordErr}
                  type={this.state.hidden ? 'password' : 'text'}
                  value={this.state.password}
                  onChange={({ target }) => { this.setState({ password: target.value }) }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={this.toggleShow}
                      >
                        {this.state.hidden ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {this.state.passwordErr && <FormHelperText style={{ color: "red" }}>Invalid password</FormHelperText>}
              </FormControl>
              <div className="form-group">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customCheck1"
                    value={this.state.rememberMe}
                    onChange={({ target }) => {
                      this.setState({ rememberMe: target.checked });
                    }}
                  />
                  <label className="custom-control-label" htmlFor="customCheck1">
                    Remember me
                  </label>
                </div>
              </div>
              <div className="LoginForm-Submit">
                <button
                  type="submit"
                  variant="contained"
                  className="btn btn-primary w-100"
                  style={{borderRadius:"5px"}}
                  disabled={this.state.username !== '' && this.state.password !== '' ? false : true}
                >
                  Sign In
                </button>
              </div>
              <div className="row">
                <div className="col-6">
                  <p className=" text-left" style={{ fontSize: "13px", paddingTop: "10px" }}>
                    New to MyEmporia?
                    {/* <Link className="nav-link" to={"/signup"}>
                      Sign Up
                    </Link> */}
                    <label onClick={() =>
                      <>
                        {browserHistory.push("/signup")}
                        {window.location.reload(false)}
                      </>
                    }>
                      Sign Up
                    </label>
                    {/* <a href="/signup"><b>Sign Up</b></a> */}
                  </p>
                </div>
                <div className="col-6">
                  <p className="forgot-password text-right">
                    <label onClick={() => { this.setState({ isForgetPassword: true }) }}><b>Forgot password?</b></label>
                  </p>
                </div>
              </div>

            </Col>
            {/* <Divider orientation="vertical" flexItem /> */}
            {/* <Col lg="5" md="5">
              <h4>Login with</h4>
              <div className="justify-content-center text-center">
                <FacebookLogin
                  appId="1088597931155576"
                  autoLoad={false}
                  fields="name,email,picture"
                  callback={(e) => this.responseFacebook(e)}
                  cssClass="w-100 facebook-btn py-2 my-1"
                  icon="fa-facebook"
                  textButton="   FACEBOOK"
                />
                <GoogleLogin
                  clientId="111111213444444" //CLIENTID NOT CREATED YET
                  buttonText="GOOGLE"
                  onSuccess={(e) => this.responseGoogle(e)}
                  onFailure={(e) => this.responseGoogle(e)}
                  className="w-100 justify-content-center my-1"
                />
                <hr />
                <div>
                  New to MyEmporia? <a href="/signup"><b>Sign Up</b></a>
                </div>
              </div>
            </Col> */}
          </Row>
        </form>

        <Dialog open={this.state.isForgetPassword} onClose={() => { this.setState(initialState) }} fullWidth="true" maxWidth="xs">
          <DialogContent dividers>
            <div className="text-center">
              <img src={Logo} alt="Emporia" height="250px" width="auto" className="mx-auto" ></img>
            </div>
            <div className="text-center mt-2">
              <h5>Forget Password</h5>
            </div>

            {
              this.state.isEmailVerify === false ?
                (
                  <>
                    <div className="text-center mt-1 mb-4" style={{ color: "#909090" }}>
                      <label>Enter your email address below to reset password</label>
                    </div>
                    <div className="text-center my-4">
                      <TextField id="username" label="Email Address" name="userEmail" variant="outlined" className="w-100 my-2" value={this.state.resetEmail} onChange={({ target }) => { this.setState({ resetEmail: target.value }) }} error={this.state.resetEmailErr} helperText={this.state.resetEmailErr && "Invalid Email"} />
                      {this.state.isResetEmailErr && (
                        <p style={{ color: "#a31702", margin: "0px 0px 0px 10px", fontSize: "12px", }}  >
                          <strong>Please key in a valid email</strong>
                        </p>
                      )}
                    </div>
                    <div className="text-center mb-5">
                      <Button className="btn btn-primary" size="large" color="primary" variant="contained" type="submit" onClick={() => this.verifyEmail()}>
                        Confirm Email
                      </Button>
                    </div>
                  </>
                ) :
                (
                  <>
                    <div className="text-center mt-1 mb-4" style={{ color: "#909090" }}>
                      <label>Please Key In New Password</label>
                    </div>
                    <div className="text-center my-4">
                      <TextField
                        id="newpassword"
                        size="small"
                        className="font"
                        variant="outlined"
                        error={this.state.passwordErr}
                        type={this.state.hidden ? "password" : "text"}
                        value={this.state.UpdatedValue}
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
                      {this.state.validPassword === false && this.state.UpdatedValue !== "" && this.state.startCountDown === false && (
                        <FormHelperText style={{ color: "red" }}>
                          Invalid password
                        </FormHelperText>
                      )}
                    </div>

                    <div className="font link-button change-contact-mail" style={{ textAlign: "right" }}>
                      {this.state.startCountDown === true ? (
                        <div className="link-button" disabled>
                          {this.state.counter + " seconds is remaining"}
                        </div>
                      ) : (
                        <button
                          className="font link-button change-contact-mail"
                          disabled={this.state.validPassword ? false : true}
                          onClick={() => this.getNewOTP()}
                        >
                          {" "}
                          Send OTP to my email
                        </button>
                      )}
                    </div>

                    {this.state.enableOTP ? (
                      <div>
                        <div className="row contactrowStyle">
                          <div className="col-6">
                            <p className=" font">
                              Enter the code we sent to your email{" "}
                              {this.state.resetEmail.length > 0 && this.censorEmail(this.state.resetEmail)}
                            </p>
                          </div>
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
                        </div>
                      </div>
                    ) : (
                      ""
                    )}

                    {/* <div className="text-center mb-5">
                      <Button className="btn btn-primary" size="large" color="primary" variant="contained" type="submit" onClick={() => this.verifyEmail()}>
                        Send OTP
                      </Button>
                    </div> */}

                  </>
                )
            }

            {/* </form> */}
          </DialogContent>
        </Dialog>
      </div>


    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
