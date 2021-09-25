// react
import React, { Component } from "react";

// third-party
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

// application
import Pagination from "../shared/Pagination";

// data stubs
import dataOrders from "../../data/accountOrders";
import theme from "../../data/theme";
import { connect } from "react-redux";
import { GitAction } from "../../store/action/gitAction";

function mapStateToProps(state) {
  return {
    allmerchantorders: state.counterReducer["merchantOrders"],
    alltransactionstatus: state.counterReducer["transactionStatus"],
    addresses: state.counterReducer["addresses"],
    creditcard: state.counterReducer["creditcards"],
    transaction: state.counterReducer["transaction"],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    CallGetMerchantsOrders: (propsData) =>
      dispatch(GitAction.CallGetMerchantsOrders(propsData)),

    CallGetTransactionStatus: () =>
      dispatch(GitAction.CallGetTransactionStatus()),

    CallAllAddress: (prodData) => dispatch(GitAction.CallAllAddress(prodData)),

    CallAllCreditCard: (prodData) =>
      dispatch(GitAction.CallAllCreditCard(prodData)),
  };
}
class AccountPageOrders extends Component {
  constructor(props) {
    super(props);
    this.props.CallGetTransactionStatus();
    this.props.CallGetMerchantsOrders({
      trackingStatus: 2,
      // trackingStatus: this.props.alltransactionstatus.map(
      //   (status) => status.TrackingStatusID
      // ),
      UserID: window.localStorage.getItem("id")
    });
    this.props.CallAllAddress({USERID: window.localStorage.getItem("id")});

    this.props.CallAllCreditCard(window.localStorage.getItem("id"));
    this.state = {
      //   orders: dataOrders,
      page: 1,
      rowsPerPage: 10,
      shipping: 25,
      tax: 0
    };
  }

  handlePageChange = (page) => {
    this.setState(() => ({ page }));
  };

  render() {
    const { page } = this.state;
    const ordersList = this.props.allmerchantorders
    .slice((page - 1) * this.state.rowsPerPage, (page - 1) * this.state.rowsPerPage + this.state.rowsPerPage)
    .map((order) => {
      const quantity = JSON.parse(order.OrderProductDetail).map(
        (orders) => orders.ProductQuantity
      );
      const price = JSON.parse(order.OrderProductDetail).map(
        (orders) => orders.ProductSellingPrice
      );

      const subtotal = JSON.parse(order.OrderProductDetail).map(
        (orders) => orders.ProductSellingPrice * orders.ProductQuantity
      );

      var totalQuantity = 0;
      var totalPrice = 0;
      var subtotalPrice = 0;
      var totalOverall = 0;

      if (price.length > 0) {
        totalPrice = price.reduce((previous, current) => previous + current, 0);
      } else {
        totalPrice = price;
      }

      if (quantity.length > 1) {
        totalQuantity = quantity.reduce(
          (previous, current) => previous + current,
          0
        );
      } else {
        totalQuantity = quantity;
      }

      if (subtotal.length > 0) {
        subtotalPrice = subtotal.reduce((previous, current) => previous + current, 0);
      } else {
        subtotalPrice = subtotal;
      }
      totalOverall = subtotalPrice + this.state.shipping + this.state.tax

      return (
        <tr key={order.OrderID}>
          <td>
            <Link
              to={{
                pathname: "/account/orders/"+ order.OrderID,
                orderdetails: order,
                orderprice: totalPrice,
                address: this.props.addresses,
                creditcards: this.props.creditcard,
              }}
            >{`#${order.OrderID}`}</Link>
          </td>

          <td>{order.CreatedDate}</td>
          <td>{order.TrackingStatus}</td>
          <td>{totalQuantity + " items - " + " RM " + totalOverall}</td>
        </tr>
      );
    });

    return (
      <div className="card">
        <Helmet>
          <title>{`Order History — ${theme.name}`}</title>
        </Helmet>

        <div className="card-header">
          <h5>Order History</h5>
        </div>
        <div className="card-divider" />
        <div className="card-table">
          <div className="table-responsive-sm">
            <table>
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>{ordersList}</tbody>
            </table>
          </div>
        </div>
        <div className="card-divider" />
        <div className="card-footer">
          <Pagination
            current={page}
            // total={ordersList.length}
            total={
              this.props.allmerchantorders != null
                ?  Math.ceil(this.props.allmerchantorders.length / this.state.rowsPerPage)
                : 1
            }
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountPageOrders);
