import React, { Component } from "react";
import { connect } from "react-redux";
import { browserHistory } from "react-router";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import { GitAction } from "../../store/action/gitAction";
import "./home.component.css";
import "../../app/App.scss";
// import logo from "../../logo.svg";

function mapStateToProps(state) {
  return {
    gitData: state.counterReducer["gitData"],
    loader: state.counterReducer["loading"],
    currentUser: state.counterReducer["currentUser"],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    firefirebaseEvent: () => dispatch(GitAction.CallGetData("param")),
    signupUser: (credentials) => dispatch(GitAction.CallSignup(credentials)),
  };
}

class HomeComponent extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.OnSubmitLogin = this.OnSubmitLogin.bind(this);
  }
  state = {
    name: "",
    email: "",
    password: "",
  };
  OnSubmitLogin(e) {
    e.preventDefault();
    this.props.signupUser(this.state);
  }
  handleChange(e) {
    if (e.target.type === "email") {
      this.setState({
        email: e.target.value,
      });
    } else if (
      e.target.type === "text" &&
      e.target.placeholder.indexOf("password") === -1
    ) {
      this.setState({
        name: e.target.value,
      });
    } else {
      this.setState({
        password: e.target.value,
      });
    }
  }
  render() {
    const buttonStyle = { width: "100%" };
    if (this.props.currentUser && this.props.currentUser.email) {
      this.props.history.push("/complain");
    }
    return (
      <div className="App">
        <div className="App-header">
          <h1>Signup</h1>
        </div>
        <Paper className="Login-Panel">
          <form
            style={{ padding: "16px", margin: "0px" }}
            className="LoginForm"
            onSubmit={this.OnSubmitLogin}
          >
            <TextField
              id="text-field-controlled"
              helperText="Name"
              value={this.state.name}
              onChange={({ target }) => {
                this.setState({ name: target.value });
              }}
            />
            <br />
            <TextField
              id="text-field-controlled"
              helperText="Email"
              value={this.state.email}
              onChange={({ target }) => {
                this.setState({ email: target.value });
              }}
            />
            <br />
            <TextField
              id="text-field-controlled1"
              helperText="Password"
              value={this.state.password}
              type="password"
              onChange={({ target }) => {
                this.setState({ password: target.value });
              }}
            />

            <div className="LoginForm-Submit">
              <Button label="Signup" type="submit" style={buttonStyle} />
            </div>
          </form>
        </Paper>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
