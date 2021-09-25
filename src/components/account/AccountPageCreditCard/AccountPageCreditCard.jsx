// react
import React, { Component } from "react";

// third-party

// data stubs
import Grid from "@material-ui/core/Grid";
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
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import Card from "@material-ui/core/Card";
import { CardContent, Divider, Typography } from "@material-ui/core";
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
      userId: this.state.USERID,
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
              <div className="col-9 col-lg-9 col-xl-9">
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
              <div className="col-3 col-lg-3 col-xl-3">
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
                {this.props.creditcard.length == 0 ? (
                  <div>
                    Seems like you doesnt have credit card saved in this system.
                    Click on + button to add more.
                  </div>
                ) : (
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
                                  preview ={true}
                                />
                                <Divider variant="middle" />
                              </div>
                            )}
                          </Grid>
                        </div>
                      ))}
                    </Grid>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountPageCreditCard);
