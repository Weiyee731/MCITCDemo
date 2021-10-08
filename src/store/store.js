// third-party
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { combineEpics, createEpicMiddleware } from "redux-observable";
// reducer
import rootReducer from "./rootReducer";
import version from "./version";

//epics
import { gitEpic } from "./epic/gitEpic";
import { toast } from "react-toastify";
function load() {
  let state;

  try {
    state = localStorage.getItem("state");

    if (typeof state === "string") {
      state = JSON.parse(state);
    }

    if (state && state.version !== version) {
      state = undefined;
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    // toast.error( "error: " + error);
  }

  return state || undefined;
}

const rootEpic = combineEpics(
  //==================USER==========================//
  gitEpic.getAllUserByTypeId,
  gitEpic.LoginUser,
  gitEpic.LogoutUser,
  gitEpic.RegisterUser,
  gitEpic.getUserPage,
  gitEpic.ViewAddress,
  gitEpic.addAddress,
  gitEpic.checkUser,
  gitEpic.updateAddress,
  gitEpic.deleteAddress,
  gitEpic.getUserProfile,
  gitEpic.updateUserProfile,
  gitEpic.updateProfileImage,
  //==================COUNTRY==========================//
  gitEpic.getCountry,
  //==================CREDIT CARD==========================//
  gitEpic.getAllCreditCard,
  gitEpic.addCreditCard,
  gitEpic.updateCreditCard,
  gitEpic.deleteCreditCard,
  //==================PRODUCT==========================//
  gitEpic.getAllProducts,
  gitEpic.getProductDetail,
  gitEpic.getAllProductsByStatus,
  gitEpic.addProduct,
  gitEpic.updateProduct,
  gitEpic.deleteProduct,
  gitEpic.endorseProduct,
  gitEpic.addProductVariationDetail,
  gitEpic.getAllProductVariation,
  gitEpic.addProductVariation,
  gitEpic.getAllProductVariationByCategoryID,
  gitEpic.updateProductVariation,
  gitEpic.deleteProductVariation,
  gitEpic.getAllCategories,
  gitEpic.getAllCategoriesListing,
  gitEpic.addProductCategory,
  gitEpic.updateProductCategory,
  gitEpic.deleteProductCategory,
  gitEpic.addProductPurchaseOrder,
  gitEpic.GetProduct_ItemListByCategoryID,
  gitEpic.AddProductMedia,
  //=================PROMOTION=============================//
  gitEpic.getAllPromotion,
  gitEpic.AddPromotion,
  //=================QUOTATION=============================//
  gitEpic.AddProductQuotation,
  gitEpic.AddedProductQuotation,
  gitEpic.ViewProductQuotation,
  gitEpic.deleteQuotation,
  //=================SUPPLIER=============================//
  gitEpic.getAllSupplierByUserStatus,
  gitEpic.registerSupplier,
  gitEpic.endorseSupplier,
  //==================STORAGE==========================//
  gitEpic.getAllShoplots,
  gitEpic.addShoplot,
  gitEpic.updateShoplot,
  gitEpic.deleteShoplot,
  gitEpic.getAllGridStorages,
  gitEpic.addGridStorages,
  gitEpic.updateGridStorages,
  gitEpic.deleteGridStorages,
  gitEpic.getAllShoplotsPolygon,
  //==================REVIEW==========================//

  gitEpic.viewProductReviewByProductID,
  gitEpic.viewProductReview,
  gitEpic.addProductReview,
  //==================REPORT==========================//
  gitEpic.viewOverallSummary,

  //==================COLOR==========================//
  gitEpic.getAllColor,
  gitEpic.addColor,
  gitEpic.updateColor,
  gitEpic.deleteColor,
  //==================DELIVERY==========================//
  gitEpic.getDeliverableList,
  //==================NOTIFICATION==========================//
  gitEpic.getNotification,
  //==================ORDER==========================//
  gitEpic.AddOrder,
  gitEpic.getProductStockByStatus,
  gitEpic.getAllDeliveryList,
  //==================PROMOTIONS=========================//
  gitEpic.getAllProductPromos,
  gitEpic.getAllPromoCodes,
  gitEpic.addPromoCode,
  gitEpic.updatePromoCode,
  gitEpic.deletePromoCode,
  gitEpic.getAllPromotion,
  gitEpic.AddPromotion,
  gitEpic.UpdatePromotion,
  gitEpic.DeletePromotion,
  //==================TRANSACTIONS========================//
  gitEpic.getAllTransactions,
  gitEpic.getAllTransactionStatus,
  //=====================ACCOUNT========================//
  gitEpic.getAllPayableList,
  gitEpic.getAllReceivableList,
  //==================INVENTORY========================//
  gitEpic.updateProductStock,
  gitEpic.endorseProductStock,
  gitEpic.updateProductStockOut,
  gitEpic.updatePurchaseOrderStatus,
  //=====================MERCHANTS========================//
  gitEpic.getAllMerchants,
  gitEpic.getAllMerchantOrders,
  gitEpic.updateProductDetailStatus,
  //======================PRODUCT ORDERS====================//
  gitEpic.getAllProductOrders,
  gitEpic.sendSalesOrder,
  gitEpic.addPurchaseOrder,
  gitEpic.getAllPurchaseOrders,
  gitEpic.deletePurchaseOrder,
  gitEpic.updateProductStatus,
  gitEpic.getOrderListByID,
  //====================== EMAIL ====================//
  gitEpic.getAllSubs,
  gitEpic.AddSubs,
  //====================== PRODUCT CART ====================//
  gitEpic.deleteProductCart,
  gitEpic.updateProductCart,
  gitEpic.addProductCart,
  gitEpic.viewProductCartList,
  //====================== PRODUCT WISHLIST ====================//
  gitEpic.viewProductWishlist,
  gitEpic.addProductWishlist,
  gitEpic.deleteProductWishlist
);

// const rootReducerCombine = rootReducer;

const epicMiddleware = createEpicMiddleware(rootEpic);

// const createStoreWithMiddleware = applyMiddleware(epicMiddleware)(createStore);

// export default createStoreWithMiddleware(rootReducerCombine);
const middleware = epicMiddleware;
const store = createStore(
  rootReducer,
  load(),
  compose(
    applyMiddleware(middleware),
    applyMiddleware(thunk)
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

function save() {
  try {
    // console.log(JSON.stringify(store.getState()));
    // JSON.stringify(store.getState());
    localStorage.setItem("state", JSON.stringify(store.getState()));
  } catch (error) {
    // eslint-disable-next-line no-console
    // toast.error("error:1 " + error);
  }
}

store.subscribe(() => save());

export default store;
