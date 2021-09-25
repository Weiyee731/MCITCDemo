// react
import React, { Component } from "react";

// third-party
import { connect } from "react-redux";
import { Helmet } from "react-helmet-async";
import { Link, Redirect } from "react-router-dom";
import { browserHistory } from "react-router";

// application
import Collapse from "../shared/Collapse";
import Currency from "../shared/Currency";
import PageHeader from "../shared/PageHeader";
import { Check9x7Svg } from "../../svg";

// data stubs
import payments from "../../data/shopPayments";
import theme from "../../data/theme";
import PageCheckOrder from "./ShopPageCheckOrder";
import PagePayment from "./ShopPagePayment";
import PageCheckoutQr from "./ShopPageCheckoutQr";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SwipeableViews from "react-swipeable-views";
import { GitAction } from "../../store/action/gitAction";
import queryString from "query-string";
import StepProgressBar from "react-step-progress";
import "react-step-progress/dist/index.css";
import PageCart from "./ShopPageCart";
import PageCompleted from "./ShopPageCompleted";

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
      address: 0
    };
    this.onFormSubmit = this.onFormSubmit.bind(this)
  }

  onFormSubmit() {
    console.log("ADDRESS", this.state.address)

    this.props.productcart.map((x) => {
      this.state.ProductID.push(x.ProductID)
      this.state.UserCartID.push(x.UserCartID)
      this.state.ProductQuantity.push(x.ProductQuantity)
    })

    this.props.CallAddOrder({
      UserID: window.localStorage.getItem("id"),
      ProductID: this.state.ProductID,
      ProductQuantity: this.state.ProductQuantity,
      UserCartID: this.state.UserCartID,
      UserAddressID: this.state.address
    })
  }

  componentDidUpdate(prevProps) {
    console.log("this.props.order",this.props.order)
    if (prevProps.order !== this.props.order) {
      // this.props.CallClearOrder()
      browserHistory.push("/Emporia");
      window.location.reload(false);
    }
  }

  render() {

    const breadcrumb = [
      { title: "Home", url: "" },
      { title: "Shopping Cart", url: "/shop/cart" },
      { title: "Checkout", url: "" },
    ];

    const handleChangeIndex = (index) => {
      this.setState({ tabvalue: index });
    };

    const handleChange = (event, newValue) => {
      this.setState({ tabvalue: newValue });
    };

    const handleGetAddressId = (value) => {
      // console.log(value)
      if (value.length !== 0)
        this.setState({ address: value })
    }

    const step1Content = (
      <div style={{ width: "100%" }}>
        <PageCart />
      </div>
    );
    const step2Content = (
      <div style={{ width: "100%" }}>
        <PageCheckOrder handleGetAddressId={handleGetAddressId} />
      </div>
    );
    const step3Content = (
      <div style={{ width: "100%" }}>
        <PagePayment />
      </div>
    );
    const step4Content = (
      <div style={{ width: "100%" }}>
        <PageCompleted />
      </div>
    );

    const query = queryString.parse(this.props.location.search);
    return (
      <React.Fragment>
        <Helmet>
          <title>{`Checkout — ${theme.name}`}</title>
        </Helmet>
        <PageHeader header="Checkout" breadcrumb={breadcrumb} />
        <div className="checkout block" style={{ width: "100%" }}>
          <div className="container" style={{ width: "100%" }}>
            <StepProgressBar
              startingStep={0}
              className="row"
              primaryBtnClass="btn-lg"
              secondaryBtnClass="btn-link"
              // style={{ width: "100%", color:"white" }}
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
                  content: <PagePayment qrcode={query} />,
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
