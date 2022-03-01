// react
import React, { Component } from 'react';

// third-party
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { browserHistory } from "react-router";
import { GitAction } from "../../store/action/gitAction";

// application
import Currency from '../shared/Currency';
import InputNumber from '../shared/InputNumber';
import PageHeader from '../shared/PageHeader';
import { Cross12Svg } from '../../svg';
import { url } from '../../services/utils';
import Logo from "../../assets/Emporia.png";
import PageCheckout from "./ShopPageCheckout";
import { Button } from "@material-ui/core";

import Checkbox from "@material-ui/core/Checkbox";


// data stubs
import { toast } from 'react-toastify';

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
        return (
            <React.Fragment>
                <div>
                    <form id="payment_form" action="shop/payment_confirmation.jsp" method="post">
                        <input type="hidden" name="access_key" value="0646aa159df03a8fa52c81ab8a5bc4a7"></input>
                        <input type="hidden" name="profile_id" value="9D4BDAEB-A0D5-4D05-9E4B-40DB52678DF0"></input>
                        <input type="hidden" name="transaction_uuid" value="<%= UUID.randomUUID() %>"></input>
                        <input type="hidden" name="signed_field_names" value="access_key,profile_id,transaction_uuid,signed_field_names,unsigned_field_names,signed_date_time,locale,transaction_type,reference_number,amount,currency"></input>
                        <input type="hidden" name="unsigned_field_names"></input>
                        <input type="hidden" name="signed_date_time" value="<%= getUTCDateTime() %>"></input>
                        <input type="hidden" name="locale" value="en"></input>
                        <fieldset>
                            <legend>Payment Details</legend>
                            <div id="paymentDetailsSection" class="section">
                                <span>transaction_type:</span><input type="text" name="transaction_type"
                                    size="25"></input><br />
                                <span>reference_number:</span><input type="text" name="reference_number"
                                    size="25"></input><br />
                                <span>amount:</span><input type="text" name="amount" size="25"></input><br />
                                <span>currency:</span><input type="text" name="currency" size="25"></input><br />
                            </div>
                        </fieldset>
                        <input type="submit" id="submit" name="submit" value="Submit" />
                        <script type="text/javascript" src="payment_form.js"></script>
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