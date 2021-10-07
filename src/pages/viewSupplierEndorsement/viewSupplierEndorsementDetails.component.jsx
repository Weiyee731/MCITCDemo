import React, { Component } from "react";
import { connect } from "react-redux";
import { browserHistory } from "react-router";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import { GitAction } from "../../store/action/gitAction";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";
import {
  Card,
  CardContent,
  CardActions,
  ThemeProvider,
  Button,
  TextFields,
} from "@material-ui/core";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import SwipeableViews from "react-swipeable-views";

function mapStateToProps(state) {
  return {
    allUser: state.counterReducer["supplier"],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    callEndorseSupplier: (suppData) =>
      dispatch(GitAction.CallEndorseSupplier(suppData)),
  };
}

class SupplierDetailsComponent extends Component {
  constructor(props) {
    super(props);

    // const [open, setOpen] = React.useState(false);
    this.state = {
      supplierName: this.props.singleUserData.name.CompanyName,
      supplierAddress: this.props.singleUserData.name.CompanyAddressLine1,
      supplierCity: this.props.singleUserData.name.CompanyCity,
      supplierState: this.props.singleUserData.name.CompanyState,
      supplierPostal: this.props.singleUserData.name.CompanyPoscode,
      supplierAddressLine2: this.props.singleUserData.name.CompanyAddressLine2,
      supplierContact: this.props.singleUserData.name.CompanyContactNo,
      supplierWebsite: this.props.singleUserData.name.CompanyWebsite,
      supplierDescription: this.props.singleUserData.name.CompanyDescription,
      repFirstName: this.props.singleUserData.name.FirstName,
      repLastName: this.props.singleUserData.name.LastName,
      repContact: this.props.singleUserData.UserContactNo,
      open: false,
      index: 0,
      userId: this.props.singleUserData.name.UserID,
      status: "pending",
    };
  }

  

  endorseProduct = (data) => {
    this.setState({
      status: data,
    });

    this.props.callEndorseSupplier(this.state);
  };

  handleChangeSlider = (event, value) => {
    this.setState({
      index: value,
    });
  };

  handleNextClickButton() {
    // if (this.state.index != 1) {
    //   this.setState((prevState, props) => {
    //     return { index: prevState.index + 1 };
    //   });
    // }
    this.setState({
      index: 1,
    });
  }

  handlePrevClickButton() {
    if (this.state.index !== 0) {
      this.setState((prevState, props) => {
        return { index: prevState.index - 1 };
      });
    }
  }

  handleSlideChangeIndex = (index) => {
    this.setState({
      index,
    });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  tester = () => {

  };

  render() {
    return (
      <div style={{ width: "100%" }}>
        <SwipeableViews
          index={this.state.index}
          onChangeIndex={this.handleSlideChangeIndex}
        >
          <div style={Object.assign({})}>
            <Card
              style={{
                width: "80%",
                marginRight: "10px",
                margin: "0 auto",
              }}
            >
              <CardContent>
                {/* <button onClick={this.tester}> CheckData </button> */}
                <h2>Supplier's Information</h2>
                <h3>Representative's Details</h3>
                <Button className="mt-3 mb-1" onClick={() => {this.props.backLink(false)}}>
                  <i className="fas fa-chevron-left"></i> {"  Back" }
                </Button>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <TextField
                    id="standard-full-width"
                    label="Name"
                    style={{ margin: 8, width: "100%" }}
                    value={
                      this.state.repFirstName + " " + this.state.repLastName
                    }
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <TextField
                    id="standard-full-width"
                    label="Contact Number"
                    style={{ margin: 8, width: "100%" }}
                    value={this.state.repContact}
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </div>
                <h3>Company's Details</h3>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <TextField
                    id="standard-full-width"
                    label="Company's Name"
                    style={{ margin: 8, width: "100%" }}
                    value={this.state.supplierName}
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <TextField
                    id="standard-full-width"
                    label="Company's Contact Number"
                    style={{ margin: 8, width: "100%" }}
                    value={this.state.supplierContact}
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />

                  <TextField
                    id="standard-full-width"
                    label="Company's Website"
                    style={{ margin: 8, width: "100%" }}
                    value={this.state.supplierWebsite}
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <TextField
                    id="standard-full-width"
                    label="Company's Address Line 1"
                    style={{ margin: 8, width: "100%" }}
                    value={this.state.supplierAddress}
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <TextField
                    id="standard-full-width"
                    label="Company's Address Line 2"
                    style={{ margin: 8, width: "100%" }}
                    value={this.state.supplierAddressLine2}
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <TextField
                    id="standard-full-width"
                    label="Company's City"
                    style={{ margin: 8, width: "100%" }}
                    value={this.state.supplierCity}
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    id="standard-full-width"
                    label="Company's State"
                    style={{ margin: 8, width: "100%" }}
                    value={this.state.supplierState}
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <TextField
                    id="standard-full-width"
                    label="Company's Postal Code/Zip Code"
                    style={{ margin: 8, width: "100%" }}
                    value={this.state.supplierPostal}
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <TextField
                    id="standard-full-width"
                    label="Company's Description"
                    style={{ margin: 8, width: "100%" }}
                    value={this.state.supplierDescription}
                    margin="normal"
                    multiline
                    rows={4}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </div>
                <div style={{ width: "100%", textAlign: "center" }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    style={{
                      margin: "10px",
                      padding: "10px",
                      width: "30%",
                      background: "#a31702",
                    }}
                    onClick={this.handleNextClickButton.bind(this)}
                  >
                    Reject
                  </Button>
                  <Button
                    variant="contained"
                    style={{
                      margin: "10px",
                      padding: "10px",
                      width: "30%",
                      background: "#507500",
                      color: "#fff",
                    }}
                    onClick={this.handleClickOpen.bind(this)}
                  >
                    Endorse
                  </Button>

                  <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"Are you sure you want to endorse this suplier?"}
                    </DialogTitle>
                    {/* <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Let Google help apps determine location. This means sending
                    anonymous location data to Google, even when no apps are
                    running.
                  </DialogContentText>
                </DialogContent> */}
                    <DialogActions>
                      <Button
                        onClick={this.handleClose.bind(this)}
                        color="primary"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={this.endorseProduct.bind(this, "endorsed")}
                        color="primary"
                      >
                        Endorse
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </div>
          <div style={Object.assign({})}>
            <Card
              style={{
                width: "80%",
                marginRight: "10px",
                margin: "0 auto",
              }}
            >
              <CardContent>
                <h5>What is the reason for the rejection?</h5>
                <TextField
                  variant="outlined"
                  value={this.state.reason}
                  onChange={this.handleChangeSlider.bind(this, "reason")}
                  multiline
                  rows="4"
                  style={{ width: "100%" }}
                />
                <Button
                  onClick={this.handlePrevClickButton.bind(this)}
                  style={{
                    background: "#a31702",
                    color: "#fff",
                    margin: "10px",
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={this.endorseProduct.bind(this, "rejected")}
                  style={{
                    background: "#507500",
                    color: "#fff",
                    margin: "10px",
                  }}
                >
                  Submit
                </Button>
              </CardContent>
            </Card>
          </div>
        </SwipeableViews>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SupplierDetailsComponent);
