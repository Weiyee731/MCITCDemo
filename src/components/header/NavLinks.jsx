// react
import React, { Component } from "react";

// third-party
import classNames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { GitAction } from "../../store/action/gitAction";

// application
import AppLink from "../shared/AppLink";
import languages from "../../i18n";
import Megamenu from "./Megamenu";
import Menu from "./Menu";
import { ArrowRoundedDown9x6Svg } from "../../svg";

// data stubs
import navLinks from "../../data/headerNavigation";

function mapStateToProps(state) {
  return {
    productCategories: state.counterReducer["productCategories"], // with sub hierarchy item
    locale: state.locale,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    CallAllProductCategoryListing: () =>
      dispatch(GitAction.CallAllProductCategoryListing()),
  };
}

function NavLinks(props) {
  const handleMouseEnter = (event) => {
    const { locale } = props;
    const { direction } = languages[locale];

    const item = event.currentTarget;
    const megamenu = item.querySelector(".nav-links__megamenu");

    if (megamenu) {
      const container = megamenu.offsetParent;
      const containerWidth = container.getBoundingClientRect().width;
      const megamenuWidth = megamenu.getBoundingClientRect().width;
      const itemOffsetLeft = item.offsetLeft;

      if (direction === "rtl") {
        const itemPosition =
          containerWidth -
          (itemOffsetLeft + item.getBoundingClientRect().width);

        const megamenuPosition = Math.round(
          Math.min(itemPosition, containerWidth - megamenuWidth)
        );

        megamenu.style.left = "";
        megamenu.style.right = `${megamenuPosition}px`;
      } else {
        const megamenuPosition = Math.round(
          Math.min(itemOffsetLeft, containerWidth - megamenuWidth)
        );

        megamenu.style.right = "";
        megamenu.style.left = `${megamenuPosition}px`;
      }
    }
  };

  const linksList = navLinks.map((item, index) => {
    let arrow;
    let submenu;

    // if (item.HierarchyItem) {
    //   arrow = <ArrowRoundedDown9x6Svg className="nav-links__arrow" />;
    // }

    // if (item.HierarchyItem && item.HierarchyItem.ProductCategory !== null) {
    //     let menus = JSON.parse(item.HierarchyItem)
    //     submenu = (
    //       <div className="nav-links__menu">
    //         <Menu items={menus} />
    //       </div>
    //     );
    // }

    if (item.submenu) {
        arrow = <ArrowRoundedDown9x6Svg className="nav-links__arrow" />;
    }

    if (item.submenu && item.submenu.type === 'menu') {
        submenu = (
            <div className="nav-links__menu">
                <Menu items={item.submenu.menu} />
            </div>
        );
    }

    if (item.submenu && item.submenu.type === "megamenu") {
      submenu = (
        <div
          className={`nav-links__megamenu nav-links__megamenu--size--${item.submenu.menu.size}`}
        >
          <Megamenu menu={item.submenu.menu} />
        </div>
      );
    }

    const classes = classNames("nav-links__item", {
      "nav-links__item--with-submenu": item.HierarchyItem,
    });

    return (
      <li key={index} className={classes} onMouseEnter={handleMouseEnter}>
        <AppLink to={item.url} {...item.props}>
          <span>
            {item.title}
            {arrow}
          </span>
        </AppLink>
        {submenu}
      </li>
    );
  });

  return <ul className="nav-links__list">{linksList}</ul>;
}

// class NavLinks extends Component {
//   constructor(props) {
//     super(props);
//     this.props.CallAllProductCategoryListing();
//     this.state = {
//       menuPosition: null,
//     };
//   }

//   render() {
//     return <CategoryList category={this.props.productCategories} />;
//   }
// }

NavLinks.propTypes = {
  /** current locale */
  locale: PropTypes.string,
};

export default connect(mapStateToProps)(NavLinks);
