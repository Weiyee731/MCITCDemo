// react
import React, { Component } from "react";

// third-party
import { connect } from "react-redux";
import { Helmet } from "react-helmet-async";

// application
import PageHeader from "../shared/PageHeader";

// data stubs
import payments from "../../data/shopPayments";
import theme from "../../data/theme";
import PageCheckOrder from "./ShopPageCheckOrder";
import PagePayment from "./ShopPagePayment";
import { GitAction } from "../../store/action/gitAction";
import PageCart from "./ShopPageCart";
import PageCompleted from "./ShopPageCompleted";
import { toast } from "react-toastify";
import axios from "axios";
import { sha256, sha224 } from 'js-sha256';
import { Crypto } from 'crypto-js'
import { createBrowserHistory } from 'history';
import DeliveryFee from "./ShopPageDeliveryFee";
import Grid from '@mui/material/Grid';
import CheckoutSteps from './ShopPageCheckoutStepper';
import CheckoutCart from './ShopPageCheckoutCart';
import CheckoutBillingAddress from './ShopPageCheckoutBillingAddress'
import CheckoutPayment from './CheckOutPayment/ShopPageCheckOutPayment';
const crypto = require('crypto');


function mapStateToProps(state) {
  return {
    // cart: state.cart,
    productcart: state.counterReducer.productcart,
    order: state.counterReducer.order,
    payment: state.counterReducer.payment,
    deliveryFee: state.counterReducer.deliveryFee,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    CallAddOrder: (propsData) => dispatch(GitAction.CallAddOrder(propsData)),
    CallClearOrder: () => dispatch(GitAction.CallClearOrder()),
    CallSentPayment: (propsData) => dispatch(GitAction.CallSentPayment(propsData)),
    CallGetOrderShippingFee: (propsData) => dispatch(GitAction.CallGetOrderShippingFee(propsData)),
  };
}

class PageCheckout extends Component {
  payments = payments;
  constructor(props) {
    super(props);

    this.state = {
      payment: "bank",
      tabvalue: 0,
      ProductID: [],
      ProductQuantity: [],
      UserCartID: [],
      ProductVariationDetailID: [],
      TrackingStatusID: 0,
      address: 0,
      PaymentMethodID: 0,
      PaymentMethodTypeID: 0,
      PaymentMethod: "",
      PaymentMethodType: "",
      OrderTotalAmount: 0,
      submit: false,
      shipping: 0,
      isShipping: false,
      isErrorPoscode: false,
      activeStep: 0,
      deliveryFee: [{ "ShippingCost": 0 }]
    };
    this.onFormSubmit = this.onFormSubmit.bind(this)

    this.STEPS = ['Cart', 'Billing & address', 'Payment'];
    this.data = this.props.location.state;
    this.completed = this.state.activeStep === this.STEPS.length;
  }

