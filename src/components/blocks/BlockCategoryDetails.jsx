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

// styles
import './styles/BlockCategoryDetails.css'

function mapStateToProps(state) {
    return {
        productCategories: state.counterReducer["productCategories"], // with sub hierarchy item
    };
}

function mapDispatchToProps(dispatch) {
    return {
        CallAllProductCategoryListing: () => dispatch(GitAction.CallAllProductCategoryListing()),
    };
}

const initialState = {
    selectedCategory: [],
    productSubCategories: [],
    selectedSubCategory: ""
}

class BlockCategoryDetails extends Component {
    constructor(props) {
        super(props);

        this.state = initialState;

        // this.props.CallAllProductCategoryListing()
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
        console.log(this.props.productCategories)
        return (
            <div>
                <div style={{ marginTop: "8rem" }}>
                    <BlockSlideShow />
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-md-4 col-12">
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

                            <div className="filtering-segment mt-3">
                                <div className="location-segment">
                                    <div><LocalShippingOutlinedIcon /> SHIPPED FROM</div>

                                    <div>

                                    </div>
                                </div>

                                <div className="prices-segment mt-3">
                                    <div><MonetizationOnOutlinedIcon /> PRICE</div>

                                    <div className="d-flex w-75">
                                        <TextField className="mr-auto" label="MIN" variant="outlined" size="small" style={{ width: 100, height: 40, fontSize: '8pt' }} ></TextField>
                                        <span className="mx-2 my-auto"> - </span>
                                        <TextField className="ml-auto" label="MAX" variant="outlined" size="small" style={{ width: 100, height: 40, fontSize: '8pt' }} ></TextField>

                                    </div>
                                    <Button variant="contained" color="primary" disableElevation className="w-75" style={{ backgroundColor: 'rgb(153, 188, 59)' }}>
                                        Filter Price
                                    </Button>
                                </div>

                                <div className="brand-segment mt-3">
                                    <div><LocalOfferOutlinedIcon /> BRANDS</div>

                                    <div>

                                    </div>
                                </div>

                                <div className="rating-segment mt-3">
                                    <div><LocalOfferOutlinedIcon /> PROMOTION</div>

                                    <div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8 col-12">

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlockCategoryDetails);
