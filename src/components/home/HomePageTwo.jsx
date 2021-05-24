// react
import React, { useMemo } from 'react';

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
                // { id: 2, name: "Power Tools", categorySlug: "power-tools" },
                // { id: 3, name: "Hand Tools", categorySlug: "hand-tools" },
                // { id: 4, name: "Plumbing", categorySlug: "plumbing" },
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

    return (
        <React.Fragment>
            <Helmet>
                <title>{`Home Page Two — ${theme.name}`}</title>
            </Helmet>

            {useMemo(() => <BlockSlideShow />, [])}



            {/* {useMemo(() => (
                <BlockCategories
                    title="Popular Categories"
                    layout="compact"
                    categories={categories}
                />
            ), [])} */}

            {useMemo(() => (
                <BlockProductsCarousel
                    title="New Arrivals"
                    layout="grid-5"
                    products={allProducts.data}
                    loading={allProducts.isLoading}
                    groups={allProducts.tabs}
                    onGroupClick={allProducts.handleTabChange}
                />
            ), [allProducts])}

            {useMemo(() => <BlockFeatures layout="boxed" />, [])}

            {useMemo(() => (
                <BlockProductsCarousel
                    title="Featured Products"
                    layout="grid-5"
                    rows={2}
                    products={allProducts.data}
                    loading={allProducts.isLoading}
                    groups={allProducts.tabs}
                    onGroupClick={allProducts.handleTabChange}
                />
            ), [allProducts])}

            {useMemo(() => <BlockBanner />, [])}

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
            )}

            {/* {useMemo(() => <BlockPosts title="Latest News" layout="grid-nl" posts={posts} />, [])} */}

            {/* {useMemo(() => <BlockBrands />, [])} */}

            {/* {useMemo(() => <BlockProductColumns columns={columns} />, [columns])} */}
        </React.Fragment>
    );
}

export default HomePageTwo;
