// react
import React from 'react';
import { Image } from 'react-bootstrap';

// application
import SocialLinks from '../shared/SocialLinks';
import JNT from '../../assets/J&TExpress.jpg';


export default function LogisticsFooter() {
    return (
        <div className="site-footer__widget footer-links">
            <h5>Logistics</h5>
            <div className='row'>
                <div className="col-4">
                    <Image width="100%" height="auto" src={JNT} />
                </div>
            </div>
        </div>
    );
}
