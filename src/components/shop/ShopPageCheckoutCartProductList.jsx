import PropTypes from 'prop-types';
import React, { useEffect } from "react";
// @mui
import { Table, TableBody, TableContainer, Stack, Typography, CardHeader, Grid } from '@mui/material';
// components
import TableHeadCustom from '../table/TableHeadCustom';
//
import CheckoutCartProduct from './ShopPageCheckoutCartProduct';
import { isArrayNotEmpty } from '../../Utilities/UtilRepo';
import StoreIcon from '@mui/icons-material/Store';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'product', label: 'Product' },
  { id: 'price', label: 'Price' },
  { id: 'quantity', label: 'Quantity' },
  { id: 'totalPrice', label: 'Total Price', align: 'right' },
];

// ----------------------------------------------------------------------

CheckoutCartProductList.propTypes = {
  onDelete: PropTypes.func,
  products: PropTypes.array,
  onDecreaseQuantity: PropTypes.func,
  onIncreaseQuantity: PropTypes.func,
};

export default function CheckoutCartProductList({
  products,
  onDelete,
  onIncreaseQuantity,
  onDecreaseQuantity,
}) {

  const [productFiltered, setFilteredProduct] = React.useState([]);
  const [isProductSet, setProductListing] = React.useState(false);

  useEffect(() => {
    let listing = []

    if (isProductSet === false) {
      isArrayNotEmpty(products) && products.map((x) => {
        if (listing.length === 0) {
          listing.push(
            {
              MerchantID: x.MerchantID,
              MerchantShopName: x.MerchantShopName,
              cartList: [x]
            }
          )
        } else {
          if (listing.filter((data) => data.MerchantID === x.MerchantID).length > 0) {
            listing.map((y, index) => {
              if (y.MerchantID === x.MerchantID) {
                listing[index].cartList.push(x)
              }
            })
          } else {
            listing = [...listing, {
              MerchantID: x.MerchantID,
              MerchantShopName: x.MerchantShopName,
              cartList: [x]
            }
            ]
          }
        }
      })
      setProductListing(true)
      setFilteredProduct(listing)
    }
  }, [products])

  return (
<>
  
    
     {isProductSet && isArrayNotEmpty(productFiltered) && productFiltered.map((listing) => (
    <Grid item container spacing={2} >
        <Grid item xs={12} sm={12} style={{display:'flex', flexDirection:'row', alignItems:'center',marginLeft:'4%'}}>
          <StoreIcon /> <Typography variant='subtitle2' style={{fontWeight:'bold', marginLeft:'2%'}}>{listing.MerchantShopName}</Typography>
        </Grid>

        <Grid item xs={12} style={{margin:'2%'}}>
        {
                  listing.cartList !== undefined && isArrayNotEmpty(listing.cartList) && listing.cartList.map((row) => {
                    return (
          <CheckoutCartProduct
            key={row.id}
            row={row}
            onDelete={() => onDelete(row.id)}
            onDecrease={() => onDecreaseQuantity(row.id)}
            onIncrease={() => onIncreaseQuantity(row.id)}
          />
                    )})}
        </Grid>
    </Grid>
      ))}

    </>
  );
}
