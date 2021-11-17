// react
import React, { useEffect, useReducer, useState } from "react";

// third-party
import PropTypes from "prop-types";
import queryString from "query-string";
import { connect } from "react-redux";
import { Helmet } from "react-helmet-async";

// application
import BlockLoader from "../blocks/BlockLoader";
import CategorySidebar from "./CategorySidebar";
import CategorySidebarItem from "./CategorySidebarItem";
import PageHeader from "../shared/PageHeader";
import ProductsView from "./ProductsView";
// import shopApi from "../../api/shop";
import WidgetFilters from "../widgets/WidgetFilters";
import WidgetProducts from "../widgets/WidgetProducts";
import { sidebarClose } from "../../store/sidebar";
import CategoryFilterBuilder from "../../api/filters/category";
import CheckFilterBuilder from "../../api/filters/check";
import RadioFilterBuilder from "../../api/filters/range";
import ColorFilterBuilder from "../../api/filters/color";
import RangeFilterBuilder from "../../api/filters/price";
// data stubs
import theme from "../../data/theme";
import { url, getCategoryParents } from "../../services/utils";

function parseQueryOptions(location) {
  const query = queryString.parse(location);
  const optionValues = {};

  if (typeof query.page === "string") {
    optionValues.page = parseFloat(query.page);
  }
  if (typeof query.limit === "string") {
    optionValues.limit = parseFloat(query.limit);
  }
  if (typeof query.sort === "string") {
    optionValues.sort = query.sort;
  }

  return optionValues;
}

function parseQueryFilters(location) {
  const query = queryString.parse(location);
  const filterValues = {};

  Object.keys(query).forEach((param) => {
    const mr = param.match(/^filter_([-_A-Za-z0-9]+)$/);

    if (!mr) {
      return;
    }

    const filterSlug = mr[1];

    filterValues[filterSlug] = query[param];
  });

  return filterValues;
}

function parseQuery(location) {
  return [parseQueryOptions(location), parseQueryFilters(location)];
}

function buildQuery(options, filters) {
  const params = {};

  if (options.page !== 1) {
    params.page = options.page;
  }

  if (options.limit !== 12) {
    params.limit = options.limit;
  }

  if (options.sort !== "default") {
    params.sort = options.sort;
  }

  Object.keys(filters)
    .filter((x) => x !== "category" && !!filters[x])
    .forEach((filterSlug) => {
      params[`filter_${filterSlug}`] = filters[filterSlug];
    });

  return queryString.stringify(params, { encode: false });
}

const initialState = {
  init: false,
  /**
   * Indicates that the category is loading.
   */
  categoryIsLoading: true,
  /**
   * Category object.
   */
  category: null,
  /**
   * Indicates that the products list is loading.
   */
  productsListIsLoading: true,
  /**
   * Products list.
   */
  productsList: null,
  /**
   * Products list options.
   *
   * options.page:  number - Current page.
   * options.limit: number - Items per page.
   * options.sort:  string - Sort algorithm.
   */
  options: {},
  /**
   * Products list filters.
   *
   * filters[FILTER_SLUG]: string - filter value.
   */
  filters: {},
};

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_CATEGORY_SUCCESS":
      return {
        ...state,
        init: true,
        categoryIsLoading: false,
        category: action.category,
      };
    case "FETCH_PRODUCTS_LIST":
      return { ...state, productsListIsLoading: true };
    case "FETCH_PRODUCTS_LIST_SUCCESS":
      return {
        ...state,
        productsListIsLoading: false,
        productsList: action.productsList,
      };
    case "SET_OPTION_VALUE":
      return {
        ...state,
        options: { ...state.options, page: 1, [action.option]: action.value },
      };
    case "SET_FILTER_VALUE":
      return {
        ...state,
        options: { ...state.options, page: 1 },
        filters: { ...state.filters, [action.filter]: action.value },
      };
    case "RESET_FILTERS":
      return { ...state, options: { ...state.options, page: 1 }, filters: {} };
    case "RESET":
      return state.init ? initialState : state;
    default:
      throw new Error();
  }
}

