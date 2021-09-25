// react
import React, { Component } from 'react';

// third-party
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { browserHistory } from "react-router";
import { GitAction } from "../../store/action/gitAction";

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


// data stubs
import theme from '../../data/theme';
import { toast } from 'react-toastify';

class ShopPageCart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            /** example: [{itemId: 8, value: 1}] */
            quantities: [],
            SKUlimit: false,
            overSKULimitID: [],
            cart: [],
            subtotal: 0,
            total: 0,
            shipping: 25,
            tax: 0,
            setDetails: false,
            selectedIndex: ""
        };
        this.setDetails = this.setDetails.bind(this)
        this.removeItem = this.removeItem.bind(this)
    }

    getItemQuantity(item) {

        var { quantities } = this.state;
        var quantity = quantities.find((x) => x.itemId === item.id);

        return quantity ? quantity.value : item.quantity;
    }

    setDetails(productcart) {
        productcart.map((x) => {
            this.state.cart.push(
                {
                    id: x.UserCartID,
                    product: x,
                    options: [],
                    price: x.ProductSellingPrice,
                    total: x.ProductQuantity * x.ProductSellingPrice,
                    quantity: x.ProductQuantity
                }
            )
        })
        this.setState({ subtotal: this.state.cart.reduce((subtotal, item) => subtotal + item.total, 0) })
        this.setState({ total: this.state.cart.reduce((subtotal, item) => subtotal + item.total, 0) + this.state.shipping })
    }

    componentDidMount() {
        if (this.props.productcart !== undefined) {
            this.setDetails(this.props.productcart)
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.productcart !== this.props.productcart) {
            if (this.props.productcart.length > 0) {
                this.state.cart.map((x, index) => {
                    this.state.cart.splice(0, this.state.cart.length)
                })
                this.setDetails(this.props.productcart)
            }

        }
    }

    removeItem(product) {
        this.props.CallDeleteProductCart({ userCartID: product.UserCartID, userID: localStorage.getItem("id"), productName: product.ProductName })
    }

    handleChangeQuantity = (item, quantity) => {
        this.props.CallUpdateProductCart({
            userID: localStorage.getItem("id"),
            userCartID: item.product.UserCartID,
            productQuantity: quantity,
            productName: item.product.ProductName
        })
        this.setState({ selectedIndex: item.id })

    };

    CheckOutOnClick = (items) => {

        if (localStorage.getItem("id")) {
            let ProductIDs = [];
            let ProductQuantity = [];
            let checkSKU = [];
            let overSKUlimit = false
            items.map((row) => {

                if (row.product.SKU < row.quantity) {
                    checkSKU.push(row.product.ProductID)
                }

                if (checkSKU.length > 0) {
                    this.setState({ SKUlimit: true, overSKULimitID: checkSKU })
                    overSKUlimit = true
                }
                else {
                    ProductIDs.push(row.product.ProductID);
                    ProductQuantity.push(row.quantity);
                }
            });

            if (overSKUlimit !== true) {
                shopApi
                    .addOrder({
                        UserID: localStorage.getItem("id"),
                        Products: ProductIDs,
                        ProductQuantity: ProductQuantity,
                    })
                    .then((json) => {
                        browserHistory.push("/Emporia/shop/checkout?order=" + json[0].OrderID);
                        window.location.reload(false);
                    });
            }
        }
        else {
            browserHistory.push("/Emporia/login");
            window.location.reload(false);
        }
    };

    renderItems() {
        
        return this.state.cart.map((item) => {
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
                        {
                            this.state.overSKULimitID.length > 0 ?
                                this.state.overSKULimitID.filter(x => x === item.product.ProductID).length > 0 ?
                                    this.state.overSKULimitID.filter(x => x === item.product.ProductID).map((x) => {
                                        return (
                                            <>
                                                <br></br>
                                                <label style={{ color: "red" }}> Over Stock Limit,  Available Stock: {item.product.SKU} </label>
                                            </>
                                        )
                                    })
                                    : ""
                                : ""
                        }
                    </td>

                    <td className="cart-table__column cart-table__column--price" data-title="Price">
                        <Currency value={item.product.ProductSellingPrice} currency={"RM"} />
                    </td>
                    <td className="cart-table__column cart-table__column--quantity" data-title="Quantity">
                        {
                            this.props.history !== undefined ?
                                <InputNumber
                                    onChange={(quantity) => this.handleChangeQuantity(item, quantity)}
                                    value={this.getItemQuantity(item)}
                                    min={1}
                                /> :
                                <label> {this.getItemQuantity(item)} </label>
                        }

                    </td>
                    <td className="cart-table__column cart-table__column--total" data-title="Total">
                        {
                            <Currency value={item.product.ProductSellingPrice * item.product.ProductQuantity} currency={"RM"} />
                        }
                    </td>
                    <td className="cart-table__column cart-table__column--remove">
                        <Link onClick={() => this.removeItem(item.product)} className={'btn btn-light btn-sm btn-svg-icon'}
                        > <Cross12Svg />
                        </Link>
                    </td>
                </tr>
            );
        });
    }

    // renderTotals() {
    //     const { cart } = this.props;

    //     if (cart.extraLines.length <= 0) {
    //         return null;
    //     }

    //     const extraLines = cart.extraLines.map((extraLine, index) => {
    //         let calcShippingLink;

    //         if (extraLine.type === 'shipping') {
    //             calcShippingLink = <div className="cart__calc-shipping"><Link to="/">Calculate Shipping</Link></div>;
    //         }

    //         return (
    //             <tr key={index}>
    //                 <th>{extraLine.title}</th>
    //                 <td>
    //                     {calcShippingLink}
    //                 </td>
    //             </tr>
    //         );
    //     });

    //     return (
    //         <React.Fragment>
    //             <thead className="cart__totals-header">
    //                 <tr>
    //                     <th style={{ textAlign: "right" }}>Subtotal</th>
    //                 </tr>
    //             </thead>
    //             <tbody className="cart__totals-body">
    //                 {extraLines}
    //             </tbody>
    //         </React.Fragment>
    //     );
    // }

    renderCart() {

        const breadcrumb = [
            { title: 'Home', url: '' },
            { title: 'Shopping Cart', url: '' },
        ];
        return (
            <div className="cart block container_" >
                {
                    this.props.history !== undefined ?
                        <PageHeader header="Shopping Cart" breadcrumb={breadcrumb} /> : <PageHeader />
                }
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
                            <div style={{ textAlign: "right", padding: "30px 30px", backgroundColor: "white" }}>

                                <div className="row">
                                    <div className="col-10" style={{ fontWeight: "bold" }}>  Subtotal </div>
                                    <div className="col-2" ><Currency value={this.state.subtotal}></Currency></div>
                                </div>
                                <div className="row">
                                    <div className="col-10" style={{ fontWeight: "bold" }}>  Shipping </div>
                                    <div className="col-2" ><Currency value={this.state.shipping}></Currency></div>
                                </div>
                                <div className="row">
                                    <div className="col-10" style={{ fontWeight: "bold" }}>  Tax </div>
                                    <div className="col-2" ><Currency value={this.state.tax}></Currency></div>
                                </div>
                                <div className="row">
                                    <div className="col-10" style={{ fontWeight: "bold" }}>  Total </div>
                                    <div className="col-2" ><Currency value={this.state.total}></Currency></div>
                                </div>
                                <div className="mt-5">
                                    <Link className="btn btn-primary" variant="outlined" color="primary"
                                        onClick={() => this.CheckOutOnClick(this.state.cart)}
                                    > Checkout
                                    </Link>
                                </div>
                            </div>
                            :
                            ""
                    }

                </div>
            </div>
        );
    }

    render() {

        // const { productcart } = this.props;
        const breadcrumb = [
            { title: 'Home', url: '' },
            { title: 'Shopping Cart', url: '' },
        ];
        let content;
        if (this.state.cart.length) {
            content = this.renderCart();
        } else {
            content = (
                <div className="block block-empty" >
                    {
                        this.props.history !== undefined ?
                            <PageHeader header="Shopping Cart" breadcrumb={breadcrumb} /> : <br></br>
                    }
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
                {content}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    productcart: state.counterReducer.productcart

});

const mapDispatchToProps = (dispatch) => {
    return {
        CallDeleteProductCart: (prodData) => dispatch(GitAction.CallDeleteProductCart(prodData)),
        CallUpdateProductCart: (prodData) => dispatch(GitAction.CallUpdateProductCart(prodData)),
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(ShopPageCart);
