import { Observable } from "rxjs";
import { ActionsObservable } from "redux-observable";
import { GitAction } from "../action/gitAction";
import { toast } from "react-toastify";

const url = "https://myemporia.my/emporiaApi/api/emporia/"
// const url = "http://tourism.denoo.my/emporiaApi/api/emporia/"
// const url = "localhost/emporia/api/emporia/"
export class GitEpic {

  // USER

  getAllUserByTypeId = (action$) =>
    action$.ofType(GitAction.GetUser).switchMap(async () => {
      try {
        const response = await fetch(url +
          "User_ProfileListByUserType?UserTypeID=17"
        );
        let json = await response.json();
        json = JSON.parse(json)
        return {
          type: GitAction.GotUser,
          payload: json,
        };
      } catch (error) {
        alert('getAllUserByTypeId: ' + error);
        return {
          type: GitAction.GotUser,
          payload: [],
        };
      }
    });

  LoginUser = (action$) =>
    action$.ofType(GitAction.Login).switchMap(async ({ payload }) => {
      try {
        const response = await fetch(url +
          "User_Login?username=" +
          payload.username +
          "&password=" +
          payload.password
        );
        let json = await response.json();
        json = JSON.parse(json)
        return {
          type: GitAction.UserLoggedInWithData,
          payload: json,
        };
      } catch (error) {
        alert('LoginUser: ' + error);
        return {
          type: GitAction.UserLoggedInWithData,
          payload: [],
        };
      }
    });


  LogoutUser = action$ =>
    action$.ofType(GitAction.Logout).switchMap(({ payload }) => {
      return fetch(url +
        "Audit_AddUserLogout?USERID=" +
        payload.UserID)
        .then(response => response.json())
        .then(json => {
          if (JSON.parse(json)[0].LoginAuditID !== "undefined") {
            json = json
          } else {
            json = [];
          }
          return {
            type: GitAction.UserLoggedOut,
            payload: JSON.parse(json)
          };
        })
        .catch(error => toast.error("Error code: 8001"));
    });

  RegisterUser = (action$) =>
    action$.ofType(GitAction.Register).switchMap(async ({ payload }) => {
      try {

        const response = await fetch(
          url +
          "User_RegisterSimplified?userEmail=" +
          payload.Email +
          "&password=" +
          payload.Password
        );

        let json = await response.json();
        json = JSON.parse(json);

        if (json[0].ReturnVal !== '0') {
          toast.success("Successfully Registered")
        }

        return {
          type: GitAction.UserRegistered,
          payload: json,
        };
      } catch (error) {
        alert('RegisterUser: ' + error);
        return {
          type: GitAction.UserRegistered,
          payload: [],
        };
      }
    });


  checkUser = (action$) =>
    action$.ofType(GitAction.CheckUser).switchMap(async ({ payload }) => {
      try {
        const response = await fetch(
          url +
          "User_CheckDuplicate?email=" +
          payload.Email
        );
        let json = await response.json();
        json = JSON.parse(json);

        if (json[0].ReturnVal !== '0' && payload.Value !== "forgetPassword") {
          toast.error("This email has been register before. Please try another email.")
        }


        return {
          type: GitAction.CheckedUser,
          payload: json,
        };
      } catch (error) {
        alert('checkUser: ' + error);
        return {
          type: GitAction.CheckedUser,
          payload: [],
        };
      }
    });

  verifyPassword = (action$) =>
    action$.ofType(GitAction.VerifyPassword).switchMap(async ({ payload }) => {
      try {

        const response = await fetch(
          url +
          "User_ValidationByType?USERID=" +
          payload.USERID +
          "&TYPE=" +
          payload.VerifyType +
          "&VALIDATIONFIELD=" +
          payload.password

        );
        let json = await response.json();
        json = JSON.parse(json);
        return {
          type: GitAction.VerifiedPassword,
          payload: json,
        };
      } catch (error) {
        alert('VerifiedPassword: ' + error);
        return {
          type: GitAction.VerifiedPassword,
          payload: [],
        };
      }
    });

  sentOTPVerification = (action$) =>
    action$.ofType(GitAction.SendOTPVerification).switchMap(async ({ payload }) => {
      try {

        const response = await fetch(
          url +
          "User_SentOTPVerification?USERID=" +
          payload.USERID +
          "&TYPE=" +
          payload.GETOTPTYPE +
          "&VALIDATIONFIELD=" +
          payload.UpdatedValue
        );
        let json = await response.json();
        json = JSON.parse(json);
        return {
          type: GitAction.SentOTPVerification,
          payload: json,
        };
      } catch (error) {
        alert('SentOTPVerification: ' + error);
        return {
          type: GitAction.SentOTPVerification,
          payload: [],
        };
      }
    });

  updateContact = (action$) =>
    action$.ofType(GitAction.UpdateContact).switchMap(async ({ payload }) => {
      try {

        const response = await fetch(
          url +
          "User_UpdateProfileSpecificField?USERID=" +
          payload.USERID +
          "&TYPE=" +
          payload.UPDATETYPE +
          "&OTP=" +
          payload.otp +
          "&UPDATEDFIELD=" +
          payload.UpdatedValue

        );
        let json = await response.json();

        json = JSON.parse(json);
        return {
          type: GitAction.UpdatedContact,
          payload: json,
        };
      } catch (error) {
        alert('UpdatedContact: ' + error);
        return {
          type: GitAction.UpdatedContact,
          payload: [],
        };
      }
    });

  updateEmail = (action$) =>
    action$.ofType(GitAction.UpdateEmail).switchMap(async ({ payload }) => {
      try {
        const response = await fetch(
          url +
          "User_UpdateProfileSpecificField?USERID=" +
          payload.USERID +
          "&TYPE=" +
          payload.UPDATETYPE +
          "&OTP=" +
          payload.otp +
          "&UPDATEDFIELD=" +
          payload.UpdatedValue

        );
        let json = await response.json();
        json = JSON.parse(json);
        return {
          type: GitAction.UpdatedEmail,
          payload: json,
        };
      } catch (error) {
        alert('UpdatedContact: ' + error);
        return {
          type: GitAction.UpdatedEmail,
          payload: [],
        };
      }
    });

  updatePassword = (action$) =>
    action$.ofType(GitAction.UpdatePassword).switchMap(async ({ payload }) => {
      try {
        const response = await fetch(
          url +
          "User_UpdateProfileSpecificField?USERID=" +
          payload.USERID +
          "&TYPE=" +
          payload.UPDATETYPE +
          "&OTP=" +
          payload.otp +
          "&UPDATEDFIELD=" +
          payload.UpdatedValue
        );
        let json = await response.json();
        json = JSON.parse(json);
        return {
          type: GitAction.UpdatedPassword,
          payload: json,
        };
      } catch (error) {
        alert('updatePassword: ' + error);
        return {
          type: GitAction.UpdatedPassword,
          payload: [],
        };
      }
    });
  // updatePassword = (action$) =>
  //   action$.ofType(GitAction.UpdatePassword).switchMap(async ({ payload }) => {
  //     try {
  //       const response = await fetch(
  //         url +
  //         "User_UpdatePassword?USERID=" +
  //         payload.userId +
  //         "&USERPREVPASSWORD=" +
  //         payload.oldPassword +
  //         "&USERNEWPASSWORD=" +
  //         payload.newPassword
  //       );
  //       let json = await response.json();
  //       json = JSON.parse(json);
  //       return {
  //         type: GitAction.UpdatedPassword,
  //         payload: json,
  //       };
  //     } catch (error) {
  //       alert('updatePassword: ' + error);
  //       return {
  //         type: GitAction.UpdatedPassword,
  //         payload: [],
  //       };
  //     }
  //   });
  getUserPage = (action$) =>
    action$.ofType(GitAction.GetPages).switchMap(async ({ payload }) => {
      try {
        const response = await fetch(
          url +
          "User_ViewPage?ROLEGROUPID=" +
          payload
        );
        let json = await response.json();
        json = JSON.parse(json);
        return {
          type: GitAction.GotPages,
          payload: json,
        };
      } catch (error) {
        alert('getUserPage: ' + error);
        return {
          type: GitAction.GotPages,
          payload: [],
        };
      }
    });

