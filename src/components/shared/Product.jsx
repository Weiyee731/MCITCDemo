// react
import React, { Component } from "react";

// third-party
import PropTypes from "prop-types";
import { connect } from "react-redux";

// application
import ProductTabs from "../shop/ProductTabs";
import BlockProductsCarousel from '../blocks/BlockProductsCarousel';
import 'react-loading-skeleton/dist/skeleton.css'
import ProductDetails from './ProductDetails'

class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quantity: 1,
      currentTab: "description",
      productVariation: "",
      productPrice: "",
      productQuantity: 0,
      productVariationDetailID: "",
      selectedVariation: "",
      isVariationSet: false,
      productVariationType: "",
      isProductSet: false,
      isTimerEnd: false
    };
  }

  componentDidMount() {
    const { product } = this.props
    // window.scrollTo(0, 0) // Temporary fixing randomly show when page loads
    let productID = ""
    if (window.location.pathname !== undefined) {
      let length = window.location.pathname.split("/").length
      productID = window.location.pathname.split("/")[length - 1]
    }

    if (product !== undefined && productID !== "" && product.ProductID === parseInt(productID)) {
      product.ProductVariation !== null && JSON.parse(product.ProductVariation).map((variation) => {
        variation.ProductVariationValue === "-" &&
          this.setState({
            productVariation: variation.ProductVariationValue,
            productQuantity: variation.ProductStockAmount,
            productVariationDetailID: variation.ProductVariationDetailID,
            productVariationType: variation.ProductVariation,
          })
      })
      this.setState({ productPrice: product.ProductPrice, isProductSet: true })
    } else {
      this.setState({ isProductSet: false })
    }
  }
  componentDidUpdate(props) {
    const { product } = this.props
    let productID = ""
    if (window.location.pathname !== undefined) {
      let length = window.location.pathname.split("/").length
      productID = window.location.pathname.split("/")[length - 1]
    }

    if (product !== undefined && productID !== "" && product.ProductID === parseInt(productID) && this.state.isProductSet === false) {
      product.ProductVariation !== null && JSON.parse(product.ProductVariation).map((variation) => {
        variation.ProductVariationValue === "-" &&
          this.setState({
            productVariation: variation.ProductVariationValue,
            productQuantity: variation.ProductStockAmount,
            productVariationDetailID: variation.ProductVariationDetailID,
            productVariationType: variation.ProductVariation,
          })
      })
      this.setState({ productPrice: product.ProductPrice, isProductSet: true })
    }
  }

  changeCurrentTab = (value) => {
    this.setState({
      currentTab: value,
    });
  };

  render() {
    const {
      product,
    } = this.props;

    const baseColor = "#c4c4c4"
    const highlightColor = "#ffffff"

    if (this.state.isTimerEnd === false)
      setInterval(() => {
        this.setState({ isTimerEnd: true })
      }, 2000)

    return (
 
      <div className="block" >
        <ProductDetails product={product} />
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
        }
        <BlockProductsCarousel
          title="Recommended Product"
          layout="grid-4"
          rows={1}
          QuickViewIndicator={true}
          currentData={this.state}
          highlightColor={highlightColor}
          baseColor={baseColor}
          products={product.ProductRecommendation !== null && product.ProductRecommendation !== undefined
            ? JSON.parse(product.ProductRecommendation) : []}
        />

      </div >
    );
  }
}

Product.propTypes = {
  /** product object */
  product: PropTypes.object.isRequired,
  /** one of ['standard', 'sidebar', 'columnar', 'quickview'] (default: 'standard') */
  layout: PropTypes.oneOf(["standard", "sidebar", "columnar", "quickview"]),
};

Product.defaultProps = {
  layout: "standard",
};

const mapStateToProps = (state) => ({
  wishlist: state.counterReducer.wishlist,
  productcart: state.counterReducer.productcart
});


const mapDispatchToProps = (dispatch) => {
  return {
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
