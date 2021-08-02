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

function Suggestions(props) {
    const {
        context,
        className,
        products,
        cartAddItem,
    } = props;

    const rootClasses = classNames(`suggestions suggestions--location--${context}`, className);

    const list = (products && products.map((product) => {
        let images = JSON.parse(product.ProductImages)
        return (
          
            <li key={product.ProductID} className="suggestions__item">
                {images && images.length > 0 && (
                    <div className="suggestions__item-image product-image">
                        <div className="product-image__body">
                        <img  className="product-image__img" alt="" src={images[0].ProductMediaUrl ? images[0].ProductMediaUrl : Logo} onError={e => (e.target.src = Logo)} />
                                    
                            {/* <img className="product-image__img" src={images[0].ProductMediaUrl} alt={images[0].ProductMediaDesc} /> */}
                        </div>
                    </div>
                )}
                <div className="suggestions__item-info">
                    <Link className="suggestions__item-name" to={url.product(product)}>
                        {product.ProductName}
                    </Link>
                    <div className="suggestions__item-meta">SKU: 83690/32</div>
                </div>
                <div className="suggestions__item-price">
                    <Currency value={product.ProductSellingPrice} />
                </div>
                {context === 'header' && (
                    <div className="suggestions__item-actions">
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
                        />
                    </div>
                )}
            </li>
        )
    }
    ));

    return (
        <div className={rootClasses}>
            <ul className="suggestions__list">
                {list}
            </ul>
        </div>
    );
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {
    cartAddItem,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Suggestions);
