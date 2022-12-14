// react
import React, { Component } from "react";

const INITIAL_STATE = {
    isExpand: false
}

class ProductTabDescription extends Component {
    constructor(props) {
        super(props);
        this.state = INITIAL_STATE;
    }

    render() {
        const htmlString = this.props.product.ProductDescription
        const string = 'FATMANZ<br> AUTOCUT- CARBON BRUSH <br> BOSCH MODEL CODE <br> B-145 : GWS 6-100, GWS8-100, GWS 8-100CE <br> B-905 : GSB550RE, GBM10RE, GSR6-25TE <br> B-134 : PBH20RE, GBH2-24, PBH14-2 <br> B-525 : GBH2-22E, GBH 2-22RE, GBH2-26RE, GBH2-26DFR <br> B-171  : GWS20-180, GCO2000 <br> B-320 : GCO14-2 <br> B-912 : GST60PBE, GNA2.0, GGS27L <br> B-033 : GDM12-34 <br> B-138 : GSH388, GBH 5-38D <br> B-803 : GWS7-100'

        return (
            <div className="typography">
                <div className="product__description--title">Product Description</div>

                {string === "" || string === null ?
                    <div className="product__description"><label>Temporary there is no description for this product</label></div>
                    :
                    <div className={this.state.isExpand ? "product__description_expand" : "product__description"}>
                        <p style={{ fontSize: "14px" }} dangerouslySetInnerHTML={{ __html: string }} />
                        <p class="read-more"></p>
                        <p class="read-more-text" onClick={() => this.setState({ isExpand: !this.state.isExpand })}>{this.state.isExpand ? "Read Less" : "Read More"} </p>
                    </div>
                }


            </div>
        );
    }
}

export default (ProductTabDescription);
