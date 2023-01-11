// react
import React from "react";

// third-party
import classNames from "classnames";
import PropTypes from "prop-types";

// application
import BlockHeader from "../shared/BlockHeader";
import ProductCard from "../shared/ProductCard";
import { Card, } from "@mui/material";

export default function BlockProducts(props) {
  const { title, layout, featuredProduct, products, loading, withSidebar } = props;



  let large;
  let smalls;

  // if (featuredProduct) {
  //   large = (
      
  //     <div className="block-products__featured">
  //       <div className="block-products__featured-item">
  //         <ProductCard product={featuredProduct} />
  //       </div>
  //     </div>
  //   );
  // }
  if (products.length > 0) {
    const blockClasses = classNames("block-products__list-item", {
      "block-products-carousel--loading": loading,
    });
    const productsList = products.map((product, index) => (
      <Card elevation={2} key={index} className={blockClasses}>
        <ProductCard {...props} product={product} />
      </Card>
    ));

    smalls = <div className="block-products__list">{productsList}</div>;
  }
  console.log("CHECKKKKK4")
  return (
    <div className={`block block-products block-products--layout--${layout}`}>
      {
        typeof products.ReturnVal !== 'undefined' && products.ReturnVal !== 1 ?
          <div>This shop does not have any products yet</div>
          :
          (
            <div className="container">
              <BlockHeader title={title} showAll={"/shop/ProductListing/type:Merchant&typevalue:" + 0} />
              <div>
                {layout === "large-first" && large}
                {smalls}
                {layout === "large-last" && large}
              </div>
            </div>
          )
      }
    </div>
  );
}

BlockProducts.propTypes = {
  title: PropTypes.string.isRequired,
  featuredProduct: PropTypes.object,
  products: PropTypes.array,
  layout: PropTypes.oneOf(["large-first", "large-last"]),
};

BlockProducts.defaultProps = {
  products: [],
  layout: "large-first",
};
