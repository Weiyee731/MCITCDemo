import React, { Component, useEffect, useState } from "react";
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
import { Link } from "react-router-dom";
import moment from 'moment';
import theme from '../../data/theme';
import PageHeader from '../shared/PageHeader';
import { Helmet } from 'react-helmet-async';
// styles
import './styles/BlockListingDetails.css'
import ProductCard from "../shared/ProductCard";
import { toast } from "react-toastify";
import classNames from "classnames";
import { findAllByDisplayValue } from "@testing-library/dom";

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
        // shippedFrom_checkbox: [false, false, false, false],
        minPrice: 0,
        maxPrice: 0,
        promotion_checkbox: [false, false, false],
        rating: 1
    },
    isDataBind: false,
    isFilter: false,
    isShippingFilter: false,
    shippedFrom_checkbox: [false, false, false, false],

    categoryHierachy: 0,
    CategoryHierachyListing: [],
    ParentCategory: [],
    categoryName: "",

    breadcrumb: [
        { title: "Home", url: "" },
        { title: "Main Category", url: "/shop/AllProductCategory/" },
    ],

    // for tourism demo purpose
    dummyData: [
        {
            ProductImage: "https://pix8.agoda.net/hotelImages/4043634/-1/7a10fcb85f6dbf33386d58e198e466c2.jpg?ca=20&ce=0&s=1024x768",
            ProductName: "Kingwood Hotel Sibu",
            ProductRating: 5,
            review: "1048",
            desc: "Kingwood Hotel Sibu is one of the best choices to stay at in Sibu. With its ideal location by the Rejang River, guests can enjoy a leisure stay with one of the best view that Sibu has to offer. The hotel is the biggest in Sibu, and offers guests with an array of facilities such as free WiFi, a restaurant and an outdoor pool. Guests can also enjoy the on-site restaurant and free private parking. All rooms are equipped with a private bathroom, and tourists can choose to have either a city view or a river view. Needless to say, both views are spectacular so guests will definitely enjoy their stay at Kingwood Hotel Sibu.",
            ProductPrice: "129",
            ShopState: "Sibu",
            url: "https://www.sarawak2discover.com/PlaceDetail.aspx?pid=37&plat=2.283430000000000&plng=111.832617000000000"
        },
        {
            ProductImage: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/124344871.jpg?k=82daced0f7392440064c6ec25622e0d0154f02c62a2c885d96103c320273befe&o=&hp=1",
            ProductName: "Tune Hotel - Waterfront Kuching",
            ProductRating: 4.5,
            review: "2254",
            desc: "Kingwood Hotel Sibu is one of the best choices to stay at in Sibu. With its ideal location by the Rejang River, guests can enjoy a leisure stay with one of the best view that Sibu has to offer. The hotel is the biggest in Sibu, and offers guests with an array of facilities such as free WiFi, a restaurant and an outdoor pool. Guests can also enjoy the on-site restaurant and free private parking. All rooms are equipped with a private bathroom, and tourists can choose to have either a city view or a river view. Needless to say, both views are spectacular so guests will definitely enjoy their stay at Kingwood Hotel Sibu.",
            ProductPrice: "119",
            ShopState: "Kuching",
            url: "https://www.sarawak2discover.com/PlaceDetail.aspx?pid=59&plat=1.557412000000000&plng=110.350804000000000"
        },
        {
            ProductImage: "https://pix8.agoda.net/hotelImages/945/9454621/9454621_19083016430080293179.jpg?ca=9&ce=1&s=1024x768",
            ProductName: "Roxy Hotel Kuching",
            ProductRating: 5,
            review: "2958",
            desc: "Kingwood Hotel Sibu is one of the best choices to stay at in Sibu. With its ideal location by the Rejang River, guests can enjoy a leisure stay with one of the best view that Sibu has to offer. The hotel is the biggest in Sibu, and offers guests with an array of facilities such as free WiFi, a restaurant and an outdoor pool. Guests can also enjoy the on-site restaurant and free private parking. All rooms are equipped with a private bathroom, and tourists can choose to have either a city view or a river view. Needless to say, both views are spectacular so guests will definitely enjoy their stay at Kingwood Hotel Sibu.",
            ProductPrice: "149",
            ShopState: "Kuching",
            url: "https://www.sarawak2discover.com/PlaceDetail.aspx?pid=37&plat=2.283430000000000&plng=111.832617000000000"
        }
    ],

    dummyData2: [
        {
            ProductImage: "https://miro.medium.com/max/1400/0*joLFxl3aEXlREffU.jpg",
            ProductName: "World Musical Festival",
            ProductRating: 5,
            review: "3690",
            desc: "The Rainforest World Music Festival (often abbreviated as RWMF) is an annual three-day music festival celebrating the diversity of world music, held in Kuching, Sarawak, Malaysia, with daytime music workshops, cultural displays, craft displays, food stalls, and main-stage evening concerts.",
            ProductPrice: "103",
            ShopState: "Buy",
        }, {
            ProductImage: "https://360tour.asia/wp-content/uploads/2017/03/theborneohousemuseumlogo-400x200.jpg",
            ProductName: "Borneo House Museum",
            ProductRating: 4.6,
            review: "2800",
            desc: "The Sarawak State Museum is the oldest museum in Borneo. It was founded in 1888 and opened in 1891 in a purpose-built building in Kuching, Sarawak.",
            ProductPrice: "29",
            ShopState: "Buy"
        },
        {
            ProductImage: "https://visitingmalaysiablog.files.wordpress.com/2014/08/7.jpg",
            ProductName: "Sarawak Cultural Village",
            ProductRating: 4.8,
            review: "2200",
            desc: "17-acre site exploring local ethnic groups via longhouse replicas, programs & cultural performances.",
            ProductPrice: "129",
            ShopState: "Buy",
        },
        {
            ProductImage: "https://sarawaktourism.com/v2/wp-content/uploads/2014/09/Semenggoh1.png",
            ProductName: "Samunsam Wildlife Sanctuary",
            ProductRating: 4.5,
            review: "1060",
            desc: "Sarawak Forestry Corporation (SFC) is a statutory body of the Sarawak Government formed under Sarawak Forestry Corporation Ordinance, 1995. Our main functions are to manage Totally Protected Areas (TPAs) and to conserve Biodiversity of Sarawak. We have been entrusted to protect the wildlife of Sarawak, particularly the totally protected and protected species.",
            ProductPrice: "68",
            ShopState: "Buy",
        }
    ]
}

