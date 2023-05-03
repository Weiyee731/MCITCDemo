import * as React from 'react';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { MuiOtpInput } from 'mui-one-time-password-input';
import  OTPPage  from '../../components/OTPwithTimer/OTPwithTimer';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const BindGoogleFBDialog = (props) => {
  const { open, onClose, modalClose, emailVerification, callSendOTP, CallOTP_Verification } = props;
  const [openOTP, setopenOTP] = useState(false);

  const bindGoogleFB = () => {
    setopenOTP(true);
    callSendOTP();
  }

  return (
    <div>
      {
        openOTP ?
          <OTPPage email={emailVerification[0].UserEmailAddress ? emailVerification[0].UserEmailAddress : ""} CallOTP_Verification={CallOTP_Verification} open={open} onClose={onClose} />
          :
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => onClose}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>{"Hello! It looks like we already have an account associated with this gmail acount."}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Is that you? Would you like to bind this gmail to the account or create new account using this gmail? Thank you!
              </DialogContentText>
            </DialogContent>
            <DialogActions className='d-flex justify-content-between'>
              <Button onClick={() => onClose(false)}>Login with MCITC Account</Button>
              <Button onClick={() => { bindGoogleFB() }}>Bind with Google</Button>
            </DialogActions>
          </Dialog>
      }
    </div>
  );
}