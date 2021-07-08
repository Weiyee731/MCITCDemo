import React, { Component, useMemo } from "react";
import { connect } from "react-redux";
import { GitAction } from "../../store/action/gitAction";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// blocks
import BlockSlideShow from '../blocks/BlockSlideShow';

// components
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';

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
                    console.log(subCategories)
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
                                <div>

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