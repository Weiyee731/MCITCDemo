// react
import React from 'react';
import { Image } from 'react-bootstrap';

// application
import SocialLinks from '../shared/SocialLinks';
import JNT from '../../assets/J&TExpress.jpg';
import CityLink from '../../assets/citylink.png';
import { Typography } from '@material-ui/core';


export default function LogisticsFooter() {
    return (
        <div className="site-footer__widget footer-links">
            <Typography variant='caption' style={{fontWeight:"700", color: "#2b535e"}}>LOGISTICS</Typography>
            <div className='row'>
                <Image width="25%" src={CityLink} style={{padding:"0.5vw"}} />
            </div>
        </div>
    );
}
