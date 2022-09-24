// react
import React, { Component } from "react";
import { browserHistory } from "react-router";
// third-party
import { connect } from "react-redux";
import { Helmet } from "react-helmet-async";
import { Link, Redirect } from "react-router-dom";
import { Button } from "@material-ui/core";
// application
import Currency from "../shared/Currency";
// data stubs
import payments from "../../data/shopPayments";
import theme from "../../data/theme";
import { GitAction } from "../../store/action/gitAction";
import { isContactValid, isEmailValid, isStringNullOrEmpty } from "../../Utilities/UtilRepo"
import { toast } from "react-toastify";
import HandleAddress from '../shared/HandleAddress'
import Typography from "@material-ui/core/Typography";

class PageCheckOrder extends Component {
  payments = payments;

  constructor(props) {
    super(props);

    this.state = {
      payment: "bank",
      defaultAddress: [],

      cart: [],
      subtotal: 0,
      total: 0,
      shipping: 25,
      tax: 0,
      isHandleAddress: false,
      selectedAddresstoEdit: [],

      Name: "",
      ContactNo: "",
      email: "",
      AddressBookNo: "",
      USERID: localStorage.getItem("id"),
      USERADDRESSLINE1: "",
      USERADDRESSLINE2: "",
      USERPOSCODE: "",
      USERSTATE: "",
      USERCITY: "",
      COUNTRYID: "148",
      isHandleAddressSubmitted: false,
      isAddAddress: false,
    };
    this.setDetails = this.setDetails.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleAddress = this.handleAddress.bind(this)
    this.selectCountry = this.selectCountry.bind(this)
    this.revertState = this.revertState.bind(this)
  }

  handlePaymentChange = (event) => {
    if (event.target.checked) {
      this.setState({ payment: event.target.value });
    }
  };

  revertState() {
    this.setState({
      selectedAddresstoEdit: [],
      Name: "",
      ContactNo: "",
      email: "",
      AddressBookNo: "",
      USERADDRESSLINE1: "",
      USERADDRESSLINE2: "",
      USERPOSCODE: "",
      USERSTATE: "",
      USERCITY: "",
      COUNTRYID: "148",
      isHandleAddress: false
    })
  }

