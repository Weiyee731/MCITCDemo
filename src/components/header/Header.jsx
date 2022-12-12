// react
import React, { useEffect, useState } from "react";

// third-party
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import classNames from 'classnames';

// application
import NavPanel from "./NavPanel";
import Search from "./Search";
import Topbar from "./Topbar";
import StickyTopProduct from "./StickyTopProduct";
import { LogoSvg } from "../../svg";
import { Heart20Svg } from "../../svg";
import Indicator from "./Indicator";
import IndicatorCart from "./IndicatorCart";
import IndicatorAccount from "./IndicatorAccount";
import { Cart20Svg, Cross10Svg } from "../../svg";
import Logo from "../../assets/Emporia.png";

// import { wishlistListItem } from "../../store/wishlist";
import { mobileMenuOpen } from '../../store/mobile-menu';
import HeaderProductDetails from "./HeaderProductDetails";

function Header(props) {
  const { layout } = props;
  const [show, setShow] = useState(false);
  const [isproductPage, setisproductPage] = useState(false);

  const showFrom = 510;
  const classes = classNames('totop', {
    'totop--show': show,
  });

  const onClick = () => {
    try {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    } catch {
      window.scrollTo(0, 0);
    }
  };

  const backgroundColor = {
    backgroundColor: "#fff",
    // position: "fixed",
    // top: 0
  }

  const onScroll = () => {
    let pathLength = window.location.pathname.split("/").length
    let currentLocation = '/' + window.location.pathname.split("/")[pathLength - 3] + '/' + window.location.pathname.split("/")[pathLength - 2] + '/'
    const newState = window.pageYOffset >= showFrom;
    if (currentLocation === "/shop/products/") {
      setisproductPage(true)
      if (!isproductPage) {
        setShow(newState);
      }
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });

  useEffect(() => {
  }, [show])


  let pathLength = window.location.pathname.split("/").length
  let currentProductID = window.location.pathname.split("/")[pathLength - 1]
  const currentProductDetails = props.products.filter((x) => x.ProductID == currentProductID).map((y) => y)

  let bannerSection;

  if (layout === "default") {

    bannerSection = (
      <>
        {
          show === false ?
            <div className="site-header__middle container">
              <div>
                <Link to="/">
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
              </div>
              <div className="site-header__search" style={{ margin: "0 16px" }}>
                <Search context="header" style={{ borderRadius: "10px" }} />
              </div>
              <div className="nav-panel__indicators">
                {localStorage.getItem("isLogin") === 'true' && <Indicator url="/shop/wishlist"
                  value={props.wishlist !== undefined && props.wishlist[0] !== undefined && props.wishlist[0].ReturnVal === undefined ? props.wishlist.filter((x) => x.DelInd === 0).length : 0}
                  icon={<Heart20Svg />} />}
                <IndicatorCart />
                <IndicatorAccount />
              </div>

            </div>

            :
            <div>
              <div className="container" onClick={onClick}>
                <HeaderProductDetails productDetails={currentProductDetails} />
                {/* <div>
                  <Link to="/">
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
                </div>
                <div className="form-group product__option product__add-to-cart" >
                  <div className="product__actions">
                    <div className="product__actions-item product__actions-item--addtocart mx-1">
                      <button
                        type="button"
                        // disabled={this.state.isVariationSet === true ?
                        //   (this.state.productQuantity > 0 ? false : true) :
                        //   (product.ProductStockAmount > 0 ? false : true)
                        // }
                        // onClick={() => window.localStorage.getItem("id") && window.localStorage.getItem("isLogin") === "true" ? this.checkCart(product, quantity) : this.login()}
                        className="btn btn-primary product-card__addtocart"
                        style={{ borderRadius: "5px" }}
                      >
                        Add To Cart
                      </button>
                    </div>
                    <div className="product__actions-item product__actions-item--wishlist mx-1">
                      {this.wishlisting(product)}
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
        }
      </>
    )
  }

  return (
    <div className="site-header w-100" style={backgroundColor}>
      <Topbar />
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
  wishlist: state.counterReducer.wishlist,
  products: state.counterReducer.products,
});

const mapDispatchToProps = {
  openMobileMenu: mobileMenuOpen,
};


export default connect(mapStateToProps, mapDispatchToProps)(Header);
