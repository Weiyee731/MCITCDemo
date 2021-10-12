import { createAction } from "redux-actions";

export class GitAction {
  //==================USER==========================//

  static GetData = "GETDATA";
  static Success = "SUCCESS";
  static Failure = "FAILURE";
  // Signup
  static Register = "REGISTER";
  static UserRegistered = "SUCCESSFULLY-CREATED-USER";

  // Login
  static Login = "LOGIN";
  static UserLoggedIn = "SUCCESSFULLY-LOGIN";
  static UserLoggedInWithData = "SUCCESSFULLY-LOGIN-WITH-DATA";

  //Logout
  static Logout = "LOGOUT";
  static UserLoggedOut = "SUCCESSFULLY-LOGOUT";

  static GetUser = "GET-USERS";
  static GotUser = "GOT-USERS";

  static GetUserProfile = "GET-USERSPROFILE";
  static GotUserProfile = "GOT-USERSPROFILE";

  static EditUserProfile = "EDIT-USERPROFILE";
  static EditedUserProfile = "EDITED-USERPROFILE";

  static CheckUser = "CHECK-USER";
  static CheckedUser = "CHECKED-USER";

  static UpdatePassword = "UPDATE-PASSWORD";
  static UpdatedPassword = "UPDATED-PASSWORD";

  static GetPages = "GET-USERPAGE";
  static GotPages = "GOT-USERPAGE";

  static UpdateProfileImage = "UPDATE-PROFILEIMAGE";
  static UpdatedProfileImage = "UPDATED-PROFILEIMAGE";

  static CallCheckUserExists(credentials) {
    return {
      type: GitAction.CheckUser,
      payload: credentials,
    };
  }

  static CallUpdatePassword(credentials) {
    return {
      type: GitAction.UpdatePassword,
      payload: credentials,
    };
  }

  static CallAllUsers() {
    return {
      type: GitAction.GetUser,
    };
  }

  static CallSignup(credentials) {
    return {
      type: GitAction.Register,
      payload: credentials,
    };
  }

  static CallLogin(credentials) {
    return {
      type: GitAction.Login,
      payload: credentials,
    };
  }

  static CallLogout(credentials) {
    return {
      type: GitAction.Logout,
      payload: credentials,
    };
  }

  static CallUserPage(propsData) {
    return {
      type: GitAction.GetPages,
      payload: propsData,
    };
  }

  static CallUserProfile(propsData) {
    return {
      type: GitAction.GetUserProfile,
      payload: propsData,
    };
  }

  static CallUpdateUserProfile(propsData) {
    return {
      type: GitAction.EditUserProfile,
      payload: propsData,
    };
  }

  static CallUpdateProfileImage(propsData) {
    return {
      type: GitAction.UpdateProfileImage,
      payload: propsData,
    };
  }
  //==================COUNTRY==========================//
  static GetCountry = "GET-COUNTRY";
  static GotCountry = "GOT-COUNTRY";

  static CallCountry() {
    return {
      type: GitAction.GetCountry,
    };
  }

  //==================PAYMENT METHOD==========================//
  static GetPaymentMethod = "GET-PAYMENTMETHID";
  static GotPaymentMethod = "GOT-PAYMENTMETHID";

  static CallAllPaymentMethod() {
    return {
      type: GitAction.GetPaymentMethod,
    };
  }

  //==================CREDIT CARD==========================//
  static GetCreditCard = "GET-CREDITCARD";
  static GotCreditCard = "GOT-CREDITCARD";

  static AddCreditCard = "ADD-CREDITCARD";
  static AddedCreditCard = "ADDED-CREDITCARD";

  static UpdateCreditCard = "UPDATE-CREDITCARD";
  static UpdatedCreditCard = "UPDATED-CREDITCARD";

  static DeleteCreditCard = "DELETE-CREDITCARD";
  static DeletedCreditCard = "DELETED-CREDITCARD";

  static CallAllCreditCard(prodData) {
    return {
      type: GitAction.GetCreditCard,
      payload: prodData,
    };
  }

  static CallAddCreditCard(prodData) {
    return {
      type: GitAction.AddCreditCard,
      payload: prodData,
    };
  }

  static CallUpdateCreditCard(prodData) {
    return {
      type: GitAction.UpdateCreditCard,
      payload: prodData,
    };
  }

