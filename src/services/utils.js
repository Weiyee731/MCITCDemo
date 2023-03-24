export const url = {
  home: () => "/",

  catalog: () => "/shop/catalog",

  category: (category) => category.ProductName !== null ? `/shop/catalog/${category.ProductName}` : `/shop/catalog`,

  // product: (product) => product.ProductName !== null ? `/shop/products/${product.ProductName.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g,'_')}` :  `/shop/products/`,

  merchant: (merchant) => merchant.UserID !== null ? `/merchant/${merchant.UserID}` : `/merchant`,

  cartMerchant: (merchantID) => merchantID !== null ? `/merchant/${merchantID}` : `/merchant`,

  inventoryProduct: (ProductID) => ProductID !== null ? `/viewProductDetail/${ProductID}` : `/viewProductDetail/`,

  inventoryProductDetails: (ProductID) => ProductID !== null ? `/viewProductDetailList/${ProductID}` : `/viewProductDetailList/`,

  product: (product) => product.ProductID !== null && product.ProductID !== undefined ? `/shop/products/${product.ProductID}`: `/shop/products/${product.HotelID}`,

  productcateogory: (category) => category.ProductName !== null ? `/shop/ProductCategory/${category.ProductName}` : `/shop/ProductCategory/`,
  productByCategory: (product) => product.ProductCategoryID !== null ? `/shop/ProductListing/type:Category&typevalue:${product.ProductCategoryID}` : `/shop/ProductListing/`,
};

export function getCategoryParents(category) {
  return category.parent
    ? [...getCategoryParents(category.parent), category.parent]
    : [];
}
