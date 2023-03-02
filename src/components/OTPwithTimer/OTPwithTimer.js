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

export default function OTPPage({ email, CallOTP_Verification, onClose, open }) {
    const [OTP, setOTP] = useState("");
    const handleChange = (otp) => {
        if (otp !== null) {
            setOTP(otp)
        }
        if (otp.length === 6) {
            CallOTP_Verification(OTP)
            // this.props.CallSignupOTP()
        }
    };

    const handlePaste = (event) => {
        const pasteData = event.clipboardData.getData('text/plain');
        const newOTP = pasteData.replace(/\D/g, '').slice(0, 6);
        setOTP(newOTP);
        if (newOTP.length === 6) {
            CallOTP_Verification(newOTP)
        }


        event.preventDefault();
    };


    const censorEmail = (email) => {
        if (email !== null && email.length > 5) {
            var arr = email.split("@");
            return censorWord(arr[0]) + "@" + arr[1];
        } else return "No email was found";
    };

    const censorWord = (str) => {
        return str[0] + "*".repeat(str.length - 2) + str.slice(-1);
    };

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => onClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{`Please check your email ${censorEmail(email)} for verification code!`}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    <MuiOtpInput id="OTP" label="OTP" variant="outlined" className="w-100" length={6} value={OTP} onChange={handleChange} onPaste={handlePaste} />
                    <div>
                        remain: {useCountdown()}
                    </div>
                </DialogContentText>
            </DialogContent>
            <DialogActions className='d-flex justify-content-between'>
                <Button fullWidth onClick={() => { CallOTP_Verification(OTP) }}>Submit</Button>
            </DialogActions>
        </Dialog >
    )
}

export function useCountdown() {
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
