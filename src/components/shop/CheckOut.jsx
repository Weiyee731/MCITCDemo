// react
import React, { Component } from 'react';

// third-party
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { browserHistory } from "react-router";
import { GitAction } from "../../store/action/gitAction";

// application
const crypto = require('crypto');

class ShopPageCheckOut extends Component {
    constructor(props) {
        super(props);

        this.state = {
            /** example: [{itemId: 8, value: 1}] */
            quantities: [],
            ProductStockAmountlimit: false,
            overProductStockAmountLimitID: [],
            cart: [],
            subtotal: 0,
            // total: 0,
            // shipping: 25,
            // tax: 0,
            setDetails: false,
            selectedIndex: "",

            MerchantShopName: [],

            // selectedList: [],
            selectedProductDetailList: [],
            isDataAccepted: false,
            isCheckOutSubmit: false
        };
        // this.setDetails = this.setDetails.bind(this)
        // this.filterShop = this.filterShop.bind(this)
        // this.removeItem = this.removeItem.bind(this)
        // this.handleSelectedProduct = this.handleSelectedProduct.bind(this)
        // this.handleAllProductSellect = this.handleAllProductSellect.bind(this)
    }

    render() {

    let now = new Date().toISOString().split('.').shift() + 'Z';
    
    const d = new Date();
    let time = d.getTime();

    var n = Math.floor(Math.random() * 11);
    var k = Math.floor(Math.random() * 1000000);
    var m = String.fromCharCode(n) + k;

    console.log(now)
    console.log(m)

    const signature = "access_key=0646aa159df03a8fa52c81ab8a5bc4a7,profile_id=9D4BDAEB-A0D5-4D05-9E4B-40DB52678DF0,transaction_uuid=" + (time + '123') + ",signed_field_names=access_key,profile_id,transaction_uuid,signed_field_names,signed_date_time,locale,transaction_type,reference_number,amount,currency,bill_to_surname,bill_to_forename,bill_to_email,bill_to_address_line1,bill_to_address_city,bill_to_address_postal_code,bill_to_address_state,bill_to_address_country,signed_date_time=" + now + ",locale=en,transaction_type=authorization,reference_number=" + time + ",amount=105.00,currency=USD,bill_to_surname=KIUN,bill_to_forename=SIESUAI,bill_to_email=alankiun.tic@gmail.com,bill_to_address_line1=1Hhome,bill_to_address_city=SIBU,bill_to_address_postal_code=96000,bill_to_address_state=SARAWAK,bill_to_address_country=MY"
    const APIKey = "08fd3b4b9f8d4866b5b58c5039ed1c795393402695da4b7fb8e33aac2929bf5d8bc43156efb34d5b97a632dad2e0b55001e3d1a751f4420f90b42b140594a3adfcb2852df84a4bb59d9f8f47458dacf12316b373362a419a99fe32a3286b3d0b5056c6c1923f4ded83014852dcce8c7085baaf83536c4e65933f6ecbd96fe3fb";
    
    var signed = crypto
    .createHmac('sha256', APIKey)
    .update(signature)
    .digest('base64');

        return (
            <React.Fragment>
                <div>
                    <form id="payment_form" action="https://testsecureacceptance.cybersource.com/pay" method="post">
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
                        
                        {/* <fieldset>
                            <legend>Payment Details</legend>
                            <div id="paymentDetailsSection" class="section">
                                <span>transaction_type:</span><input type="text" name="transaction_type"
                                    size="25"></input><br />
                                <span>reference_number:</span><input type="text" name="reference_number"
                                    size="25"></input><br />
                                <span>amount:</span><input type="text" name="amount" size="25"></input><br />
                                <span>currency:</span><input type="text" name="currency" size="25"></input><br />
                            </div>
                        </fieldset> */}
                        <input type="submit" id="submit" name="submit" value="Submit" />
                        {/* <script type="text/javascript" src="payment_form.js"></script> */}
                    </form>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    productcart: state.counterReducer.productcart

});

const mapDispatchToProps = (dispatch) => {
    return {
        CallDeleteProductCart: (prodData) => dispatch(GitAction.CallDeleteProductCart(prodData)),
        CallUpdateProductCart: (prodData) => dispatch(GitAction.CallUpdateProductCart(prodData)),
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(ShopPageCheckOut);