  static CallDeleteCreditCard(prodData) {
    return {
      type: GitAction.DeleteCreditCard,
      payload: prodData,
    };
  }


  //==================PRODUCT==========================//

  //Products
  static GetProduct = "GET-PRODUCT";
  static GotProduct = "GOT-PRODUCT";

  static GetProductListing = "GET-PRODUCTLISTING";
  static GotProductListing = "GOT-PRODUCTLISTING";

  static GetProductDetail = "GET-PRODUCT-DETAIL";
  static GotProductDetail = "GOT-PRODUCT-DETAIL";

  static GetProductByMerchantID = "GET-PRODUCT-BYMERCHANTID";
  static GotProductByMerchantID = "GOT-PRODUCT-BYMERCHANTID";

  static GetViewMoreProduct = "GET-VIEWMORE-PRODUCT";
  static GotViewMoreProduct = "GOT-VIEWMORE-PRODUCT";

  static GetViewMoreProductEmpty = "GET-VIEWMORE-PRODUCT-EMPTY";
  static GotViewMoreProductEmpty = "GOT-VIEWMORE-PRODUCT-EMPTY";

  static GetProductByProductStatus = "GET-PRODUCT-BYPRODUCTSTATUS";
  static GotProductByProductStatus = "GOT-PRODUCT-BYPRODUCTSTATUS";

  static AddProduct = "ADD-PRODUCT";
  static AddedProduct = "ADDED-PRODUCT";

  static UpdateProduct = "UPDATE-PRODUCT";
  static UpdatedProduct = "UPDATED-PRODUCT";

  static DeleteProduct = "DELETE-PRODUCT";
  static ProductDeleted = "DELETED-PRODUCT";

  static EndorseProduct = "ENDOSE-PRODUCT";
  static ProductEndorsed = "ENDOSED-PRODUCT";

  static CheckProduct = "CHECK-PRODUCT";
  static ProductChecked = "CHECKED-PRODUCT";

  static AddProductMedia = "ADD-PRODUCTMEDIA";
  static ProductMediaAdded = "ADDED-PRODUCTMEDIA";

  static AddProductPurchaseOrder = "ADD-PRODUCTPURCHASEORDER";
  static AddedProductPurchaseOrder = "ADDED-PRODUCTPURCHASEORDER";

  static GetProductsByCategoryIDEmpty = "GET-PRODUCT-BY-CATEGORY-ID-EMPTY";
  static GotProductsByCategoryIDEmpty = "GOT-PRODUCT-BY-CATEGORY-ID-EMPTY";

  static ResetProductReturnVal = "RESET-PRODUCT-RETURN-VALUE";
  static ResetProductMediaReturnVal = "RESET-PRODUCT-MEDIA-RETURN-VALUE";
  static ResetProductManagementValue = "RESET-PRODUCT-MANAGEMENT-RETURN-VALUE";

  static CallAllProducts(propData) {
    return {
      type: GitAction.GetProduct,
      payload: propData
    };
  }

  static CallAllProductsListing(propData) {
    return {
      type: GitAction.GetProductListing,
      payload: propData
    };
  }

  static CallProductDetail(propData) {
    return {
      type: GitAction.GetProductDetail,
      payload: propData
    };
  }

  static CallViewMoreFunctionProduct(prodData) {
    return {
      type: GitAction.GetViewMoreProduct,
      payload: prodData,
    };
  }

  static CallViewMoreEmpty() {
    return {
      type: GitAction.GotViewMoreProductEmpty
    };
  }

  static CallProductByProductCategoryIDEmpty() {
    return {
      type: GitAction.GetProductsByCategoryIDEmpty
    };
  }

  static CallAllProductsByProductStatus(prodData) {
    return {
      type: GitAction.GetProductByProductStatus,
      payload: prodData,
    };
  }

  static CallAddProduct(prodData) {
    return {
      type: GitAction.AddProduct,
      payload: prodData,
    };
  }

  static CallResetProductReturnVal() {
    return {
      type: GitAction.ResetProductReturnVal,
    };
  }

  static CallEndorseProduct(prodData) {
    return {
      type: GitAction.EndorseProduct,
      payload: prodData,
    };
  }

  static CallUpdateProduct(prodData) {
    return {
      type: GitAction.UpdateProduct,
      payload: prodData,
    };
  }

  static CallDeleteProduct(prodData) {
    return {
      type: GitAction.DeleteProduct,
      payload: prodData,
    };
  }

