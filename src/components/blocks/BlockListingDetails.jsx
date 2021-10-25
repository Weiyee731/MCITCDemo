import React, { Component } from "react";
import { connect } from "react-redux";
import { GitAction } from "../../store/action/gitAction";

// blocks
import TextField from '@material-ui/core/TextField';
// components
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import FiberManualRecordOutlinedIcon from '@material-ui/icons/FiberManualRecordOutlined';
import LocalShippingOutlinedIcon from '@material-ui/icons/LocalShippingOutlined';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { isStringNullOrEmpty } from "../../Utilities/UtilRepo";

// styles
import './styles/BlockListingDetails.css'
import ProductCard from "../shared/ProductCard";

function mapStateToProps(state) {
    return {
        productCategories: state.counterReducer["productCategories"], // with sub hierarchy item
        products: state.counterReducer["products"],
        productsListing: state.counterReducer["productsListing"],
        loading: state.counterReducer["loading"],
    };
}

function mapDispatchToProps(dispatch) {
    return {
        CallAllProductsListing: (propsData) => dispatch(GitAction.CallAllProductsListing(propsData)),
        CallAllProductCategoryListing: () => dispatch(GitAction.CallAllProductCategoryListing()),
        CallAllProducts: (propsData) => dispatch(GitAction.CallAllProducts(propsData)),

    };
}

const initialState = {
    products: [],
    selectedCategory: [],
    productSubCategories: [],
    selectedSubCategory: "",
    isHierarchyItemExist: false,
    filterOptions: {
        shippedFrom_checkbox: [false, false, false, false],
        minPrice: 0,
        maxPrice: 0,
        promotion_checkbox: [false, false, false],
        rating: 1
    },
    isDataBind: false,

}

