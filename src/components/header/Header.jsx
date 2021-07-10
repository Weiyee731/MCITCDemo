// react
import React from "react";

// third-party
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// application
import NavPanel from "./NavPanel";
import Search from "./Search";
import Topbar from "./Topbar";
import { LogoSvg } from "../../svg";
import { Heart20Svg } from "../../svg";
import Indicator from "./Indicator";
import CartIndicator from "./IndicatorCart";
import IndicatorAccount from "./IndicatorAccount";
import { Cart20Svg, Cross10Svg } from "../../svg";

function Header(props) {
  const { layout } = props;

  const backgroundColor = {
    backgroundColor: "#99bc3b",
    // overflow: "hidden",
    position: "fixed",
    top: 0
  }
  
  let bannerSection;

  if (layout === "default") {
    bannerSection = (
      <div className="site-header__middle container">
        <div>
          <Link to="/">
            <LogoSvg />
          </Link>
        </div>
        <div className="site-header__search" style={{margin: "0 16px"}}>
          <Search context="header" />
        </div>
        <div className="nav-panel__indicators">
          {localStorage.getItem("id") ? (
            <>
              <Indicator url="/shop/wishlist" value={0} icon={<Heart20Svg />} />
              <CartIndicator />
              <IndicatorAccount />
            </>
          ) : (
            <>
              <CartIndicator />
              <IndicatorAccount />
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="site-header w-100" style={backgroundColor}>
      {/* <Topbar /> */}
      {bannerSection}
      {/* <div className="site-header__nav-panel">
        <NavPanel layout={layout} />
      </div> */}
    </div>
  );
}

Header.propTypes = {
  /** one of ['default', 'compact'] (default: 'default') */
  layout: PropTypes.oneOf(["default", "compact"]),
};

Header.defaultProps = {
  layout: "default",
};

export default Header;
