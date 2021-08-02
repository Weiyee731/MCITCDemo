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
      // display: "flex"
    }

    const categoryGrid = {
      // padding: "16px"
      textAlign: "center",
      cursor: "pointer"
    }

    return (
      <div className="container">
        <h3 className="block-header__title mb-4">Categories</h3>
        <div style={categoryStyle} className="row mb-5">
          {this.props.productCategories.map((data, index) => {
            return (
              <div key={index} style={categoryGrid} className="col-lg-2 col-md-2 p-2"
                onMouseDown={(e) => {
                  if (e.button === 1) {
                    window.open("/shop/ProductCategory/" + data.ProductCategoryID + "/" + data.ProductCategory)
                  }
                }}
                onClick={(e) => {
                  window.location.href = "/shop/ProductCategory/" + data.ProductCategoryID + "/" + data.ProductCategory
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
  title: PropTypes.string.isRequired,
  categories: PropTypes.array,
  layout: PropTypes.oneOf(["classic", "compact"]),
};

BlockMainCategories.defaultProps = {
  categories: [],
  layout: "classic",
};

export default connect(mapStateToProps, mapDispatchToProps)(BlockMainCategories);