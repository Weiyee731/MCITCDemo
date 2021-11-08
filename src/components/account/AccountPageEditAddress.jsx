// react
import React, { Component } from "react";

// third-party
import { Helmet } from "react-helmet-async";
import { connect } from "react-redux";
// data stubs
import "react-step-progress/dist/index.css";
import { GitAction } from "../../store/action/gitAction";
import theme from "../../data/theme";
import { Card, CardContent } from "@material-ui/core";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import "../../app/App.scss";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";

function mapStateToProps(state) {
  return {
    countrylist: state.counterReducer["countries"],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    CallUpdateAddress: (prodData) =>
      dispatch(GitAction.CallUpdateAddress(prodData)),
    CallCountry: () => dispatch(GitAction.CallCountry()),
  };
}

class AccountPageEditAddress extends Component {
  constructor(props) {
    super(props);

    let addressdetails = this.props.selectedAddressData;
    this.state = {
      Address: addressdetails.UserAddressName,
      USERID: JSON.parse(window.localStorage.getItem("id")),
      ContactNo: addressdetails.UserContactNo,
      email: addressdetails.UserEmail,
      USERADDRESSLINE1: addressdetails.UserAddressLine1,
      USERADDRESSLINE2: addressdetails.UserAddressLine1,
      USERPOSCODE: addressdetails.UserPoscode,
      USERSTATE: addressdetails.UserState,
      USERCITY:addressdetails.UserCity,
      COUNTRYID:addressdetails.CountryID,
      AddressBookNo: this.props.selectedAddressData.UserAddressBookID,
    };
    this.editAddress = this.editAddress.bind(this);
    this.selectCountry = this.selectCountry.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.props.CallCountry();
  }

  handleChange(data, e) {
    if (data === "Address") {
      this.setState({
        Address: e.target.value,
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
    } else if (data === "USERCITY") {
      this.setState({
        USERCITY: e.target.value,
      });
    } else {
    }
  }

  selectCountry = (event) => {
    this.setState({ COUNTRYID: event.target.value });
  };

  editAddress() {
    this.props.CallUpdateAddress(this.state);
    this.props.parentCallback(false);
  }

  render() {
    let addressInfo = this.props.selectedAddressData;

    return (
      <div className="card">
        <Helmet>
          <title>{`Edit Address — ${theme.name}`}</title>
        </Helmet>

        <div className="card-header">
          <h5>Edit Address</h5>
        </div>
        <div className="card-divider" />
        <div className="card-body">
          <div className="row no-gutters">
            <div className="col-12 col-lg-12 col-xl-12">
              <div className="form-group">
                <TextField
                  label="Recipient Name"
                  id="outlined-size-Name"
                  variant="outlined"
                  defaultValue={addressInfo.UserAddressName}
                  style={{ width: "100%" }}
                  size="small"
                  onChange={this.handleChange.bind(this, "Address")}
                />
              </div>

              <div className="form-row">
                <div className="form-group col-md-6">
                  <TextField
                    label="Email address"
                    id="outlined-size-Email"
                    variant="outlined"
                    defaultValue={addressInfo.UserEmail}
                    style={{ width: "100%" }}
                    size="small"
                    onChange={this.handleChange.bind(this, "email")}
                  />
                </div>

                <div className="form-group col-md-6">
                  <TextField
                    label="Contact Number"
                    id="outlined-size-Contact"
                    variant="outlined"
                    defaultValue={addressInfo.UserContactNo}
                    style={{ width: "100%" }}
                    size="small"
                    onChange={this.handleChange.bind(this, "ContactNo")}
                  />
                </div>
              </div>

              <div className="form-group">
                <TextField
                  label="Address Line 1"
                  id="outlined-size-Address1"
                  variant="outlined"
                  defaultValue={addressInfo.UserAddressLine1}
                  style={{ width: "100%" }}
                  size="small"
                  onChange={this.handleChange.bind(this, "USERADDRESSLINE1")}
                />
              </div>
              <div className="form-group">
                <TextField
                  label="Address Line 2"
                  id="outlined-size-Address2"
                  variant="outlined"
                  defaultValue={addressInfo.UserAddressLine2}
                  style={{ width: "100%" }}
                  size="small"
                  onChange={this.handleChange.bind(this, "USERADDRESSLINE2")}
                />
              </div>

              <div className="form-row">
                <div className="form-group col-md-6">
                  <TextField
                    label="Postcode / ZIP"
                    id="outlined-size-Postcode"
                    variant="outlined"
                    defaultValue={addressInfo.UserPoscode}
                    style={{ width: "100%" }}
                    size="small"
                    onChange={this.handleChange.bind(this, "USERPOSCODE")}
                  />
                </div>

                <div className="form-group col-md-6">
                  <TextField
                    label="Town / City"
                    id="outlined-size-City"
                    variant="outlined"
                    defaultValue={addressInfo.UserCity}
                    style={{ width: "100%" }}
                    size="small"
                    onChange={this.handleChange.bind(this, "USERCITY")}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <TextField
                    label="State"
                    id="outlined-size-State"
                    variant="outlined"
                    defaultValue={addressInfo.UserState}
                    style={{ width: "100%" }}
                    size="small"
                    onChange={this.handleChange.bind(this, "USERSTATE")}
                  />
                </div>
                <div className="form-group col-md-6">
                  <FormControl
                    variant="filled"
                    size="small"
                    style={{ width: "100%" }}
                  >
                    <Select
                      id="Country"
                      variant="outlined"
                      defaultValue={addressInfo.CountryID}
                      value={this.option}
                      size="small"
                      onChange={this.selectCountry}
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
            </div>

            <div className="form-group mt-3 mb-0">
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => this.editAddress()}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountPageEditAddress);
