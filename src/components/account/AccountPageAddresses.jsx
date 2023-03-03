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
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Logo from "../../assets/Emporia.png";
import SearchBox from "../../components/SearchBox/SearchBox";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import CardActions from "@mui/material/CardActions";
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
} from "@mui/material";
import Button from "@mui/material/Button";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

function mapStateToProps(state) {
  return {
    addresses: state.counterReducer["addresses"],
    deleteAddress: state.counterReducer["deleteAddress"],
    addAddress: state.counterReducer["addAddress"],
    defaultAddress: state.counterReducer["defaultAddress"],
    countrylist: state.counterReducer["countries"],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    CallAllAddress: (prodData) => dispatch(GitAction.CallAllAddress(prodData)),

    CallUpdateDefaultAddress: (prodData) => dispatch(GitAction.CallUpdateDefaultAddress(prodData)),

    CallDeleteAddress: (prodData) => dispatch(GitAction.CallDeleteAddress(prodData)), //the backend of deletion is require

    CallCountry: () => dispatch(GitAction.CallCountry()),
  };
}
class AccountPageAddresses extends Component {
  constructor(props) {
    super(props);

    this.state = {
      onAdd: false,
      onEdit: null,
      onDefault: false,
      changeDefaultAddress: false,
      addressIdClicked: " ",
      selected_DefaultAddress: "",
      addAddress: false,
      editAddress: false,
      deleteAddress: false,
    };
    this.props.CallAllAddress({ USERID: localStorage.getItem("id") });
    this.props.CallCountry();
    this.handleCallbackfromAdd = this.handleCallbackfromAdd.bind(this);
    this.handleCallbackfromEdit = this.handleCallbackfromEdit.bind(this);
    this.onAddClick = this.onAddClick.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
    this.onChangeDefault = this.onChangeDefault.bind(this);
  }

  componentDidMount() {
    
  }

  componentDidUpdate(prevProps) {
    if (prevProps.addresses !== this.props.addresses && this.state.changeDefaultAddress === true) {
      this.props.CallAllAddress({ USERID: window.localStorage.getItem("id") });
      this.setState({ changeDefaultAddress: false });
    }

    if (this.state.addAddress === true && this.props.addAddress !== undefined && this.props.addAddress.length > 0) {
      this.props.CallAllAddress({ USERID: window.localStorage.getItem("id") });
      this.setState({ addAddress: false });
    }

    if (this.state.deleteAddress === true && this.props.deleteAddress !== undefined && this.props.deleteAddress.length > 0) {
      this.props.CallAllAddress({ USERID: window.localStorage.getItem("id") });
      this.setState({ deleteAddress: false });
    }

    if (this.state.editAddress === true && this.props.addresses !== undefined && this.props.addresses.length > 0) {
      this.props.CallAllAddress({ USERID: window.localStorage.getItem("id") });
      this.setState({ editAddress: false });
    }

  }

  onAddClick = () => {
    this.setState({ onAdd: true });
  };

  onEditClick = (data) => {
    this.setState({ onEdit: true, addressIdClicked: data });
  };


  onChangeDefault = (data) => {
    let defaultID = "";
    let gotDefault = false;

    this.setState({selected_DefaultAddress: data})

    this.props.addresses.filter((x) => x.isDefaultAddress === 1).map((address) => {
      defaultID = address.UserAddressBookID
      gotDefault = true
    })
    
    if (gotDefault === true) {
      if (defaultID !== data) {
        this.props.CallUpdateDefaultAddress({
          AddressBookNo: data,
          OldAddressBookNo: defaultID,
          USERID: window.localStorage.getItem("id")
        })
        this.setState({ changeDefaultAddress: true });
      }
    }
    else {
      this.props.CallUpdateDefaultAddress({
        AddressBookNo: data,
        OldAddressBookNo: 0,
        USERID: window.localStorage.getItem("id")
      })
    }

  };

  handleCallbackfromAdd = (childData) => {
    this.setState({ onAdd: childData, addAddress: true });
  };

  handleCallbackfromEdit = (childData) => {
    this.setState({ onEdit: childData, editAddress: true });
  };

  onDeleteClick = (data) => {
    let deletedAddress = {
      USERID: window.localStorage.getItem("id"),
      AddressBookNo: data,
    };

    this.props.CallDeleteAddress(deletedAddress);
    this.setState({ deleteAddress: true })
  };

  render() {
    return (
      <Card>
        {this.state.onAdd ? (
          <AccountPageAddAddress parentCallback={this.handleCallbackfromAdd} />
        ) : (
          <div>
            <CardContent>
              <div className="row" style={{ margin: "10px" }}>
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
                      <AddIcon fontSize="large" />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
              <Divider variant="fullWidth" />
              <div>
                {this.props.addresses !== undefined && this.props.addresses[0] !== undefined && this.props.addresses[0].ReturnVal !== "0" &&
                  this.props.addresses.map((address) => (
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
                                  // console.log('clicked card')
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
                                        < PermIdentityIcon color="disabled" style={{ marginRight: "0.30rem" }} /> {address.UserAddressName}
                                      </h6>

                                      {/* {this.state.onDefault &&
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
                                        )} */}
                                      {address.isDefaultAddress === 1 && (
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
                                      <LocationOnOutlinedIcon color="disabled" style={{ marginRight: "0.4rem" }} />

                                      {address.UserAddressLine1}
                                      {address.UserAddressLine2}
                                      {address.UserPoscode},{address.UserCity}
                                      , {this.props.countrylist.length > 0 && this.props.countrylist.filter((x) => x.CountryId === address.CountryID).map((country) => {
                                        return country.CountryName
                                      })}
                                      {/* {address.CountryID} */}
                                    </h6>
                                    <h6
                                      style={{
                                        fontWeight: "200",
                                        fontSize: "15px",
                                      }}
                                    >
                                      <PhoneOutlinedIcon color="disabled" style={{ marginRight: "0.4rem" }} />
                                      {address.UserContactNo}
                                    </h6>

                                    <h6
                                      style={{
                                        fontWeight: "200",
                                        fontSize: "15px",
                                      }}
                                    >
                                      <EmailOutlinedIcon color="disabled" style={{ marginRight: "0.4rem" }} />
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
                                  <EditIcon fontSize="small" />
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
                                  <DeleteIcon fontSize="small" />
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
