// react
import React, { Component } from "react";

// third-party
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { GitAction } from "../../store/action/gitAction";

// application
import CartIndicator from "./IndicatorCart";
import Departments from "./Departments";
import Indicator from "./Indicator";
import IndicatorAccount from "./IndicatorAccount";
import IndicatorSearch from "./IndicatorSearch";
import NavLinks from "./NavLinks";
import { Heart20Svg, LogoSmallSvg } from "../../svg";
import logo from "../../assets/myshops.png"

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

class NavPanel extends Component {
  constructor(props) {
    super(props)
    this.props.CallAllProductCategoryListing();
  }

  render() {
    const { layout, wishlist } = this.props;

    let logo = null;
    let departments = null;
    let searchIndicator;

    const categoryStyle = {
      backgroundColor: "#fff",
      // display: "flex"
    }

    const categoryGrid = {
      // padding: "16px"
      textAlign: "center",
      cursor: "pointer"
    }

    if (layout === "compact") {
      logo = (
        <div className="nav-panel__logo">
          <Link to="/">
            <LogoSmallSvg />
          </Link>
        </div>
      );

      searchIndicator = <IndicatorSearch />;
    }

    if (layout === "default") {
      departments = (
        // <div className="nav-panel__departments">
        //   <Departments />
        // </div>
        <div>
          <h3 className="block-header__title mb-4">Categories</h3>
          <div style={categoryStyle} className="row mb-5">
            {this.props.productCategories.map((data, index) => {
              console.log(data.ProductCategoryImage)
              return (
                <div key={index} style={categoryGrid} className="col-lg-2 col-md-2 p-2" onClick={() => console.log(data)}>
                  <img src={data.ProductCategoryImage} />
                  <br />
                  {data.ProductCategory}
                </div>
              )
            })}
          </div>
        </div>
      );
    }

    return (
      <div className="container">
        {logo}
        {departments}
      </div>
    );
  }
}

NavPanel.propTypes = {
  /** one of ['default', 'compact'] (default: 'default') */
  layout: PropTypes.oneOf(["default", "compact"]),
};

NavPanel.defaultProps = {
  layout: "default",
};


export default connect(mapStateToProps, mapDispatchToProps)(NavPanel);
