// react
import React from "react";

// third-party
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

// data stubs
import theme from "../../data/theme";
import Logo from "../../assets/Emporia.png";

export default function AccountPageOrderDetails(props) {
  const orderDetail = props.location.orderdetails;
  const orderproduct = JSON.parse(orderDetail.OrderProductDetail).map(
    (orders) => orders.ProductQuantity
  );
  const orderTotalPrice = props.location.orderprice;
  const address = props.location.address;
  const creditcard = props.location.creditcards;

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
          <h5 className="order-header__title">Order #{orderDetail.OrderID}</h5>
          <div className="order-header__subtitle">
            Was placed on{" "}
            <mark className="order-header__date">
              {orderDetail.CreatedDate}
            </mark>{" "}
            and is currently{" "}
            <mark className="order-header__status">
              {orderDetail.TrackingStatus}
            </mark>
            .
          </div>
        </div>
        <div className="card-divider" />
        <div className="card-table">
          <div className="table-responsive-sm">
            <table>
              <thead>
                <tr>
                  <th>Preview</th>
                  <th>Product</th>
                  <th>Total</th>
                </tr>
              </thead>
              {JSON.parse(orderDetail.OrderProductDetail).map((orders) => (
                <tbody className="card-table__body card-table__body--merge-rows">
                  <tr>
                    <td>
                      <img
                        className="product-image dropcart__product-image"
                        src={JSON.parse(orders.ProductImages).map(
                          (image) => image.ProductMediaUrl[0]
                        )}
                        alt=""
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = Logo;
                        }}
                      />
                    </td>
                    <td>{orders.ProductName}</td>
                    <td>Rm{orders.ProductSellingPrice}</td>
                  </tr>
                </tbody>
              ))}

              <tbody className="card-table__body card-table__body--merge-rows">
                <tr>
                  <th>Subtotal</th>
                  <td></td>
                  <td>Rm{orderTotalPrice}</td>
                </tr>
                <tr>
                  <th>Store Credit</th>
                  <td></td>
                  <td>$-20.00</td>
                </tr>
                <tr>
                  <th>Shipping</th>
                  <td></td>
                  <td>$25.00</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th>Total</th>
                  <td></td>
                  <td>$5,882.00</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
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
