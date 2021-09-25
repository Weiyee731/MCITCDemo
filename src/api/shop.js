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

const url = "http://tourism.denoo.my/emporia/api/emporia/"
// const url = "localhost/emporia/api/emporia/"

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
    return fetch(url + "Product_ItemList")
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
      url + "Product_CategoryListByProductCategorySlug?ProductCategorySlug=" + slug
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

  getViewMoreProducts: (page = {}) => {
    return fetch(url + "Product_ViewMoreItemList")
      .then((response) => response.json())
      .then((json) => {
        json = JSON.parse(json);
        // alert(json);
        return json;
      });
  },

  getProductsListByCategory: (productCategoryID) => {
    return fetch(
      url + "Product_ItemListByCategory?ProductCategoryID=" + productCategoryID + "&ProductPerPage=2&Page=1&Filter=1"
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
    return fetch(
      url + "Product_ItemListByCategorySlug?ProductCategorySlug=" +
      options.categorySlug +
      "&ProductPerPage=" +
      options.limit +
      "&Page=1&Filter=1"
    )
      .then((response) => response.json())
      .then((json) => {
        // json = JSON.parse(json);
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
    return fetch(
      url + "Order_AddOrder?USERID=" +
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
    // return fetch(
    //   url + "Order_AddOrder?USERID=" +
    //   options.UserID +
    //   "&USERADDRESSID=0&PROMOTIONID=0&PROMOTIONCODEID=0&PAYMENTMETHODID=0&PRODUCTID=" +
    //   options.Products +
    //   "&PRODUCTQUANTITY=" +
    //   options.ProductQuantity
    // )
    //   .then((response) => response.json())
    //   .then((json) => {
    //     json = JSON.parse(json);

    //     return json;
    //   });
    return getSuggestions(query, options);
  },
};

export default shopApi;
