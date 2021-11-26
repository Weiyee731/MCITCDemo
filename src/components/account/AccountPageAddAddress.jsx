// react
import React, { Component } from "react";

// third-party
import { Helmet } from "react-helmet-async";
import { connect } from "react-redux";
// data stubs
import "react-step-progress/dist/index.css";
import { GitAction } from "../../store/action/gitAction";
import theme from "../../data/theme";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import "react-phone-number-input/style.css";
import { isContactValid, isEmailValid, isStringNullOrEmpty } from "../../Utilities/UtilRepo"
import "../../app/App.scss";

import { toast } from "react-toastify";

function mapStateToProps(state) {
  return {
    addresses: state.counterReducer["addresses"],
    countrylist: state.counterReducer["countries"],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    CallAddAddress: (prodData) => dispatch(GitAction.CallAddAddress(prodData)),
    CallCountry: () => dispatch(GitAction.CallCountry()),
  };
}

class AccountPageAddAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: "",
      USERID: JSON.parse(window.localStorage.getItem("id")),
      ContactNo: "",
      email: "",
      USERADDRESSLINE1: "",
      USERADDRESSLINE2: "",
      USERPOSCODE: "",
      USERSTATE: "",
      USERCITY: "",
      COUNTRYID: 148,
      // COUNTRYID: "1",
    };
    this.addAddress = this.addAddress.bind(this);
    this.selectCountry = this.selectCountry.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.props.CallCountry();
  }

  handleChange(data, e) {

    if (data === "Name") {
      this.setState({
        Name: e.target.value,
      });
    } else if (data === "ContactNo") {
      this.setState({
        ContactNo: e.target.value,
      });
    } else if (data === "email") {
      this.setState({
        email: e.target.value,
      });
    } else if (data === "USERADDRESSLINE1") {
      this.setState({
        USERADDRESSLINE1: e.target.value,
      });
    } else if (data === "USERADDRESSLINE2") {
      this.setState({
        USERADDRESSLINE2: e.target.value,
      });
    } else if (data === "USERPOSCODE") {
      this.setState({
        USERPOSCODE: e.target.value,
      });
    } else if (data === "USERSTATE") {
      this.setState({
        USERSTATE: e.target.value,
      });
    } else if (data === "USERCOUNTRYID") {
      this.setState({
        COUNTRYID: e.target.value,
      });
    } else if (data === "USERCITY") {
      this.setState({
        USERCITY: e.target.value,
      });
    } else {
    }
  }


  selectCountry(val) {
    this.setState({ COUNTRYID: val });
  }

  addAddress() {
    if (
      !isStringNullOrEmpty(this.state.Name) &&
      isContactValid(this.state.ContactNo) &&
      isEmailValid(this.state.email) &&
      !isStringNullOrEmpty(this.state.USERADDRESSLINE1) &&
      !isStringNullOrEmpty(this.state.USERADDRESSLINE2) &&
      !isStringNullOrEmpty(this.state.USERSTATE) &&
      !isStringNullOrEmpty(this.state.USERCITY) &&
      !isStringNullOrEmpty(this.state.COUNTRYID)
    ) {
      this.props.CallAddAddress(this.state);
      this.props.parentCallback(false);
    } else {
      toast.error("Please fill in all required data");
    }
  }

  render() {
    return (
      <div className="card">
        <Helmet>
          <title>{`Add Address — ${theme.name}`}</title>
        </Helmet>

        <div className="card-header">
          <h4>Add Address</h4>
        </div>
        <div className="card-divider" />
        <div className="card-body">
          <div className="row no-gutters">
            <div className="col-12 col-lg-12 col-xl-12">
              <div className="form-group">
                <TextField
                  label="Recipient Name"
                  id="outlined-size-normal"
                  variant="outlined"
                  style={{ width: "100%" }}
                  size="small"
                  onChange={this.handleChange.bind(this, "Name")}
                  required
                />
                {isStringNullOrEmpty(this.state.Name) && this.state.Name.length > 0 && (
                  <FormHelperText style={{ color: "red" }}>   Invalid Recipient Name </FormHelperText>
                )}
              </div>

              <div className="form-row">
                <div className="form-group col-md-6">
                  <TextField
                    label="Email address"
                    id="outlined-size-normal"
                    variant="outlined"
                    style={{ width: "100%" }}
                    size="small"
                    onChange={this.handleChange.bind(this, "email")}
                    required
                  />
                  {!isEmailValid(this.state.email) && this.state.email.length > 0 && (
                    <FormHelperText style={{ color: "red" }}>   Invalid Email </FormHelperText>
                  )}
                </div>

                <div className="form-group col-md-6">
                  <TextField
                    label="Contact Number"
                    id="outlined-size-normal"
                    variant="outlined"
                    style={{ width: "100%" }}
                    size="small"
                    onChange={this.handleChange.bind(this, "ContactNo")}
                    required
                  />
                  {!isContactValid(this.state.ContactNo) && this.state.ContactNo.length > 0 && (
                    <FormHelperText style={{ color: "red" }}>   Invalid Contact Number </FormHelperText>
                  )}
                </div>
              </div>

              <div className="form-group">
                <TextField
                  label="Address Line 1"
                  id="outlined-size-normal"
                  variant="outlined"
                  style={{ width: "100%" }}
                  size="small"
                  onChange={this.handleChange.bind(this, "USERADDRESSLINE1")}
                  required
                />
                {isStringNullOrEmpty(this.state.USERADDRESSLINE1) && this.state.USERADDRESSLINE1.length > 0 && (
                  <FormHelperText style={{ color: "red" }}>   Invalid Address </FormHelperText>
                )}
              </div>
              <div className="form-group">
                <TextField
                  label="Address Line 2"
                  id="outlined-size-normal"
                  variant="outlined"
                  style={{ width: "100%" }}
                  size="small"
                  onChange={this.handleChange.bind(this, "USERADDRESSLINE2")}
                  required
                />
                {isStringNullOrEmpty(this.state.USERADDRESSLINE2) && this.state.USERADDRESSLINE2.length > 0 && (
                  <FormHelperText style={{ color: "red" }}>   Invalid Address </FormHelperText>
                )}
              </div>

              <div className="form-row">
                <div className="form-group col-md-6">
                  <TextField
                    label="Postcode / ZIP"
                    id="outlined-size-normal"
                    variant="outlined"
                    style={{ width: "100%" }}
                    size="small"
                    onChange={this.handleChange.bind(this, "USERPOSCODE")}
                    required
                  />
                  {isNaN(this.state.USERPOSCODE) && this.state.USERPOSCODE.length > 0 && (
                    <FormHelperText FormHelperText style={{ color: "red" }}>   Invalid Poscode </FormHelperText>
                  )}
                </div>

                <div className="form-group col-md-6">
                  <TextField
                    label="Town / City"
                    id="outlined-size-normal"
                    variant="outlined"
                    style={{ width: "100%" }}
                    size="small"
                    onChange={this.handleChange.bind(this, "USERCITY")}
                    required
                  />
                  {isStringNullOrEmpty(this.state.USERCITY) && this.state.USERCITY.length > 0 && (
                    <FormHelperText style={{ color: "red" }}>   Invalid City </FormHelperText>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col-md-6">
                  <TextField
                    label="State"
                    id="outlined-size-normal"
                    variant="outlined"
                    style={{ width: "100%" }}
                    size="small"
                    onChange={this.handleChange.bind(this, "USERSTATE")}
                    required
                  />
                  {isStringNullOrEmpty(this.state.USERSTATE) && this.state.USERSTATE.length > 0 && (
                    <FormHelperText style={{ color: "red" }}>   Invalid State </FormHelperText>
                  )}
                </div>

                <div className="form-group col-md-6">
                  <FormControl
                    variant="filled"
                    size="small"
                    style={{ width: "100%" }}
                  >
                    <Select
                      id="Country"
                      // label="Country"
                      variant="outlined"
                      defaultValue={1}
                      value={this.state.COUNTRYID}
                      size="small"
                      onChange={this.handleChange.bind(this, "USERCOUNTRYID")}
                      style={{
                        textAlign: "left",
                        width: "100%",
                      }}
                    >
                      {this.props.countrylist.map((country) => (
                        <option
                          value={country.CountryId}
                          key={country.CountryId}
                        >
                          {country.CountryName}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="form-group mt-3 mb-0">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => this.addAddress()}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div >
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountPageAddAddress);