  static CallResetProductMgmtReturnVal() {
    return {
      type: GitAction.ResetProductManagementValue
    }
  }

  static CallCheckProduct(prodData) {
    return {
      type: GitAction.CheckProduct,
      payload: prodData,
    };
  }

  static CallAddProductMedia(prodData) {
    return {
      type: GitAction.AddProductMedia,
      payload: prodData,
    };
  }

  static CallResetProductMediaResult() {
    return {
      type: GitAction.ResetProductMediaReturnVal,
    };
  }


  static CallAddProductPurchaseOrder(prodData) {
    return {
      type: GitAction.AddProductPurchaseOrder,
      payload: prodData,
    };
  }
  

  // Product Variation
  static GetProductVariation = "GET-PRODUCTVARIATION";
  static GotProductVariation = "GOT-PRODUCTVARIATION";

  static GetProductVariationByCategoryID = "GET-PRODUCTVARIATIONBYCATEGORYID";
  static GotProductVariationByCategoryID = "GOT-PRODUCTVARIATIONBYCATEGORYID";

  static AddProductVariation = "ADD-PRODUCTVARIATION";
  static AddedProductVariation = "ADDED-PRODUCTVARIATION";

  static UpdateProductVariation = "UPDATE-PRODUCTVARIATION";
  static UpdatedProductVariation = "UPDATED-PRODUCTVARIATION";

  static DeleteProductVariation = "DELETE-PRODUCTVARIATION";
  static DeletedProductVariation = "DELETED-PRODUCTVARIATION";

  static CallAllProductVariation() {
    return {
      type: GitAction.GetProductVariation,
    };
  }

  static CallAllProductVariationByCategoryID(prodData) {
    return {
      type: GitAction.GetProductVariationByCategoryID,
      payload: prodData,
    };
  }

  static CallAddProductVariation(prodData) {
    return {
      type: GitAction.AddProductVariation,
      payload: prodData,
    };
  }

  static CallUpdateProductVariation(prodData) {
    return {
      type: GitAction.UpdateProductVariation,
      payload: prodData,
    };
  }

  static CallDeleteProductVariation(prodData) {
    return {
      type: GitAction.DeleteProductVariation,
      payload: prodData,
    };
  }

  // PRODUCT SPECS

  static AddProductSpecsDetail = "DELETE-PRODUCTVARIATION";
  static AddedProductSpecsDetail = "DELETED-PRODUCTVARIATION";
  static ResetProductSpecsDetailResult = "RESET-PRODUCTVARIATION";

  static CallAddProductSpecsDetail(prodData) {
    return {
      type: GitAction.AddProductSpecsDetail,
      payload: prodData
    };
  }

  static CallResetProductSpecsDetailResults() {
    return {
      type: GitAction.ResetProductSpecsDetailResult,
    };
  }

  // Product Category
  static GetProductCategory = "GET-PRODUCTCATEGORY";
  static GotProductCategory = "GOT-PRODUCTCATEGORY";

  static GetProductCategoryListing = "GET-PRODUCTCATEGORYLISTING";
  static GotProductCategoryListing = "GOT-PRODUCTCATEGORYLISTING";

  static AddProductCategory = "ADD-PRODUCTCATEGORY";
  static AddedProductCategory = "ADDED-PRODUCTCATEGORY";

  static UpdateProductCategory = "UPDATE-PRODUCTCATEGORY";
  static UpdatedProductCategory = "UPDATED-PRODUCTCATEGORY";

  static DeleteProductCategory = "DELETE-PRODUCTCATEGORY";
  static DeletedProductCategory = "DELETED-PRODUCTCATEGORY";

  static CallAllProductCategory() {
    return {
      type: GitAction.GetProductCategory,
    };
  }

  static CallAllProductCategoryListing() {
    return {
      type: GitAction.GetProductCategoryListing,
    };
  }

  static CallAddProductCategory(prodData) {
    return {
      type: GitAction.AddProductCategory,
      payload: prodData,
    };
  }

  static CallUpdateProductCategory(prodData) {
    return {
      type: GitAction.UpdateProductCategory,
      payload: prodData,
    };
  }

  static CallDeleteProductCategory(prodData) {
    return {
      type: GitAction.DeleteProductCategory,
      payload: prodData,
    };
  }