  getUserProfile = (action$) =>
    action$.ofType(GitAction.GetUserProfile).switchMap(async ({ payload }) => {
      try {
        const response = await fetch(
          url +
          "User_ProfileListByType?TYPE=" + payload.TYPE +
          "&TYPEVALUE=" + payload.TYPEVALUE +
          "&USERID=" + payload.USERID +
          "&UserRoleID=" + payload.USERROLEID +
          "&LISTPERPAGE=" + payload.LISTPERPAGE +
          "&PAGE=" + payload.PAGE
        );
        let json = await response.json();
        json = JSON.parse(json);
        return {
          type: GitAction.GotUserProfile,
          payload: json,
        };
      } catch (error) {
        alert('getUserProfile: ' + error);
        return {
          type: GitAction.GotUserProfile,
          payload: [],
        };
      }
    });

  updateUserProfile = (action$) =>
    action$.ofType(GitAction.EditUserProfile).switchMap(async ({ payload }) => {
      try {

        const response = await fetch(
          url +
          "User_UpdateProfile?USERID=" +
          payload.USERID +
          "&FIRSTNAME=" +
          payload.USERFIRSTNAME +
          "&LASTNAME=" +
          payload.USERLASTNAME +
          "&USERCONTACTNO=" +
          payload.USERCONTACTNO +
          "&USERDOB=" +
          payload.USERDATEBIRTH +
          "&USEREMAIL=" +
          payload.USEREMAIL +
          "&USERGENDER=" +
          payload.USERGENDER
        );
        let json = await response.json();
        if (JSON.parse(json)[0].ReturnVal === 1) {
          toast.success("User Profile is updated successfully");
        }
        try {
          const response_1 = await fetch(
            url +
            "User_ProfileListByType?TYPE=" + payload.TYPE +
            "&TYPEVALUE=" + payload.TYPEVALUE +
            "&USERID=" + payload.USERID +
            "&UserRoleID=" + payload.USERROLEID +
            "&LISTPERPAGE=" + payload.LISTPERPAGE +
            "&PAGE=" + payload.PAGE
          );
          let json_1 = await response_1.json();
          json_1 = JSON.parse(json_1);
          return {
            type: GitAction.EditedUserProfile,
            payload: json_1,
          };
        } catch (error) {
          alert('getUserProfile: ' + error);
          return {
            type: GitAction.GotUserProfile,
            payload: [],
          };
        }
      } catch (error) {
        alert('updateUserProfile: ' + error);
        return {
          type: GitAction.EditedUserProfile,
          payload: [],
        };
      }
    });

  UpdateShopDetail = (action$) =>
    action$.ofType(GitAction.UpdateShopDetail).switchMap(async ({ payload }) => {
      try {
        const response = await fetch(
          url +
          "User_UpdateShopDetail?USERID=" +
          payload.USERID +
          "&SHOPNAME=" +
          payload.SHOPNAME +
          "&SHOPDESC=" +
          payload.SHOPDESC +
          "&SHOPPOSCODE=" +
          payload.SHOPPOSCODE +
          "&SHOPCITY=" +
          payload.SHOPCITY +
          "&SHOPSTATE=" +
          payload.SHOPSTATE +
          "&SHOPCOUNTRYID=" +
          payload.SHOPCOUNTRYID
        );
        let json = await response.json();
        json = JSON.parse(json);
        if (json.map((val) => val.ReturnVal === 1)) {
          toast.success("Upload Successful");
        }
        return {
          type: GitAction.UpdatedShopDetail,
          payload: json,
        };
      } catch (error) {
        alert('UpdatedShopDetail: ' + error);
        return {
          type: GitAction.UpdatedShopDetail,
          payload: [],
        };
      }
    });

  updateProfileImage = (action$) =>
    action$.ofType(GitAction.UpdateProfileImage).switchMap(async ({ payload }) => {
      try {
        const response = await fetch(
          url +
          "User_UserUpdatePhoto?USERID=" +
          payload.USERID +
          "&TYPE=" +
          payload.TYPE +
          "&USERPROFILEIMAGE=" +
          payload.USERPROFILEIMAGE
        );
        let json = await response.json();
        json = JSON.parse(json);

        if (json.map((val) => val.ReturnVal === 1)) {
          toast.success("Upload Successful");
        }
        return {
          type: GitAction.UpdatedProfileImage,
          payload: json,
        };
      } catch (error) {
        alert('updateProfileImage: ' + error);
        return {
          type: GitAction.UpdatedProfileImage,
          payload: [],
        };
      }
    });

  // USER ADDRESS

  ViewAddress = (action$) =>
    action$.ofType(GitAction.GetAddress).switchMap(async ({ payload }) => {
      try {
        const response = await fetch(
          url +
          "User_ViewAddressBook?USERID=" +
          payload.USERID
        );
        let json = await response.json();
        json = JSON.parse(json);
        return {
          type: GitAction.GotAddress,
          payload: json,
        };
      } catch (error) {
        alert('Err code 1901: ' + error);
        return {
          type: GitAction.GotAddress,
          payload: [],
        };
      }
    });

  addAddress = (action$) =>
    action$.ofType(GitAction.AddAddress).switchMap(async ({ payload }) => {
      try {

        const response = await fetch(
          url +
          "User_AddAddressBook?USERADDRESSNAME=" +
          payload.Name +
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
        );
        let json = await response.json();
        json = JSON.parse(json);
        if (json[0].ReturnVal === 1) {
          toast.success("Address successfully added");
        }
        try {
          const response_1 = await fetch(
            url +
            "User_ViewAddressBook?USERID=" +
            payload.USERID
          );
          let json_1 = await response_1.json();
          json_1 = JSON.parse(json_1);


          return {
            type: GitAction.AddedAddress,
            payloadCondition: json,
            payloadValue: json_1,
          };
        } catch (error) {
          alert('Err code 1901: ' + error);
          return {
            type: GitAction.GotAddress,
            payload: [],
          };
        }
      } catch (error) {
        alert('Err code 1902: ' + error);
        return {
          type: GitAction.GotAddress,
          payloadCondition: [],
          payloadValue: [],
        };
      }
    });

  updateAddress = (action$) =>
    action$.ofType(GitAction.UpdateAddress).switchMap(async ({ payload }) => {
      try {


        const response = await fetch(
          url +
          "User_UpdateAddressBook?USERADDRESSBOOKID=" +
          payload.AddressBookNo +
          "&USERADDRESSNAME=" +
          payload.Name +
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
        );
        const json = await response.json();

        if (JSON.parse(json)[0].ReturnVal == 1) {
          toast.success("Address successfully updated");
        }
        try {
          const response_1 = await fetch(
            url +
            "User_ViewAddressBook?USERID=" +
            payload.USERID
          );
          let json_1 = await response_1.json();
          json_1 = JSON.parse(json_1);
          return {
            type: GitAction.UpdatedAddress,
            payloadCondition: json,
            payloadValue: json_1,
          };
        } catch (error) {
          alert('Err code 1901: ' + error);
          return {
            type: GitAction.GotAddress,
            payload: [],
          };
        }
      } catch (error) {
        alert('Err code 1903: ' + error);
        return {
          type: GitAction.UpdatedAddress,
          payloadCondition: [],
          payloadValue: [],
        };
      }
    });

  deleteAddress = (action$) =>
    action$.ofType(GitAction.DeleteAddress).switchMap(async ({ payload }) => {
      try {
        const response = await fetch(
          url +
          "User_DeleteAddressBook?USERADDRESSBOOKID=" +
          payload.AddressBookNo
        );
        const json = await response.json();
        if (JSON.parse(json)[0].ReturnVal == 1) {
          toast.success("Address successfully deleted");
        }
        try {
          const response_1 = await fetch(
            url +
            "User_ViewAddressBook?USERID=" +
            payload.USERID
          );
          let json_1 = await response_1.json();
          json_1 = JSON.parse(json_1);
          return {
            type: GitAction.DeletedAddress,
            payloadCondition: json,
            payloadValue: json_1,
          };
        } catch (error) {
          alert('Err code 1901: ' + error);
          return {
            type: GitAction.GotAddress,
            payload: [],
          };
        }
      } catch (error) {
        alert('Err code 1904: ' + error);
        return {
          type: GitAction.DeletedAddress,
          payloadCondition: [],
          payloadValue: [],
        };
      }
    });

  // PRODUCT CART

