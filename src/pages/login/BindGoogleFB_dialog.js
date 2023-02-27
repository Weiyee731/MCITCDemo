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
import { MuiOtpInput } from 'mui-one-time-password-input'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const BindGoogleFBDialog = (props) => {
  const { open, onClose, modalClose, emailVerification, callUploadApi } = props;
  const [openOTP, setopenOTP] = useState(false);

  const bindGoogleFB = () => {
    setopenOTP(true);
    callUploadApi();
  }

  return (
    <div>
      {
        openOTP ?
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => onClose}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>{"Please check your email for verification code!"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                <OTPPage emailVerification={emailVerification} callUploadApi={callUploadApi} />
              </DialogContentText>
            </DialogContent>
            <DialogActions className='d-flex justify-content-between'>
              <Button fullWidth onClick={() => onClose(false)}>Submit</Button>
            </DialogActions>
          </Dialog>
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
              <Button onClick={() => onClose(false)}>Login with Emporia Account</Button>
              <Button onClick={() => { bindGoogleFB() }}>Bind with Google</Button>
            </DialogActions>
          </Dialog>
      }

    </div>
  );
}

function OTPPage({ emailVerification }) {
  // console.log("emailVerification", emailVerification)
  const [OTP, setOTP] = useState("");
  const handleChange = (otp) => {
    if (otp !== null) {
      setOTP(otp)
    }
    if (otp.length === 6) {
      // this.props.CallSignupOTP()
    }
  };


  return (
    <div>
      {/* <div className="row contactrowStyle">
        <div className="col-6">
          <p className=" font">
            Enter the code we sent to your email{" "}
            {this.props.currentUser.length > 0 &&
              this.props.currentUser[0].UserEmailAddress !== undefined &&
              this.props.currentUser[0].UserEmailAddress !== null
              ? this.censorEmail(
                this.props.currentUser[0].UserEmailAddress
              )
              : "-"}
          </p>
        </div>
      </div> */}
      <MuiOtpInput id="OTP" label="OTP" variant="outlined" className="w-100" length={6} value={OTP} onChange={handleChange} />
      <div>
        remain: {useCountdown()}
      </div>
    </div>
  )
}

function useCountdown() {
  const [countDown, setCountDown] = useState(60);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDown - 1);
    }, 1000);

    if (countDown === 0) {
      clearInterval(interval)
    }
    return () => clearInterval(interval);
  }, [countDown]);

  return countDown;
};