  // Product Variation Detail
  static GetProductVariationDetail = "GET-PRODUCTVARIATIONDETAIL";
  static GotProductVariationDetail = "GOT-PRODUCTVARIATIONDETAIL";

  static AddProductVariationDetail = "ADD-PRODUCTVARIATIONDETAIL";
  static AddedProductVariationDetail = "ADDED-PRODUCTVARIATIONDETAIL";

  static DeleteProductVariationDetail = "DELETE-PRODUCTVARIATIONDETAIL";
  static DeletedProductVariationDetail = "DELETED-PRODUCTVARIATIONDETAIL";
  static ResetProductVariationDetailResult = "RESET-PRODUCTVARIATIONDETAIL";

  static CallAllProductVariationDetail(prodData) {
    return {
      type: GitAction.GetProductVariationDetail,
      payload: prodData,
    };
  }

  static CallAddProductVariationDetail(prodData) {
    return {
      type: GitAction.AddProductVariationDetail,
      payload: prodData,
    };
  }

  static CallDeleteProductVariationDetail(prodData) {
    return {
      type: GitAction.DeleteProductVariationDetail,
      payload: prodData,
    };
  }

  static CallResetProductVariationDetailResult() {
    return {
      type: GitAction.ResetProductVariationDetailResult,
    };
  }

  //=================SUPPLIER=============================//

  static GetSupplierByUserStatus = "GET-SUPPLIERBYUSERSTATUS";
  static GotSupplierByUserStatus = "GOT-SUPPLIERBYUSERSTATUS";

  static RegisterSupplier = "REGISTER-SUPPLIER";
  static RegisteredSupplier = "REGISTERED-SUPPLIER";

  // Endorse Supplier
  static EndorseSupplier = "ENDOSE-SUPPLIER";
  static EndorsedSupplier = "ENDOSED-SUPPLIER";

  static CallAllSupplierByUserStatus(suppData) {
    return {
      type: GitAction.GetSupplierByUserStatus,
      payload: suppData,
    };
  }

  static CallSupplierRegister(credentials) {
    return {
      type: GitAction.RegisterSupplier,
      payload: credentials,
    };
  }

  static CallEndorseSupplier(suppData) {
    return {
      type: GitAction.EndorseSupplier,
      payload: suppData,
    };
  }

  //=================STORAGE=============================//

  // SHOPLOTS
  static GetShoplots = "GET-SHOPLOTS";
  static GotShoplots = "GOT-SHOPLOTS";

  static GetShoplotsPoly = "GET-SHOPLOTSPOLY";
  static GotShoplotsPoly = "GOT-SHOPLOTSPOLY";

  static AddShoplots = "ADD-SHOPLOTS";
  static AddedShoplots = "ADDED-SHOPLOTS";

  static UpdateShoplots = "UPDATE-SHOPLOTS";
  static UpdatedShoplots = "UPDATED-SHOPLOTS";

  static DeleteShoplots = "DELETE-SHOPLOTS";
  static DeletedShoplots = "DELETED-SHOPLOTS";

  static CallAllShoplots() {
    return {
      type: GitAction.GetShoplots,
    };
  }

  static CallAllShoplotsByPolygon(prodData) {
    return {
      type: GitAction.GetShoplotsPoly,
      payload: prodData,
    };
  }

  static CallAddShoplots(prodData) {
    return {
      type: GitAction.AddShoplots,
      payload: prodData,
    };
  }

  static CallUpdateShoplots(prodData) {
    return {
      type: GitAction.UpdateShoplots,
      payload: prodData,
    };
  }

  static CallDeleteShoplots(prodData) {
    return {
      type: GitAction.DeleteShoplots,
      payload: prodData,
    };
  }

  // GRIDSTORAGES
  static GetGridStorages = "GET-GRIDSTORAGES";
  static GotGridStorages = "GOT-GRIDSTORAGES";

  static AddGridStorages = "ADD-GRIDSTORAGES";
  static AddedGridStorages = "ADDED-GRIDSTORAGES";

  static UpdateGridStorages = "UPDATE-GRIDSTORAGES";
  static UpdatedGridStorages = "UPDATED-GRIDSTORAGES";

  static DeleteGridStorages = "DELETE-GRIDSTORAGES";
  static DeletedGridStorages = "DELETED-GRIDSTORAGES";

  static CallAllGridStorages() {
    return {
      type: GitAction.GetGridStorages,
    };
  }

