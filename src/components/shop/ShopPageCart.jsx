// react
import React, { Component } from 'react';

// third-party
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { browserHistory } from "react-router";

// application
import AsyncAction from '../shared/AsyncAction';
import Currency from '../shared/Currency';
import InputNumber from '../shared/InputNumber';
import PageHeader from '../shared/PageHeader';
import { cartRemoveItem, cartUpdateQuantities, cartAddItem } from '../../store/cart';
import { Cross12Svg } from '../../svg';
import { url } from '../../services/utils';
import Logo from "../../assets/Emporia.png"
import { Button } from "@material-ui/core";
import shopApi from "../../api/shop";
// import { cartAddItem } from "../../store/cart";

// data stubs
import theme from '../../data/theme';

class ShopPageCart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            /** example: [{itemId: 8, value: 1}] */
            quantities: [],
        };
    }

    getItemQuantity(item) {
        var { quantities } = this.state;
        var quantity = quantities.find((x) => x.itemId === item.id);

        return quantity ? quantity.value : item.quantity;
    }

    handleChangeQuantity = (item, quantity) => {
        this.setState((state) => {
            const stateQuantity = state.quantities.find((x) => x.itemId === item.id);

            if (!stateQuantity) {
                state.quantities.push({ itemId: item.id, value: quantity });
            } else {
                stateQuantity.value = quantity;
            }

            return {
                quantities: state.quantities,
            };
        });

    };

    cartNeedUpdate() {
        const { quantities } = this.state;
        const { cart } = this.props;

        return quantities.filter((x) => {
            const item = cart.items.find((item) => item.id === x.itemId);

            return item && item.quantity !== x.value && x.value !== '';
        }).length > 0;
    }

    CheckOutOnClick = (items) => {

        if (localStorage.getItem("id")) {
            console.log("CHECKOUT")
            let ProductIDs = [];
            let ProductQuantity = [];
            items.map((row) => {
                ProductIDs.push(row.product.ProductID);
                ProductQuantity.push(row.quantity);
            });
            shopApi
                .addOrder({
                    UserID: localStorage.getItem("id"),
                    Products: ProductIDs,
                    ProductQuantity: ProductQuantity,
                })
                .then((json) => {
                    browserHistory.push("/shop/checkout?order=" + json[0].OrderID);
                    window.location.reload(false);
                });
        }
        else {
            browserHistory.push("/login");
            window.location.reload(false);
        }

    };

    renderItems() {
        const { cart, cartRemoveItem, cartAddItem, cartUpdateQuantities } = this.props;
        return cart.items.map((item) => {
            let image;
            let options = [];

            const productImage = JSON.parse(item.product.ProductImages)

            if (productImage.length > 0) {
                image = (
                    <div className="product-image">
                        <Link to={url.product(item.product)} className="product-image__body">
                            <img className="product-image__img" src={productImage[0].ProductMediaUrl} alt="" onError={(e) => { e.target.onerror = null; e.target.src = Logo }} />
                        </Link>
                    </div>
                );
            }

            if (item.options.length > 0) {
                options = (
                    <ul className="cart-table__options">
                        {item.options.map((option, index) => (
                            <li key={index}>{`${option.optionTitle}: ${option.valueTitle}`}</li>
                        ))}
                    </ul>
                );
            }

            const removeButton = (
                <AsyncAction
                    action={() => cartRemoveItem(item.id)}
                    render={({ run, loading }) => {
                        const classes = classNames('btn btn-light btn-sm btn-svg-icon', {
                            'btn-loading': loading,
                        });

                        return (
                            <button type="button" onClick={run} className={classes}>
                                <Cross12Svg />
                            </button>
                        );
                    }}
                />
            );



            return (
                <tr key={item.id} className="cart-table__row">
                    <td className="cart-table__column cart-table__column--image">
                        {image}
                    </td>
                    <td className="cart-table__column cart-table__column--product">
                        <Link to={url.product(item.product)} className="cart-table__product-name">
                            {item.product.ProductName}
                        </Link>
                        {options}
                    </td>
                    <td className="cart-table__column cart-table__column--price" data-title="Price">
                        <Currency value={item.product.ProductSellingPrice} currency={"RM"} />
                    </td>
                    <td className="cart-table__column cart-table__column--quantity" data-title="Quantity">
                        <InputNumber
                            onChange={(quantity) => this.handleChangeQuantity(item, quantity)}
                            value={this.getItemQuantity(item)}
                            min={1}
                        />
                    </td>
                    <td className="cart-table__column cart-table__column--total" data-title="Total">
                        {
                            this.state.quantities.length > 0 ?
                                this.state.quantities.filter(x => x.itemId === item.id).length > 0 ?
                                    this.state.quantities.filter(x => x.itemId === item.id).map((x) => {
                                        cartUpdateQuantities(this.state.quantities)
                                        return (
                                            <>
                                                <Currency value={item.product.ProductSellingPrice * x.value} currency={"RM"} />
                                            </>
                                        )
                                    })
                                    :
                                    <Currency value={item.product.ProductSellingPrice * item.quantity} currency={"RM"} />
                                :
                                <Currency value={item.product.ProductSellingPrice * item.quantity} currency={"RM"} />
                        }
                    </td>
                    <td className="cart-table__column cart-table__column--remove">
                        {removeButton}
                    </td>
                </tr>
            );
        });
    }

    renderTotals() {
        const { cart } = this.props;

        if (cart.extraLines.length <= 0) {
            return null;
        }

        const extraLines = cart.extraLines.map((extraLine, index) => {
            let calcShippingLink;

            if (extraLine.type === 'shipping') {
                calcShippingLink = <div className="cart__calc-shipping"><Link to="/">Calculate Shipping</Link></div>;
            }

            return (
                <tr key={index}>
                    <th>{extraLine.title}</th>
                    <td>
                        {calcShippingLink}
                    </td>
                </tr>
            );
        });

        return (
            <React.Fragment>
                <thead className="cart__totals-header">
                    <tr>
                        <th style={{ textAlign: "right" }}>Subtotal</th>
                    </tr>
                </thead>
                <tbody className="cart__totals-body">
                    {extraLines}
                </tbody>
            </React.Fragment>
        );
    }

    renderCart() {
        const { cart, cartUpdateQuantities } = this.props;
        const { quantities } = this.state;

        const updateCartButton = (
            <AsyncAction
                action={() => cartUpdateQuantities(quantities)}
                render={({ run, loading }) => {
                    const classes = classNames('btn btn-primary cart__update-button', {
                        'btn-loading': loading,
                    });

                    return (
                        <button type="button" onClick={run} className={classes} disabled={!this.cartNeedUpdate()}>
                            Update Cart
                        </button>
                    );
                }}
            />
        );

        return (
            <div className="cart block container_" style={{ width: "100%", marginTop: "130px" }}>
                <div className="container">
                    <table className="cart__table cart-table">
                        <thead className="cart-table__head">
                            <tr className="cart-table__row">
                                <th className="cart-table__column cart-table__column--image">Image</th>
                                <th className="cart-table__column cart-table__column--product">Product</th>
                                <th className="cart-table__column cart-table__column--price">Price</th>
                                <th className="cart-table__column cart-table__column--quantity">Quantity</th>
                                <th className="cart-table__column cart-table__column--total">Total</th>
                                <th className="cart-table__column cart-table__column--remove" aria-label="Remove" />
                            </tr>
                        </thead>
                        <tbody className="cart-table__body">
                            {this.renderItems()}

                        </tbody>


                    </table>
                    {
                        this.props.history !== undefined ?
                            <div style={{ textAlign: "right", padding: "30px 30px",backgroundColor:"white"}}>
                                
                                <div className="row">
                                    <div className="col-10" style={{ fontWeight: "bold" }}>  Subtotal </div>
                                    <div className="col-2" ><Currency value={this.props.cart.subtotal}></Currency></div>
                                </div>
                                <div className="row">
                                    <div className="col-10" style={{ fontWeight: "bold" }}>  Shipping </div>
                                    <div className="col-2" ><Currency value={this.props.cart.extraLines[0].price}></Currency></div>
                                </div>
                                <div className="row">
                                    <div className="col-10" style={{ fontWeight: "bold" }}>  Tax </div>
                                    <div className="col-2" ><Currency value={this.props.cart.extraLines[1].price}></Currency></div>
                                </div>
                                <div className="row">
                                    <div className="col-10" style={{ fontWeight: "bold" }}>  Total </div>
                                    <div className="col-2" ><Currency value={this.props.cart.total}></Currency></div>
                                </div>
                                <div className="mt-5">
                                        <Link className="btn btn-primary" variant="outlined" color="primary"
                                            onClick={this.CheckOutOnClick.bind(this, this.props.cart.items)}
                                        > Checkout
                                        </Link>
                                </div>
                            </div>
                            :
                            ""
                    }

                    {/* <div className="cart__actions">
                        <form className="cart__coupon-form">
                            <label htmlFor="input-coupon-code" className="sr-only">Password</label>
                            <input type="text" className="form-control" id="input-coupon-code" placeholder="Coupon Code" />
                            <button type="submit" className="btn btn-primary">Apply Coupon</button>
                        </form>
                        <div className="cart__buttons">
                            <Link to="/" className="btn btn-light">Continue Shopping</Link>
                            {updateCartButton}
                        </div>
                    </div> */}


                </div>
            </div>
        );
    }

    render() {

        const { cart } = this.props;
        const breadcrumb = [
            { title: 'Home', url: '' },
            { title: 'Shopping Cart', url: '' },
        ];

        let content;

        if (cart.quantity) {
            content = this.renderCart();
            console.log("hihi")
        } else {
            content = (
                <div className="block block-empty" style={{marginTop:"130px"}}>
                    <div className="container">
                        <div className="block-empty__body">
                            <div className="block-empty__message">Your shopping cart is empty!</div>
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
                {/* <Helmet>
                    <title>{`Shopping Cart — ${theme.name}`}</title>
                </Helmet>

                <PageHeader header="Shopping Cart" breadcrumb={breadcrumb} /> */}

                {content}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    cart: state.cart,
});

const mapDispatchToProps = {
    cartRemoveItem,
    cartUpdateQuantities,
    cartAddItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopPageCart);
