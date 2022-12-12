// react
import React, { Component } from "react";
import { connect } from "react-redux";
import { GitAction } from "../../store/action/gitAction";

// third-party
import { Link } from "react-router-dom";

// application
import Megamenu from "./Megamenu";
import Menu from "./Menu";
import { ArrowRoundedRight6x9Svg } from "../../svg";

// data stubs
import departments from "../../data/headerDepartments";



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

function CategoryList(props) {
  const linksList = props.category.map((department, index) => {
    let arrow = null;
    let submenu = null;
    let itemClass = "";

    if (department.HierarchyItem) {
      arrow = <ArrowRoundedRight6x9Svg className="departments__link-arrow" />;
      let menus = JSON.parse(department.HierarchyItem);
      itemClass = "departments__item--menu";
      submenu = (
        <div className="departments__menu">
          <Menu items={menus} />
        </div>
      );
    }

    if (department.submenu && department.submenu.type === "megamenu") {
      submenu = (
        <div
          className={`departments__megamenu departments__megamenu--${department.submenu.menu.size}`}
        >
          <Megamenu menu={department.submenu.menu} location="department" />
        </div>
      );
    }

    return (
      <li key={index} className={`departments__item ${itemClass}`}>
        <Link to={`/shop/catalog/${department.ProductCategory}`}>
          {department.ProductCategory}
          {arrow}
        </Link>
        {submenu}
      </li>
    );
  });

  return <ul className="departments__links">{linksList}</ul>;
}

class DepartmentsLinks extends Component {
  constructor(props) {
    super(props);
    this.props.CallAllProductCategoryListing();
    this.state = {
      menuPosition: null,
    };
  }

  render() {
    return <CategoryList category={this.props.productCategories} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentsLinks);
