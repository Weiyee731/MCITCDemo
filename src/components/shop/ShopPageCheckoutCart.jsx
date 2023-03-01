import PropTypes from 'prop-types';
import sum from 'lodash/sum';
import { Link as RouterLink } from 'react-router-dom';
import React, { useState, useEffect } from "react";
// @mui
import { Grid, Card, Button, CardHeader, Typography } from '@mui/material';
// routes
// import { PATH_DASHBOARD } from '../../../../../routes/paths';
// components
// import Iconify from '../../../../../components/iconify';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import EmptyContent from '../EmptyContent/EmptyContent';
//
import CheckoutSummary from './ShopPageCheckoutCartSummary';
import CheckoutCartProductList from './ShopPageCheckoutCartProductList';
import { isArrayNotEmpty } from '../../Utilities/UtilRepo';

// ----------------------------------------------------------------------

CheckoutCart.propTypes = {
  checkout: PropTypes.object,
  onNextStep: PropTypes.func,
  onDeleteCart: PropTypes.func,
  onDecreaseQuantity: PropTypes.func,
  onIncreaseQuantity: PropTypes.func,  
  onApplyDiscount: PropTypes.func,
  onRemovePromoError: PropTypes.func,
  onHandleDiscount: PropTypes.func,
  onHandlePromoCode: PropTypes.func,
};

export default function CheckoutCart({
  checkout,
  onNextStep,  
  onDeleteCart,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onApplyDiscount,
  onRemovePromoError,
  onHandleDiscount,
  onHandlePromoCode,
  validPromoData,
  discount,
  total,
  subtotal,
  promoCode,
}) {

  const { data } = checkout;
  // const [total, setTotal] = useState(sum(data.map((item) => item.total)))
  // const [subtotal, setSubtotal] = useState(sum(data.map((item) => item.total)))
  // const [discount, setDiscount] = useState(sum(data.map((item) => item.discount)))

  const totalItems = sum(data.map((item) => item.quantity));
  // let total = sum(data.map((item) => item.total));
  // const subtotal = sum(data.map((item) => item.total));
  // let discount = sum(data.map((item) => item.discount));
  const isEmptyCart = !data.length;

  // const onHandleDiscount = (promoData) => {
  //   onHandleDiscount(promoData,)
  // }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Card sx={{ mb: 3 }}>
          <CardHeader
            title={
              <Typography variant="h6">
                Selected Item
                <Typography component="span" sx={{ color: 'text.secondary' }}>
                  &nbsp;({totalItems} item)
                </Typography>
              </Typography>
            }
            sx={{ mb: 3 }}
          />

          {!isEmptyCart ? (
            <CheckoutCartProductList
              products={data}
              onDelete={onDeleteCart}
              onIncreaseQuantity={onIncreaseQuantity}
              onDecreaseQuantity={onDecreaseQuantity}
            />
          ) : (
            <EmptyContent
              title="Selected cart is empty"
              description="Look like you did't select items in your shopping cart."
              img="/images/illustration/illustration_empty_content.svg"
            />
          )}
        </Card>

        <Button
          to="/"
          component={RouterLink}
          color="inherit"
          startIcon={<ArrowBackIosNewIcon />}
        >
          Continue Shopping
        </Button>
      </Grid>
      <Grid item xs={12} md={4}>
        <CheckoutSummary
          enableDiscount
          total={total}
          discount={discount}
          subtotal={subtotal}
          promoCode={promoCode}
          validPromoData={validPromoData}
          onRemovePromoError={onRemovePromoError}
          onHandleDiscount={onHandleDiscount}    
          onHandlePromoCode={onHandlePromoCode}      
          onApplyDiscount={onApplyDiscount}
          shipping={null}
          hideShipping={true}
        />
        <Button
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          color="primary"
          disabled={!data.length}
          onClick={onNextStep}
        >
          Check Out
        </Button>
      </Grid>
    </Grid>
  );
}
