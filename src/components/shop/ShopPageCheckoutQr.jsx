// react
import React, { Component } from "react";

// third-party
import { connect } from "react-redux";
import { Helmet } from "react-helmet-async";
import { Link, Redirect } from "react-router-dom";

// application
import Collapse from "../shared/Collapse";
import Currency from "../shared/Currency";
import PageHeader from "../shared/PageHeader";
import { Check9x7Svg } from "../../svg";

// data stubs
import payments from "../../data/shopPayments";
import theme from "../../data/theme";
import QRCode from "qrcode.react";

class PageCheckoutQr extends Component {
  payments = payments;

  constructor(props) {
    super(props);

    this.state = {
      payment: "bank",
    };
  }

  render() {
    const { cart, qrcode } = this.props;

    if (cart.items.length < 1) {
      return <Redirect to="cart" />;
    }

    const breadcrumb = [
      { title: "Home", url: "" },
      { title: "Shopping Cart", url: "/shop/cart" },
      { title: "Checkout", url: "/shop/checkout" },
      { title: "QrPayment", url: "" },
    ];
    return (
      <React.Fragment>
        <Helmet>
          <title>{`Checkout — ${theme.name}`}</title>
        </Helmet>
        <div style={{ textAlign: "center" }}>
          <QRCode
            style={{
              margin: "auto",
              width: "80%",
              maxWidth: "600px",
              maxHeight: "600px",
              height: "80%",
              padding: "10px",
              textAlign: "center",
            }}
            id="123456"
            value={qrcode}
            size={290}
            level={"H"}
            includeMargin={true}
          />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PageCheckoutQr);
