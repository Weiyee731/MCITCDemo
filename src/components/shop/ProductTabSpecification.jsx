// react
import React, { Component } from "react";

// data stubs
import specification from "../../data/shopProductSpec";

class ProductTabSpecification extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const sections = specification.map((section, index) => {
      const features = section.features.map((feature, index) => (
        <div key={index} className="spec__row">
          <div className="spec__name">{feature.name}</div>
          <div className="spec__value">{feature.value}</div>
        </div>
      ));

      return (
        <div key={index} className="spec__section">
          <div className="spec__section-title">{section.name}</div>
          {features}
        </div>
      );
    });

    return (
      <div className="spec">
        <div className="spec__header">Specification</div>
        <div className="row">
          <div className="spec__section col-6">
            <div className="spec__section-title">General</div>

            <div className="spec__row">
              <div className="spec__name">Brand</div>
              <div className="spec__value">{this.props.product.Brand !== "" ? this.props.product.Brand : "Not Stated"}</div>
            </div>

            <div className="spec__row">
              <div className="spec__name">Model</div>
              <div className="spec__value">{this.props.product.Model !== "" ? this.props.product.Model : "Not Stated"}</div>
            </div>
          </div>
          <div className="spec__section col-6">
            <div className="spec__section-title">Dimensions</div>
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

