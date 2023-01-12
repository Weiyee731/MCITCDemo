import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// @mui
import {
  Box,
  Stack,
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { GitAction } from '../../store/action/gitAction';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from "@mui/material/Checkbox";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import AccountPageAddAddress from '../account/AccountPageAddAddress';
import { toast } from "react-toastify";
// ----------------------------------------------------------------------

CheckoutBillingNewAddressForm.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onCreateBilling: PropTypes.func
};

export default function CheckoutBillingNewAddressForm({ open, onClose, onCreateBilling }) {

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [newAddressInfo, editForm] = useState({
    Name: '',
    USERID: window.localStorage.getItem("id"),
    ContactNo: '',
    email: '',
    USERADDRESSLINE1: '',
    USERADDRESSLINE2: '',
    USERPOSCODE: '',
    USERSTATE: '',
    USERCITY: '',
    COUNTRYID: 1
  })

  const { addAddress } = useSelector(state => state.counterReducer);
  const [prevValue, setPrevValue] = useState(addAddress);

  useEffect(() => {
    setIsLoading(false)
    console.log("addAddress", addAddress)
    console.log("add", addAddress !== [])
    if (addAddress !== []) {
      onClose()
    }
    if (addAddress !== prevValue) {
      setPrevValue(addAddress)
      toast.success("Your address is added successfully")
    }

  }, [addAddress]);

  useEffect(() => {
    dispatch(GitAction.CallCountry());
  }, []);

  const countrylist = useSelector(state => ({ countries: state.counterReducer.countries }));
  const onSubmit = async (data) => {
    try {
      onCreateBilling({
        receiver: data.receiver,
        phoneNumber: data.phoneNumber,
        fullAddress: `${data.address}, ${data.city}, ${data.state}, ${data.country}, ${data.zipCode}`,
        addressType: data.addressType,
        isDefault: data.isDefault,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleaddAddress = () => {
    dispatch(GitAction.CallAddAddress(newAddressInfo));
  }

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <DialogTitle>Add new address</DialogTitle>

      <DialogContent dividers>
        <Stack spacing={3}>
          {/* <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="addressType"
          // value={parseInt(this.state.paymentMethodsID)}
          >
            <Stack spacing={0} direction="row" >
              <div>
                <FormControlLabel value="1" control={<Radio />} label="Online Banking" style={{ justifyContent: 'center' }}
                  onClick={() => this.handlePaymentClick(1, true)}
                // checked={parseInt(this.state.paymentMethodsID) === 1}
                />
              </div>
              <div>
                <FormControlLabel value="2" control={<Radio />} label="Online Banking" style={{ justifyContent: 'center' }}
                  onClick={() => this.handlePaymentClick(1, true)}
                // checked={parseInt(this.state.paymentMethodsID) === 1}
                />
              </div>
            </Stack>
          </RadioGroup> */}
          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
            }}
          >
            <TextField id="outlined-basic" name="Name" label="Full Name" variant="outlined" value={newAddressInfo.Name}
              onChange={(e) => {
                editForm({ ...newAddressInfo, [e.target.name]: e.target.value })
              }} />

            <TextField id="outlined-basic" name="ContactNo" label="Phone Number" variant="outlined" value={newAddressInfo.ContactNo}
              onChange={(e) => { editForm({ ...newAddressInfo, [e.target.name]: e.target.value }) }} />

          </Box>
          <TextField id="outlined-basic" name="email" label="Email" variant="outlined" value={newAddressInfo.email}
            onChange={(e) => {
              editForm({ ...newAddressInfo, [e.target.name]: e.target.value })
            }} />

          <TextField id="outlined-basic" name="USERADDRESSLINE1" label="Address Line 1" variant="outlined" value={newAddressInfo.USERADDRESSLINE1}
            onChange={(e) => {
              editForm({ ...newAddressInfo, [e.target.name]: e.target.value })
            }} />
          <TextField id="outlined-basic" name="USERADDRESSLINE2" label="Address Line 2" variant="outlined" value={newAddressInfo.USERADDRESSLINE2}
            onChange={(e) => {
              editForm({ ...newAddressInfo, [e.target.name]: e.target.value })
            }} />

          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(3, 1fr)',
            }}
          >
            <TextField id="outlined-basic" name="USERCITY" label="Town / City" variant="outlined" value={newAddressInfo.USERCITY} onChange={(e) => {
              editForm({ ...newAddressInfo, [e.target.name]: e.target.value })
            }} />
            <TextField id="outlined-basic" name="USERSTATE" label="State" variant="outlined" value={newAddressInfo.USERSTATE} onChange={(e) => {
              editForm({ ...newAddressInfo, [e.target.name]: e.target.value })
            }} />
            <TextField id="outlined-basic" name="USERPOSCODE" label="Zip/Code" variant="outlined" type="number" value={newAddressInfo.USERPOSCODE} onChange={(e) => {
              editForm({ ...newAddressInfo, [e.target.name]: e.target.value })
            }} />
          </Box>

          <FormControl fullWidth  >
            <Select
              id="Country"
              variant="outlined"
              defaultValue={1}
              name="COUNTRYID"
              value={newAddressInfo.COUNTRYID}
              onChange={(e) => { editForm({ ...newAddressInfo, [e.target.name]: e.target.value }) }}
              style={{
                textAlign: "left",
                width: "100%",
              }}
            >
              {countrylist.countries.map((country) => (
                <MenuItem value={country.CountryId}
                  key={country.CountryId}> {country.CountryName}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControlLabel control={<Checkbox />} name="isDefault" label="Use this address as default." sx={{ mt: 3 }} onClick={() => { }} />
        </Stack>
      </DialogContent>

      <DialogActions>
        <LoadingButton type="submit" variant="contained"
          loading={isLoading}
          onClick={() => {
            handleaddAddress();
            setIsLoading(true)
          }}
        >
          Add Address
        </LoadingButton>

        <Button color="inherit" variant="outlined" onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
      {/* </FormProvider> */}
    </Dialog>
  );
}
