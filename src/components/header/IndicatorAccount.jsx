import React, { Component } from "react";
import { connect } from "react-redux";
import { GitAction } from "../../store/action/gitAction";
import { Link } from "react-router-dom";
import { Person20Svg } from "../../svg";
import { browserHistory } from "react-router";
import Indicator from "./Indicator";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Cookies from "universal-cookie";
import userImage from "../../assets/user.jpg";
const cookies = new Cookies();
function mapStateToProps(state) {
  return {
    currentUser: state.counterReducer["currentUser"],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    callLogout: (credentials) => dispatch(GitAction.CallLogout(credentials)),
    loginUser: (credentials) => dispatch(GitAction.CallLogin(credentials)),
  };
}

const backtoinventory = (e) => {
  localStorage.setItem("management", true);
};

class IndicatorAccount extends Component {
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
    console.log(this.state)
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

  logout = () => {
    this.props.callLogout({ UserID: localStorage.getItem("id") });
    browserHistory.push("/");
    localStorage.clear();
    cookies.set("isLogin", false);
    localStorage.setItem("isLogin", false);
    window.location.reload(false);
  };

  render() {
    // console.log(this.props.currentUser[0]);
    if (this.props.currentUser[0]) {
      // alert(JSON.stringify(this.props.currentUser[0]));
      localStorage.setItem("isLogin", true);
      localStorage.setItem("firstname", this.props.currentUser[0].FirstName);
      localStorage.setItem("lastname", this.props.currentUser[0].LastName);
      localStorage.setItem("role", this.props.currentUser[0].UserType);
      localStorage.setItem("roleid", this.props.currentUser[0].UserTypeID);
      localStorage.setItem("id", this.props.currentUser[0].UserID);
    } else {
      localStorage.setItem("isLogin", false);
    }

    const dropdown = (
      <div className="account-menu">
        {localStorage.getItem("isLogin") != "false" ? (
          <div>
            <div className="account-menu__divider" />
            <Link to="/account/dashboard" className="account-menu__user">
              <div className="account-menu__user-avatar">
                <img
                  className="img-responsive img-rounded"
                  src={userImage}
                  alt="User "
                />
              </div>
              <div className="account-menu__user-info">
                <div className="account-menu__user-name">
                  {localStorage.getItem("firstname")}
                  <strong> {localStorage.getItem("lastname")}</strong>
                </div>
                <div className="account-menu__user-email">
                  {localStorage.getItem("role")}
                </div>
              </div>
            </Link>
            <div className="account-menu__divider" />
            <ul className="account-menu__links">
              {/* {console.log(localStorage.getItem("roleid"))} */}
              {localStorage.getItem("roleid") <= 15 ? (
                <li onClick={() => backtoinventory("Dashboard")}>
                  <Link to="/dashboard">Inventory</Link>
                </li>
              ) : (
                ""
              )}
              <li>
                <Link to="/account/profile">My Profile</Link>
              </li>
              <li>
                <Link to="/account/addresses">My Addresses</Link>
              </li>
              <li>
                <Link to="/account/creditcard">My Credit Cards</Link>
              </li>
              <li>
                <Link to="/account/companyprofile">Company Profile</Link>
              </li>
              <li>
                <Link to="/account/orders">Order History</Link>
              </li>
              {/* <li>
                <Link to="/account/addresses">Addresses</Link>
              </li> */}
              <li>
                <Link to="/account/password">Password</Link>
              </li>
            </ul>
            <div className="account-menu__divider" />
            <ul className="account-menu__links account-menu__form-button">
              <li>
                <Button onClick={this.logout}>Logout</Button>
              </li>
            </ul>
          </div>
        ) : (
          <form className="account-menu__form" onSubmit={this.OnSubmitLogin}>
            <div className="account-menu__form-title">
              Log In to Your Account
            </div>
            <div className="form-group">
              <label htmlFor="header-signin-email" className="sr-only">
                Email address
              </label>
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
              <label htmlFor="header-signin-password" className="sr-only">
                Password
              </label>
              <div className="account-menu__form-forgot">
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
                <Link
                  to="/account/login"
                  className="account-menu__form-forgot-link"
                >
                  Forgot?
                </Link>
              </div>
            </div>
            <div className="form-group account-menu__form-button">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="btn btn-block"
              >
                login
              </Button>
            </div>
            <div className="account-menu__form-link">
              <Link to="/account/login">Create An Account</Link>
            </div>
          </form>
        )}
      </div>
    );

    return (
      <Indicator url="/account" dropdown={dropdown} icon={<Person20Svg />} />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndicatorAccount);
