// react
import React from 'react';

// third-party
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';

export default function FooterLinks(props) {
    const { title, items } = props;

    const linksList = items.map((item, index) => (
        <li key={index} className="footer-links__item">
            <Link to={item.url} className="footer-links__link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                {item.title}
            </Link>
        </li>
    ));

    return (
        <div className="site-footer__widget footer-links">
            <h6 className="footer-links__title">{title}</h6>
            <ul className="footer-links__list" >
                <Typography variant='body1'>{linksList}</Typography>
            </ul>
        </div>
    );
}

FooterLinks.propTypes = {
    /** widget title */
    title: PropTypes.node.isRequired,
    /** array of links */
    items: PropTypes.array,
};

FooterLinks.defaultProps = {
    items: [],
};
