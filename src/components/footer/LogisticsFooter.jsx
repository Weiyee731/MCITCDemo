// react
import React from 'react';
import { Image } from 'react-bootstrap';

// application
import SocialLinks from '../shared/SocialLinks';
import JNT from '../../assets/J&TExpress.jpg';
import CityLink from '../../assets/citylink.png';


export default function LogisticsFooter() {
    return (
        <div className="site-footer__widget footer-links">
            <h5 style={{ fontFamily: "Helvetica" }}>Logistics</h5>
            <div className='row'>
                <div className="col-4">
                    <Image width="100%" height="auto" src={CityLink} />
                </div>
            </div>
        </div>
    );
}
