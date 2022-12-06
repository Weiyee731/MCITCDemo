// react
import React from 'react';
import { Image } from 'react-bootstrap';
import { Typography } from '@material-ui/core';

// application
import SocialLinks from '../shared/SocialLinks';
import VISA from '../../assets/Visa-Logo.png';
import MASTER from '../../assets/Mastercard-logo.svg.png';
import FPX from '../../assets/fpx-logo.png';

import cimb from '../../assets/cimb.png';
import hlb from '../../assets/hlb.png';
import maybank from '../../assets/maybank.png';
import pbb from '../../assets/publicbank.png';
import rhb from '../../assets/rhb.png';


import ocbc from '../../assets/ocbc.png';
import uob from '../../assets/uob.png';
import bankrakyat from '../../assets/bankrakyat.png';
import bankislam from '../../assets/bankislam.png';

import affinbank from '../../assets/affinbank.png';
import hsbc from '../../assets/hsbc.png';
import ambank from '../../assets/ambank.png';
import citibank from '../../assets/citibank.png';


export default function PaymentFooter() {
    const payment = [
        { paymentID: 1, paymentImg: VISA },
        { paymentID: 2, paymentImg: MASTER },
        { paymentID: 3, paymentImg: FPX },
        { paymentID: 4, paymentImg: rhb },
        { paymentID: 5, paymentImg: affinbank },
        { paymentID: 6, paymentImg: ambank },
        { paymentID: 7, paymentImg: bankrakyat },
        { paymentID: 8, paymentImg: bankislam },
        { paymentID: 9, paymentImg: citibank },
        { paymentID: 10, paymentImg: cimb },
        { paymentID: 11, paymentImg: hlb },
        { paymentID: 12, paymentImg: hsbc },
        { paymentID: 13, paymentImg: maybank },
        { paymentID: 14, paymentImg: pbb },
        { paymentID: 15, paymentImg: ocbc },
        { paymentID: 16, paymentImg: uob },
    ]

    return (
        <div className="site-footer__widget footer-links">
            <Typography variant='caption' style={{fontWeight:"700", color: "#2b535e"}}>PAYMENT</Typography>
            <div className='row' style={{ alignItems: "center" }}>
                {
                    payment.map((x) => {
                        return (
                            <Image width="12%" src={x.paymentImg} style={{padding:"0.5vw"}}/>
                        )
                    })
                }
            </div>
        </div>
    );
}
