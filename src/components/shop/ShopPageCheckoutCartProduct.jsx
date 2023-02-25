import PropTypes from 'prop-types';
// @mui
import { Box, Stack, Divider, TableRow, TableCell, Typography, Grid } from '@mui/material';
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

  console.log('ss', product)

  let promotionPrice = 0

  if (row.product !== undefined && row.product.ProductPromotion !== undefined) {
    JSON.parse(row.product.ProductPromotion).map((x) => {
      if (x.ProductVariationDetailID === row.product.ProductVariationDetailID)
        promotionPrice = x.PromotionPrice
    })
  }
  return (
 
    <Grid item container spacing={3} style={{paddingBottom:'2%', borderBottom:'1px solid #EEEBEB', marginBottom:'4%'}}>
      <Grid item xs={4} sm={4} lg={4} style={{display:'flex', flexDirection:"row", justifyContent:'center',alignItems:'center'}}>
          <Image
              alt="product image"
              src={product.ProductImage}
              sx={{ width: 84, height: 84, borderRadius: 1.5, mr: 2 }}
            />
      </Grid>

      <Grid item xs={8} sm={8} lg={8} style={{marginTop:'auto', marginBottom:'auto'}} >
        <Grid item container spacing={2}>
        <Grid item xs={12} sm={4} lg={4} style={{marginTop:'auto', marginBottom:'auto'}}>
              <Typography  variant="body1">
                {product.ProductName}
              </Typography>

              <Grid item container spacing={2} style={{display:'flex', flexDirection:'row'}}>
                <Grid item xs={'auto'}>
                  <Typography variant="caption">
                    Variation: 
                  </Typography>
                </Grid>

                <Grid item xs={'auto'} >
                  <Typography variant="caption" sx={{ fontWeight:"bold"}}>
                    {product.ProductVariationValue}
                  </Typography>
                </Grid>
              
              </Grid>
           </Grid>

            
            <Grid item xs={12} sm={3} lg={3} style={{marginTop:'auto', marginBottom:'auto'}}>
            <Typography variant='subtitle2'>RM {Number(product.ProductPrice).toFixed(2)}</Typography>
            </Grid>

            <Grid item xs={6} sm={2} lg={2} style={{ marginTop:"auto", marginBottom:'auto'}}>
              <Typography variant='subtitle2' >x {product.ProductQuantity}</Typography>
            </Grid>

            <Grid item xs={6} sm={3} lg={3} style={{ marginTop:'auto', marginBottom:'auto'}}>
              <Typography variant='subtitle2' style={{fontWeight:'bold'}}>RM {(Number(price) * product.ProductQuantity).toFixed(2)}</Typography>
            </Grid>

        </Grid>
           
      </Grid>

      <Divider variant="middle" />

    </Grid>
    
  );
}
