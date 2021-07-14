import React, { Component } from "react";
import { connect } from "react-redux";
import { browserHistory } from "react-router";
import { GitAction } from "../../store/action/gitAction";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Cookies from "universal-cookie";
import Logo from "../../assets/Emporia.png";
import { toast } from "react-toastify";
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
  constructor() {
    super();
    this.OnSubmitLogin = this.OnSubmitLogin.bind(this);
  }

  state = {
    email: "",
    password: "",
    rememberMe: false,
  };

  OnSubmitLogin(e) {
    e.preventDefault();
    var email = e.target.firstChild.value;
    var password = e.target.firstChild.value;
    toast.success("email ", email);
    toast.success("password ", password);
    this.props.loginUser(this.state);
  }
  handleChange(e, type) {
    if (type === "email") {
      this.setState({
        email: e.target.value,
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

  render() {
    if (this.props.currentUser[0]) {
      toast.success(JSON.stringify(this.props.currentUser));
      browserHistory.push("/Emporia");
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
        toast.success(JSON.stringify(this.props.currentUser));
        browserHistory.push("/Emporia");
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
        toast.success(JSON.stringify(this.props.currentUser));
        browserHistory.push("/Emporia");
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
      window.location.reload(false);
    }
    return (
      <form onSubmit={this.OnSubmitLogin} className="container" style={{marginTop:"130px"}}>
        <div style={{ flex: 1, alignContent: "center", marginBottom: "1.5em" }}>
          <div style={{ width: "250px", height: "120px", margin: "auto" }}>
            <img
              src={Logo}
              alt="MCITC Logo"
              width="100%"
              style={{ marginLeft: "auto", marginRight: "auto" }}
            ></img>
          </div>
        </div>

        <h3 style={{ marginTop: "1.5em" }}>Sign In</h3>
        <div className="form-group">
          <label>Email address</label>
          {/* <input
            type="email"
            className="form-control"
            placeholder="Enter email"
          /> */}
          <TextField
            className="form-control"
            id="text-field-controlled"
            hintText="Email"
            value={this.state.email}
            onChange={({ target }) => {
              this.setState({ email: target.value });
            }}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          {/* <input
            type="password"
            className="form-control"
            placeholder="Enter password"
          /> */}
          <TextField
            className="form-control"
            id="text-field-controlled1"
            hintText="Password"
            value={this.state.password}
            type="password"
            onChange={({ target }) => {
              this.setState({ password: target.value });
            }}
          />
        </div>

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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="btn btn-block"
            // onClick={this.handleLogin}
          >
            Submit
          </Button>
        </div>
        <p className="forgot-password text-right">
          Forgot <a href="#">password?</a>
        </p>
      </form>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