  deleteProductCart = (action$) =>
    action$.ofType(GitAction.DeleteProductCart).switchMap(async ({ payload }) => {
      try {
        const response = await fetch(
          url +
          "Product_DeleteProductCart?USERCARTID=" +
          payload.userCartID
        );
        let json = await response.json();
        json = JSON.parse(json);
        if (json[0].ReturnVal !== '1') {
          toast.error("Product " + payload.productName + " is NOT deleted! Please try again.");
        }
        try {
          const response_1 = await fetch(
            url +
            "Product_ItemListInCartByUserID?USERID=" +
            payload.userID
          );
          let json_1 = await response_1.json();
          json_1 = JSON.parse(json_1);
          return {
            type: GitAction.DeletedProductCart,
            payload: json_1,
          };
        } catch (error) {
          alert("viewProductCartList: " + error)
          return {
            type: GitAction.ViewedProductCart,
            payload: [],
          };
        }
      } catch (error) {
        alert("deleteProductCart: " + error)
        return {
          type: GitAction.DeletedProductCart,
          payload: [],
        };
      }
    });

  updateProductCart = (action$) =>
    action$.ofType(GitAction.UpdateProductCart).switchMap(async ({ payload }) => {
      try {
        const response = await fetch(
          url +
          "Product_UpdateProductCart?USERCARTID=" +
          payload.userCartID +
          "&PRODUCTQUANTITY=" +
          payload.productQuantity
        );
        let json = await response.json();
        json = JSON.parse(json);
        if (json[0].ReturnVal !== 1) {
          toast.error("Product " + payload.productName + " is NOT updated! Please try again.");
        }
        try {
          const response_1 = await fetch(
            url +
            "Product_ItemListInCartByUserID?USERID=" +
            payload.userID
          );
          let json_1 = await response_1.json();
          json_1 = JSON.parse(json_1);
          return {
            type: GitAction.UpdatedProductCart,
            payload: json_1,
          };
        } catch (error) {
          alert("viewProductCartList: " + error)
          return {
            type: GitAction.ViewedProductCart,
            payload: [],
          };
        }
      } catch (error) {
        alert("updateProductCart: " + error)
        return {
          type: GitAction.UpdatedProductCart,
          payload: [],
        };
      }
    });

  addProductCart = (action$) =>
    action$.ofType(GitAction.AddProductCart).switchMap(async ({ payload }) => {
      try {
        const response = await fetch(
          url +
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
        );
        let json = await response.json();
        json = JSON.parse(json);
        if (json[0].ReturnVal === 1) {
          toast.success("Product " + payload.productName + " is added to cart!");
        } else {
          toast.error("Product " + payload.productName + " is NOT added to cart! Please try again.");
        }
        try {
          const response_1 = await fetch(
            url +
            "Product_ItemListInCartByUserID?USERID=" +
            payload.userID
          );
          let json_1 = await response_1.json();
          json_1 = JSON.parse(json_1);
          return {
            type: GitAction.AddedProductCart,
            payload: json_1,
          };
        } catch (error) {
          alert("viewProductCartList: " + error)
          return {
            type: GitAction.ViewedProductCart,
            payload: [],
          };
        }
      } catch (error) {
        alert("addProductCart: " + error)
        return {
          type: GitAction.AddedProductCart,
          payload: [],
        };
      }
    });

  viewProductCartList = (action$) =>
    action$.ofType(GitAction.ViewProductCart).switchMap(async ({ payload }) => {
      try {

        const response = await fetch(
          url +
          "Product_ItemListInCartByUserID?USERID=" +
          payload.userID
        );
        let json = await response.json();
        json = JSON.parse(json);

        return {
          type: GitAction.ViewedProductCart,
          payload: json,
        };
      } catch (error) {
        alert("viewProductCartList123: " + error)
        return {
          type: GitAction.ViewedProductCart,
          payload: [],
        };
      }
    });

  // PRODUCT WISHLIST

  viewProductWishlist = (action$) =>
    action$.ofType(GitAction.ViewProductWishlist).switchMap(async ({ payload }) => {

      try {
        const response = await fetch(
          url +
          "Product_ItemListInWishlistByUserID?USERID=" +
          payload.userID
        );
        let json = await response.json();
        json = JSON.parse(json);

        return {
          type: GitAction.ViewedProductWishlist,
          payload: json,
        };
      } catch (error) {
        alert("viewProductWishlist: " + error)
        return {
          type: GitAction.ViewedProductWishlist,
          payload: [],
        };
      }
    });

  addProductWishlist = (action$) =>
    action$.ofType(GitAction.AddProductWishlist).switchMap(async ({ payload }) => {
      try {
        const response = await fetch(
          url +
          "Product_AddProductWishlist?USERID=" +
          payload.userID +
          "&PRODUCTID=" +
          payload.productID
        );
        let json = await response.json();
        json = JSON.parse(json);
        if (json[0].ReturnVal === 1) {
          toast.success("Product " + payload.productName + " is added to wishlist!");
        }
        try {
          const response = await fetch(
            url +
            "Product_ItemListInWishlistByUserID?USERID=" +
            payload.userID
          );
          let json = await response.json();
          json = JSON.parse(json);
          return {
            type: GitAction.AddedProductWishlist,
            payload: json,
          };
        } catch (error) {
          alert("viewProductWishlist: " + error)
          return {
            type: GitAction.ViewedProductWishlist,
            payload: [],
          };
        }
      } catch (error) {
        alert("addProductWishlist: " + error)
        return {
          type: GitAction.AddedProductWishlist,
          payload: [],
        };
      }
    });

  deleteProductWishlist = (action$) =>
    action$.ofType(GitAction.DeleteProductWishlist).switchMap(async ({ payload }) => {
      try {
        const response = await fetch(
          url +
          "Product_DeleteProductWishlist?USERWISHLISTID=" +
          payload.userWishlistID
        );
        let json = await response.json();
        json = JSON.parse(json);
        if (json[0].ReturnVal === 1) {
          toast.success("Product " + payload.productName + " is removed from wishlist!");
        }
        try {
          const response = await fetch(
            url +
            "Product_ItemListInWishlistByUserID?USERID=" +
            payload.userID
          );
          let json = await response.json();
          json = JSON.parse(json);
          return {
            type: GitAction.DeletedProductWishlist,
            payload: json,
          };
        } catch (error) {
          alert("viewProductWishlist: " + error)
          return {
            type: GitAction.ViewedProductWishlist,
            payload: [],
          };
        }
      } catch (error) {
        alert("deleteProductWishlist: " + error)
        return {
          type: GitAction.DeletedProductWishlist,
          payload: [],
        };
      }
    });

  // COUNTRY

  getCountry = (action$) =>
    action$.ofType(GitAction.GetCountry).switchMap(async () => {
      try {
        const response = await fetch(
          url +
          "General_CountryList"
        );
        let json = await response.json();
        json = JSON.parse(json);
        return {
          type: GitAction.GotCountry,
          payload: json,
        };
      } catch (error) {
        alert('getCountry: ' + error);
        return {
          type: GitAction.GotCountry,
          payload: [],
        };
      }
    });

  // All Payment Method
  getAllPaymentMethod = (action$) =>
    action$.ofType(GitAction.GetPaymentMethod).switchMap(async ({ payload }) => {
      try {
        const response = await fetch(
          url +
          "General_ViewPaymentMethod"
        );
        let json = await response.json();
        json = JSON.parse(json);
        return {
          type: GitAction.GotPaymentMethod,
          payload: json,
        };

      } catch (error) {
        alert('getAllPaymentMethod: ' + error);
        return {
          type: GitAction.GotPaymentMethod,
          payload: [],
        };
      }
    });

  // CREDIT CARD

  getAllCreditCard = (action$) =>
    action$.ofType(GitAction.GetCreditCard).switchMap(async ({ payload }) => {
      try {
        const response = await fetch(
          url +
          "User_ViewUserPaymentMethod?USERID=" +
          payload
        );
        let json = await response.json();
        json = JSON.parse(json);
        return {
          type: GitAction.GotCreditCard,
          payload: json,
        };
      } catch (error) {
        alert('getAllCreditCard: ' + error);
        return {
          type: GitAction.GotCreditCard,
          payload: [],
        };
      }
    });

  addCreditCard = (action$) =>
    action$.ofType(GitAction.AddCreditCard).switchMap(async ({ payload }) => {
      try {
        const response = await fetch(
          url +
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
        );
        let json = await response.json();
        json = JSON.parse(json);
        if (json[0].ReturnVal === 1) {
          toast.success("Credit Card successfully added");
        }
        try {
          const response_1 = await fetch(
            url +
            "User_ViewUserPaymentMethod?USERID=" +
            payload.USERID
          );
          let json_1 = await response_1.json();
          json_1 = JSON.parse(json_1);
          return {
            type: GitAction.AddedCreditCard,
            payloadCondition: json,
            payloadValue: json_1,
          };
        } catch (error) {
          alert('getAllCreditCard: ' + error);
          return {
            type: GitAction.AddedCreditCard,
            payloadCondition: [],
            payloadValue: [],
          };
        }
      } catch (error) {
        alert('addCreditCard: ' + error);
        return {
          type: GitAction.GotCreditCard,
          payloadCondition: [],
          payloadValue: [],
        };
      }
    });

