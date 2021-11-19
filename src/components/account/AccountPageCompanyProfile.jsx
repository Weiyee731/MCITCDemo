// react
import React, { Component } from "react";

// data stubs
import { connect } from "react-redux";
import { GitAction } from "../../store/action/gitAction";

import "./AccountPageProfile.component.css";
import { Card, CardMedia, Typography } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import MuiTableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import { toast } from "react-toastify";
import Button from "@material-ui/core/Button";

// address
import Select from "@material-ui/core/Select";
import FormControl from '@material-ui/core/FormControl';


const TableCell = withStyles({
  root: {
    borderBottom: "none",
  },
})(MuiTableCell);

function mapStateToProps(state) {
  return {
    userprofiledata: state.counterReducer["currentUser"],
    countrylist: state.counterReducer["countries"],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    CallUserProfile: (propsData) =>
      dispatch(GitAction.CallUserProfile(propsData)),
    CallCountry: () => dispatch(GitAction.CallCountry()),
    CallUpdateCompanyProfile: (propsData) =>
      dispatch(GitAction.CallUpdateCompanyProfile(propsData)),
  };
}

class AccountPageCompanyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      USERID: localStorage.getItem("isLogin") === false ? 0 : localStorage.getItem("id"),
      supplierName: "",
      supplierContact: "",
      supplierWebsite: "",
      supplierAdd1: "",
      supplierAdd2: "",
      supplierPoscode: "",
      supplierCity: "",
      supplierState: "",
      supplierCountryID: 148,

      validsupplierName: false,
      validsupplierContact: false,
      validsupplierWebsite: false,
      validsupplierAdd1: false,
      validsupplierPoscode: false,
      validsupplierCity: false,
      validsupplierState: false,
      validsupplierAdd2: false,

      isEditClick: false,
      isEditSubmit: false
    };

    this.props.CallUserProfile(window.localStorage.getItem("id"));
    this.props.CallCountry();
    this.handleChangeData = this.handleChangeData.bind(this)
    this.handleSubmitEditProfile = this.handleSubmitEditProfile.bind(this)
    this.setDetails = this.setDetails.bind(this)
  }

  setDetails() {
    this.props.userprofiledata !== undefined && this.props.userprofiledata.length > 0 && this.props.userprofiledata.map((row) => {
      this.setState({
        supplierName: row.CompanyName !== null ? row.CompanyName : "-",
        supplierContact: row.CompanyContactNo !== null ? row.CompanyContactNo : "-",
        supplierWebsite: row.CompanyWebsite !== null ? row.CompanyWebsite : "-",
        supplierAdd1: row.CompanyAddressLine1 !== null ? row.CompanyAddressLine1 : "-",
        supplierAdd2: row.CompanyAddressLine2 !== null ? row.CompanyAddressLine2 : "-",
        supplierPoscode: row.CompanyPoscode !== null ? row.CompanyPoscode : "-",
        supplierCity: row.CompanyCity !== null ? row.CompanyCity : "-",
        supplierState: row.CompanyState !== null ? row.CompanyState : "-",
        supplierCountryID: row.CountryID === 0 ? 148 : row.CountryID,

        validsupplierName: row.CompanyName !== null ? true : false,
        validsupplierContact: row.CompanyContactNo !== null ? true : false,
        validsupplierWebsite: row.CompanyWebsite !== null ? true : false,
        validsupplierAdd1: row.CompanyAddressLine1 !== null ? true : false,
        validsupplierPoscode: row.CompanyPoscode !== null ? true : false,
        validsupplierCity: row.CompanyCity !== null ? true : false,
        validsupplierState: row.CompanyState !== null ? true : false,
        validsupplierAdd2: row.CompanyAddressLine2 !== null ? true : false,
        isEditClick: false,
        isEditSubmit: false
      })
    })
  }

  componentDidMount() {
    this.props.userprofiledata.length > 0 &&
      this.setDetails()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userprofiledata !== this.props.userprofiledata) {
      this.setDetails()
      // toast.success("Company Profile is updated")
    }
  }

  handleChangeData(e, type) {
    switch (type) {
      case "suppliername":
        this.setState({ supplierName: e.target.value })
        this.checkEmptyName(e.target.value)
        break;
      case "suppliercontact":
        this.setState({ supplierContact: e.target.value })
        this.checkEmptyContact(e.target.value)
        break;
      case "supplierwebsite":
        this.setState({ supplierWebsite: e.target.value })
        this.checkEmptyWebsite(e.target.value)
        break;
      case "supplieradd1":
        this.setState({ supplierAdd1: e.target.value })
        this.checkEmptyAdd(e.target.value)
        break;
      case "supplieradd2":
        this.setState({ supplierAdd2: e.target.value })
        this.checkEmptyAdd2(e.target.value)
        break;
      case "supplierposcode":
        this.setState({ supplierPoscode: e.target.value })
        this.checkEmptyPoscode(e.target.value)
        break;
      case "suppliercity":
        this.setState({ supplierCity: e.target.value })
        this.checkEmptyCity(e.target.value)
        break;
      case "supplierstate":
        this.setState({ supplierState: e.target.value })
        this.checkEmptyState(e.target.value)
        break;
      case "suppliercountryid":
        this.setState({ supplierCountryID: e.target.value })
        break;

      default:
        return;
    }
  }

  checkEmptyName(value) {
    if (value === "" || value === null)
      this.setState({ validsupplierName: false })
    else
      this.setState({ validsupplierName: true })
  }

  checkEmptyContact(value) {
    if (value === "" || value === null)
      this.setState({ validsupplierContact: false })
    else {
      if (isNaN(this.state.supplierContact) === false)
        this.setState({ validsupplierContact: true })
      else
        this.setState({ validsupplierContact: false })
    }

  }

  checkEmptyWebsite(value) {
    if (value === "" || value === null) {
      this.setState({ validsupplierWebsite: false })
    }
    else {
      this.setState({ validsupplierWebsite: true })
    }
  }

  checkEmptyAdd(value) {
    if (value === "" || value === null)
      this.setState({ validsupplierAdd1: false })
    else
      this.setState({ validsupplierAdd1: true })
  }

  checkEmptyAdd2(value) {
    if (value === "" || value === null)
      this.setState({ validsupplierAdd2: false })
    else
      this.setState({ validsupplierAdd2: true })
  }

  checkEmptyPoscode(value) {
    if (value === "" || value === null)
      this.setState({ validsupplierPoscode: false })
    else
      if (isNaN(value) === false)
        this.setState({ validsupplierPoscode: true })
      else
        this.setState({ validsupplierPoscode: false })
  }

  checkEmptyCity(value) {
    if (value === "" || value === null)
      this.setState({ validsupplierCity: false })
    else
      this.setState({ validsupplierCity: true })
  }

  checkEmptyState(value) {
    if (value === "" || value === null)
      this.setState({ validsupplierState: false })
    else
      this.setState({ validsupplierState: true })
  }

  handleSubmitEditProfile() {

    if (this.state.validsupplierName && this.state.validsupplierContact && this.state.validsupplierWebsite && this.state.validsupplierAdd2 &&
      this.state.validsupplierAdd1 && this.state.validsupplierPoscode && this.state.validsupplierCity && this.state.validsupplierState) {
      // this.props.CallUpdateCompanyProfile(this.state)
    }
    else {
      this.setState({ isEditSubmit: true })
      toast.error("Please fill in all of the required Data in correct format")
    }
  }


  render() {
    const rowStyle = { width: "16vw", textAlign: "left", paddingLeft: "3rem" };

    let errorMsg =
      (
        <p style={{ color: "#a31702", margin: "0px 0px 0px 10px", textAlign: "right", fontSize: "12px", }}  >
          This is required
        </p>
      );

    return (
      <Card>
        <CardContent>
          <div className="row" style={{ margin: "10px" }}>
            <div className="col-6">
              <h5
                style={{
                  textAlign: "left",
                  fontWeight: "bold",
                }}
              >
                Company Profile
              </h5>

              <Typography
                style={{
                  fontSize: "15px",
                  fontFamily: "Calibri Light,sans-serif",
                }}
              >
                Manage your company information
              </Typography>
            </div>
            <div className="col-6" style={{ textAlign: "right" }}>
              {
                this.state.isEditClick === false ?
                  (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => this.setState({ isEditClick: true })}
                    >Edit Company Profile </Button>
                  ) :
                  (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => this.handleSubmitEditProfile()}
                    >Submit Changes</Button>
                  )
              }
            </div>
          </div>
          <Divider variant="fullWidth" />
          <Table>
            <TableBody>
              <TableRow style={{ width: "100%  " }}>
                <TableCell style={rowStyle}>Company Name</TableCell>
                <TableCell>
                  <TextField
                    disabled={this.state.isEditClick ? false : true}
                    variant="outlined"
                    size="small"
                    id="userfirstname"
                    value={this.state.supplierName}
                    onChange={(x) => this.handleChangeData(x, "suppliername")}
                    style={{ marginRight: "5px", width: "100%" }}
                  />
                  {this.state.isEditSubmit && this.state.validsupplierName === false && (errorMsg)}

                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={rowStyle}>Company Contact</TableCell>
                <TableCell>
                  <TextField
                    disabled={this.state.isEditClick ? false : true}
                    variant="outlined"
                    size="small"
                    id="CompanyContact"
                    value={this.state.supplierContact}
                    onChange={(x) => this.handleChangeData(x, "suppliercontact")}
                    style={{ marginRight: "5px", width: "100%" }}
                  />
                  {this.state.isEditSubmit && this.state.validsupplierContact === false && (errorMsg)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={rowStyle}>Company Website</TableCell>
                <TableCell>
                  <TextField
                    disabled={this.state.isEditClick ? false : true}
                    variant="outlined"
                    size="small"
                    id="CompanyWebsite"
                    value={this.state.supplierWebsite}
                    onChange={(x) => this.handleChangeData(x, "supplierwebsite")}
                    style={{ marginRight: "5px", width: "100%" }}
                  />
                  {this.state.isEditSubmit && this.state.validsupplierWebsite === false && (errorMsg)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={rowStyle}>Company Address Line 1</TableCell>
                <TableCell>
                  <TextField
                    disabled={this.state.isEditClick ? false : true}
                    variant="outlined"
                    size="small"
                    id="CompanyAddressLine1"
                    value={this.state.supplierAdd1}
                    onChange={(x) => this.handleChangeData(x, "supplieradd1")}
                    style={{ marginRight: "5px", width: "100%" }}
                  />
                  {this.state.isEditSubmit && this.state.validsupplierAdd1 === false && (errorMsg)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={rowStyle}>Company Address Line 2</TableCell>
                <TableCell>
                  <TextField
                    disabled={this.state.isEditClick ? false : true}
                    variant="outlined"
                    size="small"
                    id="CompanyAddressLine2"
                    value={this.state.supplierAdd2}
                    onChange={(x) => this.handleChangeData(x, "supplieradd2")}
                    style={{ marginRight: "5px", width: "100%" }}
                  />
                  {this.state.isEditSubmit && this.state.validsupplierAdd2 === false && (errorMsg)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={rowStyle}>Company City</TableCell>
                <TableCell>
                  <TextField
                    disabled={this.state.isEditClick ? false : true}
                    variant="outlined"
                    size="small"
                    id="CompanyCity"
                    value={this.state.supplierCity}
                    onChange={(x) => this.handleChangeData(x, "suppliercity")}
                    style={{ marginRight: "5px", width: "100%" }}
                  />
                  {this.state.isEditSubmit && this.state.validsupplierCity === false && (errorMsg)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={rowStyle}>Company Poscode</TableCell>
                <TableCell>
                  <TextField
                    disabled={this.state.isEditClick ? false : true}
                    variant="outlined"
                    size="small"
                    id="CompanyPoscode"
                    value={this.state.supplierPoscode}
                    onChange={(x) => this.handleChangeData(x, "supplierposcode")}
                    style={{ marginRight: "5px", width: "100%" }}
                  />
                  {this.state.isEditSubmit && this.state.validsupplierPoscode === false && (errorMsg)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={rowStyle}>Company State</TableCell>
                <TableCell>
                  <TextField
                    disabled={this.state.isEditClick ? false : true}
                    variant="outlined"
                    size="small"
                    id="CompanyState"
                    value={this.state.supplierState}
                    onChange={(x) => this.handleChangeData(x, "supplierstate")}
                    style={{ marginRight: "5px", width: "100%" }}
                  />
                  {this.state.isEditSubmit && this.state.validsupplierState === false && (errorMsg)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={rowStyle}>Company Country</TableCell>
                <TableCell>
                  <FormControl fullWidth  >
                    <Select
                      disabled={this.state.isEditClick ? false : true}
                      id="Country"
                      variant="outlined"
                      defaultValue={1}
                      value={this.state.supplierCountryID}
                      size="small"
                      onChange={(x) => this.handleChangeData(x, "suppliercountryid")}
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
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>



        </CardContent>
      </Card>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountPageCompanyProfile);
