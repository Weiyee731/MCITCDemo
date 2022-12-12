// react
import React, { Component } from "react";

// third-party

// data stubs
import Grid from "@mui/material/Grid";
import { connect } from "react-redux";
import { GitAction } from "../../../store/action/gitAction";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import "react-credit-cards/lib/styles.scss";
import "./creditcardstyle.css";
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatFormData,
} from "./utils.jsx";
import AccountPageAddCreditCard from "./AccountPageAddCreditCard";
import AccountPageEditCreditCard from "./AccountPageEditCreditCard";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from '@mui/icons-material/Close';
import Card from "@mui/material/Card";
import { CardContent, Divider, Typography } from "@mui/material";



function mapStateToProps(state) {
  return {
    creditcard: state.counterReducer["creditcards"],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    CallAllCreditCard: (prodData) =>
      dispatch(GitAction.CallAllCreditCard(prodData)),

    CallUpdateCreditCard: (prodData) =>
      dispatch(GitAction.CallUpdateCreditCard(prodData)),

    CallDeleteCreditCard: (prodData) =>
      dispatch(GitAction.CallDeleteCreditCard(prodData)),
  };
}

class AccountPageCreditCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      USERID: window.localStorage.getItem("id"),
      expiry: "",
      focus: "",
      name: "",
      number: "",
      addNewCard: false,
      USERPAYMENTMETHODID: "",
      onUpdate: false,
      IdClicked: "",
      PAYMENTMETHODIDselected: "",
    };
    this.handleInputFocus = this.handleInputFocus.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onAddClick = this.onAddClick.bind(this);
    this.onUpdateClick = this.onUpdateClick.bind(this);
    this.handleCallbackfromAdd = this.handleCallbackfromAdd.bind(this);
    this.handleCallbackfromEdit = this.handleCallbackfromEdit.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);

    this.props.CallAllCreditCard(this.state.USERID);
  }

  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name });
  };

  handleInputChange = ({ target }) => {
    if (target.name === "number") {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === "expiry") {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === "cvc") {
      target.value = formatCVC(target.value);
    }

    this.setState({ [target.name]: target.value });
  };

  onAddClick = () => {
    this.setState({ addNewCard: true });
  };

  handleCallbackfromAdd = (childData) => {
    this.setState({ addNewCard: childData });
  };

  handleCallbackfromEdit = (childData) => {
    this.setState({ onUpdate: childData });
  };

  updateCreditCard() {
    this.props.CallUpdateCreditCard(this.state);
  }

  onDeleteClick = (data) => {
    let deletedCard = {
      userId: window.localStorage.getItem("id"),
      cardId: data,
    };

    this.props.CallDeleteCreditCard(deletedCard);
  };

  onUpdateClick = (data) => {
    this.setState({ onUpdate: true, IdClicked: data });
  };

  render() {
    return (
      <div id="showcard">
        <Card>
          <CardContent>
            <div className="row" style={{ margin: "10px" }}>
              <div className={this.state.addNewCard == true ? "col-10 col-lg-10 col-xl-10" : "col-11 col-lg-11 col-xl-11"}>
                <h5
                  style={{
                    textAlign: "left",
                    fontWeight: "bold",
                  }}
                >
                  My Credit Cards
                </h5>
                <Typography
                  style={{
                    fontSize: "15px",
                    fontFamily: "Calibri Light,sans-serif",
                  }}
                >
                  Manage your Credit Cards
                </Typography>
              </div>

              {
                this.state.addNewCard == true &&
                <div className="col-1 col-lg-1 col-xl-1">
                  <Tooltip title="Back" style={{ float: "right" }}>
                    <IconButton aria-label="Back" onClick={() => this.setState({ addNewCard: false })}>
                      <CloseIcon fontSize="large" />
                    </IconButton>
                  </Tooltip>
                </div>
              }
              <div className="col-1 col-lg-1 col-xl-1">
                <Tooltip title="Add" style={{ float: "right" }}>
                  <IconButton aria-label="Add" onClick={() => this.onAddClick()}>
                    <AddIcon fontSize="large" />
                  </IconButton>
                </Tooltip>
              </div>
            </div>

            <Divider variant="fullWidth" />

            {this.state.addNewCard == true ? (
              <AccountPageAddCreditCard
                parentCallback={this.handleCallbackfromAdd}
              />
            ) : (
              <div>
                {this.props.creditcard.length > 0 && this.props.creditcard[0].ReturnVal !== "0" && this.props.creditcard[0].ReturnVal === undefined ?
                  (
                    <div>
                      <Grid
                        container
                        style={{
                          margin: "auto",
                          justifyContent: "Space-between",
                        }}
                      >
                        {this.props.creditcard.map((cards) => (
                          <div>
                            <Grid
                              item
                              style={{
                                margin: "2vw",
                                marginTop: "1vw",
                                marginBottom: "1vw",
                              }}
                            >
                              {this.state.onUpdate &&
                                this.state.IdClicked ===
                                cards.UserPaymentMethodID ? (
                                <AccountPageEditCreditCard
                                  parentCallback={this.handleCallbackfromEdit}
                                  UserPaymentMethodID={cards.UserPaymentMethodID}
                                />
                              ) : (
                                <div>
                                  <Tooltip
                                    title="Edit"
                                    style={{ right: "-210px" }}
                                  >
                                    <IconButton aria-label="Edit">
                                      <EditIcon
                                        fontSize="small"
                                        onClick={() =>
                                          this.onUpdateClick(
                                            cards.UserPaymentMethodID
                                          )
                                        }
                                      />
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip
                                    title="Delete"
                                    style={{ right: "-200px" }}
                                  >
                                    <IconButton aria-label="Delete">
                                      <DeleteIcon
                                        fontSize="small"
                                        onClick={() =>
                                          this.onDeleteClick(
                                            cards.UserPaymentMethodID
                                          )
                                        }
                                      />
                                    </IconButton>
                                  </Tooltip>
                                  <Cards
                                    cvc=""
                                    expiry={cards.UserCardExpireDate}
                                    focused={this.state.focus}
                                    name={cards.UserCardName}
                                    number={cards.UserCardNo}
                                    preview={true}
                                  />
                                  <Divider variant="middle" />
                                </div>
                              )}
                            </Grid>
                          </div>
                        ))}
                      </Grid>
                    </div>
                  ) : (
                    <div>
                      Seems like you doesnt have credit card saved in this system.
                      Click on + button to add more.
                    </div>
                  )}
              </div>
            )}
          </CardContent>
        </Card>
      </div >
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountPageCreditCard);
