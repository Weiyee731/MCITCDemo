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

  }

  componentDidMount() {
    this.props.CallAllProductCategoryListing();
  }
  render() {
    /**
     * Styles
     */
    const categoryStyle = {
      backgroundColor: "#fff",
      display: "flex",
      justifyContent: 'center',
      padding: "5px"
    }

    const categoryGrid = {
      paddingTop: "10px",
      textAlign: "center",
      cursor: "pointer"
    }


    return (
      <div className="container">
        <BlockHeader
          title="Categories"
          showAll={"shop/AllProductCategory"}
        // groups={groups}
        // arrows
        // onNext={this.handleNextClick}
        // onPrev={this.handlePrevClick}
        // onGroupClick={onGroupClick}
        />
        {/* <h3 className="block-header__title mb-3">Categories</h3> */}
        {/* <div style={categoryStyle} className="row mb-4"> */}
        <div style={categoryStyle}>
          {this.props.productCategories.map((data, index) => {
            return (
              <div key={index} style={categoryGrid} className="col-2 col-xs-4 p-3"
                onMouseDown={(e) => {
                  window.location.href = "/shop/ProductListing/type:Category&typevalue:" + data.ProductCategoryID
                }}
                onClick={(e) => {
                  window.location.href = "/shop/ProductListing/type:Category&typevalue:" + data.ProductCategoryID
                }}
              >
                <div>
                  <img src={data.ProductCategoryImage} alt={data.ProductCategory} width="50%" height="50%" />
                  <br />
                  <label style={{ fontSize: "13px" }}>{data.ProductCategory}</label>
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