  async onFormSubmit() {

    let submit = true
    let now = new Date().toISOString().split('.').shift() + 'Z';

    const d = new Date();
    let time = d.getTime();

    var n = Math.floor(Math.random() * 11);
    var k = Math.floor(Math.random() * 1000000);
    var m = String.fromCharCode(n) + k;

    const signature = "access_key=0646aa159df03a8fa52c81ab8a5bc4a7,profile_id=9D4BDAEB-A0D5-4D05-9E4B-40DB52678DF0,transaction_uuid=" + (time + '123') + ",signed_field_names=access_key,profile_id,transaction_uuid,signed_field_names,signed_date_time,locale,transaction_type,reference_number,amount,currency,bill_to_surname,bill_to_forename,bill_to_email,bill_to_address_line1,bill_to_address_city,bill_to_address_postal_code,bill_to_address_state,bill_to_address_country,signed_date_time=" + now + ",locale=en,transaction_type=authorization,reference_number=" + time + ",amount=105.00,currency=USD,bill_to_surname=KIUN,bill_to_forename=SIESUAI,bill_to_email=alankiun.tic@gmail.com,bill_to_address_line1=1Hhome,bill_to_address_city=SIBU,bill_to_address_postal_code=96000,bill_to_address_state=SARAWAK,bill_to_address_country=MY"
    const APIKey = "08fd3b4b9f8d4866b5b58c5039ed1c795393402695da4b7fb8e33aac2929bf5d8bc43156efb34d5b97a632dad2e0b55001e3d1a751f4420f90b42b140594a3adfcb2852df84a4bb59d9f8f47458dacf12316b373362a419a99fe32a3286b3d0b5056c6c1923f4ded83014852dcce8c7085baaf83536c4e65933f6ecbd96fe3fb";

    var signed = crypto
      .createHmac('sha256', APIKey)
      .update(signature)
      .digest('base64');



    return (
      <React.Fragment>
        <div>
          <form id="payment_form" action="https://testsecureacceptance.cybersource.com/pay" method="post" onSubmit={submit}>
            <input type="hidden" id="access_key" name="access_key" value="0646aa159df03a8fa52c81ab8a5bc4a7"></input>
            <input type="hidden" id="profile_id" name="profile_id" value="9D4BDAEB-A0D5-4D05-9E4B-40DB52678DF0"></input>
            <input type="hidden" id="transaction_uuid" name="transaction_uuid" value={time + '123'}></input>
            <input type="hidden" id="signed_field_names" name="signed_field_names" value="access_key,profile_id,transaction_uuid,signed_field_names,signed_date_time,locale,transaction_type,reference_number,amount,currency,bill_to_surname,bill_to_forename,bill_to_email,bill_to_address_line1,bill_to_address_city,bill_to_address_postal_code,bill_to_address_state,bill_to_address_country"></input>
            <input type="hidden" id="signed_date_time" name="signed_date_time" value={now}></input>
            <input type="hidden" id="locale" name="locale" value="en"></input>
            <input type="hidden" id="transaction_type" name="transaction_type" value="authorization"></input>
            <input type="hidden" id="reference_number" name="reference_number" value={time}></input>
            <input type="hidden" id="amount" name="amount" value="105.00"></input>
            <input type="hidden" id="currency" name="currency" value="USD"></input>
            <input type="hidden" id="bill_to_surname" name="bill_to_surname" value="KIUN"></input>
            <input type="hidden" id="bill_to_forename" name="bill_to_forename" value="SIESUAI"></input>
            <input type="hidden" id="bill_to_email" name="bill_to_email" value="alankiun.tic@gmail.com"></input>
            <input type="hidden" id="bill_to_address_line1" name="bill_to_address_line1" value="1Hhome"></input>
            <input type="hidden" id="bill_to_address_city" name="bill_to_address_city" value="SIBU"></input>
            <input type="hidden" id="bill_to_address_postal_code" name="bill_to_address_postal_code" value="96000"></input>
            <input type="hidden" id="bill_to_address_state" name="bill_to_address_state" value="SARAWAK"></input>
            <input type="hidden" id="bill_to_address_country" name="bill_to_address_country" value="MY"></input>
            <input type="hidden" id="signature" name="signature" value={signed}></input>
          </form>
        </div>
      </React.Fragment>
    );

  }

  componentDidUpdate(prevProps, previous) {
    if (prevProps.order !== this.props.order) {
      if (this.props.order !== undefined && this.props.order[0] !== undefined && this.props.order[0].ReturnVal === 1) {
      }
    }

    if (prevProps.deliveryFee !== this.props.deliveryFee) {
      this.setState({deliveryFee: this.props.deliveryFee})
      console.log("deliveryFee", this.props.deliveryFee)
    }
  }

  handleNextStep = () => {
    this.setState({ activeStep: this.state.activeStep + 1 })
    console.log("activeStep", this.state.activeStep)
  };

  handleBackStep = () => {
    this.setState({ activeStep: this.state.activeStep - 1 })
  };

  handleGotoStep = (step) => {
    this.setState({ activeStep: step })
  };

  handleApplyDiscount = (value) => {
  };