  updateCreditCard = (action$) =>
    action$.ofType(GitAction.UpdateCreditCard).switchMap(async ({ payload }) => {
      try {
        const response = await fetch(
          url +
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
        );
        let json = await response.json();
        json = JSON.parse(json);
        if (json[0].ReturnVal === 1) {
          toast.success("Credit Card successfully updated");
        }
        try {
          const response_1 = await fetch(
            url +
            "User_ViewUserPaymentMethod?USERID=" +
            payload.USERID
          );
          let json_1 = await response_1.json();
          json_1 = JSON.parse(json_1);
          return {
            type: GitAction.UpdatedCreditCard,
            payloadCondition: json,
            payloadValue: json_1,
          };
        } catch (error) {
          alert('getAllCreditCard: ' + error);
          return {
            type: GitAction.GotCreditCard,
            payload: [],
          };
        }
      } catch (error) {
        alert('updateCreditCard: ' + error);
        return {
          type: GitAction.UpdatedCreditCard,
          payloadCondition: [],
          payloadValue: [],
        };
      }
    });

  deleteCreditCard = (action$) =>
    action$.ofType(GitAction.DeleteCreditCard).switchMap(async ({ payload }) => {
      try {
        const response = await fetch(
          url +
          "User_DeletePaymentMethod?USERPAYMENTMETHODID=" +
          payload.cardId
        );
        let json = await response.json();
        json = JSON.parse(json);
        if (json[0].ReturnVal === 1) {
          toast.success("Credit Card selected successfully deleted");
        }
        try {
          const response_1 = await fetch(
            url +
            "User_ViewUserPaymentMethod?USERID=" +
            payload.userId
          );
          let json_1 = await response_1.json();
          json_1 = JSON.parse(json_1);

          return {
            type: GitAction.DeletedCreditCard,
            payloadCondition: json,
            payloadValue: json_1,
          };
        } catch (error) {
          alert('getAllCreditCard: ' + error);
          return {
            type: GitAction.GotCreditCard,
            payload: [],
          };
        }
      } catch (error) {
        alert('deleteCreditCard: ' + error);
        return {
          type: GitAction.DeletedCreditCard,
          payloadCondition: [],
          payloadValue: [],
        };
      }
    });

  // PRODUCT

  getAllProducts = (action$) =>
    action$.ofType(GitAction.GetProduct).switchMap(async ({ payload }) => {
      try {

        console.log(url +
          "Product_ItemListByType?Type=" +
          payload.type +
          "&TypeValue=" +
          payload.typeValue +
          "&USERID=" +
          payload.userId +
          "&PRODUCTPERPAGE=" +
          payload.productPage +
          "&PAGE=" +
          payload.page)

        const response = await fetch(
          url +
          "Product_ItemListByType?Type=" +
          payload.type +
          "&TypeValue=" +
          payload.typeValue +
          "&USERID=" +
          payload.userId +
          "&PRODUCTPERPAGE=" +
          payload.productPage +
          "&PAGE=" +
          payload.page
        );
        let json = await response.json();
        json = JSON.parse(json);
        return {
          type: GitAction.GotProduct,
          payload: json,
        };
      } catch (error) {
        alert('getAllProducts: ' + error);
        return {
          type: GitAction.GotProduct,
          payload: [],
        };
      }
    });

  getProductsListing = (action$) =>
    action$.ofType(GitAction.GetProductListing).switchMap(async ({ payload }) => {
      try {


        const response = await fetch(
          url +
          "Product_ItemListByType?Type=" +
          payload.type +
          "&TypeValue=" +
          payload.typeValue +
          "&USERID=" +
          payload.userId +
          "&PRODUCTPERPAGE=" +
          payload.productPage +
          "&PAGE=" +
          payload.page
        );
        const json = await response.json();
        return {
          type: GitAction.GotProductListing,
          payload: json,
        };
      } catch (error) {
        alert('getProductsListing: ' + error);
        return {
          type: GitAction.GotProductListing,
          payload: [],
        };
      }
    });

  getProductDetail = (action$) =>
    action$.ofType(GitAction.GetProductDetail).switchMap(async ({ payload }) => {

      try {
        const response = await fetch(
          url +
          "Product_ItemDetailByProductID?ProductID=" +
          payload.productId +
          "&USERID=" +
          payload.userId
        );
        let json = await response.json();
        json = JSON.parse(json);
        return {
          type: GitAction.GotProductDetail,
          payload: json,
        };
      } catch (error) {
        alert('getProductDetail: ' + error);
        return {
          type: GitAction.GotProductDetail,
          payload: [],
        };
      }
    });

  getAllProductsByStatus = (action$) =>
    action$.ofType(GitAction.GetProductByProductStatus).switchMap(async ({ payload }) => {

      try {
        const response = await fetch(
          url +
          "Product_ItemListByProductStatus?PRODUCTSTATUS=" +
          payload.ProductStatus +
          "&USERID=" +
          payload.UserID
        );
        let json = await response.json();
        json = json;
        return {
          type: GitAction.GotProductByProductStatus,
          payload: json,
        };
      } catch (error) {
        alert('getAllProductsByStatus: ' + error);
        return {
          type: GitAction.GotProductByProductStatus,
          payload: [],
        };
      }
    });

  addProduct = (action$) =>
    action$.ofType(GitAction.AddProduct).switchMap(async ({ payload }) => {
      try {
        const response = await fetch(
          url +
          "Product_AddProduct?PRODUCTNAME=" +
          payload.name +
          "&PRODUCTDESC=" +
          payload.description +
          "&PRODUCTCATEGORYID=" +
          payload.productCategory +
          "&MERCHANTID=" +
          payload.productSupplier +
          "&PRODUCTHEIGHT=" +
          payload.height +
          "&PRODUCTWIDTH=" +
          payload.width +
          "&PRODUCTDEPTH=" +
          payload.depth +
          "&PRODUCTWEIGHT=" +
          payload.weight +
          "&PRODUCTSKU=" +
          payload.sku +
          "&PRODUCTBRAND=" +
          payload.brand +
          "&PRODUCTMODEL=" +
          payload.model +
          "&PRODUCTTAG=" +
          payload.tags
        );
        let json = await response.json();
        json = JSON.parse(json);
        return {
          type: GitAction.AddedProduct,
          payload: json,
        };
      } catch (error) {
        alert('addProduct: ' + error);
        return {
          type: GitAction.AddedProduct,
          payload: [],
        };
      }
    });

