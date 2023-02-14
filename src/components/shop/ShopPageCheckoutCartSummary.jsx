import PropTypes from 'prop-types';
import React, { useState, useEffect } from "react";

// @mui
import {
  Box,
  Card,
  Stack,
  Button,
  Divider,
  TextField,
  CardHeader,
  Typography,
  CardContent,
  InputAdornment,
  FormHelperText,
} from '@mui/material';
// utils
// import { fCurrency } from '../../../../utils/formatNumber';
import Currency from '../shared/Currency';
// components
import EditIcon from '@mui/icons-material/Edit';
import { isArrayNotEmpty } from '../../Utilities/UtilRepo';
// ----------------------------------------------------------------------

CheckoutSummary.propTypes = {
  onEdit: PropTypes.func,
  total: PropTypes.number,
  discount: PropTypes.number,
  subtotal: PropTypes.number,
  shipping: PropTypes.array,
  enableEdit: PropTypes.bool,
  enableDiscount: PropTypes.bool,
  onApplyDiscount: PropTypes.func,
  onRemovePromoError: PropTypes.func,
  onHandleDiscount: PropTypes.func,
  onHandlePromoCode: PropTypes.func,
};

export default function CheckoutSummary({
  total,
  onEdit,
  discount,
  subtotal,
  shipping,
  promoCode,
  hideShipping,
  onApplyDiscount,
  onRemovePromoError,
  validPromoData,
  onHandleDiscount,
  onHandlePromoCode,
  enableEdit = false,
  enableDiscount = false,
}) {
  const defaultShipping = shipping !== null ? 'Free' : '-';
  // const [promoCode, setPromoCode] = useState([])

  useEffect(() => {
    if (isArrayNotEmpty(validPromoData)) {
      onHandleDiscount(validPromoData)
    }
  }, [validPromoData])


  return (
    <Card sx={{ mb: 3 }}>
      <CardHeader
        title="Order Summary"
        action={
          enableEdit && (
            <Button size="small" onClick={onEdit} startIcon={<EditIcon />}>
              Edit
            </Button>
          )
        }
      />

      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Sub Total
            </Typography>
            <Typography variant="subtitle2"><Currency value={subtotal}></Currency></Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Discount
            </Typography>
            <Typography variant="subtitle2">{discount ? <Currency value={-discount}></Currency> : '-'}</Typography>
          </Stack>
          {!hideShipping &&
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Shipping
              </Typography>
              <Typography variant="subtitle2">
                {shipping ? <Currency value={shipping[0].ShippingCost}></Currency> : defaultShipping}
              </Typography>
    
            </Stack>
          }

          <Divider />

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="subtitle1">Total</Typography>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="subtitle1" sx={{ color: 'error.main' }}>
                <Currency value={total}></Currency>
              </Typography>
              <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
                (VAT included if applicable)
              </Typography>
            </Box>
          </Stack>

          {/* {enableDiscount && onApplyDiscount && ( */}
          <TextField
            fullWidth
            placeholder="Discount codes / Gifts"
            defaultValue={promoCode}
            onChange={(e) => {
              onHandlePromoCode(e.target.value)
              // setPromoCode(e.target.value)
              if (isArrayNotEmpty(validPromoData))
                onRemovePromoError()
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button onClick={() => onApplyDiscount(promoCode)} sx={{ mr: -0.5 }}>
                    Apply
                  </Button>
                </InputAdornment>
              ),
              style: { color: promoCode.length > 0 && validPromoData !== undefined && isArrayNotEmpty(validPromoData) ? validPromoData[0].isValidCode === false ? "red" : "green" : "black" }
            }}
          />
          {
            promoCode.length > 0 && validPromoData !== undefined && isArrayNotEmpty(validPromoData) && validPromoData[0].isValidCode === false &&
            <FormHelperText style={{ color: "red" }}>   Invalid Promo Code </FormHelperText>
          }
          {
            promoCode.length > 0 && validPromoData !== undefined && isArrayNotEmpty(validPromoData) && validPromoData[0].PromoCodeID !== undefined &&
            <FormHelperText style={{ color: "green" }}> Promo Code is Used</FormHelperText>
          }
        </Stack>
      </CardContent>
    </Card>
  );
}
