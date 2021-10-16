// react
import React from 'react';
import { Image } from 'react-bootstrap';

// application
import SocialLinks from '../shared/SocialLinks';
import VISA from '../../assets/Visa-Logo.png';
import MASTER from '../../assets/Mastercard-logo.svg.png';
import FPX from '../../assets/fpx-logo.png';


export default function PaymentFooter() {
    return (
        <div className="site-footer__widget footer-newsletter">
            <h5 className="footer-newsletter__title">Payment</h5>
            <div className='row'>
                <div className="col-4">
                    <Image width="100%" height="auto" src={VISA} />
                </div>
                <div className="col-4">
                    <Image width="100%" height="auto" src={MASTER} />
                </div>
                <div className="col-4">
                    <Image width="100%" height="auto" src={FPX} />
                </div>
            </div>
        </div>
    );
}
