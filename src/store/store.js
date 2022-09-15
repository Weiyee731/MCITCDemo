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
  // gitEpic.getAllUserByTypeId,
  gitEpic.LoginUser,
  gitEpic.LogoutUser,
  gitEpic.RegisterUser,
  gitEpic.getUserPage,
  gitEpic.ViewAddress,
  gitEpic.ViewAllAddress,
  gitEpic.addAddress,
  gitEpic.checkUser,
  gitEpic.updatePassword,
  gitEpic.updateAddress,
  gitEpic.updateDefaultAddress,
  gitEpic.deleteAddress,
  gitEpic.getUserProfile,
  gitEpic.updateUserProfile,
  gitEpic.UpdateUserProfileStatus,
  gitEpic.updateProfileImage,
  // gitEpic.UpdateProfileSpecificField,
  gitEpic.UpdateShopDetail,
  gitEpic.verifyPassword,
  gitEpic.sentOTPVerification,
  gitEpic.updateContact,
  gitEpic.updateEmail,
  //==================COUNTRY==========================//
  gitEpic.getCountry,
  //==================COURIER SERVICE==========================//
  gitEpic.getAllCourierService,
  //==================PAYMENT METHOD==========================//
  gitEpic.getAllPaymentMethod,
  //==================CREDIT CARD==========================//
  gitEpic.getAllCreditCard,
  gitEpic.addCreditCard,
  gitEpic.updateCreditCard,
  gitEpic.deleteCreditCard,
  //==================PRODUCT==========================//
  gitEpic.getAllProducts,
  gitEpic.getProductsListing,
  gitEpic.getProductDetail,
  gitEpic.DeleteProductMedia,
  // gitEpic.getAllProductsByStatus,
  gitEpic.addProduct,
  gitEpic.updateProduct,
  gitEpic.deleteProduct,
  gitEpic.endorseProduct,
  gitEpic.addProductSpecsDetail,
  gitEpic.updateProductSpecsDetail,
  gitEpic.deleteProductSpecsDetail,
  gitEpic.getAllProductVariation,
  gitEpic.addProductVariation,
  gitEpic.addProductVariationDetail,
  gitEpic.deleteProductVariationDetail,
  gitEpic.updateProductVariationDetail,
  gitEpic.getAllProductVariationByCategoryID,
  gitEpic.updateProductVariation,
  gitEpic.deleteProductVariation,
  gitEpic.updateProductVariationStock,
  gitEpic.getAllCategories,
  gitEpic.getAllCategoriesListing,
  gitEpic.addProductCategory,
  gitEpic.updateProductCategory,
  gitEpic.deleteProductCategory,
  gitEpic.addProductPurchaseOrder,
  gitEpic.AddProductMedia,
  //=================SUPPLIER=============================//
  gitEpic.getAllSupplierByUserStatus,
  gitEpic.registerSupplier,
  gitEpic.endorseSupplier,
  //==================REVIEW==========================//
  gitEpic.viewProductReviewByProductID,
  gitEpic.viewProductReview,
  gitEpic.addProductReview,
  //==================DELIVERY==========================//
  gitEpic.getDeliverableList,
  //==================NOTIFICATION==========================//
  gitEpic.getNotification,
  //==================ORDER==========================//
  gitEpic.AddOrder,
  gitEpic.AddOrder_CreditCard,
  gitEpic.UpdateOrder_AccountOrderCreditCard,
  gitEpic.UpdateOrder_AccountOrder,
  gitEpic.Order_ViewPaymentDetailsByUUID,
  gitEpic.UpdateOrderStock,
  gitEpic.UpdateOrderUserDetails,
  gitEpic.updateOrderTrackingNumber,
  gitEpic.getProductStockByStatus,
  gitEpic.getAllDeliveryList,
  gitEpic.FPXResponseList_View,
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
  //==================INVENTORY========================//
  gitEpic.updateProductStock,
  //=====================MERCHANTS========================//
  gitEpic.getAllMerchants,
  gitEpic.getAllMerchantOrders,
  //======================PRODUCT ORDERS====================//
  gitEpic.getAllProductOrders,
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
  gitEpic.deleteProductWishlist,
  //====================== PROMOTION BANNER ====================//
  gitEpic.AddPromotionBannerByIds,
  //====================== PAYMENT ====================//
  gitEpic.Payment_Send,
  gitEpic.BankList_View,
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
