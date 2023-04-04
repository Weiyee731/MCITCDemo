// react
import React, { useState, useEffect, useRef } from 'react';

// third-party
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

// application
import AsyncAction from '../AsyncAction';
import Currency from '../../shared/Currency';
import PageHeader from '../PageHeader';
import Rating from '../../shared/Rating';
import { Cart16Svg } from '../../../svg';
import { Cross12Svg } from '../../../svg';
import { url } from '../../../services/utils';
import { wishlistRemoveItem } from '../../../store/wishlist';
import { GitAction } from "../../../store/action/gitAction";
import Logo from "../../../assets/Emporia.png";
import { isStringNullOrEmpty } from "../../../Utilities/UtilRepo"
import { toast } from "react-toastify";

// data stubs
import theme from '../../../data/theme';
import { Typography } from '@mui/material';

function Hotel_WishList(props) {
    const { wishlist} = props;

    const breadcrumb = [
        { title: 'Home', url: '' },
        { title: 'Wishlist', url: '' },
    ];

    useEffect(() => {
       
    }, [])

   
    // useEffect(() => {
    //     if (props.deletewishlist !== undefined && props.deletewishlist.length > 0) {
    //         toast.success("Successfully Deleted Wishlist, you can continue enjoy your shopping")
    //         setTimeout(() => {
    //             window.location.reload(true);
    //         }, 3000)
    //     }
    // }, [props.deletewishlist])

    const bookmark_Hotel = [
        {
          HotelWish_ID: 12,
          HotelID: 0,
          HotelImage: 'https://media-cdn.tripadvisor.com/media/photo-s/12/a9/df/17/hilton-night-view-from.jpg',
          HotelName:'Hilton',
          StartPrice: 180.00,
          HotelRating: 4.0,
          HotelState: 'Kuching',
          ProductPromotion: null,
          DellInd: 0,
        },
        {
          HotelWish_ID: 1,
          HotelID: 1,
          HotelImage: 'https://pix10.agoda.net/hotelImages/44583/-1/8742bb65e5a6b3f370d3e94212bb8a76.jpg?ca=23&ce=0&s=1024x768',
          HotelName:'Grand Magherita',
          StartPrice: 185.00,
          HotelRating: 4.1,
          HotelState: 'Kota Samarahan',
          ProductPromotion: null,
          DellInd: 0,
        },
        {
          HotelWish_ID: 2,
          HotelID: 2,
          HotelImage: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/124344871.jpg?k=82daced0f7392440064c6ec25622e0d0154f02c62a2c885d96103c320273befe&o=&hp=1',
          HotelName:'Tune Hotel',
          StartPrice: 90.00,
          HotelRating: 3.9,
          HotelState: 'Kuching',
          ProductPromotion: null,
          DellInd: 0
        }, 
       
      ]
    
    
    let content;

    if (bookmark_Hotel.length > 0) {
        let itemsList = bookmark_Hotel.map((item,ind) => {
            
            if (item.DellInd === 0) {
                let image;
        
                if (item.HotelImage !== null && item.HotelImage !== undefined && item.HotelImage.length > 0) {
                    image = (
                        <div className="product-image">
                            <Link to={url.product(item)} className="product-image__body">
                                <img className="product-image__img" src={item.HotelImage !== null ? item.HotelImage : Logo} alt="MyEmporia" onError={(e) => { e.target.onerror = null; e.target.src = Logo }} />
                            </Link>
                        </div>
                    );
                } else {
                    image = (
                        <div className="product-image">
                            <Link to={url.product(item)} className="product-image__body">
                                <img className="product-image__img" src={Logo} alt="MyEmporia" onError={(e) => { e.target.onerror = null; e.target.src = Logo }} />
                            </Link>
                        </div>
                    );
                }

                return (
                    <tr key={ind} className="wishlist__row">
                        <td className="wishlist__column wishlist__column--image">
                            {image}
                        </td>
                        <td className="wishlist__column wishlist__column--product">
                            <Link to={url.product(item)} className="wishlist__product-name">{item.HotelName}</Link>
                            <div className="wishlist__product-rating">
                                <Rating value={item.HotelRating} />

                                <div className="wishlist__product-rating-legend">{item.HotelRating !== null ? parseFloat(item.HotelRating).toFixed(1) + "/5.0" : "0.0/5.0"}</div>
                            </div>
                        </td>
                        <td className="wishlist__column wishlist__column--stock">
                            <div className="wishlist__product-name">{isStringNullOrEmpty(item.HotelName) ? "To be known" : item.HotelName}</div>
                        </td>
                        <td className="wishlist__column wishlist__column--price"><Currency value={item.StartPrice !== null ? parseFloat(item.StartPrice) : 0} currency={"RM"} /></td>
                        <td className="wishlist__column wishlist__column--tocart">
                            <Link to={url.product(item)} className="wishlist__product-name"><button className={'btn btn-primary btn-sm'} style={{ borderRadius: "5px" }}>View Hotel</button></Link>
                        </td>
                        <td className="wishlist__column wishlist__column--remove">
                            <button type="button" 
                                // onClick={() => deleteWishlist(item)} 
                                className={'btn btn-light btn-sm btn-svg-icon'} aria-label="Remove"><Cross12Svg /></button>

                        </td>
                    </tr>
                );
            }

        });

        content = (
            <div className="block">
                <div className="container">
                    <table className="wishlist">
                        <thead className="wishlist__head">
                            <tr className="wishlist__row">
                                <th className="wishlist__column wishlist__column--image">Image</th>
                                <th className="wishlist__column wishlist__column--product">Hotel Rating</th>
                                <th className="wishlist__column wishlist__column--stock">Hotel Name</th>
                                <th className="wishlist__column wishlist__column--price">Start Price</th>
                                <th className="wishlist__column wishlist__column--tocart" aria-label="Add to cart" />
                                <th className="wishlist__column wishlist__column--remove" aria-label="Remove" />
                            </tr>
                        </thead>
                        <tbody className="wishlist__body">
                            {itemsList}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    } else {
        content = (
            <div className="block block-empty">
                <div className="container">
                    <div className="block-empty__body">
                        <div className="block-empty__message">Your wishlist is empty!</div>
                        <div className="block-empty__actions">
                            <Link to="/" className="btn btn-primary btn-sm">Continue</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <React.Fragment>
            <Helmet>
                <title>{`Wish List — ${theme.name}`}</title>
            </Helmet>

            <PageHeader header="Wishlist" breadcrumb={breadcrumb} />

            {content}
       
        </React.Fragment>
    );
}

const mapStateToProps = (state) => ({

    wishlist: state.counterReducer.wishlist,
    deletewishlist: state.counterReducer.deletewishlist,

});

const mapDispatchToProps = (dispatch) => {
    return {

    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Hotel_WishList);