// const [shippedFrom_checkbox, setShipCheckBox] = useState([false, false, false, false]);

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
            userId: localStorage.getItem("isLogin") !== false ? 0 : localStorage.getItem("id"),
            productPage: 999,
            page: 1
        })

        this.handleFilterOption = this.handleFilterOption.bind(this)
        this.processUrl = this.processUrl.bind(this)
        this.handleShipFilter = this.handleShipFilter.bind(this)
        this.resetFilter = this.resetFilter.bind(this)
        this.setListing = this.setListing.bind(this)
        this.checkFilterStatus = this.checkFilterStatus.bind(this)
        this.handleSorting = this.handleSorting.bind(this)
        this.handleShippingList = this.handleShippingList.bind(this)
    }

    processUrl(ProductCategoryID) {
        return ("/shop/ProductListing/type:Category&typevalue:" + ProductCategoryID)
    }


    componentDidMount() {
        this.props.CallAllProductCategoryListing();
        this.props.productsListing !== undefined && this.props.productsListing.length > 0 && JSON.parse(this.props.productsListing)[0].ReturnVal === undefined &&
            this.state.productList.push(JSON.parse(this.props.productsListing))

        let tempCategoryHierachy = 0
        let breadcrumb = this.state.breadcrumb
        if (this.props.match.params.selectedtype.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '') == "Category" && this.state.categoryHierachy === 0) {

            this.props.productCategories.map((category) => {
                if (category.ProductCategoryID == this.props.match.params.selectedtypevalue.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')) {
                    this.setState({
                        categoryHierachy: 1,
                        breadcrumb: [...breadcrumb, ...[
                            { title: [category.ProductCategory], url: this.processUrl(category.ProductCategoryID) },
                        ]]
                    })
                    tempCategoryHierachy = 1
                }
            })
            if (tempCategoryHierachy === 1) {
                this.state.CategoryHierachyListing.push(this.props.productCategories)
            }

            if (tempCategoryHierachy === 0 && tempCategoryHierachy !== 1) {
                this.props.productCategories.map((categoryList) => {
                    categoryList.HierarchyItem !== null && categoryList.HierarchyItem !== undefined &&
                        JSON.parse(categoryList.HierarchyItem).map((category) => {
                            if (category.ProductCategoryID == this.props.match.params.selectedtypevalue.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')) {
                                this.setState({ categoryHierachy: 2 })
                                this.setState({
                                    categoryName: category.ProductCategory,
                                    breadcrumb: [...breadcrumb, ...[
                                        { title: [categoryList.ProductCategory], url: this.processUrl(categoryList.ProductCategoryID) },
                                        { title: [category.ProductCategory], url: this.processUrl(category.ProductCategoryID) },
                                    ]]
                                })
                                tempCategoryHierachy = 2
                                this.state.ParentCategory.push(categoryList)
                            }
                        })
                    if (tempCategoryHierachy === 2) {
                        this.state.CategoryHierachyListing.push(JSON.parse(categoryList.HierarchyItem))
                    }
                })
            }

            if (tempCategoryHierachy === 0 && tempCategoryHierachy !== 1 && tempCategoryHierachy !== 2) {
                this.props.productCategories.map((categoryListing) => {
                    categoryListing.HierarchyItem !== null && categoryListing.HierarchyItem !== undefined &&
                        JSON.parse(categoryListing.HierarchyItem).map((categoryList) => {
                            categoryList.HierarchyItem !== null && categoryList.HierarchyItem !== undefined &&
                                JSON.parse(categoryList.HierarchyItem).map((category) => {
                                    if (category.ProductCategoryID == this.props.match.params.selectedtypevalue.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')) {
                                        this.setState({ categoryHierachy: 3 })
                                        this.setState({
                                            categoryName: category.ProductCategory,
                                            breadcrumb: [...breadcrumb, ...[
                                                { title: [categoryListing.ProductCategory], url: this.processUrl(categoryListing.ProductCategoryID) },
                                                { title: [categoryList.ProductCategory], url: this.processUrl(categoryList.ProductCategoryID) },
                                                { title: [category.ProductCategory], url: this.processUrl(category.ProductCategoryID) },
                                            ]]
                                        })
                                        tempCategoryHierachy = 3
                                        this.state.ParentCategory.push(categoryList)
                                    }
                                })

                            if (tempCategoryHierachy === 3) {
                                this.state.CategoryHierachyListing.push(JSON.parse(categoryList.HierarchyItem))
                            }
                        })
                })
            }
        }
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

        if (prevProps.location.pathname !== this.props.location.pathname)
            window.location.href = this.props.location.pathname


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
            let isStringExist = false
            let listToCheck = []
            let tempArray = []

            list.map((x) => {
                if (x.ProductPrice.includes("-")) {
                    listToCheck.push(x)
                    isStringExist = true
                }
            })

            if (!isNaN(minPrice) && !isNaN(maxPrice)) {
                if (minPrice > maxPrice) {
                    list = list.filter(el => el.ProductSellingPrice > minPrice)

                    if (isStringExist === true) {
                        listToCheck.map((x) => {
                            let isValid = false

                            if (x.ProductPrice.split("-").filter(el => el > minPrice))
                                isValid = true

                            if (isValid === true)
                                tempArray.push(x)
                        })
                        list = [...list, ...tempArray]
                    }

                    this.setListing(list)
                }
                else if (minPrice < 0 && maxPrice < 0) {
                    toast.error("Please set a correct value to filter")
                }
                else {
                    list = list.filter(el => el.ProductPrice >= minPrice && el.ProductPrice <= maxPrice)

                    if (isStringExist === true) {
                        listToCheck.map((x) => {
                            let isValid = false

                            if (x.ProductPrice.split("-").filter(el => el >= minPrice && el <= maxPrice).length > 0)
                                isValid = true

                            if (isValid === true)
                                tempArray.push(x)
                        })
                        list = [...list, ...tempArray]
                    }
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
            // let list = JSON.parse(this.props.productsListing).filter((x) => !x.ProductPrice.includes("-"))
            // let tempList = JSON.parse(this.props.productsListing).filter((x) => x.ProductPrice.includes("-"))

            switch (options.target.value) {
                case "latest":
                    list.sort((a, b) => (moment(a.CreatedDate).format("YYYYMMDD") - moment(b.CreatedDate).format("YYYYMMDD")))
                    this.setListing(list)
                    break;
                case "top-sales":
                    list.sort((a, b) => (a.ProductSold - b.ProductSold))
                    this.setListing(list)
                    break;
                case "low-to-high":

                    list.sort((a, b) => (a.ProductPrice - b.ProductPrice))

                    // if (tempList.length > 0) {
                    //     tempList.map((x) => {
                    //         console.log(x.ProductPrice.split("-")[0])
                    //     })
                    // }
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

        if (this.props.productsListing !== undefined && this.props.productsListing.length > 0 && JSON.parse(this.props.productsListing)[0].ReturnVal === undefined) {
            let list = JSON.parse(this.props.productsListing)

            switch (value) {
                case "WM":
                    this.checkFilterStatus(0)

                    break;
                case "EM":
                    this.checkFilterStatus(1)

                    break;
                case "Local":
                    this.checkFilterStatus(2)

                    break;
                case "Overseas":
                    this.checkFilterStatus(3)

                    break;

                default:
                    break;
            }
        }
    }

    checkFilterStatus(index) {

        let checkBox = false
        if (this.state.shippedFrom_checkbox[index] === true) {
            this.state.shippedFrom_checkbox[index] = false

            this.state.shippedFrom_checkbox.filter(x => x === true).map((filtered) => {
                checkBox = true
            })

            if (checkBox === true) {
                this.handleShippingList()
            }
            else {
                this.setListing(JSON.parse(this.props.productsListing))
            }
        }

        else {
            this.state.shippedFrom_checkbox[index] = true
            this.handleShippingList()
        }
    }

    handleShippingList() {
        let oriList = JSON.parse(this.props.productsListing)
        let tempFilterList = []
        let Listing = []
        let jointArray = []

        this.state.shippedFrom_checkbox.map((shipped, index) => {
            if (shipped === true) {
                switch (index) {
                    case 0:
                        tempFilterList = oriList.filter(el => el.ProductWestMalaysiaInd === 1 && el.ProductLocalInd === 0)
                        Listing.push(tempFilterList)
                        Listing = [...Listing, tempFilterList]
                        break;
                    case 1:
                        tempFilterList = oriList.filter(el => el.ProductWestMalaysiaInd === 0 && el.ProductLocalInd === 0)
                        Listing = [...Listing, tempFilterList]
                        break;
                    case 2:
                        tempFilterList = oriList.filter(el => el.ProductLocalInd === 0)
                        Listing = [...Listing, tempFilterList]
                        break;
                    case 3:
                        tempFilterList = oriList.filter(el => el.ProductLocalInd === 1)
                        Listing = [...Listing, tempFilterList]
                        break;

                    default:
                        break;
                }
            }
        })


        Listing.forEach(array => {
            jointArray = [...jointArray, ...array]
        });
        const filterList = jointArray.filter((val, id, array) => {
            return array.indexOf(val) == id;
        });
        this.setListing(filterList)
    }

    render() {
        const { loading } = this.props;
        const blockClasses = classNames("block-products__list-item", {
            "block-products-carousel--loading": loading,
        });

        console.log(this.props.match.params.selectedtypevalue === ":3")

        return (
            <React.Fragment>
                {/* <Helmet>
                    <title>{`Category — ${theme.name}`}</title>
                </Helmet> */}

                {/* <PageHeader header="Category" breadcrumb={this.state.breadcrumb} /> */}
                <div className="container mt-2">
                    <div className="row">
                        <div className="col-lg-3 col-md-3 ">
                            <div className="category-segment ">
                                {/* <div
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
                            </div> */}
                                {/* <div className="sub-title" >
                                    <Link to="/shop/AllProductCategory/">
                                        <FormatListBulletedIcon /> All Categories
                                    </Link>
                                </div>
                                {
                                    this.state.categoryHierachy === 2 || this.state.categoryHierachy === 3 || this.state.categoryHierachy === 4 &&
                                    <div>
                                        <label onClick={() => window.location.href = "/shop/ProductListing/type:Category&typevalue:" + this.state.ParentCategory[0].ProductCategoryID}>
                                            {this.state.ParentCategory !== null && this.state.ParentCategory[0] !== undefined && this.state.ParentCategory[0].ProductCategory}
                                        </label>
                                    </div>
                                }
                                <div>
                                    {this.state.CategoryHierachyListing.length > 0 && this.state.CategoryHierachyListing[0] !== null &&
                                        this.state.CategoryHierachyListing[0].map((category) => {
                                            return (
                                                <div key={category.ProductCategory} className="sub-category-items">
                                                    {
                                                        this.props.match.params.selectedtype.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '') === "Category" &&
                                                            this.props.match.params.selectedtypevalue.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '') == category.ProductCategoryID ?
                                                            <>
                                                                <div key={category.ProductCategory} className="sub-category-items active">
                                                                    <DoubleArrowIcon fontSize='sm' /> <label className="sub-label-active" >{category.ProductCategory}</label>
                                                                </div>
                                                                {
                                                                    category.HierarchyItem !== null && JSON.parse(category.HierarchyItem).map((items) => {
                                                                        return (
                                                                            <>
                                                                                {
                                                                                    this.state.categoryHierachy === 1 || this.state.categoryHierachy === 2 ?
                                                                                        <div key={items.ProductCategory} className="sub-category-items " style={{ fontWeight: "200", paddingLeft: "30px" }}>
                                                                                            <FiberManualRecordOutlinedIcon
                                                                                                onClick={() => window.location.href = "/shop/ProductListing/type:Category&typevalue:" + items.ProductCategoryID}
                                                                                            />
                                                                                            <label className="sub-label" onClick={() => window.location.href = "/shop/ProductListing/type:Category&typevalue:" + items.ProductCategoryID}
                                                                                            >{items.ProductCategory}</label>
                                                                                        </div>
                                                                                        : ""
                                                                                }
                                                                            </>
                                                                        )
                                                                    })
                                                                }
                                                            </> :
                                                            <>
                                                                <FiberManualRecordOutlinedIcon
                                                                    onClick={() => window.location.href = "/shop/ProductListing/type:Category&typevalue:" + category.ProductCategoryID}
                                                                />
                                                                <label className="sub-label" onClick={() => window.location.href = "/shop/ProductListing/type:Category&typevalue:" + category.ProductCategoryID}
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
                                            control={<GreenCheckbox checked={this.state.checked} onChange={(e) => this.handleShipFilter("WM")} name="WM" />}
                                            label="West Malaysia"
                                            className="location-segment-checkboxes"
                                        />
                                        <FormControlLabel
                                            control={<GreenCheckbox checked={this.state.checked} onChange={(e) => this.handleShipFilter("EM")} name="EM" />}
                                            label="East Malaysia"
                                            className="location-segment-checkboxes"
                                        />
                                        <FormControlLabel
                                            control={<GreenCheckbox checked={this.state.checked} onChange={(e) => this.handleShipFilter("Local")} name="Local" />}
                                            label="Local"
                                            className="location-segment-checkboxes"
                                        />
                                        <FormControlLabel
                                            control={<GreenCheckbox checked={this.state.checked} onChange={(e) => this.handleShipFilter("Overseas")} name="Overseas" />}
                                            label="Overseas"
                                            className="location-segment-checkboxes"
                                        />
                                    </div>
                                </div>

                                <hr /> */}

                                <div className="prices-segment mt-3">
                                    <div className="filter-options-label"><MonetizationOnOutlinedIcon /> PRICE</div>

                                    <div className="d-flex">
                                        <TextField id="min-price" className="mr-auto" label="MIN" variant="outlined" size="small" style={{ width: 100, height: 40, fontSize: '8pt' }} onChange={e => this.handleFilterOption(e)} ></TextField>
                                        <span className="mx-2 my-auto"> - </span>
                                        <TextField id="max-price" className="ml-auto" label="MAX" variant="outlined" size="small" style={{ width: 100, height: 40, fontSize: '8pt' }} onChange={e => this.handleFilterOption(e)} ></TextField>
                                    </div>
                                    {/* <Button id="filter-price-button" variant="contained" color="primary" width="100%" disableElevation className="mt-1" style={{ backgroundColor: '#2b535d' }} onClick={() => this.handleFilterPriceButton()}>
                                        Filter Price
                                    </Button> */}
                                    <div className="d-flex" style={{ paddingTop: "15px" }}>
                                        <Button variant="contained" color="primary" disableElevation style={{ backgroundColor: '#2b535d', width: "100%" }} onClick={() => this.handleFilterPriceButton()}> Filter Price</Button>
                                    </div>
                                </div>

                                {/* <hr />

                                <div className="promotion-segment mt-3">
                                    <div className="filter-options-label"><LocalOfferOutlinedIcon /> PROMOTION</div>
                                    <div>
                                        <FormControlLabel
                                            control={<GreenCheckbox checked={this.state.checked} name="Mega Sales" />}
                                            label="Mega Sales 40% Off"
                                            className="location-segment-checkboxes"
                                        />
                                        <FormControlLabel
                                            control={<GreenCheckbox checked={this.state.checked} name="20% Off" />}
                                            label="RM15 Free Shipping"
                                            className="location-segment-checkboxes"
                                        />
                                        <FormControlLabel
                                            control={<GreenCheckbox checked={this.state.checked} name="20% Off" />}
                                            label="Wholesale Price"
                                            className="location-segment-checkboxes"
                                        />
                                    </div>
                                </div> */}

                                <hr />

                                <div className="rating-segment mt-3">
                                    <div className="filter-options-label"><StarBorderOutlinedIcon /> RATINGS</div>
                                    <div>
                                        <div id="fllter-5-stars" className="d-flex mb-2 rating-background" style={{ cursor: 'pointer' }} onClick={(e) => this.handleFilterOption(e)}>
                                            <Rating name="read-only" value={5} readOnly size="small" />
                                        </div>
                                        <div id="fllter-4-stars" className="d-flex mb-1 rating-background" style={{ cursor: 'pointer' }} onClick={(e) => this.handleFilterOption(e)}>
                                            <Rating name="read-only" value={4} readOnly size="small" />
                                            <Typography component="legend"> & above</Typography>
                                        </div>
                                        <div id="fllter-3-stars" className="d-flex mb-1 rating-background" style={{ cursor: 'pointer' }} onClick={(e) => this.handleFilterOption(e)}>
                                            <Rating name="read-only" value={3} readOnly size="small" />
                                            <Typography component="legend"> & above</Typography>
                                        </div>
                                        <div id="fllter-2-stars" className="d-flex mb-1 rating-background" style={{ cursor: 'pointer' }} onClick={(e) => this.handleFilterOption(e)} >
                                            <Rating name="read-only" value={2} readOnly size="small" />
                                            <Typography component="legend"> & above</Typography>
                                        </div>
                                        <div id="fllter-1-stars" className="d-flex mb-1 rating-background" style={{ cursor: 'pointer' }} onClick={(e) => this.handleFilterOption(e)}>
                                            <Rating name="read-only" value={1} readOnly size="small" />
                                            <Typography component="legend"> & above</Typography>
                                        </div>
                                        <div id="fllter-no-stars" className="d-flex mb-1 rating-background" style={{ cursor: 'pointer' }} onClick={(e) => this.handleFilterOption(e)}>
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
                        <div className="col-lg-9 col-md-9 ">
                            <div className="d-flex sorting-options-panel align-middle px-3 mb-2 ">
                                {/* <div className="flex-grow-1 d-flex my-auto">
                                    {
                                        this.state.categoryHierachy === 1 && this.props.match.params.selectedtype.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '') === "Category" &&

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
                                        this.state.categoryHierachy === 2 || this.state.categoryHierachy === 3 || this.state.categoryHierachy === 4 ?
                                            <div className="sorting-option-label">
                                                Category - {this.state.categoryName}
                                            </div>
                                            : ""
                                    }
                                    {
                                        this.props.match.params.selectedtype.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '') === "Keyword" &&
                                        <div className="sorting-option-label">
                                            Keyword Search - {this.props.match.params.selectedtypevalue.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')}
                                        </div>
                                    }
                                </div> */}
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

                            {/* <div className="product-list container-fluid">
                                <div className="row pl-2"> */}


                            <div className="container">
                                <div className="row">
                                    {/* {
                                        this.state.productList.length > 0 ?
                                            this.state.productList[0].length > 0 && typeof this.state.productList[0] !== undefined ?
                                                this.state.productList[0].map((products, index) => {

                                                    return (
                                                        <div key={index} className="block-products__list-item">
                                                            <ProductCard product={products}></ProductCard>
                                                        </div>

                                                    )
                                                })
                                                :
                                                <div className="ml-2"><i>No products for this section</i></div>
                                            :
                                            <div className="ml-2"><i>No products for this section</i></div>
                                    } */}

                                    {
                                        this.state.dummyData.length > 0 && this.props.match.params.selectedtypevalue === ":3" &&
                                        this.state.dummyData.map((products, index) => {

                                            return (
                                                <div key={index} className="block-products__list-item">
                                                    <ProductCard product={products}></ProductCard>
                                                </div>

                                            )
                                        })
                                    }

                                    {
                                        this.state.dummyData2.length > 0 && this.props.match.params.selectedtypevalue === ":4" &&
                                        this.state.dummyData2.map((products, index) => {

                                            return (
                                                <div key={index} className="block-products__list-item">
                                                    <ProductCard product={products}></ProductCard>
                                                </div>

                                            )
                                        })
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </React.Fragment>
        )
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(BlockListingDetails);
