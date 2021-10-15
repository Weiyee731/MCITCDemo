// react
import React, { Component } from "react";


class ProductTabDescription extends Component {
    render() {
        const htmlString = this.props.product.ProductDescription
        return (
            <div className="typography">
                <div className="product__description--title">Product Description</div>
                <div className="product__description" dangerouslySetInnerHTML={{ __html: htmlString }}>
                </div>
            </div>
        );
    }
}

export default (ProductTabDescription);
