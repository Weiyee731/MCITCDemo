import { Observable } from "rxjs";
import { ActionsObservable } from "redux-observable";
import { GitAction } from "../action/gitAction";
import { toast } from "react-toastify";

const url = "http://tourism.denoo.my/emporia/api/emporia/"
// const url = "localhost/emporia/api/emporia/"
export class GitEpic {
  //==================USER==========================//
  getAllUserByTypeId = (action$) =>
    action$.ofType(GitAction.GetUser).switchMap(({ payload }) => {
      return fetch(url +
        "User_ProfileListByUserType?UserTypeID=17"
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
          } else {
            json = [];
          }
          return {
            type: "GOT-USERS",
            payload: json,
          };
        })
        .catch((error) => toast.error(error));
    });

  LoginUser = (action$) =>
    action$.ofType(GitAction.Login).switchMap(({ payload }) => {
      return fetch(url +
        "User_Login?username=" +
        payload.username +
        "&password=" +
        payload.password
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            try {
              json = JSON.parse(json);
              window.location.reload(false);
            }
            catch (e) {
              toast.error("Invalid username or password")
            }
          } else {
            json = [];
            toast.error("Invalid username or password")
          }
          return {
            type: "SUCCESSFULLY-LOGIN-WITH-DATA",
            payload: json,
          };
        })
        .catch((error) => toast.error(error));
    });

  LogoutUser = (action$) =>
    action$.ofType(GitAction.Logout).switchMap(({ payload }) => {
      return fetch(url +
        "Audit_AddUserLogout?USERID=1"
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
          } else {
            json = [];
          }
          return {
            type: "SUCCESSFULLY-LOGOUT",
            payload: [],
          };
        })
        .catch((error) => {
          toast.error(error);
        });
    });

  RegisterUser = (action$) =>
    action$.ofType(GitAction.Register).switchMap(({ payload }) => {
      return fetch(url +
        "User_Register?username=" +
        payload.Username +
        "&password=" +
        payload.Password +
        "&userFirstName=" +
        payload.FirstName +
        "&userLastName=" +
        payload.LastName +
        "&userEmail=" +
        payload.Email
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
          } else {
            json = [];
          }
          return {
            type: "SUCCESSFULLY-CREATED-USER",
            payload: json,
          };
        })
        .catch((error) => toast.error(error));
    });

  checkUser = (action$) =>
    action$.ofType(GitAction.CheckUser).switchMap(({ payload }) => {
      console.log("User_CheckDuplicate?email=" +
        payload)
      return fetch(url +
        "User_CheckDuplicate?email=" +
        payload
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
          } else {
            json = [];
          }
          return {
            type: "CHECKED-USER",
            payload: json,
          };
        })
        .catch((error) => toast.error(error));
    });

  getUserPage = (action$) =>
    action$.ofType(GitAction.GetPages).switchMap(({ payload }) => {
      return fetch(url +
        "User_ViewPage?ROLEGROUPID=" +
        payload
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
          } else {
            json = [];
          }
          return {
            type: "GOT-USERPAGE",
            payload: json,
          };
        })
        .catch((error) => toast.error(error));
    });

  getUserProfile = (action$) =>
    action$.ofType(GitAction.GetUserProfile).switchMap(({ payload }) => {
      return fetch(url +
        "User_ProfileByID?USERID=" +
        payload
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
          } else {
            json = [];
          }
          return {
            type: GitAction.GotUserProfile,
            payload: json,
          };
        })
        .catch((error) => toast.error(error));
    });

  updateUserProfile = (action$) =>
    action$.ofType(GitAction.EditUserProfile).switchMap(({ payload }) => {
      return fetch(url +
        "User_EditProfile?USERID=" +
        payload.USERID +
        "&USERFIRSTNAME=" +
        payload.USERFIRSTNAME +
        "&USERLASTNAME=" +
        payload.USERLASTNAME +
        "&USERCONTACTNO=" +
        payload.USERCONTACTNO +
        "&USERDOB=" +
        payload.USERDATEBIRTH +
        "&USEREMAIL=" +
        payload.USEREMAIL +
        "&USERGENDER=" +
        payload.USERGENDER +
        "&USERADDRESSLINE1=" +
        payload.USERADDRESSLINE1 +
        "&USERADDRESSLINE2=" +
        payload.USERADDRESSLINE2 +
        "&USERPOSCODE=" +
        payload.USERPOSCODE +
        "&USERCITY=" +
        payload.USERCITY +
        "&USERSTATE=" +
        payload.USERSTATE +
        "&USERCOUNTRYID=" +
        payload.USERCOUNTRYID +
        "&USERNOTIFICATIONIND=" +
        payload.USERNOTIFICATIONIND +
        "&USERLANGCODE=" +
        payload.USERLANGCODE +
        "&USERAPPDARKMODE=" +
        payload.USERAPPDARKMODE
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
            toast.success("User Profile is updated successfully");
          } else {
            json = [];
          }

          return fetch(url +
            "User_ProfileByID?USERID=" +
            payload.USERID
          )
            .then((response) => response.json())
            .then((json) => {
              if (json !== "fail") {
                json = JSON.parse(json);
              } else {
                json = [];
              }
              return {
                type: "EDITED-USERPROFILE",
                payload: json,
              };
            })
            .catch((error) => toast.error(error));
        })
        .catch((error) => toast.error(error));
    });

  updateProfileImage = (action$) =>
    action$.ofType(GitAction.UpdateProfileImage).switchMap(({ payload }) => {
      return fetch(url +
        "User_UserUpdatePhoto?USERID=" +
        payload.USERID +
        "&USERPROFILEIMAGE=" +
        payload.USERPROFILEIMAGE
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
            if (json.map((val) => val.ReturnVal === 1)) {
              toast.success("Upload Successful");
            }
          } else {
            json = [];
          }
          return {
            type: "UPDATED-PROFILEIMAGE",
            payload: json,
          };
        })
        .catch((error) => toast.error(error));
    });

  //==================Country==========================//
  getCountry = (action$) =>
    action$.ofType(GitAction.GetCountry).switchMap(() => {
      return fetch(url +
        "General_CountryList"
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
          } else {
            json = [];
          }
          return {
            type: "GOT-COUNTRY",
            payload: json,
          };
        })
        .catch((error) => toast.error(error));
    });

  //=================CREDIT CARD=============================//
  getAllCreditCard = (action$) =>
    action$.ofType(GitAction.GetCreditCard).switchMap(({ payload }) => {
      return fetch(url +
        "User_ViewUserPaymentMethod?USERID=" +
        payload
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
          } else {
            json = [];
          }
          return {
            type: "GOT-CREDITCARD",
            payload: json,
          };
        })
        .catch((error) => toast.error(error));
    });

  addCreditCard = (action$) =>
    action$.ofType(GitAction.AddCreditCard).switchMap(({ payload }) => {
      return fetch(url +
        "User_AddPaymentMethod?USERID=" +
        payload.USERID +
        "&USERCARDNAME=" +
        payload.name +
        "&USERCARDNO=" +
        payload.number +
        "&USERCARDEXPIREDATE=" +
        payload.expiry +
        "&USERCARDTYPE=" +
        payload.cardtype
      )
        .then((response) => response.json())
        .then((returnVal) => {
          if (returnVal !== "fail") {
            returnVal = JSON.parse(returnVal);
            toast.success("Credit Card successfully added")
          } else {
            returnVal = [];
          }
          return fetch(url +
            "User_ViewUserPaymentMethod?USERID=" +
            payload.USERID
          )
            .then((response) => response.json())
            .then((AllCreditCards) => {
              if (AllCreditCards !== "fail") {
                AllCreditCards = JSON.parse(AllCreditCards);
              } else {
                AllCreditCards = [];
              }
              return {
                type: GitAction.AddedCreditCard,
                payloadCondition: returnVal,
                payloadValue: AllCreditCards,
              };
            })
            .catch((error) => toast.error(error));
        })
        .catch((error) => toast.error(error));
    });

  updateCreditCard = (action$) =>
    action$.ofType(GitAction.UpdateCreditCard).switchMap(({ payload }) => {
      
      console.log(url +
        "User_UpdatePaymentMethod?USERPAYMENTMETHODID=" +
        payload.USERPAYMENTMETHODID +
        "&USERID=" +
        payload.USERID +
        "&USERCARDNAME=" +
        payload.name +
        "&USERCARDNO=" +
        payload.number +
        "&USERCARDEXPIREDATE=" +
        payload.expiry +
        "&USERCARDTYPE=" +
        payload.cardtype)
        
      return fetch(url +
        "User_UpdatePaymentMethod?USERPAYMENTMETHODID=" +
        payload.USERPAYMENTMETHODID +
        "&USERID=" +
        payload.USERID +
        "&USERCARDNAME=" +
        payload.name +
        "&USERCARDNO=" +
        payload.number +
        "&USERCARDEXPIREDATE=" +
        payload.expiry +
        "&USERCARDTYPE=" +
        payload.cardtype
      )
        .then((response) => response.json())
        .then((returnVal) => {
          if (returnVal !== "fail") {
            returnVal = JSON.parse(returnVal);
            toast.success("Credit Card successfully updated")
          } else {
            returnVal = [];
          }

          return fetch(url +
            "User_ViewUserPaymentMethod?USERID=" +
            payload.USERID
          )
            .then((response) => response.json())
            .then((AllCreditCards) => {
              if (AllCreditCards !== "fail") {
                AllCreditCards = JSON.parse(AllCreditCards);
              } else {
                AllCreditCards = [];
              }
              return {
                type: GitAction.UpdatedCreditCard,
                payloadCondition: returnVal,
                payloadValue: AllCreditCards,
              };
            })
            .catch((error) => toast.error(error));
        })
        .catch((error) => toast.error(error));
    });

  deleteCreditCard = (action$) =>
    action$.ofType(GitAction.DeleteCreditCard).switchMap(({ payload }) => {
      return fetch(url +
        "User_DeletePaymentMethod?USERPAYMENTMETHODID=" +
        payload.cardId
      )
        .then((response) => response.json())
        .then((returnVal) => {
          if (returnVal !== "fail") {
            returnVal = JSON.parse(returnVal);
            toast.success("Credit Card selected successfully deleted")
          } else {
            returnVal = [];
          }
          return fetch(url +
            "User_ViewUserPaymentMethod?USERID=" +
            payload.userId
          )
            .then((response) => response.json())
            .then((AllCreditCards) => {
              if (AllCreditCards !== "fail") {
                AllCreditCards = JSON.parse(AllCreditCards);
              } else {
                AllCreditCards = [];
              }
              return {
                type: GitAction.DeletedCreditCard,
                payloadCondition: returnVal,
                payloadValue: AllCreditCards,
              };
            })
            .catch((error) => toast.error(error));
        })
        .catch((error) => toast.error(error));
    });

  //=============================================PROMOTION===========================================================//
  getAllPromotion = (action$) =>
    action$.ofType(GitAction.GetPromotion).switchMap(({ payload }) => {
      return fetch(url +
        "Promo_ViewPromotion?ACTIVEIND"
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
          } else {
            json = [];
          }
          return {
            type: "GOT-PROMOTION",
            payload: json,
          };
        })
        .catch((error) => toast.error(error));
    });

  AddPromotion = (action$) =>
    action$.ofType(GitAction.AddPromotion).switchMap(({ payload }) => {
      return fetch(url +
        "Promo_AddPromotion?PROMOTIONTITLE=" +
        payload.PromotionTitle +
        "&PROMOTIONDESC=" +
        payload.PromotionDesc +
        "&PROMOTIONSTARTDATE=" +
        payload.PromotionStartDate +
        "&PROMOTIONENDDATE=" +
        payload.PromotionEndDate +
        "&PRODUCTID=" +
        payload.ProductID // {98,99,100}
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
          } else {
            json = [];
          }
          return {
            type: "ADDED-PROMOTION",
            payload: json,
          };
        })
        .catch((error) => toast.error(error));
    });

  //==================PRODUCT==========================//

  getAllProducts = (action$) =>
    action$.ofType(GitAction.GetProduct).switchMap(({ payload }) => {

      return fetch(url +
        "Product_ItemList"
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
          } else {
            json = [];
          }
          return {
            type: "GOT-PRODUCT",
            payload: json,
          };
        })
        .catch((error) => toast.error(error));
    });

  getViewMoreProducts = (action$) =>
    action$.ofType(GitAction.GetViewMoreProduct).switchMap(({ payload }) => {
      return fetch(url +
        "Product_ViewMoreItemList?PRODUCTPERPAGE=" + payload.productPerPage +
        "&PAGE=" + payload.page
      )
        .then((response) => response.json())
        .then((json) => {

          if (json !== "fail") {
            json = JSON.parse(json);
          } else {
            json = [];
          }
          return {
            type: "GOT-VIEWMORE-PRODUCT",
            payload: json,
          };
        })
        .catch((error) => toast.error(error));
    });


  getAllProductsByStatus = (action$) =>
    action$
      .ofType(GitAction.GetProductByProductStatus)
      .switchMap(({ payload }) => {
        return fetch(url +
          "Product_ItemListByProductStatus?PRODUCTSTATUS=" +
          payload.ProductStatus +
          "&USERID=" +
          payload.UserID
        )
          .then((response) => response.json())
          .then((json) => {
            if (json !== "fail") {
              json = JSON.parse(json);
            } else {
              json = [];
            }
            return {
              type: "GOT-PRODUCT-BYPRODUCTSTATUS",
              payload: json,
            };
          })
          .catch((error) => toast.error(error));
      });

  GetProduct_ItemListByCategoryID = (action$) =>
    action$
      .ofType(GitAction.GetProductsByCategoryID)
      .switchMap(({ payload }) => {

        console.log(url +
          "Product_ItemListByCategory?ProductCategoryID=" +
          payload.ProductCategoryID +
          "&ProductPerPage=" +
          payload.ProductPerPage +
          "&Page=" +
          payload.Page +
          "&Filter=" +
          payload.Filter)

        return fetch(url +
          "Product_ItemListByCategory?ProductCategoryID=" +
          payload.ProductCategoryID +
          "&ProductPerPage=" +
          payload.ProductPerPage +
          "&Page=" +
          payload.Page +
          "&Filter=" +
          payload.Filter
        )
          .then((response) => response.json())
          .then((json) => {
            if (json !== "fail") {
              json = JSON.parse(json);
            } else {
              json = [];
            }
            console.log(json)
            return {
              type: GitAction.GotProductsByCategoryID,
              payload: json,
            };
          })
          .catch((error) => toast.error(error));
      });


  GetProduct_ItemListByCategorySlug = (action$) =>
    action$
      .ofType(GitAction.GetProductsByCategorySlug)
      .switchMap(({ payload }) => {
        return fetch(url +
          "Product_ItemListByCategorySlug?ProductCategorySlug=" +
          payload.ProductCategoryID +
          "&ProductPerPage=" +
          payload.ProductPerPage +
          "&Page=" +
          payload.Page +
          "&Filter=" +
          payload.Filter
        )
          .then((response) => response.json())
          .then((json) => {
            if (json !== "fail") {
              json = JSON.parse(json);
            } else {
              json = [];
            }
            return {
              type: GitAction.GotProductsByCategorySlug,
              payload: json,
            };
          })
          .catch((error) => toast.error(error));
      });

  addProduct = (action$) =>
    action$.ofType(GitAction.AddProduct).switchMap(({ payload }) => {
      return fetch(url +
        "Product_AddProductVariationMedia?name=" +
        payload.name +
        "&manufacturer=1" +
        payload.manufacturer +
        "&description=" +
        payload.description +
        "&productCategory=" +
        payload.productCategory +
        "&productSupplier=1" +
        payload.productSupplier +
        "&productShoplot=1&productGrid=1&height=" +
        payload.height +
        "&width=" +
        payload.width +
        "&depth=" +
        payload.depth +
        "&weight=" +
        payload.weight +
        "&sku=" +
        payload.sku +
        "&brand=" +
        payload.brand +
        "&model=" +
        payload.model +
        "&tags=" +
        payload.tags
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
          } else {
            json = [];
          }
          return {
            type: "ADDED-PRODUCT",
            payload: json,
          };
        })
        .catch((error) => toast.error(error));
    });

  updateProduct = (action$) =>
    action$.ofType(GitAction.UpdateProduct).switchMap(({ payload }) => {
      return fetch(url +
        "Product_UpdateProduct?PRODUCTID=" +
        payload.ProductID +
        "&name=" +
        payload.name +
        "&manufacturer=1" +
        payload.manufacturer +
        "&description=" +
        payload.description +
        "&productCategory=" +
        payload.productCategory +
        "&productSupplier=1" +
        payload.productSupplier +
        "&productShoplot=1&productGrid=1&height=" +
        payload.height +
        "&width=" +
        payload.width +
        "&depth=" +
        payload.depth +
        "&weight=" +
        payload.weight +
        "&sku=" +
        payload.sku +
        "&brand=" +
        payload.brand +
        "&model=" +
        payload.model +
        "&tags=" +
        payload.tags
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
          } else {
            json = [];
          }
          return {
            type: "UPDATED-PRODUCT",
            payload: json,
          };
        })
        .catch((error) => toast.error(error));
    });

  deleteProduct = (action$) =>
    action$.ofType(GitAction.DeleteProduct).switchMap(({ payload }) => {
      return fetch(url +
        "Product_DeleteProducts?ProductIDs=" +
        payload
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
          } else {
            json = [];
          }
          return {
            type: "DELETED-PRODUCT",
            payload: json,
          };
        })
        .catch((error) => toast.error(error));
    });

  endorseProduct = (action$) =>
    action$.ofType(GitAction.EndorseProduct).switchMap(({ payload }) => {
      return fetch(url +
        "Product_EndorseProducts?ProductIDs=" +
        payload
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
          } else {
            json = [];
          }
          return {
            type: "ENDOSED-PRODUCT",
            payload: json,
          };
        })
        .catch((error) => toast.error(error));
    });

  checkProduct = (action$) =>
    action$.ofType(GitAction.CheckProduct).switchMap(({ payload }) => {
      return fetch(url +
        "Product_CheckDuplication?PRODUCTNAME=" +
        payload
      )
        .then((resposne) => resposne.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
          } else {
            json = [];
          }
          return {
            type: "CHECKED-PRODUCT",
            payload: json,
          };
        })
        .catch((error) => toast.error(error));
    });

  AddProductMedia = (action$) =>
    action$.ofType(GitAction.AddProductMedia).switchMap(({ payload }) => {
      return fetch(url +
        "Product_AddProductMedia?" +
        "PRODUCTID=" +
        payload.productID +
        "&PRODUCTVARIATIONDETAILID=0&WIDTH=" +
        payload.width +
        "&HEIGHT=" +
        payload.height
      );
    });

  //Product Variation Detail

  addProductVariationDetail = (action$) =>
    action$
      .ofType(GitAction.AddProductVariationDetail)
      .switchMap(({ payload }) => {
        return fetch(url +
          "Product_AddProductVariationDetail?PRODUCTIDVARIATION=" +
          payload.ProductVariation +
          "&PRODUCTID=" +
          payload.ProductID +
          "&CUSTOMIZABLE=" +
          payload.Customizable +
          "&VALUE=" +
          payload.Value
        )
          .then((response) => response.json())
          .then((json) => {
            if (json !== "fail") {
              json = JSON.parse(json);
            } else {
              json = [];
            }
            return {
              type: "ENDOSED-PRODUCT",
              payload: json,
            };
          })
          .catch((error) => toast.error(error));
      });

  //Product Variation

  getAllProductVariation = (action$) =>
    action$.ofType(GitAction.GetProductVariation).switchMap(({ payload }) => {
      return fetch(url +
        "Product_ViewProductVariation"
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
          } else {
            json = [];
          }
          return {
            type: "GOT-PRODUCTVARIATION",
            payload: json,
          };
        })
        .catch((error) => toast.error(error));
    });

  getAllProductVariationByCategoryID = (action$) =>
    action$
      .ofType(GitAction.GetProductVariationByCategoryID)
      .switchMap(({ payload }) => {
        return fetch(url +
          "Product_ViewProductVariationByCategoryID?PRODUCTCATEGORYID=" +
          payload
        )
          .then((response) => response.json())
          .then((json) => {
            if (json !== "fail") {
              json = JSON.parse(json);
            } else {
              json = [];
            }
            return {
              type: "GOT-PRODUCTVARIATIONBYCATEGORYID",
              payload: json,
            };
          })
          .catch((error) => toast.error(error));
      });

  addProductVariation = (action$) =>
    action$.ofType(GitAction.AddProductVariation).switchMap(({ payload }) => {
      return fetch(url +
        "Product_AddProductVariation?PRODUCTVARIATION=" +
        payload.ProductVariation +
        "&PRODUCTCATEGORYID=" +
        payload.ProductCategoryID +
        "&CUSTOMIZABLE=" +
        payload.CustomizableIndicator
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
          } else {
            json = [];
          }
          return {
            type: "ADDED-PRODUCTVARIATION",
            payload: json,
          };
        })
        .catch((error) => toast.error(error));
    });

  updateProductVariation = (action$) =>
    action$
      .ofType(GitAction.UpdateProductVariation)
      .switchMap(({ payload }) => {
        return fetch(url +
          "Product_UpdateProductVariation?PRODUCTVARIATIONID=" +
          payload.ProductVariationID +
          "&PRODUCTVARIATION=" +
          payload.ProductVariation +
          "&PRODUCTCATEGORYID=" +
          payload.ProductCategoryID +
          "&CUSTOMIZABLE=" +
          payload.Customizable
        )
          .then((response) => response.json())
          .then((json) => {
            if (json !== "fail") {
              json = JSON.parse(json);
            } else {
              json = [];
            }
            return {
              type: "UPDATED-PRODUCTVARIATION",
              payload: json,
            };
          })
          .catch((error) => toast.error(error));
      });

  deleteProductVariation = (action$) =>
    action$
      .ofType(GitAction.DeleteProductVariation)
      .switchMap(({ payload }) => {
        return fetch(url +
          "Product_DeleteProductVariation?PRODUCTVARIATIONID=" +
          payload.ProductVariationID
        )
          .then((response) => response.json())
          .then((json) => {
            if (json !== "fail") {
              json = JSON.parse(json);
            } else {
              json = [];
            }
            return {
              type: "DELETED-PRODUCTVARIATION",
              payload: json,
            };
          })
          .catch((error) => toast.error(error));
      });

  addProductPurchaseOrder = (action$) =>
    action$
      .ofType(GitAction.AddProductPurchaseOrder)
      .switchMap(({ payload }) => {
        return fetch(url +
          "Product_AddPurchaseOrder?PRODUCTIDS=" +
          payload.ProductID +
          "&PRODUCTQUANTITYS=" +
          payload.ProductStock +
          "&SUPPLIERID=" +
          payload.SupplierID
        )
          .then((response) => {
            return response.json();
          })
          .then((json) => {
            if (json !== "fail") {
              json = JSON.parse(json);
            } else {
              json = [];
            }
            return {
              type: "ADDED-PRODUCTPURCHASEORDER",
              payload: json,
            };
          })
          .catch((error) => toast.error(error));
      });
  // notification list
  getNotification = (action$) =>
    action$.ofType(GitAction.GetNotification).switchMap(({ payload }) => {
      return fetch(url +
        "General_NotificationList?UserID=" +
        payload
      )
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
          } else {
            json = [];
          }
          return {
            type: "GOT-NOTIFICATION",
            payload: json,
          };
        })
        .catch((error) => toast.error(error));
    });

  //Product Category

  getAllCategories = (action$) =>
    action$.ofType(GitAction.GetProductCategory).switchMap(({ payload }) => {
      return fetch(url +
        "Product_CategoryListByAll"
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
          } else {
            json = [];
          }
          return {
            type: "GOT-PRODUCTCATEGORY",
            payload: json,
          };
        })
        .catch((error) => toast.error(error));
    });

  getAllCategoriesListing = (action$) =>
    action$
      .ofType(GitAction.GetProductCategoryListing)
      .switchMap(({ payload }) => {
        return fetch(url +
          "Product_CategoryListing"
        )
          .then((response) => response.json())
          .then((json) => {
            if (json !== "fail") {
              json = JSON.parse(json);
            } else {
              json = [];
            }
            return {
              type: "GOT-PRODUCTCATEGORYLISTING",
              payload: json,
            };
          })
          .catch((error) => toast.error(error));
      });

  addProductCategory = (action$) =>
    action$.ofType(GitAction.AddProductCategory).switchMap(({ payload }) => {
      return fetch(url +
        "Product_AddProductCategory?PRODUCTCATEGORY=" +
        payload.ProductCategory +
        "&PRODUCTCATEGORYIMAGE=" +
        payload.ProductCategoryImage +
        "&HIERARCHYID=" +
        payload.HierarchyID +
        "&PARENTPRODUCTCATEGORYID=" +
        payload.ParentProductCategoryID
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
          } else {
            json = [];
          }
          return {
            type: "ADDED-PRODUCTCATEGORY",
            payload: json,
          };
        })
        .catch((error) => toast.error(error));
    });

  updateProductCategory = (action$) =>
    action$.ofType(GitAction.UpdateProductCategory).switchMap(({ payload }) => {
      return fetch(url +
        "Product_UpdateProductCategory?PRODUCTCATEGORYID=" +
        payload.ProductCategoryID +
        "&PRODUCTCATEGORY=" +
        payload.ProductCategory
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
          } else {
            json = [];
          }
          return {
            type: "UPDATED-PRODUCTCATEGORY",
            payload: json,
          };
        })
        .catch((error) => toast.error(error));
    });

  deleteProductCategory = (action$) =>
    action$.ofType(GitAction.DeleteProductCategory).switchMap(({ payload }) => {
      return fetch(url +
        "Product_DeleteProductCategory?PRODUCTCATEGORYID=" +
        payload
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
          } else {
            json = [];
          }
          return {
            type: "DELETED-PRODUCTCATEGORY",
            payload: json,
          };
        })
        .catch((error) => toast.error(error));
    });

  //=================SUPPLIER=============================//

  getAllSupplierByUserStatus = (action$) =>
    action$
      .ofType(GitAction.GetSupplierByUserStatus)
      .switchMap(({ payload }) => {
        return fetch(url +
          "User_ProfileListByUserStatus?UserStatus=" +
          payload +
          "&UserRoleID=15"
        )
          .then((response) => response.json())
          .then((json) => {
            if (json !== "fail") {
              json = JSON.parse(json);
            } else {
              json = [];
            }
            return {
              type: "GOT-SUPPLIERBYUSERSTATUS",
              payload: json,
            };
          })
          .catch((error) => toast.error(error));
      });

  registerSupplier = (action$) =>
    action$.ofType(GitAction.RegisterSupplier).switchMap(({ payload }) => {
      return fetch(url +
        "User_SupplierRegister?USERNAME=" +
        payload.repUsername +
        "&USERPASSWORD=" +
        payload.repPassword +
        "&USERFIRSTNAME=" +
        payload.repFirstName +
        "&USERLASTNAME=" +
        payload.repLastName +
        "&USERCONTACTNO=" +
        payload.repContact +
        "&USERDATEBIRTH=" +
        payload.repDOB +
        "&USEREMAIL=" +
        payload.repEmail +
        "&SUPPLIERNAME=" +
        payload.supplierName +
        "&SUPPLIERCONTACTNUMBER=" +
        payload.supplierContact +
        "&SUPPLIERWEBSITE=" +
        payload.supplierWebsite +
        "&SUPPLIERADDRESSLINE1=" +
        payload.supplierAddress1 +
        "&SUPPLIERADDRESSLINE2=" +
        payload.supplierAddress2 +
        "&SUPPLIERPOSCODE=" +
        payload.supplierPostal +
        "&SUPPLIERCITY=" +
        payload.supplierCity +
        "&SUPPLIERSTATE=" +
        payload.supplierState +
        "&SUPPLIERCOUNTRYID=2"
        // payload.supplierCountry
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
          } else {
            json = [];
          }
          return {
            type: "REGISTERED-SUPPLIER",
            payload: json,
          };
        })
        .catch((error) => toast.error(error));
    });

  endorseSupplier = (action$) =>
    action$.ofType(GitAction.EndorseSupplier).switchMap(({ payload }) => {
      return fetch(url +
        "User_EndorseSupplier?USERIDS=" +
        payload.selectedData +
        "&USERSTATUS=" +
        payload.status
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
          } else {
            json = [];
          }
          return {
            type: "ENDOSED-SUPPLIER",
            payload: json,
          };
          // }
        })
        .catch((error) => toast.error(error));
    });

  //==================STORAGE==========================//

  // Storage
  getAllShoplots = (action$) =>
    action$.ofType(GitAction.GetShoplots).switchMap(({ payload }) => {
      return fetch(url +
        "Storage_ShoplotList"
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
          } else {
            json = [];
          }
          return {
            type: "GOT-SHOPLOTS",
            payload: json,
          };
        })
        .catch((error) => toast.error(error));
    });

  getAllShoplotsPolygon = (action$) =>
    action$.ofType(GitAction.GetShoplotsPoly).switchMap(({ payload }) => {
      return fetch(url +
        "Storage_ShoplotList?SHOPLOTBLOCK=" +
        payload
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
          } else {
            json = [];
          }
          return {
            type: "GOT-SHOPLOTSPOLY",
            payload: json,
          };
        })
        .catch((error) => toast.error(error));
    });

  addShoplot = (action$) =>
    action$.ofType(GitAction.AddShoplots).switchMap(({ payload }) => {
      return fetch(url +
        "Storage_AddShoplot?SHOPLOTNAME=" +
        payload.ShoplotName +
        "&CONTACTNO=" +
        payload.ContactNo +
        "&LONGITUDE=" +
        payload.Longitude +
        "&LATITUDE=" +
        payload.Latitude
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
          } else {
            json = [];
          }
          return {
            type: "ADDED-SHOPLOTS",
            payload: json,
          };
        })
        .catch((error) => toast.error(error));
    });

  updateShoplot = (action$) =>
    action$.ofType(GitAction.UpdateShoplots).switchMap(({ payload }) => {
      return fetch(url +
        "Storage_UpdateShoplot?SHOPLOTID=" +
        payload.ShoplotID +
        "&SHOPLOTNAME=" +
        payload.ShoplotName +
        "&CONTACTNO=" +
        payload.ContactNo +
        "&LONGITUDE=" +
        payload.Longitude +
        "&LATITUDE=" +
        payload.Latitude
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
          } else {
            json = [];
          }
          return {
            type: "UPDATED-SHOPLOTS",
            payload: json,
          };
        })
        .catch((error) => toast.error(error));
    });

  deleteShoplot = (action$) =>
    action$.ofType(GitAction.DeleteShoplots).switchMap(({ payload }) => {
      return fetch(url +
        "Storage_DeleteShoplot?SHOPLOTID=" +
        payload.ShoplotID
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
          } else {
            json = [];
          }
          return {
            type: "DELETED-SHOPLOTS",
            payload: json,
          };
        })
        .catch((error) => toast.error(error));
    });

  // GridStorages
  getAllGridStorages = (action$) =>
    action$.ofType(GitAction.GetGridStorages).switchMap(({ payload }) => {
      return fetch(url +
        "Storage_GridStorageList"
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
          } else {
            json = [];
          }
          return {
            type: "GOT-GRIDSTORAGES",
            payload: json,
          };
        })
        .catch((error) => toast.error(error));
    });

  addGridStorages = (action$) =>
    action$.ofType(GitAction.AddGridStorages).switchMap(({ payload }) => {
      return fetch(url +
        "Storage_AddGridStorage?GRIDSTORAGECODE=" +
        payload.GridStorageCode +
        "&SHOPLOTID=" +
        payload.ShoplotID +
        "&RENTALPRICE=" +
        payload.RentalPricePerMonth
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
          } else {
            json = [];
          }
          return {
            type: "ADDED-GRIDSTORAGES",
            payload: json,
          };
        })
        .catch((error) => toast.error(error));
    });

  updateGridStorages = (action$) =>
    action$.ofType(GitAction.UpdateGridStorages).switchMap(({ payload }) => {
      return fetch(url +
        "Storage_UpdateGridStorage?GRIDSTORAGEID=" +
        payload.GirdStorageID +
        "&GRIDSTORAGECODE=" +
        payload.GridStorageCode +
        "&SHOPLOTID=" +
        payload.ShoplotID +
        "&RENTALPRICE=" +
        payload.RentalPrice
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
          } else {
            json = [];
          }
          return {
            type: "UPDATED-GRIDSTORAGES",
            payload: json,
          };
        })
        .catch((error) => toast.error(error));
    });

  deleteGridStorages = (action$) =>
    action$.ofType(GitAction.DeleteGridStorages).switchMap(({ payload }) => {
      return fetch(url +
        "Storage_DeleteGridStorage?GRIDSTORAGEID=" +
        payload
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
          } else {
            json = [];
          }
          return {
            type: "DELETED-GRIDSTORAGES",
            payload: json,
          };
        })
        .catch((error) => toast.error(error));
    });
  //=================REPORT=============================//
  // Reports
  viewOverallSummary = (action$) =>
    action$.ofType(GitAction.GetOverallSummary).switchMap(({ payload }) => {
      return fetch(url +
        "Report_OverallSummary?STARTDATETIME112=" +
        payload.StartDateTime +
        "&ENDDATETIME112=" +
        payload.StartDateTime
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
          } else {
            json = [];
          }
          return {
            type: "GOT-OVERALLSUMMARY",
            payload: json,
          };
        })
        .catch((error) => toast.error(error));
    });

  //=================REVIEW=============================//

  // Summary
  viewProductReviewByProductID = (action$) =>
    action$
      .ofType(GitAction.GetProductReviewByProductID)
      .switchMap(({ payload }) => {
        return fetch(url +
          "Product_ViewReviewByProductID?PRODUCTID=" +
          payload.ProductID +
          "&PARENTPRODUCTREVIEWID=" +
          payload.ParentProductReviewID
        )
          .then((response) => response.json())
          .then((json) => {
            if (json !== "fail") {
              json = JSON.parse(json);
            } else {
              json = [];
            }
            return {
              type: "GOT-PRODUCTREVIEWBYPRODUCTID",
              payload: json,
            };
          })
          .catch((error) => toast.error(error));
      });

  viewProductReview = (action$) =>
    action$.ofType(GitAction.GetProductReview).switchMap(({ payload }) => {
      return fetch(url +
        "Product_ViewProductReview?USERID=" +
        payload.UserID
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
          } else {
            json = [];
          }
          return {
            type: "GOT-PRODUCTREVIEW",
            payload: json,
          };
        })
        .catch((error) => toast.error(error));
    });

  addProductReview = (action$) =>
    action$.ofType(GitAction.addProductReview).switchMap(({ payload }) => {
      return fetch(url +
        "Product_AddReview?PARENTPRODUCTREVIEWID=" + payload.parentProductReviewID
        + "&PRODUCTID=" + payload.productID
        + "&USERID=" + payload.UserID
        + "&PRODUCTREVIEWRATING=" + payload.productReviewRating
        + "&PRODUCTREVIEWCOMMENT=" + payload.productReviewComment
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
            toast.success("Sucessfully added a product review");
          } else {
            json = [];
          }

          return fetch(url +
            "Product_ViewReviewByProductID?PRODUCTID=" +
            payload.productID +
            "&PARENTPRODUCTREVIEWID=0")
            .then((response) => response.json())
            .then((json) => {
              if (json !== "fail") {
                json = JSON.parse(json);
              } else {
                json = [];
              }
              return {
                type: "ADDED-PRODUCTREVIEW",
                payload: json,
              };
            })
            .catch((error) => toast.error(error));
        })
        .catch((error) => toast.error(error));
    });

  //=================COLOR=============================//
  getAllColor = (action$) =>
    action$.ofType(GitAction.GetColor).switchMap(({ payload }) => {
      return fetch(url +
        "General_ColorList"
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
          } else {
            json = [];
          }
          return {
            type: "GOT-COLOR",
            payload: json,
          };
        })
        .catch((error) => toast.error(error));
    });

  addColor = (action$) =>
    action$.ofType(GitAction.AddColor).switchMap(({ payload }) => {
      return fetch(url +
        "General_AddColor?COLORNAME=" +
        payload.Color +
        "&COLORHEX=" +
        payload.ColorHex +
        "&COLORR=" +
        payload.color.r +
        "&COLORG=" +
        payload.color.g +
        "&COLORB=" +
        payload.color.b +
        "&COLORA=" +
        payload.color.a
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
          } else {
            json = [];
          }
          return {
            type: "ADDED-COLOR",
            payload: json,
          };
        })
        .catch((error) => toast.error(error));
    });

  updateColor = (action$) =>
    action$.ofType(GitAction.UpdateColor).switchMap(({ payload }) => {
      return fetch(url +
        "General_UpdateColor?COLORID=" +
        payload.ColorID +
        "&COLORNAME=" +
        payload.Color +
        "&COLORHEX=" +
        payload.ColorHex +
        "&COLORR=" +
        payload.color.r +
        "&COLORG=" +
        payload.color.g +
        "&COLORB=" +
        payload.color.b +
        "&COLORA=" +
        payload.color.a
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
          } else {
            json = [];
          }
          return {
            type: "UPDATED-COLOR",
            payload: json,
          };
        })
        .catch((error) => toast.error(error));
    });

  deleteColor = (action$) =>
    action$.ofType(GitAction.DeleteColor).switchMap(({ payload }) => {
      return fetch(url +
        "General_DeleteColor?COLORID=" +
        payload
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
          } else {
            json = [];
          }
          return {
            type: "DELETED-COLOR",
            payload: json,
          };
        })
        .catch((error) => toast.error(error));
    });

  //=================QUOTATION=============================//
  AddProductQuotation = (action$) =>
    action$.ofType(GitAction.AddProductQuotation).switchMap(({ payload }) => {
      return fetch(url +
        "Product_AddQuotation?PRODUCTIDS=" +
        payload.ProductIDs +
        "&PRODUCTQUANTITYS=" +
        payload.ProductQuantities +
        "&PRODUCTPRICES=" +
        payload.ProductPrices +
        "&SUPPLIERID=1"
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
          } else {
            json = [];
          }
          return {
            type: "ADDED-QUOTATION",
            payload: json,
          };
        })
        .catch((error) => toast.error(error));
    });

  AddedProductQuotation = (action$) =>
    action$.ofType(GitAction.AddedProductQuotation).switchMap(({ payload }) => {
      return fetch(url +
        "Product_AddQuotation?PRODUCTIDS=" +
        payload.ProductIDs +
        "&PRODUCTQUANTITYS=" +
        payload.ProductQuantities +
        "&PRODUCTPRICES=" +
        payload.ProductPrices +
        "&SUPPLIERID=1"
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
          } else {
            json = [];
          }
          return {
            type: "ADDED-QUOTATION",
            payload: json,
          };
        })
        .catch((error) => toast.error(error));
    });

  ViewProductQuotation = (action$) =>
    action$.ofType(GitAction.GetProductQuotation).switchMap(({ payload }) => {
      return fetch(url +
        "Product_ViewQuotation?USERID=" +
        payload.USERID
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
          } else {
            json = [];
          }
          return {
            type: "GOT-QUOTATION",
            payload: json,
          };
        })
        .catch((error) => toast.error(error));
    });

  deleteQuotation = (action$) =>
    action$.ofType(GitAction.DeleteQuotation).switchMap(({ payload }) => {
      return fetch(url + "Product_DeleteQuotation?PRODUCTQUOTATIONID=" + payload)
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
          } else {
            json = [];
          }
          return {
            type: "DELETED-QUOTATION",
            payload: json,
          };
        })
        .catch((error) => toast.error(error));
    });

  //=================USER_ADDRESS=============================//
  ViewAddress = (action$) =>
    action$.ofType(GitAction.GetAddress).switchMap(({ payload }) => {

      return fetch(url +
        "User_ViewAddressBook?USERID=" +
        payload.USERID
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
          } else {
            json = [];
          }
          return {
            type: "GOT-ADDRESS",
            payload: json,
          };
        })
        .catch((error) => toast.error(error));
    });

  addAddress = (action$) =>
    action$.ofType(GitAction.AddAddress).switchMap(({ payload }) => {

      return fetch(url +
        "User_AddAddressBook?USERADDRESSNAME=" +
        payload.Address +
        "&USERID=" +
        payload.USERID +
        "&USERCONTACTNO=" +
        payload.ContactNo +
        "&USEREMAIL=" +
        payload.email +
        "&USERADDRESSLINE1=" +
        payload.USERADDRESSLINE1 +
        "&USERADDRESSLINE2=" +
        payload.USERADDRESSLINE2 +
        "&USERPOSCODE=" +
        payload.USERPOSCODE +
        "&USERSTATE=" +
        payload.USERSTATE +
        "&USERCITY=" +
        payload.USERCITY +
        "&COUNTRYID=" +
        payload.USERCOUNTRYID
      )
        .then((response) => response.json())
        .then((returnVal) => {
          if (returnVal !== "fail") {
            returnVal = JSON.parse(returnVal);
            toast.success("Address successfully added")
          } else {
            returnVal = [];
          }
          return fetch(url +
            "User_ViewAddressBook?USERID=" +
            payload.USERID
          )
            .then((response) => response.json())
            .then((AllAddress) => {
              if (AllAddress !== "fail") {
                AllAddress = JSON.parse(AllAddress);
              } else {
                AllAddress = [];
              }
              return {
                type: GitAction.AddedAddress,
                payloadCondition: returnVal,
                payloadValue: AllAddress,
              };
            })
            .catch((error) => toast.error(error));
        })
        .catch((error) => toast.error(error));
    });

  updateAddress = (action$) =>
    action$.ofType(GitAction.UpdateAddress).switchMap(({ payload }) => {
      return fetch(url +
        "User_UpdateAddressBook?USERADDRESSBOOKID=" +
        payload.AddressBookNo +
        "&USERADDRESSNAME=" +
        payload.Address +
        "&USERID=" +
        payload.USERID +
        "&USERCONTACTNO=" +
        payload.ContactNo +
        "&USEREMAIL=" +
        payload.email +
        "&USERADDRESSLINE1=" +
        payload.USERADDRESSLINE1 +
        "&USERADDRESSLINE2=" +
        payload.USERADDRESSLINE2 +
        "&USERPOSCODE=" +
        payload.USERPOSCODE +
        "&USERSTATE=" +
        payload.USERSTATE +
        "&USERCITY=" +
        payload.USERCITY +
        "&COUNTRYID=" +
        payload.COUNTRYID
      )
        .then((response) => response.json())
        .then((returnVal) => {
          if (returnVal !== "fail") {
            returnVal = JSON.parse(returnVal);
            toast.success("Address successfully updated")
          } else {
            returnVal = [];
          }
          return fetch(url +
            "User_ViewAddressBook?USERID=" +
            payload.USERID
          )
            .then((response) => response.json())
            .then((AllAddress) => {
              if (AllAddress !== "fail") {
                AllAddress = JSON.parse(AllAddress);
              } else {
                AllAddress = [];
              }
              return {
                type: GitAction.UpdatedAddress,
                payloadCondition: returnVal,
                payloadValue: AllAddress,
              };
            })
            .catch((error) => toast.error(error));
        })
        .catch((error) => toast.error(error));
    });

  deleteAddress = (action$) =>
    action$.ofType(GitAction.DeleteAddress).switchMap(({ payload }) => {
      return fetch(url +
        "User_DeleteAddressBook?USERADDRESSBOOKID=" +
        payload.AddressBookNo
      )
        .then((response) => response.json())
        .then((returnVal) => {
          if (returnVal !== "fail") {
            returnVal = JSON.parse(returnVal);
            toast.success("Address successfully deleted")
          } else {
            returnVal = [];
          }
          return fetch(url +
            "User_ViewAddressBook?USERID=" +
            payload.USERID
          )
            .then((response) => response.json())
            .then((AllAddress) => {
              if (AllAddress !== "fail") {
                AllAddress = JSON.parse(AllAddress);
              } else {
                AllAddress = [];
              }
              return {
                type: GitAction.DeletedAddress,
                payloadCondition: returnVal,
                payloadValue: AllAddress,
              };
            })
            .catch((error) => toast.error(error));
        })
        .catch((error) => toast.error(error));
    });

  //=================ORDER=============================//
  AddOrder = (action$) =>
    action$.ofType(GitAction.AddOrder).switchMap(({ payload }) => {

      return fetch(url +
        "Order_AddOrder?USERID=" + payload.UserID
        + "&USERADDRESSID=" + payload.UserAddressID
        + "&PROMOTIONID=0&PROMOTIONCODEID=0&PAYMENTMETHODID=0&PRODUCTID=" + payload.ProductID
        + "&PRODUCTQUANTITY=" + payload.ProductQuantity
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
            toast.success("Order is successfully created ORDERID : " + json[0].OrderID);
          } else {
            json = [];
          }
          return fetch(url + "Product_DeleteProductCart?USERCARTID=" + payload.UserCartID)
            .then((response) => response.json())
            .then((json2) => {

              if (json2 !== "fail") {
                json2 = json2;
              } else {
                json2 = [];
              }
              return {
                type: "ADDED-ORDER",
                payload: json,
              };
            })
            .catch((error) => console.log(error));
        })
        .catch((error) => toast.error(error));
    });

  //=================DELIVERY=============================//
  getDeliverableList = (action$) =>
    action$.ofType(GitAction.GetDeliverableList).switchMap(({ payload }) => {
      return fetch(url +
        "Order_ViewOrderByIncomplete"
      )
        .then((response) => response.json())
        .then((json) => {
          // alert(json);
          if (json !== "fail") {
            json = JSON.parse(json);
          } else {
            json = [];
          }
          return {
            type: "GOT-DELIVERABLELIST",
            payload: json,
          };
        })
        .catch((error) => toast.error(error));
    });

  getOrderListByID = (action$) =>
    action$.ofType(GitAction.GetOrderListByOrderID).switchMap(({ payload }) => {
      
      console.log(url +
        "Order_ViewOrderByOrderID?ORDERID=" + payload.OrderID)
      return fetch(url +
        "Order_ViewOrderByOrderID?ORDERID=" + payload.OrderID
      )
        .then((response) => response.json())
        .then((json) => {
          // alert(json);
          if (json !== "fail") {
            json = JSON.parse(json);
          } else {
            json = [];
          }
          return {
            type: "GOT-ORDERLISTBYORDERID",
            payload: json,
          };
        })
        .catch((error) => toast.error(error));
    });
  //=================PROMOTIONS====================//

  getAllPromotion = (action$) =>
    action$.ofType(GitAction.GetPromotion).switchMap(({ payload }) => {
      return fetch(url +
        "Promo_ViewPromotion?ACTIVEIND"
      )
        .then((response) => response.json())
        .then((json) => {
          // alert(json);
          if (json !== "fail") {
            json = JSON.parse(json);
          } else {
            json = [];
          }
          return {
            type: "GOT-PROMOTION",
            payload: json,
          };
        })
        .catch((error) => toast.error(error));
    });

  AddPromotion = (action$) =>
    action$.ofType(GitAction.AddPromotion).switchMap(({ payload }) => {
      return fetch(url +
        "Promo_AddPromotion?PROMOTIONTITLE=" +
        payload.PromotionTitle +
        "&PROMOTIONDESC=" +
        payload.PromotionDesc +
        "&BANNERIMAGE=" +
        payload.BannerImage +
        "&SLIDEORDER=" +
        payload.SlideOrder +
        "&PROMOTIONSTARTDATE=" +
        payload.promoStart +
        "&PROMOTIONENDDATE=" +
        payload.promoEnd +
        "&PRODUCTID=" +
        payload.ProductID +
        "&PROMOTIONDISCOUNTPERCENTAGE=" +
        payload.DiscountPercentage // {98,99,100}
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
          } else {
            json = [];
          }
          return {
            type: "ADDED-PROMOTION",
            payload: json,
          };
        })
        .catch((error) => toast.error(error));
    });

  UpdatePromotion = (action$) =>
    action$.ofType(GitAction.UpdatePromotion).switchMap(({ payload }) => {
      return fetch(url +
        "Promo_UpdatePromotion?PROMOTIONID=" +
        // "http://localhost/LoopApi/api/LoopApi/Promo_UpdatePromotion?PROMOTIONID&=idPROMOTIONTITLE=title&PROMOTIONDESC=desc&PROMOTIONSTARTDATE=20201117&PROMOTIONENDDATE=20201117&PRODUCTID=[100,90,99]"
        payload.PromotionID +
        "&PROMOTIONTITLE=" +
        payload.PromotionTitle +
        "&PROMOTIONDESC=" +
        payload.PromotionDesc +
        "&BANNERIMAGE=" +
        payload.BannerImage +
        "&SLIDEORDER=" +
        payload.SlideOrder +
        "&PROMOTIONSTARTDATE=" +
        payload.promoStart +
        "&PROMOTIONENDDATE=" +
        payload.promoEnd +
        "&PROMOTIONITEMID=" +
        payload.ProductID +
        "&PROMOTIONDISCOUNTPERCENTAGE=" +
        payload.DiscountPercentage // {98,99,100}
      )
        .then((response) => response.json())
        .then((json) => {
          // alert("hey");
          if (json !== "fail") {
            json = JSON.parse(json);
          } else {
            json = [];
          }
          return {
            type: "UPDATED-PROMOTION",
            payload: json,
          };
        })
        .catch((error) => toast.error(error));
    });

  DeletePromotion = (action$) =>
    action$.ofType(GitAction.DeletePromotion).switchMap(({ payload }) => {
      return fetch(url +
        "Promo_DeletePromotion?PROMOTIONID=" +
        payload
      )
        .then((response) => response.json())
        .then((json) => {
          // alert("aaaaaaaaaa");
          json = JSON.parse(json);
          return {
            type: "DELETED-PROMOTION",
            payload: json,
          };
        })
        .catch((error) => toast.error(error));
    });

  getAllProductPromos = (action$) =>
    action$.ofType(GitAction.GetPromo).switchMap(({ payload }) => {
      return fetch(url +
        "Promo_ViewPromotion?ACTIVEIND=0"
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
          } else {
            json = [];
          }
          return {
            type: "GOT-PROMO",
            payload: json,
          };
        })
        .catch((error) => toast.error(error));
    });

  getAllPromoCodes = (action$) =>
    action$.ofType(GitAction.GetPromoCode).switchMap(({ payload }) => {
      return fetch(url +
        "Promo_ViewPromoCode?ACTIVEIND=0"
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
          } else {
            json = [];
          }
          return {
            type: "GOT-PROMOCODE",
            payload: json,
          };
        })
        .catch((error) => toast.error(error));
    });

  addPromoCode = (action$) =>
    action$.ofType(GitAction.AddPromoCode).switchMap(({ payload }) => {
      return fetch(url +
        "Promo_AddPromoCode?PROMOTIONID=" +
        payload.promo +
        "&PROMOCODE=" +
        payload.promoCode +
        "&PROMOCODESTARTDATE=" +
        payload.promoStart +
        "&PROMOCODEENDDATE=" +
        payload.promoEnd +
        "&PRODUCTID=" +
        payload.productID
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
          } else {
            json = [];
          }
          return {
            type: "GOT-PROMOCODE",
            payload: json,
          };
        })
        .catch((error) => toast.error(error));
    });

  updatePromoCode = (action$) =>
    action$.ofType(GitAction.UpdatePromoCode).switchMap(({ payload }) => {
      return fetch(url +
        "Promo_UpdatePromoCode?PROMOCODEID=" +
        payload.promoCodeId +
        "&PROMOTIONID=" +
        payload.promo +
        "&PROMOCODE=" +
        payload.promoCode +
        "&PROMOCODESTARTDATE=" +
        payload.promoStart +
        "&PROMOCODEENDDATE=" +
        payload.promoEnd +
        "&PRODUCTID=" +
        payload.productID
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
          } else {
            json = [];
          }
          return {
            type: "UPDATED-PROMOCODE",
            payload: json,
          };
        })
        .catch((error) => toast.error(error));
    });

  deletePromoCode = (action$) =>
    action$.ofType(GitAction.DeletePromoCode).switchMap(({ payload }) => {
      return fetch(url +
        "Promo_DeletePromoCode?PROMOCODEID=" +
        payload
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
          } else {
            json = [];
          }
          return {
            type: "DELETED-PROMOCODE",
            payload: json,
          };
        })
        .catch((error) => toast.error(error));
    });

  //=================TRANSACTIONS====================//
  getAllTransactions = (action$) =>
    action$.ofType(GitAction.GetTransactions).switchMap(({ payload }) => {
      return fetch(url +
        "Order_ViewOrder?TRACKINGSTATUS=" +
        payload
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
          } else {
            json = [];
          }
          return {
            type: "GOT-TRANSACTION",
            payload: json,
          };
        })
        .catch((error) => toast.error(error));
    });

  getAllDeliveryList = (action$) =>
    action$
      .ofType(GitAction.GetTransactionsWithDelivery)
      .switchMap(({ payload }) => {
        return fetch(url +
          "Order_ViewOrderByDelivery"
        )
          .then((response) => response.json())
          .then((json) => {
            if (json !== "fail") {
              json = JSON.parse(json);
            } else {
              json = [];
            }
            return {
              type: "GOT-TRANSACTIONWITHDELIVERY",
              payload: json,
            };
          })
          .catch((error) => toast.error(error));
      });

  getAllTransactionStatus = (action$) =>
    action$.ofType(GitAction.GetTransactionStatus).switchMap(({ payload }) => {
      return fetch(url +
        "Order_ViewOrderStatus"
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
          } else {
            json = [];
          }
          return {
            type: "GOT-TRANSACTIONSTATUS",
            payload: json,
          };
        })
        .catch((error) => toast.error(error));
    });
  //=================ACCOUNT====================//
  getAllPayableList = (action$) =>
    action$.ofType(GitAction.GetReceivableList).switchMap(({ payload }) => {
      return fetch(url +
        "Account_ViewReceivableList"
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
          } else {
            json = [];
          }
          return {
            type: "GOT-RECEIVABLELIST",
            payload: json,
          };
        })
        .catch((error) => toast.error(error));
    });

  getAllReceivableList = (action$) =>
    action$.ofType(GitAction.GetPayableList).switchMap(({ payload }) => {
      return fetch(url +
        "Account_ViewPayableList"
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
          } else {
            json = [];
          }
          return {
            type: "GOT-PAYABLELIST",
            payload: json,
          };
        })
        .catch((error) => toast.error(error));
    });
  //=================INVENTORY====================//
  updateProductStock = (action$) =>
    action$.ofType(GitAction.UpdateInventory).switchMap(({ payload }) => {
      fetch(
        "Inventory_UpdateProductStock?PRODUCTIDS=" +
        payload.SelectedProductID +
        "&PRODUCTSTOCK=" +
        payload.SelectedProductStock
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
          } else {
            json = [];
          }
          return {
            type: "UPDATED-INVENTORY",
            payload: json,
          };
        })
        .catch((error) => toast.error(error));

      return fetch(url +
        "Product_ItemListByProductStatus?PRODUCTSTATUS=" +
        payload.ProductStatus +
        "&USERID=" +
        payload.UserID
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
          } else {
            json = [];
          }
          return {
            type: "GOT-PRODUCT-BYPRODUCTSTATUS",
            payload: json,
          };
        })
        .catch((error) => toast.error(error));
    });

  endorseProductStock = (action$) =>
    action$
      .ofType(GitAction.EndorseInventoryProductStock)
      .switchMap(({ payload }) => {
        fetch(
          "Order_EndorseOrderProductStock?PRODUCTIDS=" +
          payload.ProductID +
          "&PRODUCTSTOCKAMOUNT=" +
          payload.ProductStockAmount
        )
          .then((response) => response.json())
          .then((json) => {
            if (json !== "fail") {
              json = JSON.parse(json);
            } else {
              json = [];
            }
            return {
              type: "ENDORSED-INVENTORYPRODUCTSTOCK",
              payload: json,
            };
          })
          .catch((error) => toast.error(error));

        return fetch(url +
          "Order_ViewSummaryOrderProductByStatus?PRODUCTSTOCKSTATUS=" +
          payload.ProductStockStatus +
          "&USERID=" +
          payload.UserID
        )
          .then((response) => response.json())
          .then((json) => {
            if (json !== "fail") {
              json = JSON.parse(json);
            } else {
              json = [];
            }
            return {
              type: "GOT-PRODUCTSTOCKBYSTATUS",
              payload: json,
            };
          })
          .catch((error) => toast.error(error));
      });

  updateProductStockOut = (action$) =>
    action$.ofType(GitAction.UpdateProductStockOut).switchMap(({ payload }) => {
      fetch(
        "Order_UpdateOrderStockOut?ORDERID=" +
        payload.OrderID +
        "&PRODUCTIDS=" +
        payload.ProductID +
        "&PRODUCTSTOCK=" +
        payload.ProductStockAmount
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
          } else {
            json = [];
          }
          return {
            type: "UPDATE-INVENTORYPRODUCTSTOCKOUT",
            payload: json,
          };
        })
        .catch((error) => toast.error(error));

      return fetch(url +
        "Order_ViewOrderByDelivery"
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
          } else {
            json = [];
          }
          return {
            type: "GOT-TRANSACTIONWITHDELIVERY",
            payload: json,
          };
        })
        .catch((error) => toast.error(error));
    });

  // ================= Email Subscriber ===================== //
  getAllSubs = (action$) =>
    action$.ofType(GitAction.GetSubs).switchMap(({ payload }) => {


      return fetch(url +
        "Subcriber_ViewSubcriber"
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
          } else {
            json = [];
          }
          return {
            type: "GOT-SUBCRIBER",
            payload: json,
          };
        })
        .catch((error) => toast.error(error));
    });

  AddSubs = (action$) =>
    action$.ofType(GitAction.AddSubcs).switchMap(({ payload }) => {
      return fetch(url +
        "Subcriber_AddNew?SUBSCRIBEREMAIL=" +
        payload.SubsMail
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
          } else {
            json = [];
          }
          return {
            type: "ADDED-SUBCRIBER",
            payload: json,
          };
        })
        .catch((error) => toast.error(error));
    });

  //===================MERCHANTS=======================//
  getAllMerchants = (action$) =>
    action$.ofType(GitAction.GetMerchants).switchMap(({ payload }) => {
      return fetch(url +
        "User_ProfileListByUserType?UserTypeID=16"
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
          } else {
            json = [];
          }
          return {
            type: "GOT-MERCHANTS",
            payload: json,
          };
        })
        .catch((error) => toast.error(error));
    });

  getAllMerchantOrders = (action$) =>
    action$.ofType(GitAction.GetMerchantOrders).switchMap(({ payload }) => {

      console.log(url +
        "Order_ViewOrderByUserID?TRACKINGSTATUS=" +
        payload.trackingStatus +
        "&USERID=" +
        payload.UserID)
      return fetch(url +
        "Order_ViewOrderByUserID?TRACKINGSTATUS=" +
        payload.trackingStatus +
        "&USERID=" +
        payload.UserID
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
          } else {
            json = [];
          }
          return {
            type: "GOT-MERCHANTSORDERS",
            payload: json,
          };
        })
        .catch((error) => toast.error(error));
    });

  //===================PRODUCT ORDERS============================//
  getAllProductOrders = (action$) =>
    action$.ofType(GitAction.GetProductOrders).switchMap(({ payload }) => {
      return fetch(url +
        "Order_ViewSummaryOrderProduct"
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
          } else {
            json = [];
          }
          return {
            type: "GOT-PRODUCTORDERS",
            payload: json,
          };
        })
        .catch((error) => toast.error(error));
    });
  getProductStockByStatus = (action$) =>
    action$
      .ofType(GitAction.GetProductStockByStatus)
      .switchMap(({ payload }) => {
        return fetch(url +
          "Order_ViewSummaryOrderProductByStatus?PRODUCTSTOCKSTATUS=" +
          payload.ProductStockStatus +
          "&USERID=" +
          payload.UserID
        )
          .then((response) => response.json())
          .then((json) => {
            if (json !== "fail") {
              json = JSON.parse(json);
            } else {
              json = [];
            }
            return {
              type: "GOT-PRODUCTSTOCKBYSTATUS",
              payload: json,
            };
          })
          .catch((error) => toast.error(error));
      });
  sendSalesOrder = (action$) =>
    action$.ofType(GitAction.SendSalesOrder).switchMap(({ payload }) => {
      return fetch(url +
        "Product_ReplyPurchaseOrderWithSaleOrder?PRODUCTPURCHASEORDERID=" +
        payload.ProductPurchaseOrderID +
        "&SALEORDERNO=" +
        payload.salesOrderNo +
        "&SALEORDERFILE=" +
        payload.file +
        "&REMARK=" +
        payload.remark
      )
        .then((response) => response.json())
        .then((json) => {
          // if (json !== "fail") {
          //   json = JSON.parse(json);
          // } else {
          json = [];
          // }
          return {
            type: "SENT-SALESORDER",
            payload: json,
          };
        })
        .catch((error) => toast.error(error));
    });

  addPurchaseOrder = (action$) =>
    action$.ofType(GitAction.AddPurchaseOrder).switchMap(({ payload }) => {
      fetch(
        "Product_AddPurchaseOrderByBatch?PRODUCTIDS=" +
        payload.ProductIDs +
        "&PRODUCTQUANTITYS=" +
        payload.ProductQuantities +
        "&SUPPLIERID=" +
        payload.SupplierIDs
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
          } else {
            json = [];
          }
          return {
            type: "ADDED-PURCHASEORDER",
            payload: json,
          };
        })
        .catch((error) => toast.error(error));

      return fetch(url +
        "Order_ViewSummaryOrderProduct"
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
          } else {
            json = [];
          }
          return {
            type: "GOT-PRODUCTORDERS",
            payload: json,
          };
        })
        .catch((error) => toast.error(error));
    });

  getAllPurchaseOrders = (action$) =>
    action$.ofType(GitAction.GetPurchaseOrders).switchMap(({ payload }) => {
      return fetch(url +
        "Product_ViewPurchaseOrder?USERID=" +
        payload
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
          } else {
            json = [];
          }
          return {
            type: "GOT-PURCHASEORDERS",
            payload: json,
          };
        })
        .catch((error) => toast.error(error));
    });

  updateProductDetailStatus = (action$) =>
    action$
      .ofType(GitAction.UpdateOrderProductStatus)
      .switchMap(({ payload }) => {
        return fetch(url +
          "Order_UpdateProductDetailStatus?ORDERPRODUCTDETAILID=" +
          payload.OrderProductDetailID +
          "&PRODUCTSTATUS=Delivered"
        )
          .then((response) => response.json())
          .then((json) => {
            if (json !== "fail") {
              json = JSON.parse(json);
            } else {
              json = [];
            }
            return {
              type: "UPDATED-OrderProductStatus",
              payload: json,
            };
          })
          .catch((error) => toast.error(error));
      });

  updatePurchaseOrderStatus = (action$) =>
    action$
      .ofType(GitAction.UpdatePurchaseOrderStatus)
      .switchMap(({ payload }) => {
        return fetch(url +
          "Product_UpdatePurchaseOrderStatus?PRODUCTPURCHASEORDERID=" +
          payload.ProductPurchaseOrderID +
          "&PRODUCTPURCHASEORDERSTATUS=Payable"
        )
          .then((response) => response.json())
          .then((json) => {
            if (json !== "fail") {
              json = JSON.parse(json);
            } else {
              json = [];
            }
            return {
              type: "UPDATED-OrderProductStatus",
              payload: json,
            };
          })
          .catch((error) => toast.error(error));
      });

  deletePurchaseOrder = (action$) =>
    action$.ofType(GitAction.DeletePurchaseOrder).switchMap(({ payload }) => {
      return fetch(url +
        "Product_DeletePurchaseOrder?PRODUCTPURCHASEORDERID=" +
        payload
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
          } else {
            json = [];
          }
          return {
            type: "DELETED-PURCHASEORDER",
            payload: json,
          };
        })
        .catch((error) => toast.error(error));
    });

  updateProductStatus = (action$) =>
    action$.ofType(GitAction.UpdateProductStatus).switchMap(({ payload }) => {
      return fetch(url +
        "Order_UpdateProductDetailStatus?ORDERPRODUCTDETAILID=" +
        payload.orderProductID +
        "&PRODUCTSTATUS=" +
        payload.productStatus
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
          } else {
            json = [];
          }
          return {
            type: "DELETED-PURCHASEORDER",
            payload: json,
          };
        })
        .catch((error) => toast.error(error));
    });

  //================= PRODUCT CART ================//

  deleteProductCart = (action$) =>
    action$.ofType(GitAction.DeleteProductCart).switchMap(({ payload }) => {
      return fetch(url +
        "Product_DeleteProductCart?USERCARTID=" +
        payload.userCartID
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = json;
            toast.success("Product " + payload.productName + " is removed from cart!");
          } else {
            json = [];
          }
          console.log("DELETE PRODUCT CART", json)
          return fetch(url +
            "Product_ItemListInCartByUserID?USERID=" +
            payload.userID
          )
            .then((response) => response.json())
            .then((json) => {
              if (json !== "fail") {
                json = JSON.parse(json);
              } else {
                json = [];
              }
              return {
                type: "DELETED-PRODUCTCART",
                payload: json,
              };
            })
            .catch((error) => alert("Something went wrong. Error code: Product_ItemListInCartByUserID"));
        })
        .catch((error) => alert("Something went wrong. Error code: Product_DeleteProductCart"));
    });

  updateProductCart = (action$) =>
    action$.ofType(GitAction.UpdateProductCart).switchMap(({ payload }) => {
      return fetch(url +
        "Product_UpdateProductCart?USERCARTID=" +
        payload.userCartID +
        "&PRODUCTQUANTITY=" +
        payload.productQuantity
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
            toast.success("Product " + payload.productName + " quantity is updated in cart!");
          } else {
            json = [];
          }

          return fetch(url +
            "Product_ItemListInCartByUserID?USERID=" +
            payload.userID
          )
            .then((response) => response.json())
            .then((json) => {
              if (json !== "fail") {
                json = JSON.parse(json);
              } else {
                json = [];
              }
              console.log("json in gitepic", json)
              return {
                type: "UPDATED-PRODUCTCART",
                payload: json,
              };
            })
            .catch((error) => alert("Something went wrong. Error code: Product_ItemListInCartByUserID"));
        })
        .catch((error) => alert("Something went wrong. Error code: Product_UpdateProductCart"));
    });


  addProductCart = (action$) =>
    action$.ofType(GitAction.AddProductCart).switchMap(({ payload }) => {
      return fetch(url +
        "Product_AddProductCart?USERID=" +
        payload.userID +
        "&PRODUCTID=" +
        payload.productID +
        "&PRODUCTQUANTITY=" +
        payload.productQuantity +
        "&PRODUCTVARIATIONDETAILID=" +
        payload.productVariationDetailID +
        "&APPLYINGPROMOCODE=" +
        payload.applyingPromoCode
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
            toast.success("Product " + payload.productName + " is added to cart!");
          } else {
            json = [];
          }

          return fetch(url +
            "Product_ItemListInCartByUserID?USERID=" +
            payload.userID
          )
            .then((response) => response.json())
            .then((json) => {
              if (json !== "fail") {
                json = JSON.parse(json);
                console.log("json", json)
              } else {
                json = [];
              }
              return {
                type: "ADDED-PRODUCTCART",
                payload: json,
              };
            })
            .catch((error) => alert("Something went wrong. Error code: Product_ItemListInCartByUserID"));
        })
        .catch((error) => alert("Something went wrong. Error code: Product_AddProductCart"));
    });


  viewProductCartList = (action$) =>
    action$.ofType(GitAction.ViewProductCart).switchMap(({ payload }) => {
      return fetch(url +
        "Product_ItemListInCartByUserID?USERID=" +
        payload.userID
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
          } else {
            json = [];
          }
          return {
            type: "VIEWED-PRODUCTCART",
            payload: json,
          };
        })
        .catch((error) => console.log("error", error));
    });

  //------------------------- PRODUCT WISHLIST ----------------------------

  viewProductWishlist = (action$) =>
    action$.ofType(GitAction.ViewProductWishlist).switchMap(({ payload }) => {


      console.log(url +
        "Product_ItemListInWishlistByUserID?USERID=" +
        payload.userID)
      return fetch(url +
        "Product_ItemListInWishlistByUserID?USERID=" +
        payload.userID
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
          } else {
            json = [];
          }

          console.log("json", json)

          return {
            type: "VIEWED-PRODUCTWISHLIST",
            payload: json,
          };
        })
        .catch((error) => console.log("error", error));
    });

  addProductWishlist = (action$) =>
    action$.ofType(GitAction.AddProductWishlist).switchMap(({ payload }) => {
      return fetch(url +
        "Product_AddProductWishlist?USERID=" +
        payload.userID +
        "&PRODUCTID=" +
        payload.productID
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
            toast.success("Product " + payload.productName + " is added to wishlist!");
          } else {
            json = [];
          }

          return fetch(url +
            "Product_ItemListInWishlistByUserID?USERID=" + payload.userID
          )
            .then((response) => response.json())
            .then((json) => {
              if (json !== "fail") {
                json = JSON.parse(json);
                console.log("json", json)
              } else {
                json = [];
              }
              return {
                type: "ADDED-PRODUCTWISHLIST",
                payload: json,
              };
            })
            .catch((error) => alert("Something went wrong. Error code: Product_ItemListInWishlistByUserID"));
        })
        .catch((error) => alert("Something went wrong. Error code: Product_AddProductWishlist"));
    });

  deleteProductWishlist = (action$) =>
    action$.ofType(GitAction.DeleteProductWishlist).switchMap(({ payload }) => {
      return fetch(url +
        "Product_DeleteProductWishlist?USERWISHLISTID=" +
        payload.userWishlistID
      )
        .then((response) => response.json())
        .then((json) => {
          if (json !== "fail") {
            json = JSON.parse(json);
            toast.success("Product " + payload.productName + " is removed from cart!");
          } else {
            json = [];
          }
          return fetch(url +
            "Product_ItemListInWishlistByUserID?USERID=" + payload.userID
          )
            .then((response) => response.json())
            .then((json) => {
              if (json !== "fail") {
                json = JSON.parse(json);
              } else {
                json = [];
              }
              return {
                type: "DELETED-PRODUCTWISHLIST",
                payload: json,
              };
            })
            .catch((error) => alert("Something went wrong. Error code: Product_ItemListInWishlistByUserID"));
        })
        .catch((error) => alert("Something went wrong. Error code: Product_DeleteProductWishlist"));
    });



}
export let gitEpic = new GitEpic();
