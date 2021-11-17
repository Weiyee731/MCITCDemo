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
    return (
      <div className="container mt-5">
        {
          this.props.productCategories.map((el, idx) => {
            return (
              <div className="row mb-5" key={idx}>
                <div className="col-md-2 col-xs-2 col-2">
                  <div className="text-center category-item">
                    <img src={el.ProductCategoryImage} alt={el.ProductCategory} width="100%" height="auto" onClick={(e) => {
                      window.location.href = "/Emporia/shop/ProductListing/type:Category&typevalue:" + el.ProductCategoryID
                    }} />
                    <br />
                    {el.ProductCategory}
                  </div>
                </div>
                <div className="col-md-10 col-xs-10 col-10">
                  <div className="row">
                    {
                      el.HierarchyItem === null ?
                        <Link
                          className="col-auto mr-2 mb-2 category-item"
                          style={{
                            cursor: "pointer"
                          }}
                          to={`/shop/ProductListing/type:Category&typevalue:${el.ProductCategoryID}`}
                        >
                          {el.ProductCategory}
                        </Link>
                        : JSON.parse(el.HierarchyItem).map(ml => {
                          return (
                            ml.HierarchyItem === null ?
                              <Link
                                className="col-auto mr-2 mb-2 category-item"
                                style={{
                                  cursor: "pointer"
                                }}
                                to={`shop/ProductListing/type:Category&typevalue:${ml.ProductCategoryID}`}
                              >
                                {ml.ProductCategory}
                              </Link>
                              : JSON.parse(ml.HierarchyItem).map((cl, idx) => {
                                return (
                                  <Link
                                    className="col-auto mr-2 mb-2 category-item"
                                    style={{
                                      cursor: "pointer"
                                    }}
                                    to={`shop/ProductListing/type:Category&typevalue:${cl.ProductCategoryID}`}
                                  >
                                    {cl.ProductCategory}
                                  </Link>
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
      </div >
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlockAllProductCategory);