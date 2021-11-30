import { act } from "react-dom/test-utils";
import { GitAction } from "../action/gitAction";

const INITIAL_STATE = {
  gitData: {},
  loading: true,
  currentUser: {},
  supplier: [],
  products: [],
  productsListing: [],
  productsByID: [],
  productSpecsDetail: [],
  productsByMerchantID: [],
  viewMoreProducts: [],
  returnUpdateProduct: [],
  reviews: [],
  reviewReturn: [],
  categories: [],
  productCategories: [],
  gridstorages: [],
  shoplots: [],
  colors: [],
  variations: [],
  exists: [],
  pages: [],
  quotations: [],
  productMediaResult: [],
  addResult: [],
  notification: [],
  promos: [],
  transactions: [],
  promoCodes: [],
  transactionStatus: [],
  promotions: [],
  addresses: [],
  merchant: [],
  merchantOrders: [],
  productstock: [],
  addPromo: [],
  productOrders: [],
  purchaseOrders: [],
  account: [],
  countries: [],
  subscriber: [],
  addsubs: [],
  creditcards: [],
  paymentmethod: [],
  updatedCreditCard: [],
  productcart: [],
  wishlist: [],
  order: [],
  orderByID: [],
  updatedProducts: [],
  productMgmtResult: [],
  addProductVariationResult: [],
  updatePassword: [],
  profileUpdate: [],
  verifyPassword: [],
  verifyOTP: [],
  contactUpdated: [],
  emailUpdated: [],
  shopUpdated: [],
  emailVerification: []
};

