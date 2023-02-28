// React
import React, { Component } from "react";
import { connect } from "react-redux";
import { GitAction } from "../../store/action/gitAction";
import { Link, withRouter } from "react-router-dom";
import { browserHistory } from "react-router";

// Application
import { Person20Svg } from "../../svg";
import Indicator from "./Indicator";
import Cookies from "universal-cookie";
import userImage from "../../assets/user.jpg";
import AccountDropdown from "./AccountDropdown";

// Third-party
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from '@mui/material/Dialog';
import MuiDialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import clsx from 'clsx';
import DialogContentText from '@mui/material/DialogContentText';
import CloseIcon from '@mui/icons-material/Close';
import { withStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import IconButton from "@mui/material/IconButton";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Divider from '@mui/material/Divider';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoginComponent from "../../pages/login/login.component";
var CryptoJS = require("crypto-js");

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

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

class IndicatorAccount extends Component {
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


  // componentDidUpdate(prevProps) {
  //   if (prevProps.currentUser !== this.props.currentUser) {
  //     if (this.state.isLogout === true && this.props.currentUser.length === 0) {
  //       setTimeout(() => {
  //         this.props.history.push("/");
  //         window.location.reload(false);
  //       }, 1000);
  //     }
  //   }
  // }

  toggleShow() {
    this.setState({ hidden: !this.state.hidden });
    this.setState({ openloginPopOut: !this.state.openloginPopOut })
  }


  render() {

    const getIndPopOutState = (loginPopOut) => {

      if (this.state.openloginPopOut === true)
        this.setState({ openloginPopOut: false })
    }
    // if (this.props.currentUser[0]) {
    //   localStorage.setItem("isLogin", true);
    //   localStorage.setItem("firstname", this.props.currentUser[0].FirstName);
    //   localStorage.setItem("lastname", this.props.currentUser[0].LastName);
    //   localStorage.setItem("role", this.props.currentUser[0].UserType);
    //   localStorage.setItem("roleid", this.props.currentUser[0].UserTypeID);
    //   localStorage.setItem("id", this.props.currentUser[0].UserID);
    // } else {
    //   localStorage.setItem("isLogin", false);
    // }

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
          <Indicator url="/account" dropdown={dropdown} icon={<Person20Svg />} />
        ) : (
          <>
            <Indicator onClick={(e) => this.setState({ openloginPopOut: !this.state.openloginPopOut })} loginPopOut={this.state.openloginPopOut} getIndPopOutState={getIndPopOutState} icon={<Person20Svg />} />
          </>

        )}
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(IndicatorAccount));
