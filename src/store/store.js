import 'rxjs'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createEpicMiddleware, combineEpics } from 'redux-observable'
import { counterReducer } from "./reducer/gitReducer"; //reducers
import cartReducer from "./cart/cartReducer"; //reducers
import { gitEpic } from "./epic/gitEpic"; //epics
import rootReducer from './rootReducer';

const rootEpic = combineEpics(
  //==================USER==========================//
  // gitEpic.getAllUserByTypeId,
  gitEpic.User_Login,
  gitEpic.User_Login_GoogleFB,
  gitEpic.User_VerifyGoogleFB_WithOTP,
  gitEpic.LogoutUser,
  gitEpic.RegisterUser,
  gitEpic.RegisterUserOTP,
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
  gitEpic.UpdateShopDetail,
  gitEpic.verifyPassword,
  gitEpic.sentOTPVerification,
  gitEpic.updateContact,
  gitEpic.updateEmail,
  //==================COUNTRY==========================//
  gitEpic.getCountry,
  gitEpic.General_ViewState,
  //==================BANNER==========================//
  gitEpic.getBanner,
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
  gitEpic.addProductVariationDetail,
  gitEpic.updateProductVariationDetail,
  gitEpic.getAllProductVariationByCategoryID,
  gitEpic.getAllCategories,
  gitEpic.getAllCategoriesListing,
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
  gitEpic.Order_CalculateOrderShipping,
  //==================NOTIFICATION==========================//
  gitEpic.getNotification,
  //==================ORDER==========================//
  gitEpic.AddOrder,
  gitEpic.AddOrder_CreditCard,
  gitEpic.UpdateOrder_AccountOrderCreditCard,
  gitEpic.UpdateOrder_AccountOrder,
  gitEpic.Order_ViewPaymentDetailsByUUID,
  gitEpic.updateOrderTrackingNumber,
  gitEpic.Order_UpdateTrackingStatus,
  gitEpic.Order_RequestOrderShipmentStatus,
  gitEpic.getProductStockByStatus,
  gitEpic.getAllDeliveryList,
  gitEpic.FPXResponseList_View,
  //==================PROMOTIONS=========================//
  gitEpic.getAllProductPromos,
  gitEpic.getAllPromoCodes,
  gitEpic.getAllPromotion,
  gitEpic.checkPromoCode,
  //==================TRANSACTIONS========================//
  gitEpic.getAllTransactions,
  gitEpic.getAllTransactionStatus,
  //==================INVENTORY========================//
  //=====================MERCHANTS========================//
  gitEpic.getAllMerchants,
  gitEpic.getAllMerchantOrders,
  //======================PRODUCT ORDERS====================//
  gitEpic.getAllProductOrders,
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
  //====================== PAYMENT ====================//
  gitEpic.Payment_Send,
  gitEpic.BankList_View,
  //====================== POSTCODES ====================//
  gitEpic.ViewPostcodesList,
  // ===================== HOTEL ======================//
  gitEpic.ViewRoom_TypeList,
  gitEpic.ViewProperty_TypeList,
  gitEpic.ViewBed_TypeList,
  gitEpic.ViewLocation_List,
  gitEpic.ViewFeatures_List,
);

const epicMiddleware = createEpicMiddleware();

const middleware = [
  thunk,
  epicMiddleware
]
const initialState = {};
const store = createStore(rootReducer, initialState, applyMiddleware(...middleware))
epicMiddleware.run(rootEpic);
export default store
