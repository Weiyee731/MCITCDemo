// React
import React, { Component } from "react";
import { connect } from "react-redux";
import { GitAction } from "../../store/action/gitAction";
import { Link, withRouter } from "react-router-dom";
import BookIcon from '@mui/icons-material/Book';

// Application
import { Person20Svg } from "../../svg";
import Indicator from "./Indicator";
import Cookies from "universal-cookie";
import userImage from "../../assets/user.jpg";

// Third-party
import Button from "@mui/material/Button";
import MuiDialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import { withStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import IconButton from "@mui/material/IconButton";


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


const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});


class IndicatorB_Mark extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: "",
      usernameErr: false,
      passwordErr: false,
      rememberMe: false,
      isToLogin: false,
      hidden: true,
      isLogout: false,
      openloginPopOut: false,
    };

    this.handleOnLogin = this.handleOnLogin.bind(this);
    this.OnSubmitLogin = this.OnSubmitLogin.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
    this.logout = this.logout.bind(this)
  }

  OnSubmitLogin(e) {
    this.props.loginUser(this.state);
  }

  handleOnLogin() {
    this.setState({
      isToLogin: !this.state.isToLogin
    })
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
    this.setState({ isLogout: true })
    window.localStorage.clear()
    cookies.set("isLogin", false);
    localStorage.setItem("isLogin", false);
    this.props.history.push("/");
  };



  toggleShow() {
    this.setState({ hidden: !this.state.hidden });
    this.setState({ openloginPopOut: !this.state.openloginPopOut })
  }


  render() {

    const getIndPopOutState = (loginPopOut) => {

      if (this.state.openloginPopOut === true)
        this.setState({ openloginPopOut: false })
    }
    
    const dropdown = (
      <div className="account-menu" style={{ zIndex: "10" }}>
        {localStorage.getItem("isLogin") !== "false" && (
          <div>
            <div className="account-menu__divider" />
            <Link to="/account/profile" className="account-menu__user">
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
              <li>
                <Link to="/account/profile">My Profile</Link>
              </li>
              <li>
                <Link to="/account/addresses">My Addresses</Link>
              </li>
              <li>
                <Link to="/account/orders">Order History</Link>
              </li>
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
        )}
      </div>
    );
    return (
      <>
        {localStorage.getItem("isLogin") !== "false" && localStorage.getItem("isLogin") !== null? (
          <Indicator url="/account" dropdown={dropdown} icon={<BookIcon sx={{color:"#1C1C1E"}}/>} />
        ) : (
          <>
            <Indicator onClick={(e) => this.setState({ openloginPopOut: !this.state.openloginPopOut })} loginPopOut={this.state.openloginPopOut} getIndPopOutState={getIndPopOutState} icon={<Person20Svg />} />
          </>

        )}
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(IndicatorB_Mark));
