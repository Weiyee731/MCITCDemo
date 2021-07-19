import React, { Component, useMemo } from "react";
import { connect } from "react-redux";
import { GitAction } from "../../store/action/gitAction";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// blocks
import BlockSlideShow from '../blocks/BlockSlideShow';
import TextField from '@material-ui/core/TextField';
// components
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import FiberManualRecordOutlinedIcon from '@material-ui/icons/FiberManualRecordOutlined';
import LocalShippingOutlinedIcon from '@material-ui/icons/LocalShippingOutlined';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined';
import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import BlockProductsCarousel from '../blocks/BlockProductsCarousel';
import { isNullOrEmptyString } from "../../Utilities/UtilRepo";

// styles
import './styles/BlockCategoryDetails.css'
import ProductCard from "../shared/ProductCard";

function mapStateToProps(state) {
    return {
        productCategories: state.counterReducer["productCategories"], // with sub hierarchy item
        products: state.counterReducer["products"],
        loading: state.counterReducer["loading"],
    };
}

function mapDispatchToProps(dispatch) {
    return {
        CallAllProductCategoryListing: () => dispatch(GitAction.CallAllProductCategoryListing()),
        CallGetProductByProductCategorySlug: (propsData) => dispatch(GitAction.CallGetProductByProductCategorySlug(propsData)),
        CallAllProducts: () => dispatch(GitAction.CallAllProducts()),
    };
}

const initialState = {
    products: [],
    selectedCategory: [],
    productSubCategories: [],
    selectedSubCategory: "",
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

class BlockCategoryDetails extends Component {
    constructor(props) {
        super(props);

        this.state = initialState;
        
        this.handleFilterOption = this.handleFilterOption.bind(this)
        this.resetFilter = this.resetFilter.bind(this)
    }

    componentDidMount() {
        if(!isNullOrEmptyString(this.props.match.params.categoryID)){
            let propsData = {
                ProductCategoryID: Number(this.props.match.params.categoryID),
                ProductPerPage: 30,
                Page: 1,
                Filter: "-"
            }

            this.props.CallGetProductByProductCategorySlug(propsData)
        }

        if (Array.isArray(this.props.productCategories) && this.props.productCategories.length === 0) {
            this.props.CallAllProductCategoryListing();
        }
        else {
            let selectedCategory = this.props.productCategories.filter(el => el.ProductCategory === this.props.match.params.categorySlug)

            try {
                if (selectedCategory.length > 0) {
                    if(selectedCategory[0].HierarchyItem !== null){
                        let subCategories = JSON.parse(selectedCategory[0].HierarchyItem)
                        this.setState({
                            productSubCategories: subCategories,
                            selectedSubCategory: (subCategories.length > 0) ? subCategories[0].ProductCategory : ""
                        })
                    }
                    else {
                        this.setState({
                            productSubCategories: [],
                        })
                    }
                }
                else {
                    this.setState({
                        productSubCategories: [],
                    })
                }
            }
            catch (e) {
                console.log(e);
                this.setState({
                    productSubCategories: [],
                })
            }
        }
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
        // console.log(this.props.products)
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
                            <div style={{ fontSize: '10pt' }}>
                                {
                                    this.state.productSubCategories.map((el, idx) => {
                                        return (
                                            this.state.selectedSubCategory === el.ProductCategory ?
                                                <div key={el.ProductCategory} className="sub-category-items active">
                                                    <DoubleArrowIcon fontSize='sm' /> {el.ProductCategory}
                                                </div>
                                                :
                                                <div key={el.ProductCategory} className="sub-category-items">
                                                    <FiberManualRecordOutlinedIcon fontSize='sm' /> {el.ProductCategory}
                                                </div>
                                        )
                                    })
                                }
                            </div>
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
                                <div className="sorting-option-label">{this.props.match.params.categorySlug}</div>
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
                            <div className="row">
                                {
                                    this.state.products.length > 0
                                        ?
                                        this.state.products.map((el, idx) => {
                                            return (
                                                <div className="products__list-item">
                                                    <ProductCard product={el}></ProductCard>
                                                </div>
                                            )
                                        })
                                        :
                                        <div><i>No products for this category</i></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(BlockCategoryDetails);