  handleAddress() {
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

      if (this.state.isAddAddress === false) {
        this.props.CallUpdateAddress(this.state);
        this.setState({ isHandleAddressSubmitted: true })
        this.revertState()
      }
      else {
        this.props.CallAddAddress(this.state);
        this.setState({ isHandleAddressSubmitted: true })
        this.revertState()
      }
    } else {
      toast.error("Please fill in all required data with correct information");
    }
  }

  handleInputChange(e) {
    e.preventDefault()

    switch (e.target.name) {
      case "Name":
        this.setState({ Name: e.target.value });
        break;

      case "ContactNo":
        this.setState({ ContactNo: e.target.value });
        break;

      case "email":
        this.setState({ email: e.target.value });
        break;

      case "USERADDRESSLINE1":
        this.setState({ USERADDRESSLINE1: e.target.value });
        break;

      case "USERADDRESSLINE2":
        this.setState({ USERADDRESSLINE2: e.target.value });
        break;

      case "USERPOSCODE":
        this.setState({ USERPOSCODE: e.target.value });
        break;

      case "USERSTATE":
        this.setState({ USERSTATE: e.target.value });
        break;

      case "USERCITY":
        this.setState({ USERCITY: e.target.value });
        break;

      default:
    }
  }


  selectCountry = (e) => {
    this.setState({ COUNTRYID: e.target.value });
  };


  setDetails(productcart) {
    this.setState({
      cart: productcart
    })
    this.setState({ subtotal: this.props.data.reduce((subtotal, item) => subtotal + item.total, 0) })
    this.setState({ total: this.props.data.reduce((subtotal, item) => subtotal + item.total, 0) + this.state.shipping })
  }

  componentDidMount() {
    this.props.CallAllAddress({ USERID: window.localStorage.getItem("id") });
    if (this.props.data !== undefined && this.props.data.length > 0) {
      this.setDetails(this.props.data)
    }

    this.props.CallCountry();

    if (this.props.addresses.length > 0 && this.props.addresses[0].ReturnVal !== "0") {
      if (this.props.addresses.filter((x) => x.isDefaultAddress === 1).length > 0) {
        this.props.addresses.filter((x) => x.isDefaultAddress === 1).map((address) => {
          this.handleClick(this, address)
        })
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.addresses !== this.props.addresses && this.state.isHandleAddressSubmitted === true) {
      if (this.props.addresses.filter((x) => x.isDefaultAddress === 1).length > 0) {
        this.props.addresses.filter((x) => x.isDefaultAddress === 1).map((address) => {
          this.handleClick(this, address)
        })
      }
      this.setState({ isHandleAddress: false, isHandleAddressSubmitted: false, selectedAddresstoEdit: [], isAddAddress: false })
    }

  }

  getItemList(FilteredList) {
    return (
      <>
        {FilteredList.map((item) => (
          <tr key={item.id}>
            {console.log("CHECKING", item.product)}
            <td>
              <div style={{ fontSize: "13px" }}>    {`${item.product.ProductName} × ${item.quantity}`}  </div>
              <div style={{ fontSize: "11px" }}>  Variation : {item.product.ProductVariationValue} </div>
            </td>
            <td>
              <Currency value={item.total} />
            </td>
          </tr>
        ))}
      </>
    )
  }

  renderTotals() {
    return (
      <React.Fragment>
        <tbody className="checkout__totals-subtotals">
          <tr>
            <th style={{ textAlign: "right" }}>Subtotal</th>
            <td>
              <Currency value={this.state.subtotal} />
            </td>
          </tr>
          <tr>
            <th style={{ textAlign: "right" }}>Shipping</th>
            <td>
              <Currency value={this.state.shipping} />
            </td>
          </tr>
          <tr>
            <th style={{ textAlign: "right" }}>Tax</th>
            <td>
              <Currency value={this.state.tax} />
            </td>
          </tr>
        </tbody>
      </React.Fragment>
    );
  }

  handleAddressClick = () => {
    this.setState((address) => ({
      defaultAddress: address,
    }));
  };

  handleClick = (e, data) => {
    this.setState({ defaultAddress: data });
    this.props.handleGetAddressId(data.UserAddressBookID)
    console.log(data)
  };

  handleRemoveClick = (e, AddressBookNo) => {

    let deletedAddress = {
      USERID: window.localStorage.getItem("id"),
      AddressBookNo: AddressBookNo,
    };
    this.props.CallDeleteAddress(deletedAddress);

  };

  goEditAddress = (e, address) => {
    this.setState({ isHandleAddress: true, selectedAddresstoEdit: address })
    this.setState({
      Name: address.UserAddressName,
      ContactNo: address.UserContactNo,
      email: address.UserEmail,
      USERADDRESSLINE1: address.UserAddressLine1,
      USERADDRESSLINE2: address.UserAddressLine2,
      USERPOSCODE: address.UserPoscode,
      USERSTATE: address.UserState,
      USERCITY: address.UserCity,
      COUNTRYID: address.CountryID,
      AddressBookNo: address.UserAddressBookID,
    })

  };

  goAddAddress = () => {
    this.setState({ isHandleAddress: true, isAddAddress: true })
  }

  renderAddress() {
    const selfCollect = {
      CountryID: 1,
      UserAddressBookID: 0,
      UserCity: 'Self Collect'
    }

    const addresses = this.props.addresses !== undefined && this.props.addresses[0] !== undefined && this.props.addresses[0].ReturnVal !== "0"
      && this.props.addresses.Message === undefined && this.props.addresses.map((address) => (
        <React.Fragment key={address.UserAddressBookID}>
          <div className="addresses-list__item card address-card">
            {address.UserAddressBookID ==
              this.state.defaultAddress.UserAddressBookID && (
                <div className="address-card__badge">Selected</div>
              )}
            {address.isDefaultAddress === 1 && (
              // <div style={{ textAlign: "left" }}>
              <Typography
                color="primary"
                style={{
                  fontSize: "16px",
                  // paddingLeft: "10px",
                  // marginBottom: ".5rem",
                  paddingTop: "15px",
                  paddingLeft: "15px",
                  fontWeight: "bold",
                  textAlign: "left"
                }}
              >
                Default Address
              </Typography>
              // </div>

            )}
            <div
              className="address-card__body"
              onClick={(e) => this.handleClick(e, address)}
            >
              <div className="address-card__name">{`${address.UserAddressName}`}</div>
              <div className="address-card__row">
                {this.props.countries.length > 0 && this.props.countries.filter((x) => x.CountryId === address.CountryID).map((country) => {
                  return country.CountryName
                })}
                <br />
                {address.UserPoscode},{address.UserCity}
                <br />
                {address.UserAddressLine1} {address.UserAddressLine2}
              </div>
              <div className="address-card__row">
                <div className="address-card__row-title">Phone Number</div>
                <div className="address-card__row-content">
                  {address.UserContactNo}
                </div>
              </div>
              <div className="address-card__row">
                <div className="address-card__row-title">Email Address</div>
                <div className="address-card__row-content">
                  {address.UserEmail}
                </div>
              </div>
              <div className="address-card__footer">
                <Button
                  color='primary'
                  // to="/account/addresses"
                  onClick={(e) => this.goEditAddress(e, address)}
                >
                  Edit
                </Button>
                &nbsp;&nbsp;
                <Button
                  onClick={(e) =>
                    this.handleRemoveClick(e, address.UserAddressBookID)
                  }
                >
                  Remove
                </Button>
              </div>
            </div>
          </div>
          <div className="addresses-list__divider" />
        </React.Fragment>
      ));

    return (
      <div className="addresses-list mt-3">
        <Helmet>
          <title>{`Address List — ${theme.name}`}</title>
        </Helmet>
        <React.Fragment key={0}>
          <div className="addresses-list__item card address-card">
            {0 == this.state.defaultAddress.UserAddressBookID && (
              <div className="address-card__badge">Selected</div>
            )}
            <div className="address-card__body" style={{ margin: "auto" }} onClick={(e) => this.handleClick(e, selfCollect)}>
              <h4><b>Self Collect</b></h4>
            </div>
          </div>
          <div className="addresses-list__divider" />
        </React.Fragment>

        {addresses}


        <Button className="addresses-list__item addresses-list__item--new" onClick={() => this.goAddAddress()} >
          <div className="addresses-list__plus"></div>
        </Button>
        <div className="addresses-list__divider" />
      </div >
    );
  }


  renderCart() {
    return (
      <table className="checkout__totals mt-4">
        <thead className="checkout__totals-header">
          <tr>
            <th>Product</th>
            <th>Total</th>
          </tr>
        </thead>
        {
          this.props.merchant.map((shop, i) => {
            return (
              <>
                <div style={{ textAlign: "left", fontSize: "13px" }}>{"Order " + parseInt(i + 1) + " : " + shop.MerchantShopName}</div>
                <tbody className="checkout__totals-products">{this.getItemList(this.state.cart.filter((x) => x.MerchantShopName === shop.MerchantShopName))}</tbody>
              </>
            )
          })
        }

        {this.renderTotals()}
        <tfoot className="checkout__totals-footer">
          <tr>
            <th style={{ textAlign: "right" }}>Total</th>
            <td>
              <Currency value={this.state.total} />
            </td>
          </tr>
        </tfoot>
      </table>
    );
  }

  render() {
    if (this.props.data.length < 1) {
      return <Redirect to="cart" />;
    }

    return (
      <React.Fragment>
        <div className="cart">
          <div className="container">
            <div className="card mt-3">
              <div className="card-body">
                <h5>Please select your desired shipping address</h5>
                {this.renderAddress()}
                {/* {this.renderCart()} */}
                <HandleAddress
                  isOpen={this.state.isHandleAddress}
                  // handleOpen={this.handleAddNewCard}
                  // handleAddCreditCard={this.handleAddCreditCard}
                  handleClose={this.revertState}
                  handleSaveAddress={this.handleAddress}
                  handleChange={this.handleInputChange}
                  handleCountryChange={this.selectCountry}
                  addressState={this.state}
                  countryList={this.props.countries}
                  address={this.state.isAddAddress === false ? this.state.selectedAddresstoEdit : []}
                />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  addresses: state.counterReducer["addresses"],
  countries: state.counterReducer["countries"],
  // productcart: state.counterReducer.productcart
});

const mapDispatchToProps = (dispatch) => ({
  CallAllAddress: (prodData) => dispatch(GitAction.CallAllAddress(prodData)),
  CallDeleteAddress: (prodData) => dispatch(GitAction.CallDeleteAddress(prodData)),
  CallCountry: () => dispatch(GitAction.CallCountry()),
  CallUpdateAddress: (prodData) => dispatch(GitAction.CallUpdateAddress(prodData)),
  CallAddAddress: (prodData) => dispatch(GitAction.CallAddAddress(prodData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PageCheckOrder);