// react
import React, { useEffect, useState } from "react";

// third-party
import classNames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// application
import Currency from "./Currency";
import Rating from "./Rating";
import { Wishlist16Svg} from "../../svg";
import Grid from "@mui/material/Grid";
import { url } from "../../services/utils";
import Logo from "../../assets/Emporia.png"
import { GitAction } from "../../store/action/gitAction";

// application
import { Modal } from 'reactstrap';
import { Cross20Svg } from '../../svg';
import { Card, Typography} from "@mui/material";
import HotelDetail from "./HotelDetail";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import VisibilityIcon from '@mui/icons-material/Visibility';
import Chip from '@mui/material/Chip';
import LoginComponent from "../../pages/login/login.component";
import { toast } from "react-toastify";


function HotelCard(props) {
  const {
    product,
    layout
  } = props;

  const containerClasses = classNames("product-card", {
    "product-card--layout--grid product-card--size--sm": layout === "grid-sm",
    "product-card--layout--grid product-card--size--nl": layout === "grid-nl",
    "product-card--layout--grid product-card--size--lg": layout === "grid-lg",
    "product-card--layout--list": layout === "list",
    "product-card--layout--horizontal": layout === "horizontal",
  });


  const baseColor = props !== undefined && props.baseColor
  const highlightColor = props !== undefined && props.highlightColor
  const [isQuickViewOpen, setQuickView] = useState(false);
  const [loginPopOut, setloginPopOut] = useState(false);
  const [productData, setProduct] = useState([]);

  let badges = [];
  let image;
  let price;
  let features;
  let wishlistView;
  let PromoTag;

  useEffect(() => {
  }, [props.addwishlist]);


  const handleWishlist = (product) => {
   
    let selectedProductID = product.ProductID

    let allWishListProd = props.wishlist.map((x)=>(x.ProductID))

   if( allWishListProd.findIndex((index) => (index === selectedProductID)) !== -1)
    {
      props.CallDeleteProductWishlist({
        userID: localStorage.getItem("id"),
        userWishlistID: props.wishlist.filter((f)=>(f.ProductID === selectedProductID)).map((x)=>(x.UserWishlistID)),
        productName: product.ProductName
      })
      toast.success("Successfully Deleted Wishlist, you can continue enjoy your shopping")
          setTimeout(() => {
            window.location.reload(true);
      }, 3000)
     
    }

    else{
      props.CallAddProductWishlist({
        userID: window.localStorage.getItem("id"),
        productID: product.ProductID,
        productName: product.ProductName
        })
        toast.success("Successfully Added Wishlist, you can continue enjoy your shopping")
        setTimeout(() => {
          window.location.reload(true);
        }, 3000)
        
    }

  }


  image = (
    <div className="product-card__image product-image">
      <div className="product-image__body">
        <img
          className="product-image__img"
          src={product.HotelImage !== null ? product.HotelImage : Logo}
          onError={(e) => { e.target.onerror = null; e.target.src = Logo }}
          alt={product.HotelName}
          style={{width:"200px", height:"200px"}}
        />
      </div>
    </div>
  );


  if (product.ProductPromotion && JSON.parse(product.ProductPromotion).length > 0) {
    price = (
      <div className="product-card__prices">
        <span className="product-card__new-price">
          <Currency value={JSON.parse(product.ProductPromotion)[0].PromotionPrice} currency={"RM"} />
        </span>{" "}
        <span className="product-card__old-price">
          <Currency value={product.StartPrice !== null && product.StartPrice !== undefined ? parseFloat(product.StartPrice) : 0}  currency={"RM"} />
        </span>
      </div>
    );

    PromoTag = [{ id: 1, tag: JSON.parse(product.ProductPromotion)[0].ProductDiscount, color: "#d23f57" }]
  } else {
    price = (
      <Grid item container spacing={1}>
      <Grid item xs={12} sm={12}>
          <Typography variant="caption">Start From</Typography>
      </Grid>
      <Grid item xs={12} sm={12}>
        <Currency value={product.StartPrice !== null && product.StartPrice !== undefined ? parseFloat(product.StartPrice) : 0} currency={"RM"} />
      </Grid>
      </Grid>
    );

    PromoTag = []
  }



  const ProductCardlayout = () => {

    const QuickView = () => {
      setQuickView(true)
      setProduct(product)
    }
  
    return (
      <Card elevation={2}>
        <button
          className={classNames("product-card__quickview")}
          style={{ textAlign: "right", display: "flex" }}
        >
          {
            PromoTag.map((x, index) => {
              return (
                <Chip size="small" key={index} variant="filled" label={<div>{x.tag}% OFF</div>} color='primary' style={{
                  backgroundColor: x.color
                }} 
                />
              )
            })
          }
          {/* <br /> */}
          <VisibilityIcon style={{ paddingLeft: "3px" }} onClick={() => QuickView()} />
        </button>
        {badges}
        <Link to={url.product(product)}>{image}</Link>

        <div className="product-card__info">
          <div className="product-card__name">
            <Link to={url.product(product)}>{product.HotelName}</Link>
          </div>
          <div className="product-card__rating">
            <Rating value={product.HotelRating !== null   ? product.HotelRating : 0} />
            {/* <div className="product-card__rating-legend">{product.HotelRating !== null ? parseFloat(product.HotelRating).toFixed(1) + "/5.0" : "0.0/5.0"}</div> */}
          </div>

          {
            product.HotelState !== null ?
              <div style={{ textAlign: "left", paddingRight: "10px" }}>
                <label style={{ color: "#2b535e" }}>
                  {product.HotelState}
                </label>
              </div>
              :
              <div style={{ textAlign: "left", paddingRight: "10px" }}>
                <label style={{ color: "#2b535e" }}>
                  -
                </label>
              </div>
          }
       
        </div>

        <div className="product-card__actions">
          <div className="product-card__availability">
            Availability:{" "}
            <span style={{ color: "#3d464d" }}>In Stock</span>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <label style={{ fontSize: "20px" }}>{price}</label>
            
          </div>
         
        </div>
      </Card>
    )
  }

  const getpopOutState = (loginPopOut) => {
    setloginPopOut(loginPopOut)
  }

  const getpopOutDetailsCard = (cardPopOut, loginPopOut) => {
    setloginPopOut(loginPopOut)
    setQuickView(cardPopOut)
  }

  return (
    <div className={containerClasses}>
      {props.currentData !== undefined ?
        props.currentData.isProductSet === true && props.currentData.isTimerEnd === true ?
          ProductCardlayout() :
          <Skeleton height={300} baseColor={baseColor} highlightColor={highlightColor} />
        :
        ProductCardlayout()
      }
      <Modal isOpen={isQuickViewOpen} toggle={() => setQuickView(!isQuickViewOpen)} centered size="xl">
        <div className="quickview">
          <button className="quickview__close" type="button" onClick={() => setQuickView(!isQuickViewOpen)}>
            <Cross20Svg />
          </button>
          <HotelDetail product={product} quickViewIndicator={props.quickViewIndicator} getpopOutDetailsCard={getpopOutDetailsCard} />
        </div>
      </Modal>
      {loginPopOut !== undefined && loginPopOut !== false &&
        <LoginComponent loginPopOut={loginPopOut} getpopOutState={getpopOutState} />
      }
    </div>
  );


}

HotelCard.propTypes = {
  /**
   * product object
   */
  product: PropTypes.object.isRequired,
  /**
   * product card layout
   * one of ['grid-sm', 'grid-nl', 'grid-lg', 'list', 'horizontal']
   */
  layout: PropTypes.oneOf([
    "grid-sm",
    "grid-nl",
    "grid-lg",
    "list",
    "horizontal",
  ]),
};


const mapStateToProps = (state) => ({
  deletewishlist: state.counterReducer.deletewishlist,
  addwishlist: state.counterReducer.addwishlist,
  wishlist: state.counterReducer.wishlist,
  productcart: state.counterReducer["productcart"],
 
});

const mapDispatchToProps = (dispatch) => {
  return {
    CallAddProductWishlist: (prodData) => dispatch(GitAction.CallAddProductWishlist(prodData)),
    CallDeleteProductWishlist: (prodData) => dispatch(GitAction.CallDeleteProductWishlist(prodData)),
    CallViewProductCart: (credentials) => dispatch(GitAction.CallViewProductCart(credentials)),
    CallViewProductWishlist: (credentials) => dispatch(GitAction.CallViewProductWishlist(credentials)),
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(HotelCard);
