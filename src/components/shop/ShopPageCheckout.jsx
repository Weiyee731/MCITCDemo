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
import StepProgressBar from "react-step-progress";
import "react-step-progress/dist/index.css";
import PageCart from "./ShopPageCart";
import PageCompleted from "./ShopPageCompleted";
import { toast } from "react-toastify";
import axios from "axios";
import { sha256, sha224 } from 'js-sha256';
import { stringToBytes } from 'convert-string-bytes'
import { Crypto } from 'crypto-js'
// import { useHistory } from "react-router-dom";
// import histrory from 'history'
// import {createHistory} from 'history/createBrowserHistory'
// const history = createHistory()
// let history = useHistory();
import { createBrowserHistory } from 'history';

import { browserHistory } from "react-router";

// import history from 'history'

const history = createBrowserHistory()

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
    order: state.counterReducer.order,
    payment: state.counterReducer.payment,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    CallAddOrder: (propsData) => dispatch(GitAction.CallAddOrder(propsData)),
    CallClearOrder: () => dispatch(GitAction.CallClearOrder()),
    CallSentPayment: (propsData) => dispatch(GitAction.CallSentPayment(propsData)),
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

      clientReferenceInformation: {
        code: "TC50171_3",
      },

      orderInformation: {
        amountDetails: {
          totalAmount: "102.21",
          currency: "USD"
        },
      },

      paymentInformation: {
        card: {
          number: "4111111111111111",
          expirationMonth: "12",
          expirationYear: "2031",

        },
      },

      Date: new Date(),
      userdetails: [],

      billTo: {
        firstName: "John",
        lastName: "Doe",
        address1: "1 Market St",
        locality: "san francisco",
        administrativeArea: "CA",
        postalCode: "94105",
        country: "US",
        email: "test@cybs.com",
        phoneNumber: "4158880000"
      },
    };



    this.onFormSubmit = this.onFormSubmit.bind(this)
  }

  async onFormSubmit() {
    // if (this.state.PaymentMethodID === 0) {
    //   toast.error("Please fill in correct payment method info to continue")

    const formData = new FormData();

    formData.append("access_key", "0646aa159df03a8fa52c81ab8a5bc4a7");
    formData.append("profile_id", "9D4BDAEB-A0D5-4D05-9E4B-40DB52678DF0");

    formData.append("transaction_uuid", "123456");
    formData.append("signed_field_names", "access_key,profile_id,transaction_uuid,signed_field_names,signed_date_time,locale,transaction_type,reference_number,amount,currency,bill_to_surname,bill_to_forename,bill_to_email,bill_to_address_line1,bill_to_address_city,bill_to_address_postal_code,bill_to_address_state,bill_to_address_country");
    formData.append("signed_date_time", new Date());
    formData.append("locale", "en");
    formData.append("transaction_type", "authorization");
    formData.append("reference_number", "9D4BDAEB-A0D5-4D05-9E4B-40DB52678DF0");

    formData.append("amount", this.state.userdetails.total);
    formData.append("currency", "USD");
    formData.append("bill_to_surname", localStorage.getItem("lastname"));
    formData.append("bill_to_forename", localStorage.getItem("firstname"));

    formData.append("bill_to_email", this.state.userdetails.email);
    formData.append("bill_to_address_line1", this.state.userdetails.addressLine1);
    formData.append("bill_to_address_city", this.state.userdetails.city);
    formData.append("bill_to_address_postal_code", this.state.userdetails.poscode);
    formData.append("bill_to_address_state", this.state.userdetails.state);
    formData.append("bill_to_address_country", "MY");

    // axios({
    //   method:'post',
    //   url:'logout',
    //   baseURL: '/',
    //  })
    //  .then(response => {
    //     window.location.reload();
    //  })
    //  .catch(error => {
    //      console.log(error);
    //  });

    const data = {access_key:"0646aa159df03a8fa52c81ab8a5bc4a7",
                  profile_id:"9D4BDAEB-A0D5-4D05-9E4B-40DB52678DF0",
                  transaction_uuid:"123456",
                  signed_field_names:"access_key,profile_id,transaction_uuid,signed_field_names,signed_date_time,locale,transaction_type,reference_number,amount,currency,bill_to_surname,bill_to_forename,bill_to_email,bill_to_address_line1,bill_to_address_city,bill_to_address_postal_code,bill_to_address_state,bill_to_address_country",
                  signed_date_time:new Date(),
                  locale:"en",
                  transaction_type:"authorization",
                  reference_number:"9D4BDAEB-A0D5-4D05-9E4B-40DB52678DF0",
                  amount:"101.00",
                  currency:"USD",
                  bill_to_surname:"KIUN",
                  bill_to_forename:"SIE SUAI",
                  bill_to_email:"alankiun.tic@gmail.com",
                  bill_to_address_line1:"myhome",
                  bill_to_address_city:"SIBU",
                  bill_to_address_postal_code:"96000",
                  bill_to_address_state:"SARAWAK",
                  bill_to_address_country:"MY"
                };
    const requestInfo = {
        method:'POST',
        body: JSON.stringify({data}),
        mode: "cors",
        headers: new Headers({
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": 'https://myemporia.my',
          "Access-Control-Allow-Methods": 'POST',
          "Access-Control-Allow-Headers": 'Origin, Content-Type, X-Auth-Token',
          'HMAC_SHA256': 'sha256',
          'SECRET_KEY': '08fd3b4b9f8d4866b5b58c5039ed1c795393402695da4b7fb8e33aac2929bf5d8bc43156efb34d5b97a632dad2e0b55001e3d1a751f4420f90b42b140594a3adfcb2852df84a4bb59d9f8f47458dacf12316b373362a419a99fe32a3286b3d0b5056c6c1923f4ded83014852dcce8c7085baaf83536c4e65933f6ecbd96fe3fb'
        }),
    };
    fetch('https://testsecureacceptance.cybersource.com/pay', requestInfo)
    .then(response => {
        if(response.ok){
            return response.json();
        }
        throw new Error("Login Invalido..")
    })
    .then(token => {
        sessionStorage.setItem('token', JSON.stringify(token.token));
        this.props.history.push("/users");
        return;
    })
    .catch(e => {
        this.setState({message: e.message})
    });

    // const headers = {
    //   'Content-Type': 'application/json',
    //   "Access-Control-Allow-Origin": '*',
    //   "Access-Control-Allow-Methods": 'POST',
    //   "Access-Control-Allow-Headers": 'Origin, Content-Type, X-Auth-Token',
    //   // 'Authorization': 'JWT fefege...',
    //   // 'HMAC_SHA256': 'sha256',
    //   // 'SECRET_KEY': '08fd3b4b9f8d4866b5b58c5039ed1c795393402695da4b7fb8e33aac2929bf5d8bc43156efb34d5b97a632dad2e0b55001e3d1a751f4420f90b42b140594a3adfcb2852df84a4bb59d9f8f47458dacf12316b373362a419a99fe32a3286b3d0b5056c6c1923f4ded83014852dcce8c7085baaf83536c4e65933f6ecbd96fe3fb'
    // }
    // // event.preventDefault();
    // fetch('https://testsecureacceptance.cybersource.com/pay', {
    //   method: 'POST',
    //   headers: new Headers({
    //     'Content-Type': 'application/json',
    //     "Access-Control-Allow-Origin": 'https://myemporia.my',
    //     "Access-Control-Allow-Methods": 'POST',
    //     "Access-Control-Allow-Headers": 'Origin, Content-Type, X-Auth-Token',
    //     'HMAC_SHA256': 'sha256',
    //     'SECRET_KEY': '08fd3b4b9f8d4866b5b58c5039ed1c795393402695da4b7fb8e33aac2929bf5d8bc43156efb34d5b97a632dad2e0b55001e3d1a751f4420f90b42b140594a3adfcb2852df84a4bb59d9f8f47458dacf12316b373362a419a99fe32a3286b3d0b5056c6c1923f4ded83014852dcce8c7085baaf83536c4e65933f6ecbd96fe3fb'
    //   }),
    //   body: formData
    // }).then((response) => response.json())
    //   .then((json) => {
    //     console.log(json)
    //     this.props.history.push("/thank-you");
    //   })

    //   .catch((error) => console.log(error.message));
    // try {
    //   await fetch(
    //     "https://testsecureacceptance.cybersource.com/pay",
    //     formData,
    //     { headers: headers }
    //   )
    //     .then((res) => {
    //       console.log("RES", res)
    //       if (res.status === 200) {
    //         // this.props.CallUserProfile(this.state);
    //       }
    //     });
    // }
    // catch (error) {
    //   console.log(error);
    // }


    // browserHistory.push("components/shop/payment_form.jsp");
    // // browserHistory.push("https://myemporia.my/php/web/payment_form.php");
    // window.location.reload(false);

    // history.push({
    //   pathname: pathname,
    //   // search: '?query=abc',
    //   state: { formData: formData }
    // });


    // axios
    //   .post(
    //     "https://myemporia.my/php/web/payment_form.php",
    //     formData,
    //     { headers: headers }
    //   )
    //   .then((res) => {

    //     // browserHistory.push("https://myemporia.my/php/web/payment_form.php");
    //     window.location.reload(false);
    //     console.log("RES", res)
    //     if (res.status === 200) {
    //       // this.props.CallUserProfile(this.state);
    //     }
    //   });



    // }
    // else {
    //   let PickUpIndicator = 0
    //   if (this.state.address === 0)
    //     PickUpIndicator = 1
    //   this.props.data.map((x) => {
    //     this.state.ProductID.push(x.product.ProductID)
    //     this.state.UserCartID.push(x.product.UserCartID)
    //     this.state.ProductQuantity.push(x.product.ProductQuantity)
    //     this.state.ProductVariationDetailID.push(x.product.ProductVariationDetailID)
    //   })

    //   let obj = {
    //     clientReferenceInformation: this.state.clientReferenceInformation,
    //     paymentInformation: this.state.paymentInformation,
    //     orderInformation: this.state.orderInformation
    //   }

    //   // console.log("CHECK obj", obj)

    //   // console.log("CHECK", sha256(JSON.stringify(obj)))
    //   // console.log("CHECK22", sha256(JSON.stringify(obj)).getBytes())

    //   var myBuffer = [];
    //   var str = sha256(JSON.stringify(obj));
    //   var buffer = new Buffer(str);
    //   // for (var i = 0; i < buffer.length; i++) {
    //   //   myBuffer.push(buffer[i]);
    //   // }
    //   var bytes = require('utf8-bytes');
    //   // console.log("CHECK22 BYTESSSS", bytes(sha256(JSON.stringify(obj))))
    //   // console.log("CHECK22 Buffer", Buffer(str).toJSON())
    //   // console.log("CHECK22", buffer);
    //   // console.log("CHECK22", "SHA-256=" + buffer.toString('base64'));

    //   var header = {
    //     host: "apitest.cybersource.com",
    //     date: new Date(),
    //     "(request- target)": "post/pts/v2/payments/",
    //     digest: "SHA-256=" + buffer.toString('base64'),
    //     "v-c-merchant-id": "emporiatest"
    //   }

    //   // console.log("header", header)
    //   // console.log("header", Buffer(JSON.stringify(header)).toJSON())
    //   // console.log("header", Buffer("5f3d124b-abd8-46ce-bcf4-307fd1f7f227").toJSON())
    //   // console.log("header", Crypto.createHmac('sha256', Buffer("5f3d124b-abd8-46ce-bcf4-307fd1f7f227").toJSON()).update("json").digest("base64"))


    //   const crypto = require('crypto');

    //   // Defining key
    //   const secret = 'GfG';

    //   // Calling createHmac method
    //   const hash = crypto.createHmac('sha256', Buffer("5f3d124b-abd8-46ce-bcf4-307fd1f7f227").toJSON())

    //     // // updating data
    //     // .update('GeeksforGeeks')

    //     // Encoding to be used
    //     .digest('base64');

    //   console.log("hash", hash)


    //   // MessageDigest hashString = MessageDigest.getInstance("SHA-256")
    //   // this.props.CallSentPayment({
    //   //   clientReferenceInformation: this.state.clientReferenceInformation,
    //   //   paymentInformation: this.state.paymentInformation,
    //   //   orderInformation: this.state.orderInformation
    //   // })


    //   // this.props.CallAddOrder({
    //   //   UserID: window.localStorage.getItem("id"),
    //   //   ProductID: this.state.ProductID,
    //   //   ProductQuantity: this.state.ProductQuantity,
    //   //   UserCartID: this.state.UserCartID,
    //   //   UserAddressID: this.state.address,
    //   //   PaymentMethodID: this.state.PaymentMethodID,
    //   //   UserPaymentMethodID: this.state.PaymentMethodTypeID,
    //   //   OrderTotalAmount: this.state.OrderTotalAmount,
    //   //   OrderPaidAmount: this.state.OrderTotalAmount,
    //   //   ProductVariationDetailID: this.state.ProductVariationDetailID,
    //   //   TrackingStatusID: this.state.TrackingStatusID,
    //   //   PickUpInd: PickUpIndicator
    //   // })

    //   // const formData = new FormData();
    //   // formData.append("sellerExchangeID", "EX00013776");
    //   // formData.append("sellerExOrder", "EX00013776");
    //   // formData.append("sellerTxnTime", "EX00013776");
    //   // formData.append("sellerOrderNo", "EX00013776");
    //   // formData.append("sellerID", "SE00015397");
    //   // formData.append("txnAmount", "EX00013776");
    //   // formData.append("buyerEmail", "EX00013776");
    //   // formData.append("buyerBankID", "EX00013776");
    //   // formData.append("productDesc", "EX00013776");

    //   // let url = "https://myemporia.my/emporiaimage/uploadpromotion.php"
    //   // axios.post(url, formData, {}).then(res => {
    //   //   if (res.status === 200) {
    //   //     // this.props.CallAddPromotion(promoInfo)
    //   //     this.setState({ isPromoSubmit: true })
    //   //   }
    //   //   else {
    //   //     toast.error("Res Status error.");
    //   //   }
    //   // });

    // }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.order !== this.props.order) {
      if (this.props.order !== undefined && this.props.order[0] !== undefined && this.props.order[0].ReturnVal === 1) {

        // browserHistory.push("/");
        // window.location.reload(false);
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

    const handleUserData = (value) => {
      if (value.length !== 0)
        this.setState({ userdetails: value })
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

    const step1Content = (
      <PageCart data={this.props.data} merchant={this.props.merchant} />
    );

    const step2Content = (
      <PageCheckOrder handleGetAddressId={handleGetAddressId} data={this.props.data} merchant={this.props.merchant} />
    );

    const step3Content = (
      <PagePayment handleGetPaymentId={handleGetPaymentId} addresss={this} data={this.props.data} merchant={this.props.merchant} handleUserData={handleUserData} />
    );

    const step4Content = (
      // <form id="payment_confirmation" action="https://testsecureacceptance.cybersource.com/pay" method="post">
      //   <input type="hidden" name="access_key" value="0646aa159df03a8fa52c81ab8a5bc4a7" />
      //   <input type="hidden" name="profile_id" value="9D4BDAEB-A0D5-4D05-9E4B-40DB52678DF0" />
      //   <input type="hidden" name="transaction_uuid" value="123456" />
      //   <input type="hidden" name="signed_field_names" value="access_key,profile_id,transaction_uuid,signed_field_names,signed_date_time,locale,transaction_type,reference_number,amount,currency,bill_to_surname,bill_to_forename,bill_to_email,bill_to_address_line1,bill_to_address_city,bill_to_address_postal_code,bill_to_address_state,bill_to_address_country" />
      //   <input type="hidden" name="signed_date_time" value={new Date()} />
      //   <input type="hidden" name="locale" value="en" />

      //   <input type="hidden" name="transaction_type" value="authorization" />
      //   <input type="hidden" name="reference_number" value="9D4BDAEB-A0D5-4D05-9E4B-40DB52678DF0" />
      //   <input type="hidden" name="amount" value={this.state.userdetails.total} />
      //   <input type="hidden" name="currency" value="USD" />


      //   <input type="hidden" name="bill_to_surname" value={localStorage.getItem("lastname")} />
      //   <input type="hidden" name="bill_to_forename" value={localStorage.getItem("firstname")} />
      //   <input type="hidden" name="bill_to_email" value={this.state.userdetails.email} />
      //   <input type="hidden" name="bill_to_address_line1" value={this.state.userdetails.addressLine1} />
      //   <input type="hidden" name="bill_to_address_city" value={this.state.userdetails.city} />

      //   <input type="hidden" name="bill_to_address_postal_code" value={this.state.userdetails.poscode} />
      //   <input type="hidden" name="bill_to_address_state" value={this.state.userdetails.state} />
      //   <input type="hidden" name="bill_to_address_country" value="MY" />
      // </form>
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