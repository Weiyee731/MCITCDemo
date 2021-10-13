import React, { Component } from 'react'
import { connect } from "react-redux";
import { GitAction } from "../../store/action/gitAction";
import {
    Card,
    CardContent,
    Table,
    TableRow,
    TableCell,
    CardHeader,
    TableBody,
    Tooltip,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { toast } from "react-toastify";

import clsx from "clsx";
import "../../app/App.scss";
import { isStringNullOrEmpty } from "../../Utilities/UtilRepo"

function mapStateToProps(state) {
    return {
        productInfo: state.counterReducer["productsByID"],
        productMgmtResult: state.counterReducer["productMgmtResult"],
    };
}

function mapDispatchToProps(dispatch) {
    return {
        CallProductDetail: (prodData) => dispatch(GitAction.CallProductDetail(prodData)),
        CallEndorseProduct: (prodData) => dispatch(GitAction.CallEndorseProduct(prodData)),
        CallResetProductMgmtReturnVal: () => dispatch(GitAction.CallResetProductMgmtReturnVal()),
    };
}

const INITIAL_STATE = {
    // user info
    userId: null,

    // product info
    ProductID: "",
    ProductName: "",

    // form inputs

    // any
    isProductIntoBind: false,
}

class ProductEndorsementInfo extends Component {
    constructor(props) {
        super(props)
        this.state = INITIAL_STATE

        this.endorseProduct = this.endorseProduct.bind(this)
    }

    componentDidMount() {
        let userId = window.localStorage.getItem("id")
        console.log(userId)
        console.log(this.props.ProductID)

        if (!isStringNullOrEmpty(userId) && !isStringNullOrEmpty(this.props.ProductID)) {
            console.log('ues')
            this.setState({
                ProductID: this.props.ProductID,
                userId: window.localStorage.getItem("id"),
                ProductName: this.props.ProductName
            })

            this.props.CallProductDetail({ productId: this.props.ProductID, userId: window.localStorage.getItem("id") })
        }
        else {
            toast.error("Somthing goes wrong")
        }
    }

    componentDidUpdate(prevProps) {
        if (typeof this.props.productInfo !== "undefined" && this.props.productInfo.length > 0 && typeof this.props.productInfo.ReturnVal === "undefined" && !this.state.isProductIntoBind)
            this.bindProductInfoToState()
        else if (!this.state.isProductIntoBind && typeof this.props.productInfo.ReturnVal !== "undefined")
            toast.error("Somthing goes wrong with the server or network connection")

        if (typeof this.props.productMgmtResult !== "undefined" && this.props.productMgmtResult.length > 0) {
            console.log(this.props.productMgmtResult[0].ReturnVal)
            if (this.props.productMgmtResult[0].ReturnVal == 1) {
                this.props.CallResetProductMgmtReturnVal();
                toast.success("This product endorsed successfully.", {
                    autoClose: 3000, 
                    onClose: () => { this.props.backToList(false) }
                })
            }
        }
    }

    bindProductInfoToState = () => {
        console.log(this.props.productInfo)
        const ProductInfo = this.props.productInfo[0]

        let medias = [];
        let specifications = [];
        let variations = [];

        if (ProductInfo.ProductImages !== null || ProductInfo.ProductImages != null)
            medias = JSON.parse(ProductInfo.ProductImages)

        if (ProductInfo.ProductSpecification !== null || ProductInfo.ProductSpecification != null)
            specifications = JSON.parse(ProductInfo.ProductSpecification)

        if (ProductInfo.ProductVariation !== null || ProductInfo.ProductVariation != null)
            variations = JSON.parse(ProductInfo.ProductVariation)

        console.log(medias)
        console.log(specifications)
        console.log(variations)

        this.setState({
            isProductIntoBind: true,
            ProductMedias: medias,
            ProductSpecifications: specifications,
            ProductVariation: variations,
        })
    }

    endorseProduct = () => {
        if (typeof this.props.ProductID !== "undefined" && this.props.ProductID != null)
            this.props.CallEndorseProduct(this.props.ProductID)
    }

    render() {
        return (
            <div>
                <Button onClick={() => typeof this.props.backToList === "function" && this.props.backToList(false)}>
                    <i className="fas fa-chevron-left"></i> Back
                </Button>
                <div className="container pt-2">
                    <h2>{this.props.ProductName}</h2>
                </div>
                <div>
                    <Button variant="outlined" className="AddButton" onClick={() => this.endorseProduct()}>Endorse this Product</Button>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductEndorsementInfo);
