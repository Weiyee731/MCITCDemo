import { combineReducers, createStore, applyMiddleware } from "redux";
import { combineEpics, createEpicMiddleware } from "redux-observable";

//reducers
import { counterReducer } from "./reducer/gitReducer";

//epics
import { GitEpic, gitEpic } from "./epic/gitEpic";

const rootEpic = combineEpics(
  //==================USER==========================//
  gitEpic.getAllUserByTypeId,
  gitEpic.LoginUser,
  gitEpic.LogoutUser,
  gitEpic.getUserProfile,
  // gitEpic.updateUserProfile,
  //==================PRODUCT==========================//
  gitEpic.getAllProducts,
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
  //=================QUOTATION=============================//
  gitEpic.AddProductQuotation,
  gitEpic.AddedProductQuotation,
  gitEpic.ViewProductQuotation,
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
  //==================REVIEW==========================//

  gitEpic.viewProductReviewByProductID,
  gitEpic.viewProductReview,
  //==================NOTIFICATION==========================//

  gitEpic.getNotification,
  //==================REPORT==========================//
  gitEpic.viewOverallSummary,

  //==================COLOR==========================//
  gitEpic.getAllColor,
  gitEpic.addColor,
  gitEpic.updateColor,
  gitEpic.deleteColor,
  //==================PROMOTIONS=========================//
  gitEpic.getAllProductPromos,
  gitEpic.getAllPromoCodes,
  gitEpic.addPromoCode,
  gitEpic.updatePromoCode,
  gitEpic.deletePromoCode,
  gitEpic.getAllPromotion,
  gitEpic.AddPromotion,
  gitEpic.UpdatePromotion,
  //==================TRANSACTIONS========================//
  gitEpic.getAllTransactions,
  gitEpic.getAllTransactionStatus,
  //=====================MERCHANTS========================//
  gitEpic.getAllMerchants,
  gitEpic.getAllMerchantOrders
);

const rootReducer = combineReducers({ counterReducer });

const epicMiddleware = createEpicMiddleware(rootEpic);

const createStoreWithMiddleware = applyMiddleware(epicMiddleware)(createStore);

export default createStoreWithMiddleware(rootReducer);
