// react
import React, { Component } from "react";

// third-party
import { Helmet } from "react-helmet-async";
import { connect } from "react-redux";
// data stubs
import { GitAction } from "../../store/action/gitAction";
import theme from "../../data/theme";
import { Card, CardContent, InputLabel, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import { isArrayNotEmpty, isContactValid, isEmailValid, isStringNullOrEmpty } from "../../Utilities/UtilRepo"
import FormControl from "@mui/material/FormControl";
import { toast } from "react-toastify";

function mapStateToProps(state) {
  return {
    countrylist: state.counterReducer["countries"],
    states: state.counterReducer["states"],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    CallUpdateAddress: (prodData) =>
      dispatch(GitAction.CallUpdateAddress(prodData)),
    CallCountry: () => dispatch(GitAction.CallCountry()),
    CallState: () => dispatch(GitAction.CallState()),
  };
}

class AccountPageEditAddress extends Component {
  constructor(props) {
    super(props);

    let addressdetails = this.props.selectedAddressData;
    this.state = {
      Name: addressdetails.UserAddressName,
      USERID: JSON.parse(window.localStorage.getItem("id")),
      ContactNo: addressdetails.UserContactNo,
      email: addressdetails.UserEmail,
      USERADDRESSLINE1: addressdetails.UserAddressLine1,
      USERADDRESSLINE2: addressdetails.UserAddressLine1,
      USERPOSCODE: addressdetails.UserPoscode,
      USERSTATE: addressdetails.UserState,
      USERCITY: addressdetails.UserCity,
      COUNTRYID: addressdetails.CountryID,
      AddressBookNo: this.props.selectedAddressData.UserAddressBookID,
    };
    this.editAddress = this.editAddress.bind(this);
    this.selectCountry = this.selectCountry.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.props.CallCountry();
    this.props.CallState();
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
    if (!isStringNullOrEmpty(this.state.Name) &&
      isContactValid(this.state.ContactNo) &&
      isEmailValid(this.state.email) &&
      !isStringNullOrEmpty(this.state.USERADDRESSLINE1) &&
      !isStringNullOrEmpty(this.state.USERADDRESSLINE2) &&
      !isStringNullOrEmpty(this.state.USERPOSCODE) &&
      !isNaN(this.state.USERPOSCODE) &&
      !isStringNullOrEmpty(this.state.USERSTATE) &&
      !isStringNullOrEmpty(this.state.USERCITY) &&
      !isStringNullOrEmpty(this.state.COUNTRYID)) {

      this.props.CallUpdateAddress(this.state);
      this.props.parentCallback(false);
    } else {
      toast.error("Please fill in all required data");
    }

  }

  render() {
    let addressInfo = this.props.selectedAddressData;
    const selectedCity = this.props.states.filter((x) => x.State === this.state.USERSTATE).map((y) => JSON.parse(y.CityDetail))
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
                  onChange={this.handleChange.bind(this, "Name")}
                />
                {isStringNullOrEmpty(this.state.Name) && (
                  <FormHelperText style={{ color: "red" }}>   Invalid Recipient Name </FormHelperText>
                )}
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
                  {!isEmailValid(this.state.email)&& (
                    <FormHelperText style={{ color: "red" }}>   Invalid Email </FormHelperText>
                  )}
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
                  {!isContactValid(this.state.ContactNo) && (
                    <FormHelperText style={{ color: "red" }}>   Invalid Contact Number </FormHelperText>
                  )}
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
                {isStringNullOrEmpty(this.state.USERADDRESSLINE1) && (
                  <FormHelperText style={{ color: "red" }}>   Invalid Address </FormHelperText>
                )}
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
                {isStringNullOrEmpty(this.state.USERADDRESSLINE2)&& (
                  <FormHelperText style={{ color: "red" }}>   Invalid Address </FormHelperText>
                )}
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
                  {isNaN(this.state.USERPOSCODE) && (
                    <FormHelperText FormHelperText style={{ color: "red" }}>   Invalid Poscode </FormHelperText>
                  )}
                </div>
                <div className="form-group col-md-6">
                <FormControl
                    variant="outlined"
                    size="small"
                    style={{ width: "100%" }}
                  >
                    <InputLabel id="demo-simple-select-label">State</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="State"
                      variant="outlined"
                      defaultValue={addressInfo.UserState}
                      size="small"
                      onChange={this.handleChange.bind(this, "USERSTATE")}
                      style={{
                        textAlign: "left",
                        width: "100%",
                      }}
                    >
                      {
                          isArrayNotEmpty(this.props.states) && this.props.states.map((el, idx) => {
                              return <MenuItem key={el.StateID} value={el.State}>{el.State}</MenuItem>
                          })
                      }
                    </Select>
                  </FormControl>
                  {isStringNullOrEmpty(this.state.USERSTATE) && (
                    <FormHelperText style={{ color: "red" }}>   Invalid State </FormHelperText>
                  )}
                </div>
                
              </div>
              <div className="form-row">
              <div className="form-group col-md-6">
                  <FormControl
                    variant="outlined"
                    size="small"
                    style={{ width: "100%" }}
                  >
                    <InputLabel id="demo-simple-select-label">Town / City</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Town / City"
                      variant="outlined"
                      defaultValue={addressInfo.UserCity}
                      size="small"
                      onChange={this.handleChange.bind(this, "USERCITY")}
                      style={{
                        textAlign: "left",
                        width: "100%",
                      }}
                    >
                      {
                            isArrayNotEmpty(selectedCity[0]) && selectedCity[0].map((data, idx) => {
                                return <MenuItem key={idx} value={data.City}>{data.City}</MenuItem>
                            })
                        }
                    </Select>
                  </FormControl>
                  {isStringNullOrEmpty(this.state.USERCITY) && (
                    <FormHelperText style={{ color: "red" }}>   Invalid City </FormHelperText>
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
                      {this.props.countrylist.map((country) => {
                        return <MenuItem key={country.CountryId} value={country.CountryId}>{country.CountryName}</MenuItem>
                      })
                      }
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
