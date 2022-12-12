import { combineReducers, createStore, applyMiddleware } from "redux";
import { combineEpics, createEpicMiddleware } from "redux-observable";

//reducers
import { counterReducer } from "./reducer/gitReducer";

//epics
import { GitEpic, gitEpic } from "./epic/gitEpic";

const rootEpic = combineEpics(
  //==================USER==========================//
  gitEpic.LoginUser,
  gitEpic.LogoutUser,
  gitEpic.getUserProfile,
  // gitEpic.updateUserProfile,
  //==================PRODUCT==========================//
  gitEpic.getAllProducts,
  gitEpic.addProduct,
  gitEpic.updateProduct,
  gitEpic.deleteProduct,
  gitEpic.endorseProduct,
  gitEpic.addProductVariationDetail,
  gitEpic.getAllProductVariation,
  gitEpic.getAllProductVariationByCategoryID,
  gitEpic.getAllCategories,
  gitEpic.getAllCategoriesListing,
  //=================QUOTATION=============================//

  //=================SUPPLIER=============================//
  gitEpic.getAllSupplierByUserStatus,
  gitEpic.registerSupplier,
  gitEpic.endorseSupplier,
  //==================STORAGE==========================//

  //==================REVIEW==========================//

  gitEpic.viewProductReviewByProductID,
  gitEpic.viewProductReview,
  //==================NOTIFICATION==========================//

  gitEpic.getNotification,
  //==================REPORT==========================//
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
