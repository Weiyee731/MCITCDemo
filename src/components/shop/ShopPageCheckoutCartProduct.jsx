import PropTypes from 'prop-types';
// @mui
import { Box, Stack, Divider, TableRow, TableCell, Typography } from '@mui/material';
// utils
// import { fCurrency } from '../../../../../utils/formatNumber';
import Currency from '../shared/Currency';
// components
import Image from '../image/Image';
import Label from '../label/Label';
import { RowingSharp } from '@mui/icons-material';

// ----------------------------------------------------------------------

CheckoutCartProduct.propTypes = {
  row: PropTypes.object,
  onDelete: PropTypes.func,
  onDecrease: PropTypes.func,
  onIncrease: PropTypes.func,
};

export default function CheckoutCartProduct({ row, onDelete, onDecrease, onIncrease }) {
  const { name, size, price, variation, product, quantity, available } = row;

  let promotionPrice = 0

  console.log("Dsdadasdassda", row)
  if (row.product !== undefined && row.product.ProductPromotion !== undefined) {
    JSON.parse(row.product.ProductPromotion).map((x) => {
      if (x.ProductVariationDetailID === row.product.ProductVariationDetailID)
        promotionPrice = x.PromotionPrice
    })
  }
  return (
    <TableRow>
      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Image
          alt="product image"
          src={product.ProductImage}
          sx={{ width: 64, height: 64, borderRadius: 1.5, mr: 2 }}
        />

        <Stack spacing={0.5}>
          <Typography noWrap variant="subtitle2" sx={{ maxWidth: 240 }}>
            {name}
          </Typography>

          <Stack
            direction="row"
            alignItems="center"
            sx={{ typography: 'body2', color: 'text.secondary' }}
          >
            variation: <Label sx={{ ml: 0.5 }}> {product.ProductVariationValue} </Label>
            {/* <Divider orientation="vertical" sx={{ mx: 1, height: 16 }} /> */}
            {/* <ColorPreview colors={colors} /> */}
          </Stack>
        </Stack>
      </TableCell>
      {console.log("dsdadas99999", row)}
      <TableCell>
        {promotionPrice !== 0 ?
          <>
            <span className="product-card__new-price">
              <Currency value={promotionPrice} currency={"RM"} />
            </span>
            <span className="product-card__old-price">
              <Currency value={price} currency={"RM"} />
            </span>
          </>
          :
          <>
            <span className="product-card__new-price">
              <Currency value={price} currency={"RM"} />
            </span>
          </>
        }
        {/* <Currency value={price}></Currency> */}
      </TableCell>
      {/* <TableCell>{fCurrency(price)}</TableCell> */}
      <TableCell>
        {quantity}
      </TableCell>

      <TableCell align="right">{<Currency value={promotionPrice !== 0 ? promotionPrice * quantity : price * quantity}></Currency>}</TableCell>
    </TableRow>
  );
}
