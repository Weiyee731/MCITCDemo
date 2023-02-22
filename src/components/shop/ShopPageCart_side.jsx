// react
import React, { Component } from 'react';

// third-party
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { browserHistory } from "react-router";
import { GitAction } from "../../store/action/gitAction";

// application
import Currency from '../shared/Currency';
import InputNumber from '../shared/InputNumber';
import PageHeader from '../shared/PageHeader';
import { Cross12Svg } from '../../svg';
import { url } from '../../services/utils';
import Logo from "../../assets/Emporia.png";
import PageCheckout from "./ShopPageCheckout";
import { Button } from "@mui/material";

import Checkbox from "@mui/material/Checkbox";
import { Typography } from '@mui/material';


// data stubs
import { toast } from 'react-toastify';
import { red } from '@mui/material/colors';

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import LoadingPanel from '../shared/loadingPanel'

// import {  } from 'react-router-dom';
class ShopPageCart_side extends Component {
    constructor(props) {
        super(props);
        this.state = {
            /** example: [{itemId: 8, value: 1}] */
            quantities: [],
            ProductStockAmountlimit: false,
            overProductStockAmountLimitID: [],
            cart: [],
            subtotal: 0,
            // total: 0,
            // shipping: 25,
            // tax: 0,
            setDetails: false,
            selectedIndex: "",

            MerchantShopName: [],

            // selectedList: [],
            selectedProductDetailList: [],
            isDataAccepted: false,
            isCheckOutSubmit: false,
            loading: false
        };
        this.setDetails = this.setDetails.bind(this)
        this.filterShop = this.filterShop.bind(this)
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
                    price: x.ProductPrice,
                    total: x.ProductQuantity * x.ProductPrice,
                    quantity: x.ProductQuantity,
                    MerchantShopName: x.MerchantShopName,
                    MerchantID: x.MerchantID,
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

    filterShop(data) {
        let filterList = []
        let filterShopName = []
        filterList = data.filter((ele, ind) => ind === data.findIndex(elem => elem.MerchantShopName === ele.MerchantShopName))

        filterList.map((x) => {
            filterShopName.push(x.MerchantShopName)
        })

        this.setState({ MerchantShopName: filterShopName })
    }

    componentDidMount() {
        if (this.props.productcart !== undefined && this.props.productcart[0] !== undefined && this.props.productcart[0].ReturnVal === undefined) {
            this.setDetails(this.props.productcart)
        }
        if (this.props.history !== undefined)
            this.filterShop(this.props.productcart)
        if (this.props.history === undefined)
            this.filterShop(this.props.data)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.productcart !== this.props.productcart) {
            if (this.props.productcart.length > 0) {
                this.state.cart.map((x, index) => {
                    this.state.cart.splice(0, this.state.cart.length)
                })
                this.filterShop(this.props.productcart)
                this.setDetails(this.props.productcart)
                this.setState({ loading: false })
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
        this.setState({ selectedIndex: item.id, loading: true })
    };

    // ---------------------------------------------------- Check Out ------------------------------------

    CheckOutOnClick = (items) => {

        if (localStorage.getItem("id")) {
            let ProductIDs = [];
            let ProductQuantity = [];
            let checkProductStockAmount = [];
            let checkName = [];
            let overProductStockAmountlimit = false
            this.state.overProductStockAmountLimitID.splice(0, this.state.overProductStockAmountLimitID.length)
            checkProductStockAmount.splice(0, checkProductStockAmount.length)

            items.map((row) => {
                this.props.productcart.filter((x) => x.UserCartID === row.product.UserCartID).map((items) => {
                    if (row.product.ProductStock < items.ProductQuantity) {
                        checkProductStockAmount.push(row.product.ProductID)
                        checkName.push(row.product.ProductName)
                    }
                    if (checkProductStockAmount.length > 0) {
                        this.setState({ ProductStockAmountlimit: true, overProductStockAmountLimitID: checkProductStockAmount })
                        overProductStockAmountlimit = true
                    }
                    else {
                        ProductIDs.push(row.product.ProductID);
                        ProductQuantity.push(row.quantity);
                    }
                })

            });


            if (overProductStockAmountlimit !== true && this.state.selectedProductDetailList.length > 0) {
                // this.setState({ isDataAccepted: true })
                // this.props.history.push('/shop/checkout')
                const { selectedProductDetailList } = this.state
                const merchant = selectedProductDetailList.filter((ele, ind) => ind === selectedProductDetailList.findIndex(elem => elem.MerchantShopName === ele.MerchantShopName))
                this.props.history.push({
                    pathname: '/shop/checkout',
                    state: {
                        data: selectedProductDetailList,
                        merchant: merchant
                    }
                });
            }

            if (this.state.selectedProductDetailList.length === 0) {
                toast.error("Please select at least 1 product to proceed")
            }
            if (overProductStockAmountlimit === true) {
                checkName.map((x) => {
                    toast.error(x + " has over current available stock")
                })
            }
        }
        else {
            this.props.history.push("/EmporiaDev/login");
        }

    };

    // ---------------------------------------------------- Check Selected ------------------------------------

    handleSelectedProduct(item, index) {
        if (this.state.selectedProductDetailList.length > 0) {
            let found = false
            this.state.selectedProductDetailList.map((x, i) => {
                if (x.id === item.id) {
                    this.state.selectedProductDetailList.splice(i, 1)
                    found = true
                }
            })
            if (found === false) {
                this.state.selectedProductDetailList.push(item)
            }
        }
        else {
            this.state.selectedProductDetailList.push(item)
        }
        this.setState({ subtotal: this.state.selectedProductDetailList.reduce((subtotal, item) => subtotal + item.total, 0) })
    }

    handleAllProductSellect(shopName, selectedProductListing) {
        const { cart } = this.state
        let tempList = []

        if (shopName === null) {

            if (selectedProductListing.length > 0) {
                selectedProductListing = []
                tempList = []
            } else {
                selectedProductListing = []
                tempList = [...selectedProductListing, ...cart]
            }
        }
        else {
            let itemsWithShopname = selectedProductListing.filter(x => x.MerchantShopName === shopName)

            if (itemsWithShopname.length > 0) {
                tempList = selectedProductListing.filter(x => x.MerchantShopName !== shopName)
            }
            else {
                itemsWithShopname = cart.filter(x => x.MerchantShopName === shopName)
                tempList = [...selectedProductListing, ...itemsWithShopname]
            }
        }

        this.setState({ selectedProductDetailList: tempList, subtotal: tempList.reduce((subtotal, item) => subtotal + item.total, 0) })
    }

    renderItems(displayCart) {
        return displayCart.map((item, i) => {
            let image;
            image = (
                <div className="product-image" key={i}>
                    <Link to={url.product(item.product)} className="product-image__body" onClick={() => { this.props.setCartOpen(false) }}>
                        <img className="product-image__img" src={item.product.ProductImage !== null && item.product.ProductImage !== undefined && item.product.ProductImage.length > 0 ? item.product.ProductImage : Logo} alt="Emporia" onError={(e) => { e.target.onerror = null; e.target.src = Logo }} />
                    </Link>
                </div>
            );

            return (
                <Grid container key={i} className="cart-table__row">
                    
                    <Grid container spacing={2}>
                        <Grid item className="cart-button" xs={2}>
                            {
                                this.props.history !== undefined &&
                                <Checkbox
                                    checked={
                                        this.state.selectedProductDetailList.length > 0 ?
                                            this.state.selectedProductDetailList.filter(x => x.id === item.id).length > 0 ?
                                                true : false
                                            : false
                                    }
                                    onClick={() => this.handleSelectedProduct(item, i)}
                                />
                            }
                        </Grid>
                        <Grid item xs={4} style={{margin:'auto'}}>
                            {image}
                        </Grid>
                        <Grid item className="cart-table__column--product" xs={4} style={{margin:'auto'}}>
                            <div style={{ fontSize: "14px" }} className="cart-fixNameLength">
                                <Link to={url.product(item.product)} className="cart-table__product-name" onClick={() => { this.props.setCartOpen(false) }}>
                                    {item.product.ProductName}
                                </Link>
                                {
                                    this.state.overProductStockAmountLimitID.length > 0 &&
                                    this.state.overProductStockAmountLimitID.filter(x => x === item.product.ProductID).length > 0 &&
                                    this.state.overProductStockAmountLimitID.filter(x => x === item.product.ProductID).map((x, ind) => {
                                        return (
                                            <label className='mt-3' style={{ color: "red" }} key={ind}> Over Stock Limit,  Available Stock: {item.product.ProductStock !== null ? item.product.ProductStock : "0"} </label>
                                        )
                                    })
                                }
                            </div>
                            <div style={{ fontSize: "11px" }}>
                                Variation: {item.product.ProductVariationValue}
                            </div>
                            <div>
                                {
                                    item.product.ProductPromotion && JSON.parse(item.product.ProductPromotion).length > 0 ?

                                        <div>
                                            <span className="product-card__new-price">
                                                <Currency value={JSON.parse(item.product.ProductPromotion)[0].PromotionPrice} currency={"RM"} />
                                            </span>
                                            <span className="product-card__old-price">
                                                <Currency value={item.product.ProductPrice !== null && item.product.ProductPrice !== undefined ? parseFloat(item.product.ProductPrice) : 0} currency={"RM"} />
                                            </span>
                                        </div>
                                        :
                                        <span className="product-card__new-price">
                                            <Currency value={item.product.ProductPrice} currency={"RM"} />
                                        </span>

                                    // PromoTag = [{ id: 1, tag: JSON.parse(product.ProductPromotion)[0].ProductDiscount, color: "#d23f57" }]
                                }
                            </div>
                            <div className='cart-fixinputNumber'>
                                {
                                    this.props.history !== undefined ?
                                        <InputNumber
                                            onChange={(quantity) => this.handleChangeQuantity(item, quantity)}
                                            value={this.getItemQuantity(item)}
                                            min={1}
                                            className="inputNumber-sm"
                                            size="sm"
                                        /> :
                                        <label> {this.getItemQuantity(item)} </label>
                                }
                            </div>
                            <span className='cart-subtotal'>
                                <Typography variant="caption">Total</Typography>
                                <Typography color="#ff2626" fontWeight="500" className='d-inline-flex'>
                                    {
                                        item.product.ProductPromotion && JSON.parse(item.product.ProductPromotion).length > 0 ?
                                            <Currency value={JSON.parse(item.product.ProductPromotion)[0].PromotionPrice * item.product.ProductQuantity} currency={"RM"} />
                                            :
                                            <Currency value={item.product.ProductPrice * item.product.ProductQuantity} currency={"RM"} />
                                    }

                                </Typography>
                            </span>
                        </Grid>
                        <Grid item className="cart-button" xs={2}>
                            {
                                this.props.history !== undefined &&
                                <Button onClick={() => this.removeItem(item.product)} className={'btn btn-light btn-sm btn-svg-icon'} >
                                    <Cross12Svg />
                                </Button>
                            }
                        </Grid>
                    </Grid>
                </Grid>
            );
        });
    }

    renderCart() {
        const breadcrumb = [
            { title: 'Shopping Cart', url: '' },
        ];

        const style = {
            width: '10%',
            position: 'absolute',
        }


        return (

            <div className="cart block container_" >
                {

                    this.state.loading && <LoadingPanel backgroundColor="#bfbfbf94" />
                }

                {/* {
                    this.props.history !== undefined ?
                        <PageHeader header="Shopping Cart" breadcrumb={breadcrumb} /> : <PageHeader />
                } */}
                {
                    this.state.MerchantShopName.map((shopName, ind) => {
                        return (
                                <table className="cart__table cart-table" size="small" key={ind}>
                                    <div className='shopName'>
                                        <Typography>
                                            <Link to={{ pathname: url.cartMerchant(this.state.cart.filter((x) => x.MerchantShopName === shopName)[0].MerchantID) }} onClick={() => { this.props.setCartOpen(false) }}>{shopName ? <>{shopName} <KeyboardArrowRightIcon /> </> : <>Shop Name  <KeyboardArrowRightIcon /></>}</Link>
                                        </Typography>
                                    </div>
                                    <tbody className="cart-table__body">
                                        {this.props.history !== undefined ? this.renderItems(this.state.cart.filter((X) => X.MerchantShopName === shopName)) : this.renderItems(this.props.data.filter((X) => X.MerchantShopName === shopName))}
                                    </tbody>
                                </table>
                        )
                    })
                }
                {
                    this.props.history !== undefined &&
                    <div className="cart-checkout">
                        <div className='row'>
                            <div className="col-4" >
                                {this.props.history !== undefined ?
                                    <>
                                        <Checkbox
                                            checked={this.state.selectedProductDetailList.length === 0 ? false :
                                                this.state.cart.length === this.state.selectedProductDetailList.length ? true : false}
                                            indeterminate={this.state.selectedProductDetailList.length === 0 ? false : this.state.cart.length === this.state.selectedProductDetailList.length ? false : true}
                                            onClick={() => this.handleAllProductSellect(null, this.state.selectedProductDetailList)}
                                        />
                                        All
                                    </> : ""
                                }
                            </div>
                            <div className="col-8 checkout-button">
                                <button className="btn btn-primary" variant="outlined" color="primary" style={{ borderRadius: "5px" }}
                                    onClick={() => { this.CheckOutOnClick(this.state.selectedProductDetailList); this.props.setCartOpen(false) }}>
                                    Checkout  ( <Currency value={this.state.subtotal}></Currency> )</button>
                            </div>
                        </div>



                    </div>
                }
            </div >
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
                <PageHeader header="Shopping Cart" breadcrumb={breadcrumb} />
                <div className="container">
                    <div className="block-empty__body">
                        <div className="block-empty__message">Your shopping cart is empty!</div>
                        <div className="block-empty__actions" onClick={() => this.props.setCartOpen(false)}>
                            <Link to="/" className="btn btn-primary btn-sm">Continue Shopping</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
        if (this.state.cart.length) {
            if (this.state.isDataAccepted === true) {
                // <PageCheckout
                //     data={this.state.selectedProductDetailList}
                //     merchant={this.state.selectedProductDetailList.filter((ele, ind) => ind === this.state.selectedProductDetailList.findIndex(elem => elem.MerchantShopName === ele.MerchantShopName))}
                // />


            } else {
                if (this.props.productcart.length > 0 && this.props.productcart[0].ReturnVal !== '0') {
                    content = this.renderCart();
                } else {
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
        CallViewProductCart: (prodData) => dispatch(GitAction.CallViewProductCart(prodData)),
    }

};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ShopPageCart_side));