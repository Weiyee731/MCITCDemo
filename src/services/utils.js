export const url = {
  home: () => "/",

  catalog: () => "/shop/catalog",

  category: (category) => category.ProductName !== null ? `/shop/catalog/${category.ProductName}` : `/shop/catalog`,

  // product: (product) => product.ProductName !== null ? `/shop/products/${product.ProductName.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g,'_')}` :  `/shop/products/`,
 
  product: (product) => product.ProductID !== null ? `/shop/products/${product.ProductID}` :  `/shop/products/`,
  // product: (product) => `/shop/products/${product.slug}`,

  productcateogory: (category) => category.ProductName !== null ? `/shop/ProductCategory/${category.ProductName}` : `/shop/ProductCategory/`,
};

export function getCategoryParents(category) {
  return category.parent
    ? [...getCategoryParents(category.parent), category.parent]
    : [];
}