function init(state) {
  const [options, filters] = parseQuery(window.location.search);

  return { ...state, options, filters };
}

function ShopPageCategory(props) {
  const {
    categorySlug,
    columns,
    viewMode,
    sidebarPosition,
    productCategoryID,
  } = props;

  const offcanvas = columns === 3 ? "mobile" : "always";
  const [state, dispatch] = useReducer(reducer, initialState, init);
  const [latestProducts, setLatestProducts] = useState([]);

  // Replace current url.
  useEffect(() => {
    const query = buildQuery(state.options, state.filters);
    const location = `${window.location.pathname}${query ? "?" : ""}${query}`;

    window.history.replaceState(null, "", location);
  }, [state.options, state.filters]);

  // Load category.
  useEffect(() => {
    let request;
    let canceled = false;
    let requestJson;
    let productCategoryID;

    dispatch({ type: "RESET", categorySlug });

    // if (categorySlug) {
    //   request = shopApi.getCategoryBySlug(categorySlug);
    // } else {
    //   request = shopApi.getCategoryBySlug("-");
    // }
    request.then((category) => {
      requestJson = JSON.parse(category);
      productCategoryID = requestJson[0].ProductCategoryID;
      if (canceled) {
        return;
      }

      dispatch({ type: "FETCH_PRODUCTS_LIST" });

      // shopApi
      //   .getProductsListByCategory(productCategoryID)
      //   .then((productsList) => {
      //     if (canceled) {
      //       return;
      //     }

      //     dispatch({ type: "FETCH_PRODUCTS_LIST_SUCCESS", productsList });
      //   });

      dispatch({ type: "FETCH_CATEGORY_SUCCESS", category });
    });

    return () => {
      canceled = true;
    };
  }, [dispatch, categorySlug, productCategoryID]);

  // Load products.
  // useEffect(() => {
  //   let canceled = false;

  //   dispatch({ type: "FETCH_PRODUCTS_LIST" });

  //   shopApi
  //     .getProductsList(state.options, {
  //       ...state.filters,
  //       category: categorySlug,
  //     })
  //     .then((productsList) => {
  //       if (canceled) {
  //         return;
  //       }

  //       dispatch({ type: "FETCH_PRODUCTS_LIST_SUCCESS", productsList });
  //     });

  //   return () => {
  //     canceled = true;
  //   };
  // }, [dispatch, categorySlug, state.options, state.filters]);

  // Load latest products.
  useEffect(() => {
    let canceled = false;

    if (offcanvas === "always") {
      setLatestProducts([]);
    } else {
      // shopApi
      //   .getLatestProducts({
      //     ProductCategorySlug: categorySlug,
      //     ProductPerPage: 5,
      //   })
      //   .then((result) => {
      //     if (canceled) {
      //       return;
      //     }

      //     setLatestProducts(result);
      //   });
    }

    return () => {
      canceled = true;
    };
  }, [offcanvas]);

  if (
    state.categoryIsLoading ||
    (state.productsListIsLoading && !state.productsList)
  ) {
    return <BlockLoader />;
  }

  const breadcrumb = [
    { title: "Home", url: "" },
    { title: "Category", url: url.catalog() },
  ];
  let pageTitle = "Shop";
  let content;

  let SelectedCategory = JSON.parse(state.category);
  if (SelectedCategory) {
    // getCategoryParents(state.category).forEach((parent) => {
    //     breadcrumb.push({ title: parent.name, url: url.category(parent) });
    // });

    breadcrumb.push({
      title: SelectedCategory[0].slug,
      url: url.category(state.category),
    });

    pageTitle = categorySlug;
  }

  let items = state.productsList;
  const filters = [
    // new CategoryFilterBuilder("category", "Categories"),
    new RangeFilterBuilder("price", "Price"),
    // new CheckFilterBuilder("brand", "Brand"),
    // new RadioFilterBuilder("discount", "Discount"),
    // new ColorFilterBuilder("color", "Color"),
  ];
  let options = state.options;
  // filters.forEach((filter) =>
  //   filter.makeItems(items, state.filters[filter.slug])
  // );

  // // Calculate items count for filter values.
  // filters.forEach((filter) => filter.calc(filters));

  // Apply filters to products list.
  items = JSON.parse(items).filter((product) => {
    return product.ProductCategoryID === SelectedCategory[0].ProductCategoryID
      ? product
      : "";
  });

  // items = items.filter((product) => {
  //   return filters.reduce((mr, filter) => {
  //     return mr && filter.test(product), true;
  //   });
  // });

  const page = options.page || 1;
  const limit = options.limit || 12;
  const sort = options.sort || "default";
  const total = items.length;
  const pages = Math.ceil(total / limit);
  const from = (page - 1) * limit + 1;
  const to = Math.max(Math.min(page * limit, total), from);

  items = items.sort((a, b) => {
    if (["name_asc", "name_desc"].includes(sort)) {
      if (a.ProductName === b.ProductName) {
        return 0;
      }

      return (
        (a.ProductName > b.ProductName ? 1 : -1) *
        (sort === "name_asc" ? 1 : -1)
      );
    }

    return 0;
  });

  const start = (page - 1) * limit;
  const end = start + limit;
  items = items.slice(start, end);
  state.productsList2 = {
    page,
    limit,
    sort,
    total,
    pages,
    from,
    to,
    items,
    filters: filters.map((x) => x.build()),
  };

  const productsView = (
    <ProductsView
      isLoading={state.productsListIsLoading}
      productsList={state.productsList2}
      options={state.options}
      filters={state.filters}
      dispatch={dispatch}
      layout={viewMode}
      grid={`grid-${columns}-${columns > 3 ? "full" : "sidebar"}`}
      offcanvas={offcanvas}
    />
  );

  const sidebarComponent = (
    <CategorySidebar offcanvas={offcanvas}>
      <CategorySidebarItem>
        {/* <WidgetFilters
          title="Filters"
          offcanvas={offcanvas}
          filters={state.productsList2.filters}
          values={state.filters}
          dispatch={dispatch}
        /> */}
      </CategorySidebarItem>
      {offcanvas !== "always" && (
        <CategorySidebarItem className="d-none d-lg-block">
          <WidgetProducts title="Latest Products" products={latestProducts} />
        </CategorySidebarItem>
      )}
    </CategorySidebar>
  );

  if (columns > 3) {
    content = (
      <div className="container">
        <div className="block">{productsView}</div>
        {sidebarComponent}
      </div>
    );
  } else {
    const sidebar = (
      <div className="shop-layout__sidebar">{sidebarComponent}</div>
    );

    content = (
      <div className="container">
        <div className={`shop-layout shop-layout--sidebar--${sidebarPosition}`}>
          {sidebarPosition === "start" && sidebar}
          <div className="shop-layout__content">
            <div className="block">{productsView}</div>
          </div>
          {sidebarPosition === "end" && sidebar}
        </div>
      </div>
    );
  }

  return (
    <React.Fragment>
      <Helmet>
        <title>{`Shop Category Page — ${theme.name}`}</title>
      </Helmet>

      <PageHeader header={pageTitle} breadcrumb={breadcrumb} />
      {content}
    </React.Fragment>
  );
}

ShopPageCategory.propTypes = {
  /**
   * Category slug.
   */
  categorySlug: PropTypes.string,
  /**
   * number of product columns (default: 3)
   */
  columns: PropTypes.number,
  /**
   * mode of viewing the list of products (default: 'grid')
   * one of ['grid', 'grid-with-features', 'list']
   */
  viewMode: PropTypes.oneOf(["grid", "grid-with-features", "list"]),
  /**
   * sidebar position (default: 'start')
   * one of ['start', 'end']
   * for LTR scripts "start" is "left" and "end" is "right"
   */
  sidebarPosition: PropTypes.oneOf(["start", "end"]),
};

ShopPageCategory.defaultProps = {
  columns: 3,
  viewMode: "grid",
  sidebarPosition: "start",
};

const mapStateToProps = (state) => ({
  sidebarState: state.sidebar,
  page: state.category,
});

const mapDispatchToProps = () => ({
  sidebarClose,
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPageCategory);
