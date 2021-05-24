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

const TableCell = withStyles({
  root: {
    borderBottom: "none",
  },
})(MuiTableCell);

function mapStateToProps(state) {
  return {
    userprofiledata: state.counterReducer["currentUser"],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    CallUserProfile: (propsData) =>
      dispatch(GitAction.CallUserProfile(propsData)),
  };
}

class AccountPageCompanyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: "username",
      Email: "sdas@gmail.com",
      Contact: "0123456789",
      Gender: "Male",
      DateofBirth: "06/07/1997",
      open: false,
      open1: false,
    };

    this.props.CallUserProfile(window.localStorage.getItem("id"));
  }

  setOpen(status) {
    if (status == false) {
      this.setState({ open: false });
    } else {
      this.setState({ open: true });
    }
  }

  setOpen1(status) {
    if (status == false) {
      this.setState({ open1: false });
    } else {
      this.setState({ open1: true });
    }
  }

  //   handleClick()
  handleChange(data, e) {
    if (data === "Username") {
      this.setState({
        Username: e.target.value,
      });
    } else if (data === "Email") {
      this.setState({
        Email: e.target.value,
      });
    } else if (data === "Contact") {
      this.setState({
        Contact: e.target.value,
      });
    } else if (data === "Gender") {
      this.setState({
        Gender: e.target.value,
      });
    } else if (data === "DateofBirth") {
      this.setState({
        DateofBirth: e.target.value,
      });
    } else {
    }
  }

  render() {
    const rowStyle = {width: "16vw", textAlign: "left", paddingLeft: "3rem"};
    const censorContact = (str) => {
      return str[0] + str[1] + "*".repeat(str.length - 2) + str.slice(-4);
    };
    const censorWord = (str) => {
      return str[0] + "*".repeat(str.length - 2) + str.slice(-1);
    };
    //    const censorMail =  (str)=> {
    //     return str[0] + "*".repeat(str.length - 2) + str.slice(-4);
    //  }

    const censorEmail = (email) => {
      var arr = email.split("@");
      return censorWord(arr[0]) + "@" + arr[1];
    };

    return (
      <Card>
        <CardContent>
          <div className="row" style={{ margin: "10px" }}>
            <div className="col-9 col-lg-9 col-xl-9">
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
          </div>

          <Divider variant="fullWidth" />

 
          {this.props.userprofiledata.map((row) => (
            <Table>
              <TableBody>
                <TableRow style={{ width: "100%  " }}>
                  <TableCell style={rowStyle}>Company Name</TableCell>
                  <TableCell>
                    <TextField
                      disabled
                      variant="outlined"
                      size="small"
                      id="userfirstname"
                      defaultValue={row.CompanyName}
                      style={{ marginRight: "5px", width: "100%" }}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={rowStyle}>Company Address Line 1</TableCell>
                  <TableCell>
                    <TextField
                      disabled
                      variant="outlined"
                      size="small"
                      id="CompanyAddressLine1"
                      defaultValue={row.CompanyAddressLine1}
                      style={{ marginRight: "5px", width: "100%" }}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={rowStyle}>Company Address Line 2</TableCell>
                  <TableCell>
                    <TextField
                      disabled
                      variant="outlined"
                      size="small"
                      id="CompanyAddressLine2"
                      defaultValue={row.CompanyAddressLine2}
                      style={{ marginRight: "5px", width: "100%" }}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={rowStyle}>Company City</TableCell>
                  <TableCell>
                    <TextField
                      disabled
                      variant="outlined"
                      size="small"
                      id="CompanyCity"
                      defaultValue={row.CompanyCity}
                      style={{ marginRight: "5px", width: "100%" }}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={rowStyle}>Company Poscode</TableCell>
                  <TableCell>
                    <TextField
                      disabled
                      variant="outlined"
                      size="small"
                      id="CompanyPoscode"
                      defaultValue={row.CompanyPoscode}
                      style={{ marginRight: "5px", width: "100%" }}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={rowStyle}>Company State</TableCell>
                  <TableCell>
                    <TextField
                      disabled
                      variant="outlined"
                      size="small"
                      id="CompanyState"
                      defaultValue={row.CompanyState}
                      style={{ marginRight: "5px", width: "100%" }}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          ))}
        </CardContent>
      </Card>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountPageCompanyProfile);
