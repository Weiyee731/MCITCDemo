/* eslint-disable arrow-body-style */
// eslint-disable-next-line no-unused-vars
import qs from "query-string";
import {
  getCategories,
  // getCategoryBySlug,
} from "../fake-server/endpoints/categories";
import {
  getDiscountedProducts,
  getFeaturedProducts,
  getLatestProducts,
  getPopularProducts,
  getProductBySlug,
  getProductsList,
  getRelatedProducts,
  getSuggestions,
  getTopRatedProducts,
} from "../fake-server/endpoints/products";

const shopApi = {
  /**
   * Returns array of categories.
   *
   * @param {object?} options
   * @param {number?} options.depth
   *
   * @return {Promise<Array<object>>}
   */
  getCategories: (options = {}) => {
    /**
     * This is what your API endpoint might look like:
     *
     * https://example.com/api/categories.json?depth=2
     *
     * where:
     * - 2 = options.depth
     */
    // return fetch(`https://example.com/api/categories.json?${qs.stringify(options)}`)
    //     .then((response) => response.json());

    // This is for demonstration purposes only. Remove it and use the code above.
    return getCategories(options);
  },
  getAllProducts: () => {
    return fetch("http://tourism.denoo.my/LoopApi/api/LoopApi/Product_ItemList")
      .then((response) => response.json())
      .then((json) => {
        json = JSON.parse(json);
        // alert(json);
        return json;
      });
  },
  /**
   * Returns category by slug.
   *
   * @param {string} slug
   * @param {object?} options
   * @param {number?} options.depth
   *
   * @return {Promise<object>}
   */
  getCategoryBySlug: (slug, options = {}) => {
    return fetch(
      `http://tourism.denoo.my/LoopApi/api/LoopApi/Product_CategoryListByProductCategorySlug?ProductCategorySlug=${slug}`
    ).then((response) => response.json());
  },
  /**
   * Returns product.
   *
   * @param {string} slug
   *
   * @return {Promise<object>}
   */
  getProductBySlug: (slug) => {
    /**
     * This is what your API endpoint might look like:
     *
     * https://example.com/api/products/screwdriver-a2017.json
     *
     * where:
     * - screwdriver-a2017 = slug
     */
    // return fetch(`https://example.com/api/products/${slug}.json`)
    //     .then((response) => response.json());

    // This is for demonstration purposes only. Remove it and use the code above.
    return getProductBySlug(slug);
  },
  /**
   * Returns array of related products.
   *
   * @param {string}  slug
   * @param {object?} options
   * @param {number?} options.limit
   *
   * @return {Promise<Array<object>>}
   */
  getRelatedProducts: (slug, options = {}) => {
    /**
     * This is what your API endpoint might look like:
     *
     * https://example.com/api/shop/products/screwdriver-a2017/related.json&limit=3
     *
     * where:
     * - screwdriver-a2017 = slug
     * - limit             = options.limit
     */
    // return fetch(`https://example.com/api/products/${slug}/related.json?${qs.stringify(options)}`)
    //     .then((response) => response.json());

    // This is for demonstration purposes only. Remove it and use the code above.
    return getRelatedProducts(slug, options);
  },
  /**
   * Return products list.
   *
   * @param {object?} options
   * @param {number?} options.page
   * @param {number?} options.limit
   * @param {string?} options.sort
   * @param {Object.<string, string>?} filters
   *
   * @return {Promise<object>}
   */
  getProductsList: (options = {}, filters = {}) => {
    return fetch("http://tourism.denoo.my/LoopApi/api/LoopApi/Product_ItemList")
      .then((response) => response.json())
      .then((json) => {
        json = JSON.parse(json);
        // alert(json);
        return json;
      });
  },

  getProductsListByCategory: (productCategoryID) => {
    console.log(
      `http://tourism.denoo.my/LoopApi/api/LoopApi/Product_ItemListByCategory?ProductCategoryID=${productCategoryID}&ProductPerPage=2&Page=1&Filter=1`
    );
    return fetch(
      `http://tourism.denoo.my/LoopApi/api/LoopApi/Product_ItemListByCategory?ProductCategoryID=${productCategoryID}&ProductPerPage=2&Page=1&Filter=1`
    ).then((response) => response.json());
  },
  /**
   * Returns array of featured products.
   *
   * @param {object?} options
   * @param {number?} options.limit
   * @param {string?} options.category
   *
   * @return {Promise<Array<object>>}
   */
  getFeaturedProducts: (options = {}) => {
    /**
     * This is what your API endpoint might look like:
     *
     * https://example.com/api/shop/featured-products.json?limit=3&category=power-tools
     *
     * where:
     * - 3           = options.limit
     * - power-tools = options.category
     */
    // return fetch(`https://example.com/api/featured-products.json?${qs.stringify(options)}`)
    //     .then((response) => response.json());

    // This is for demonstration purposes only. Remove it and use the code above.
    return getFeaturedProducts(options);
  },
  /**
   * Returns array of latest products.
   *
   * @param {object?} options
   * @param {number?} options.limit
   * @param {string?} options.category
   *
   * @return {Promise<Array<object>>}
   */
  getLatestProducts: (options = {}) => {
    console.log(
      "http://tourism.denoo.my/LoopApi/api/LoopApi/Product_ItemListByCategorySlug?ProductCategorySlug=" +
        options.ProductCategorySlug +
        "&ProductPerPage=" +
        options.ProductPerPage +
        "&Page=1&Filter=1"
    );
    return fetch(
      "http://tourism.denoo.my/LoopApi/api/LoopApi/Product_ItemListByCategorySlug?ProductCategorySlug=" +
        options.ProductCategorySlug +
        "&ProductPerPage=" +
        options.ProductPerPage +
        "&Page=1&Filter=1"
    )
      .then((response) => response.json())
      .then((json) => {
        json = JSON.parse(json);
        // alert(json);
        return json;
      });
    // return getLatestProducts(options);
  },
  /**
   * Returns an array of top rated products.
   *
   * @param {object?} options
   * @param {number?} options.limit
   * @param {string?} options.category
   *
   * @return {Promise<Array<object>>}
   */
  getTopRatedProducts: (options = {}) => {
    /**
     * This is what your API endpoint might look like:
     *
     * https://example.com/api/shop/top-rated-products.json?limit=3&category=power-tools
     *
     * where:
     * - 3           = options.limit
     * - power-tools = options.category
     */
    // return fetch(`https://example.com/api/top-rated-products.json?${qs.stringify(options)}`)
    //     .then((response) => response.json());

    // This is for demonstration purposes only. Remove it and use the code above.
    return getTopRatedProducts(options);
  },
  /**
   * Returns an array of discounted products.
   *
   * @param {object?} options
   * @param {number?} options.limit
   * @param {string?} options.category
   *
   * @return {Promise<Array<object>>}
   */

  addOrder: (options = {}) => {
    console.log(
      "http://tourism.denoo.my/LoopApi/api/LoopApi/Order_AddOrder?USERID=" +
        options.UserID +
        "&USERADDRESSID=-&PROMOTIONID=0&PROMOTIONCODEID=0&PAYMENTMETHODID=0&PRODUCTID=" +
        options.Products +
        "&PRODUCTQUANTITY=" +
        options.ProductQuantity
    );
    return fetch(
      "http://tourism.denoo.my/LoopApi/api/LoopApi/Order_AddOrder?USERID=" +
        options.UserID +
        "&USERADDRESSID=0&PROMOTIONID=0&PROMOTIONCODEID=0&PAYMENTMETHODID=0&PRODUCTID=" +
        options.Products +
        "&PRODUCTQUANTITY=" +
        options.ProductQuantity
    )
      .then((response) => response.json())
      .then((json) => {
        json = JSON.parse(json);

        return json;
      });
  },
  getDiscountedProducts: (options = {}) => {
    /**
     * This is what your API endpoint might look like:
     *
     * https://example.com/api/shop/discounted-products.json?limit=3&category=power-tools
     *
     * where:
     * - 3           = options.limit
     * - power-tools = options.category
     */
    // return fetch(`https://example.com/api/discounted-products.json?${qs.stringify(options)}`)
    //     .then((response) => response.json());

    // This is for demonstration purposes only. Remove it and use the code above.
    return getDiscountedProducts(options);
  },
  /**
   * Returns an array of most popular products.
   *
   * @param {object?} options
   * @param {number?} options.limit
   * @param {string?} options.category
   *
   * @return {Promise<Array<object>>}
   */
  getPopularProducts: (options = {}) => {
    /**
     * This is what your API endpoint might look like:
     *
     * https://example.com/api/shop/popular-products.json?limit=3&category=power-tools
     *
     * where:
     * - 3           = options.limit
     * - power-tools = options.category
     */
    // return fetch(`https://example.com/api/popular-products.json?${qs.stringify(options)}`)
    //     .then((response) => response.json());

    // This is for demonstration purposes only. Remove it and use the code above.
    return getPopularProducts(options);
  },
  /**
   * Returns search suggestions.
   *
   * @param {string}  query
   * @param {object?} options
   * @param {number?} options.limit
   * @param {string?} options.category
   *
   * @return {Promise<Array<object>>}
   */
  getSuggestions: (query, options = {}) => {
    /**
     * This is what your API endpoint might look like:
     *
     * https://example.com/api/search/suggestions.json?query=screwdriver&limit=5&category=power-tools
     *
     * where:
     * - query    = query
     * - limit    = options.limit
     * - category = options.category
     */
    // return fetch(`https://example.com/api/search/suggestions.json?${qs.stringify({ ...options, query })}`)
    //     .then((response) => response.json());

    // This is for demonstration purposes only. Remove it and use the code above.
    return getSuggestions(query, options);
  },
};

export default shopApi;
