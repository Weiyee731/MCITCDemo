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
      display: "flex",
      justifyContent: 'center'
    }

    const categoryGrid = {
      padding: "16px",
      textAlign: "center",
      cursor: "pointer"
    }


    return (
      <div className="container">
        <h3 className="block-header__title mb-3">Categories</h3>
        <div style={categoryStyle} className="row mb-4">
          {this.props.productCategories.map((data, index) => {
            return (
              <div key={index} style={categoryGrid} className="col-lg-2 col-md-2 col-sm-2 p-3"
                onMouseDown={(e) => {
                  window.location.href = "/Emporia/shop/ProductListing/type:Category&typevalue:" + data.ProductCategoryID
                }}
                onClick={(e) => {
                  console.log("e.onClick", e)
                  console.log("e.onClick", e.button)
                  window.location.href = "/Emporia/shop/ProductListing/type:Category&typevalue:" + data.ProductCategoryID
                }}
              >
                <div>
                  <img src={data.ProductCategoryImage} alt={data.ProductCategory} width="100%" height="auto" />
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