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
import { toast } from "react-toastify";

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
    productList: [],
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
    isFilter: false

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


const sortingOption = [
    { value: 'latest', label: 'Latest' },
    { value: 'top-sales', label: 'Top Sales' },
    { value: 'low-to-high', label: 'Price Low to High' },
    { value: 'high-to-low', label: 'Price High to Low' }
]

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
        this.handleShipFilter = this.handleShipFilter.bind(this)
        this.resetFilter = this.resetFilter.bind(this)
        this.setListing = this.setListing.bind(this)
        this.handleSorting = this.handleSorting.bind(this)
    }


    componentDidMount() {
        this.props.productsListing !== undefined && this.props.productsListing.length > 0 && JSON.parse(this.props.productsListing)[0].ReturnVal === undefined &&
            this.state.productList.push(JSON.parse(this.props.productsListing))
    }

    componentDidUpdate(prevProps) {
        if (!this.state.isDataBind) {
            this.setState({ products: this.props.products, isDataBind: true })
        }

        if (prevProps.productsListing !== this.props.productsListing) {
            if (this.props.productsListing !== undefined && this.props.productsListing.length > 0 && JSON.parse(this.props.productsListing)[0].ReturnVal === undefined) {
                this.state.productList.splice(0, this.state.productList.length)
                this.state.productList.push(JSON.parse(this.props.productsListing))
            }
        }
    }

    handleFilterOption(e) {
        if (this.props.productsListing !== undefined && this.props.productsListing.length > 0 && JSON.parse(this.props.productsListing)[0].ReturnVal === undefined) {
            let tempObject = this.state.filterOptions
            let tempList = JSON.parse(this.props.productsListing)

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
                    this.setListing(tempList)
                    this.setState({ filterOptions: tempObject })
                    break;

                case "fllter-4-stars":
                    tempObject.rating = 4
                    if (tempObject.minPrice > 0 || tempObject.maxPrice > 0)
                        tempList = tempList.filter(el => el.ProductSellingPrice >= Number(this.state.filterOptions.minPrice) && el.ProductSellingPrice <= Number(this.state.filterOptions.maxPrice))
                    tempList = tempList.filter(el => el.ProductRating >= 4 && el.ProductRating < 5)
                    this.setListing(tempList)
                    this.setState({ filterOptions: tempObject })
                    break;

                case "fllter-3-stars":
                    tempObject.rating = 3
                    if (tempObject.minPrice > 0 || tempObject.maxPrice > 0)
                        tempList = tempList.filter(el => el.ProductSellingPrice >= Number(this.state.filterOptions.minPrice) && el.ProductSellingPrice <= Number(this.state.filterOptions.maxPrice))
                    tempList = tempList.filter(el => el.ProductRating >= 3 && el.ProductRating < 4)
                    this.setListing(tempList)
                    this.setState({ filterOptions: tempObject })
                    break;

                case "fllter-2-stars":
                    tempObject.rating = 2
                    if (tempObject.minPrice > 0 || tempObject.maxPrice > 0)
                        tempList = tempList.filter(el => el.ProductSellingPrice >= Number(this.state.filterOptions.minPrice) && el.ProductSellingPrice <= Number(this.state.filterOptions.maxPrice))
                    tempList = tempList.filter(el => el.ProductRating >= 2 && el.ProductRating < 3)
                    this.setListing(tempList)
                    this.setState({ filterOptions: tempObject })
                    break;

                case "fllter-1-stars":
                    tempObject.rating = 1
                    if (tempObject.minPrice > 0 || tempObject.maxPrice > 0)
                        tempList = tempList.filter(el => el.ProductSellingPrice >= Number(this.state.filterOptions.minPrice) && el.ProductSellingPrice <= Number(this.state.filterOptions.maxPrice))
                    tempList = tempList.filter(el => el.ProductRating >= 1 && el.ProductRating < 2)
                    this.setListing(tempList)
                    this.setState({ filterOptions: tempObject })
                    break;

                case "fllter-no-stars":
                    tempObject.rating = 0
                    tempList = tempList.filter(el => el.ProductRating >= 0 && el.ProductRating < 1)
                    this.setListing(tempList)
                    this.setState({ filterOptions: tempObject })
                    break;

                default:
                    break;
            }
        }

    }

    handleFilterPriceButton() {
        let minPrice = this.state.filterOptions.minPrice
        let maxPrice = this.state.filterOptions.maxPrice
        if (this.props.productsListing !== undefined && this.props.productsListing.length > 0 && JSON.parse(this.props.productsListing)[0].ReturnVal === undefined) {
            let list = JSON.parse(this.props.productsListing)

            if (!isNaN(minPrice) && !isNaN(maxPrice)) {
                if (minPrice > maxPrice) {
                    list = list.filter(el => el.ProductSellingPrice > minPrice)
                    this.setListing(list)
                }
                else if (minPrice < 0 && maxPrice < 0) {
                    toast.error("Please set a correct value to filter")
                }
                else {
                    list = list.filter(el => el.ProductPrice >= minPrice && el.ProductPrice <= maxPrice)
                    this.setListing(list)
                }
            }
            else {
                this.setState({ products: this.props.products })
            }
        } else {
            toast.error("No product available to filter")
        }
    }

    resetFilter() {
        this.setListing(JSON.parse(this.props.productsListing))
        this.setState({ filterOptions: initialState.filterOptions })
    }


    handleSorting(options) {
        if (this.props.productsListing !== undefined && this.props.productsListing.length > 0 && JSON.parse(this.props.productsListing)[0].ReturnVal === undefined) {
            let list = JSON.parse(this.props.productsListing)

            switch (options.target.value) {
                case "latest":
                    break;
                case "top-sales":
                    list.sort((a, b) => (a.ProductSold - b.ProductSold))
                    this.setListing(list)
                    break;
                case "low-to-high":
                    list.sort((a, b) => (a.ProductPrice - b.ProductPrice))
                    this.setListing(list)
                    break;
                case "high-to-low":
                    list.sort((a, b) => (b.ProductPrice - a.ProductPrice))
                    this.setListing(list)
                    break;

                default:
                    break;
            }
        }
    }

    setListing(listingValue) {
        this.state.productList.splice(0, this.state.productList.length)
        this.state.productList.push(listingValue)
        this.setState({ isFilter: true })
    }

    handleShipFilter(value) {
        console.log("value handleShipFilter", value.target.name)

        if (this.props.productsListing !== undefined && this.props.productsListing.length > 0 && JSON.parse(this.props.productsListing)[0].ReturnVal === undefined) {
            let list = JSON.parse(this.props.productsListing)

            console.log("ss", list)
        }
    }

    render() {

        return (
            <div className="container-fluid block block--margin-top" style={{ paddingRight: "5rem", paddingLeft: "5rem" }}>
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
                            {

                                this.props.productCategories.map((item) => {
                                    // console.log(item.HierarchyItem)
                                    item.HierarchyItem !== null &&
                                        JSON.parse(item.HierarchyItem).map((x) => {
                                            console.log("this is the list", x)
                                        })
                                })
                            }
                            <div style={{ fontSize: '10pt' }}>
                                {this.props.productCategories.map((category) => {
                                    return (
                                        <div key={category.ProductCategory} className="sub-category-items">
                                            {
                                                this.props.match.params.selectedtype.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '') === "Category" &&
                                                    this.props.match.params.selectedtypevalue.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '') == category.ProductCategoryID ?
                                                    <div key={category.ProductCategory} className="sub-category-items active">
                                                        <DoubleArrowIcon fontSize='sm' /> {category.ProductCategory}

                                                    </div>
                                                    :
                                                    <>
                                                        <FiberManualRecordOutlinedIcon fontSize='sm'
                                                            onClick={() => window.location.href = "/shop/ProductListing/type:Category&typevalue:" + category.ProductCategoryID}
                                                        />
                                                        <label onClick={() => window.location.href = "/shop/ProductListing/type:Category&typevalue:" + category.ProductCategoryID}
                                                        >{category.ProductCategory}</label>
                                                    </>
                                            }
                                        </div>
                                    )

                                })}
                            </div>
                        </div>
                        <hr />
                        <div className="filtering-segment mt-3">
                            <div className="location-segment">
                                <div className="filter-options-label"><LocalShippingOutlinedIcon /> SHIPPED FROM</div>
                                <div>
                                    <FormControlLabel
                                        control={<GreenCheckbox checked={this.state.checked} onChange={(e) => this.handleShipFilter(e)} name="WM" />}
                                        label="West Malaysia"
                                        className="location-segment-checkboxes"
                                    />
                                    <FormControlLabel
                                        control={<GreenCheckbox checked={this.state.checked} onChange={(e) => this.handleShipFilter(e)} name="EM" />}
                                        label="East Malaysia"
                                        className="location-segment-checkboxes"
                                    />
                                    <FormControlLabel
                                        control={<GreenCheckbox checked={this.state.checked} onChange={(e) => this.handleShipFilter(e)} name="Local" />}
                                        label="Local"
                                        className="location-segment-checkboxes"
                                    />
                                    <FormControlLabel
                                        control={<GreenCheckbox checked={this.state.checked} onChange={(e) => this.handleShipFilter(e)} name="Overseas" />}
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
                        <div className="d-flex sorting-options-panel align-middle px-3 mb-2 ">
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
                            </div>
                            <div>
                                <FormControl variant="outlined" style={{ width: 200, height: 40 }} size="small" >
                                    <InputLabel id="demo-simple-select-outlined-label">Sort By</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        // value={value}
                                        onChange={(x) => this.handleSorting(x)}
                                        label="Sort By"
                                        color="primary"
                                    >
                                        {
                                            sortingOption.map((options) => {
                                                return (
                                                    <MenuItem value={options.value}>{options.label}</MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </div>
                        </div>

                        <div className="product-list container-fluid">
                            <div className="row pl-2">
                                {
                                    this.state.productList.length > 0 ?
                                        this.state.productList[0].length > 0 && this.state.productList[0] !== undefined ?
                                            this.state.productList[0].map((products) => {

                                                return (
                                                    <>
                                                        {console.log("products", products)}
                                                        <div className="products__list-item">
                                                            <ProductCard product={products}></ProductCard>
                                                        </div>
                                                    </>
                                                )
                                            })
                                            :
                                            <div className="ml-2"><i>No products for this section</i></div>
                                        :
                                        <div className="ml-2"><i>No products for this section</i></div>
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
