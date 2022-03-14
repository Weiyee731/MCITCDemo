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

import { Container, Row, Col } from "shards-react";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Typography } from "@material-ui/core";
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import ShoppingBasket from '@mui/icons-material/ShoppingBasket';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';

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
      // <div className="site-header__middle container">
      //   <div>
      //     {/* <div className="site-header__logo"> */}
      //     <Link to="/">
      //       <LogoSvg />
      //     </Link>
      //   </div>
      //   <div className="site-header__search" style={{ margin: "0 16px" }}>
      //     <Search context="header" />
      //   </div>
      //   <div className="nav-panel__indicators">
      //     {localStorage.getItem("isLogin") === 'true' && <Indicator url="/shop/wishlist" 
      //     value={props.wishlist  !== undefined && props.wishlist[0] !== undefined && props.wishlist[0].ReturnVal === undefined? props.wishlist.length : 0}
      //      icon={<Heart20Svg />} />}
      //     <IndicatorCart />
      //     <IndicatorAccount />
      //   </div>
      // </div>

      <Container style={{ position: "relative", top: "2%" }}>
        <Row style={{ backgroundColor: 'transparent' }} fullWidth>
          <Col sm="12">
            <Stack direction="row" spacing={2}>
              <div style={{ paddingRight: "15px" }}>
                <img src="https://www.arcgis.com/sharing/rest/content/items/d3df164aaf64459e8544b3adf60893da/resources/3U6pu0bfHqzHtqrAbY90O.png?w=400" alt="" width="200px" />
              </div>
              <TextField label="Search in Tourism-Ecommerce" variant="outlined" fullWidth style={{ margin: 'auto' }}></TextField>
              <IconButton>
                <AccountCircle fontSize="medium" />
              </IconButton>
              <IconButton>
                <ShoppingBasket fontSize="medium" />
              </IconButton>
            </Stack>
          </Col>
        </Row>
      </Container>
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
