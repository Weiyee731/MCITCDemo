// react
import React, { Component } from "react";

// third-party
import { Modal, ModalBody } from "reactstrap";

// data stubs
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { GitAction } from "../../../store/action/gitAction";
import Cards from "react-credit-cards";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import "react-credit-cards/es/styles-compiled.css";
import "react-credit-cards/lib/styles.scss";
import "./creditcardstyle.css";
import { browserHistory } from "react-router";
import TextField from "@mui/material/TextField";
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatFormData,
} from "./utils";

function mapStateToProps(state) {
  return {
    creditcards: state.counterReducer["creditcards"],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    CallAddCreditCard: (propsData) =>
      dispatch(GitAction.CallAddCreditCard(propsData)),
  };
}

class AccountPageAddCreditCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      USERID: window.localStorage.getItem("id"),
      cvc: "",
      expiry: "",
      focus: "",
      name: "",
      number: "",
      cardAdded: false,
      issuer: "",
      cardtype: ""
    };

    this.handleAddCreditCard = this.handleAddCreditCard.bind(this);
    this.handleInputFocus = this.handleInputFocus.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validateData = this.validateData.bind(this);
  }

  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name });
  };

  handleInputChange = ({ target }) => {
    if (target.name === "number") {
      if (target.value.length > 1) {
        target.value = formatCreditCardNumber(target.value)[1].replace(
          /\s+/g,
          ""
        );
      }

      if (formatCreditCardNumber(target.value)[0] !== undefined) {
        this.setState({ issuer: formatCreditCardNumber(target.value)[0] });
      } else {
        toast.error("Card Number's format is incorrect");
      }
    } else if (target.name === "expiry") {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === "cvc") {
      target.value = formatCVC(target.value);
    }
    this.setState({ [target.name]: target.value });
  };

  handleAddCreditCard() {
    if (this.state.name.length && this.state.number.length && this.state.expiry.length && this.state.cardtype.length) {
      this.props.CallAddCreditCard(this.state);
      // this.props.parentCallback("false");
    } else {
      toast.error("Please fill in all required card data");
    }
  }

  handleChange = (e) => {
    const { value } = e.target;

    this.setState({
      cardtype: value,
    });
  };

  handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      this.setState({ issuer });
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.creditcards !== this.props.creditcards && this.props.creditcards[0].ReturnVal === undefined) {
      browserHistory.push("/account/creditcard");
      window.location.reload();
    }
  }
  validateData() {
    const { expiry, name, number, cardtype } = this.state
    if (expiry.length < 5)
      return true

    if (name === "")
      return true

    if (number.length !== 16)
      return true

    if (cardtype === "")
      return true

    else
      return false
  }

  render() {
    return (
      <div id="PaymentForm">
        <Cards
          expiry={this.state.expiry}
          focused={this.state.focus}
          name={this.state.name}
          number={this.state.number}
        />
        <form ref={(c) => (this.form = c)} onSubmit={this.handleSubmit}>
          <div className="row" style={{ marginTop: "20px" }}>
            <TextField
              variant="outlined"
              style={{ width: '100%' }}
              size="small"
              label="Card Number"
              type="tel"
              name="number"
              className="form-control"
              placeholder="Card Number"
              pattern="[\d| ]{16,22}"
              inputProps={{ maxLength: 16 }}
              required
              onChange={this.handleInputChange}
              onFocus={this.handleInputFocus}
            />
          </div>
          <div className="row" style={{ marginTop: "20px" }}>
            <TextField
              variant="outlined"
              style={{ width: '100%' }}
              size="small"
              label="Card Name"
              type="text"
              name="name"
              className="form-control"
              placeholder="Name"
              required
              onChange={this.handleInputChange}
              onFocus={this.handleInputFocus}
            />
          </div>
          <div className="row" style={{ marginTop: "20px" }}>
            <TextField
              variant="outlined"
              style={{ width: '100%' }}
              size="small"
              label="Valid Thru"
              type="tel"
              name="expiry"
              className="form-control"
              placeholder="Valid Thru"
              pattern="\d\d/\d\d"
              required
              onChange={this.handleInputChange}
              onFocus={this.handleInputFocus}
            />
          </div>
          <div>
            <br />
            <FormControl component="fieldset">
              <FormLabel component="legend">Card Type</FormLabel>
              <RadioGroup
                aria-label="cardtype"
                name="cardtype"
                value={this.state.cardtype}
                onChange={this.handleChange}
              >
                <FormControlLabel
                  value="MasterCard"
                  control={<Radio />}
                  label="Master Card"
                />
                <FormControlLabel
                  value="VisaCard"
                  control={<Radio />}
                  label="Visa Card"
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div>
            <br />
          </div>
          <div className="form-actions">
            <button
              onClick={this.handleAddCreditCard}
              className="btn btn-primary btn-block"
              type="button"
              disabled={this.validateData() ? true : false}
            >
              Add this Credit Card to your account
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountPageAddCreditCard);
