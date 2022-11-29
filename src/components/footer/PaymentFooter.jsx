// react
import React from 'react';
import { Image } from 'react-bootstrap';

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
    return (
        <div className="site-footer__widget footer-links">
            <h5 style={{ fontFamily: "Helvetica" }}>Payment</h5>
            <div className='row' style={{ alignItems: "center" }}>
                <div className="col-3">
                    <Image width="100%" height="auto" src={VISA} />
                </div>
                <div className="col-3">
                    <Image width="90%" height="auto" src={MASTER} />
                </div>
                <div className="col-3">
                    <Image width="100%" height="auto" src={FPX} />
                </div>
                <div className="col-3">
                    <Image width="100%" height="auto" src={rhb} />
                </div>
            </div>

            <div className='row' style={{ alignItems: "center", paddingTop: "10pt" }}>
                <div className="col-3">
                    <Image width="100%" height="auto" src={affinbank} />
                </div>
                <div className="col-3">
                    <Image width="100%" height="auto" src={ambank} />
                </div>
                <div className="col-3">
                    <Image width="100%" height="auto" src={bankrakyat} />
                </div>
                <div className="col-3">
                    <Image width="100%" height="auto" src={bankislam} />
                </div>
            </div>

            <div className='row' style={{ alignItems: "center" }}>
                <div className="col-3">
                    <Image width="100%" height="auto" src={citibank} />
                </div>
                <div className="col-3">
                    <Image width="100%" height="auto" src={cimb} />
                </div>
                <div className="col-3">
                    <Image width="100%" height="auto" src={hlb} />
                </div>
                <div className="col-3">
                    <Image width="100%" height="auto" src={hsbc} />
                </div>
            </div>
            <div className='row' style={{ alignItems: "center" }}>
                <div className="col-3">
                    <Image width="100%" height="auto" src={maybank} />
                </div>
                <div className="col-3">
                    <Image width="100%" height="auto" src={pbb} />
                </div>

                <div className="col-3">
                    <Image width="100%" height="auto" src={ocbc} />
                </div>
                <div className="col-3">
                    <Image width="100%" height="auto" src={uob} />
                </div>

            </div>

        </div>
    );
}
