// react
import React, { Component } from "react";
import { GitAction } from "../../store/action/gitAction";

// third-party
import classNames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Logo from "../../assets/Emporia.png"
import { Wishlist16Svg } from "../../svg";

// application;
import 'react-loading-skeleton/dist/skeleton.css'
import { Button, Typography } from "@material-ui/core";
import { browserHistory } from "react-router";
import { toast } from "react-toastify";
import zIndex from "@material-ui/core/styles/zIndex";

class HeaderProductDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quantity: 1,
      // currentTab: "description",
      // productVariation: "",
      // productPrice: "",
      // productQuantity: 0,
      productVariationDetailID: "",
      // selectedVariation: "",
      isVariationSet: false,
      productVariationType: "",
      // isProductSet: false,
      // isTimerEnd: false
    };
    this.addCart = this.addCart.bind(this)
    this.handleWishlist = this.handleWishlist.bind(this)
    this.wishlisting = this.wishlisting.bind(this)
    this.login = this.login.bind(this)
    this.checkCart = this.checkCart.bind(this)

  }

  componentDidMount() {
    const { productDetails } = this.props
    // window.scrollTo(0, 0) // Temporary fixing randomly show when page loads
    // let productID = ""
    // if (window.location.pathname !== undefined) {
    //   let length = window.location.pathname.split("/").length
    //   productID = window.location.pathname.split("/")[length - 1]
    // }

    // if (product !== undefined && productID !== "" && product.ProductID === parseInt(productID)) {
    //   product.ProductVariation !== null && JSON.parse(product.ProductVariation).map((variation) => {
    //     variation.ProductVariationValue === "-" &&
    //       this.setState({
    //         productVariation: variation.ProductVariationValue,
    //         productQuantity: variation.ProductStockAmount,
    //         productVariationDetailID: variation.ProductVariationDetailID,
    //         productVariationType: variation.ProductVariation,
    //       })
    //   })
    //   this.setState({ productPrice: product.ProductPrice, isProductSet: true })
    // } else {
    //   this.setState({ isProductSet: false })
    // }
  }
  componentDidUpdate(props) {
    const { productDetails } = this.props
    // let productID = ""
    // if (window.location.pathname !== undefined) {
    //   let length = window.location.pathname.split("/").length
    //   productID = window.location.pathname.split("/")[length - 1]
    // }

    // if (product !== undefined && productID !== "" && product.ProductID === parseInt(productID) && this.state.isProductSet === false) {
    //   product.ProductVariation !== null && JSON.parse(product.ProductVariation).map((variation) => {
    //     variation.ProductVariationValue === "-" &&
    //       this.setState({
    //         productVariation: variation.ProductVariationValue,
    //         productQuantity: variation.ProductStockAmount,
    //         productVariationDetailID: variation.ProductVariationDetailID,
    //         productVariationType: variation.ProductVariation,
    //       })
    //   })
    //   this.setState({ productPrice: product.ProductPrice, isProductSet: true })
    // }
  }


  checkCart(product, quantity) {
    if (this.state.productVariationDetailID === "" && this.state.productVariationType !== "None") {
      toast.error("Please Select One of the Variation")
      window.scrollTo(300, 0)
    }
    else
      this.addCart(product, quantity)
  }

  addCart = (product, quantity) => {
    let found = false
    if (this.props.productcart) {

      this.props.productcart.filter(x => x.ProductID === product.ProductID).map((x) => {
        if (x.ProductVariationDetailID !== null && x.ProductVariationDetailID === this.state.productVariationDetailID) {
          found = true
          const UpdateCart = {
            userID: localStorage.getItem("id"),
            userCartID: x.UserCartID,
            productQuantity: parseInt(x.ProductQuantity) + quantity,
            productName: product.ProductName
          }
          this.props.CallUpdateProductCart(UpdateCart)
        }
      })

      if (found === false) {
        const AddCart = {
          userID: window.localStorage.getItem("id"),
          productID: product.ProductID,
          productQuantity: quantity,
          productVariationDetailID: this.state.productVariationDetailID,
          applyingPromoCode: 0,
          productName: product.ProductName
        }
        this.props.CallAddProductCart(AddCart)
      }
    } else
      this.login()
  }

  login() {
    browserHistory.push("/login");
    window.location.reload(false);
  }

  handleWishlist = (product) => {
    let found = false
    if (this.props.wishlist !== undefined) {
      this.props.wishlist.filter(x => x.ProductID === product.ProductID).map((x) => {
        found = true
        const deletewishlist = {
          userID: localStorage.getItem("id"),
          userWishlistID: x.UserWishlistID,
          productName: product.ProductName
        }
        this.props.CallDeleteProductWishlist(deletewishlist)
      })
      if (found === false) {
        const addwishlist = {
          userID: window.localStorage.getItem("id"),
          productID: product.ProductID,
          productName: product.ProductName
        }
        this.props.CallAddProductWishlist(addwishlist)
      }
    }
    else
      this.login()
  }

  wishlisting(product) {
    return (
      typeof this.props.wishlist !== "undefined" && this.props.wishlist.length > 0 ?
        this.props.wishlist.filter(x => x.ProductID === product.ProductID).length > 0 ?
          this.props.wishlist.filter(x => x.ProductID === product.ProductID).map((x) => {
            return (
              <button type="button" onClick={() => window.localStorage.getItem("id") && window.localStorage.getItem("isLogin") === "true" ? this.handleWishlist(product) : this.login()}
                className={classNames('btn btn-light btn-sm btn-svg-icon')}
              ><Wishlist16Svg fill="red" />
              </button>
            )
          }) :
          (
            <button type="button" onClick={() => window.localStorage.getItem("id") && window.localStorage.getItem("isLogin") === "true" ? this.handleWishlist(product) : this.login()}
              className={classNames("btn btn-light btn-svg-icon btn-svg-icon--fake-svg product-card__wishlist")}
            ><Wishlist16Svg />
            </button>
          ) :
        (
          <button type="button" onClick={() => window.localStorage.getItem("id") && window.localStorage.getItem("isLogin") === "true" ? this.handleWishlist(product) : this.login()}
            className={classNames("btn btn-light btn-svg-icon btn-svg-icon--fake-svg product-card__wishlist")}
          ><Wishlist16Svg />
          </button>
        )
    )
  }

  render() {
    const { productDetails, } = this.props;
    const { quantity, } = this.state;

    const dbVariation = []
    const dbVariationDetailID = []
    productDetails[0].ProductVariation !== undefined && productDetails[0].ProductVariation !== null &&
      JSON.parse(productDetails[0].ProductVariation).map((x) => {
        dbVariation.push(x.ProductVariation)
        dbVariationDetailID.push(x.ProductVariationDetailID)
      })
    if (this.state.productVariationType === "") {
      this.setState({ productVariationType: dbVariation[0], isVariationSet: false, productVariationDetailID: dbVariationDetailID[0] })
    }

    return (
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", zIndex: 999 }}>
        {
          productDetails !== undefined && productDetails !== null && productDetails.map((product) => {
            return (
              <>
                <div>
                  <img
                    className="site-header__logo_img"
                    style={{ height: "5vw" }}
                    src={product.ProductImage !== null ? product.ProductImage : Logo}
                    onError={(e) => { e.target.onerror = null; e.target.src = Logo }}
                    alt={product.ProductName}
                  />
                </div>
                <div className="search__body" style={{ margin: "0 16px", width: "70%" }}>
                  <Typography variant="body1" className="product__name" style={{ fontWeight: "700" }}>{product.ProductName}</Typography>
                  <Typography variant="h6" className="product__prices">RM {product.ProductPrice}</Typography>
                </div>
                <div className="nav-panel__indicators">
                  <div className="form-group product__add-to-cart" >
                    <div className="product__actions">
                      <div className="product__actions-item product__actions-item--addtocart mx-1">

                        <button
                          type="button"
                          disabled={this.state.isVariationSet === true ?
                            (this.state.productQuantity > 0 ? false : true) :
                            (product.ProductStockAmount > 0 ? false : true)
                          }
                          onClick={() => window.localStorage.getItem("id") && window.localStorage.getItem("isLogin") === "true" ? this.checkCart(productDetails[0], quantity) : this.login()}
                          className="btn btn-primary product-card__addtocart"
                          style={{ borderRadius: "5px", zIndex: "999" }}
                        >
                          Add To Cart
                        </button>
                      </div>
                      <div className="product__actions-item product__actions-item--wishlist mx-1">
                        {this.wishlisting(productDetails[0])}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )
          })
        }

        {/* <img
          className="product-image__img"
          src={product.ProductImage !== null ? product.ProductImage : Logo}
          onError={(e) => { e.target.onerror = null; e.target.src = Logo }}
          alt={product.ProductName}
        /> */}
        {/* <ProductDetails product={product} />
        {
          this.props.version === "1" ? (
            <ProductTabs
              withSidebar
              product={product}
              currentTab={this.state}
              setCurrentTab={this.changeCurrentTab}
            />
          ) : (
            <ProductTabs
              product={product}
              currentTab={this.state}
              setCurrentTab={this.changeCurrentTab}
            />
          )
        } */}
      </div>
    );
  }
}

HeaderProductDetails.propTypes = {
  /** product object */
  product: PropTypes.object.isRequired,
  /** one of ['standard', 'sidebar', 'columnar', 'quickview'] (default: 'standard') */
  layout: PropTypes.oneOf(["standard", "sidebar", "columnar", "quickview"]),
};

HeaderProductDetails.defaultProps = {
  layout: "standard",
};

const mapStateToProps = (state) => ({
  wishlist: state.counterReducer.wishlist,
  productcart: state.counterReducer.productcart,

});


const mapDispatchToProps = (dispatch) => {
  return {
    CallUpdateProductCart: (prodData) => dispatch(GitAction.CallUpdateProductCart(prodData)),
    CallAddProductCart: (prodData) => dispatch(GitAction.CallAddProductCart(prodData)),
    CallDeleteProductWishlist: (prodData) => dispatch(GitAction.CallDeleteProductWishlist(prodData)),
    CallAddProductWishlist: (prodData) => dispatch(GitAction.CallAddProductWishlist(prodData)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderProductDetails);
