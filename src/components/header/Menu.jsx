// react
import React from "react";
// import {
//   Redirect,
//   Route,
//   Switch,
//   Link,
//   BrowserRouter as Router,
// } from "react-router-dom";

// third-party
import classNames from "classnames";
import PropTypes from "prop-types";

// application
import AppLink from "../shared/AppLink";
import { ArrowRoundedRight6x9Svg } from "../../svg";
import Cookies from "universal-cookie";
// import ShopPageCategory from "../shop/ShopPageCategory";

const cookies = new Cookies();
function Menu(props) {
  const { layout, withIcons, items, onClick } = props;
  const renderLink = (item, content) => {
    let link;

    if (item.ProductCategoryID) {
      link = (
        <AppLink
          {...item.props}
          to={`/shop/catalog/${item.slug}`}
          onClick={() => onClick(item)}
        >
          {content}
        </AppLink>
      );
    } else {
      link = (
        <button type="button" onClick={() => onClick(item)}>
          {content}
        </button>
      );
    }

    return link;
  };

  const backtoinventory = (e) => {
    if (e === "Dashboard") {
      localStorage.setItem("management", true);
    }
  };

  const itemsList = items.map((item, index) => {
    let arrow;
    let submenu;
    let icon;

    if (item.HierarchyItem && item.HierarchyID < 3) {
      arrow = <ArrowRoundedRight6x9Svg className="menu__arrow" />;
      let menu = JSON.parse(item.HierarchyItem);
      submenu = (
        <div className="menu__submenu">
          <Menu items={menu} />
        </div>
      );
    }

    if (withIcons && item.icon) {
      icon = (
        <div className="menu__icon">
          <img src={item.icon} srcSet={item.icon_srcset} alt="" />
        </div>
      );
    }

    if (item.title === "Dashboard") {
      return (
        <li key={index} onClick={() => backtoinventory(item.title)}>
          {renderLink(
            item,
            <React.Fragment>
              {icon}
              {item.ProductCategory}
              {arrow}
            </React.Fragment>
          )}
          {submenu}
        </li>
      );
    } else {
      return (
        <li key={index}>
          {renderLink(
            item,
            <React.Fragment>
              {icon}
              {item.ProductCategory}
              {arrow}
            </React.Fragment>
          )}
          {submenu}
        </li>
      );
    }
  });

  const classes = classNames(`menu menu--layout--${layout}`, {
    "menu--with-icons": withIcons,
  });

  return <ul className={classes}>{itemsList}</ul>;
}

Menu.propTypes = {
  /** one of ['classic', 'topbar'] (default: 'classic') */
  layout: PropTypes.oneOf(["classic", "topbar"]),
  /** default: false */
  withIcons: PropTypes.bool,
  /** array of menu items */
  items: PropTypes.array,
  /** callback function that is called when the item is clicked */
  onClick: PropTypes.func,
};

Menu.defaultProps = {
  layout: "classic",
  withIcons: false,
  items: [],
  onClick: () => {},
};

export default Menu;
