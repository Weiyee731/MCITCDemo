// react
import React from 'react';

// third-party
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Logo from "../../assets/Emporia.png";

// application
import AsyncAction from '../shared/AsyncAction';
import Currency from '../shared/Currency';
import { Cart16Svg } from '../../svg';
import { cartAddItem } from '../../store/cart';
import { url } from '../../services/utils';
import { GitAction } from "../../store/action/gitAction";
import { browserHistory } from "react-router";

function Suggestions(props) {
    const {
        context,
        className,
        products,
    } = props;

    const login = () => {
        browserHistory.push("/login");
        window.location.reload(false);
    }

    const handleCart = (product) => {
        let found = false
        if (props.productcart !== undefined) {
            props.productcart.filter(x => x.ProductID === product.data.ProductID).map((x) => {
                found = true
                props.CallUpdateProductCart({
                    userID: localStorage.getItem("id"),
                    userCartID: x.UserCartID,
                    productQuantity: parseInt(x.ProductQuantity) + 1,
                    productName: product.data.ProductName
                })
            })

            if (found === false) {
                props.CallAddProductCart({
                    userID: window.localStorage.getItem("id"),
                    productID: product.data.ProductID,
                    productQuantity: 1,
                    productVariationDetailID: product.variation.ProductVariationDetailID,
                    applyingPromoCode: 0,
                    productName: product.data.ProductName
                })
            }
        }

    }
    const rootClasses = classNames(`suggestions suggestions--location--${context}`, className);

    const list = (products && products.map((product) => {
        let images = product.data.ProductImage
        return (

            <li key={product.data.ProductID} className="suggestions__item">
                {images && images.length > 0 && (
                    <div className="suggestions__item-image product-image">
                        <div className="product-image__body">
                            <img className="product-image__img" alt="" src={images ? images : Logo} onError={e => (e.target.src = Logo)} />
                        </div>
                    </div>
                )}
                <div className="suggestions__item-info">
                    <Link className="suggestions__item-name" to={url.product(product.data)}>
                        {product.data.ProductName}
                    </Link>
                    <div className="suggestions__item-meta">Merchant: {product.data.MerchantShopName}</div>
                    <div className="suggestions__item-meta">Variation: {product.variation.ProductVariationValue}</div>
                    {/* <div className="suggestions__item-meta">SKU: 83690/32</div> */}
                </div>
                <div className="suggestions__item-price" style={{margin:"auto"}}>
                    <Currency value={product.variation.ProductVariationPrice} />
                </div>
                {context === 'header' && (
                    <div className="suggestions__item-actions">
                        <button
                            type="button"
                            onClick={() => localStorage.getItem("id") ? handleCart(product) : login()}
                            className={classNames("btn btn-primary btn-sm btn-svg-icon")}
                        >
                            <Cart16Svg />
                        </button>
                        {/* 
                        <AsyncAction
                            action={() => cartAddItem(product)}
                            render={({ run, loading }) => (
                                <button
                                    type="button"
                                    onClick={run}
                                    title="Add to cart"
                                    className={classNames('btn btn-primary btn-sm btn-svg-icon', {
                                        'btn-loading': loading,
                                    })}
                                >
                                    <Cart16Svg />
                                </button>
                            )}
                        /> */}
                    </div>
                )}
            </li>
        )
    }
    ));

    return (
        <div className={rootClasses} style={{top:"50px", padding:"10px", marginLeft:"10px"}}>
            <ul className="suggestions__list">
                {list}
            </ul>
        </div>
    );
}

const mapStateToProps = (state) => ({
    productcart: state.counterReducer.productcart,
});

const mapDispatchToProps = (dispatch) => {
    return {
        CallAddProductCart: (prodData) => dispatch(GitAction.CallAddProductCart(prodData)),
        CallUpdateProductCart: (prodData) => dispatch(GitAction.CallUpdateProductCart(prodData)),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Suggestions);
