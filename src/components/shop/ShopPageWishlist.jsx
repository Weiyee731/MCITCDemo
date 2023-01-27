// react
import React, { useState, useEffect, useRef } from 'react';

// third-party
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

// application
import AsyncAction from '../shared/AsyncAction';
import Currency from '../shared/Currency';
import PageHeader from '../shared/PageHeader';
import Rating from '../shared/Rating';
import { cartAddItem } from '../../store/cart';
import { Cross12Svg } from '../../svg';
import { url } from '../../services/utils';
import { wishlistRemoveItem } from '../../store/wishlist';
import { GitAction } from "../../store/action/gitAction";
import Logo from "../../assets/Emporia.png";
import { isStringNullOrEmpty } from "../../Utilities/UtilRepo"
import { toast } from "react-toastify";

// data stubs
import theme from '../../data/theme';
import { browserHistory } from "react-router";

function ShopPageWishlist(props) {
    const { wishlist, cartAddItem, wishlistRemoveItem } = props;
    // const [loginPopOut, setloginPopOut] = useState;
    const breadcrumb = [
        { title: 'Home', url: '' },
        { title: 'Wishlist', url: '' },
    ];

    useEffect(() => {
        if (localStorage.getItem("isLogin") === "true" && localStorage.getItem("id") !== undefined) {
            props.CallViewProductWishlist({
                userID: localStorage.getItem("id")
            })
        }
    }, [])

    // const login = () => {
    //     setloginPopOut(true)
    // }

    const deleteWishlist = (product) => {
        props.CallDeleteProductWishlist({
            userID: localStorage.getItem("id"),
            userWishlistID: product.UserWishlistID,
            productName: product.ProductName
        })
    }

    useEffect(() => {
        if (props.deletewishlist !== undefined && props.deletewishlist.length > 0) {
            toast.success("Successfully Deleted Wishlist, you can continue enjoy your shopping")
            setTimeout(() => {
                window.location.reload(true);
            }, 3000)
        }
    }, [props.deletewishlist])

    // const addCart = (product) => {
    //     let found = false
    //     if (props.productcart !== undefined) {
    //         props.productcart.filter(x => x.ProductID === product.ProductID).map((x) => {
    //             found = true
    //             props.CallUpdateProductCart({
    //                 userID: localStorage.getItem("id"),
    //                 userCartID: x.UserCartID,
    //                 productQuantity: parseInt(x.ProductQuantity) + 1,
    //                 productName: product.ProductName
    //             })
    //         })

    //         if (found === false) {
    //             props.CallAddProductCart({
    //                 userID: window.localStorage.getItem("id"),
    //                 productID: product.ProductID,
    //                 productQuantity: 1,
    //                 productVariationDetailID: 1,
    //                 applyingPromoCode: 0,
    //                 productName: product.ProductName
    //             })
    //         }
    //     } else
    //         login()
    // }

    let content;

    if (props.wishlist.length > 0 && props.wishlist[0].DelInd !== 1 && props.wishlist[0].UserWishlistID !== 0) {
        const itemsList = wishlist.map((item) => {
            if (item.DelInd === 0) {
                let image;
                if (item.ProductImage !== null && item.ProductImage !== undefined && item.ProductImage.length > 0) {
                    image = (
                        <div className="product-image">
                            <Link to={url.product(item)} className="product-image__body">
                                <img className="product-image__img" src={item.ProductImage !== null ? item.ProductImage : Logo} alt="MyEmporia" onError={(e) => { e.target.onerror = null; e.target.src = Logo }} />
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
                    <tr key={item.id} className="wishlist__row">
                        <td className="wishlist__column wishlist__column--image">
                            {image}
                        </td>
                        <td className="wishlist__column wishlist__column--product">
                            <Link to={url.product(item)} className="wishlist__product-name">{item.ProductName}</Link>
                            <div className="wishlist__product-rating">
                                <Rating value={item.ProductRating} />

                                <div className="wishlist__product-rating-legend">{item.ProductRating !== null ? parseFloat(item.ProductRating).toFixed(1) + "/5.0" : "0.0/5.0"}</div>
                            </div>
                        </td>
                        <td className="wishlist__column wishlist__column--stock">
                            <div className="badge badge-success">{isStringNullOrEmpty(item.Brand) ? "No Brand" : item.Brand}</div>
                        </td>
                        <td className="wishlist__column wishlist__column--price"><Currency value={item.ProductPrice !== null ? item.ProductPrice : 0} currency={"RM"} /></td>
                        <td className="wishlist__column wishlist__column--tocart">
                            <Link to={url.product(item)} className="wishlist__product-name"><button className={'btn btn-primary btn-sm'} style={{ borderRadius: "5px" }}>View Product</button></Link>
                        </td>
                        <td className="wishlist__column wishlist__column--remove">
                            <button type="button" onClick={() => deleteWishlist(item)} className={'btn btn-light btn-sm btn-svg-icon'} aria-label="Remove"><Cross12Svg /></button>

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
                                <th className="wishlist__column wishlist__column--product">Product</th>
                                <th className="wishlist__column wishlist__column--stock">Brand</th>
                                <th className="wishlist__column wishlist__column--price">Price</th>
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
    // wishlist: state.wishlist,
    wishlist: state.counterReducer.wishlist,
    deletewishlist: state.counterReducer.deletewishlist,
    // productcart: state.counterReducer.productcart
});

const mapDispatchToProps = (dispatch) => {
    return {
        // CallUpdateProductCart: (prodData) => dispatch(GitAction.CallUpdateProductCart(prodData)),
        CallDeleteProductWishlist: (prodData) => dispatch(GitAction.CallDeleteProductWishlist(prodData)),
        CallViewProductWishlist: (prodData) => dispatch(GitAction.CallViewProductWishlist(prodData)),
        // CallAddProductCart: (prodData) => dispatch(GitAction.CallAddProductCart(prodData)),
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ShopPageWishlist);
