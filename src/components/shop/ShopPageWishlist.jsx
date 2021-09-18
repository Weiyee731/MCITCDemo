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


// data stubs
import theme from '../../data/theme';
import { browserHistory } from "react-router";

function ShopPageWishlist(props) {
    const { wishlist, cartAddItem, wishlistRemoveItem } = props;
    const breadcrumb = [
        { title: 'Home', url: '' },
        { title: 'Wishlist', url: '' },
    ];

    // const [wishlisting, setWishlist] = useState("");

    // Similar to componentDidMount and componentDidUpdate:
    // useEffect(() => {
    //     props.CallViewProductWishlist({ userID: window.localStorage.getItem("id") })
    // }, [wishlist]);

    const login = () => {
        browserHistory.push("/login");
        window.location.reload(false);
    }
    
    const deleteWishlist = (product) => {
        console.log("item", product)
        props.CallDeleteProductWishlist({
            userID: localStorage.getItem("id"),
            userWishlistID: product.UserWishlistID,
            productName: product.ProductName
        })
    }

    const addCart = (product) => {
        let found = false
        if (props.productcart !== undefined) {
            props.productcart.filter(x => x.ProductID === product.ProductID).map((x) => {
                found = true
                props.CallUpdateProductCart({
                    userID: localStorage.getItem("id"),
                    userCartID: x.UserCartID,
                    productQuantity: parseInt(x.ProductQuantity) + 1,
                    productName: product.ProductName
                })
            })

            if (found === false) {
                props.CallAddProductCart({
                    userID: window.localStorage.getItem("id"),
                    productID: product.ProductID,
                    productQuantity: 1,
                    productVariationDetailID: 1,
                    applyingPromoCode: 0,
                    productName: product.ProductName
                })
            }
        } else
            login()

    }

    let content;
    if (props.wishlist !== undefined && props.wishlist.length) {

        const itemsList = wishlist.map((item) => {
            let image;
            const productImage = JSON.parse(item.ProductImages)
            if (productImage.length > 0) {
                image = (
                    <div className="product-image">
                        <Link to={url.product(item)} className="product-image__body">
                            <img className="product-image__img" src={productImage[0].ProductMediaUrl} alt="" />
                        </Link>

                    </div>
                );
            }

            // const renderAddToCarButton = ({ run, loading }) => {
            //     const classes = classNames('btn btn-primary btn-sm', {
            //         'btn-loading': loading,
            //     });

            //     return <button type="button" onClick={run} className={classes}>Add To Cart</button>;
            // };

            // const renderRemoveButton = ({ run, loading }) => {
            //     const classes = classNames('btn btn-light btn-sm btn-svg-icon', {
            //         'btn-loading': loading,
            //     });

            //     return <button type="button" onClick={run} className={classes} aria-label="Remove"><Cross12Svg /></button>;
            // };

            return (
                <tr key={item.id} className="wishlist__row">
                    <td className="wishlist__column wishlist__column--image">
                        {image}
                    </td>
                    <td className="wishlist__column wishlist__column--product">
                        <Link to={url.product(item)} className="wishlist__product-name">{item.ProductName}</Link>
                        <div className="wishlist__product-rating">
                            <Rating value={item.ProductRating} />
                            <div className="wishlist__product-rating-legend">{`${item.ProductRating} Reviews`}</div>
                        </div>
                    </td>
                    <td className="wishlist__column wishlist__column--stock">
                        <div className="badge badge-success">In Stock</div>
                    </td>
                    <td className="wishlist__column wishlist__column--price"><Currency value={item.ProductSellingPrice} currency={"RM"} /></td>
                    <td className="wishlist__column wishlist__column--tocart">
                        {/* <AsyncAction
                            action={() => cartAddItem(item)
                            }
                            render={renderAddToCarButton}
                        /> */}
                        <button type="button" onClick={() => addCart(item)} className={'btn btn-primary btn-sm'}>Add To Cart</button>
                    </td>
                    <td className="wishlist__column wishlist__column--remove">
                        <button type="button" onClick={() => deleteWishlist(item)} className={'btn btn-light btn-sm btn-svg-icon'} aria-label="Remove"><Cross12Svg /></button>
                        {/* {renderRemoveButton} */}
                        {/* <AsyncAction
                            action={() => wishlistRemoveItem(item.ProductID)}
                            render={renderRemoveButton}
                        /> */}
                    </td>
                </tr>
            );
        });

        content = (
            <div className="block">
                <div className="container">
                    <table className="wishlist">
                        <thead className="wishlist__head">
                            <tr className="wishlist__row">
                                <th className="wishlist__column wishlist__column--image">Image</th>
                                <th className="wishlist__column wishlist__column--product">Product</th>
                                <th className="wishlist__column wishlist__column--stock">Stock Status</th>
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
                        <div className="block-empty__message">Your wish list is empty!</div>
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
    productcart: state.counterReducer.productcart
});

const mapDispatchToProps = (dispatch) => {
    return {
        cartAddItem,
        wishlistRemoveItem,
        // CallViewProductWishlist: (prodData) => dispatch(GitAction.CallViewProductWishlist(prodData)),
        CallDeleteProductWishlist: (prodData) => dispatch(GitAction.CallDeleteProductWishlist(prodData)),
        CallAddProductCart: (prodData) => dispatch(GitAction.CallAddProductCart(prodData)),

    }

};


export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ShopPageWishlist);
