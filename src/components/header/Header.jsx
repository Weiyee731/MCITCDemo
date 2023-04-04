// react
import React, { useEffect, useState } from "react";
import { GitAction } from "../../store/action/gitAction";
// third-party
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import classNames from 'classnames';

// application
import NavPanel from "./NavPanel";
import Search from "./Search";
import Topbar from "./Topbar";
import IconButton from "@mui/material/IconButton";
import StickyTopProduct from "./StickyTopProduct";
import { LogoSvg } from "../../svg";
import { Heart20Svg } from "../../svg";
import Indicator from "./Indicator";
import IndicatorCart from "./IndicatorCart";
import IndicatorAccount from "./IndicatorAccount";
import IndicatorB_Mark from "./IndicatorB_Mark";
import Logo from "../../assets/Emporia.png";

import { Cart20Svg, Cross10Svg } from "../../svg";
// import BookIcon from '@mui/icons-material/Book';

// import { wishlistListItem } from "../../store/wishlist";
import { mobileMenuOpen } from '../../store/mobile-menu';
import HeaderProductDetails from "./HeaderProductDetails";

import { Drawer } from '@mui/material';
import { Button } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import PageCart_side from "../shop/ShopPageCart_side";

function Header(props) {
  const { layout } = props;
  const [show, setShow] = useState(false);
  const [isproductPage, setisproductPage] = useState(false);
  const [openloginPopOut, setopenloginPopOut] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const bookmark_Hotel = [
    {
      HotelID: 0,
      HotelImage: 'https://media-cdn.tripadvisor.com/media/photo-s/12/a9/df/17/hilton-night-view-from.jpg',
      HotelName:'Hilton',
      StartPrice: 180.00,
      HotelRating: 4.0,
      HotelState: 'Kuching',
      ProductPromotion: null,
      DellInd: 0,
    },
    {
      HotelID: 1,
      HotelImage: 'https://pix10.agoda.net/hotelImages/44583/-1/8742bb65e5a6b3f370d3e94212bb8a76.jpg?ca=23&ce=0&s=1024x768',
      HotelName:'Grand Magherita',
      StartPrice: 185.00,
      HotelRating: 4.1,
      HotelState: 'Kota Samarahan',
      ProductPromotion: null,
      DellInd: 0,
    },
    {
      HotelID: 2,
      HotelImage: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/124344871.jpg?k=82daced0f7392440064c6ec25622e0d0154f02c62a2c885d96103c320273befe&o=&hp=1',
      HotelName:'Tune Hotel',
      StartPrice: 90.00,
      HotelRating: 3.9,
      HotelState: 'Kuching',
      ProductPromotion: null,
      DellInd: 0
    }, 
   
  ]


  useEffect(() => {
    if (localStorage.getItem("isLogin") === "true" && localStorage.getItem("id") !== undefined) {
      props.CallViewProductWishlist({
        userID: localStorage.getItem("id")
      })
      props.CallViewProductCart({
        userID: localStorage.getItem("id")
      })
    }
  }, [])

  const showFrom = 600;
  const classes = classNames('totop', {
    'totop--show': show,
  });

  const onClick = () => {
    // try {
    //   window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    // } catch {
    //   window.scrollTo(0, 0);
    // }
  };

  const backgroundColor = {
    backgroundColor: "#fff",
    // position: "fixed",
    // top: 0
  }

  const onScroll = () => {
    let pathLength = window.location.pathname.split("/").length
    let currentLocation = '/' + window.location.pathname.split("/")[pathLength - 3] + '/' + window.location.pathname.split("/")[pathLength - 2] + '/'

    const newState = window.pageYOffset >= showFrom; // this is the reason that cause the page to reload when scrolling

    if (currentLocation === "/shop/products/") {
      setisproductPage(true)
      if (!isproductPage) {
        setShow(newState);
      }
    } else {
      setisproductPage(false)
      setShow(false)
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });

  useEffect(() => {
  }, [show])

  let pathLength = window.location.pathname.split("/").length
  let currentProductID = window.location.pathname.split("/")[pathLength - 1]
  const currentProductDetails = props.product !== null && props.product !== undefined && props.product.filter((x) => x.ProductID == currentProductID).map((y) => y)
  
  useEffect(() => {
    let canceled = false;
    if (localStorage.getItem("isLogin") === true)
      props.CallProductDetail({
        productId: currentProductID.length > 0 && currentProductID !== undefined ? currentProductID : currentProductID,
        userId: localStorage.getItem("isLogin") === false ? 0 : localStorage.getItem("id")
      })
    return () => {
      canceled = true;
    };
  }, [currentProductID]);

  let bannerSection;

  if (layout === "default") {
    bannerSection = (
      <>
   
            <div className="site-header__middle container">
              <div>
                <Link to="/">
                  <img
                    className="site-header__logo_img"
                    src={Logo}
                    alt=""
                    style={{ height: "3vw" }}
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

            { sessionStorage.getItem("saleType") !== 'Hotel'?
            <>
                {
                  localStorage.getItem("isLogin") === 'true' &&
                  <Indicator url="/shop/wishlist"
                    value={props.wishlist !== undefined && props.wishlist[0] !== undefined && props.wishlist[0].UserWishlistID !== undefined ?
                      props.wishlist.filter((x) => x.DelInd === 0).length :
                      0}
                    icon={<Heart20Svg />} />
                }
                {
                  localStorage.getItem("isLogin") === "false"?
                    <Indicator
                      value={0}
                      icon={<Cart20Svg />}
                      onClick={() => {
                        setCartOpen(true)
                      }}
                    />
                    :
                    <IndicatorCart
                      onClick={() => {
                        setCartOpen(true)
                      }} />
                }

                </>
                :
                <div style={{margin:'auto'}}>
                    {
                      localStorage.getItem("isLogin") === 'true' &&
                      <Indicator url="/Hotel_Files/hotel_wishlist"
                        value={bookmark_Hotel !== undefined ?
                          bookmark_Hotel.filter((x) => x.DellInd === 0).length :
                          0}
                        icon={<Heart20Svg />} />
                    }
                </div>
              
              }
                <IndicatorAccount />
              </div>
            {/* } */}
            </div>

    {/* Lis moves the show state here, where this will show on the top and preventing uneccessary reload */}

        {
          show === true &&
             <div>
               <div className="container" onClick={onClick}>
                 <HeaderProductDetails productDetails={currentProductDetails} />
               </div>
             </div>
        }
     
        {
          <div >
            <Drawer
              PaperProps={{
                sx: { width: "380px" },
              }}
              anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
              <PageCart_side history={"cart"} setCartOpen={setCartOpen} />
            </Drawer>
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
  // products: state.counterReducer.products,
  product: state.counterReducer["productsByID"],
});

const mapDispatchToProps = (dispatch) => {
  return {
    openMobileMenu: mobileMenuOpen,
    CallProductDetail: (propData) => dispatch(GitAction.CallProductDetail(propData)),
    CallViewProductCart: (prodData) => dispatch(GitAction.CallViewProductCart(prodData)),
    CallViewProductWishlist: (prodData) => dispatch(GitAction.CallViewProductWishlist(prodData)),
  }

};


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
