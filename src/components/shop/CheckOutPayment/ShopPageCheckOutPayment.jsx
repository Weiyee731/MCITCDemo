import PropTypes from 'prop-types';
// @mui
import { Grid, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import CheckoutSummary from '../ShopPageCheckoutCartSummary';
import CheckoutDelivery from './ShopPageCheckOutDelivery';
import CheckoutBillingInfo from './ShopPageCheckOutBillingInfo';
import CheckoutPaymentMethods from './ShopPageCheckOutPaymentMethods';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CheckoutCartCheckOutButton from './ShopPageCheckOutPaymentButton';
import sum from 'lodash/sum';
// import DeliveryFee from "../ShopPageDeliveryFee";

// import DeliveryFee from "../deliveryFee"
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GitAction } from '../../../store/action/gitAction';
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";
// ----------------------------------------------------------------------

const DELIVERY_OPTIONS = [
    {
        value: 0,
        title: 'Standard delivery',
        description: 'Delivered on Monday, August 12',
    },
];

CheckoutPayment.propTypes = {
    onReset: PropTypes.func,
    checkout: PropTypes.object,
    onBackStep: PropTypes.func,
    onGotoStep: PropTypes.func,
    onNextStep: PropTypes.func,
    deliveryFee: PropTypes.array,
    onApplyShipping: PropTypes.func,
};

export default function CheckoutPayment({
    checkout,
    onReset,
    onNextStep,
    onBackStep,
    onGotoStep,
    deliveryFee,
    onApplyShipping,
}) {
    const { data, address, merchant } = checkout;
    const total = sum(data.map((item) => item.total));
    const subtotal = sum(data.map((item) => item.total));
    const discount = sum(data.map((item) => item.discount));
    const [BankID, setBankID] = useState(0);
    const [PaymentType, setPaymentType] = useState("1");

    // need to delete
    const isVoucherApply = false;
    const totalApplyPromo = 0
    // 

    const onSubmit = async () => {
        try {
            onNextStep();
            onReset();
        } catch (error) {
            console.error(error);
        }
    };

    const handlePaymentTypes = (type) => {
        // type==1 , bankin // type==2 , creditcard
        setPaymentType(type)
    }

    const handleBanking = (bankid) => {
        console.log("bankid", bankid)
        let date = moment(new Date()).format("YYYYMMDDHHmmss").toString()
        let fpx_sellerExOrderNo = date
        let fpx_sellerTxnTime = date
        let fpx_sellerOrderNo = date

        let bankingdata = this.state.fpx_buyerAccNo + "|" + this.state.fpx_buyerBankBranch + "|" + bankid + "|" + this.state.fpx_buyerEmail + "|" + this.state.fpx_buyerIban + "|" + this.state.fpx_buyerId + "|" + this.state.fpx_buyerName + "|" + this.state.fpx_makerName + "|" + this.state.fpx_msgToken + "|" + this.state.fpx_msgType + "|" + this.state.fpx_productDesc + "|" + this.state.fpx_sellerBankCode + "|" + this.state.fpx_sellerExId + "|" + fpx_sellerExOrderNo + "|" + this.state.fpx_sellerId + "|" + fpx_sellerOrderNo + "|" + fpx_sellerTxnTime + "|" + parseFloat(this.state.fpx_txnAmount).toFixed(2) + "|" + this.state.fpx_txnCurrency + "|" + this.state.fpx_version

        let URL = "https://myemporia.my/payment/check.php"
        const config = { headers: { 'Content-Type': 'multipart/form-data' } }
        const formData = new FormData()
        formData.append("bankingdata", bankingdata);
        axios.post(URL, formData, config).then((res) => {
            if (res.status === 200) {
                this.setState({
                    fpx_checkSum: res.data.split('"')[1],
                    fpx_buyerBankId: bankid,
                    fpx_sellerExOrderNo: fpx_sellerExOrderNo,
                    fpx_sellerTxnTime: fpx_sellerTxnTime,
                    fpx_sellerOrderNo: fpx_sellerOrderNo
                })
            }
            else {
                toast.error("There is something wrong with uploading images. Please try again.")
            }
        }).catch(e => {
            toast.error("There is something wrong with uploading images. Please try again.")
        })
        setBankID(bankid)
    }

    // const checkPaymentCompletion = () => {
    //     if (PaymentType === 1) {
    //         if (BankID === 0) {return false}
    //         else {return true}
    //     } else {
    //         if (BankID === 0) { return true }
    //         else { return false }
    //     }
    // }



    // const handleGetPostcode = (value) => {
    //     console.log("handleGetPostcode", value)
    //     if (!isNaN(value))
    //         this.setState({ shipping: value, isShipping: true })
    // }


    // const fee = DeliveryFee({ handleGetPostcode: handleGetPostcode, address: address, data: data })
    // console.log("fee", fee)


    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
                <CheckoutDelivery onApplyShipping={onApplyShipping} deliveryOptions={DELIVERY_OPTIONS} />

                <CheckoutPaymentMethods sx={{ my: 3 }}
                    onSelectPaymentTypes={handlePaymentTypes}
                    onSelectBank={handleBanking}
                />

                <Button
                    size="small"
                    color="inherit"
                    onClick={onBackStep}
                    startIcon={<ArrowBackIosNewIcon />}
                >
                    Back
                </Button>
            </Grid>

            <Grid item xs={12} md={4}>
                <CheckoutBillingInfo onBackStep={onBackStep} billing={address} />

                <CheckoutSummary
                    enableEdit
                    total={total}
                    subtotal={subtotal}
                    discount={discount}
                    shipping={deliveryFee}
                    onEdit={() => onGotoStep(0)}
                />

                {/* <LoadingButton
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                // loading={isSubmitting}
                >
                    Complete Order
                </LoadingButton> */}
                <CheckoutCartCheckOutButton
                    PaymentType={PaymentType}
                    textInside={"Complete Order"}
                    isVoucherApply={isVoucherApply}
                    totalApplyPromo={totalApplyPromo}
                    total={total}
                    Userdetails={address}
                    BankID={BankID}
                />
            </Grid>
        </Grid>
        // </FormProvider>
    );
}
