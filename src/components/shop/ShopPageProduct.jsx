// react
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// third-party
import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";

// application
import PageHeader from "../shared/PageHeader";
import Product from "../shared/Product";
import ProductTabs from "./ProductTabs";
import shopApi from "../../api/shop";
import { url } from "../../services/utils";
import { GitAction } from "../../store/action/gitAction";

// blocks
import BlockLoader from "../blocks/BlockLoader";
import BlockProductsCarousel from "../blocks/BlockProductsCarousel";

// widgets
import WidgetCategories from "../widgets/WidgetCategories";
import WidgetProducts from "../widgets/WidgetProducts";

// data stubs
import categories from "../../data/shopWidgetCategories";
import theme from "../../data/theme";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    loading: state.counterReducer["loading"],
    product: state.counterReducer["productsByID"],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    CallAllProducts: (propData) => dispatch(GitAction.CallAllProducts(propData)),
    CallProductDetail: (propData) => dispatch(GitAction.CallProductDetail(propData)),
  };
}

function ShopPageProduct(props) {
  const { productSlug, layout, sidebarPosition } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);

  // Load product.
  useEffect(() => {
    let canceled = false;

    setIsLoading(true);
    console.log("in shop page product", props)
    props.CallProductDetail({productId: productSlug, userId: 1})
    
    setProduct(props.product);
    setIsLoading(false);

    // shopApi.getProductByID(productSlug).then((product) => {
    //   if (canceled) {
    //     return;
    //   }
    //   product.map((productToBeUsed) => {
    //   });
    // });

    // props.CallAllProducts({ merchantId: 0, productPage: 999, page: 1 }).then((product) => {
    //   if (canceled) {
    //     return;
    //   }
    //   product.map((productToBeUsed) => {
    //     if (productToBeUsed.ProductName.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '_') === productSlug.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '_')) {
    //       setProduct(productToBeUsed);
    //       setIsLoading(false);
    //     }
    //   });
    // });

    return () => {
      canceled = true;
    };
    
  }, [productSlug, setIsLoading]);

  // Load related products.
  useEffect(() => {
    let canceled = false;

    shopApi.getRelatedProducts(productSlug, { limit: 8 }).then((products) => {
      if (canceled) {
        return;
      }

      setRelatedProducts(products);
    });

    return () => {
      canceled = true;
    };
  }, [productSlug, setRelatedProducts]);

  // Load latest products.
  useEffect(() => {
    let canceled = false;

    if (layout !== "sidebar") {
      setLatestProducts([]);
    } else {
      shopApi.getLatestProducts({ limit: 5 }).then((result) => {
        if (canceled) {
          return;
        }

        setLatestProducts(result);
      });
    }

    return () => {
      canceled = true;
    };
  }, [layout]);

  if (isLoading) {
    return <BlockLoader />;
  }

  const breadcrumb = [
    { title: "Home", url: url.home() },
    // { title: "Shop", url: url.catalog() },
    { title: product.slug, url: url.product(product) },
  ];

  let content;

  if (layout === "sidebar") {
    const sidebar = (
      <div className="shop-layout__sidebar">
        <div className="block block-sidebar">
          <div className="block-sidebar__item">
            <WidgetCategories categories={categories} location="shop" />
          </div>
          <div className="block-sidebar__item d-none d-lg-block">
            <WidgetProducts title="Latest Products" products={latestProducts} />
          </div>
        </div>
      </div>
    );

    content = (
      <div className="container">
        <div className={`shop-layout shop-layout--sidebar--${sidebarPosition}`}>
          {sidebarPosition === "start" && sidebar}
          <div className=" shop-layout__content">
            <div className=" block">
              <Product product={product} layout={layout} version="1" />
              {/* <ProductTabs withSidebar /> */}
            </div>
            {/* 
            {relatedProducts.length > 0 && (
              <BlockProductsCarousel
                title="Related Products"
                layout="grid-4-sm"
                products={relatedProducts}
                withSidebar
              />
            )} */}
          </div>
          {sidebarPosition === "end" && sidebar}
        </div>
      </div>
    );
  } else {
    content = (
      <React.Fragment>
        <div className="block">
          <div className="container">
            <Product product={product} layout={layout} version="2" />
            {/* <ProductTabs product={product} /> */}
          </div>
        </div>

        {/* {relatedProducts.length > 0 && (
          <BlockProductsCarousel
            title="Related Products"
            layout="grid-5"
            products={relatedProducts}
          />
        )} */}
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Helmet>
        <title>{`${product.ProductName} — ${theme.name}`}</title>
      </Helmet>

      <PageHeader breadcrumb={breadcrumb} />

      {content}
    </React.Fragment>
  );
}

ShopPageProduct.propTypes = {
  /** Product slug. */
  productSlug: PropTypes.string,
  /** one of ['standard', 'sidebar', 'columnar', 'quickview'] (default: 'standard') */
  layout: PropTypes.oneOf(["standard", "sidebar", "columnar", "quickview"]),
  /**
   * sidebar position (default: 'start')
   * one of ['start', 'end']
   * for LTR scripts "start" is "left" and "end" is "right"
   */
  sidebarPosition: PropTypes.oneOf(["start", "end"]),
};

ShopPageProduct.defaultProps = {
  layout: "standard",
  sidebarPosition: "start",
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopPageProduct);
