export const url = {
  home: () => "/",

  catalog: () => "/shop/catalog",

  category: (category) => category.slug !== null ? `/shop/catalog/${category.slug}` : `/shop/catalog`,

  product: (product) => product.slug !== null ? `/shop/products/${product.slug.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g,'_')}` :  `/shop/products/`,
  // product: (product) => `/shop/products/${product.slug}`,

  productcateogory: (category) => category.slug !== null ? `/shop/ProductCategory/${category.slug}` : `/shop/ProductCategory/`,
};

export function getCategoryParents(category) {
  return category.parent
    ? [...getCategoryParents(category.parent), category.parent]
    : [];
}
