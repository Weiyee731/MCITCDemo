import React, { Component } from "react";
import { connect } from "react-redux";
import { GitAction } from "../../store/action/gitAction";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./styles/AllProductCategory.css"
import { Rowing } from "@mui/icons-material";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    Row,
    Col,
} from "reactstrap";

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
        return (
            <div className="container px-5 mt-5 block--margin-top">
                {
                    // level 1

                    this.props.productCategories.map((el, idx) => {
                        return (
                            // <div className="row mb-5">
                            //     <div className="col-md-2 col-xs-2 col-2">
                            <Row style={{ paddingTop: "50px" }}>
                                <Col lg="2" >
                                    <div className="text-center category-item">
                                        <img src={el.ProductCategoryImage} alt={el.ProductCategory} width="150px" height="150px" onClick={(e) => {
                                            window.location.href = "/shop/ProductListing/type:Category&typevalue:" + el.ProductCategoryID
                                            // window.location.href = "/shop/ProductCategory/" + el.ProductCategoryID + "/" + el.ProductCategory 
                                        }} />
                                        <br />
                                        {el.ProductCategory}

                                    </div>
                                </Col>
                                {/* <div className="col-md-10 col-xs-10 col-10"> */}
                                <Col lg="10">
                                    <Row>
                                        {
                                            el.HierarchyItem === null
                                                ?
                                                <>
                                                    <Col lg="3">
                                                        <label onClick={(e) => {
                                                            window.location.href = "/shop/ProductListing/type:Category&typevalue:" + el.ProductCategoryID
                                                            // window.location.href = "/shop/ProductCategory/" + el.ProductCategoryID + "/" + el.ProductCategory
                                                        }}>{el.ProductCategory}</label>
                                                    </Col>

                                                </>
                                                : JSON.parse(el.HierarchyItem).map(ml => {
                                                    return (
                                                        <>
                                                            {ml.HierarchyItem === null
                                                                ?
                                                                <>
                                                                    <Col lg="3">
                                                                        <label className="category-item-select" onClick={(e) => {
                                                                            window.location.href = "/shop/ProductListing/type:Category&typevalue:" + ml.ProductCategoryID
                                                                            // window.location.href = "/shop/ProductCategory/" + el.ProductCategoryID + "/" + el.ProductCategory + "/" + ml.ProductCategoryID + "/" + ml.ProductCategory 
                                                                        }}>{ml.ProductCategory}</label>
                                                                    </Col>

                                                                </>
                                                                // </div>
                                                                : JSON.parse(ml.HierarchyItem).map((cl, idx) => {
                                                                    return (
                                                                        <>
                                                                            <Col lg="3">
                                                                                {
                                                                                    cl.HierarchyID < 3 ?
                                                                                        <label onClick={(e) => {
                                                                                            window.location.href = "/shop/ProductListing/type:Category&typevalue:" + cl.ProductCategoryID
                                                                                            // window.location.href = "/shop/ProductCategory/" + el.ProductCategoryID + "/" + el.ProductCategory + "/" + cl.ProductCategoryID + "/" + cl.ProductCategory 
                                                                                        }}> {cl.ProductCategory}</label>
                                                                                        : cl.ProductCategory
                                                                                }
                                                                            </Col>
                                                                        </>
                                                                    )
                                                                })}

                                                        </>
                                                    )
                                                })
                                        }
                                    </Row>
                                </Col>
                            </Row>
                        )
                    })
                }
                <hr />

            </div >
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlockAllProductCategory);