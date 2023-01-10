import PropTypes from 'prop-types';
// import * as Yup from 'yup';
// form
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Grid, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
// import Iconify from '../../../../../components/iconify';
// import FormProvider from '../../../../../components/hook-form';
//
import CheckoutSummary from '../ShopPageCheckoutCartSummary';
import CheckoutDelivery from './ShopPageCheckOutDelivery';
import CheckoutBillingInfo from './ShopPageCheckOutBillingInfo';
import CheckoutPaymentMethods from './ShopPageCheckOutPaymentMethods';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import sum from 'lodash/sum';
// import DeliveryFee from "../ShopPageDeliveryFee";

import DeliveryFee from "../deliveryFee"
// ----------------------------------------------------------------------

const DELIVERY_OPTIONS = [
    {
        value: 0,
        title: 'Standard delivery',
        description: 'Delivered on Monday, August 12',
    },
];

// const PAYMENT_OPTIONS = [
//     {
//         value: 0,
//         title: 'Online Banking',
//         description: 'You will be redirected to PayPal website to complete your purchase securely.',
//         icons: ['/assets/icons/payments/ic_paypal.svg'],
//     },
//     {
//         value: 1,
//         title: 'Credit / Debit Card',
//         description: 'We support Mastercard, Visa, Discover and Stripe.',
//         icons: ['/assets/icons/payments/ic_mastercard.svg', '/assets/icons/payments/ic_visa.svg'],
//     }
// ];

// const CARDS_OPTIONS = [
//     { value: 'ViSa1', label: '**** **** **** 1212 - Jimmy Holland' },
//     { value: 'ViSa2', label: '**** **** **** 2424 - Shawn Stokes' },
//     { value: 'MasterCard', label: '**** **** **** 4545 - Cole Armstrong' },
// ];

CheckoutPayment.propTypes = {
    onReset: PropTypes.func,
    checkout: PropTypes.object,
    onBackStep: PropTypes.func,
    onGotoStep: PropTypes.func,
    onNextStep: PropTypes.func,
    onApplyShipping: PropTypes.func,
};

export default function CheckoutPayment({
    checkout,
    onReset,
    onNextStep,
    onBackStep,
    onGotoStep,
    onApplyShipping,
}) {

    const { data, address, merchant } = checkout;
    const total = sum(data.map((item) => item.total));
    const subtotal = sum(data.map((item) => item.total));
    const discount = sum(data.map((item) => item.discount));


    const onSubmit = async () => {
        try {
            onNextStep();
            onReset();
        } catch (error) {
            console.error(error);
        }
    };

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

                <CheckoutPaymentMethods
                  sx={{ my: 3 }}
                    // cardOptions={CARDS_OPTIONS}
                    // paymentOptions={PAYMENT_OPTIONS}
                  
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
                    // shipping={deliveryFee}
                    onEdit={() => onGotoStep(0)}
                />
                {/* <DeliveryFee handleGetPostcode={handleGetPostcode} addressID={address} data={data} /> */}

                <LoadingButton
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                // loading={isSubmitting}
                >
                    Complete Order
                </LoadingButton>
            </Grid>
        </Grid>
        // </FormProvider>
    );
}
