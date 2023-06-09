// react
import React, { Component } from "react";
// import "./AccountPageProfile.component.css";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { GitAction } from "../../../store/action/gitAction";
import Cards from "react-credit-cards-2";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
// import "react-credit-cards/es/styles-compiled.css";
// import "react-credit-cards/lib/styles.scss";
import "./creditcardstyle.css";
import TextField from "@mui/material/TextField";
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatFormData,
} from "./utils";

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

class AccountPageEditCreditCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      USERID: window.localStorage.getItem("id"),
      cvc: "",
      expiry: "",
      focus: "",
      name: "",
      number: "",
      cardtype: "",
      cardAdded: false,
      USERPAYMENTMETHODID: this.props.UserPaymentMethodID,
    };

    this.handleInputFocus = this.handleInputFocus.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdateCreditCard = this.handleUpdateCreditCard.bind(this);
    this.validateData = this.validateData.bind(this);
  }



  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name });
  };

  componentDidMount() {
    if (this.props.creditcard !== undefined) {
      this.props.creditcard.filter((x) => x.UserPaymentMethodID === this.props.UserPaymentMethodID).map((x) => {
        this.setState({
          expiry: x.UserCardExpireDate,
          name: x.UserCardName,
          number: x.UserCardNo,
          cardtype: x.UserCardType,
        })
      })
    }
  }


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

  handleChange = (e) => {
    const { value } = e.target;

    this.setState({
      cardtype: value,
    });
  };

  handleUpdateCreditCard() {

    if (this.state.name.length && this.state.number.length && this.state.expiry.length && this.state.cardtype.length) {
      this.props.CallUpdateCreditCard(this.state);
      // this.props.parentCallback(false);
      // setTimeout(function () {
      //   // window.location.reload();
      // }, 1000);
    } else {
      toast.error("Please fill in all required card data");
    }
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.creditcard !== this.props.creditcard)
  //     // window.location.reload();
  // }

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
          // cvc={this.state.cvc}
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
              value={this.state.number}
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
              value={this.state.name}
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
              value={this.state.expiry}
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
                value={this.state.cardtype.toUpperCase() === "MASTERCARD" ? "MasterCard" : "VisaCard"}
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
          <div className="form-actions">
            <button
              onClick={this.handleUpdateCreditCard}
              className="btn btn-primary btn-block"
              type="button"
              disabled={this.validateData() ? true : false}
            >
              Save changes
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
)(AccountPageEditCreditCard);