  static CallAddGridStorages(prodData) {
    return {
      type: GitAction.AddGridStorages,
      payload: prodData,
    };
  }

  static CallUpdateGridStorages(prodData) {
    return {
      type: GitAction.UpdateGridStorages,
      payload: prodData,
    };
  }

  static CallDeleteGridStorages(prodData) {
    return {
      type: GitAction.DeleteGridStorages,
      payload: prodData,
    };
  }

  //=================REPORTING=============================//

  // Summary
  static GetOverallSummary = "GET-OVERALLSUMMARY";
  static GotOverallSummary = "GOT-OVERALLSUMMARY";

  static CallOverallSummary(suppData) {
    return {
      type: GitAction.GetOverallSummary,
      payload: suppData,
    };
  }

  //=================DELIVERY=============================//

  // Summary
  static GetDeliverableList = "GET-DELIVERABLELIST";
  static GotDeliverableList = "GOT-DELIVERABLELIST";

  static CallGetDeliverableList() {
    return {
      type: GitAction.GetDeliverableList,
    };
  }

  static GetOrderListByOrderID = "GET-ORDERLISTBYORDERID";
  static GotOrderListByOrderID = "GOT-ORDERLISTBYORDERID";

  static CallGetOrderListByID(suppData) {
    return {
      type: GitAction.GetOrderListByOrderID,
      payload: suppData
    };
  }

  //=================REVIEW=============================//

  // Summary
  static GetProductReview = "GET-PRODUCTREVIEW";
  static GotProductReview = "GOT-PRODUCTREVIEW";

  static GetProductReviewByProductID = "GET-PRODUCTREVIEWBYPRODUCTID";
  static GotProductReviewByProductID = "GOT-PRODUCTREVIEWBYPRODUCTID";

  static addProductReview = "ADD-PRODUCTREVIEW";
  static addedProductReview = "ADDED-PRODUCTREVIEW";

  static CallProductReview(suppData) {
    return {
      type: GitAction.GetProductReview,
      payload: suppData,
    };
  }

  static CallProductReviewByProductID(suppData) {
    return {
      type: GitAction.GetProductReviewByProductID,
      payload: suppData,
    };
  }

  static CallAddProductReview(suppData) {
    return {
      type: GitAction.addProductReview,
      payload: suppData,
    };
  }

  //=================OTHER=============================//

  // COLOR
  static GetColor = "GET-COLOR";
  static GotColor = "GOT-COLOR";

  static AddColor = "ADD-COLOR";
  static AddedColor = "ADDED-COLOR";

  static UpdateColor = "UPDATE-COLOR";
  static UpdatedColor = "UPDATED-COLOR";

  static DeleteColor = "DELETE-COLOR";
  static DeletedColor = "DELETED-COLOR";

  static CallAllColor() {
    return {
      type: GitAction.GetColor,
    };
  }

  static CallAddColor(prodData) {
    return {
      type: GitAction.AddColor,
      payload: prodData,
    };
  }

  static CallUpdateColor(prodData) {
    return {
      type: GitAction.UpdateColor,
      payload: prodData,
    };
  }

  static CallDeleteColor(prodData) {
    return {
      type: GitAction.DeleteColor,
      payload: prodData,
    };
  }

  //=================Notification====================//
  static GetNotification = "GET-NOTIFICATION";
  static GotNotification = "GOT-NOTIFICATION";
  static CallNotification(prodData) {
    return {
      type: GitAction.GetNotification,
      payload: prodData,
    };
  }

  //================= Subscriber Email ====================//
  static GetSubs = "GET-SUBCRIBER"
  static GotSubs = "GOT-SUBCRIBER"

  static AddSubcs = "ADD-SUBCRIBER";
  static AddedSubcs = "ADDED-SUBCRIBER";

  static CallAddSubs(subsData) {
    return {
      type: GitAction.AddSubcs,
      payload: subsData,
    };
  }

  static CallViewSubs(subsData) {
    return {
      type: GitAction.GetSubs,
      payload: subsData,
    };
  }

  //=================QUOTATION====================//
  static AddProductQuotation = "ADD-QUOTATION";
  static AddedProductQuotation = "ADDED-QUOTATION";

  static GetProductQuotation = "GET-QUOTATION";
  static GotProductQuotation = "GOT-QUOTATION";

