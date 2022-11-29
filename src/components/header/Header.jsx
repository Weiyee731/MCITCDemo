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
import SocialLinks from '../shared/SocialLinks';

import Logo from "../../assets/Emporia.png";

// import { wishlistListItem } from "../../store/wishlist";
import { mobileMenuOpen } from '../../store/mobile-menu';
import { Button } from "react-bootstrap";

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
            {/* <LogoSvg /> */}
            <img
              className="site-header__logo_img"
              src={Logo}
              alt=""
              style={{ height: "6vw" }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = Logo;
              }}
            />
          </Link>
          {/* </div> */}
        </div>
        <div className="site-header__search" style={{ margin: "0 16px" }}>
          <Search context="header" />
        </div>
        <div className="nav-panel__indicators">
          {localStorage.getItem("isLogin") === 'true' && <Indicator url="/shop/wishlist"
            value={props.wishlist !== undefined && props.wishlist[0] !== undefined && props.wishlist[0].ReturnVal === undefined ? props.wishlist.filter((x) => x.DelInd === 0).length : 0}
            icon={<Heart20Svg />} />}
          <IndicatorCart />
          <IndicatorAccount />
        </div>
      </div>
    );
  }
  return (
    <div className="site-header w-100" style={backgroundColor}>
      <div className="helpdeskBar">
        {/* background:"#4B895A" */}
        <div className="container" style={{ display: "flex", justifyContent: "flex-end", alignItems:"center", padding:"0.1vw" }}>
          <SocialLinks className="footer-newsletter__social-links" shape="circle" />
          <Button style={{ fontSize: "9pt", background: "inherit", border: "transparent", color: "black", height: "1vw", display: "flex", alignItems: "center", fontFamily: 'Helvetica' }}>
            Customer Care
          </Button>
        </div>
      </div>
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
