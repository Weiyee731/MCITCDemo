// react
import React, { Component } from "react";
import { connect } from "react-redux";
import { GitAction } from "../../store/action/gitAction";

// third-party
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { url } from "../../services/utils";

// application
import BlockHeader from "../shared/BlockHeader";
import tester from "../../assets/user.jpg";

function mapStateToProps(state) {
  return {
    productCategories: state.counterReducer["productCategories"], // with sub hierarchy item
  };
}

function mapDispatchToProps(dispatch) {
  return {
    CallAllProductCategoryListing: () =>
      dispatch(GitAction.CallAllProductCategoryListing()),
  };
}

class BlockMainCategories extends Component {
  constructor(props) {
    super(props)
    this.props.CallAllProductCategoryListing();
  }

  render() {
    /**
     * Styles
     */
    const categoryStyle = {
      backgroundColor: "#fff",
      display: "flex"
    }

    const categoryGrid = {
      padding: "16px",
      textAlign: "center",
      cursor: "pointer"
    }


    return (
      <div className="container">
        <h3 className="block-header__title mb-4">Categories</h3>
        <div style={categoryStyle} className="row mb-5">
          {this.props.productCategories.map((data, index) => {
            return (
              <div key={index} style={categoryGrid} className="col-lg-3 col-md-3 p-2"
                onMouseDown={(e) => {
                  console.log("e", e)
                  console.log("e.button", e.button)
                  // if (e.button === 1) {
                  window.location.href = "/shop/ProductListing/type:Category&typevalue:" + data.ProductCategoryID
                  // }
                }}
                onClick={(e) => {
                  console.log("e.onClick", e)
                  console.log("e.onClick", e.button)
                  window.location.href = "/shop/ProductListing/type:Category&typevalue:" + data.ProductCategoryID
                  // window.location.href = "/shop/ProductCategory/" + data.ProductCategoryID + "/" + data.ProductCategory
                }}
              >
                <div>
                  <img src={data.ProductCategoryImage} alt={data.ProductCategory} width="150px" height="150px" />
                  <br />
                  {data.ProductCategory}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}

BlockMainCategories.propTypes = {
  title: PropTypes.string,
  categories: PropTypes.array,
  layout: PropTypes.oneOf(["classic", "compact"]),
};

BlockMainCategories.defaultProps = {
  categories: [],
  layout: "classic",
};

export default connect(mapStateToProps, mapDispatchToProps)(BlockMainCategories);