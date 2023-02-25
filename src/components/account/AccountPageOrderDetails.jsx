// react
import React, { useEffect, useState } from "react";

// third-party
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

// application
import { connect } from "react-redux";
import { GitAction } from "../../store/action/gitAction";
import { withRouter } from "react-router-dom";

// data stubs
import theme from "../../data/theme";
import Logo from "../../assets/Emporia.png";
import StoreIcon from '@mui/icons-material/Store';
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

// import AccountPagePayment from "./AccountPagePayment";
import { isStringNullOrEmpty, isArrayNotEmpty } from "../../Utilities/UtilRepo";
// import DeliveryFee from "../shop/ShopPageDeliveryFee";
import { Modal, ModalBody } from "reactstrap";
import CloseIcon from '@mui/icons-material/Close';
import USER from "../../assets/user.jpg";
import ReviewRating from "@mui/lab/Rating";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { toast } from "react-toastify";

import sum from 'lodash/sum';
import CheckoutPayment from '../shop/CheckOutPayment/ShopPageCheckOutPayment';

import Currency from '../shared/Currency';
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

function mapStateToProps(state) {
  return {
    reviews: state.counterReducer["reviews"],
    trackingStatus: state.counterReducer["trackingStatus"],
    loading: state.counterReducer["loading"],
    orderShipmentStatus: state.counterReducer.trackingStatus
  };
}

function mapDispatchToProps(dispatch) {
  return {
    CallAddProductReview: (PropsData) => dispatch(GitAction.CallAddProductReview(PropsData)),
    CallUpdateOrderTrackingStatus: (PropsData) => dispatch(GitAction.CallUpdateOrderTrackingStatus(PropsData)),
    CallOrderRequestShipmentStatus: (PropsData) => dispatch(GitAction.CallOrderRequestShipmentStatus(PropsData)),
    CallResetOrderTrackingStatus: () => dispatch(GitAction.CallResetOrderTrackingStatus()),
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

function getWindowDimensions() {
  const { innerWidth: width } = window;
  return {
    width,
  };
}


function AccountPageOrderDetails(props) {
  //dialog
  const [open, setOpen] = React.useState(false);
  const [isProceedPayment, setProceedPayment] = React.useState(false);
  const [isDeliverySet, setDelivery] = React.useState(false);
  const [shippingFees, setShippingFees] = React.useState(0);
  const [openRate, setopenRate] = React.useState(false);
  const [productReviewRating, setproductReviewRating] = React.useState(0);
  const [parentProductReviewID, setparentProductReviewID] = React.useState(0);
  const [productReviewComment, setproductReviewComment] = React.useState("");
  const [isReviewSet, setisReviewSet] = React.useState(false);
  const [paymentOrderDetail, setPaymentOrderDetail] = React.useState([]);
  const [isOpenModalCancel, setModalCancel] = React.useState(false);
  const [isOrderCancel, setCancelOrder] = React.useState(false);
  const { width } = useWindowDimensions();
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
    window.location.href = "/EmporiaDev/account/orders"
    // this.props.history.push("/EmporiaDev/account/orders")
    // this.props.history.push("/EmporiaDev/account/orders");
    // window.location.reload(false);
  }

  let filteredMerchant = [];


  if (orderDetail !== undefined && orderDetail.OrderProductDetail !== null) {
    filteredMerchant = JSON.parse(orderDetail.OrderProductDetail).filter((ele, ind) => ind
      === JSON.parse(orderDetail.OrderProductDetail).findIndex(elem => elem.MerchantID === ele.MerchantID))

    if (paymentOrderDetail.length === 0) {
      let listing =
      {
        address: {
          CountryID: orderDetail.CountryID,
          NAS_ODA: orderDetail.NAS_ODA,
          PostOffice: orderDetail.PostOffice,
          UserAddressBookID: orderDetail.UserAddressID,
          UserAddressLine1: orderDetail.UserAddressLine1,
          UserAddressLine2: orderDetail.UserAddressLine2,
          UserAddressName: orderDetail.UserAddressName,
          UserCity: orderDetail.UserCity,
          UserContactNo: orderDetail.UserContactNo,
          UserEmail: orderDetail.UserEmailAddress,
          UserID: orderDetail.UserID,
          UserPoscode: orderDetail.UserPoscode,
          UserState: orderDetail.UserState,

        },
        orderID: orderDetail.OrderID,
        orderName: orderDetail.OrderName,
        data: [],
        subtotal: 0,
        promoCode: orderDetail.PromoCode,
        promoDiscount: orderDetail.PromoDiscount,
        shipping: [{ "ShippingCost": 0 }],
        total: 0,
        discount: 0

        // total: orderDetail.totalAmount
      }

      let detailsListing = []

      orderDetail.OrderProductDetail !== undefined && JSON.parse(orderDetail.OrderProductDetail).map((x) => {
        let image = ""
        if (x.ProductImages !== undefined && x.ProductImages !== null && x.ProductImages !== "[]") {
          image = JSON.parse(x.ProductImages)[0].ProductMediaUrl
        }
        let data = {
          MerchantID: x.MerchantID,
          MerchantShopName: x.MerchantShopName,
          product: {
            MerchantID: x.MerchantID,
            MerchantShopName: x.MerchantShopName,
            ProductID: x.ProductID,
            ProductImage: image,
            ProductName: x.ProductName,
            ProductPrice: x.ProductVariationPrice,
            ProductQuantity: x.ProductQuantity,
            ProductVariationDetailID: x.ProductVariationDetailID,
            ProductVariationValue: x.ProductVariationValue,
            PromotionPrice: x.PromotionPrice,
            DiscountPrice: x.DiscountPrice,
            ShopState: x.ProductID,
          },
          totalPromotionPrice: x.PromotionPrice * x.ProductQuantity,
          totalDiscountPrice: x.DiscountPrice * x.ProductQuantity,
          price: x.ProductVariationPrice,
          quantity: x.ProductQuantity,
          total: x.ProductVariationPrice * x.ProductQuantity,
        }
        detailsListing.push(data)
      })
      let subtotalPrice = sum(detailsListing.map((item) => item.total))
      listing.subtotal = subtotalPrice
      listing.discount = parseFloat(orderDetail.PromoDiscount / 100 * subtotalPrice) + sum(detailsListing.map((item) => item.totalDiscountPrice))
      listing.total = orderDetail.totalAmount
      listing.shipping[0] = { ShippingCost: orderDetail.OrderShippingFeeAmount !== null ? orderDetail.OrderShippingFeeAmount : 0 }
      listing.data = detailsListing
      setPaymentOrderDetail(listing)
    }

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

  let trackingDetail = (index, MerchantList) => (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Typography style={{ marginLeft: '4%', marginTop: '1%', marginBottom: '1%' }}><StoreIcon /> {MerchantList.ShopName}</Typography>
      {/* <Typography style={{ marginLeft: '4%', marginTop: '1%' }}>Tracking No: AA987654321BB</Typography>
      <IconButton aria-label="View" style={{ marginLeft: 'auto' }} onClick={handleClickOpen}> <VisibilityIcon /></IconButton> */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* <Typography variants="body1" style={{ marginLeft: '10%', marginTop: '7%' }}>
          {"Tracking No:  AA987654321BB"}
        </Typography> */}
        <DialogContent>
          <Box sx={{ maxWidth: 400 }}>
            {/* <Stepper orientation="vertical" >
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
            </Stepper> */}
            <div className="container-fluid">
              <div className="container">
                {props.orderShipmentStatus.length !== 0 ?
                  <>
                    {isArrayNotEmpty(props.orderShipmentStatus.trackHeader) &&
                      <Typography style={{ fontWeight: "bold" }}>Tracking Number :{props.orderShipmentStatus.trackHeader[0].hawb}</Typography>
                    }
                    <hr />
                    {
                      isArrayNotEmpty(props.orderShipmentStatus.trackDetails) &&
                      <div className="row">
                        <Typography style={{ fontWeight: "bold" }}>Parcel Status</Typography><br />
                        <Typography>Shiping Status : {props.orderShipmentStatus.trackDetails[0].status}</Typography><br />
                        <Typography>Latest Location : {props.orderShipmentStatus.trackDetails[0].location}</Typography><br />
                        <Typography>Latest Update Time : {props.orderShipmentStatus.trackDetails[0].detTime}</Typography><br />
                        <Typography>Latest Update Date : {props.orderShipmentStatus.trackDetails[0].detDate}</Typography><br />
                      </div>
                    }
                    <hr />
                    {
                      isArrayNotEmpty(props.orderShipmentStatus.trackHeader) &&
                      <div className="row">
                        <Typography style={{ fontSize: "11px", fontWeight: "bold" }}>Parcel Details</Typography><br />
                        <Typography>Parcel Origin : {props.orderShipmentStatus.trackHeader[0].status}</Typography><br />
                        <Typography>Parcel Destination : {props.orderShipmentStatus.trackHeader[0].location}</Typography><br />
                        <Typography>Parcel Weight : {props.orderShipmentStatus.trackHeader[0].t_weight} kg</Typography><br />
                        <Typography>Parcel Dimension : {props.orderShipmentStatus.trackHeader[0].vw_height + "cm(H) * " + props.orderShipmentStatus.trackHeader[0].vw_length + "cm(L) * " + props.orderShipmentStatus.trackHeader[0].vw_width + "cm(W)"}</Typography>
                      </div>
                    }
                  </>
                  :
                  <Typography>There is an error while retrieving Order Tracking Status</Typography>
                }
              </div>
            </div>
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

  const modalOpen = () => {
    setopenRate(true)
  }
  const modalClose = () => {
    setopenRate(false)
  }

  const OnSubmitReview = (productID) => {
    props.CallAddProductReview({
      parentProductReviewID: parentProductReviewID,
      productID: productID,
      UserID: localStorage.getItem("id"),
      productReviewRating: productReviewRating,
      productReviewComment: productReviewComment,
      replyParentID: 0
    })

    setproductReviewRating(0)
    setproductReviewComment("")
    setisReviewSet(false)
    setopenRate(false)
    toast.success("Thank you for your review!")
  }

  const login = () => {
    props.history.push("/EmporiaDev/login");
  }

  const productID = orderDetail !== null && JSON.parse(orderDetail.OrderProductDetail).map((x) => x.ProductID)

  useEffect(() => {
    if (props.orderShipmentStatus.length !== 0 && !open) {
      setOpen(true)
    }
  }, [props.orderShipmentStatus])



  useEffect(() => {

    if (isArrayNotEmpty(props.trackingStatus) && props.trackingStatus[0].OrderID !== undefined) {
      toast.success("Order " + paymentOrderDetail.orderName + " is successfully cancel")
      props.CallResetOrderTrackingStatus()
      setCancelOrder(true)
      setModalCancel(false)
    }
  }, [props.trackingStatus])


  return (
    <React.Fragment>
      <>
        {
          // width >= 768 ?
          isProceedPayment === true ?
            // isDeliverySet === true ?
            // <AccountPagePayment data={orderDetail} shippingFees={shipping} />
            <>
              <CheckoutPayment
                checkout={paymentOrderDetail}
                isPendingPayment={true}
                discount={paymentOrderDetail.discount}
                subtotal={paymentOrderDetail.subtotal}
                total={isArrayNotEmpty(paymentOrderDetail.shipping) ? paymentOrderDetail.total - paymentOrderDetail.shipping[0].ShippingCost : paymentOrderDetail.total}
                promoCode={paymentOrderDetail.promoCode}
                // validPromoData={this.state.validPromoData}
                // onRemovePromoError={this.handleRemovePromoError}
                // onHandleDiscount={this.onHandleDiscount}
                // onHandlePromoCode={this.onHandlePromoCode}
                // onApplyDiscount={this.handleApplyDiscount}
                // onBackStep={this.handleBackStep}
                // onGotoStep={this.handleGotoStep}
                deliveryFee={paymentOrderDetail.shipping}
              // onApplyShipping={this.handleApplyShipping}
              />
            </>

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
                    {
                      orderDetail.TrackingStatusID !== 4 ?
                        <Button onClick={() => window.location.href = "/EmporiaDev/account/orders"} style={{ backgroundColor: "grey", color: "white", borderWidth: 0, margin: "3px" }}>
                          BACK TO LIST
                        </Button>
                        :
                        <Button onClick={() => modalOpen()} style={{ backgroundColor: "#2b535e", color: "white", borderWidth: 0, margin: "3px" }}>
                          RATE
                        </Button>
                    }
                  </div>
                  <h5 className="order-header__title">Order #{orderDetail.OrderID}</h5>
                  <div className="order-header__subtitle">
                    Was placed on{" "}
                    <mark className="order-header__date">
                      {orderDetail.CreatedDate}
                    </mark>{" "}
                    and is currently{" "}
                    <mark className="order-header__status">
                      {isOrderCancel === false ? orderDetail.TrackingStatus : " Cancelled"}
                    </mark>
                    .
                  </div>
                </div>
                <div className="card-divider" />
                {
                  width >= 768 ?
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
                                    {trackingDetail(i + 1, MerchantList)}
                                  </div>
                                  <table>
                                    <thead>
                                      <tr>
                                        <th>Image</th>
                                        <th>Product</th>
                                        <th>Unit Price</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                        {orderDetail.TrackingStatusID !== 1 && <th>Tracking</th>}
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
                                                    src={orders.ProductImages !== null && orders.ProductImages !== "[]" ? JSON.parse(orders.ProductImages)[0].ProductMediaUrl : Logo}
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

                                                <td style={{ width: "15%" }}>
                                                  {
                                                    orders.PromotionPrice !== null ?
                                                      <>
                                                        <span className="product-card__new-price">
                                                          <Currency value={orders.PromotionPrice} currency={"RM"} />
                                                        </span>
                                                        <span className="product-card__old-price">
                                                          <Currency value={orders.ProductVariationPrice} currency={"RM"} />
                                                        </span>
                                                      </>
                                                      :
                                                      <span className="product-card__new-price">
                                                        <Currency value={orders.ProductVariationPrice} currency={"RM"} />
                                                      </span>
                                                  }
                                                </td>
                                                <td style={{ width: "10%" }}>{orders.ProductQuantity}</td>
                                                <td style={{ width: "15%" }}>
                                                  {
                                                    orders.PromotionPrice !== null ?
                                                      <Currency value={orders.PromotionPrice * orders.ProductQuantity} currency={"RM"} />
                                                      :
                                                      <Currency value={orders.ProductVariationPrice * orders.ProductQuantity} currency={"RM"} />
                                                  }
                                                </td>
                                                {
                                                  orders.LogisticID !== null && orders.LogisticID !== 0 ?
                                                    <>
                                                      <td style={{ width: "15%" }} onClick={() => props.CallOrderRequestShipmentStatus({
                                                        TRACKINGNUMBER: orders.TrackingNumber,
                                                        TYPE: "true",
                                                        PROJECTID: 2
                                                      })}>
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
                                                    orderDetail.TrackingStatusID !== 1 &&
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
                                <div className="col-2" >
                                  <Typography variant="subtitle2">{<Currency value={paymentOrderDetail.subtotal}></Currency>}</Typography>
                                </div>
                              </div>
                              <div className="row" >
                                <div className="col-10" style={{ fontWeight: "bold", textAlign: "right", }}>  Discount </div>
                                <div className="col-2" >
                                  <Typography variant="subtitle2">{paymentOrderDetail.discount !== null ? <Currency value={-parseFloat(paymentOrderDetail.discount).toFixed(2)}></Currency> : '-'}</Typography>
                                </div>
                              </div>
                              {
                                paymentOrderDetail.promoCode !== null &&
                                <div className="row">
                                  <div className="col-12" style={{ fontWeight: "bold", textAlign: "right", padding: "10px", color: "green" }}>
                                    <Typography> Promocode {paymentOrderDetail.promoCode} is used , {paymentOrderDetail.promoDiscount} % off</Typography>
                                  </div>
                                </div>
                              }
                              <div className="row" >
                                <div className="col-10" style={{ fontWeight: "bold", textAlign: "right", }}>  Shipping </div>
                                <div className="col-2" >
                                  <Typography variant="subtitle2">{isArrayNotEmpty(paymentOrderDetail.shipping) ? <Currency value={parseFloat(paymentOrderDetail.shipping[0].ShippingCost).toFixed(2)}></Currency> : <Currency value={0}></Currency>}</Typography></div>
                              </div>
                            </div>

                            <Divider light />
                            <div style={{ padding: "15px 15px", backgroundColor: "white" }}>
                              <div className="row">
                                <div className="col-10" style={{ fontWeight: "bold", textAlign: "right", }}>  Total </div>
                                <div className="col-2" >
                                  <Typography variant="subtitle2">{<Currency value={paymentOrderDetail.total}></Currency>}</Typography>
                                </div>
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
                    :
                    // mobile View
                    <div>
                      {filteredMerchant.length > 0 && filteredMerchant.map((MerchantList, i) => {
                        return (
                          <>
                            {
                              orderDetail.OrderProductDetail !== null && JSON.parse(orderDetail.OrderProductDetail).filter((x) => x.MerchantID === MerchantList.MerchantID)
                                .map((orders) => {
                                  return (
                                    <div className="m-3">
                                      <div className="d-flex justify-content-center">
                                        <img
                                          className="product-image dropcart__product-image"
                                          src={orders.ProductImages !== null && orders.ProductImages !== "[]" ? JSON.parse(orders.ProductImages)[0].ProductMediaUrl : Logo}
                                          alt=""
                                          onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = Logo;
                                          }}
                                        />
                                      </div>
                                      <div style={{ fontSize: "14px", fontWeight: "bold" }}><center>{orders.ProductName}</center>  </div>
                                      <div style={{ fontSize: "11px" }}>  Variation : {orders.ProductVariationValue}  </div>
                                      <div style={{ fontSize: "11px" }}>  SKU : {orders.SKU}  </div>
                                      <div style={{ fontSize: "11px" }}>  Dimension : {orders.ProductDimensionWidth}m (W) X {orders.ProductDimensionHeight}m (H) X {orders.ProductDimensionDeep}m (L) </div>
                                      <div style={{ fontSize: "11px" }}>  Weight : {orders.ProductWeight} kg   </div>

                                      <div style={{ fontSize: "11px" }}>Unit Price :
                                        {
                                          orders.PromotionPrice !== null ?
                                            <>
                                              <span className="product-card__new-price">
                                                <Currency value={orders.PromotionPrice} currency={"RM"} />
                                              </span>
                                              <span className="product-card__old-price">
                                                <Currency value={orders.ProductVariationPrice} currency={"RM"} />
                                              </span>
                                            </>
                                            :
                                            <span className="product-card__new-price">
                                              <Currency value={orders.ProductVariationPrice} currency={"RM"} />
                                            </span>
                                        }
                                      </div>
                                      <div style={{ fontSize: "11px" }}>Quantity : {orders.ProductQuantity}</div>
                                      <div className="mt-2" style={{ fontSize: "11px", fontWeight: "bold", textAlign: "right" }}>Total :
                                        {
                                          orders.PromotionPrice !== null ?
                                            <Currency value={orders.PromotionPrice * orders.ProductQuantity} currency={"RM"} />
                                            :
                                            <Currency value={orders.ProductVariationPrice * orders.ProductQuantity} currency={"RM"} />
                                        }
                                      </div>
                                      {
                                        orders.LogisticID !== null && orders.LogisticID !== 0 ?
                                          <>
                                            <div onClick={() => props.CallOrderRequestShipmentStatus({
                                              TRACKINGNUMBER: orders.TrackingNumber,
                                              TYPE: "true",
                                              PROJECTID: 2
                                            })}>
                                              <div style={{ fontSize: "13px" }}>
                                                {props.location.logistic.length > 0 && props.location.logistic.filter((x) => x.LogisticID === orders.LogisticID).map((courier) => {
                                                  return (courier.LogisticName)
                                                })}
                                              </div>
                                              <div style={{ fontSize: "13px" }}>
                                                Tracking: {orders.TrackingNumber}
                                              </div>
                                            </div>
                                          </>
                                          :
                                          orderDetail.TrackingStatusID !== 1 &&
                                          <div>
                                            <div style={{ fontSize: "13px", textAlign: "center" }}>
                                              Temporarily no tracking for this item
                                            </div>
                                          </div>
                                      }
                                      <Divider light />
                                    </div>

                                  )
                                })}
                            <Divider light />
                          </>
                        )
                      })}
                      <div style={{ padding: "15px 15px", backgroundColor: "white", textAlign: "Right", fontSize: "14px" }}>
                        <div className="">
                          <div className="" style={{ fontWeight: "bold" }}>  Subtotal </div>
                          <div className="" >
                            <Typography variant="subtitle2">{<Currency value={paymentOrderDetail.subtotal}></Currency>}</Typography>
                          </div>
                        </div>
                        <div className="" >
                          <div className="" style={{ fontWeight: "bold" }}>  Discount </div>
                          <div className="" >
                            <Typography variant="subtitle2">{paymentOrderDetail.discount !== null ? <Currency value={-parseFloat(paymentOrderDetail.discount).toFixed(2)}></Currency> : '-'}</Typography>
                          </div>
                        </div>
                        {
                          paymentOrderDetail.promoCode !== null &&
                          <div className="">
                            <div className="" style={{ fontWeight: "bold", padding: "10px", color: "green" }}>
                              <Typography> Promocode {paymentOrderDetail.promoCode} is used , {paymentOrderDetail.promoDiscount} % off</Typography>
                            </div>
                          </div>
                        }
                        <div className="" >
                          <div className="" style={{ fontWeight: "bold", }}>  Shipping </div>
                          <div className="" >
                            <Typography variant="subtitle2">{isArrayNotEmpty(paymentOrderDetail.shipping) ? <Currency value={parseFloat(paymentOrderDetail.shipping[0].ShippingCost).toFixed(2)}></Currency> : <Currency value={0}></Currency>}</Typography></div>
                        </div>
                      </div>

                      <Divider light />
                      <div style={{ padding: "15px 15px", backgroundColor: "white", textAlign: "Right" }}>
                        <div className="">
                          <div className="" style={{ fontWeight: "bold", }}>  Total </div>
                          <div className="" >
                            <Typography variant="subtitle2">{<Currency value={paymentOrderDetail.total}></Currency>}</Typography>
                          </div>
                        </div>
                      </div>
                    </div>
                }

              </div>
            </>
        }
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
                <>
                  <div className="card address-card address-card--featured">
                    {
                      isOrderCancel === false ?
                        <>
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
                          <div className="address-card__body">
                            <div className="address-card__row">
                              <div className="address-card__name">
                                Wrong Order is make
                              </div>
                            </div>
                            <div style={{ textAlign: "center" }}>
                              <Button onClick={() => setModalCancel(true)} style={{ backgroundColor: "red", color: "white", borderWidth: 0 }}>
                                Cancel Order
                              </Button>
                            </div>
                          </div>
                        </>
                        :
                        <div className="address-card__body">
                          <div className="address-card__row">
                            <div className="address-card__name" style={{ color: "red", textAlign: "center" }}>
                              This Order is cancelled
                            </div>
                          </div>
                        </div>
                    }
                  </div>
                </>
                :
                <>
                  {
                    orderDetail.TrackingStatusID === 6 ?
                      <div className="card address-card address-card--featured">
                        <div className="address-card__body">
                          <div className="address-card__row">
                            <div className="address-card__name" style={{ color: "red", textAlign: "center" }}>
                              This Order is cancelled
                            </div>
                          </div>
                        </div>
                      </div>
                      :
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
        <div style={{ textAlign: "center", padding: "inherit", }} >
          <Modal
            className="modal-dialog-centered"
            isOpen={openRate}
            toggle={() => modalClose()}
          >
            <ModalBody>
              <CloseIcon
                className="closeIcon"
                onClick={() => modalClose()}
                data-dismiss="modal" />
              <div
                align="center"
                className="form-content p-2"
              >
                <div className="reviews-view__header" >Write A Review</div>
                <div className="row justify-content-center" >
                  <div id="review_avatar" className="review__avatar" style={{ marginLeft: "10px", marginRight: 0 }}>
                    <img src={USER} alt="avatar" onError={(e) => (e.target.src = USER)} />
                  </div>
                  <div className="review__content col-10" style={{}} id="writeReviews">
                    <div style={{ display: "flex" }}>
                      <Box component="fieldset" mb={1} borderColor="transparent" >
                        <ReviewRating
                          size="medium"
                          emptyIcon={<StarBorderIcon fontSize="medium" />}
                          name="customized-empty"
                          value={productReviewRating}
                          onChange={({ target }) => {
                            setproductReviewRating(target.value)
                          }}
                          required
                        />
                      </Box>
                    </div>
                    <div className="form-group mb-2">
                      <textarea className="form-control" style={{ height: "80px" }} placeholder="Tell us more about your review on this product" id="review-text" rows="6" value={productReviewComment} onChange={({ target }) => { setproductReviewComment(target.value) }} required />
                    </div>
                  </div>
                  <div className=" mb-0">
                    <button style={{ borderRadius: "5px" }} className="btn btn-primary btn-md" onClick={() => localStorage.getItem("isLogin") === "false" ? login() : OnSubmitReview(productID[0])} >
                      Post Your Review
                    </button>
                  </div>
                </div>

              </div>
            </ModalBody>
          </Modal>
        </div>

        <div style={{ textAlign: "center", padding: "inherit", }} >
          <Modal
            className="modal-dialog-centered"
            isOpen={isOpenModalCancel}
            toggle={() => setModalCancel(false)}
          >
            <ModalBody>
              <CloseIcon
                className="closeIcon"
                onClick={() => setModalCancel(false)}
                data-dismiss="modal" />
              <div
                align="center"
                className="form-content p-2"
              >
                <div className="reviews-view__header" >Are you sure to cancel this order ? </div>
                <div className="row justify-content-center" >
                  <div className=" mb-0">
                    <button style={{ borderRadius: "5px", margin: "10px" }} className="btn btn-primary btn-md" onClick={() => {
                      props.CallUpdateOrderTrackingStatus({
                        OrderID: paymentOrderDetail.orderID,
                        TrackingStatusID: 6
                      })
                    }

                    }>
                      Yes
                    </button>
                    <button style={{ borderRadius: "8px", margin: "10px", backgroundColor: "white", color: "black", fontWeight: "bold" }} className="btn btn-primary btn-md" onClick={() => setModalCancel(false)} >
                      No
                    </button>
                  </div>
                </div>

              </div>
            </ModalBody>
          </Modal>
        </div>
      </>

    </React.Fragment>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AccountPageOrderDetails));
