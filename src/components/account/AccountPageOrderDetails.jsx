// react
import React, { Component } from "react";

// third-party
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

// data stubs
import theme from "../../data/theme";
import Logo from "../../assets/Emporia.png";
import { GitAction } from "../../store/action/gitAction";
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  order: state.counterReducer.order,
  orderByID: state.counterReducer.orderByID

});

const mapDispatchToProps = (dispatch) => {
  return {
    CallGetOrderListByID: (prodData) => dispatch(GitAction.CallGetOrderListByID(prodData)),
    CallUpdateProductCart: (prodData) => dispatch(GitAction.CallUpdateProductCart(prodData)),
  }

};

class AccountPageOrderDetails extends Component {


  constructor(props) {
    super(props);

    this.state = {
      cart: [],
      subtotal: 0,
      total: 0,
      shipping: 25,
      tax: 0,
    };
    this.setDetails = this.setDetails.bind(this)
    this.props.CallGetOrderListByID({ OrderID: this.props.location.pathname.split("/")[3] })

  }

  setDetails(order) {

    // console.log("order", order)
    order.map((x) => {
      this.state.cart.push(
        {
          id: x.UserCartID,
          product: x,
          options: [],
          price: x.ProductSellingPrice,
          total: x.ProductQuantity * x.ProductSellingPrice,
          quantity: x.ProductQuantity
        }

      )
      // console.log("x", x)
    })
    this.setState({ subtotal: this.state.cart.reduce((subtotal, item) => subtotal + item.total, 0) })
    this.setState({ total: this.state.cart.reduce((subtotal, item) => subtotal + item.total, 0) + this.state.shipping })
  }

  componentDidMount() {

    // if (this.props.orderByID !== undefined) {
    //   if (this.props.orderByID.OrderProductDetail !== undefined) {
    //     this.setDetails(JSON.parse(this.props.orderByID.OrderProductDetail))
    //   }
    // }

    // if (this.props.orderByID !== undefined) {
    //   this.setState({
    //     CreatedDate : this.props.orderByID.CreatedDate,
    //     OrderID: this.props.orderByID.OrderID,
    //   })
    // if (this.props.orderByID.OrderProductDetail !== undefined) {
    //   this.setDetails(JSON.parse(this.props.orderByID.OrderProductDetail))
    // }
    // }

    if (this.props.location.orderdetails !== undefined) {

      if (this.props.location.orderdetails.OrderProductDetail !== undefined) {
        this.setDetails(JSON.parse(this.props.location.orderdetails.OrderProductDetail))
      }
    }
  }

  render() {

    // console.log("this.props.orderByID", this.props.orderByID)
    // console.log(this.props.location.pathname)
    // console.log("HELLO", this.props.location.pathname.split("/")[3])

    // if (this.props.state === undefined) {
    const orderDetail = this.props.location.orderdetails;

    const orderproduct = orderDetail !== undefined ? JSON.parse(orderDetail.OrderProductDetail).map(
      (orders) => orders.ProductQuantity
    ) : ""
    const orderTotalPrice = this.props.location.orderprice;
    const address = this.props.location.address;
    const creditcard = this.props.location.creditcards;
    // }


    // console.log("this.props", this.props)
    // console.log("match.params.orderId", this.props.match.params.orderId)

    return (
      <React.Fragment>

        <Helmet>
          <title>{`Order Details — ${theme.name}`}</title>
        </Helmet>
        <div className="card">
          <div className="order-header">
            <div className="order-header__actions">
              <Link to="/account/orders" className="btn btn-xs btn-secondary">
                Back to list
              </Link>
            </div>
            {/* {
              this.props.location.state !== undefined ? */}
            <>
              <h5 className="order-header__title">Order #{orderDetail !== undefined ? orderDetail.OrderID : ""}</h5>
              <div className="order-header__subtitle">
                Was placed on{" "}
                <mark className="order-header__date">
                  {orderDetail !== undefined ? orderDetail.CreatedDate : ""}
                </mark>{" "}
                and is currently{" "}
                <mark className="order-header__status">
                  {orderDetail !== undefined ? orderDetail.TrackingStatus : ""}
                </mark>
                .
              </div>
            </>
            {/* : ""
            } */}

          </div>

          <div className="card-divider" />
          <div className="card-table">
            <div className="table-responsive-sm">
              <table>
                <thead>
                  <tr>
                    <th>Preview</th>
                    <th>Product</th>
                    <th>Unit Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                  </tr>
                </thead>
                {/* {console.log("orderdetail", orderDetail)} */}
                {orderDetail !== undefined ? JSON.parse(orderDetail.OrderProductDetail).map((orders) => (
                  <tbody className="card-table__body card-table__body--merge-rows">
                    <tr>
                      <td>
                        <img
                          className="product-image dropcart__product-image"
                          src={orders.ProductImages !== null ? JSON.parse(orders.ProductImages)[0].ProductMediaUrl : Logo}
                          alt=""
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = Logo;
                          }}
                        />
                      </td>
                      <td>{orders.ProductName}</td>
                      <td>RM{orders.ProductSellingPrice}</td>
                      <td>{orders.ProductQuantity}</td>
                      <td>RM{orders.ProductSellingPrice * orders.ProductQuantity}</td>
                    </tr>
                  </tbody>
                )) : ""}

                <tbody className="card-table__body card-table__body--merge-rows">
                  <tr>
                    <th>Subtotal</th>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>RM{this.state.subtotal}</td>
                  </tr>
                  <tr>
                    <th>Shipping</th>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>{this.state.shipping}</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <th>Total</th>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>{this.state.total}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          {/* :
              ""
          } */}

        </div>

        {address.map((addresspreview) => (
          <div className="row mt-3 no-gutters mx-n2">
            <div className="col-sm-6 col-12 px-2">
              <div className="card address-card address-card--featured">
                <div className="address-card__body">
                  <div className="address-card__badge address-card__badge--muted">
                    Shipping Address
                  </div>
                  <div className="address-card__name">
                    {addresspreview.UserAddressName}
                  </div>
                  <div className="address-card__row">
                    {addresspreview.UserAddressLine1}
                    <br />
                    {addresspreview.UserAddressLine2}
                    <br />
                    {addresspreview.UserCity} {addresspreview.UserPoscode}{" "}
                    {addresspreview.UserState}
                  </div>
                  <div className="address-card__row">
                    <div className="address-card__row-title">Phone Number</div>
                    <div className="address-card__row-content">
                      {addresspreview.UserContactNo}
                    </div>
                  </div>
                  <div className="address-card__row">
                    <div className="address-card__row-title">Email Address</div>
                    <div className="address-card__row-content">
                      {addresspreview.UserEmail}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-12 px-2 mt-sm-0 mt-3">
              {creditcard.map((paymentcard) => (
                <div className="card address-card address-card--featured">
                  <div className="address-card__body">
                    <div className="address-card__badge address-card__badge--muted">
                      Credit Card
                    </div>
                    <div className="address-card__name">
                      {paymentcard.UserCardName}
                    </div>
                    <div className="address-card__row">
                      <div className="address-card__row-title">
                        User Card Number
                      </div>
                      {paymentcard.UserCardNo}
                    </div>
                    <div className="address-card__row">
                      <div className="address-card__row-title">Expiry Date</div>
                      <div className="address-card__row-content">
                        {paymentcard.UserCardExpireDate}
                      </div>
                    </div>
                    <div className="address-card__row">
                      <div className="address-card__row-title">Card Type</div>
                      <div className="address-card__row-content">
                        {paymentcard.UserCardType}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </React.Fragment>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AccountPageOrderDetails);


