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
  };
}

function mapDispatchToProps(dispatch) {
  return {
    CallAllProducts: (propData) => dispatch(GitAction.CallAllProducts(propData)),
  };
}

function HomePageTwo(props) {
  const [postsToShow, setPostsToShow] = useState([]);
  let tempArray = []
  const [page, setPage] = useState(1);
  let productPerPage = 20

  const loopWithSlice = () => {
    if (props.viewMoreProducts.length > 0 && props.viewMoreProducts[0].ReturnVal !== undefined && props.viewMoreProducts[0].ReturnVal !== "1") { toast.warning("There is no more product") }
    else {
      tempArray = [...postsToShow, ...props.viewMoreProducts];
      setPostsToShow(tempArray)
      props.CallViewMoreEmpty()
    }
  };

  const handleShowMorePosts = () => {
    setPage(page + 1)
    props.CallViewMoreFunctionProduct({ type: "Merchant", typeValue: 0, userID: 0, productPerPage: productPerPage, page: page })
  };

  useEffect(() => {
    if (page <= 1) {
      setPage(page + 1)
      props.CallViewMoreFunctionProduct({ type: "Merchant", typeValue: 0, userID: 0, productPerPage: productPerPage, page: page })
    }
    if (props.viewMoreProducts.length > 0) {
      loopWithSlice()
    }
  }, [props.viewMoreProducts])

  useEffect(() => {
    props.CallAllProducts({ type: "Merchant", typeValue: 0, userID: 0, productPerPage: 999, page: 1 })
  }, [])

  console.log("IN HOMEPAGE props", props)
  // console.log("IN HOMEPAGE postsToShow", postsToShow)
  // console.log("IN HOMEPAGE products", props.products)

  return (
    <React.Fragment>
      <div className="block--margin-top">
        {console.log("hello", props)}
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
            products={props.products !== [] ? props.products : []}
          />
        ), [props.loading, props.products])}

        {useMemo(() => (
          postsToShow !== undefined && postsToShow.length > 0 &&
          <BlockProducts
            title="Featured Products"
            layout="large-first"
            products={postsToShow !== [] ? postsToShow : []}
          />
        ), [postsToShow])}
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