  static DeleteQuotation = "DELETE-QUOTATION";
  static DeletedQuotation = "DELETED-QUOTATION";

  static CallAddProductQuotation(prodData) {
    return {
      type: GitAction.AddProductQuotation,
      payload: prodData,
    };
  }

  static CallViewProductQuotation(prodData) {
    return {
      type: GitAction.GetProductQuotation,
      payload: prodData,
    };
  }

  static CallDeleteQuotation(orderData) {
    return {
      type: GitAction.DeleteQuotation,
      payload: orderData,
    };
  }

  //=================ORDER====================//
  static AddOrder = "ADD-ORDER";
  static AddedOrder = "ADDED-ORDER";
  static ClearOrder = "CLEAR-ORDER";
  static ClearedOrder = "CLEARED-ORDER";
  static GetProductStockByStatus = "GET-PRODUCTSTOCKBYSTATUS";
  static GotProductStockByStatus = "GOT-PRODUCTSTOCKBYSTATUS";

  static CallAddOrder(prodData) {
    return {
      type: GitAction.AddOrder,
      payload: prodData,
    };
  }

  static CallClearOrder() {
    return {
      type: GitAction.AddOrder
    };
  }

  static CallGetProductStockByStatus(prodData) {
    return {
      type: GitAction.GetProductStockByStatus,
      payload: prodData,
    };
  }

  //=================INVENTORY====================//
  static UpdateInventory = "UPDATE-INVENTORY";
  static UpdatedInventory = "UPDATED-INVENTORY";
  static EndorseInventoryProductStock = "ENDORSE-INVENTORYPRODUCTSTOCK";
  static EndorsedInventoryProductStock = "ENDORSED-INVENTORYPRODUCTSTOCK";

  static UpdateProductStockOut = "UPDATE-INVENTORYPRODUCTSTOCKOUT";
  static UpdatedProductStockOut = "UPDATED-INVENTORYPRODUCTSTOCKOUT";

  static CallUpdateProductStockOut(prodData) {
    return {
      type: GitAction.UpdateProductStockOut,
      payload: prodData,
    };
  }

  static CallUpdateProductStock(prodData) {
    return {
      type: GitAction.UpdateInventory,
      payload: prodData,
    };
  }

  static CallEndorseProductStock(prodData) {
    return {
      type: GitAction.EndorseInventoryProductStock,
      payload: prodData,
    };
  }

  //==============PROMOTIONS=================//

  static GetPromo = "GET-PROMO";
  static GotPromo = "GOT-PROMO";

  static GetPromoCode = "GET-PROMOCODE";
  static GotPromoCode = "GOT-PROMOCODE";

  static AddPromoCode = "ADD-PROMOCODE";
  static AddedPromoCode = "ADDED-PROMOCODE";

  static UpdatePromoCode = "UPDATE-PROMOCODE";
  static UpdatedPromoCode = "UPDATED-PROMOCODE";

  static DeletePromoCode = "DELETE-PROMOCODE";
  static DeletedPromoCode = "DELETED-PROMOCODE";

  static GetPromotion = "GET-PROMOTION";
  static GotPromotion = "GOT-PROMOTION";

  static AddPromotion = "ADD-PROMOTION";
  static AddedPromotion = "ADDED-PROMOTION";

  static UpdatePromotion = "UPDATE-PROMOTION";
  static UpdatedPromotion = "UPDATED-PROMOTION";

  static DeletePromotion = "DELETE-PROMOTION";
  static DeletedPromotion = "DELETED-PROMOTION";

  static CallAddPromotion(promoData) {
    return {
      type: GitAction.AddPromotion,
      payload: promoData,
    };
  }

  static CallUpdatePromotion(promoData) {
    return {
      type: GitAction.UpdatePromotion,
      payload: promoData,
    };
  }

  static CallDeletePromotion(promoData) {
    return {
      type: GitAction.DeletePromotion,
      payload: promoData,
    };
  }

  static CallViewPromotion(promoData) {
    return {
      type: GitAction.GetPromotion,
      payload: promoData,
    };
  }

  static CallGetPromo() {
    return {
      type: GitAction.GetPromo,
    };
  }

  static CallGetPromoCode() {
    return {
      type: GitAction.GetPromoCode,
    };
  }

  static CallAddPromoCode(promoCodeData) {
    return {
      type: GitAction.AddPromoCode,
      payload: promoCodeData,
    };
  }

