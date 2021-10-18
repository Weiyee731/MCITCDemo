export const url = {
  home: () => "/",

  catalog: () => "/shop/catalog",

  category: (category) => category.ProductName !== null ? `/shop/catalog/${category.ProductName}` : `/shop/catalog`,

  product: (product) => product.ProductID !== null ? `/shop/products/${product.ProductID}` : `/shop/products/`,

  productCart: () => "/shop/cart",

  productcateogory: (category) => category.ProductName !== null ? `/shop/ProductCategory/${category.ProductName}` : `/shop/ProductCategory/`,
};

export function getCategoryParents(category) {
  return category.parent
    ? [...getCategoryParents(category.parent), category.parent]
    : [];
}
