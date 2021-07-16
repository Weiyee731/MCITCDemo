// react
import React, { Component } from "react";

// third-party
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { GitAction } from "../../store/action/gitAction";

// data stubs
import AccountPageAddAddress from "../../components/account/AccountPageAddAddress";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Logo from "../../assets/Emporia.png";
import SearchBox from "../../components/SearchBox/SearchBox";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import CardActions from "@material-ui/core/CardActions";
import AccountPageEditAddress from "../../components/account/AccountPageEditAddress";
import {
  CardContent,
  colors,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { Row } from "@material-ui/data-grid";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import PhoneOutlinedIcon from "@material-ui/icons/PhoneOutlined";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';

function mapStateToProps(state) {
  return {
    addresses: state.counterReducer["addresses"],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    CallAllAddress: (prodData) => dispatch(GitAction.CallAllAddress(prodData)),

    CallAddAddress: (prodData) => dispatch(GitAction.CallAddAddress(prodData)),

    CallUpdateAddress: (prodData) =>
      dispatch(GitAction.CallUpdateAddress(prodData)),

    CallDeleteAddress: (prodData) =>
      dispatch(GitAction.CallDeleteAddress(prodData)), //the backend of deletion is require
  };
}
class AccountPageAddresses extends Component {
  constructor(props) {
    super(props);

    this.state = {
      onAdd: false,
      onEdit: null,
      onDefault: false,
      defaultAddress: "",
      addressIdClicked: " ",
    };
    this.props.CallAllAddress(window.localStorage.getItem("id"));
    this.handleCallbackfromAdd = this.handleCallbackfromAdd.bind(this);
    this.handleCallbackfromEdit = this.handleCallbackfromEdit.bind(this);
    this.onAddClick = this.onAddClick.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
    this.onChangeDefault = this.onChangeDefault.bind(this);
  }

  onAddClick = () => {
    this.setState({ onAdd: true });
  };

  onEditClick = (data) => {
    this.setState({ onEdit: true, addressIdClicked: data });
  };

  onChangeDefault = (data) => {
    this.setState({ onDefault: true, defaultAddress: data });
  };

  handleCallbackfromAdd = (childData) => {
    this.setState({ onAdd: childData });
  };

  handleCallbackfromEdit = (childData) => {
    this.setState({ onEdit: childData });
  };

  onDeleteClick = (data) => {
    console.log("DELETE", data)
    console.log(this.state)
    let deletedAddress = {
      USERID: window.localStorage.getItem("id"),
      AddressBookNo: data,
    };

    this.props.CallDeleteAddress(deletedAddress);
  };

  render() {
    return (
      <Card>
        {this.state.onAdd ? (
          <AccountPageAddAddress parentCallback={this.handleCallbackfromAdd} />
        ) : (
          <div>
            <CardContent>
              <div className="row" style={{margin: "10px"}}>
                <div className="col-9 col-lg-9 col-xl-9">
                  <h5
                    style={{
                      textAlign: "left",
                      fontWeight: "bold",
                      // paddingLeft: "30px",
                    }}
                  >
                  My Address
                  </h5>
                  <Typography
                    style={{
                      fontSize: "15px",
                      fontFamily: "Calibri Light,sans-serif",
                      // paddingLeft: "30px",
                      // marginBottom: 12,
                    }}
                  >
                    Click on address to choose as default address
                  </Typography>
                </div>
                <div className="col-3 col-lg-3 col-xl-3">
                  <Tooltip title="Add" style={{ float: "right" }}>
                    <IconButton aria-label="Add" onClick={this.onAddClick}>
                      <AddIcon  fontSize="large"/>
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
              <Divider variant="fullWidth" />

              <div>
                {this.props.addresses.map((address) => (
                  <div key={address.UserAddressBookID}>
                    <Card
                      style={{
                        width: "100%",
                        // marginTop: "2vh",
                        border: "none",
                        boxShadow: "none",
                      }}
                    >
                      {this.state.onEdit == true &&
                      this.state.addressIdClicked ===
                        address.UserAddressBookID ? (
                        <AccountPageEditAddress
                          selectedAddressData={address}
                          parentCallback={this.handleCallbackfromEdit}
                        />
                      ) : (
                        <div className="row" style={{ margin: "1vh" }}>
                          <div className="col-9 col-lg-9 col-xl-9">
                            <CardActionArea
                              onClick={() =>
                                this.onChangeDefault(address.UserAddressBookID)
                              }
                            >
                              <CardContent>
                                <div>
                                  <div className="row">
                                    <h6
                                      style={{
                                        paddingLeft: "15px",
                                        fontWeight: "400",
                                      }}
                                    >
                                      < PermIdentityIcon color="disabled" style={{marginRight:"0.30rem"}}/> {address.UserAddressName}
                                    </h6>

                                    {this.state.onDefault &&
                                      address.UserAddressBookID ==
                                        this.state.defaultAddress && (
                                        <Typography
                                          color="secondary"
                                          style={{
                                            fontSize: "16px",
                                            paddingLeft: "10px",
                                            marginBottom: ".5rem",
                                            fontWeight: "400",
                                          }}
                                        >
                                          ( Default Address )
                                        </Typography>
                                      )}
                                  </div>
                                  <h6
                                    style={{
                                      fontWeight: "200",
                                      fontSize: "15px",
                                    }}
                                  >
                                    <LocationOnOutlinedIcon color="disabled" style={{marginRight:"0.4rem"}}/>

                                    {address.UserAddressLine1}
                                    {address.UserAddressLine2}
                                    {address.UserPoscode},{address.UserCity}
                                    {address.CountryID}
                                  </h6>
                                  <h6
                                    style={{
                                      fontWeight: "200",
                                      fontSize: "15px",
                                    }}
                                  >
                                    <PhoneOutlinedIcon color="disabled" style={{marginRight:"0.4rem"}}/>
                                    {address.UserContactNo}
                                  </h6>

                                  <h6
                                    style={{
                                      fontWeight: "200",
                                      fontSize: "15px",
                                    }}
                                  >
                                    <EmailOutlinedIcon color="disabled" style={{marginRight:"0.4rem"}}/>
                                    {address.UserEmail}
                                  </h6>
                                </div>

                                <div className="addresses-list__divider" />
                              </CardContent>
                            </CardActionArea>
                          </div>

                          <div
                            className="col-3 col-lg-3 col-xl-3"
                            style={{ float: "right" }}
                          >
                            <CardActions style={{ float: "right" }}>
                              <IconButton
                                aria-label="Edit"
                                style={{
                                  float: "right",
                                }}
                                onClick={() =>
                                  this.onEditClick(address.UserAddressBookID)
                                }
                              >
                                <EditIcon fontSize="small"/>
                              </IconButton>
                              <IconButton
                                aria-label="Delete"
                                style={{
                                  float: "right",
                                }}
                                onClick={() =>
                                  this.onDeleteClick(address.UserAddressBookID)
                                }
                              >
                                <DeleteIcon fontSize="small"/>
                              </IconButton>
                            </CardActions>
                          </div>
                        </div>
                      )}
                    </Card>
                    <Divider variant="middle" />
                  </div>
                ))}
              </div>
            </CardContent>
          </div>
        )}
      </Card>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountPageAddresses);