  static CallUpdatePromoCode(promoCodeData) {
    return {
      type: GitAction.UpdatePromoCode,
      payload: promoCodeData,
    };
  }

  static CallDeletePromoCode(promoCodeData) {
    return {
      type: GitAction.DeletePromoCode,
      payload: promoCodeData,
    };
  }

  //==============TRANSACTIONS=================//

  static GetTransactions = "GET-TRANSACTION";
  static GotTransactions = "GOT-TRANSACTION";

  static GetTransactionsWithDelivery = "GET-TRANSACTIONWITHDELIVERY";
  static GotTransactionsWithDelivery = "GOT-TRANSACTIONWITHDELIVERY";

  static GetTransactionStatus = "GET-TRANSACTIONSTATUS";
  static GotTransactionStatus = "GOT-TRANSACTIONSTATUS";

  static CallGetTransaction(transactionData) {
    return {
      type: GitAction.GetTransactions,
      payload: transactionData,
    };
  }

  static CallGetTransactionStatus() {
    return {
      type: GitAction.GetTransactionStatus,
    };
  }

  static CallGetTransactionWithDelivery() {
    return {
      type: GitAction.GetTransactionsWithDelivery,
    };
  }

  static GetReceivableList = "GET-RECEIVABLELIST";
  static GotReceivableList = "GOT-RECEIVABLELIST";

  static GetPayableList = "GET-PAYABLELIST";
  static GotPayableList = "GOT-PAYABLELIST";

  static CallGetReceivableList() {
    return {
      type: GitAction.GetReceivableList,
    };
  }

  static CallGetPayableList() {
    return {
      type: GitAction.GetPayableList,
    };
  }

  //=================Address=============================//
  static GetAddress = "GET-ADDRESS";
  static GotAddress = "GOT-ADDRESS";

  static AddAddress = "ADD-ADDRESS";
  static AddedAddress = "ADDED-ADDRESS";

  static UpdateAddress = "UPDATE-ADDRESS";
  static UpdatedAddress = "UPDATED-ADDRESS";

  static DeleteAddress = "DELETE-ADDRESS";
  static DeletedAddress = "DELETED-ADDRESS";

  static CallAllAddress(prodData) {
    return {
      type: GitAction.GetAddress,
      payload: prodData,
    };
  }

  static CallAddAddress(prodData) {
    return {
      type: GitAction.AddAddress,
      payload: prodData,
    };
  }

  static CallUpdateAddress(prodData) {
    return {
      type: GitAction.UpdateAddress,
      payload: prodData,
    };
  }

  static CallDeleteAddress(prodData) {
    return {
      type: GitAction.DeleteAddress,
      payload: prodData,
    };
  }

  //=================MERCHANTS================//
  static GetMerchants = "GET-MERCHANTS";
  static GotMerchants = "GOT-MERCHANTS";

  static GetMerchantOrders = "GET-MERCHANTSORDERS";
  static GotMerchantOrders = "GOT-MERCHANTSORDERS";

  static CallMerchants() {
    return {
      type: GitAction.GetMerchants,
    };
  }

  static CallGetMerchantsOrders(propsData) {
    return {
      type: GitAction.GetMerchantOrders,
      payload: propsData,
    };
  }

  //=======================PRODUCT ORDERS====================//
  static GetProductOrders = "GET-PRODUCTORDERS";
  static GotProductOrders = "GOT-PRODUCTORDERS";

  static SendSalesOrder = "SEND-SALESORDER";
  static SentSalesOrder = "SENT-SALESORDER";

  static AddPurchaseOrder = "ADD-PURCHASEORDER";
  static AddedPurchaseOrder = "ADDED-PURCHASEORDER";

  static GetPurchaseOrders = "GET-PURCHASEORDERS";
  static GotPurchaseOrders = "GOT-PURCHASEORDERS";

  static DeletePurchaseOrder = "DELETE-PURCHASEORDER";
  static DeletedPurchaseOrder = "DELETED-PURCHASEORDER";

  static UpdateProductStatus = "UPDATE-PRODUCTSTATUS";
  static UpdatedProductStatus = "UPDATED-PRODUCTSTATUS";

  static UpdateOrderProductStatus = "UPDATE-OrderProductStatus";
  static UpdatedOrderProductStatus = "UPDATED-OrderProductStatus";