const GreenCheckbox = withStyles({
    root: {
        color: "#2b535d",
        '&$checked': {
            color: '#2b535d',
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);

class BlockListingDetails extends Component {
    constructor(props) {
        super(props);

        this.state = initialState;

        this.props.CallAllProductsListing({
            type: this.props.match.params.selectedtype !== undefined && this.props.match.params.selectedtype.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, ''),
            typeValue: this.props.match.params.selectedtypevalue !== undefined && this.props.match.params.selectedtypevalue.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, ''),
            userId: localStorage.getItem("isLogin") !== "false" ? 0 : localStorage.getItem("id"),
            productPage: 999,
            page: 1
        })
        this.props.CallAllProductCategoryListing();
        this.handleFilterOption = this.handleFilterOption.bind(this)
        this.resetFilter = this.resetFilter.bind(this)
    }


    componentDidMount() {

        // console.log("this.props.match.params.selectedtypevalue", this.props.match.params.selectedtypevalue.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, ''))
        // console.log("this.props.match.params.selectedtype", this.props.match.params.selectedtype.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, ''))
        console.log("this.props.productCategories", this.props.productCategories)

        // if (!isStringNullOrEmpty(this.props.match.params.categoryID)) {
        //     this.props.CallAllProducts({
        //         type: "Merchant",
        //         typeValue: 0,
        //         userId: 0,
        //         productPage: 999,
        //         page: 1
        //     })
        // }

        // if (Array.isArray(this.props.productCategories) && this.props.productCategories.length === 0) {
        //     this.props.CallAllProductCategoryListing();
        // }
        // else {

        //     let selectedCategory = ""
        //     let selectedParentCategory = ""
        //     if (this.props.match.params.parentCategoryID === undefined)
        //         selectedCategory = this.props.productCategories.filter(el => el.ProductCategory === this.props.match.params.categorySlug)
        //     else {
        //         selectedCategory = this.props.productCategories.filter(el => el.ProductCategory === this.props.match.params.childcategorySlug)
        //         selectedParentCategory = this.props.productCategories.filter(el => el.ProductCategory === this.props.match.params.categorySlug)
        //     }

        //     try {
        //         if (selectedCategory.length > 0 && selectedParentCategory.length === 0) {
        //             if (selectedCategory[0].HierarchyItem !== null) {
        //                 let subCategories = JSON.parse(selectedCategory[0].HierarchyItem)
        //                 this.setState({
        //                     productSubCategories: subCategories,
        //                     isHierarchyItemExist: true,
        //                     selectedSubCategory: (subCategories.length > 0) ? subCategories[0].ProductCategory : ""
        //                 })
        //             }
        //             else {
        //                 this.setState({
        //                     productSubCategories: [],
        //                 })
        //             }
        //         }
        //         else if (selectedParentCategory.length > 0) {
        //             if (selectedParentCategory[0].HierarchyItem !== null) {
        //                 let subCategories = JSON.parse(selectedParentCategory[0].HierarchyItem)
        //                 this.setState({
        //                     productSubCategories: subCategories,
        //                     selectedSubCategory: (subCategories.length > 0) ? this.props.match.params.childcategorySlug : ""
        //                 })
        //             }
        //             else {
        //                 this.setState({
        //                     productSubCategories: [],
        //                 })
        //             }
        //         }
        //         else {
        //             this.setState({
        //                 productSubCategories: [],
        //             })
        //         }
        //     }
        //     catch (e) {
        //         this.setState({
        //             productSubCategories: [],
        //         })
        //     }
        // }
    }

    componentDidUpdate(prevProps) {
        if (!this.state.isDataBind) {
            this.setState({ products: this.props.products, isDataBind: true })
        }
    }

    handleFilterOption(e) {
        let tempObject = this.state.filterOptions
        let tempList = this.props.products
        switch (e.target.id) {
            case "min-price":
                tempObject.minPrice = Number(e.target.value)
                this.setState({ filterOptions: tempObject })
                break;

            case "max-price":
                tempObject.maxPrice = Number(e.target.value)
                this.setState({ filterOptions: tempObject })
                break;

            case "fllter-5-stars":
                tempObject.rating = 5
                if (tempObject.minPrice > 0 || tempObject.maxPrice > 0)
                    tempList = tempList.filter(el => el.ProductSellingPrice >= Number(this.state.filterOptions.minPrice) && el.ProductSellingPrice <= Number(this.state.filterOptions.maxPrice))

                tempList = tempList.filter(el => el.ProductRating >= 5)
                this.setState({ filterOptions: tempObject, products: tempList })
                break;

            case "fllter-4-stars":
                tempObject.rating = 4
                if (tempObject.minPrice > 0 || tempObject.maxPrice > 0)
                    tempList = tempList.filter(el => el.ProductSellingPrice >= Number(this.state.filterOptions.minPrice) && el.ProductSellingPrice <= Number(this.state.filterOptions.maxPrice))
                tempList = tempList.filter(el => el.ProductRating >= 4 && el.ProductRating < 5)
                this.setState({ filterOptions: tempObject, products: tempList })
                break;

            case "fllter-3-stars":
                tempObject.rating = 3
                if (tempObject.minPrice > 0 || tempObject.maxPrice > 0)
                    tempList = tempList.filter(el => el.ProductSellingPrice >= Number(this.state.filterOptions.minPrice) && el.ProductSellingPrice <= Number(this.state.filterOptions.maxPrice))
                tempList = tempList.filter(el => el.ProductRating >= 3 && el.ProductRating < 4)
                this.setState({ filterOptions: tempObject, products: tempList })
                break;

            case "fllter-2-stars":
                tempObject.rating = 2
                if (tempObject.minPrice > 0 || tempObject.maxPrice > 0)
                    tempList = tempList.filter(el => el.ProductSellingPrice >= Number(this.state.filterOptions.minPrice) && el.ProductSellingPrice <= Number(this.state.filterOptions.maxPrice))
                tempList = tempList.filter(el => el.ProductRating >= 2 && el.ProductRating < 3)
                this.setState({ filterOptions: tempObject, products: tempList })
                break;

            case "fllter-1-stars":
                tempObject.rating = 1
                if (tempObject.minPrice > 0 || tempObject.maxPrice > 0)
                    tempList = tempList.filter(el => el.ProductSellingPrice >= Number(this.state.filterOptions.minPrice) && el.ProductSellingPrice <= Number(this.state.filterOptions.maxPrice))
                tempList = tempList.filter(el => el.ProductRating >= 1 && el.ProductRating < 2)
                this.setState({ filterOptions: tempObject, products: tempList })
                break;

            case "fllter-no-stars":
                tempObject.rating = 0
                tempList = tempList.filter(el => el.ProductRating >= 0 && el.ProductRating < 1)
                this.setState({ filterOptions: tempObject, products: tempList })
                break;

            default:
                break;
        }
    }

    handleFilterPriceButton() {
        let minPrice = this.state.filterOptions.minPrice
        let maxPrice = this.state.filterOptions.maxPrice
        let list = this.props.products
        if (!isNaN(minPrice) && !isNaN(maxPrice)) {
            if (minPrice > maxPrice) {
                list = list.filter(el => el.ProductSellingPrice > minPrice)
                this.setState({ products: list })
            }
            else if (minPrice < 0 && maxPrice < 0) {
                let tempObject = this.state.filterOptions
                tempObject.minPrice = 0
                tempObject.maxPrice = 0
                this.setState({ filterOptions: tempObject })
            }
            else {
                list = list.filter(el => el.ProductSellingPrice >= minPrice && el.ProductSellingPrice <= maxPrice)
                this.setState({ products: list })
            }
        }
        else {
            this.setState({ products: this.props.products })
        }
    }

    resetFilter() {
        this.setState({
            filterOptions: initialState.filterOptions,
            products: this.props.products
        })
    }

    render() {

        return (
            <div className="container-fluid px-5 block block--margin-top">
                <div className="row">
                    <div className="col-md-2 col-12">
                        <div className="category-segment">
                            <div
                                style={{ cursor: "pointer", fontWeight: 600 }}
                                onMouseDown={(e) => {
                                    if (e.button === 1) {
                                        window.open("/shop/AllProductCategory/")
                                    }
                                }}

                                onClick={(e) => {
                                    window.location.href = "/shop/AllProductCategory/"
                                }}
                            >
                                <FormatListBulletedIcon /> {" "} All Categories
                            </div>
                            {/* <div style={{ fontSize: '10pt' }}>
                                {
                                    this.state.productSubCategories.map((el, idx) => {
                                        return (
                                            this.state.selectedSubCategory === el.ProductCategory ?
                                                <div key={el.ProductCategory} className="sub-category-items active">
                                                    <DoubleArrowIcon fontSize='sm' /> {el.ProductCategory}
                                                </div>
                                                :
                                                <div key={el.ProductCategory} className="sub-category-items">
                                                    {
                                                        this.props.childcategorySlug === undefined ?
                                                            <FiberManualRecordOutlinedIcon fontSize='sm'
                                                                onClick={() => {
                                                                    this.setState({ selectedSubCategory: el.ProductCategory });
                                                                    window.location.href = "/shop/ProductCategory/" + this.props.categoryID + "/" + this.props.categorySlug + "/" + el.ProductCategoryID + "/" + el.ProductCategory
                                                                }}
                                                            /> :
                                                            <FiberManualRecordOutlinedIcon fontSize='sm'
                                                                onClick={() => {
                                                                    this.setState({ selectedSubCategory: el.ProductCategory });
                                                                    window.location.href = "/shop/ProductCategory/" + this.props.parentCategoryID + "/" + this.props.categorySlug + "/" + el.ProductCategoryID + "/" + el.ProductCategory
                                                                }}
                                                            />
                                                    }
                                                    <label onClick={() => {
                                                        this.setState({ selectedSubCategory: el.ProductCategory });
                                                        window.location.href = "/shop/ProductCategory/" + this.props.parentCategoryID + "/" + this.props.categorySlug + "/" + el.ProductCategoryID + "/" + el.ProductCategory
                                                    }}
                                                    >{el.ProductCategory}</label>
                                                </div>
                                        )
                                    })
                                }
                            </div> */}
                        </div>
                        <hr />
                        <div className="filtering-segment mt-3">
                            <div className="location-segment">
                                <div className="filter-options-label"><LocalShippingOutlinedIcon /> SHIPPED FROM</div>
                                <div>
                                    <FormControlLabel
                                        control={<GreenCheckbox checked={this.state.checked} onChange={(e) => console.log()} name="WM" />}
                                        label="West Malaysia"
                                        className="location-segment-checkboxes"
                                    />
                                    <FormControlLabel
                                        control={<GreenCheckbox checked={this.state.checked} onChange={(e) => console.log()} name="EM" />}
                                        label="East Malaysia"
                                        className="location-segment-checkboxes"
                                    />
                                    <FormControlLabel
                                        control={<GreenCheckbox checked={this.state.checked} onChange={(e) => console.log()} name="Local" />}
                                        label="Local"
                                        className="location-segment-checkboxes"
                                    />
                                    <FormControlLabel
                                        control={<GreenCheckbox checked={this.state.checked} onChange={(e) => console.log()} name="Overseas" />}
                                        label="Overseas"
                                        className="location-segment-checkboxes"
                                    />
                                </div>
                            </div>

                            <hr />

                            <div className="prices-segment mt-3">
                                <div className="filter-options-label"><MonetizationOnOutlinedIcon /> PRICE</div>

                                <div className="d-flex w-75 mt-1">
                                    <TextField id="min-price" className="mr-auto" label="MIN" variant="outlined" size="small" style={{ width: 100, height: 40, fontSize: '8pt' }} onChange={e => this.handleFilterOption(e)} ></TextField>
                                    <span className="mx-2 my-auto"> - </span>
                                    <TextField id="max-price" className="ml-auto" label="MAX" variant="outlined" size="small" style={{ width: 100, height: 40, fontSize: '8pt' }} onChange={e => this.handleFilterOption(e)} ></TextField>

                                </div>
                                <Button id="filter-price-button" variant="contained" color="primary" disableElevation className="w-75 mt-1" style={{ backgroundColor: '#2b535d' }} onClick={() => this.handleFilterPriceButton()}>
                                    Filter Price
                                </Button>
                            </div>

                            <hr />

                            <div className="promotion-segment mt-3">
                                <div className="filter-options-label"><LocalOfferOutlinedIcon /> PROMOTION</div>
                                <div>
                                    <FormControlLabel
                                        control={<GreenCheckbox checked={this.state.checked} onChange={(e) => console.log()} name="Mega Sales" />}
                                        label="Mega Sales 40% Off"
                                        className="location-segment-checkboxes"
                                    />
                                    <FormControlLabel
                                        control={<GreenCheckbox checked={this.state.checked} onChange={(e) => console.log()} name="20% Off" />}
                                        label="RM15 Free Shipping"
                                        className="location-segment-checkboxes"
                                    />
                                    <FormControlLabel
                                        control={<GreenCheckbox checked={this.state.checked} onChange={(e) => console.log()} name="20% Off" />}
                                        label="Wholesale Price"
                                        className="location-segment-checkboxes"
                                    />
                                </div>
                            </div>

                            <hr />

                            <div className="rating-segment mt-3">
                                <div className="filter-options-label"><StarBorderOutlinedIcon /> RATINGS</div>
                                <div>
                                    <div id="fllter-5-stars" className="d-flex mb-2 " style={{ cursor: 'pointer' }} onClick={(e) => this.handleFilterOption(e)}>
                                        <Rating name="read-only" value={5} readOnly size="small" />
                                    </div>
                                    <div id="fllter-4-stars" className="d-flex mb-1 " style={{ cursor: 'pointer' }} onClick={(e) => this.handleFilterOption(e)}>
                                        <Rating name="read-only" value={4} readOnly size="small" />
                                        <Typography component="legend"> & above</Typography>
                                    </div>
                                    <div id="fllter-3-stars" className="d-flex mb-1 " style={{ cursor: 'pointer' }} onClick={(e) => this.handleFilterOption(e)}>
                                        <Rating name="read-only" value={3} readOnly size="small" />
                                        <Typography component="legend"> & above</Typography>
                                    </div>
                                    <div id="fllter-2-stars" className="d-flex mb-1 " style={{ cursor: 'pointer' }} onClick={(e) => this.handleFilterOption(e)} >
                                        <Rating name="read-only" value={2} readOnly size="small" />
                                        <Typography component="legend"> & above</Typography>
                                    </div>
                                    <div id="fllter-1-stars" className="d-flex mb-1 " style={{ cursor: 'pointer' }} onClick={(e) => this.handleFilterOption(e)}>
                                        <Rating name="read-only" value={1} readOnly size="small" />
                                        <Typography component="legend"> & above</Typography>
                                    </div>
                                    <div id="fllter-no-stars" className="d-flex mb-1 " style={{ cursor: 'pointer' }} onClick={(e) => this.handleFilterOption(e)}>
                                        <Rating name="read-only" value={0} readOnly size="small" />
                                        <Typography component="legend"> - No Ratings</Typography>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr />
                        <div className="d-flex">
                            <Button variant="contained" color="primary" disableElevation style={{ backgroundColor: '#2b535d', width: "100%" }} onClick={() => this.resetFilter()}> Reset Fitlers</Button>
                        </div>
                    </div>
                    <div className="col-md-10 col-12">
                        <div className="d-flex sorting-options-panel align-middle  px-3 mb-2 ">
                            <div className="flex-grow-1 d-flex my-auto">
                                {
                                    this.props.match.params.selectedtype.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '') === "Category" &&

                                    this.props.productCategories.filter((x) => x.ProductCategoryID == this.props.match.params.selectedtypevalue.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, ''))
                                        .map((category) => {
                                            return (
                                                <div className="sorting-option-label">
                                                    Category - {category.ProductCategory}
                                                </div>
                                            )
                                        })
                                }
                                {
                                    this.props.match.params.selectedtype.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '') === "Keyword" &&
                                    <div className="sorting-option-label">
                                        Keyword Search - {this.props.match.params.selectedtypevalue.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')}
                                    </div>
                                }
                                {/* {this.props.childcategorySlug !== undefined ?
                                        this.props.categorySlug + " - " + this.props.childcategorySlug :
                                        this.props.categorySlug + " - " + this.state.selectedSubCategory} */}

                            </div>
                            <div>
                                <FormControl variant="outlined" style={{ width: 100, height: 40 }} size="small" >
                                    <InputLabel id="demo-simple-select-outlined-label">Sort By</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={""}
                                        onChange={() => { }}
                                        label="Sort By"
                                        color="primary"
                                    >
                                        <MenuItem value="latest">Latest</MenuItem>
                                        <MenuItem value="top-sales">Top Sales</MenuItem>
                                        <MenuItem value="low-to-high">Price Low to High</MenuItem>
                                        <MenuItem value="high-to-low">Price High to Low</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </div>

                        {/* product catalog */}
                        <div className="product-list container-fluid">
                            <div className="row pl-2">
                                {
                                    this.props.productsListing !== undefined && this.props.productsListing.length > 0 && JSON.parse(this.props.productsListing)[0].ReturnVal === undefined
                                        ?
                                        JSON.parse(this.props.productsListing).map((products) => {
                                            return (
                                                <div className="products__list-item">
                                                    <ProductCard product={products}></ProductCard>
                                                </div>
                                            )
                                        })
                                        // console.log("this.props.productsListing123", this.props.productsListing)


                                        // this.state.products.filter(x => x.ProductCategoryID === parseInt(this.props.categoryID)).length > 0 ?
                                        //     this.state.products.filter(x => x.ProductCategoryID === parseInt(this.props.categoryID)).map((x) => {
                                        //         return (
                                        //             <div className="products__list-item">
                                        //                 <ProductCard product={this.state.products}></ProductCard>
                                        //             </div>
                                        //         )
                                        //     })
                                        //     : <div className="ml-2"><i>No products for this category</i></div>
                                        :
                                        <div className="ml-2"><i>No products for this category</i></div>
                                }
                                <div></div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlockListingDetails);