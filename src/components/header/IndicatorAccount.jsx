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
    console.log(this.state)
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
    browserHistory.push("/");
    localStorage.clear();
    cookies.set("isLogin", false);
    localStorage.setItem("isLogin", false);
    window.location.reload(false);
  };

  toggleShow() {
    this.setState({ hidden: !this.state.hidden });
  }

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
        {localStorage.getItem("isLogin") !== "false" ? (
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
          <Dialog Dialog open={this.state.isToLogin} onClose={() => { this.setState({ isToLogin: false }) }} fullWidth={true} maxWidth="sm">
            <DialogTitle onClose={() => this.setState({ isToLogin: false })} id="login">Login</DialogTitle>
            <DialogContent dividers>
              <DialogContentText id="confirmation-dialog">
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
                {/* <div className="form-group">
                  <label htmlFor="header-signin-email" className="sr-only">
                    Username
                  </label>
                  <TextField
                    className="form-control"
                    id="text-field-controlled"
                    type="text"
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
                <div className="account-menu__form-link">
                  <Link to="/account/login">Create An Account</Link>
                </div> */}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={(e) => this.handleOnLogin(e)} color="secondary">
                Cancel
              </Button>
              <Button onClick={() => this.OnSubmitLogin()} color="primary">
                Login
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </div>
    );

    return (
      <Indicator url="/account" dropdown={dropdown} handleOnLogin={this.handleOnLogin} icon={<Person20Svg />} />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndicatorAccount);