  static CallUpdateOrderProductStatus(orderData) {
    return {
      type: GitAction.UpdateOrderProductStatus,
      payload: orderData,
    };
  }

  static UpdatePurchaseOrderStatus = "UPDATE-PurchaseOrderStatus";
  static UpdatedPurchaseOrderStatus = "UPDATED-PurchaseOrderStatus";

  static CallUpdatePurchaseOrderStatus(orderData) {
    return {
      type: GitAction.UpdatePurchaseOrderStatus,
      payload: orderData,
    };
  }

  static CallGetProductOrders() {
    return {
      type: GitAction.GetProductOrders,
    };
  }

  static CallSendSalesOrder(orderData) {
    return {
      type: GitAction.SendSalesOrder,
      payload: orderData,
    };
  }

  static CallAddPurchaseOrder(orderData) {
    return {
      type: GitAction.AddPurchaseOrder,
      payload: orderData,
    };
  }

  static CallGetPurchaseOrders(orderData) {
    return {
      type: GitAction.GetPurchaseOrders,
      payload: orderData,
    };
  }

  static CallDeletePurchaseOrder(orderData) {
    return {
      type: GitAction.DeletePurchaseOrder,
      payload: orderData,
    };
  }

  static CallUpdateProductStatus(orderData) {
    return {
      type: GitAction.UpdateProductStatus,
      payload: orderData,
    };
  }

  //================= PRODUCT CART ================//
  static DeleteProductCart = "DELETE-PRODUCTCART";
  static DeletedProductCart = "DELETED-PRODUCTCART";

  static UpdateProductCart = "UPDATE-PRODUCTCART";
  static UpdatedProductCart = "UPDATED-PRODUCTCART";

  static AddProductCart = "ADD-PRODUCTCART";
  static AddedProductCart = "ADDED-PRODUCTCART";

  static ViewProductCart = "VIEW-PRODUCTCART";
  static ViewedProductCart = "VIEWED-PRODUCTCART";

  static ClearProductCart = "CLEAR-PRODUCTCART";
  static ClearedProductCart = "CLEARED-PRODUCTCART";

  static CallDeleteProductCart(propsData) {
    return {
      type: GitAction.DeleteProductCart,
      payload: propsData,
    };
  }

  static CallUpdateProductCart(propsData) {
    return {
      type: GitAction.UpdateProductCart,
      payload: propsData,
    };
  }

  static CallAddProductCart(propsData) {
    return {
      type: GitAction.AddProductCart,
      payload: propsData,
    };
  }

  static CallViewProductCart(propsData) {
    return {
      type: GitAction.ViewProductCart,
      payload: propsData,
    };
  }

  static CallClearProductCart() {
    return {
      type: GitAction.ClearProductCart,
    };
  }

  //================= PRODUCT WIHSLIST ================//
  static DeleteProductWishlist = "DELETE-PRODUCTWISHLIST";
  static DeletedProductWishlist = "DELETED-PRODUCTWISHLIST";

  static AddProductWishlist = "ADD-PRODUCTWISHLIST";
  static AddedProductWishlist = "ADDED-PRODUCTWISHLIST";

  static ViewProductWishlist = "VIEW-PRODUCTWISHLIST";
  static ViewedProductWishlist = "VIEWED-PRODUCTWISHLIST";

  static ClearProductWishlist = "CLEAR-PRODUCTWISHLIST";
  static ClearedProductWishlist = "CLEARED-PRODUCTWISHLIST";

  static CallDeleteProductWishlist(propsData) {
    return {
      type: GitAction.DeleteProductWishlist,
      payload: propsData,
    };
  }

  static CallAddProductWishlist(propsData) {
    return {
      type: GitAction.AddProductWishlist,
      payload: propsData,
    };
  }

  static CallViewProductWishlist(propsData) {
    return {
      type: GitAction.ViewProductWishlist,
      payload: propsData,
    };
  }

  static CallClearProductWishlist() {
    return {
      type: GitAction.ClearProductWishlist,
    };
  }

  //================= PROMOTION BANNER ================//
  static addPromotionBanner = "ADD-PROMOTIONBANNER";
  static addedPromotionBanner = "ADDED-PROMOTIONBANNER";
  static AddPromotionBannerByIds(propsData) {
    return {
      type: GitAction.addPromotionBanner,
      payload: propsData
    };
  }

}
