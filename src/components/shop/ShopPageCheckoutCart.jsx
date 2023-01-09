import PropTypes from 'prop-types';
import sum from 'lodash/sum';
import { Link as RouterLink } from 'react-router-dom';
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

// ----------------------------------------------------------------------

CheckoutCart.propTypes = {
  checkout: PropTypes.object,
  onNextStep: PropTypes.func,
  onDeleteCart: PropTypes.func,
  onApplyDiscount: PropTypes.func,
  onDecreaseQuantity: PropTypes.func,
  onIncreaseQuantity: PropTypes.func,
};

export default function CheckoutCart({
  checkout,
  onNextStep,
  onApplyDiscount,
  onDeleteCart,
  onIncreaseQuantity,
  onDecreaseQuantity,
}) {

  const { data } = checkout;

  const totalItems = sum(data.map((item) => item.quantity));
  const total = sum(data.map((item) => item.total));
  const subtotal = sum(data.map((item) => item.total));
  const isEmptyCart = !data.length;

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
          // discount={discount}
          subtotal={subtotal}
          onApplyDiscount={onApplyDiscount}
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
