// react
import React, { useMemo, useState, useEffect } from 'react';

// third-party
import { Helmet } from 'react-helmet-async';

// application
import shopApi from '../../api/shop';
import { useDeferredData, useProductColumns, useProductTabs } from '../../services/hooks';
import { connect } from "react-redux";
import { GitAction } from "../../store/action/gitAction";

// blocks
import BlockBanner from '../blocks/BlockBanner';
import BlockBrands from '../blocks/BlockBrands';
import BlockCategories from '../blocks/BlockCategories';
import BlockFeatures from '../blocks/BlockFeatures';
import BlockPosts from '../blocks/BlockPosts';
import BlockProductColumns from '../blocks/BlockProductColumns';
import BlockProducts from '../blocks/BlockProducts';
import BlockProductsCarousel from '../blocks/BlockProductsCarousel';
import BlockSlideShow from '../blocks/BlockSlideShow';
import BlockMainCategories from '../blocks/BlockMainCategories';
import BlockMoreButton from '../blocks/BlockMoreButton';

// data stubs
import categories from '../../data/shopBlockCategories';
import posts from '../../data/blogPosts';
import theme from '../../data/theme';

import { toast } from "react-toastify";

function mapStateToProps(state) {
  return {
    loading: state.counterReducer["loading"],
    products: state.counterReducer["products"],
    viewMoreProducts: state.counterReducer["viewMoreProducts"],
    productsByID: state.counterReducer["productsByID"],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    CallAllProducts: (propData) => dispatch(GitAction.CallAllProducts(propData)),
    CallViewMoreFunctionProduct: (propsData) => dispatch(GitAction.CallViewMoreFunctionProduct(propsData)),
    CallViewMoreEmpty: () => dispatch(GitAction.CallViewMoreEmpty()),
    CallGetProductByProductCategoryID: (propsData) => dispatch(GitAction.CallGetProductByProductCategoryID(propsData)),
  };
}

function HomePageTwo(props) {
  const featuredProducts = useProductTabs(
    useMemo(() => [
      { id: 1, name: 'All', categorySlug: undefined },
      { id: 2, name: 'Power Tools', categorySlug: 'power-tools' },
      { id: 3, name: 'Hand Tools', categorySlug: 'hand-tools' },
      { id: 4, name: 'Plumbing', categorySlug: 'plumbing' },
    ], []),
    (tab) => shopApi.getPopularProducts({ limit: 12, category: tab.categorySlug }),
  );

  const bestsellers = useDeferredData(() => (
    shopApi.getPopularProducts({ limit: 7 })
  ), []);

  let allProductsCategoryData = props.allcategories;
  let allProductsData = props.allproducts;
  const columns = useProductColumns(
    useMemo(() => [
      {
        title: 'Top Rated Products',
        source: () => shopApi.getTopRatedProducts({ limit: 3 }),
      },
      {
        title: 'Special Offers',
        source: () => shopApi.getDiscountedProducts({ limit: 3 }),
      },
      {
        title: 'Bestsellers',
        source: () => shopApi.getPopularProducts({ limit: 3 }),
      },
    ], []),
  );

  const [postsToShow, setPostsToShow] = useState([]);
  let tempArray = []
  const [page, setPage] = useState(1);
  let productPerPage = 20

  const loopWithSlice = () => {
    tempArray = [...postsToShow, ...props.products];
    setPostsToShow(tempArray)
  };

  const handleShowMorePosts = () => {
    setPage(page + 1)
  };

  useEffect(() => {
    props.CallAllProducts({ merchantId: 0, productPage: productPerPage, page: page })
    loopWithSlice()
  }, [page])

  return (
    <React.Fragment>
      <div className="block--margin-top">
        <Helmet>
          <title>{theme.name}</title>
        </Helmet>
        {useMemo(() => <BlockSlideShow />, [])}
        {useMemo(() => <BlockMainCategories />, [])}
        {useMemo(() => <BlockFeatures layout="boxed" />, [])}


        {useMemo(() => (
          props.products !== undefined && props.products.length > 0 &&
          <BlockProductsCarousel
            title="New Arrivals"
            layout="grid-4"
            rows={2}
            products={props.products}
          // loading={props.loading}
          // groups={allProducts.tabs}
          // onGroupClick={testing}
          />
        ), [props.loading, props.products])}

        {useMemo(() => (
          postsToShow !== undefined && postsToShow.length > 0 &&
          <BlockProducts
            title="Featured Products"
            layout="large-first"
            products={postsToShow}
          // loading={allProducts.loading}
          // groups={allProducts.tabs}
          // onGroupClick={allProducts.handleTabChange}
          />
        ), [postsToShow])}

        {/* {useMemo(() => (
          <BlockProducts
            title="Featured Products"
            layout="large-first"
            products={postsToShow}
            loading={allProducts.loading}
            groups={allProducts.tabs}
            onGroupClick={allProducts.handleTabChange}
          />
        ), [allProducts.handleTabChange, allProducts.tabs, postsToShow, props.loading])} */}

        {/* <BlockProducts
          title="Featured Products"
          layout="large-first"
          products={postsToShow}
          loading={allProducts.loading}
          groups={allProducts.tabs}
          onGroupClick={allProducts.handleTabChange}
        /> */}
        {
          props.products.length === 0 ? "" :
            (
              <div className="my-4">
                <BlockMoreButton viewMore={handleShowMorePosts} />
              </div>
            )
        }

      </div>
    </React.Fragment>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePageTwo);
