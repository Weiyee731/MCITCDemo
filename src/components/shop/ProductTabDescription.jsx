// react
import React, { Component } from "react";


class ProductTabDescription extends Component {
    render() {
        const htmlString = this.props.product.ProductDescription
        console.log("length description", this.props.product.ProductDescription)
        return (
            <div className="typography">
                <div className="product__description--title">Product Description</div>
                {htmlString === null ?
                    <div className="product__description"><label>Temporary there is no description for this product</label></div>
                    :
                    <div className="product__description" dangerouslySetInnerHTML={{ __html: htmlString }} />
                }


            </div>
        );
    }
}

export default (ProductTabDescription);
