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
import PageCheckout from "./ShopPageCheckout";
import { Button } from "@material-ui/core";
import shopApi from "../../api/shop";

import Checkbox from "@material-ui/core/Checkbox";


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
            // total: 0,
            // shipping: 25,
            // tax: 0,
            setDetails: false,
            selectedIndex: "",

            selectedList: [],
            selectedProductDetailList: [],
            isDataAccepted: false,
            isCheckOutSubmit: false
        };
        this.setDetails = this.setDetails.bind(this)
        this.removeItem = this.removeItem.bind(this)
        this.handleSelectedProduct = this.handleSelectedProduct.bind(this)
        this.handleAllProductSellect = this.handleAllProductSellect.bind(this)
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
        this.setState({ isDataSet: true })

        if (this.state.selectedProductDetailList !== [] && this.state.selectedProductDetailList.length > 0) {
            let temp = [...this.state.selectedProductDetailList]
            this.state.selectedProductDetailList.splice(0, this.state.selectedProductDetailList.length)
            temp.map((selectedProduct) => {

                this.state.cart.filter((x) => x.product.UserCartID === selectedProduct.product.UserCartID).map((updatedList, index) => {
                    this.state.selectedProductDetailList.push(updatedList)
                })
            })
            this.setState({ subtotal: this.state.selectedProductDetailList.reduce((subtotal, item) => subtotal + item.total, 0) })
        }
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

    // ---------------------------------------------------- Update Cart Item ------------------------------------

    removeItem(product) {
        this.props.CallDeleteProductCart({ userCartID: product.UserCartID, userID: localStorage.getItem("id"), productName: product.ProductName })
    }

    handleChangeQuantity = (item, quantity) => {
        if (quantity > 0) {
            this.props.CallUpdateProductCart({
                userID: localStorage.getItem("id"),
                userCartID: item.product.UserCartID,
                productQuantity: quantity,
                productName: item.product.ProductName
            })
        }
        this.setState({ selectedIndex: item.id })
    };

    // ---------------------------------------------------- Check Out ------------------------------------

    CheckOutOnClick = (items) => {

        if (localStorage.getItem("id")) {
            let ProductIDs = [];
            let ProductQuantity = [];
            let checkSKU = [];
            let checkName = [];
            let overSKUlimit = false
            this.state.overSKULimitID.splice(0, this.state.overSKULimitID.length)
            checkSKU.splice(0, checkSKU.length)

            items.map((row) => {
                this.props.productcart.filter((x) => x.UserCartID === row.product.UserCartID).map((items) => {
                    if (row.product.SKU < items.ProductQuantity) {
                        checkSKU.push(row.product.ProductID)
                        checkName.push(row.product.ProductName)
                    }
                    if (checkSKU.length > 0) {
                        this.setState({ SKUlimit: true, overSKULimitID: checkSKU })
                        overSKUlimit = true
                    }
                    else {
                        ProductIDs.push(row.product.ProductID);
                        ProductQuantity.push(row.quantity);
                    }
                })

            });


            if (overSKUlimit !== true && this.state.selectedList.length > 0) {

                this.setState({ isDataAccepted: true })
                // shopApi
                //     .addOrder({
                //         UserID: localStorage.getItem("id"),
                //         Products: ProductIDs,
                //         ProductQuantity: ProductQuantity,
                //     })
                //     .then((json) => {
                //         browserHistory.push("/Emporia/shop/checkout?order=" + json[0].OrderID);
                //         window.location.reload(false);
                //     });
                // browserHistory.push("/Emporia/shop/checkout");
                // window.location.reload(false);
            }

            if (this.state.selectedList.length === 0) {
                toast.error("Please select at least 1 product to proceed")
            }
            if (overSKUlimit === true) {
                checkName.map((x) => {
                    toast.error(x + " has over current available stock")
                })
            }
        }
        else {
            browserHistory.push("/Emporia/login");
            window.location.reload(false);
        }
    };

    // ---------------------------------------------------- Check Selected ------------------------------------

    handleSelectedProduct(item, index) {
        if (this.state.selectedList.length > 0) {
            let found = false
            this.state.selectedProductDetailList.map((x, i) => {
                if (x.id === item.id) {
                    this.state.selectedList.splice(i, 1)
                    this.state.selectedProductDetailList.splice(i, 1)
                    found = true
                }
            })
            if (found === false) {
                this.state.selectedList.push(index)
                this.state.selectedProductDetailList.push(item)
            }
        }
        else {
            this.state.selectedList.push(index)
            this.state.selectedProductDetailList.push(item)
        }
        this.setState({ subtotal: this.state.selectedProductDetailList.reduce((subtotal, item) => subtotal + item.total, 0) })
        // this.setState({ total: this.state.selectedProductDetailList.reduce((subtotal, item) => subtotal + item.total, 0) })
    }

    handleAllProductSellect() {

        if (this.state.selectedList.length === 0 && this.state.selectedList.length !== this.state.cart.length) {
            this.state.selectedList.splice(0, this.state.selectedList.length)
            this.state.selectedProductDetailList.splice(0, this.state.selectedProductDetailList.length)
            this.state.cart.map((product, i) => {
                this.state.selectedProductDetailList.push(product)
                this.state.selectedList.push(i)
            })
        }
        else {
            this.state.selectedList.splice(0, this.state.selectedList.length)
            this.state.selectedProductDetailList.splice(0, this.state.selectedProductDetailList.length)
        }
        this.setState({ subtotal: this.state.selectedProductDetailList.reduce((subtotal, item) => subtotal + item.total, 0) })
        // this.setState({ total: this.state.selectedProductDetailList.reduce((subtotal, item) => subtotal + item.total, 0) })
    }


    renderItems(displayCart) {
        return displayCart.map((item, i) => {
            let image;
            let options = [];

            const productImage = JSON.parse(item.product.ProductImages)

            if (productImage.length > 0) {
                image = (
                    <div className="product-image">
                        <Link to={url.product(item.product)} className="product-image__body">
                            <img className="product-image__img" src={productImage[0].ProductMediaUrl !== null ? productImage[0].ProductMediaUrl : Logo} alt="Emporia" onError={(e) => { e.target.onerror = null; e.target.src = Logo }} />
                        </Link>
                    </div>
                );
            } else {
                image = (
                    <div className="product-image">
                        <Link to={url.product(item.product)} className="product-image__body">
                            <img className="product-image__img" src={Logo} alt="Emporia" onError={(e) => { e.target.onerror = null; e.target.src = Logo }} />
                        </Link>
                    </div>
                );
            }

            return (
                <tr key={item.id} className="cart-table__row">
                    <td className="cart-table__column cart-table__column--checkbox">
                        {
                            this.props.history !== undefined ?
                                <Checkbox
                                    checked={
                                        this.state.selectedList.length > 0 ?
                                            this.state.selectedList.filter(x => x === i).length > 0 ?
                                                true : false
                                            : false
                                    }
                                    onClick={() => this.handleSelectedProduct(item, i)}
                                /> : ""
                        }
                    </td>
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
                                                <label style={{ color: "red" }}> Over Stock Limit,  Available Stock: {item.product.SKU !== null ? item.product.SKU : "0"} </label>
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
                        {
                            this.props.history !== undefined ?
                                <Button onClick={() => this.removeItem(item.product)} className={'btn btn-light btn-sm btn-svg-icon'} >
                                    <Cross12Svg />
                                </Button>
                                : ""
                        }
                    </td>
                </tr>
            );
        });
    }
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
                                <th className="cart-table__column cart-table__column--checkbox">
                                    {this.props.history !== undefined ?
                                        <Checkbox
                                            checked={this.state.selectedList.length === 0 ? false :
                                                this.state.cart.length === this.state.selectedList.length ? true : false}
                                            onClick={() => this.handleAllProductSellect()}
                                        /> : ""
                                    }

                                </th>
                                <th className="cart-table__column cart-table__column--image">Image</th>
                                <th className="cart-table__column cart-table__column--product">Product</th>
                                <th className="cart-table__column cart-table__column--price">Price</th>
                                <th className="cart-table__column cart-table__column--quantity">Quantity</th>
                                <th className="cart-table__column cart-table__column--total">Total</th>
                                <th className="cart-table__column cart-table__column--remove" aria-label="Remove" />
                            </tr>
                        </thead>
                        <tbody className="cart-table__body">
                            {this.props.history !== undefined ? this.renderItems(this.state.cart) : this.renderItems(this.props.data)}
                        </tbody>
                    </table>
                    {
                        this.props.history !== undefined ?
                            <div style={{ textAlign: "right", padding: "30px 30px", backgroundColor: "white" }}>

                                <div className="row">
                                    <div className="col-10" style={{ fontWeight: "bold" }}>  Subtotal </div>
                                    <div className="col-2" ><Currency value={this.state.subtotal}></Currency></div>
                                </div>
                                {/* <div className="row">
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
                                </div> */}
                                <div className="mt-5">
                                    <Link className="btn btn-primary" variant="outlined" color="primary"
                                        onClick={() => this.CheckOutOnClick(this.state.selectedProductDetailList)}
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
        const breadcrumb = [
            { title: 'Home', url: '' },
            { title: 'Shopping Cart', url: '' },
        ];
        let content;
        let continueshopping = (
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
        if (this.state.cart.length) {
            if (this.state.isDataAccepted === true) {
                return (
                    <>
                        <PageCheckout
                            data={this.state.selectedProductDetailList}
                        />
                    </>
                )
            }
            else {
                // if (this.props.productcart[0].ReturnVal !== "0" && this.props.productcart[0].ReturnVal === undefined) {
                if (this.props.productcart.length !== 0) {
                    content = this.renderCart();
                }

                else {
                    content = continueshopping;
                }
            }
        } else {
            content = continueshopping;
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
