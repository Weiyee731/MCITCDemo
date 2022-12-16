// react
import React from "react";

// third-party
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

// data stubs
import theme from "../../data/theme";
import Logo from "../../assets/Emporia.png";
// import { browserHistory } from "react-router";

//Display by Order Along with Tracking No
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Divider from '@mui/material/Divider';

// Display Card
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

//stepper
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Box from '@mui/material/Box';

import AccountPagePayment from "./AccountPagePayment";
import { isStringNullOrEmpty } from "../../Utilities/UtilRepo";
import DeliveryFee from "../shop/ShopPageDeliveryFee";


//stepper content
const steps = [
  {

    date: '1/12/2021',
    time: '12:00',
    description: 'Sender is preparing to ship your parcel'
  },
  {
    date: '2/12/2021',
    time: '10:20',
    description: 'Parcel has been picked up by courier',
  },
  {
    date: '3/12/2021',
    time: '08:35',
    description: 'Parcel has arrived at Station J&T SWKAIR GATEWAY',
  },
  {
    date: '4/12/2021',
    time: '12:45',
    description: 'Parcel has been delivered to Ali Abu',
    receipt: "https://www.mhoopay.com/assets/images/faq-my/packaging/poslaju06.png"
  },
];



export default function AccountPageOrderDetails(props) {
  console.log(props)
  //dialog
  const [open, setOpen] = React.useState(false);
  const [isProceedPayment, setProceedPayment] = React.useState(false);
  const [isDeliverySet, setDelivery] = React.useState(false);
  const [shippingFees, setShippingFees] = React.useState(0);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleGetPostcode = (value) => {
    if (!isNaN(value)) {
      setShippingFees(value)
      setDelivery(true)
    }
  }

  const orderDetail = props.location.orderdetails;
  if (orderDetail === undefined) {
    this.props.history.push("/account/orders")
    // this.props.history.push("/account/orders");
    // window.location.reload(false);
  }

  let filteredMerchant = [];


  if (orderDetail !== undefined && orderDetail.OrderProductDetail !== null) {
    filteredMerchant = JSON.parse(orderDetail.OrderProductDetail).filter((ele, ind) => ind
      === JSON.parse(orderDetail.OrderProductDetail).findIndex(elem => elem.MerchantID === ele.MerchantID))
  }


  const address = props.location.address;
  const creditcard = props.location.creditcards;

  const subtotal = orderDetail.OrderProductDetail !== null ? JSON.parse(orderDetail.OrderProductDetail).map(
    (orders) => orders.ProductVariationPrice * orders.ProductQuantity
  ) : "";
  var subtotalPrice = 0;
  var totalOverall = 0;
  var shipping = 0;
  var tax = 0;
  var storecredit = 0;

  if (subtotal.length > 0) {
    subtotalPrice = parseFloat(subtotal.reduce((previous, current) => previous + current, 0)).toFixed(2);
  } else {
    subtotalPrice = parseFloat(subtotal).toFixed(2);
  }

  totalOverall = isStringNullOrEmpty(orderDetail) ? parseFloat(0).toFixed(2) : parseFloat(orderDetail.totalAmount).toFixed(2)
  shipping = parseFloat(totalOverall - subtotalPrice).toFixed(2)


  let trackingDetail = (index) => (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Typography style={{ marginLeft: '4%', marginTop: '1%', marginBottom: '1%' }}>Order {index}</Typography>
      {/* <Typography style={{ marginLeft: '4%', marginTop: '1%' }}>Tracking No: AA987654321BB</Typography>
      <IconButton aria-label="View" style={{ marginLeft: 'auto' }} onClick={handleClickOpen}> <VisibilityIcon /></IconButton> */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Typography variants="body1" style={{ marginLeft: '10%', marginTop: '7%' }}>
          {"Tracking No:  AA987654321BB"}
        </Typography>
        <DialogContent>
          <Box sx={{ maxWidth: 400 }}>
            <Stepper orientation="vertical" >
              {steps.map((step, index) => (
                <Step key={step.date} expanded="true">
                  <StepLabel  >
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <Typography variant="caption"> {step.date} </Typography>
                      <Typography variant="caption" style={{ marginLeft: "auto" }}> {step.time} </Typography>
                    </div>
                  </StepLabel>
                  <StepContent>
                    <Typography variant="caption">{step.description}</Typography>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </Box>
          {/* ---------------------------------------------------------------------- */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )

  let addressListing = (addresspreview, data) => {

    return (
      <div className="card address-card address-card--featured">
        <div className="address-card__body">
          <div className="address-card__badge address-card__badge--muted">
            Shipping Address
          </div>
          <div className="address-card__name">
            {
              data === "addressBook" ?
                addresspreview.UserAddressName !== null ? (addresspreview.UserAddressName).toUpperCase() : ""
                :
                addresspreview.UserAddressName === null ? (addresspreview.FirstName).toUpperCase() : (addresspreview.UserAddressName).toUpperCase()
            }
          </div>
          <div className="address-card__row">
            <div className="address-card__row-title">Shipping Address</div>
            {addresspreview.UserAddressLine1 !== null ? (addresspreview.UserAddressLine1).toUpperCase() : ""}
            <br />
            {addresspreview.UserAddressLine2 !== null ? (addresspreview.UserAddressLine2).toUpperCase() : ""}
            <br />
            {addresspreview.UserCity !== null ? (addresspreview.UserCity).toUpperCase() : ""}
            {addresspreview.UserPoscode}{" "}
            {addresspreview.UserState !== null ? (addresspreview.UserState).toUpperCase() : ""}
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
              {
                data === "addressBook" ?
                  addresspreview.UserEmail !== null ? (addresspreview.UserEmail).toLowerCase() : ""
                  :
                  addresspreview.UserEmailAddress !== null ? (addresspreview.UserEmailAddress).toLowerCase() : ""
              }
            </div>
          </div>
        </div>
      </div>
    )
  }


  return (
    <React.Fragment>
      {
        isProceedPayment === true ?
          // isDeliverySet === true ?
          <AccountPagePayment data={orderDetail} shippingFees={shipping} />
          :
          //   <DeliveryFee handleGetPostcode={handleGetPostcode} addressID={address !== 0 ? address[0].UserAddressBookID : address} data={JSON.parse(orderDetail.OrderProductDetail)} orderHistory={true} />
          // :
          <>
            <Helmet>
              <title>{`Order Details — ${theme.name}`}</title>
            </Helmet>
            <div className="card">
              <div className="order-header">
                <div className="order-header__actions">
                  {/* {
                    orderDetail.TrackingStatusID !== 4 ? */}
                      <Button onClick={() => window.location.href = "/account/orders"} style={{ backgroundColor: "grey", color: "white", borderWidth: 0, margin: "3px" }}>
                        BACK TO LIST
                      </Button>
                      {/* : */}
                      {/* <Button style={{ backgroundColor: "#d23f57", color: "white", borderWidth: 0, margin: "3px" }}>
                        RATE
                      </Button> */}
                  {/* } */}
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
                  {orderDetail.OrderProductDetail !== null ?
                    <>
                      {filteredMerchant.length > 0 && filteredMerchant.map((MerchantList, i) => {
                        return (
                          <>
                            <div key={i}>
                              <th>
                                {
                                  props.location.merchant.length > 0 && props.location.merchant.filter((X) => X.UserID === MerchantList.MerchantID).map((merchant) => {
                                    return (merchant.ShopName)
                                  })
                                }
                              </th>
                            </div>
                            <div style={{ backgroundColor: '#F9D295' }}>
                              <Divider light />
                              {trackingDetail(i + 1)}
                            </div>
                            <table>
                              <thead>
                                <tr>
                                  <th>Preview</th>
                                  <th>Product</th>
                                  <th>Unit Price</th>
                                  <th>Quantity</th>
                                  <th>Total</th>
                                  <th>Tracking</th>
                                </tr>
                              </thead>
                              {
                                orderDetail.OrderProductDetail !== null && JSON.parse(orderDetail.OrderProductDetail).filter((x) => x.MerchantID === MerchantList.MerchantID)
                                  .map((orders) => {
                                    return (
                                      <tbody className="card-table__body card-table__body--merge-rows">
                                        <tr>
                                          <td style={{ width: "15%" }}>
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
                                          <td style={{ width: "20%" }}>
                                            <div style={{ fontSize: "14px", fontWeight: "bold" }}>  {orders.ProductName}  </div>
                                            <div style={{ fontSize: "11px" }}>  Variation : {orders.ProductVariationValue}  </div>
                                            <div style={{ fontSize: "11px" }}>  SKU : {orders.SKU}  </div>
                                            <div style={{ fontSize: "11px" }}>  Dimension : {orders.ProductDimensionWidth}m (W) X {orders.ProductDimensionHeight}m (H) X {orders.ProductDimensionDeep}m (L) </div>
                                            <div style={{ fontSize: "11px" }}>  Weight : {orders.ProductWeight} kg   </div>
                                          </td>

                                          <td style={{ width: "15%" }}>RM {parseFloat(orders.ProductVariationPrice).toFixed(2)}</td>
                                          <td style={{ width: "10%" }}>{orders.ProductQuantity}</td>
                                          <td style={{ width: "15%" }}>RM {parseFloat(orders.ProductVariationPrice * orders.ProductQuantity).toFixed(2)}</td>
                                          {
                                            orders.LogisticID !== null && orders.LogisticID !== 0 ?
                                              <>
                                                <td style={{ width: "15%" }}>
                                                  <div style={{ fontSize: "13px" }}>
                                                    {props.location.logistic.length > 0 && props.location.logistic.filter((x) => x.LogisticID === orders.LogisticID).map((courier) => {
                                                      return (courier.LogisticName)
                                                    })}
                                                  </div>
                                                  <div style={{ fontSize: "13px" }}>
                                                    {orders.TrackingNumber}
                                                  </div>
                                                </td>
                                              </>
                                              :
                                              <td style={{ width: "15%" }}>
                                                <div style={{ fontSize: "13px", textAlign: "center" }}>
                                                  Temporarily no tracking for this item
                                                </div>
                                              </td>
                                          }
                                        </tr>
                                      </tbody>
                                    )
                                  })}
                            </table>
                          </>
                        )
                      })}
                      <Divider light />
                      <div style={{ padding: "15px 15px", backgroundColor: "white" }}>
                        <div className="row">
                          <div className="col-10" style={{ fontWeight: "bold", textAlign: "right", }}>  Subtotal </div>
                          <div className="col-2" >RM {subtotalPrice}</div>
                        </div>
                        <div className="row" >
                          <div className="col-10" style={{ fontWeight: "bold", textAlign: "right", }}>  Shipping </div>
                          <div className="col-2" >RM {shipping}</div>
                        </div>
                      </div>
                      <Divider light />
                      <div style={{ padding: "15px 15px", backgroundColor: "white" }}>
                        <div className="row">
                          <div className="col-10" style={{ fontWeight: "bold", textAlign: "right", }}>  Total </div>
                          <div className="col-2" >RM {totalOverall}</div>
                        </div>
                      </div>
                    </>
                    :
                    <div style={{ textAlign: "center", marginBottom: "20px" }}>
                      <div style={{ marginBottom: "20px" }}>
                        Something went wrong
                      </div>
                      <Link to="/" className="btn btn-primary btn-sm">Continue Shopping</Link>
                    </div>
                  }
                </div>
              </div>
            </div>
            <div className="row mt-3 no-gutters mx-n2">
              <div className="col-sm-6 col-12 px-2 mt-sm-0 mt-3">
                {
                  orderDetail.PickUpInd === 0 ?
                    orderDetail.UserAddresID !== 0 && orderDetail.UserAddressLine1 === null ?
                      address.filter((x) => x.UserAddressBookID === orderDetail.UserAddresID).map((addresspreview) => (
                        addressListing(addresspreview, "addressBook")
                      ))
                      :
                      addressListing(orderDetail, "newAddress")
                    :
                    <div className="card address-card address-card--featured">
                      <div className="address-card__body">
                        <div className="address-card__badge address-card__badge--muted">
                          Self Pick Up
                        </div>
                        <div className="address-card__name">
                          User Self Pick Up
                        </div>
                        <div className="address-card__name">
                          {orderDetail.UserFullName === null ? orderDetail.FirstName : orderDetail.UserFullName}
                        </div>
                        <div className="address-card__row">
                          {orderDetail.UserContactNo}
                        </div>
                      </div>
                    </div>
                }
              </div>
              <div className="col-sm-6 col-12 px-2 mt-sm-0 mt-3">
                {
                  orderDetail.TrackingStatus === "In Purchasing" ?
                    <div className="card address-card address-card--featured">
                      <div className="address-card__body">
                        <div className="address-card__badge address-card__badge--muted">
                          Pending Payment
                        </div>
                        <div className="address-card__row">
                          <div className="address-card__name">
                            Waiting for payment to complete the order
                          </div>
                        </div>
                        <div style={{ textAlign: "center" }}>
                          <Button onClick={() => setProceedPayment(true)} style={{ backgroundColor: "forestgreen", color: "white", borderWidth: 0 }}>
                            Proceed Payment
                          </Button>
                        </div>

                      </div>
                    </div>
                    :
                    <>
                      {
                        orderDetail.PaymentMethodID === 1 ?
                          <div className="card address-card address-card--featured">
                            <div className="address-card__body">
                              <div className="address-card__badge address-card__badge--muted">
                                CREDIT / DEBIT CARD
                              </div>
                              <div className="address-card__row">
                                <div className="address-card__name">
                                  CREDIT / DEBIT CARD PAYMENT
                                </div>
                              </div>
                            </div>
                          </div>
                          :
                          <>
                            {
                              orderDetail.PaymentMethodID === 3 &&
                              <div className="card address-card address-card--featured">
                                <div className="address-card__body">
                                  <div className="address-card__badge address-card__badge--muted">
                                    E-WALLET
                                  </div>
                                  <div className="address-card__row">
                                    <div className="address-card__name">
                                      E-WALLET PAYMENT
                                    </div>
                                  </div>
                                </div>
                              </div>
                            }
                            {
                              orderDetail.PaymentMethodID === 2 &&
                              <div className="card address-card address-card--featured">
                                <div className="address-card__body">
                                  <div className="address-card__badge address-card__badge--muted">
                                    FPX
                                  </div>
                                  <div className="address-card__row">
                                    <div className="address-card__name">
                                      FPX PAYMENT
                                    </div>
                                  </div>
                                </div>
                              </div>
                            }
                            {
                              orderDetail.PaymentMethodID === 4 &&
                              <div className="card address-card address-card--featured">
                                <div className="address-card__body">
                                  <div className="address-card__badge address-card__badge--muted">
                                    PAYPAL
                                  </div>
                                  <div className="address-card__row">
                                    <div className="address-card__name">
                                      PAYPAL PAYMENT
                                    </div>
                                  </div>
                                </div>
                              </div>
                            }
                          </>
                      }
                    </>
                }
              </div>
            </div>
          </>
      }
    </React.Fragment>
  );
}