export function counterReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GitAction.GetData:
      return Object.assign({}, state, { loading: true });

    //=======================USER========================//

    case GitAction.Register:
      return Object.assign({}, state, { loading: true });
    case GitAction.UserRegistered:
      return Object.assign({}, state, {
        loading: false,
        currentUser: action.payload,
      });

    case GitAction.Login:
      return Object.assign({}, state, { loading: true });
    case GitAction.UserLoggedInWithData:
      return Object.assign({}, state, {
        loading: false,
        currentUser: action.payload,
      });

    case GitAction.Logout:
      return Object.assign({}, state, { loading: true });
    case GitAction.UserLoggedOut:
      return Object.assign({}, state, {
        loading: false,
        currentUser: action.payload,
      });

    case GitAction.CheckUser:
      return Object.assign({}, state, { loading: true });
    case GitAction.CheckedUser:
      return Object.assign({}, state, {
        loading: false,
        emailVerification: action.payload,
      });

    case GitAction.UpdatePassword:
      return Object.assign({}, state, { loading: true });
    case GitAction.UpdatedPassword:
      return Object.assign({}, state, {
        loading: false,
        updatePassword: action.payload,
      });

    case GitAction.GetPages:
      return Object.assign({}, state, { loading: true });
    case GitAction.GotPages:
      return Object.assign({}, state, {
        loading: false,
        pages: action.payload,
      });

    case GitAction.GetUserProfile:
      return Object.assign({}, state, { loading: true });
    case GitAction.GotUserProfile:
      return Object.assign({}, state, {
        loading: false,
        currentUser: action.payload,
      });

    case GitAction.EditUserProfile:
      return Object.assign({}, state, { loading: true });
    case GitAction.EditedUserProfile:
      return Object.assign({}, state, {
        loading: false,
        currentUser: action.payload,
      });

    // case GitAction.UpdateProfileSpecificField:
    //   return Object.assign({}, state, { loading: true });
    // case GitAction.UpdatedProfileSpecificField:
    //   return Object.assign({}, state, {
    //     loading: false,
    //     profileUpdate: action.payload,
    //   });

    case GitAction.UpdateProfileImage:
      return Object.assign({}, state, { loading: true });
    case GitAction.UpdatedProfileImage:
      return Object.assign({}, state, {
        loading: false,
        currentUser: action.payload,
      });

    case GitAction.VerifyPassword:
      return Object.assign({}, state, { loading: true });
    case GitAction.VerifiedPassword:
      return Object.assign({}, state, {
        loading: false,
        verifyPassword: action.payload,
      });


    case GitAction.ClearPassword:
      return Object.assign({}, state, { loading: true });
    case GitAction.ClearedPassword:
      return Object.assign({}, state, {
        loading: false,
        verifyPassword: [],
      });

    case GitAction.SendOTPVerification:
      return Object.assign({}, state, { loading: true });
    case GitAction.SentOTPVerification:
      return Object.assign({}, state, {
        loading: false,
        verifyOTP: action.payload,
      });

    case GitAction.UpdateContact:
      return Object.assign({}, state, { loading: true });
    case GitAction.UpdatedContact:
      return Object.assign({}, state, {
        loading: false,
        contactUpdated: action.payload,
      });

    case GitAction.UpdateEmail:
      return Object.assign({}, state, { loading: true });
    case GitAction.UpdatedEmail:
      return Object.assign({}, state, {
        loading: false,
        emailUpdated: action.payload,
      });

    case GitAction.UpdateShopDetail:
      return Object.assign({}, state, { loading: true });
    case GitAction.UpdatedShopDetail:
      return Object.assign({}, state, {
        loading: false,
        shopUpdated: action.payload,
      });
    //=======================COUNTRY========================//

    case GitAction.GetCountry:
      return Object.assign({}, state, { loading: true });
    case GitAction.GotCountry:
      return Object.assign({}, state, {
        loading: false,
        countries: action.payload,
      });

    //==================PAYMENT METHOD==========================//
    case GitAction.GetPaymentMethod:
      return Object.assign({}, state, { loading: true });
    case GitAction.GotPaymentMethod:
      return Object.assign({}, state, {
        loading: false,
        paymentmethod: action.payload,
      });


    //=======================CREDIT CARD========================//
    case GitAction.GetCreditCard:
      return Object.assign({}, state, { loading: true });
    case GitAction.GotCreditCard:
      return Object.assign({}, state, {
        loading: false,
        creditcards: action.payload,
      });

    case GitAction.AddCreditCard:
      return Object.assign({}, state, { loading: true });
    case GitAction.AddedCreditCard:
      return Object.assign({}, state, {
        loading: false,
        updatedCreditCard: action.payloadCondition,
        creditcards: action.payloadValue,
      });

    case GitAction.UpdateCreditCard:
      return Object.assign({}, state, { loading: true });
    case GitAction.UpdatedCreditCard:
      return Object.assign({}, state, {
        loading: false,
        updatedCreditCard: action.payloadCondition,
        creditcards: action.payloadValue,
      });

    case GitAction.DeleteCreditCard:
      return Object.assign({}, state, { loading: true });
    case GitAction.DeletedCreditCard:
      return Object.assign({}, state, {
        loading: false,
        updatedCreditCard: action.payloadCondition,
        creditcards: action.payloadValue,

      });
    //=======================PROMOTION========================//
    // case GitAction.GetPromotion:
    //   return Object.assign({}, state, { loading: true });
    // case GitAction.GotPromotion:
    //   return Object.assign({}, state, {
    //     loading: false,
    //     promotions: action.payload,
    //   });

    // case GitAction.AddPromotion:
    //   return Object.assign({}, state, { loading: true });
    // case GitAction.AddedPromotion:
    //   return Object.assign({}, state, {
    //     loading: false,
    //     addPromo: action.payload,
    //   });
    // case GitAction.EditUserProfile:
    //   return Object.assign({}, state, { loading: true });
    // case GitAction.EditedUserProfile:
    //   return Object.assign({}, state, {
    //     loading: false,
    //     currentUser: action.payload,
    //   });
    //======================= SUBSCRIBER========================//
    case GitAction.GetSubs:
      return Object.assign({}, state, { loading: true });
    case GitAction.GotSubs:
      return Object.assign({}, state, {
        loading: false,
        subscriber: action.payload,
      });

    case GitAction.AddSubcs:
      return Object.assign({}, state, { loading: true });
    case GitAction.AddedSubcs:
      return Object.assign({}, state, {
        loading: false,
        addsubs: action.payload,
      });

    //=======================PRODUCT========================//
    case GitAction.GetProduct:
      return Object.assign({}, state, { loading: true });
    case GitAction.GotProduct:
      return Object.assign({}, state, {
        loading: false,
        products: action.payload,
      });

    case GitAction.GetProductListing:
      return Object.assign({}, state, { loading: true });
    case GitAction.GotProductListing:
      return Object.assign({}, state, {
        loading: false,
        productsListing: action.payload,
      });

    case GitAction.ClearProduct:
      return Object.assign({}, state, { loading: true });
    case GitAction.ClearedProduct:
      return Object.assign({}, state, {
        loading: false,
        productsListing: [],
      });

    case GitAction.GetProductDetail:
      return Object.assign({}, state, { loading: true });
    case GitAction.GotProductDetail:
      return Object.assign({}, state, {
        loading: false,
        productsByID: action.payload,
      });

    case GitAction.ResetProductDetails:
      return Object.assign({}, state, { productsByID: [] });

    case GitAction.GetProductByMerchantID:
      return Object.assign({}, state, { loading: true });
    case GitAction.GotProductByMerchantID:
      return Object.assign({}, state, {
        loading: false,
        productsByMerchantID: action.payload,
      });

    case GitAction.GetViewMoreProduct:
      return Object.assign({}, state, { loading: true });
    case GitAction.GotViewMoreProduct:
      return Object.assign({}, state, {
        loading: false,
        viewMoreProducts: action.payload,
      });
    case GitAction.GotViewMoreProductEmpty:
      return Object.assign({}, state, {
        loading: false,
        viewMoreProducts: [],
      });

    case GitAction.GetProductsByCategoryIDEmpty:
      return Object.assign({}, state, { loading: true });
    case GitAction.GotProductsByCategoryIDEmpty:
      return Object.assign({}, state, {
        products: [],
      });
    case GitAction.GetProductByProductStatus:
      return Object.assign({}, state, { loading: true });
    case GitAction.GotProductByProductStatus:
      return Object.assign({}, state, {
        loading: false,
        products: action.payload,
      });

    case GitAction.AddProduct:
      return Object.assign({}, state, { loading: true });
    case GitAction.AddedProduct:
      return Object.assign({}, state, {
        loading: false,
        addResult: action.payload,
      });

    case GitAction.DeleteProduct:
      return Object.assign({}, state, { loading: true });
    case GitAction.ProductDeleted:
      return Object.assign({}, state, {
        loading: false,
        productMgmtResult: action.payload,
      });

    case GitAction.ResetProductManagementValue:
      return Object.assign({}, state, { productMgmtResult: [] });

    case GitAction.CheckProduct:
      return Object.assign({}, state, { loading: true });
    case GitAction.ProductChecked:
      return Object.assign({}, state, {
        loading: false,
        exists: action.payload,
      });

    case GitAction.UpdateProduct:
      return Object.assign({}, state, { loading: true });
    case GitAction.UpdatedProduct:
      newProdObj = Object.assign({}, state, {
        returnUpdateProduct: action.payload,
        loading: false
      });
      // newProdObj.loading = false;
      return newProdObj;

    case GitAction.AddProductMedia:
      return Object.assign({}, state, { loading: true });
    case GitAction.ProductMediaAdded:
      return Object.assign({}, state, {
        loading: false,
        productMediaResult: action.payload,
      });

    case GitAction.ResetProductMediaReturnVal:
      return Object.assign({}, state, {
        loading: false,
        productMediaResult: []
      });

    case GitAction.AddProductPurchaseOrder:
      return Object.assign({}, state, { loading: true });
    case GitAction.AddedProductPurchaseOrder:
      var object = Object.assign({}, state);
      object.loading = false;
      object.productMediaResult = false;
      return object;

    //==============PRODUCT SPECS DETAIL===============//
    case GitAction.AddProductSpecsDetail:
      return Object.assign({}, state, { loading: true });
    case GitAction.AddedProductSpecsDetail:
      return Object.assign({}, state, {
        loading: false,
        productSpecsDetail: action.payload,
      });

    case GitAction.ResetProductSpecsDetailResult:
      return Object.assign({}, state, {
        loading: false,
        productSpecsDetail: [],
      });

    case GitAction.ResetProductReturnVal:
      return Object.assign({}, state, {
        loading: false,
        addResult: [],
      });

    //==============PRODUCTVARIATION===============//
    case GitAction.GetProductVariation:
      return Object.assign({}, state, { loading: true });
    case GitAction.GotProductVariation:
      return Object.assign({}, state, {
        loading: false,
        variations: action.payload,
      });

    case GitAction.GetProductVariationByCategoryID:
      return Object.assign({}, state, { loading: true });
    case GitAction.GotProductVariationByCategoryID:
      return Object.assign({}, state, {
        loading: false,
        variations: action.payload,
      });

    case GitAction.AddProductVariation:
      return Object.assign({}, state, { loading: true });
    case GitAction.AddedProductVariation:
      newProdObj = Object.assign({}, state);
      newProdObj.loading = false;
      return newProdObj;

    case GitAction.UpdateProductVariation:
      return Object.assign({}, state, { loading: true });
    case GitAction.UpdatedProductVariation:
      newProdObj = Object.assign({}, state);
      newProdObj.loading = false;
      return newProdObj;

    case GitAction.DeleteProductVariation:
      return Object.assign({}, state, { loading: true });
    case GitAction.DeletedProductVariation:
      newProdObj = Object.assign({}, state);
      newProdObj.loading = false;
      return newProdObj;

    //==============PRODUCTCATEGORY===============//
    case GitAction.GetProductCategory:
      return Object.assign({}, state, { loading: true });
    case GitAction.GotProductCategory:
      return Object.assign({}, state, {
        loading: false,
        categories: action.payload,
      });

    case GitAction.GetProductCategoryListing:
      return Object.assign({}, state, { loading: true });
    case GitAction.GotProductCategoryListing:
      return Object.assign({}, state, {
        loading: false,
        productCategories: action.payload,
      });

    case GitAction.AddProductCategory:
      return Object.assign({}, state, { loading: true });
    case GitAction.AddedProductCategory:
      return Object.assign({}, state, {
        loading: false,
        categories: action.payload,
      });

    case GitAction.UpdateProductCategory:
      return Object.assign({}, state, { loading: true });
    case GitAction.UpdatedProductCategory:
      return Object.assign({}, state, {
        loading: false,
        categories: action.payload,
      });

    case GitAction.DeleteProductCategory:
      return Object.assign({}, state, { loading: true });
    case GitAction.DeletedProductCategory:
      return Object.assign({}, state, {
        loading: false,
        categories: action.payload,
      });
    //==============PRODUCTVARIATIONDETAIL===============//
    case GitAction.GetProductVariationDetail:
      return Object.assign({}, state, { loading: true });
    case GitAction.GotProductVariationDetail:
      return Object.assign({}, state, {
        loading: false,
        categories: action.payload,
      });

    case GitAction.AddProductVariationDetail:
      return Object.assign({}, state, { loading: true });
    case GitAction.AddedProductVariationDetail:
      return Object.assign({}, state, {
        loading: false,
        addProductVariationResult: action.payload,
        deleteProductVariation: action.payload2
      });

    case GitAction.DeleteProductVariationDetail:
      return Object.assign({}, state, { loading: true });
    case GitAction.DeletedProductVariationDetail:
      return Object.assign({}, state, {
        loading: false,
        addProductVariationResult: action.payload,
      });

    case GitAction.ResetProductVariationDetailResult:
      return Object.assign({}, state, {
        loading: false,
        addProductVariationResult: []
      });

    //=======================SUPPLIER========================//
    //========================SUPPLIER=======================//

    case GitAction.GetSupplierByUserStatus:
      return Object.assign({}, state, { loading: true });
    case GitAction.GotSupplierByUserStatus:
      return Object.assign({}, state, {
        loading: false,
        supplier: action.payload,
      });

    case GitAction.RegisterSupplier:
      return Object.assign({}, state, { loading: true });
    case GitAction.RegisteredSupplier:
      return Object.assign({}, state, {
        loading: false,
        supplier: action.payload,
      });

    case GitAction.EndorseSupplier:
      return Object.assign({}, state, { loading: true });
    case GitAction.EndorsedSupplier:
      return Object.assign({}, state, {
        loading: false,
        // supplier: action.payload,
      });

    //=======================STORAGE========================//
    //==============SHOPLOTS===============//
    case GitAction.GetShoplots:
      return Object.assign({}, state, { loading: true });
    case GitAction.GotShoplots:
      return Object.assign({}, state, {
        loading: false,
        shoplots: action.payload,
      });

    case GitAction.GetShoplotsPoly:
      return Object.assign({}, state, { loading: true });
    case GitAction.GotShoplotsPoly:
      return Object.assign({}, state, {
        loading: false,
        shoplots: action.payload,
      });

    case GitAction.AddShoplots:
      return Object.assign({}, state, { loading: true });
    case GitAction.AddedShoplots:
      return Object.assign({}, state, {
        loading: false,
        shoplots: action.payload,
      });

    case GitAction.UpdateShoplots:
      return Object.assign({}, state, { loading: true });
    case GitAction.UpdatedShoplots:
      return Object.assign({}, state, {
        loading: false,
        shoplots: action.payload,
      });

    case GitAction.DeleteShoplots:
      return Object.assign({}, state, { loading: true });
    case GitAction.DeletedShoplots:
      return Object.assign({}, state, {
        loading: false,
        shoplots: action.payload,
      });

    //==============GRIDSTORAGES===============//
    case GitAction.GetGridStorages:
      return Object.assign({}, state, { loading: true });
    case GitAction.GotGridStorages:
      return Object.assign({}, state, {
        loading: false,
        gridstorages: action.payload,
      });

    case GitAction.AddGridStorages:
      return Object.assign({}, state, { loading: true });
    case GitAction.AddedGridStorages:
      return Object.assign({}, state, {
        loading: false,
        shoplots: action.payload,
      });

    case GitAction.UpdateGridStorages:
      return Object.assign({}, state, { loading: true });
    case GitAction.UpdatedGridStorages:
      return Object.assign({}, state, {
        loading: false,
        shoplots: action.payload,
      });

    case GitAction.DeleteGridStorages:
      return Object.assign({}, state, { loading: true });
    case GitAction.DeletedGridStorages:
      return Object.assign({}, state, {
        loading: false,
        shoplots: action.payload,
      });

    //=======================OTHER========================//
    case GitAction.GetUser:
      return Object.assign({}, state, { loading: true });
    case GitAction.GotUser:
      return Object.assign({}, state, {
        loading: false,
        supplier: action.payload,
      });

    //=======================STORE========================//

    //GET PRODUCT CATEGORY
    case GitAction.GetProductCategories:
      return Object.assign({}, state, { loading: true });
    case GitAction.GotProductCategories:
      return Object.assign({}, state, {
        loading: false,
        productCategories: action.payload,
      });

    //ADD PRODUCT CATEGORY
    case GitAction.AddProductCategory:
      return Object.assign({}, state, { loading: true });
    case GitAction.ProductCategoryAdded:
      var newProdObj = Object.assign({}, state);
      newProdObj.loading = false;
      return newProdObj;

    case GitAction.Success:
      return Object.assign({}, state, {
        loading: false,
        gitData: action.payload,
      });
    case GitAction.Failure:
      return Object.assign({}, state, { loading: true });

    //=======================Color========================//
    case GitAction.GetColor:
      return Object.assign({}, state, { loading: true });
    case GitAction.GotColor:
      return Object.assign({}, state, {
        loading: false,
        colors: action.payload,
      });

    case GitAction.AddColor:
      return Object.assign({}, state, { loading: true });
    case GitAction.AddedColor:
      return Object.assign({}, state, {
        loading: false,
        colors: action.payload,
      });

    case GitAction.UpdateColor:
      return Object.assign({}, state, { loading: true });
    case GitAction.UpdatedColor:
      return Object.assign({}, state, {
        loading: false,
        colors: action.payload,
      });

    case GitAction.GetNotification:
      return Object.assign({}, state, { loading: true });
    case GitAction.GotNotification:
      return Object.assign({}, state, {
        loading: false,
        notification: action.payload,
      });

    case GitAction.DeleteColor:
      return Object.assign({}, state, { loading: true });
    case GitAction.DeletedColor:
      return Object.assign({}, state, {
        loading: false,
        colors: action.payload,
      });

    //=======================REVIEW========================//

    //GET PRODUCT CATEGORY
    case GitAction.GetProductReview:
      return Object.assign({}, state, { loading: true });
    case GitAction.GotProductReview:
      return Object.assign({}, state, {
        loading: false,
        reviews: action.payload,
      });

    case GitAction.GetProductReviewByProductID:
      return Object.assign({}, state, { loading: true });
    case GitAction.GotProductReviewByProductID:
      return Object.assign({}, state, {
        loading: false,
        reviews: action.payload,
      });

    case GitAction.addProductReview:
      return Object.assign({}, state, { loading: true });
    case GitAction.addedProductReview:
      return Object.assign({}, state, {
        loading: false,
        reviews: action.payload,
        reviewReturn: action.payload2
      });

    case GitAction.GetProductReviewEmpty:
      return Object.assign({}, state, { loading: true });
    case GitAction.GotProductReviewEmpty:
      return Object.assign({}, state, {
        loading: false,
        reviewReturn: [],
      });

    //===============QUOTATION==============//
    case GitAction.AddProductQuotation:
      return Object.assign({}, state, { loading: true });
    case GitAction.AddedProductQuotation:
      return Object.assign({}, state, {
        loading: false,
        quotations: action.payload,
      });

    case GitAction.GetProductQuotation:
      return Object.assign({}, state, { loading: true });
    case GitAction.GotProductQuotation:
      return Object.assign({}, state, {
        loading: false,
        quotations: action.payload,
      });

    case GitAction.DeleteQuotation:
      return Object.assign({}, state, { loading: true });
    case GitAction.DeletedQuotation:
      newProdObj = Object.assign({}, state);
      newProdObj.loading = false;
      return newProdObj;
    //===============ORDER==============//
    case GitAction.AddOrder:
      return Object.assign({}, state, { loading: true });
    case GitAction.AddedOrder:
      return Object.assign({}, state, {
        loading: false,
        order: action.payload,
      });

    case GitAction.ClearOrder:
      return Object.assign({}, state, { loading: true });
    case GitAction.ClearedOrder:
      return Object.assign({}, state, {
        loading: false,
        order: [],
      });

    case GitAction.GetProductStockByStatus:
      return Object.assign({}, state, { loading: true });
    case GitAction.GotProductStockByStatus:
      return Object.assign({}, state, {
        loading: false,
        productstock: action.payload,
      });

    //===============INVENTORY==============//
    case GitAction.UpdateInventory:
      return Object.assign({}, state, { loading: true });
    case GitAction.UpdatedInventory:
      return Object.assign({}, state, {
        loading: false,
        quotations: action.payload,
      });
    case GitAction.EndorseInventoryProductStock:
      return Object.assign({}, state, { loading: true });
    case GitAction.EndorsedInventoryProductStock:
      return Object.assign({}, state, {
        loading: false,
        productstock: action.payload,
      });

    case GitAction.UpdateProductStockOut:
      return Object.assign({}, state, { loading: true });
    case GitAction.UpdatedProductStockOut:
      return Object.assign({}, state, {
        loading: false,
        productstock: action.payload,
      });
    //===============ACCOUNT==============//
    case GitAction.UpdateOrderProductStatus:
      return Object.assign({}, state, { loading: true });
    case GitAction.UpdatedOrderProductStatus:
      return Object.assign({}, state, {
        loading: false,
        account: action.payload,
      });

    case GitAction.UpdatePurchaseOrderStatus:
      return Object.assign({}, state, { loading: true });
    case GitAction.UpdatedPurchaseOrderStatus:
      return Object.assign({}, state, {
        loading: false,
        account: action.payload,
      });
    //===============ACCOUNT==============//
    case GitAction.GetReceivableList:
      return Object.assign({}, state, { loading: true });
    case GitAction.GotReceivableList:
      return Object.assign({}, state, {
        loading: false,
        account: action.payload,
      });
    case GitAction.GetPayableList:
      return Object.assign({}, state, { loading: true });
    case GitAction.GotPayableList:
      return Object.assign({}, state, {
        loading: false,
        account: action.payload,
      });
    //===============ACCOUNT==============//
    case GitAction.GetDeliverableList:
      return Object.assign({}, state, { loading: true });
    case GitAction.GotDeliverableList:
      return Object.assign({}, state, {
        loading: false,
        account: action.payload,
      });

    case GitAction.GetOrderListByOrderID:
      return Object.assign({}, state, { loading: true });
    case GitAction.GotOrderListByOrderID:
      return Object.assign({}, state, {
        loading: false,
        orderByID: action.payload,
      });
    //=============================PROMOTIONS===============================//
    case GitAction.GetPromotion:
      return Object.assign({}, state, { loading: true });
    case GitAction.GotPromotion:
      return Object.assign({}, state, {
        loading: false,
        promotions: action.payload,
      });

    case GitAction.AddPromotion:
      return Object.assign({}, state, { loading: true });
    case GitAction.AddedPromotion:
      return Object.assign({}, state, {
        loading: false,
        addPromo: action.payload,
      });

    case GitAction.UpdatePromotion:
      return Object.assign({}, state, { loading: true });
    case GitAction.UpdatedPromotion:
      var newPromoObj = Object.assign({}, state);
      newPromoObj.loading = false;
      return newPromoObj;

    case GitAction.DeletePromotion:
      return Object.assign({}, state, { loading: true });
    case GitAction.DeletedPromotion:
      var newPromoObj = Object.assign({}, state);
      newPromoObj.loading = false;
      return newPromoObj;

    case GitAction.GetPromo:
      return Object.assign({}, state, { loading: true });
    case GitAction.GotPromo:
      return Object.assign({}, state, {
        loading: false,
        promos: action.payload,
      });

    case GitAction.GetPromoCode:
      return Object.assign({}, state, { loading: true });
    case GitAction.GotPromoCode:
      return Object.assign({}, state, {
        loading: false,
        promoCodes: action.payload,
      });

    case GitAction.AddPromoCode:
      return Object.assign({}, state, { loading: true });
    case GitAction.AddedPromoCode:
      newProdObj = Object.assign({}, state);
      newProdObj.loading = false;
      return newProdObj;

    case GitAction.UpdatePromoCode:
      return Object.assign({}, state, { loading: true });
    case GitAction.UpdatedPromoCode:
      newProdObj = Object.assign({}, state);
      newProdObj.loading = false;
      return newProdObj;

    case GitAction.DeletePromoCode:
      return Object.assign({}, state, { loading: true });
    case GitAction.DeletedPromoCode:
      newProdObj = Object.assign({}, state);
      newProdObj.loading = false;
      return newProdObj;

    //=============================TRANSACTIONS================================//
    case GitAction.GetTransactions:
      return Object.assign({}, state, { loading: true });
    case GitAction.GotTransactions:
      return Object.assign({}, state, {
        loading: false,
        transactions: action.payload,
      });

    case GitAction.GetTransactionsWithDelivery:
      return Object.assign({}, state, { loading: true });
    case GitAction.GotTransactionsWithDelivery:
      return Object.assign({}, state, {
        loading: false,
        transactions: action.payload,
      });

    case GitAction.GetTransactionStatus:
      return Object.assign({}, state, { loading: true });
    case GitAction.GotTransactionStatus:
      return Object.assign({}, state, {
        loading: false,
        transactionStatus: action.payload,
      });

    //=======================Address========================//
    case GitAction.GetAddress:
      return Object.assign({}, state, { loading: true });
    case GitAction.GotAddress:
      return Object.assign({}, state, {
        loading: false,
        addresses: action.payload,
      });

    case GitAction.AddAddress:
      return Object.assign({}, state, { loading: true });
    case GitAction.AddedAddress:
      return Object.assign({}, state, {
        loading: false,
        addresses: action.payloadValue,
        addAddress: action.payloadCondition
      });

    case GitAction.UpdateAddress:
      return Object.assign({}, state, { loading: true });
    case GitAction.UpdatedAddress:
      return Object.assign({}, state, {
        loading: false,
        addresses: action.payloadValue,
        addAddress: action.payloadCondition
      });

    case GitAction.DeleteAddress:
      return Object.assign({}, state, { loading: true });
    case GitAction.DeletedAddress:
      return Object.assign({}, state, {
        loading: false,
        addresses: action.payloadValue,
        addAddress: action.payloadCondition
      });

    //=====================MERCHANTS=======================//
    case GitAction.GetMerchants:
      return Object.assign({}, state, { loading: true });
    case GitAction.GotMerchants:
      return Object.assign({}, state, {
        loading: false,
        merchant: action.payload,
      });

    case GitAction.GetMerchantOrders:
      return Object.assign({}, state, { loading: true });
    case GitAction.GotMerchantOrders:
      return Object.assign({}, state, {
        loading: false,
        merchantOrders: action.payload,
      });

    //======================PRODUCT ORDERS==================//
    case GitAction.GetProductOrders:
      return Object.assign({}, state, { loading: true });
    case GitAction.GotProductOrders:
      return Object.assign({}, state, {
        loading: false,
        productOrders: action.payload,
      });

    case GitAction.SendSalesOrder:
      return Object.assign({}, state, { loading: true });
    case GitAction.SentSalesOrder:
      newProdObj = Object.assign({}, state);
      newProdObj.loading = false;
      return newProdObj;

    case GitAction.AddPurchaseOrder:
      return Object.assign({}, state, { loading: true });
    case GitAction.AddedPurchaseOrder:
      newProdObj = Object.assign({}, state);
      newProdObj.loading = false;
      return newProdObj;

    case GitAction.GetPurchaseOrders:
      return Object.assign({}, state, { loading: true });
    case GitAction.GotPurchaseOrders:
      return Object.assign({}, state, {
        loading: false,
        purchaseOrders: action.payload,
      });

    case GitAction.DeletePurchaseOrder:
      return Object.assign({}, state, { loading: true });
    case GitAction.DeletedPurchaseOrder:
      newProdObj = Object.assign({}, state);
      newProdObj.loading = false;
      return newProdObj;

    case GitAction.UpdateProductStatus:
      return Object.assign({}, state, { loading: true });
    case GitAction.UpdatedProductStatus:
      var newPromoObj = Object.assign({}, state);
      newPromoObj.loading = false;
      return newPromoObj;

    //================= PRODUCT CART ================//
    case GitAction.DeleteProductCart:
      return Object.assign({}, state, { loading: true });
    case GitAction.DeletedProductCart:
      return Object.assign({}, state, {
        loading: false,
        productcart: action.payload,
      });

    case GitAction.UpdateProductCart:
      return Object.assign({}, state, { loading: true });
    case GitAction.UpdatedProductCart:
      return Object.assign({}, state, {
        loading: false,
        productcart: action.payload,
      });

    case GitAction.AddProductCart:
      return Object.assign({}, state, { loading: true });
    case GitAction.AddedProductCart:
      return Object.assign({}, state, {
        loading: false,
        productcart: action.payload,
      });

    case GitAction.ViewProductCart:
      return Object.assign({}, state, { loading: true });
    case GitAction.ViewedProductCart:
      return Object.assign({}, state, {
        loading: false,
        productcart: action.payload,
      });

    case GitAction.ClearProductCart:
      return Object.assign({}, state, { loading: true });
    case GitAction.ClearedProductCart:
      return Object.assign({}, state, {
        loading: false,
        productcart: [],
      });

    //================= PRODUCT WIHSLIST ================//
    case GitAction.DeleteProductWishlist:
      return Object.assign({}, state, { loading: true });
    case GitAction.DeletedProductWishlist:
      return Object.assign({}, state, {
        loading: false,
        wishlist: action.payload,
      });

    case GitAction.AddProductWishlist:
      return Object.assign({}, state, { loading: true });
    case GitAction.AddedProductWishlist:
      return Object.assign({}, state, {
        loading: false,
        wishlist: action.payload,
      });

    case GitAction.ViewProductWishlist:
      return Object.assign({}, state, { loading: true });
    case GitAction.ViewedProductWishlist:
      return Object.assign({}, state, {
        loading: false,
        wishlist: action.payload,
      });

    case GitAction.ClearProductWishlist:
      return Object.assign({}, state, { loading: true });
    case GitAction.ClearedProductWishlist:
      return Object.assign({}, state, {
        loading: false,
        wishlist: [],
      });

    //================= PROMOTION BANNER ================//
    case GitAction.addPromotionBanner:
      return Object.assign({}, state, { loading: true });
    case GitAction.addedPromotionBanner:
      return Object.assign({}, state, {
        loading: false,
        promotionBannerReturn: action.payload,
      });

    /////////////////////////////////////////////////// Default /////////////////////////////////////////////////// 
    default:
      return state;
  }
}
