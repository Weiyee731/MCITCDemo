/* eslint-disable jsx-a11y/anchor-is-valid */
// React
import React, { Component } from "react";
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

function mapStateToProps(state) {
  return {
    currentUser: state.counterReducer["currentUser"],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loginUser: (credentials) => dispatch(GitAction.CallLogin(credentials)),
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
    };
    this.toggleShow = this.toggleShow.bind(this);
    this.OnSubmitLogin = this.OnSubmitLogin.bind(this);
    this.responseFacebook = this.responseFacebook.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
  }

  OnSubmitLogin(e) {
    e.preventDefault();
    this.props.loginUser(this.state);
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
    console.log(response);
  }

  responseGoogle = (response) => {
    console.log(response);
  }

  render() {
    if (this.props.currentUser[0]) {
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
      browserHistory.push("/");
      window.location.reload(false);
    }

    return (
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
              >
                Sign In
              </button>
            </div>
            <p className="forgot-password text-right">
              <a href="#">Forgot password?</a>
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
                callback={() => this.responseFacebook()}
                cssClass="w-100 facebook-btn py-2 my-1"
                icon="fa-facebook"
                textButton="   FACEBOOK"
              />
              <GoogleLogin
                clientId="111111213444444" //CLIENTID NOT CREATED YET
                buttonText="GOOGLE"
                onSuccess={() => this.responseGoogle()}
                onFailure={() => this.responseGoogle()}
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
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
