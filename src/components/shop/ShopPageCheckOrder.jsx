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
    };
    this.setDetails = this.setDetails.bind(this)
  }

  handlePaymentChange = (event) => {
    if (event.target.checked) {
      this.setState({ payment: event.target.value });
    }
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
  }

  getItemList(FilteredList) {
    return (
      <>
        {FilteredList.map((item) => (
          <tr key={item.id}>
            <td>{`${item.product.ProductName} × ${item.quantity}`}</td>
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
  };

  handleRemoveClick = (e, AddressBookNo) => {

    let deletedAddress = {
      USERID: window.localStorage.getItem("id"),
      AddressBookNo: AddressBookNo,
    };
    this.props.CallDeleteAddress(deletedAddress);

  };

  goEdit = (e, AddressBookNo) => {
    window.localStorage.setItem("addressNo", AddressBookNo);
    browserHistory.push("../account/addresses");
    window.location.reload(false)
  };

  renderAddress() {
    const selfCollect = {
      CountryID: 1,
      UserAddressBookID: 0,
      UserCity: 'Self Collect'
    }




    const addresses = this.props.addresses !== undefined && this.props.addresses[0] !== undefined && this.props.addresses[0].ReturnVal !== "0" && this.props.addresses.map((address) => (
      <React.Fragment key={address.UserAddressBookID}>
        <div className="addresses-list__item card address-card">
          {address.UserAddressBookID ==
            this.state.defaultAddress.UserAddressBookID && (
              <div className="address-card__badge">Selected</div>
            )}
          <div
            className="address-card__body"
            onClick={(e) => this.handleClick(e, address)}
          >
            <div className="address-card__name">{`${address.UserAddressName}`}</div>
            <div className="address-card__row">
              {address.CountryID}
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
                to="/account/addresses"
                onClick={(e) => this.goEdit(e, address.UserAddressBookID)}
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

        <Link
          to="/account/addresses"
          className="addresses-list__item addresses-list__item--new"
        >
          <div className="addresses-list__plus" />
          <div className="btn btn-secondary btn-sm">Add New</div>
        </Link>
        <div className="addresses-list__divider" />
      </div>
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
                {this.renderCart()}
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
  // productcart: state.counterReducer.productcart
});

const mapDispatchToProps = (dispatch) => ({
  CallAllAddress: (prodData) => dispatch(GitAction.CallAllAddress(prodData)),
  CallDeleteAddress: (prodData) => dispatch(GitAction.CallDeleteAddress(prodData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PageCheckOrder);