  updateProduct = (action$) =>
    action$.ofType(GitAction.UpdateProduct).switchMap(async ({ payload }) => {
      console.log(
        url +
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
      try {

        const response = await fetch(
          url +
          "Product_UpdateProduct?PRODUCTID=" +
          payload.ProductID +
          "&name=" +
          payload.name +
          "&manufacturer=1" +
          // payload.manufacturer +
          "&description=" +
          payload.description +
          "&productCategory=" +
          payload.productCategory +
          "&productSupplier=" +
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
        );
        let json = await response.json();
        json = JSON.parse(json);

        if (json[0].ReturnVal === 1) {
          toast.success("Product is successfully submitted to Admin for endorsement. Estimated 3 - 5 days for admin to revise your added product.")
        } else {
          json = [];
        }
        return {
          type: GitAction.UpdatedProduct,
          payload: json,
        };
      } catch (error) {
        alert('updateProduct: ' + error);
        return {
          type: GitAction.UpdatedProduct,
          payload: [],
        };
      }
    });

  deleteProduct = (action$) =>
    action$.ofType(GitAction.DeleteProduct).switchMap(async ({ payload }) => {
      try {
        const response = await fetch(
          url +
          "Product_DeleteProducts?ProductIDs=" +
          payload
        );
        let json = await response.json();
        json = JSON.parse(json);
        return {
          type: GitAction.DeletedProduct,
          payload: json,
        };
      } catch (error) {
        alert('deleteProduct: ' + error);
        return {
          type: GitAction.DeletedProduct,
          payload: [],
        };
      }
    });

  endorseProduct = (action$) =>
    action$.ofType(GitAction.EndorseProduct).switchMap(async ({ payload }) => {
      try {
        const response = await fetch(url + "Product_EndorseProducts?ProductIDs=" + payload);
        let json = await response.json();
        json = JSON.parse(json);
        return {
          type: GitAction.ProductEndorsed,
          payload: json,
        };
      } catch (error) {
        alert('endorseProduct: ' + error);
        return {
          type: GitAction.ProductEndorsed,
          payload: [],
        };
      }
    });

  checkProduct = (action$) =>
    action$.ofType(GitAction.CheckProduct).switchMap(async ({ payload }) => {
      try {
        const resposne = await fetch(
          url +
          "Product_CheckDuplication?PRODUCTNAME=" +
          payload
        );
        const json = await resposne.json();
        if (json !== "fail") {
          json = JSON.parse(json);
        } else {
          json = [];
        }
        return {
          type: GitAction.ProductChecked,
          payload: json,
        };
      } catch (error) {
        alert('checkProduct: ' + error);
        return {
          type: GitAction.ProductChecked,
          payload: [],
        };
      }
    });

  AddProductMedia = (action$) =>
    action$.ofType(GitAction.AddProductMedia).switchMap(async ({ payload }) => {
      try {
        const resposne = await fetch(
          url +
          "Product_AddProductMedia?" +
          "PRODUCTID=" + payload.ProductID +
          "&PRODUCTVARIATIONDETAILID=" + payload.variationID +
          "&PRODUCTSLIDEORDER=" + payload.sliderOrder +
          "&TYPE=" + payload.mediaType +
          "&WIDTH=" + payload.imageWidth +
          "&HEIGHT=" + payload.imageHeight +
          "&IMAGENAME=" + payload.imageName
        );
        let json = await resposne.json();
        json = JSON.parse(json);
        return {
          type: GitAction.ProductMediaAdded,
          payload: json,
        };
      } catch (error) {
        alert('AddProductMedia: ' + error);
        return {
          type: GitAction.ProductMediaAdded,
          payload: [],
        };
      }
    });

  // PRODUCT VARIATION DETAIL

  addProductVariationDetail = (action$) =>
    action$.ofType(GitAction.AddProductVariationDetail).switchMap(async ({ payload }) => {
      try {
        const response = await fetch(
          url +
          "Product_AddProductVariationDetail?PRODUCTVARIATIONID=" + payload.ProductVariation +
          "&PRODUCTID=" + payload.ProductID +
          "&CUSTOMIZABLE=" + payload.Customizable +
          "&VALUE=" + payload.Value +
          "&PRODUCTSTOCK=" + payload.stock +
          "&PRODUCTVARIATIONSKU=" + payload.sku +
          "&PRODUCTVARIATIONPRICE=" + payload.price
        );
        let json = await response.json();
        json = JSON.parse(json);

        return {
          type: GitAction.AddedProductVariationDetail,
          payload: json,
        };
      } catch (error) {
        alert('addProductVariationDetail: ' + error);
        return {
          type: GitAction.AddedProductVariationDetail,
          payload: [],
        };
      }
    });

  deleteProductVariationDetail = (action$) =>
    action$.ofType(GitAction.DeleteProductVariationDetail).switchMap(async ({ payload }) => {
      try {
        const response = await fetch(
          url +
          "Product_DeleteProductVariationDetail?PRODUCTVARIATIONDETAILID=" + payload.ProductVariationDetailID
        );
        let json = await response.json();
        json = JSON.parse(json);
        return {
          type: GitAction.DeletedProductVariationDetail,
          payload: json,
        };
      } catch (error) {
        alert('deleteProductVariationDetail: ' + error);
        return {
          type: GitAction.DeletedProductVariationDetail,
          payload: [],
        };
      }
    });

  addProductSpecsDetail = (action$) =>
    action$.ofType(GitAction.AddProductSpecsDetail).switchMap(async ({ payload }) => {
      try {
        const response = await fetch(
          url +
          "Product_AddProductSpecificationDetail?PRODUCTVARIATIONID=" +
          payload.ProductVariation +
          "&PRODUCTID=" +
          payload.ProductID +
          "&PRODUCTSPECIFICATIONVALUE=" +
          payload.value
        );
        let json = await response.json();
        json = JSON.parse(json);

        return {
          type: GitAction.AddedProductSpecsDetail,
          payload: json,
        };
      } catch (error) {
        alert('addProductSpecsDetail: ' + error);
        return {
          type: GitAction.AddedProductSpecsDetail,
          payload: [],
        };
      }
    });

  deleteProductSpecsDetail = (action$) =>
    action$.ofType(GitAction.DeleteProductSpecsDetail).switchMap(async ({ payload }) => {
      try {
        console.log(url +
          "Product_DeleteProductSpecificationDetail?PRODUCTSPECIFICATIONDETAILID=" +
          payload)
        const response = await fetch(
          url +
          "Product_DeleteProductSpecificationDetail?PRODUCTSPECIFICATIONDETAILID=" +
          payload
        );
        let json = await response.json();
        json = JSON.parse(json);

        return {
          type: GitAction.DeletedProductSpecsDetail,
          payload: json,
        };
      } catch (error) {
        alert('DeleteProductSpecsDetail: ' + error);
        return {
          type: GitAction.DeletedProductSpecsDetail,
          payload: [],
        };
      }
    });

  // PRODUCT VARIATION

  getAllProductVariation = (action$) =>
    action$.ofType(GitAction.GetProductVariation).switchMap(async () => {
      try {
        const response = await fetch(
          url +
          "Product_ViewProductVariation"
        );
        let json = await response.json();
        json = JSON.parse(json);
        return {
          type: GitAction.GotProductVariation,
          payload: json,
        };
      } catch (error) {
        alert('getAllProductVariation: ' + error);
        return {
          type: GitAction.GotProductVariation,
          payload: [],
        };
      }
    });

  getAllProductVariationByCategoryID = (action$) =>
    action$.ofType(GitAction.GetProductVariationByCategoryID).switchMap(async ({ payload }) => {
      try {
        const response = await fetch(
          url + "Product_ViewProductVariationByCategoryID?PRODUCTCATEGORYID=" + payload
        );
        let json = await response.json();
        json = JSON.parse(json);
        return {
          type: GitAction.GotProductVariationByCategoryID,
          payload: json,
        };
      } catch (error) {
        alert('getAllProductVariationByCategoryID: ' + error);
        return {
          type: GitAction.GotProductVariationByCategoryID,
          payload: [],
        };
      }
    });

  addProductVariation = (action$) => action$.ofType(GitAction.AddProductVariation).switchMap(async ({ payload }) => {
    try {
      const response = await fetch(
        url +
        "Product_AddProductVariation?PRODUCTVARIATION=" +
        payload.ProductVariation +
        "&PRODUCTCATEGORYID=" +
        payload.ProductCategoryID +
        "&CUSTOMIZABLE=" +
        payload.CustomizableIndicator
      );
      const json = await response.json();
      if (json !== "fail") {
        json = JSON.parse(json);
      } else {
        json = [];
      }
      return {
        type: GitAction.AddedProductVariation,
        payload: json,
      };
    } catch (error) {
      alert('addProductVariation: ' + error);
      return {
        type: GitAction.AddedProductVariation,
        payload: [],
      };
    }
  });

  updateProductVariation = (action$) => action$.ofType(GitAction.UpdateProductVariation).switchMap(async ({ payload }) => {
    try {
      const response = await fetch(
        url +
        "Product_UpdateProductVariation?PRODUCTVARIATIONID=" +
        payload.ProductVariationID +
        "&PRODUCTVARIATION=" +
        payload.ProductVariation +
        "&PRODUCTCATEGORYID=" +
        payload.ProductCategoryID +
        "&CUSTOMIZABLE=" +
        payload.Customizable
      );
      let json = await response.json();
      json = JSON.parse(json);
      return {
        type: GitAction.UpdatedProductVariation,
        payload: json,
      };
    } catch (error) {
      alert('updateProductVariation: ' + error);
      return {
        type: GitAction.UpdatedProductVariation,
        payload: [],
      };
    }
  });

  deleteProductVariation = (action$) => action$.ofType(GitAction.DeleteProductVariation).switchMap(async ({ payload }) => {
    try {
      const response = await fetch(url + "Product_DeleteProductVariation?PRODUCTVARIATIONID=" + payload.ProductVariationID
      );
      let json = await response.json();
      json = JSON.parse(json);
      if (json !== "fail") {
      } else {
        json = [];
      }
      return {
        type: GitAction.DeletedProductVariation,
        payload: json,
      };
    } catch (error) {
      alert('deleteProductVariation: ' + error);
      return {
        type: GitAction.DeletedProductVariation,
        payload: [],
      };
    }
  });

  addProductPurchaseOrder = (action$) =>
    action$.ofType(GitAction.AddProductPurchaseOrder).switchMap(async ({ payload }) => {
      try {
        const response = await fetch(
          url +
          "Product_AddPurchaseOrder?PRODUCTIDS=" +
          payload.ProductID +
          "&PRODUCTQUANTITYS=" +
          payload.ProductStock +
          "&SUPPLIERID=" +
          payload.SupplierID
        );
        let json = await response.json();
        json = JSON.parse(json);
        return {
          type: GitAction.AddedProductPurchaseOrder,
          payload: json,
        };
      } catch (error) {
        alert('addProductPurchaseOrder: ' + error);
        return {
          type: GitAction.AddedProductPurchaseOrder,
          payload: [],
        };
      }
    });



  // PRODUCT CATEGORY

  getAllCategories = (action$) =>
    action$.ofType(GitAction.GetProductCategory).switchMap(async () => {
      try {
        const response = await fetch(url +
          "Product_CategoryListByAll"
        );
        let json = await response.json();
        json = JSON.parse(json);
        return {
          type: GitAction.GotProductCategory,
          payload: json,
        };
      } catch (error) {
        alert('getAllCategories: ' + error);
        return {
          type: GitAction.GotProductCategory,
          payload: [],
        };
      }
    });

  getAllCategoriesListing = (action$) =>
    action$.ofType(GitAction.GetProductCategoryListing).switchMap(async () => {

      try {
        const response = await fetch(
          url +
          "Product_CategoryListing"
        );
        let json = await response.json();
        json = JSON.parse(json);
        return {
          type: GitAction.GotProductCategoryListing,
          payload: json,
        };
      } catch (error) {
        alert('getAllCategoriesListing: ' + error);
        return {
          type: GitAction.GotProductCategoryListing,
          payload: [],
        };
      }
    });

  addProductCategory = (action$) =>
    action$.ofType(GitAction.AddProductCategory).switchMap(async ({ payload }) => {
      try {
        const response = await fetch(
          url +
          "Product_AddProductCategory?PRODUCTCATEGORY=" +
          payload.ProductCategory +
          "&PRODUCTCATEGORYIMAGE=" +
          payload.ProductCategoryImage +
          "&HIERARCHYID=" +
          payload.HierarchyID +
          "&PARENTPRODUCTCATEGORYID=" +
          payload.ParentProductCategoryID
        );
        let json = await response.json();
        json = JSON.parse(json);
        return {
          type: GitAction.AddedProductCategory,
          payload: json,
        };
      } catch (error) {
        alert('addProductCategory: ' + error);
        return {
          type: GitAction.AddedProductCategory,
          payload: [],
        };
      }
    });

  updateProductCategory = (action$) =>
    action$.ofType(GitAction.UpdateProductCategory).switchMap(async ({ payload }) => {
      try {
        const response = await fetch(
          url +
          "Product_UpdateProductCategory?PRODUCTCATEGORYID=" +
          payload.ProductCategoryID +
          "&PRODUCTCATEGORY=" +
          payload.ProductCategory
        );
        let json = await response.json();
        json = JSON.parse(json);
        return {
          type: GitAction.UpdatedProductCategory,
          payload: json,
        };
      } catch (error) {
        alert('updateProductCategory: ' + error);
        return {
          type: GitAction.UpdatedProductCategory,
          payload: [],
        };
      }
    });

  deleteProductCategory = (action$) =>
    action$.ofType(GitAction.DeleteProductCategory).switchMap(async ({ payload }) => {
      try {
        const response = await fetch(
          url +
          "Product_DeleteProductCategory?PRODUCTCATEGORYID=" +
          payload
        );
        let json = await response.json();
        json = JSON.parse(json);
        return {
          type: GitAction.DeletedProductCategory,
          payload: json,
        };
      } catch (error) {
        alert('deleteProductCategory: ' + error);
        return {
          type: GitAction.DeletedProductCategory,
          payload: [],
        };
      }
    });

  // NOTIFICATION

  getNotification = (action$) =>
    action$.ofType(GitAction.GetNotification).switchMap(async ({ payload }) => {
      try {
        const response = await fetch(
          url +
          "User_ViewNotification?UserID=" +
          payload
        );
        let json = await response.json();
        json = JSON.parse(json);
        return {
          type: GitAction.GotNotification,
          payload: json,
        };
      } catch (error) {
        alert('getNotification: ' + error);
        return {
          type: GitAction.GotNotification,
          payload: [],
        };
      }
    });

  // SUPPLIER

  getAllSupplierByUserStatus = (action$) =>
    action$.ofType(GitAction.GetSupplierByUserStatus).switchMap(async ({ payload }) => {
      try {
        const response = await fetch(
          url +
          "User_ProfileListByUserStatus?UserStatus=" +
          payload +
          "&UserRoleID=15"
        );
        let json = await response.json();
        json = JSON.parse(json);
        if (json !== "fail") {
        } else {
          json = [];
        }
        return {
          type: GitAction.GotSupplierByUserStatus,
          payload: json,
        };
      } catch (error) {
        alert('getAllSupplierByUserStatus: ' + error);
        return {
          type: GitAction.GotSupplierByUserStatus,
          payload: [],
        };
      }
    });

  registerSupplier = (action$) =>
    action$.ofType(GitAction.RegisterSupplier).switchMap(async ({ payload }) => {
      try {
        const response = await fetch(
          url +
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
        );
        let json = await response.json();
        json = JSON.parse(json);
        return {
          type: GitAction.RegisteredSupplier,
          payload: json,
        };
      } catch (error) {
        alert('registerSupplier: ' + error);
        return {
          type: GitAction.RegisteredSupplier,
          payload: [],
        };
      }
    });

  endorseSupplier = (action$) =>
    action$.ofType(GitAction.EndorseSupplier).switchMap(async ({ payload }) => {
      try {
        const response = await fetch(
          url +
          "User_EndorseSupplier?USERIDS=" +
          payload.selectedData +
          "&USERSTATUS=" +
          payload.status
        );
        let json = await response.json();
        json = JSON.parse(json);
        return {
          type: GitAction.EndorsedSupplier,
          payload: json,
        };
      } catch (error) {
        alert('endorseSupplier: ' + error);
        return {
          type: GitAction.EndorsedSupplier,
          payload: [],
        };
      }
    });

  // REVIEW

  viewProductReviewByProductID = (action$) =>
    action$.ofType(GitAction.GetProductReviewByProductID).switchMap(async ({ payload }) => {
      try {
        const response = await fetch(
          url +
          "Product_ViewReviewByProductID?PRODUCTID=" +
          payload.ProductID +
          "&PARENTPRODUCTREVIEWID=" +
          payload.ParentProductReviewID
        );
        let json = await response.json();
        return {
          type: GitAction.GotProductReviewByProductID,
          payload: json,
        };
      } catch (error) {
        alert('viewProductReviewByProductID: ' + error);
        return {
          type: GitAction.GotProductReviewByProductID,
          payload: [],
        };
      }
    });

  viewProductReview = (action$) =>
    action$.ofType(GitAction.GetProductReview).switchMap(async ({ payload }) => {
      try {

        console.log(url +
          "Product_ViewProductReview?USERID=" +
          payload.UserID)
        const response = await fetch(
          url +
          "Product_ViewProductReview?USERID=" +
          payload.UserID
        );
        let json = await response.json();
        json = JSON.parse(json);
        return {
          type: GitAction.GotProductReview,
          payload: json,
        };
      } catch (error) {
        alert('viewProductReview: ' + error);
        return {
          type: GitAction.GotProductReview,
          payload: [],
        };
      }
    });

  addProductReview = (action$) =>
    action$.ofType(GitAction.addProductReview).switchMap(async ({ payload }) => {
      try {
        const response = await fetch(
          url +
          "Product_AddReview?PARENTPRODUCTREVIEWID=" +
          payload.parentProductReviewID
          + "&PRODUCTID=" +
          payload.productID
          + "&USERID=" +
          payload.UserID
          + "&PRODUCTREVIEWRATING=" +
          payload.productReviewRating
          + "&PRODUCTREVIEWCOMMENT=" +
          payload.productReviewComment
        );
        let json = await response.json();
        json = JSON.parse(json);
        if (json[0].ReturnVal === 1) {
          toast.success("Sucessfully added a product review");
        }
        try {
          const response_1 = await fetch(
            url +
            "Product_ViewReviewByProductID?PRODUCTID=" +
            payload.productID +
            "&PARENTPRODUCTREVIEWID=0"
          );
          let json_1 = await response_1.json();
          return {
            type: GitAction.addedProductReview,
            payload: json_1,
            payload2: json,
          };
        } catch (error) {
          alert('viewProductReviewByProductID: ' + error);
          return {
            type: GitAction.addedProductReview,
            payload: [],
          };
        }
      } catch (error) {
        alert('addProductReview: ' + error);
        return {
          type: GitAction.addedProductReview,
          payload: [],
        };
      }
    });

  // ORDER

  AddOrder = (action$) =>
    action$.ofType(GitAction.AddOrder).switchMap(async ({ payload }) => {

      try {

        const response = await fetch(
          url +
          "Order_AddOrder?USERID=" +
          payload.UserID +
          "&USERADDRESSID=" +
          payload.UserAddressID +
          "&PROMOTIONID=0&PROMOTIONCODEID=0&PAYMENTMETHODID=" +
          payload.PaymentMethodID +
          "&USERPAYMENTMETHODID=" +
          payload.UserPaymentMethodID +
          "&ORDERTOTALAMOUNT=" +
          payload.OrderTotalAmount +
          "&ORDERPAIDAMOUNT=" +
          payload.OrderPaidAmount +
          "&PRODUCTID=" +
          payload.ProductID +
          "&PRODUCTQUANTITY=" +
          payload.ProductQuantity +
          "&PRODUCTVARIATIONDETAILID=" +
          payload.ProductVariationDetailID +
          "&TRACKINGSTATUSID=" +
          payload.TrackingStatusID
        );
        let json = await response.json();
        json = JSON.parse(json);
        if (json[0].ReturnVal === 1) {
          toast.success("Order is successfully created ORDERID : " + json[0].OrderID);
        }
        try {
          const response_1 = await fetch(
            url +
            "Product_DeleteProductCart?USERCARTID=" +
            payload.UserCartID
          );
          let json_1 = await response_1.json();
          json_1 = json_1
          return {
            type: GitAction.AddedOrder,
            payload: json,
          };
        } catch (error) {
          alert('deleteProductCart: ' + error);
          return {
            type: GitAction.AddedOrder,
            payload: [],
          };
        }
      }
      catch (error) {
        alert('deleteProductCart: ' + error);
        return {
          type: GitAction.AddedOrder,
          payload: [],
        };
      }
    });

  // DELIVERY

  getDeliverableList = (action$) =>
    action$.ofType(GitAction.GetDeliverableList).switchMap(async () => {
      try {
        const response = await fetch(
          url +
          "Order_ViewOrderByIncomplete"
        );
        let json = await response.json();
        json = JSON.parse(json);
        return {
          type: GitAction.GotDeliverableList,
          payload: json,
        };
      } catch (error) {
        alert('getDeliverableList: ' + error);
        return {
          type: GitAction.GotDeliverableList,
          payload: [],
        };
      }
    });

  getOrderListByID = (action$) =>
    action$.ofType(GitAction.GetOrderListByOrderID).switchMap(async ({ payload }) => {
      try {
        const response = await fetch(
          url +
          "Order_ViewOrderByOrderID?ORDERID=" +
          payload.OrderID
        );
        let json = await response.json();
        json = JSON.parse(json);
        return {
          type: GitAction.GotOrderListByOrderID,
          payload: json,
        };
      } catch (error) {
        alert('getOrderListByID: ' + error);
        return {
          type: GitAction.GotOrderListByOrderID,
          payload: [],
        };
      }
    });

  // PROMOTION

  getAllPromotion = (action$) =>
    action$.ofType(GitAction.GetPromotion).switchMap(async () => {
      try {
        const response = await fetch(url +
          "Promo_ViewPromotion?ACTIVEIND"
        );
        let json = await response.json();
        json = JSON.parse(json);
        return {
          type: GitAction.GotPromotion,
          payload: json,
        };
      } catch (error) {
        alert('getAllPromotion: ' + error);
        return {
          type: GitAction.GotPromotion,
          payload: [],
        };
      }
    });

  AddPromotion = (action$) =>
    action$.ofType(GitAction.AddPromotion).switchMap(async ({ payload }) => {
      try {
        const response = await fetch(
          url +
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
        );
        let json = await response.json();
        json = JSON.parse(json);
        return {
          type: GitAction.AddedPromotion,
          payload: json,
        };
      } catch (error) {
        alert('AddPromotion: ' + error);
        return {
          type: GitAction.AddedPromotion,
          payload: []
        };
      }
    });

  UpdatePromotion = (action$) =>
    action$.ofType(GitAction.UpdatePromotion).switchMap(async ({ payload }) => {
      try {
        const response = await fetch(url +
          "Promo_UpdatePromotion?PROMOTIONID=" +
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
        );
        let json = await response.json();
        json = JSON.parse(json);
        return {
          type: GitAction.UpdatedPromotion,
          payload: json,
        };
      } catch (error) {
        alert('UpdatePromotion: ' + error);
        return {
          type: GitAction.UpdatedPromotion,
          payload: []
        };
      }
    });

  DeletePromotion = (action$) =>
    action$.ofType(GitAction.DeletePromotion).switchMap(async ({ payload }) => {
      try {
        const response = await fetch(
          url +
          "Promo_DeletePromotion?PROMOTIONID=" +
          payload
        );
        let json = await response.json();
        json = JSON.parse(json);
        return {
          type: GitAction.DeletedPromotion,
          payload: json,
        };
      } catch (error) {
        alert('DeletePromotion: ' + error);
        return {
          type: GitAction.DeletedPromotion,
          payload: []
        };
      }
    });

  getAllProductPromos = (action$) =>
    action$.ofType(GitAction.GetPromo).switchMap(async () => {
      try {
        const response = await fetch(
          url +
          "Promo_ViewPromotion?ACTIVEIND=0"
        );
        let json = await response.json();
        json = JSON.parse(json);
        return {
          type: GitAction.GotPromo,
          payload: json,
        };
      } catch (error) {
        alert('getAllProductPromos: ' + error);
        return {
          type: GitAction.GotPromo,
          payload: []
        };
      }
    });

  getAllPromoCodes = (action$) =>
    action$.ofType(GitAction.GetPromoCode).switchMap(async () => {
      try {
        const response = await fetch(url +
          "Promo_ViewPromoCode?ACTIVEIND=0"
        );
        let json = await response.json();
        json = JSON.parse(json);
        return {
          type: GitAction.GotPromoCode,
          payload: json,
        };
      } catch (error) {
        alert('getAllPromoCodes: ' + error);
        return {
          type: GitAction.GotPromoCode,
          payload: []
        };
      }
    });

  addPromoCode = (action$) =>
    action$.ofType(GitAction.AddPromoCode).switchMap(async ({ payload }) => {
      try {
        const response = await fetch(
          url +
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
        );
        let json = await response.json();
        json = JSON.parse(json);
        return {
          type: GitAction.AddedPromoCode,
          payload: json,
        };
      } catch (error) {
        alert('addPromoCode: ' + error);
        return {
          type: GitAction.AddedPromoCode,
          payload: []
        };
      }
    });

  updatePromoCode = (action$) =>
    action$.ofType(GitAction.UpdatePromoCode).switchMap(async ({ payload }) => {
      try {
        const response = await fetch(
          url +
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
        );
        let json = await response.json();
        json = JSON.parse(json);
        return {
          type: GitAction.UpdatedPromoCode,
          payload: json,
        };
      } catch (error) {
        alert('updatePromoCode: ' + error);
        return {
          type: GitAction.UpdatedPromoCode,
          payload: []
        };
      }
    });

  deletePromoCode = (action$) =>
    action$.ofType(GitAction.DeletePromoCode).switchMap(async ({ payload }) => {
      try {
        const response = await fetch(
          url +
          "Promo_DeletePromoCode?PROMOCODEID=" +
          payload
        );
        let json = await response.json();
        json = JSON.parse(json);
        return {
          type: GitAction.DeletedPromoCode,
          payload: json,
        };
      } catch (error) {
        alert('deletePromoCode: ' + error);
        return {
          type: GitAction.DeletedPromoCode,
          payload: []
        };
      }
    });

  // TRANSACTION

  getAllTransactions = (action$) =>
    action$.ofType(GitAction.GetTransactions).switchMap(async ({ payload }) => {

      try {
        const response = await fetch(
          url +
          "Order_ViewOrder?TRACKINGSTATUS=" +
          payload
        );
        let json = await response.json();
        json = JSON.parse(json);
        return {
          type: GitAction.GotTransactions,
          payload: json,
        };
      } catch (error) {
        alert('getAllTransactions: ' + error);
        return {
          type: GitAction.GotTransactions,
          payload: []
        };
      }
    });

  getAllDeliveryList = (action$) =>
    action$.ofType(GitAction.GetTransactionsWithDelivery).switchMap(async () => {
      try {
        const response = await fetch(
          url +
          "Order_ViewOrderByDelivery"
        );
        let json = await response.json();
        json = JSON.parse(json);
        return {
          type: GitAction.GotTransactionsWithDelivery,
          payload: json,
        };
      } catch (error) {
        alert('getAllDeliveryList: ' + error);
        return {
          type: GitAction.GotTransactionsWithDelivery,
          payload: []
        };
      }
    });

  getAllTransactionStatus = (action$) =>
    action$.ofType(GitAction.GetTransactionStatus).switchMap(async () => {
      try {
        const response = await fetch(
          url +
          "Order_ViewOrderStatus"
        );
        let json = await response.json();
        json = JSON.parse(json);
        return {
          type: GitAction.GotTransactionStatus,
          payload: json,
        };
      } catch (error) {
        alert('getAllTransactionStatus: ' + error);
        return {
          type: GitAction.GotTransactionStatus,
          payload: []
        };
      }
    });

  // INVENTORY

  updateProductStock = (action$) =>
    action$.ofType(GitAction.UpdateInventory).switchMap(async ({ payload }) => {
      try {
        const response = await fetch(
          url +
          "Inventory_UpdateProductStock?PRODUCTIDS=" +
          payload.SelectedProductID +
          "&PRODUCTSTOCK=" +
          payload.SelectedProductStock
        )
        let json = await response.json()
        json = JSON.parse(json)
        try {
          const response = await fetch(
            url +
            "Product_ItemListByProductStatus?PRODUCTSTATUS=" +
            payload.ProductStatus +
            "&USERID=" +
            payload.UserID
          );
          let json = await response.json();
          json = JSON.parse(json);
          return {
            type: GitAction.UpdatedInventory,
            payload: json,
          };
        } catch (error) {
          alert('getAllProductsByStatus: ' + error);
          return {
            type: GitAction.GotProductByProductStatus,
            payload: [],
          };
        }
      } catch (error) {
        alert('updateProductStock: ' + error);
        return {
          type: GitAction.UpdatedInventory,
          payload: []
        };
      }
    });

  // EMAIL SUBSCRIBE

  getAllSubs = (action$) =>
    action$.ofType(GitAction.GetSubs).switchMap(async () => {
      try {
        const response = await fetch(
          url +
          "Subcriber_ViewSubcriber"
        );
        let json = await response.json();
        json = JSON.parse(json);
        return {
          type: GitAction.GotSubs,
          payload: json,
        };
      } catch (error) {
        alert('getAllSubs: ' + error);
        return {
          type: GitAction.GotSubs,
          payload: []
        };
      }
    });

  AddSubs = (action$) =>
    action$.ofType(GitAction.AddSubcs).switchMap(async ({ payload }) => {
      try {
        const response = await fetch(
          url +
          "Subcriber_AddNew?SUBSCRIBEREMAIL=" +
          payload.SubsMail
        );
        const json = await response.json();
        json = JSON.parse(json);
        return {
          type: GitAction.AddedSubcs,
          payload: json,
        };
      } catch (error) {
        alert('AddSubs: ' + error);
        return {
          type: GitAction.AddedSubcs,
          payload: []
        };
      }
    });


  getAllMerchants = (action$) =>
    action$.ofType(GitAction.GetMerchants).switchMap(async ({ payload }) => {
      try {
        const response = await fetch(
          url + "User_ProfileListByType?TYPE=" + payload.type +
          "&TYPEVALUE=" + payload.typeValue +
          "&USERID=" + payload.USERID +
          "&UserRoleID=" + payload.userRoleID +
          "&LISTPERPAGE=" + payload.productPage +
          "&PAGE=" + payload.page
        );
        let json = await response.json();
        json = JSON.parse(json);
        if (json !== "fail") {
        } else {
          json = [];
        }
        return {
          type: GitAction.GotMerchants,
          payload: json,
        };
      } catch (error) {
        alert('getAllMerchants: ' + error);
        return {
          type: GitAction.GotMerchants,
          payload: [],
        };
      }
    });


  getAllMerchantOrders = (action$) =>
    action$.ofType(GitAction.GetMerchantOrders).switchMap(async ({ payload }) => {
      try {
        const response = await fetch(
          url +
          "Order_ViewOrderByUserID?TRACKINGSTATUS=" +
          payload.trackingStatus +
          "&USERID=" +
          payload.UserID
        );
        let json = await response.json();
        json = JSON.parse(json);
        return {
          type: GitAction.GotMerchantOrders,
          payload: json,
        };
      } catch (error) {
        alert('getAllMerchantOrders: ' + error);
        return {
          type: GitAction.GotMerchantOrders,
          payload: [],
        };
      }
    });

  // PRODUCT ORDERS

  getAllProductOrders = (action$) =>
    action$.ofType(GitAction.GetProductOrders).switchMap(async () => {
      try {
        const response = await fetch(
          url +
          "Order_ViewSummaryOrderProduct"
        );
        let json = await response.json();
        json = JSON.parse(json);
        return {
          type: GitAction.GotProductOrders,
          payload: json,
        };
      } catch (error) {
        alert('getAllProductOrders: ' + error);
        return {
          type: GitAction.GotProductOrders,
          payload: [],
        };
      }
    });

  getProductStockByStatus = (action$) =>
    action$.ofType(GitAction.GetProductStockByStatus).switchMap(async ({ payload }) => {
      try {
        const response = await fetch(
          url +
          "Order_ViewSummaryOrderProductByStatus?PRODUCTSTOCKSTATUS=" +
          payload.ProductStockStatus +
          "&USERID=" +
          payload.UserID
        );
        const json = await response.json();
        json = JSON.parse(json);
        return {
          type: GitAction.GotProductStockByStatus,
          payload: json,
        };
      } catch (error) {
        alert('getProductStockByStatus: ' + error);
        return {
          type: GitAction.GotProductStockByStatus,
          payload: [],
        };
      }
    });

  updateProductStatus = (action$) =>
    action$.ofType(GitAction.UpdateProductStatus).switchMap(async ({ payload }) => {
      try {
        const response = await fetch(
          url +
          "Order_UpdateProductDetailStatus?ORDERPRODUCTDETAILID=" +
          payload.orderProductID +
          "&PRODUCTSTATUS=" +
          payload.productStatus
        );
        let json = await response.json();
        json = JSON.parse(json);
        return {
          type: "DELETED-PURCHASEORDER",
          payload: json,
        };
      } catch (error) {
        return toast.error(error);
      }
    });

  //=================================== PROMOTION BANNER ===================================//

  AddPromotionBannerByIds = action$ =>
    action$.ofType(GitAction.addPromotionBanner).switchMap(async ({ payload }) => {
      try {
        const response = await fetch(
          this.url +
          "AddPostMedia?POSTID=" +
          payload.postId +
          "&MEDIATYPE=" +
          payload.mediaType +
          "&MEDIATITLE=" +
          payload.mediaTitle +
          "&MEDIAURL=" +
          payload.mediaUrl +
          "&MEDIADESC=" +
          payload.mediaDesc +
          "&SLIDEORDER=" +
          payload.slideOrder +
          "&MEDIASOURCE=" +
          payload.mediaSource
        );
        let json = await response.json();
        if (json !== "fail") {
          json = JSON.parse(json);
        } else {
          json = [];
        }
        try {
          const response_1 = await fetch(this.url + "viewPost?POSTTYPE=1");
          let json2 = await response_1.json();
          return {
            type: GitAction.addedPromotionBanner,
            payload: json,
            payload2: json2
          };
        } catch (error) {
          return console.log("Add promotion banner error code: 4002.1", error);
        }
      } catch (error_1) {
        return console.log("Add promotion banner error code: 4002.2", error_1);
      }
    });
}
export let gitEpic = new GitEpic();
