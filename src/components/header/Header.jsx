// react
import React from "react";

// third-party
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

// application
import NavPanel from "./NavPanel";
import Search from "./Search";
import Topbar from "./Topbar";
import { LogoSvg } from "../../svg";
import { Heart20Svg } from "../../svg";
import Indicator from "./Indicator";
import IndicatorCart from "./IndicatorCart";
import IndicatorAccount from "./IndicatorAccount";
import { Cart20Svg, Cross10Svg } from "../../svg";

// import { wishlistListItem } from "../../store/wishlist";
import { mobileMenuOpen } from '../../store/mobile-menu';

function Header(props) {
  const { layout } = props;

  const backgroundColor = {
    backgroundColor: "#fff",
    // position: "fixed",
    // top: 0
  }

  let bannerSection;

  if (layout === "default") {
    bannerSection = (
      <div className="site-header__middle container">
        <div>
          {/* <div className="site-header__logo"> */}
          <Link to="/">
            <LogoSvg />
          </Link>
        </div>
        <div className="site-header__search" style={{ margin: "0 16px" }}>
          <Search context="header" />
        </div>
        <div className="nav-panel__indicators">
          {localStorage.getItem("isLogin") === 'true' && <Indicator url="/shop/wishlist" 
          value={props.wishlist  !== undefined && props.wishlist[0] !== undefined && props.wishlist[0].ReturnVal === undefined? props.wishlist.length : 0}
           icon={<Heart20Svg />} />}
          <IndicatorCart />
          <IndicatorAccount />
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

// export default Header;


const mapStateToProps = (state) => ({
  wishlist: state.counterReducer.wishlist
});

const mapDispatchToProps = {
  openMobileMenu: mobileMenuOpen,
};


export default connect(mapStateToProps, mapDispatchToProps)(Header);
