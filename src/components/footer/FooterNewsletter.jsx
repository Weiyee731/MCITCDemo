// react
import { Typography } from '@material-ui/core';
import React from 'react';

// application
import SocialLinks from '../shared/SocialLinks';

export default function FooterNewsletter() {
    return (
        <div className="site-footer__widget footer-links">
            <h6 className='footer-links__title'>SOCIAL NETWORKS</h6>
            {/* <h5>Newsletter</h5> */}
            {/* <div className="footer-newsletter__text">
                Sign up our newsletter to get the shocking deals and latest news!!
            </div>

            <form action="" className="footer-newsletter__form">
                <label className="sr-only" htmlFor="footer-newsletter-address">Email Address</label>
                <input
                    type="text"
                    className="footer-newsletter__form-input form-control"
                    id="footer-newsletter-address"
                    placeholder="Email Address..."
                />
                <button className="footer-newsletter__form-button btn btn-primary">Subscribe</button>
            </form> */}

            <div className="footer-newsletter__text footer-newsletter__text--social" style={{color:"#2b535e"}}>
                <Typography variant='body1'>Follow us on social networks</Typography>
            </div>

            <SocialLinks className="footer-newsletter__social-links" shape="circle" />
        </div>
    );
}
