import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
// @mui
import { Grid, Card, Button, Typography, Stack, Box } from '@mui/material';
// _mock
// import { _addressBooks } from '../../../../../_mock/arrays';
// components
import Label from '../label/Label';
// import Iconify from '../../../../../components/iconify';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import AddIcon from '@mui/icons-material/Add';
//
import CheckoutSummary from './ShopPageCheckoutCartSummary';
import CheckoutBillingNewAddressForm from './ShopPageCheckOutBillingNewAddressForm';
import { useDispatch, useSelector } from 'react-redux';
import { GitAction } from '../../store/action/gitAction';
import sum from 'lodash/sum';
import CircularProgress from '@mui/material/CircularProgress';
import { LoadingButton } from '@mui/lab';
import { toast } from "react-toastify";

// ----------------------------------------------------------------------

CheckoutBillingAddress.propTypes = {
  checkout: PropTypes.object,
  onBackStep: PropTypes.func,
  onCreateBilling: PropTypes.func,
};

export default function CheckoutBillingAddress({ checkout, onBackStep, onCreateBilling }) {
  const dispatch = useDispatch();

  const [Selfpickup, changeSelfpickup] = useState([{
    UserAddressBookID: 0,
    UserAddressName: 'Self-pickup',
    UserAddressLine1: "Pickup Directly from our store",
    UserAddressLine2: "",
    UserCity: "",
    UserState: "",
  }])

  const { data } = checkout;
  const total = sum(data.map((item) => item.total));
  const subtotal = sum(data.map((item) => item.total));
  const discount = sum(data.map((item) => item.discount));

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { deleteAddress, addAddress, addresses } = useSelector(state => state.counterReducer);

  const [prevValue, setPrevValue] = useState(deleteAddress);

  useEffect(() => {
    dispatch(GitAction.CallAllAddress({ USERID: 1 }));
  }, [deleteAddress, addAddress]);

  useEffect(() => {
    if (deleteAddress !== prevValue) {
      setPrevValue(deleteAddress); // update the prevValue state
      setIsLoading(false)
      toast.success("Selected address is deleted")
    }
  }, [deleteAddress]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {
            Selfpickup.map((address, index) => (
              <DefaultAddressItem
                key={index}
                address={address}
                onCreateBilling={() => onCreateBilling(address)}
              />
            ))
          }
          {addresses.map((address, index) => (
            <AddressItem
              key={index}
              address={address}
              onCreateBilling={() => onCreateBilling(address)}
              setIsLoading={setIsLoading}
              isloading={isLoading}
            />
          ))}

          <Stack direction="row" justifyContent="space-between">
            <Button
              size="small"
              color="inherit"
              onClick={onBackStep}
              startIcon={<ArrowBackIosNewIcon />}
            >
              Back
            </Button>

            <Button
              size="small"
              variant="contained"
              onClick={handleOpen}
              startIcon={<AddIcon />}
              color="primary"
            >
              Add new address
            </Button>
          </Stack>
        </Grid>

        <Grid item xs={12} md={4}>
          <CheckoutSummary subtotal={subtotal} total={total} discount={discount} hideShipping={true} />
        </Grid>
      </Grid>

      <CheckoutBillingNewAddressForm
        open={open}
        onClose={handleClose}
        onCreateBilling={onCreateBilling}
      // setIsLoading={setIsLoading} 
      />
    </>
  );
}

// ----------------------------------------------------------------------

AddressItem.propTypes = {
  address: PropTypes.object,
  onCreateBilling: PropTypes.func,
};

function AddressItem({ address, onCreateBilling, setIsLoading, isloading }) {
  const { UserAddressBookID, UserAddressName, UserAddressLine1, UserAddressLine2, UserCity, UserPoscode, UserState, UserContactNo, isDefaultAddress } = address;
  const isDefault = isDefaultAddress === 1
  const dispatch = useDispatch();

  return (
    <Card
      sx={{
        p: 3,
        mb: 3,
      }}
    >
      <Stack
        spacing={2}
        alignItems={{
          md: 'flex-end',
        }}
        direction={{
          xs: 'column',
          md: 'row',
        }}
      >
        <Stack flexGrow={1} spacing={1}>
          <Stack direction="row" alignItems="center">
            <Typography variant="subtitle1">
              {UserAddressName}
              {/* <Box component="span" sx={{ ml: 0.5, typography: 'body2', color: 'text.secondary' }}>
                ({addressType})
              </Box> */}
            </Typography>

            {isDefault && (
              <Label color="info" sx={{ ml: 1 }}>
                Default
              </Label>
            )}
          </Stack>

          <Typography variant="body2">{UserAddressLine1 + " " + UserAddressLine2 + ", " + UserCity + ", " + UserState}</Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {UserContactNo}
          </Typography>
        </Stack>

        <Stack flexDirection="row" flexWrap="wrap" flexShrink={0}>
          {!isDefault && (
            <LoadingButton variant="outlined" type="submit" loading={isloading} size="small" color="inherit" sx={{ mr: 1 }} onClick={() => {
              dispatch(GitAction.CallDeleteAddress({ AddressBookNo: UserAddressBookID }));
              setIsLoading(true)
            }}>
              Delete
            </LoadingButton>
          )}

          <Button variant="outlined" size="small" onClick={onCreateBilling}>
            Deliver to this Address
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
}



DefaultAddressItem.propTypes = {
  address: PropTypes.object,
  onCreateBilling: PropTypes.func,
};

function DefaultAddressItem({ address, onCreateBilling }) {
  const { UserAddressName, UserAddressLine1 } = address;

  return (
    <Card
      sx={{
        p: 3,
        mb: 3,
      }}
    >
      <Stack
        spacing={2}
        alignItems={{
          md: 'flex-end',
        }}
        direction={{
          xs: 'column',
          md: 'row',
        }}
      >
        <Stack flexGrow={1} spacing={1}>
          <Stack direction="row" alignItems="center">
            <Typography variant="subtitle1">
              {UserAddressName}
            </Typography>
          </Stack>

          <Typography variant="body2">{UserAddressLine1}</Typography>
        </Stack>

        <Button variant="outlined" size="small" onClick={onCreateBilling}>
          Self Pick Up
        </Button>
      </Stack>
    </Card>
  );
}

