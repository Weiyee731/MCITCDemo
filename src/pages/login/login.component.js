/* eslint-disable jsx-a11y/anchor-is-valid */
// React
import React, { Component, useEffect } from "react";
import { connect } from "react-redux";
import { browserHistory } from "react-router";
import { GitAction } from "../../store/action/gitAction";

// Application
import Logo from "../../assets/Emporia.png";

// Third-party
import TextField from "@material-ui/core/TextField";
import Cookies from "universal-cookie";
import { Row, Col } from "react-bootstrap"
import Divider from '@material-ui/core/Divider';
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from "@material-ui/core/Button";
import DialogContentText from '@material-ui/core/DialogContentText';
import emailjs from "emailjs-com"
import { toast } from "react-toastify";

function mapStateToProps(state) {
  return {
    currentUser: state.counterReducer["currentUser"],
    productcart: state.counterReducer["productcart"],
    wishlist: state.counterReducer["wishlist"],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loginUser: (credentials) => dispatch(GitAction.CallLogin(credentials)),
    CallViewProductCart: (propsData) => dispatch(GitAction.CallViewProductCart(propsData)),
    CallViewProductWishlist: (propsData) => dispatch(GitAction.CallViewProductWishlist(propsData)),
  };
}

const cookies = new Cookies();

class LoginComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      usernameErr: false,
      passwordErr: false,
      rememberMe: false,
      isToLogin: false,
      hidden: true,
      isForgetPassword: false,
      isResetEmailErr: false,
      resetEmail: "",
      sender: "EMPORIA",
      message: "http://localhost:3000/Emporia/resetpassword/"
    };
    this.toggleShow = this.toggleShow.bind(this);
    this.OnSubmitLogin = this.OnSubmitLogin.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
    this.responseFacebook = this.responseFacebook.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
  }

  OnSubmitLogin(e) {
    e.preventDefault();
    this.props.loginUser(this.state);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentUser !== this.props.currentUser) {
      if (this.props.currentUser[0].ReturnVal !== "0") {
        this.props.CallViewProductCart({ userID: this.props.currentUser[0].UserID })
        this.props.CallViewProductWishlist({ userID: this.props.currentUser[0].UserID })

        localStorage.setItem("isLogin", true);
        localStorage.setItem("firstname", this.props.currentUser[0].FirstName);
        localStorage.setItem("lastname", this.props.currentUser[0].LastName);
        localStorage.setItem("role", this.props.currentUser[0].UserType);
        localStorage.setItem("roleid", this.props.currentUser[0].UserTypeID);
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

          localStorage.setItem("firstname", this.props.currentUser[0].FirstName);
          cookies.set("firstname", this.props.currentUser[0].FirstName);
          localStorage.setItem("lastname", this.props.currentUser[0].LastName);
          cookies.set("lastname", this.props.currentUser[0].LastName);
          localStorage.setItem("role", this.props.currentUser[0].UserType);
          cookies.set("role", this.props.currentUser[0].UserType);
          localStorage.setItem("id", this.props.currentUser[0].UserID);
        } else {
          let date = new Date();
          date.setTime(date.getTime() + 60 * 60 * 24 * 1000);
          const options = { path: "/", expires: date };
          localStorage.setItem("isLogin", true);
          cookies.set("isLogin", true, options);

          cookies.set("rememberMe", this.state.rememberMe, options);
          localStorage.setItem("id", this.props.currentUser[0].UserID);

          localStorage.setItem("firstname", this.props.currentUser[0].FirstName);
          cookies.set("firstname", this.props.currentUser[0].FirstName, options);
          localStorage.setItem("lastname", this.props.currentUser[0].LastName);
          cookies.set("lastname", this.props.currentUser[0].LastName, options);
          localStorage.setItem("role", this.props.currentUser[0].UserType);
          localStorage.setItem("roleid", this.props.currentUser[0].UserTypeID);
          cookies.set("role", this.props.currentUser[0].UserType, options);
        }
        browserHistory.push("/Emporia");
        window.location.reload(false);
      } else {
        toast.error("The username and password does not match.")
      }
    }
  }

  toggleShow() {
    this.setState({ hidden: !this.state.hidden });
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
    console.log("facebook");
    console.log(response);
  }

  responseGoogle = (response) => {
    console.log("google");
    console.log(response);
  }

  resetPassword(e) {
    e.preventDefault()

    if (this.state.resetEmail !== "" && this.state.resetEmail.includes("@")) {
      emailjs.sendForm('service_ph326fk', 'template_pwxl4tf', e.target, 'user_c793YoEph6xtuh3ctKtsY')
        .then(res => {
          console.log(res)
          toast.success("Reset password message has been successfully sent to " + this.state.resetEmail)
          this.setState({ resetEmail: "", isForgetPassword: false })
        }).catch(err => console.log(err));
    }
    else {
      this.setState({ isResetEmailErr: true })
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.OnSubmitLogin} className="container block block--margin-top">
          <div className="text-center">
            <img
              src={Logo}
              alt="Emporia"
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
                  disabled={this.state.username !== '' && this.state.password !== '' ? false : true}
                >
                  Sign In
                </button>
              </div>
              <p className="forgot-password text-right">
                <label onClick={() => { this.setState({ isForgetPassword: true }) }}><b>Forgot password?</b></label>
              </p>
            </Col>
            <Divider orientation="vertical" flexItem />
            <Col lg="5" md="5">
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
                  New to Emporia? <a href="/signup"><b>Sign Up</b></a>
                </div>
              </div>
            </Col>
          </Row>
        </form>

        <Dialog open={this.state.isForgetPassword} onClose={() => { this.setState({ isForgetPassword: false }) }} fullWidth="true" maxWidth="xs">
          <DialogContent dividers>
            <div className="text-center">
              <img src={Logo} alt="Emporia" height="250px" width="auto" className="mx-auto" ></img>
            </div>
            <div className="text-center mt-2">
              <h5>Forget Password</h5>
            </div>
            <div className="text-center mt-1 mb-4" style={{ color: "#909090" }}>
              <label>Enter your email address below to reset password</label>
            </div>
            <form onSubmit={this.resetPassword} method="post">

              <div className="text-center my-4">
                <input id="sender" name="sender" variant="outlined" className="w-100 my-2" value={this.state.sender} hidden />
                <input id="message" name="resetPasswordLink" variant="outlined" className="w-100 my-2" value={this.state.message + this.state.resetEmail} hidden />
                <TextField id="username" label="Email Address" name="userEmail" variant="outlined" className="w-100 my-2" value={this.state.resetEmail} onChange={({ target }) => { this.setState({ resetEmail: target.value }) }} error={this.state.resetEmailErr} helperText={this.state.resetEmailErr && "Invalid Email"} />
                {this.state.isResetEmailErr && (
                  <p style={{ color: "#a31702", margin: "0px 0px 0px 10px", fontSize: "12px", }}  >
                    <strong>Please key in a valid email</strong>
                  </p>
                )}
              </div>
              <div className="text-center mb-5">
                <Button className="btn btn-primary" size="large" color="primary" variant="contained" type="submit" >
                  Reset Password
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>


    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
