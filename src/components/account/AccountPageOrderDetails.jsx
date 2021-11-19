// react
import React from "react";

// third-party
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

// data stubs
import theme from "../../data/theme";
import Logo from "../../assets/Emporia.png";
import { browserHistory } from "react-router";

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
  //dialog
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  //Stepper
  // const [activeStep, setActiveStep] = React.useState(0);

  // const handleNext = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  // };

  // const handleBack = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
  // };

  // const handleReset = () => {
  //   setActiveStep(0);
  // };

  //display Image for Delivery Proof
  // const [display, setDisplay] = React.useState(false);

  // const handleOpenImg = () => {
  //   setDisplay(true);
  // };

  // const handleCloseImg = () => {
  //   setDisplay(false);
  // };

  const orderDetail = props.location.orderdetails;
  if (orderDetail === undefined) {
    browserHistory.push("/Emporia/account/orders");
    window.location.reload(false);
  }

  let filteredMerchant = [];

  console.log("props.location.orderdetails.OrderProductDetail", orderDetail)
  console.log("props.location.orderdetails.OrderProductDetail", orderDetail.OrderProductDetail)

  if (orderDetail !== undefined && orderDetail.OrderProductDetail !== undefined) {
    console.log("props.location.orderdetails.OrderProductDetail 111")
    filteredMerchant = JSON.parse(orderDetail.OrderProductDetail).filter((ele, ind) => ind
      === JSON.parse(orderDetail.OrderProductDetail).findIndex(elem => elem.MerchantID === ele.MerchantID))
    console.log("props.location.orderdetails.OrderProductDetail", filteredMerchant)
  }


  const address = props.location.address;
  const creditcard = props.location.creditcards;

  const subtotal = orderDetail.OrderProductDetail !== null ? JSON.parse(orderDetail.OrderProductDetail).map(
    (orders) => orders.ProductVariationPrice * orders.ProductQuantity
  ) : "";
  var subtotalPrice = 0;
  var totalOverall = 0;
  var shipping = 25;
  var tax = 0;
  var storecredit = 0;

  if (subtotal.length > 0) {
    subtotalPrice = subtotal.reduce((previous, current) => previous + current, 0);
  } else {
    subtotalPrice = subtotal;
  }

  totalOverall = subtotalPrice + parseInt(shipping + tax - storecredit)

  let trackingDetail = (index) => (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Typography style={{ marginLeft: '4%', marginTop: '1%' }}>Order {index}</Typography>
      <Typography style={{ marginLeft: '4%', marginTop: '1%' }}>Tracking No: AA987654321BB</Typography>
      <IconButton aria-label="View" style={{ marginLeft: 'auto' }} onClick={handleClickOpen}> <VisibilityIcon /></IconButton>
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
          {/* Stepper Content */}
          <Box sx={{ maxWidth: 400 }}>
            <Stepper orientation="vertical" >
              {steps.map((step, index) => (
                <Step key={step.date} expanded="true">
                  <StepLabel
                  // optional={
                  //   index === 3 ? (
                  //     <div>
                  //     <Button variant="text" color="secondary" size="small" onClick={handleOpenImg} >View Delivery Proof</Button>
                  //     { display &&
                  //     <div>
                  //     <img src={step.receipt} alt="" style={{width:'90%'}} /> 
                  //      <Button variant="text" color="primary" size="small" onClick={handleCloseImg} >Close</Button> </div>}</div>
                  //   ) : null
                  // }
                  >
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
            {/* {activeStep === steps.length && (
            <Paper square elevation={0} sx={{ p: 3 }}>
              <Typography>All steps completed - you&apos;re finished</Typography>
              <Button onClick={handleOpenImg} sx={{ mt: 1, mr: 1 }}>
                Delivery Proof
              </Button>
            </Paper>
          )} */}
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
            {orderDetail.OrderProductDetail !== null ?
              <>
                {filteredMerchant.length > 0 && filteredMerchant.map((MerchantList, i) => {
                  return (
                    <>
                      <div>
                        <th>
                          ABC MERCHANT SDN BHD
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
                          </tr>
                        </thead>
                        {/* <tr style={{ backgroundColor: '#F9D295' }}>
                          <th><Typography style={{ marginLeft: '4%', marginTop: '1%' }}>Order {i + 1}</Typography></th>
                          <th></th>
                          <th></th>
                          <th><Typography style={{ marginLeft: '4%', marginTop: '1%' }}>Tracking No: AA987654321BB</Typography></th>
                          <th><IconButton aria-label="View" style={{ marginLeft: 'auto' }} onClick={handleClickOpen}> <VisibilityIcon /></IconButton></th>
                          {trackingDetail()}
                        </tr> */}
                        {/* <tr>
                          <th>
                            ABC MERCHANT SDN BHD
                          </th>
                        </tr> */}
                        {
                          orderDetail.OrderProductDetail !== null && JSON.parse(orderDetail.OrderProductDetail).filter((x) => x.MerchantID === MerchantList.MerchantID)
                            .map((orders) => {
                              return (
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
                                    <td>RM{orders.ProductVariationPrice}</td>
                                    <td>{orders.ProductQuantity}</td>
                                    <td>RM{orders.ProductVariationPrice * orders.ProductQuantity}</td>
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
                    <div className="col-2" >RM{subtotalPrice}</div>
                  </div>
                  <div className="row" >
                    <div className="col-10" style={{ fontWeight: "bold", textAlign: "right", }}>  Shipping </div>
                    <div className="col-2" >RM{shipping}</div>
                  </div>
                </div>
                <Divider light />
                <div style={{ padding: "15px 15px", backgroundColor: "white" }}>
                  <div className="row">
                    <div className="col-10" style={{ fontWeight: "bold", textAlign: "right", }}>  Total </div>
                    <div className="col-2" >RM{totalOverall}</div>
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
      {
        orderDetail.UserAddresID !== 0 ?
          address.filter((x) => x.UserAddressBookID === orderDetail.UserAddresID).map((addresspreview) => (
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
            </div>
          ))
          :
          <div className="row mt-3 no-gutters mx-n2">
            <div className="col-sm-6 col-12 px-2">
              <div className="card address-card address-card--featured">
                <div className="address-card__body">
                  <div className="address-card__badge address-card__badge--muted">
                    Self Pick Up
                  </div>
                  <div className="address-card__name">
                    User Self Pick Up
                  </div>
                  <div className="address-card__name">
                    {orderDetail.UserFullName}
                  </div>
                  <div className="address-card__row">
                    {orderDetail.UserContactNo}
                  </div>
                </div>
              </div>
            </div>
          </div>
      }

      <div className="col-sm-6 col-12 px-2 mt-sm-0 mt-3">
        {
          orderDetail.PaymentMethodID === 0 ?
            creditcard.filter((x) => x.UserPaymentMethodID === orderDetail.UserPaymentMethodID).map((paymentcard) => (
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
            ))
            :
            <>
              {
                orderDetail.PaymentMethodID === 1 &&
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
                orderDetail.PaymentMethodID === 3 &&
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

      </div>
    </React.Fragment>
  );
}
