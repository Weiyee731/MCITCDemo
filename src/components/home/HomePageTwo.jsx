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

function mapStateToProps(state) {
  return {
    loading: state.counterReducer["loading"],
    products: state.counterReducer["products"],
    viewMoreProducts: state.counterReducer["viewMoreProducts"],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    CallAllProducts: () => dispatch(GitAction.CallAllProducts()),
    CallViewMoreFunctionProduct: (propsData) => dispatch(GitAction.CallViewMoreFunctionProduct(propsData)),
  };
}

function HomePageTwo(props) {
  /**
   * Featured products.
   */
  const featuredProducts = useProductTabs(
    useMemo(() => [
      { id: 1, name: 'All', categorySlug: undefined },
      { id: 2, name: 'Power Tools', categorySlug: 'power-tools' },
      { id: 3, name: 'Hand Tools', categorySlug: 'hand-tools' },
      { id: 4, name: 'Plumbing', categorySlug: 'plumbing' },
    ], []),
    (tab) => shopApi.getPopularProducts({ limit: 12, category: tab.categorySlug }),
  );

  /**
   * Bestsellers.
   */
  const bestsellers = useDeferredData(() => (
    shopApi.getPopularProducts({ limit: 7 })
  ), []);

  /**
   * Latest products.
   */
  const latestProducts = useProductTabs(
    useMemo(() => [
      { id: 1, name: 'All', categorySlug: undefined },
      { id: 2, name: 'Power Tools', categorySlug: 'power-tools' },
      { id: 3, name: 'Hand Tools', categorySlug: 'hand-tools' },
      { id: 4, name: 'Plumbing', categorySlug: 'plumbing' },
    ], []),
    (tab) => shopApi.getLatestProducts({ limit: 8, category: tab.categorySlug }),
  );

  const allProducts = useProductTabs(
    useMemo(() => [
      { id: 1, name: 'All', categorySlug: undefined },
      { id: 2, name: 'Power Tools', categorySlug: 'power-tools' },
      { id: 3, name: 'Hand Tools', categorySlug: 'hand-tools' },
      { id: 4, name: 'Plumbing', categorySlug: 'plumbing' },
    ], []),
    (tab) => shopApi.getAllProducts()
  );

  // const allProducts = useProductTabs(
  //   useMemo(() => [
  //     { id: 1, name: 'All', categorySlug: undefined },
  //     { id: 2, name: 'Power Tools', categorySlug: 'power-tools' },
  //     { id: 3, name: 'Hand Tools', categorySlug: 'hand-tools' },
  //     { id: 4, name: 'Plumbing', categorySlug: 'plumbing' },
  //   ], []),
  //   (tab) => shopApi.getAllProducts()
  // );

  // const viewMoreProducts = useDeferredData(() => (
  //   shopApi.getViewMoreProducts()
  // ), []);

  /**
   * Product columns.
   */
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

  const [postsToShow, setPostsToShow] = useState(props.viewMoreProducts);
  let tempArray = []
  let pages =1
  const [Page, setPage] = useState(pages);
  let ProductPerPage =3

  const loopWithSlice = () => {
    tempArray = [...postsToShow, ...props.viewMoreProducts];

    setPostsToShow(tempArray)
    console.log(tempArray)

    // const newArray= postsToShow.filter(function(elem, pos) {
    //   return postsToShow.indexOf(elem) == pos;
    // });
    // console.log(postsToShow)
  };

  const handleShowMorePosts = () => {
    setPage(Page + 1)
    props.CallViewMoreFunctionProduct({Page, ProductPerPage})
    loopWithSlice();
  };

  useEffect(() => {
    props.CallViewMoreFunctionProduct({Page, ProductPerPage})
  })

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
          <BlockProductsCarousel
            title="New Arrivals"  
            layout="grid-4"
            rows={2}
            products={allProducts.data}
            loading={allProducts.loading}
            groups={allProducts.tabs}
            onGroupClick={allProducts.handleTabChange}
          />
        ), [allProducts.handleTabChange, allProducts.tabs, props.loading, props.products])}

        {useMemo(() => (
          <BlockProducts
            title="Featured Products"
            layout="large-first"
            products={postsToShow}
            loading={allProducts.loading}
            groups={allProducts.tabs}
            onGroupClick={allProducts.handleTabChange}
          />
        ), [allProducts.handleTabChange, allProducts.tabs, postsToShow, props.loading])}

        <div className="my-4">
         
          <BlockMoreButton viewMore={handleShowMorePosts} />
        </div>
      </div>
    </React.Fragment>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePageTwo);