  handleCreateBilling = (address) => {
    let PRODUCTID = this.data.data.map((item) => { return item.product.ProductID })
    console.log("PRODUCTID", PRODUCTID)
    let ProductQuantity = this.data.data.map((item) => { return item.product.ProductQuantity })
    var obj = {
      PRODUCTID: PRODUCTID,
      PROJECTID: 2,
      PRODUCTQUANTITY: ProductQuantity,
      POSCODE: address.UserPoscode
    }
    this.data["address"] = address;
    console.log("data", this.data)
    this.props.CallGetOrderShippingFee(obj)

    this.setState({ activeStep: this.state.activeStep + 1, address: address })
  };

  handleApplyShipping = (value) => {
    this.data["shipping"] = value;
  };

  handleReset = () => {
    // if (completed) {
    //   dispatch(resetCart());
    //   navigate(PATH_DASHBOARD.eCommerce.shop, { replace: true });
    // }
  };

  render() {
    const breadcrumb = [
      { title: "Home", url: "" },
      { title: "Checkout", url: "" },
    ];

    // const handleGetAddressId = (value) => {
    //   if (value.length !== 0)
    //     this.setState({ address: value })
    // }

    // const handleGetPostcode = (value) => {
    //   if (!isNaN(value))
    //     this.setState({ shipping: value, isShipping: true })
    // }

    // const handleGetPaymentId = (payment, paymentmethodtypeId, paymentmethodtype) => {

    //   if (payment !== null && paymentmethodtypeId.length !== 0 && paymentmethodtype.length !== 0) {
    //     if (payment.UserPaymentMethodID !== undefined) {
    //       this.setState({ PaymentMethodID: payment.UserPaymentMethodID, PaymentMethod: payment.UserCardType })
    //     } else {
    //       this.setState({ PaymentMethodID: payment.PaymentMethodID, PaymentMethod: payment.PaymentMethod })
    //     }
    //     this.setState({ PaymentMethodTypeID: paymentmethodtypeId, PaymentMethodType: paymentmethodtype })
    //   }
    //   else {
    //     this.setState({ PaymentMethodID: 0 })
    //   }
    // }


    // if (this.state.submit === true) {
    //   if (this.state.isShipping === false && this.state.isErrorPoscode === false) {
    //     return (
    //       <DeliveryFee handleGetPostcode={handleGetPostcode} addressID={this.state.address} data={this.props.data} />
    //     )
    //   }
    //   else
    //     return (
    //       <PagePayment addressID={this.state.address} data={this.props.data} merchant={this.props.merchant} shippingfee={this.state.shipping} />
    //     )
    // }

    // const handleGetTotal = (total) => {
    //   if (total !== 0)
    //     this.setState({ OrderTotalAmount: total })
    // }

    return (
      <React.Fragment>
        <Helmet>
          <title>{`Checkout — ${theme.name}`}</title>
        </Helmet>
        <PageHeader header="Checkout" breadcrumb={breadcrumb} />
        <div className="checkout block">
          <div className="container">
            <Grid container justifyContent={this.completed ? 'center' : 'flex-start'}>
              <Grid item xs={12} md={8}>
                <CheckoutSteps activeStep={this.state.activeStep} steps={this.STEPS} />
              </Grid>
            </Grid>

            {this.completed ? (
              <div>hi</div>
              // <CheckoutOrderComplete open={completed} onReset={this.handleReset} onDownloadPDF={() => {}} />
            ) : (
              <>
                {this.state.activeStep === 0 && (
                  <CheckoutCart
                    checkout={this.data}
                    onNextStep={this.handleNextStep}
                  // onDeleteCart={this.handleDeleteCart}
                  // onApplyDiscount={this.handleApplyDiscount}
                  // onIncreaseQuantity={this.handleIncreaseQuantity}
                  // onDecreaseQuantity={this.handleDecreaseQuantity}
                  />
                )}
                {this.state.activeStep === 1 && (
                  <CheckoutBillingAddress
                    checkout={this.data}
                    onBackStep={this.handleBackStep}
                    onCreateBilling={this.handleCreateBilling}
                  />
                )}
                {this.state.activeStep === 2 && (
                  <CheckoutPayment
                    checkout={this.data}
                    onBackStep={this.handleBackStep}
                    onGotoStep={this.handleGotoStep}
                    deliveryFee={this.state.deliveryFee}
                    onApplyShipping={this.handleApplyShipping}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageCheckout);