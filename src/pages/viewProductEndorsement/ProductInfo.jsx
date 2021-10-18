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
import "./ProductInfo.css";
import { isStringNullOrEmpty } from "../../Utilities/UtilRepo"
import Logo from "../../assets/Emporia.png";

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
        CallAllProducts: (prodData) => dispatch(GitAction.CallAllProducts(prodData)),
    };
}

const INITIAL_STATE = {
    // user info
    userId: null,

    // product info
    ProductID: "",
    ProductMedias: [],
    ProductSpecifications: [],
    ProductVariation: [],

    // merchant info
    MerchantDetail: [],


    // form inputs

    // any
    isProductIntoBind: false,
    currentProductIndex: 0,
}

class ProductEndorsementInfo extends Component {
    constructor(props) {
        super(props)
        this.state = INITIAL_STATE

        this.endorseProduct = this.endorseProduct.bind(this)
        this.handleImageCarousel = this.handleImageCarousel.bind(this)
    }

    componentDidMount() {
        let userId = window.localStorage.getItem("id")
        if (!isStringNullOrEmpty(userId) && !isStringNullOrEmpty(this.props.ProductID)) {
            this.setState({
                ProductID: this.props.ProductID,
                userId: window.localStorage.getItem("id"),
                ProductName: this.props.ProductName
            })
            this.props.CallProductDetail({ productId: this.props.ProductID, userId: window.localStorage.getItem("id") })
        }
        else
            toast.error("Somthing goes wrong")
    }

    componentDidUpdate(prevProps) {
        if (typeof this.props.productInfo !== "undefined" && this.props.productInfo.length > 0 && typeof this.props.productInfo.ReturnVal === "undefined" && !this.state.isProductIntoBind)
            this.bindProductInfoToState()
        else if (!this.state.isProductIntoBind && typeof this.props.productInfo.ReturnVal !== "undefined")
            toast.error("Somthing goes wrong with the server or network connection")

        if (typeof this.props.productMgmtResult !== "undefined" && this.props.productMgmtResult.length > 0) {
            if (this.props.productMgmtResult[0].ReturnVal == 1) {
                this.props.CallResetProductMgmtReturnVal();

                //fetch the latest pending items for endorsement
                this.props.CallAllProducts({
                    type: 'Status',
                    typeValue: 'Pending',
                    userId: window.localStorage.getItem("id"),
                    productPage: '999',
                    page: '1'
                });

                // it will return to table 
                toast.success("This product endorsed successfully.", {
                    autoClose: 3000,
                    onClose: () => { this.props.backToList(false) }
                })
            }
            else {
                toast.error("Something wents wrong during endorsing this product. Please contact developer.", { autoClose: 3000, })
            }
        }
    }

    bindProductInfoToState = () => {
        const ProductInfo = this.props.productInfo[0]
        console.log('ProductInfo', ProductInfo)

        let medias = [];
        let specifications = [];
        let variations = [];
        let merchantDetail = []

        if (ProductInfo.ProductImages !== null || ProductInfo.ProductImages != null)
            medias = JSON.parse(ProductInfo.ProductImages)

        if (ProductInfo.ProductSpecification !== null || ProductInfo.ProductSpecification != null)
            specifications = JSON.parse(ProductInfo.ProductSpecification)

        if (ProductInfo.ProductVariation !== null || ProductInfo.ProductVariation != null)
            variations = JSON.parse(ProductInfo.ProductVariation)

        if (ProductInfo.MerchantDetail !== null || ProductInfo.MerchantDetail != null)
            merchantDetail = JSON.parse(ProductInfo.MerchantDetail)

        console.log('medias', medias)
        console.log('specifications', specifications)
        console.log('variations', variations)
        console.log('merchantDetail', merchantDetail)

        this.setState({
            isProductIntoBind: true,
            ProductMedias: medias,
            ProductSpecifications: specifications,
            ProductVariation: variations,
            MerchantDetail: merchantDetail,
        })
    }

    endorseProduct = () => {
        if (typeof this.props.ProductID !== "undefined" && this.props.ProductID != null)
            this.props.CallEndorseProduct(this.props.ProductID)
    }

    handleImageCarousel = (index) => {
        const { ProductMedias, currentProductIndex, currentProductUrl } = this.state
        const totalMedias = ProductMedias.length

        if (!isNaN(index)) {
            let newIndex = currentProductIndex
        }
        else {
            this.setState({ currentProductIndex: 0, currentProductUrl: Logo })
        }
    }

    render() {
        const { productInfo } = this.props
        return (
            <div>
                <div className="container pt-2">
                    <Button onClick={() => typeof this.props.backToList === "function" && this.props.backToList(false)}>
                        <i className="fas fa-chevron-left"></i> Back
                    </Button>
                    {
                        typeof this.props.productInfo !== "undefined" && productInfo.length > 0 ?
                            <div className="row">
                                <div className="col-4">
                                    <div className="product-medias">
                                        {
                                            this.state.ProductMedias.length > 0 && this.state.ProductMedias.map((el, idx) => {
                                                return (
                                                    <img src={el.ProductMediaUrl} alt={productInfo[0].ProductName} width="100%" height="100%" onError={(e) => { e.target.onerror = null; e.target.src = Logo; }} />
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                <div className="col-8">
                                    <div>
                                        <h2>{productInfo[0].ProductName}</h2>
                                        <hr />
                                        <div>
                                            <span className="mr-3 product-general-info" ><b>Brand: </b>{productInfo[0].Brand === null ? '-' : productInfo[0].Brand}</span>
                                            <span className="mr-3 product-general-info" ><b>Model: </b>{productInfo[0].Model === null ? '-' : productInfo[0].Model}</span>
                                            <span className="product-general-info" ><b>SKU: </b> {productInfo[0].SKU === null ? '-' : productInfo[0].SKU}</span>
                                            <span className="product-general-info ml-5" >
                                                <span className="mr-1"><b>Dimension: </b></span>
                                                <span className="mr-1">{productInfo[0].ProductDimensionHeight === null ? '-' : productInfo[0].ProductDimensionHeight}m (H) X</span>
                                                <span className="mr-1">{productInfo[0].ProductDimensionWidth === null ? '-' : productInfo[0].ProductDimensionWidth}m (W) X</span>
                                                <span className="mr-1">{productInfo[0].ProductDimensionDeep === null ? '-' : productInfo[0].ProductDimensionDeep}m (D) {"  "}</span>
                                                <span className="ml-1">( {productInfo[0].ProductWeight === null ? '-' : productInfo[0].ProductWeight} KG )</span>
                                            </span>

                                        </div>
                                        <div className="product-general-info mt-2">Product Category: {productInfo[0].ProductCategoryID}</div>
                                        <div>
                                            <div style={{ fontSize: '24pt', color: '#7DA83F' }}>
                                                RM {productInfo[0].ProductPrice === null ? "-" : productInfo[0].ProductPrice} {" "}
                                                Stock: ({productInfo[0].ProductStockAmount === null ? "-" : productInfo[0].ProductStockAmount})
                                            </div>
                                        </div>
                                        <div>

                                        </div>
                                    </div>
                                </div>

                                {/* Merchant Profile */}
                                <div className="col-12" >
                                    {
                                        this.state.MerchantDetail.length > 0 &&
                                        <div className="row merchant-profile">
                                            <div className="col-2">
                                                <div className="merchant-profile-image">
                                                    <img
                                                        src={""}
                                                        alt={this.state.MerchantDetail[0].ShopName}
                                                        width="100%" height="100%"
                                                        onError={(e) => {
                                                            e.target.onerror = null;
                                                            e.target.src = Logo;
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-10">
                                                <div>
                                                    <div className="merchant-name">{this.state.MerchantDetail[0].ShopName} ({this.state.MerchantDetail[0].ShopCity})</div>
                                                    <span className="merchant-joined-date">
                                                        Last Joined: <i>{this.state.MerchantDetail[0].LastJoined === null ? "N/A" : this.state.MerchantDetail[0].LastJoined}</i>
                                                    </span>
                                                    <p className="mt-1 merchant-description">{this.state.MerchantDetail[0].ShopDescription}</p>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                                <div className="col-12 mt-3 product-detail">

                                    <div className="product-specification mb-2">
                                        <h5>Product Specifications</h5>
                                        <br />
                                        <div>
                                            <div className="row">
                                                <div className="col-2">Height</div>
                                                <div className="col-1">:</div>
                                                <div className="col">{productInfo[0].ProductDimensionHeight} (m)</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-2">Width</div>
                                                <div className="col-1">:</div>
                                                <div className="col">{productInfo[0].ProductDimensionWidth} (m)</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-2">Height</div>
                                                <div className="col-1">:</div>
                                                <div className="col">{productInfo[0].ProductDimensionDeep} (m)</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-2">Weight</div>
                                                <div className="col-1">:</div>
                                                <div className="col">{productInfo[0].ProductWeight === null ? '-' : productInfo[0].ProductWeight} (KG)</div>
                                            </div>
                                            {
                                                this.state.ProductSpecifications.length > 0 && this.state.ProductSpecifications.map((el, idx) => {
                                                    return (
                                                        <div className="row">
                                                            <div className="col-2">{el.ProductSpecification}</div>
                                                            <div className="col-1">:</div>
                                                            <div className="col">{el.ProductSpecificationValue}</div>
                                                        </div>
                                                    )
                                                })
                                            }

                                        </div>
                                    </div>

                                    <div className="product-description" dangerouslySetInnerHTML={{ __html: productInfo[0].ProductDescription }}></div>
                                </div>
                                <div className="col-12 p-0">
                                    <Button col="primary" variant="outlined" className="AddButton" onClick={() => this.endorseProduct()}>Endorse this Product</Button>
                                </div>
                            </div>
                            :
                            <div>
                                <i>Internal Server Error 500</i>
                            </div>
                    }

                </div>

            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductEndorsementInfo);
