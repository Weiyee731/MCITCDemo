import PropTypes from 'prop-types';
import React, { useEffect } from "react";
// @mui
import { Table, TableBody, TableContainer, Stack, Typography, CardHeader } from '@mui/material';
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

    <TableContainer sx={{ overflow: 'unset' }}>
      {
        isProductSet && isArrayNotEmpty(productFiltered) && productFiltered.map((listing) => {
          return (
            <>
              <div className="row" style={{ paddingLeft: "30px", paddingTop: "10px" }}>
                <Typography variant="body2" style={{ fontWeight: "bold", }}> <StoreIcon /> {listing.MerchantShopName}</Typography>
              </div>
              <Table sx={{ minWidth: 720 }}>
                <TableHeadCustom headLabel={TABLE_HEAD} />
                {
                  listing.cartList !== undefined && isArrayNotEmpty(listing.cartList) && listing.cartList.map((row) => {
                    return (
                      <TableBody>
                        <CheckoutCartProduct
                          key={row.id}
                          row={row}
                          onDelete={() => onDelete(row.id)}
                          onDecrease={() => onDecreaseQuantity(row.id)}
                          onIncrease={() => onIncreaseQuantity(row.id)}
                        />
                      </TableBody>
                    )
                  })
                }
              </Table>
            </>
          )
        })
      }

    </TableContainer>
  );
}
