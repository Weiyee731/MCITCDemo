import React, { Component } from "react";
import { connect } from "react-redux";
import { GitAction } from "../../store/action/gitAction";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./styles/AllProductCategory.css"

function mapStateToProps(state) {
    return {
        productCategories: state.counterReducer["productCategories"], // with sub hierarchy item
        loading: state.counterReducer["loading"],
    };
}

function mapDispatchToProps(dispatch) {
    return {
        CallAllProductCategoryListing: () => dispatch(GitAction.CallAllProductCategoryListing()),
    };
}

const initial_state = {

}

class BlockAllProductCategory extends Component {
    constructor(props) {
        super(props)
        this.state = initial_state;
    }

    componentDidMount() {
        this.props.CallAllProductCategoryListing();
    }

    render() {
        console.log(this.props.productCategories)

        return (
            <div className="container px-5 block--margin-top">
                {
                    // level 1
                    this.props.productCategories.map((el, idx) => {
                        return (
                            <div className="row mb-5">
                                <div className="col-md-2 col-xs-2 col-2">
                                    <div className="text-center category-item">
                                        <img src={el.ProductCategoryImage} alt={el.ProductCategory} width="150px" height="150px" />
                                        <br />
                                        {el.ProductCategory}
                                    </div>
                                </div>

                                <div className="col-md-10 col-xs-10 col-10">
                                    <div className="row">
                                        {
                                            el.HierarchyItem === null
                                                ? <div className="col-auto mr-2 mb-2 category-item" style={{cursor: "pointer"}} >{el.ProductCategory}</div>
                                                : JSON.parse(el.HierarchyItem).map(el => {
                                                    return (
                                                        el.HierarchyItem === null
                                                            ? <div className="col-auto mr-2 mb-2 category-item" style={{cursor: "pointer"}}>{el.ProductCategory}</div>
                                                            : JSON.parse(el.HierarchyItem).map((el, idx) => {
                                                                return (
                                                                    <div className="col-auto mr-2 mb-2 category-item" style={{cursor: "pointer"}}>{el.ProductCategory}</div>
                                                                )
                                                            })
                                                    )
                                                })
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                <hr />

            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlockAllProductCategory);