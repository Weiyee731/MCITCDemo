// react
import React, { useMemo, useState, useEffect } from 'react';

// third-party
import { Helmet } from 'react-helmet-async';

// application
import shopApi from '../../api/shop';
import { useDeferredData, useProductColumns, useProductTabs } from '../../services/hooks';

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
    useMemo(
      () => [
        { id: 1, name: "", categorySlug: undefined },
      ],
      []
    ),
    (tab) => shopApi.getAllProducts()
  );

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

  const [postsToShow, setPostsToShow] = useState([]);
  const [next, setNext] = useState(3);

  let postsPerPage = 3
  let tempArray = []

  const loopWithSlice = (start, end) => {
    console.log(start)
    console.log(end)
    console.log(allProducts)
    console.log(allProducts.isLoading)
    const slicedPosts = allProducts.data.slice(start, end);
    tempArray = [...tempArray, ...slicedPosts];
    setPostsToShow(tempArray);
  };

  const handleShowMorePosts = () => {
    loopWithSlice(next, next + postsPerPage);
    setNext(next + postsPerPage);
  };

  useEffect(() => {
    loopWithSlice(0, postsPerPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <div className="block--top-margin">
        <Helmet>
          <title>{theme.name}</title>
        </Helmet>

        {useMemo(() => <BlockSlideShow />, [])}

        {useMemo(() => <BlockMainCategories />, [])}

        {useMemo(() => (
          <BlockProductsCarousel
            title="New Arrivals"
            layout="grid-4"
            rows={2}
            products={allProducts.data}
            loading={allProducts.isLoading}
            groups={allProducts.tabs}
            onGroupClick={allProducts.handleTabChange}
          />
        ), [allProducts.data, allProducts.handleTabChange, allProducts.isLoading, allProducts.tabs])}

        {useMemo(() => (
          <BlockProducts
            title="Featured Products"
            layout="large-first"
            products={postsToShow}
            loading={allProducts.isLoading}
            groups={allProducts.tabs}
            onGroupClick={allProducts.handleTabChange}
          />
        ), [allProducts.handleTabChange, allProducts.isLoading, allProducts.tabs, postsToShow])}

        {useMemo(() =>
          <div className="my-4">
            <BlockMoreButton viewMore={handleShowMorePosts} />
          </div>
        )}

        {/* {useMemo(() => <BlockFeatures layout="boxed" />, [])} */}

        {/* {useMemo(() => <BlockBanner />, [])}

      {useMemo(
        () => (
          <BlockProducts
            title="Bestsellers"
            layout="large-first"
            featuredProduct={allProducts.data}
            products={allProducts.data.slice(1, 7)}
          />
        ),
        [allProductsData]
      )} */}
      </div>
    </React.Fragment>
  );
}

export default HomePageTwo;
