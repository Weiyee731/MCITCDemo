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
  const { open, onClose, modalClose,emailVerification } = props;
  const [openOTP, setopenOTP] = useState(false);

  return (
    <div>
      {
        openOTP ?
          <OTPPage emailVerification={emailVerification}/>
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
              <Button onClick={() => { setopenOTP(true) }}>Bind with Google</Button>
            </DialogActions>
          </Dialog>
      }

    </div>
  );
}

function OTPPage({ emailVerification }) {
  console.log("emailVerification",emailVerification)
  const [OTP, setOTP] = useState("");
  const handleChange = (otp) => {
    if (otp !== null) {
      this.setState({ otp });
    }
    if (otp.length === 6) {

      this.props.CallUpdateContact({
        USERID: this.state.USERID,
        UPDATETYPE: this.state.UPDATETYPE,
        otp: otp,
        UpdatedValue: this.state.UpdatedValue,
      }); //submit otp
      this.setState({ startCountDown: false });
      this.stopTimer(60);
    }
  };

  return (
    <div>
      <div className="row contactrowStyle">
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
      </div>
      <MuiOtpInput id="OTP" label="OTP" variant="outlined" className="w-100" length={6} value={OTP} onChange={handleChange} />
      <div className="row contactrowStyle">
        <div className="col-6 font otp">
          {/* <OtpInput
                            value={this.state.otp}
                            onChange={this.handleChange}
                            numInputs={6}
                            separator={<span>-</span>}
                            inputStyle={inputstyle}
                          /> */}
        </div>
        {/* <div className="col-4 d-flex align-items-center font">
                          {this.state.startCountDown === true
                            ? this.state.counter + " seconds is remaining"
                            : ""}
                        </div> */}
      </div>
    </div>
  )
}
