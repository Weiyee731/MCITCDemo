// react
import React, { useState } from "react";

// third-party
import classNames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// application
import AsyncAction from "./AsyncAction";
import Currency from "./Currency";
import Rating from "./Rating";
import { cartAddItem } from "../../store/cart";
import { Compare16Svg, Quickview16Svg, Wishlist16Svg } from "../../svg";
import { compareAddItem } from "../../store/compare";
import { quickviewOpen } from "../../store/quickview";
import { url } from "../../services/utils";
import { mobileMenuOpen } from '../../store/mobile-menu';
import Logo from "../../assets/Emporia.png";

import { Modal } from 'reactstrap';
import Product from './Product';
import { Cross20Svg } from '../../svg';
import { GitAction } from "../../store/action/gitAction";
import { browserHistory } from "react-router";
// import { parseClassName } from "react-toastify/dist/utils";

function MerchantCard(props) {
    const {
        merchant,
        layout,
    } = props;

    const [isQuickViewOpen, setModal] = useState(false)
    const containerClasses = classNames("product-card", {
        "product-card--layout--grid product-card--size--sm": layout === "grid-sm",
        "product-card--layout--grid product-card--size--nl": layout === "grid-nl",
        "product-card--layout--grid product-card--size--lg": layout === "grid-lg",
        "product-card--layout--list": layout === "list",
        "product-card--layout--horizontal": layout === "horizontal",
    });

    const picUrl = "https://myemporia.my/UnimasMarketplaceImage/userprofile/";
    let badges = [];
    let image;
    let price;
    let features;
    let productView;

    if (merchant.UserProfileImage && merchant.UserProfileImage.length > 0) {
        image = (
            <div className="product-card__image product-image">
                <Link to={{ pathname: url.merchant(merchant), state: { id: merchant.UserID, merchantDetails: merchant } }} className="product-image__body">
                    <img
                        className="product-image__img"
                        src={picUrl + merchant.UserProfileImage}
                        onError={(e) => { e.target.onerror = null; e.target.src = Logo }}
                        alt=""
                    />
                </Link>
            </div>
        );
    } else {
        image = (
            <div className="product-card__image product-image">
                <Link to={{ pathname: url.merchant(merchant), state: { id: merchant.UserID, merchantDetails: merchant } }} className="product-image__body">
                    <img
                        className="product-image__img"
                        src={Logo}
                        onError={(e) => { e.target.onerror = null; e.target.src = Logo }}
                        alt=""
                    />
                </Link>
            </div>
        );
    }
    return (

        <div className={containerClasses}>
            {badges}
            {image}
            <div className="product-card__info">
                <div className="product-card__name">
                    <Link to={{ pathname: url.merchant(merchant), state: { id: merchant.UserID, merchantDetails: merchant } }}>
                        {merchant.ShopName}
                    </Link>
                </div>
                <div className="product-card__rating">
                    <Rating value={merchant.ShopRating} />
                    <div className=" product-card__rating-legend">{`${merchant.ShopReviewCount} Reviews`}</div>
                </div>
                {features}
            </div>

            <div className="product-card__actions">
                <div className="product-card__buttons">
                    <Link to={{ pathname: url.merchant(merchant), state: { id: merchant.UserID, merchantDetails: merchant } }}>
                        <button
                            type="button"
                            className={classNames("btn btn-primary product-card__addtocart")}
                        >
                            View Shop
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

MerchantCard.propTypes = {
    /**
     * product object
     */
    merchant: PropTypes.object.isRequired,
    /**
     * product card layout
     * one of ['grid-sm', 'grid-nl', 'grid-lg', 'list', 'horizontal']
     */
    layout: PropTypes.oneOf([
        "grid-sm",
        "grid-nl",
        "grid-lg",
        "list",
        "horizontal",
    ]),
};


const mapStateToProps = (state) => ({


});

const mapDispatchToProps = (dispatch) => {
    return {

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MerchantCard);
