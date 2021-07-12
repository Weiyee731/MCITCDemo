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
        CallAllProducts: () => dispatch(GitAction.CallAllProducts()),
    };
}

const initialState = {
    selectedCategory: [],
    productSubCategories: [],
    selectedSubCategory: ""
}

const GreenCheckbox = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);

class BlockCategoryDetails extends Component {
    constructor(props) {
        super(props);

        this.state = initialState;
        this.props.CallAllProducts();
    }

    componentDidMount() {
        if (Array.isArray(this.props.productCategories) && this.props.productCategories.length === 0) {
            this.props.CallAllProductCategoryListing();
        }
        else {
            console.log(this.props.match.params.categorySlug)
            let selectedCategory = this.props.productCategories.filter(el => el.ProductCategory === this.props.match.params.categorySlug)

            try {
                if (selectedCategory.length > 0) {
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
            catch (e) {
                console.log(e);
                this.setState({
                    productSubCategories: [],
                })
            }
        }
    }

    componentDidUpdate(prevProps) {

    }

    render() {
        console.log(this.props.products)
        return (
            <div className="container-fluid px-5 block--margin-top">
                <div className="row">
                    <div className="col-md-2 col-12">
                        <div className="category-segment">
                            <div style={{ cursor: "pointer", fontWeight: 600 }}>
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
                                <div><LocalShippingOutlinedIcon /> SHIPPED FROM</div>
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
                                <div><MonetizationOnOutlinedIcon /> PRICE</div>

                                <div className="d-flex w-75 mt-1">
                                    <TextField className="mr-auto" label="MIN" variant="outlined" size="small" style={{ width: 100, height: 40, fontSize: '8pt' }} ></TextField>
                                    <span className="mx-2 my-auto"> - </span>
                                    <TextField className="ml-auto" label="MAX" variant="outlined" size="small" style={{ width: 100, height: 40, fontSize: '8pt' }} ></TextField>

                                </div>
                                <Button variant="contained" color="primary" disableElevation className="w-75 mt-1" style={{ backgroundColor: 'rgb(153, 188, 59)' }}>
                                    Filter Price
                                </Button>
                            </div>

                            <hr />

                            <div className="promotion-segment mt-3">
                                <div><LocalOfferOutlinedIcon /> PROMOTION</div>
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
                                <div><StarBorderOutlinedIcon /> RATINGS</div>
                                <div>
                                    <div className="d-flex mb-1">
                                        <Rating name="read-only" value={5} readOnly size="small" />
                                    </div>
                                    <div className="d-flex">
                                        <Rating name="read-only" value={4} readOnly size="small" />
                                        <Typography component="legend"> & above</Typography>
                                    </div>
                                    <div className="d-flex">
                                        <Rating name="read-only" value={3} readOnly size="small" />
                                        <Typography component="legend"> & above</Typography>
                                    </div>
                                    <div className="d-flex">
                                        <Rating name="read-only" value={2} readOnly size="small" />
                                        <Typography component="legend"> & above</Typography>
                                    </div>
                                    <div className="d-flex">
                                        <Rating name="read-only" value={1} readOnly size="small" />
                                        <Typography component="legend"> & above</Typography>
                                    </div>
                                </div>
                            </div>
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
                            <div className="row row-cols-5">
                                {
                                    this.props.products.length > 0
                                        ?
                                        this.props.products.map((el, idx) => {
                                            return (
                                                <div className="col mb-3">
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
