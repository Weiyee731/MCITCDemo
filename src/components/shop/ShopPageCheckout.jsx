// react
import React, { Component } from "react";

// third-party
import { connect } from "react-redux";
import { Helmet } from "react-helmet-async";
import { browserHistory } from "react-router";

// application
import PageHeader from "../shared/PageHeader";

// data stubs
import payments from "../../data/shopPayments";
import theme from "../../data/theme";
import PageCheckOrder from "./ShopPageCheckOrder";
import PagePayment from "./ShopPagePayment";
import { GitAction } from "../../store/action/gitAction";
import StepProgressBar from "react-step-progress";
import "react-step-progress/dist/index.css";
import PageCart from "./ShopPageCart";
import PageCompleted from "./ShopPageCompleted";
import { toast } from "react-toastify";
import axios from "axios";

function step2Validator() {
  // return a boolean
}

function step3Validator() {
  // return a boolean
}


function mapStateToProps(state) {
  return {
    // cart: state.cart,
    productcart: state.counterReducer.productcart,
    order: state.counterReducer.order
  };
}

function mapDispatchToProps(dispatch) {
  return {
    CallAddOrder: (propsData) => dispatch(GitAction.CallAddOrder(propsData)),
    CallClearOrder: () => dispatch(GitAction.CallClearOrder()),
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
      OrderTotalAmount: 0

    };
    this.onFormSubmit = this.onFormSubmit.bind(this)
  }

  onFormSubmit() {
    if (this.state.PaymentMethodID === 0) {
      toast.error("Please fill in correct payment method info to continue")
    }
    else {
      let PickUpIndicator = 0
      if (this.state.address === 0)
        PickUpIndicator = 1
      this.props.data.map((x) => {
        this.state.ProductID.push(x.product.ProductID)
        this.state.UserCartID.push(x.product.UserCartID)
        this.state.ProductQuantity.push(x.product.ProductQuantity)
        this.state.ProductVariationDetailID.push(x.product.ProductVariationDetailID)
      })

      this.props.CallAddOrder({
        UserID: window.localStorage.getItem("id"),
        ProductID: this.state.ProductID,
        ProductQuantity: this.state.ProductQuantity,
        UserCartID: this.state.UserCartID,
        UserAddressID: this.state.address,
        PaymentMethodID: this.state.PaymentMethodID,
        UserPaymentMethodID: this.state.PaymentMethodTypeID,
        OrderTotalAmount: this.state.OrderTotalAmount,
        OrderPaidAmount: this.state.OrderTotalAmount,
        ProductVariationDetailID: this.state.ProductVariationDetailID,
        TrackingStatusID: this.state.TrackingStatusID,
        PickUpInd: PickUpIndicator
      })

      // const formData = new FormData();
      // formData.append("sellerExchangeID", "EX00013776");
      // formData.append("sellerExOrder", "EX00013776");
      // formData.append("sellerTxnTime", "EX00013776");
      // formData.append("sellerOrderNo", "EX00013776");
      // formData.append("sellerID", "SE00015397");
      // formData.append("txnAmount", "EX00013776");
      // formData.append("buyerEmail", "EX00013776");
      // formData.append("buyerBankID", "EX00013776");
      // formData.append("productDesc", "EX00013776");

      // let url = "https://myemporia.my/emporiaimage/uploadpromotion.php"
      // axios.post(url, formData, {}).then(res => {
      //   if (res.status === 200) {
      //     // this.props.CallAddPromotion(promoInfo)
      //     this.setState({ isPromoSubmit: true })
      //   }
      //   else {
      //     toast.error("Res Status error.");
      //   }
      // });

    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.order !== this.props.order) {
      if (this.props.order !== undefined && this.props.order[0] !== undefined && this.props.order[0].ReturnVal === 1) {
        console.log("this.props.order", this.props.order)
        browserHistory.push("/");
        window.location.reload(false);
      }
    }
  }

  render() {
    const breadcrumb = [
      { title: "Home", url: "" },
      { title: "Checkout", url: "" },
    ];

    const handleGetAddressId = (value) => {
      if (value.length !== 0)
        this.setState({ address: value })
    }

    const handleGetPaymentId = (payment, paymentmethodtypeId, paymentmethodtype) => {

      if (payment !== null && paymentmethodtypeId.length !== 0 && paymentmethodtype.length !== 0) {
        if (payment.UserPaymentMethodID !== undefined) {
          this.setState({ PaymentMethodID: payment.UserPaymentMethodID, PaymentMethod: payment.UserCardType })
        } else {
          this.setState({ PaymentMethodID: payment.PaymentMethodID, PaymentMethod: payment.PaymentMethod })
        }
        this.setState({ PaymentMethodTypeID: paymentmethodtypeId, PaymentMethodType: paymentmethodtype })
      }
      else {
        this.setState({ PaymentMethodID: 0 })
      }
    }

    const handleGetTotal = (total) => {
      if (total !== 0)
        this.setState({ OrderTotalAmount: total })
    }
    console.log("this.props.merchant", this.props)

    const step1Content = (
      <PageCart data={this.props.data} merchant={this.props.merchant} />
    );

    const step2Content = (
      <PageCheckOrder handleGetAddressId={handleGetAddressId} data={this.props.data} merchant={this.props.merchant} />
    );

    const step3Content = (
      <PagePayment handleGetPaymentId={handleGetPaymentId} data={this.props.data} merchant={this.props.merchant} />
    );

    const step4Content = (
      <PageCompleted handleGetTotal={handleGetTotal} addresss={this} data={this.props.data} merchant={this.props.merchant} />
    );
    return (
      <React.Fragment>
        <Helmet>
          <title>{`Checkout — ${theme.name}`}</title>
        </Helmet>
        <PageHeader header="Checkout" breadcrumb={breadcrumb} />
        <div className="checkout block">
          <div className="container">
            <StepProgressBar
              startingStep={0}
              primaryBtnClass="btn-lg"
              secondaryBtnClass="btn-lg"
              onSubmit={() => this.onFormSubmit()}
              steps={[
                {
                  label: "Check Order",
                  name: "step 1",
                  content: step1Content
                },
                {
                  label: "Place Order",
                  name: "step 2",
                  content: step2Content,
                  // validator: step2Validator
                },
                {
                  label: "Payment",
                  name: "step 3",
                  content: step3Content,
                  // validator: step3Validator
                },
                {
                  label: "Completed",
                  name: "step 4",
                  content: step4Content,
                  // validator: step3Validator
                },
              ]}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageCheckout);