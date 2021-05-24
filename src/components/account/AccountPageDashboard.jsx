// react
import React, { Component } from "react";

// third-party
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

// data stubs
import addresses from "../../data/accountAddresses";
import allOrders from "../../data/accountOrders";
import theme from "../../data/theme";
import userImage from "../../assets/user.jpg";
import { connect } from "react-redux";
import { GitAction } from "../../store/action/gitAction";

function mapStateToProps(state) {
  return {
    allmerchantorders: state.counterReducer["merchantOrders"],
    alltransactionstatus: state.counterReducer["transactionStatus"],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    CallGetMerchantsOrders: (propsData) =>
      dispatch(GitAction.CallGetMerchantsOrders(propsData)),
    CallGetTransactionStatus: () =>
      dispatch(GitAction.CallGetTransactionStatus()),
  };
}

class AccountPageDashboard extends Component {
  constructor(props) {
    super(props);

    this.props.CallGetTransactionStatus();
    this.props.CallGetMerchantsOrders({
      trackingStatus: this.props.alltransactionstatus.map(
        (status) => status.TrackingStatusID
      ),
      UserID: window.localStorage.getItem("id"),
    });
  }

  render() {
    const orders = this.props.allmerchantorders.slice(0, 3).map((order) => {
      const quantity = JSON.parse(order.OrderProductDetail).map(
        (orders) => orders.ProductQuantity
      );
      const price = JSON.parse(order.OrderProductDetail).map(
        (orders) => orders.ProductSellingPrice
      );

      var totalQuantity = 0;
      var totalPrice = 0;

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

      return (
        <tr key={order.id}>
          <td>
            <Link to="/account/orders/5">#{order.OrderID}</Link>
          </td>
          <td>{order.CreatedDate}</td>
          <td>{order.TrackingStatus}</td>
          <td>{totalQuantity + " items," + " RM " + totalPrice}</td>
        </tr>
      );
    });

    return (
      <div className="dashboard">
        <Helmet>
          <title>{`My Account — ${theme.name}`}</title>
        </Helmet>
        <div className="dashboard__profile card profile-card">
          <div className="card-body profile-card__body">
            <div className="profile-card__avatar">
              <img
                className="img-responsive img-rounded"
                src={userImage}
                alt="User "
              />
            </div>
            <div className="profile-card__name">
              {localStorage.getItem("firstname")}
              <strong> {localStorage.getItem("lastname")}</strong>
            </div>
            <div className="profile-card__email">
              {localStorage.getItem("role")}
            </div>
            <div className="profile-card__edit">
              <Link to={"/account/profile"} className="btn btn-secondary btn-sm">
                Edit Profile
              </Link>
            </div>
          </div>
        </div>
        <div className="dashboard__orders card">
          <div className="card-header">
            <h5>Recent Orders</h5>
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
                <tbody>{orders}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountPageDashboard);
