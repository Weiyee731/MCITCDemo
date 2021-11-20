// React
import React, { Component } from "react";
import { connect } from "react-redux";
import { GitAction } from "../../store/action/gitAction";
import { Link } from "react-router-dom";
import { browserHistory } from "react-router";

// Application
import { Person20Svg } from "../../svg";
import Indicator from "./Indicator";
import Cookies from "universal-cookie";
import userImage from "../../assets/user.jpg";

// Third-party
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import clsx from 'clsx';
import DialogContentText from '@material-ui/core/DialogContentText';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Divider from '@material-ui/core/Divider';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

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
      hidden: true
    };

    this.handleOnLogin = this.handleOnLogin.bind(this);
    this.OnSubmitLogin = this.OnSubmitLogin.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
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
    browserHistory.push("/Emporia");
    localStorage.clear();
    cookies.set("isLogin", false);
    localStorage.setItem("isLogin", false);
    window.location.reload(false);
  };

  toggleShow() {
    this.setState({ hidden: !this.state.hidden });
  }

  render() {
    if (this.props.currentUser[0]) {
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
              {localStorage.getItem("roleid") <= 15 && (
                <li onClick={() => backtoinventory("Dashboard")}>
                  <a href="/Emporia/dashboard" onClick={() => window.location.reload()}>Inventory</a>
                </li>
              )}
              <li>
                <Link to="/account/profile">My Profile</Link>
              </li>
              {/* <li>
                <Link to="/account/companyprofile">Company Profile</Link>
              </li> */}
              <li>
                <Link to="/account/addresses">My Addresses</Link>
              </li>
              <li>
                <Link to="/account/creditcard">My Credit Cards</Link>
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
        )}
      </div>
    );

    return (
      <>
        {localStorage.getItem("isLogin") !== "false" ? (
          <Indicator url="/account" dropdown={dropdown} icon={<Person20Svg />} />
        ) : (
          <Indicator url="/login" icon={<Person20Svg />} />
        )}
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndicatorAccount);
