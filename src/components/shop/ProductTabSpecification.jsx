// react
import React, { Component } from "react";
// import { connect } from "react-redux";
// import { GitAction } from "../../store/action/gitAction";

// data stubs
import specification from "../../data/shopProductSpec";


// function mapStateToProps(state) {
//   return {
//     reviews: state.counterReducer["reviews"],
//     loading: state.counterReducer["loading"],
//     products: state.counterReducer["products"],
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     CallAddProductReview: (PropsData) => dispatch(GitAction.CallAddProductReview(PropsData)),
//     CallProductReviewByProductID: (PropsData) => dispatch(GitAction.CallProductReviewByProductID(PropsData)),
//     CallAllProducts: () => dispatch(GitAction.CallAllProducts()),
//   };
// }


class ProductTabSpecification extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }

    // this.props.CallAllProducts();
  }

  render() {

    const sections = specification.map((section, index) => {
      const features = section.features.map((feature, index) => (
        <div key={index} className="spec__row">
          {/* {console.log(feature)} */}
          <div className="spec__name">{feature.name}</div>
          <div className="spec__value">{feature.value}</div>
        </div>
      ));

      return (
        <div key={index} className="spec__section">
          <h4 className="spec__section-title">{section.name}</h4>
          {features}
        </div>
      );
    });
    return (


      <div className="spec">
        <h3 className="spec__header">Specification</h3>
        <div className="spec__section">
          <h4 className="spec__section-title">General</h4>

          <div className="spec__row">
            <div className="spec__name">Brand</div>
            <div className="spec__value">{this.props.product.Brand}</div>
          </div>

          <div className="spec__row">
            <div className="spec__name">Model</div>
            <div className="spec__value">{this.props.product.Model}</div>
          </div>
        </div>
        <div className="spec__section">
          <h4 className="spec__section-title">Dimensions</h4>
          <div className="spec__row">
            <div className="spec__name">Width</div>
            <div className="spec__value">
              {this.props.product.ProductDimensionWidth}
            </div>
          </div>
          <div className="spec__row">
            <div className="spec__name">Height</div>
            <div className="spec__value">
              {this.props.product.ProductDimensionHeight}
            </div>
          </div>
          <div className="spec__row">
            <div className="spec__name">Depth</div>
            <div className="spec__value">
              {this.props.product.ProductDimensionDeep}
            </div>
          </div>
          <div className="spec__row">
            <div className="spec__name">Weigth</div>
            <div className="spec__value">{this.props.product.ProductWeight}</div>
          </div>
        </div>
        <div className="spec__disclaimer">
          Information on technical characteristics, the delivery set, the country
          of manufacture and the appearance of the goods is for reference only and
          is based on the latest information available at the time of publication.
        </div>
      </div>
    );
  }
}

export default ProductTabSpecification;
// export default connect(mapStateToProps, mapDispatchToProps)(ProductTabSpecification);

