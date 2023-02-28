import 'rxjs'

import { GitAction } from "../action/gitAction";
import { toast } from "react-toastify";
import axios from "axios";
const { filter, map, switchMap } = require('rxjs/operators');
// const url = "https://cms.myemporia.my/eCommerceCMS/api/emporia/";
const url = "https://cms.myemporia.my/eCommerceCMS_DEV/api/emporia/";
const platformType = "MyEmporia";
const PROJECTID = 2;
// const url = "http://localhost/EmporiaTest/eCommerceCMSApi/api/myemporia/"
export class GitEpic {
  User_Login = action$ =>
    action$.pipe(filter(action => action.type === GitAction.Login), map(action => {
      return dispatch => {
        console.log(url + "User_Login?username=" +
        action.payload.username +
        "&password=" +
        action.payload.password +
        "&ProjectDomainName=myemporia")
        try {
          return fetch(url +
            "User_Login?username=" +
            action.payload.username +
            "&password=" +
            action.payload.password +
            "&ProjectDomainName=myemporia")
            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              if (json[0].ReturnVal === 1) {
                return dispatch({ type: GitAction.UserLoggedInWithData, payload: JSON.parse(json[0].ReturnData) });
              } else {
                //toast.error(json[0].ReturnMsg)
                return dispatch({ type: GitAction.UserLoggedInWithData, payload: [] });
              }
            });
        } catch (error) {
          toast.error("Error Code: User_Login. Please check on URL")
          return dispatch({ type: GitAction.UserLoggedInWithData, payload: [] });
        }
      }
    }));


  User_Login_GoogleFB = action$ =>
    action$.pipe(filter(action => action.type === GitAction.LoginGoogleFB), map(action => {
      return dispatch => {
        try {
          return fetch(url +
            "User_Login_GoogleFB?USEREMAIL=" +
            action.payload.email +
            "&PROJECTID=2" +
            "&TOKEN=" +
            action.payload.id +
            "&TYPE=" +
            action.payload.TYPE +
            "&FIRSTNAME=" +
            action.payload.family_name +
            "&LASTNAME=" +
            action.payload.given_name
          )
            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              if (json[0].ReturnVal === 1) {
                return dispatch({ type: GitAction.UserGoogleFBLoggedIn, payload: JSON.parse(json[0].ReturnData) });
              } else {
                //toast.error(json[0].ReturnMsg)
                return dispatch({ type: GitAction.UserGoogleFBLoggedIn, payload: [] });
              }
            });
        } catch (error) {
          toast.error("Error Code: User_Login. Please check on URL")
          return dispatch({ type: GitAction.UserGoogleFBLoggedIn, payload: [] });
        }
      }
    }));


  User_VerifyGoogleFB_WithOTP = action$ =>
    action$.pipe(filter(action => action.type === GitAction.VerifyBindGoogleFB), map(action => {
      return dispatch => {
        try {
          console.log(url +
            "User_VerifyGoogleFB_WithOTP?USERID=" +
            action.payload.USERID +
            "&TYPE=" +
            action.payload.TYPE +
            "&PROJECTID=" +
            PROJECTID +
            "&USEREMAIL=" +
            action.payload.USEREMAIL)
          return fetch(url +
            "User_VerifyGoogleFB_WithOTP?USERID=" +
            action.payload.USERID +
            "&TYPE=" +
            action.payload.TYPE +
            "&PROJECTID=" +
            PROJECTID +
            "&USEREMAIL=" +
            action.payload.USEREMAIL
          )
            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              if (json[0].ReturnVal === 1) {
                return dispatch({ type: GitAction.BindGoogleFBVerified, payload: JSON.parse(json[0].ReturnData) });
              } else {
                //toast.error(json[0].ReturnMsg)
                return dispatch({ type: GitAction.BindGoogleFBVerified, payload: [] });
              }
            });
        } catch (error) {
          toast.error("Error Code: User_VerifyGoogleFB_WithOTP. Please check on URL")
          return dispatch({ type: GitAction.BindGoogleFBVerified, payload: [] });
        }
      }
    }));

  LogoutUser = action$ =>
    action$.pipe(filter(action => action.type === GitAction.Logout), map(action => {
      return dispatch => {
        try {
          return fetch(url +
            "Audit_AddUserLogout?USERID=" +
            action.payload.UserID)
            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              if (json[0].ReturnVal === 1) {
                return dispatch({ type: GitAction.UserLoggedOut, payload: JSON.parse(json[0].ReturnData) });
              } else {
                //toast.error(json[0].ReturnMsg)
                return dispatch({ type: GitAction.UserLoggedOut, payload: [] });
              }
            });
        } catch (error) {
          toast.error("Error Code: LogoutUser. Please check on URL")
          return dispatch({ type: GitAction.UserLoggedOut, payload: [] });
        }
      }
    }));

  RegisterUser = action$ =>
    action$.pipe(filter(action => action.type === GitAction.Register), map(action => {
      return dispatch => {
        try {
          return fetch(url +
            "User_Register_WithOTP?USEREMAIL=" +
            action.payload.Email +
            "&PASSWORD=" +
            action.payload.Password +
            "&PROJECTID=2")
            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              if (json[0].ReturnVal === 1) {
                return dispatch({ type: GitAction.UserRegistered, payload: JSON.parse(json[0].ReturnData) });
              } else {
                //toast.error(json[0].ReturnMsg)
                return dispatch({ type: GitAction.UserRegistered, payload: [] });
              }
            });
        } catch (error) {
          toast.error("Error Code: RegisterUser. Please check on URL")
          return dispatch({ type: GitAction.UserRegistered, payload: [] });
        }
      }
    }));
    
RegisterUserOTP = action$ =>
  action$.pipe(filter(action => action.type === GitAction.RegisterOTP), map(action => {
    return dispatch => {
      try {
        return fetch(url +
          "User_Register_VerifyOTP?USERID=" +
          action.payload.UserID +
          "&USEREMAIL=" +
          action.payload.Email +
          "&OTP=" +
          action.payload.OTP +
          "&TOKEN=" +
          action.payload.TOKEN +
          "&TYPE=" +
          action.payload.TYPE
        )
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            if (json[0].ReturnVal === 1) {
              return dispatch({ type: GitAction.UserRegisteredOTP, payload: JSON.parse(json[0].ReturnData) });
            } else {
              //toast.error(json[0].ReturnMsg)
              return dispatch({ type: GitAction.UserRegisteredOTP, payload: [] });
            }
          });
      } catch (error) {
        toast.error("Error Code: RegisterOTP. Please check on URL")
        return dispatch({ type: GitAction.UserRegisteredOTP, payload: [] });
      }
    }
  }));

checkUser = action$ =>
  action$.pipe(filter(action => action.type === GitAction.CheckUser), map(action => {
    return dispatch => {
      try {
        return fetch(url +
          "User_CheckDuplicate?email=" +
          action.payload.Email +
          "&ProjectID=2")
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            if (json[0].ReturnVal === 1) {
              return dispatch({ type: GitAction.CheckedUser, payload: JSON.parse(json[0].ReturnData) });
            }
            else {
              return dispatch({ type: GitAction.CheckedUser, payload: json });
            }
          });
      } catch (error) {
        toast.error("Error Code: RegisterUser. Please check on URL")
        return dispatch({ type: GitAction.CheckedUser, payload: [] });
      }
    }
  }));

verifyPassword = action$ =>
  action$.pipe(filter(action => action.type === GitAction.VerifyPassword), map(action => {
    return dispatch => {
      try {
        return fetch(url +
          "User_ValidationByType?USERID=" +
          action.payload.USERID +
          "&TYPE=" +
          action.payload.VerifyType +
          "&VALIDATIONFIELD=" +
          action.payload.password)
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            if (json[0].ReturnVal === 1) {
              return dispatch({ type: GitAction.VerifiedPassword, payload: JSON.parse(json[0].ReturnData) });
            } else {
              // //toast.error(json[0].ReturnMsg)
              return dispatch({ type: GitAction.VerifiedPassword, payload: [] });
            }
          });
      } catch (error) {
        toast.error("Error Code: RegisterUser. Please check on URL")
        return dispatch({ type: GitAction.VerifiedPassword, payload: [] });
      }
    }
  }));

sentOTPVerification = action$ =>
  action$.pipe(filter(action => action.type === GitAction.SendOTPVerification), map(action => {
    return dispatch => {
      try {
        return fetch(url +
          "User_SentOTPVerification?USERID=" +
          action.payload.USERID +
          "&TYPE=" +
          action.payload.GETOTPTYPE +
          "&VALIDATIONFIELD=" +
          action.payload.UpdatedValue)
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            if (json[0].ReturnVal === 1) {
              return dispatch({ type: GitAction.SentOTPVerification, payload: JSON.parse(json[0].ReturnData) });
            } else {
              // //toast.error(json[0].ReturnMsg)
              return dispatch({ type: GitAction.SentOTPVerification, payload: [] });
            }
          });
      } catch (error) {
        toast.error("Error Code: RegisterUser. Please check on URL")
        return dispatch({ type: GitAction.SentOTPVerification, payload: [] });
      }
    }
  }));

updateContact = action$ =>
  action$.pipe(filter(action => action.type === GitAction.UpdateContact), map(action => {
    return dispatch => {
      try {
        return fetch(url +
          "User_UpdateProfileSpecificField?USERID=" +
          action.payload.USERID +
          "&TYPE=" +
          action.payload.UPDATETYPE +
          "&OTP=" +
          action.payload.otp +
          "&UPDATEDFIELD=" +
          action.payload.UpdatedValue)
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            // if (json[0].ReturnVal === 1) {
            return dispatch({ type: GitAction.UpdatedContact, payload: json });
            // } else {
            //   // //toast.error(json[0].ReturnMsg)
            //   return dispatch({ type: GitAction.UpdatedContact, payload: [] });
            // }
          });
      } catch (error) {
        toast.error("Error Code: RegisterUser. Please check on URL")
        return dispatch({ type: GitAction.UpdatedContact, payload: [] });
      }
    }
  }));

updateEmail = action$ =>
  action$.pipe(filter(action => action.type === GitAction.UpdateEmail), map(action => {
    return dispatch => {
      try {
          console.log(
            url +
            "User_UpdateProfileSpecificField?USERID=" +
            action.payload.USERID +
            "&TYPE=" +
            action.payload.UPDATETYPE +
            "&OTP=" +
            action.payload.otp +
            "&UPDATEDFIELD=" +
            action.payload.UpdatedValue
          )
        return fetch(url +
          "User_UpdateProfileSpecificField?USERID=" +
          action.payload.USERID +
          "&TYPE=" +
          action.payload.UPDATETYPE +
          "&OTP=" +
          action.payload.otp +
          "&UPDATEDFIELD=" +
          action.payload.UpdatedValue)
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            // if (json[0].ReturnVal === 1) {
            return dispatch({ type: GitAction.UpdatedEmail, payload: json });
            // } else {
            //   // //toast.error(json[0].ReturnMsg)
            //   return dispatch({ type: GitAction.UpdatedEmail, payload: [] });
            // }
          });
      } catch (error) {
        toast.error("Error Code: RegisterUser. Please check on URL")
        return dispatch({ type: GitAction.UpdatedEmail, payload: [] });
      }
    }
  }));

updatePassword = action$ =>
  action$.pipe(filter(action => action.type === GitAction.UpdatePassword), map(action => {
    return dispatch => {
      try {
        return fetch(url +
          "User_UpdateProfileSpecificField?USERID=" +
          action.payload.USERID +
          "&TYPE=" +
          action.payload.UPDATETYPE +
          "&OTP=" +
          action.payload.otp +
          "&UPDATEDFIELD=" +
          action.payload.UpdatedValue)
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            console.log('json', json)
              // if (json[0].ReturnMsg === "") {
              return dispatch({ type: GitAction.UpdatedPassword, payload: json});
            // } else {
            //   //toast.error(json[0].ReturnMsg)
            //   return dispatch({ type: GitAction.UpdatedPassword, payload: [] });
            // }
          });
      } catch (error) {
        toast.error("Error Code: updatePassword. Please check on URL")
        return dispatch({ type: GitAction.UpdatedPassword, payload: [] });
      }
    }
  }));

getUserPage = action$ =>
  action$.pipe(filter(action => action.type === GitAction.GetPages), map(action => {
    return dispatch => {
      try {
        return fetch(url +
          "User_ViewPage?ROLEGROUPID=" +
          action.payload)
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            if (json[0].ReturnVal === 1) {
              return dispatch({ type: GitAction.GotPages, payload: JSON.parse(json[0].ReturnData) });
            } else {
              //toast.error(json[0].ReturnMsg)
              return dispatch({ type: GitAction.GotPages, payload: [] });
            }
          });
      } catch (error) {
        toast.error("Error Code: getUserPage. Please check on URL")
        return dispatch({ type: GitAction.GotPages, payload: [] });
      }
    }
  }));

getUserProfile = action$ =>
  action$.pipe(filter(action => action.type === GitAction.GetUserProfile), map(action => {
    return dispatch => {
        console.log(url +
        "User_ProfileListByType?TYPE=" + action.payload.TYPE +
        "&TYPEVALUE=" + action.payload.TYPEVALUE +
        "&USERID=" + action.payload.USERID +
        "&UserRoleID=" + action.payload.USERROLEID +
        "&LISTPERPAGE=" + action.payload.LISTPERPAGE +
        "&PAGE=" + action.payload.PAGE +
        "&PROJECTID=2")
      try {
        return fetch(url +
          "User_ProfileListByType?TYPE=" + action.payload.TYPE +
          "&TYPEVALUE=" + action.payload.TYPEVALUE +
          "&USERID=" + action.payload.USERID +
          "&UserRoleID=" + action.payload.USERROLEID +
          "&LISTPERPAGE=" + action.payload.LISTPERPAGE +
          "&PAGE=" + action.payload.PAGE +
          "&PROJECTID=2"
        )
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            if (json[0].ReturnVal === 1) {
              return dispatch({ type: GitAction.GotUserProfile, payload: JSON.parse(json[0].ReturnData) });
            } else {
              //toast.error(json[0].ReturnMsg)
              return dispatch({ type: GitAction.GotUserProfile, payload: [] });
            }
          });
      } catch (error) {
        toast.error("Error Code: getUserProfile. Please check on URL")
        return dispatch({ type: GitAction.GotUserProfile, payload: [] });
      }
    }
  }));

updateUserProfile = action$ =>
  action$.pipe(filter(action => action.type === GitAction.EditUserProfile), map(action => {
    return dispatch => {
      try {
        return fetch(url +
          "User_UpdateProfile?USERID=" + action.payload.USERID +
          "&FIRSTNAME=" + action.payload.USERFIRSTNAME +
          "&LASTNAME=" + action.payload.USERLASTNAME +
          "&USERCONTACTNO=" + action.payload.USERCONTACTNO +
          "&USERDOB=" + action.payload.USERDATEBIRTH +
          "&USEREMAIL=" + action.payload.USEREMAIL +
          "&USERGENDER=" + action.payload.USERGENDER)
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            if (json[0].ReturnVal === 1) {
              return dispatch({ type: GitAction.EditedUserProfile, payload: JSON.parse(json[0].ReturnData) });
            } else {
              //toast.error(json[0].ReturnMsg)
              return dispatch({ type: GitAction.EditedUserProfile, payload: [] });
            }
          });
      } catch (error) {
        toast.error("Error Code: EditUserProfile. Please check on URL")
        return dispatch({ type: GitAction.EditedUserProfile, payload: [] });
      }
    }
  }));

// updateUserProfile = (action$) =>
//   action$.ofType(GitAction.EditUserProfile).switchMap(async ({ payload }) => {
//     try {

//       const response = await fetch(
//         url +
//         "User_UpdateProfile?USERID=" +
//         payload.USERID +
//         "&FIRSTNAME=" +
//         payload.USERFIRSTNAME +
//         "&LASTNAME=" +
//         payload.USERLASTNAME +
//         "&USERCONTACTNO=" +
//         payload.USERCONTACTNO +
//         "&USERDOB=" +
//         payload.USERDATEBIRTH +
//         "&USEREMAIL=" +
//         payload.USEREMAIL +
//         "&USERGENDER=" +
//         payload.USERGENDER
//       );
//       let json = await response.json();
//       if (JSON.parse(json)[0].ReturnVal === 1) {
//         toast.success("User Profile is updated successfully");
//       }
//       try {
//         const response_1 = await fetch(
//           url +
//           "User_ProfileListByType?TYPE=" + payload.TYPE +
//           "&TYPEVALUE=" + payload.TYPEVALUE +
//           "&USERID=" + payload.USERID +
//           "&UserRoleID=" + payload.USERROLEID +
//           "&LISTPERPAGE=" + payload.LISTPERPAGE +
//           "&PAGE=" + payload.PAGE
//         );
//         let json_1 = await response_1.json();
//         json_1 = JSON.parse(json_1);
//         return {
//           type: GitAction.EditedUserProfile,
//           payload: json_1,
//         };
//       } catch (error) {
//         alert('getUserProfile: ' + error);
//         return {
//           type: GitAction.EditedUserProfile,
//           payload: [],
//         };
//       }
//     } catch (error) {
//       alert('updateUserProfile: ' + error);
//       return {
//         type: GitAction.EditedUserProfile,
//         payload: [],
//       };
//     }
//   });

UpdateUserProfileStatus = action$ =>
  action$.pipe(filter(action => action.type === GitAction.UpdateUserStatus), map(action => {
    return dispatch => {
      try {
        return fetch(url +
          "User_UpdateProfileStatus?USERID=" + action.payload.USERID +
          "&USERSTATUS=" + action.payload.USERSTATUS)
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            if (json[0].ReturnVal === 1) {
              return dispatch({ type: GitAction.UpdatedUserStatus, payload: JSON.parse(json[0].ReturnData) });
            } else {
              //toast.error(json[0].ReturnMsg)
              return dispatch({ type: GitAction.UpdatedUserStatus, payload: [] });
            }
          });
      } catch (error) {
        toast.error("Error Code: UpdateUserProfileStatus. Please check on URL")
        return dispatch({ type: GitAction.UpdatedUserStatus, payload: [] });
      }
    }
  }));

UpdateShopDetail = action$ =>
  action$.pipe(filter(action => action.type === GitAction.UpdateShopDetail), map(action => {
    return dispatch => {
      try {
        return fetch(url +
          "User_UpdateShopDetail?USERID=" + action.payload.USERID +
          "&SHOPNAME=" + action.payload.SHOPNAME +
          "&SHOPDESC=" + action.payload.SHOPDESC +
          "&SHOPPOSCODE=" + action.payload.SHOPPOSCODE +
          "&SHOPCITY=" + action.payload.SHOPCITY +
          "&SHOPSTATE=" + action.payload.SHOPSTATE +
          "&SHOPCOUNTRYID=" + action.payload.SHOPCOUNTRYID)
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            if (json[0].ReturnVal === 1) {
              return dispatch({ type: GitAction.UpdatedShopDetail, payload: JSON.parse(json[0].ReturnData) });
            } else {
              //toast.error(json[0].ReturnMsg)
              return dispatch({ type: GitAction.UpdatedShopDetail, payload: [] });
            }
          });
      } catch (error) {
        toast.error("Error Code: UpdateShopDetail. Please check on URL")
        return dispatch({ type: GitAction.UpdatedShopDetail, payload: [] });
      }
    }
  }));

updateProfileImage = action$ =>
  action$.pipe(filter(action => action.type === GitAction.UpdateProfileImage), map(action => {
    return dispatch => {
      try {
          console.log(url +
            "User_UserUpdatePhoto?USERID=" + action.payload.USERID +
            "&TYPE=" + action.payload.TYPE +
            "&USERPROFILEIMAGE=" + action.payload.USERPROFILEIMAGE)
        return fetch(url +
          "User_UserUpdatePhoto?USERID=" + action.payload.USERID +
          "&TYPE=" + action.payload.TYPE +
          "&USERPROFILEIMAGE=" + action.payload.USERPROFILEIMAGE)
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            if (json[0].ReturnVal === 1) {
              return dispatch({ type: GitAction.UpdatedProfileImage, payload: JSON.parse(json[0].ReturnData) });
            } else {
              //toast.error(json[0].ReturnMsg)
              return dispatch({ type: GitAction.UpdatedProfileImage, payload: [] });
            }
          });
      } catch (error) {
        toast.error("Error Code: updateProfileImage. Please check on URL")
        return dispatch({ type: GitAction.UpdatedProfileImage, payload: [] });
      }
    }
  }));

// USER ADDRESS


ViewAddress = action$ =>
  action$.pipe(filter(action => action.type === GitAction.GetAddress), map(action => {
    return dispatch => {
      try {
        return fetch(url +
          "User_ViewAddressBook?USERID=" + action.payload.USERID)
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            if (json[0].ReturnVal === 1) {
              return dispatch({ type: GitAction.GotAddress, payload: JSON.parse(json[0].ReturnData) });
            } else {
              //toast.error(json[0].ReturnMsg)
              return dispatch({ type: GitAction.GotAddress, payload: [] });
            }
          });
      } catch (error) {
        toast.error("Error Code: ViewAddress. Please check on URL")
        return dispatch({ type: GitAction.GotAddress, payload: [] });
      }
    }
  }));

ViewAllAddress = action$ =>
  action$.pipe(filter(action => action.type === GitAction.GetAllAddress), map(action => {
    return dispatch => {
      try {
        return fetch(url + "User_ViewAllAddressBook")
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            if (json[0].ReturnVal === 1) {
              return dispatch({ type: GitAction.GotAllAddress, payload: JSON.parse(json[0].ReturnData) });
            } else {
              //toast.error(json[0].ReturnMsg)
              return dispatch({ type: GitAction.GotAllAddress, payload: [] });
            }
          });
      } catch (error) {
        toast.error("Error Code: ViewAllAddress. Please check on URL")
        return dispatch({ type: GitAction.GotAllAddress, payload: [] });
      }
    }
  }));

addAddress = action$ =>
  action$.pipe(filter(action => action.type === GitAction.AddAddress), map(action => {
    return dispatch => {
      try {
        return fetch(url +
          "User_AddAddressBook?USERADDRESSNAME=" + action.payload.Name +
          "&USERID=" + action.payload.USERID +
          "&USERCONTACTNO=" + action.payload.ContactNo +
          "&USEREMAIL=" + action.payload.email +
          "&USERADDRESSLINE1=" + action.payload.USERADDRESSLINE1 +
          "&USERADDRESSLINE2=" + action.payload.USERADDRESSLINE2 +
          "&USERPOSCODE=" + action.payload.USERPOSCODE +
          "&USERSTATE=" + action.payload.USERSTATE +
          "&USERCITY=" + action.payload.USERCITY +
          "&COUNTRYID=" + action.payload.COUNTRYID)
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            if (json[0].ReturnVal === 1) {
              return dispatch({ type: GitAction.AddedAddress, payload: JSON.parse(json[0].ReturnData) });
            } else {
              //toast.error(json[0].ReturnMsg)
              return dispatch({ type: GitAction.AddedAddress, payload: [] });
            }
          });
      } catch (error) {
        toast.error("Error Code: addAddress. Please check on URL")
        return dispatch({ type: GitAction.AddedAddress, payload: [] });
      }
    }
  }));

// addAddress = (action$) =>
//   action$.ofType(GitAction.AddAddress).switchMap(async ({ payload }) => {
//     try {

//       const response = await fetch(
//         url +
//         "User_AddAddressBook?USERADDRESSNAME=" +
//         payload.Name +
//         "&USERID=" +
//         payload.USERID +
//         "&USERCONTACTNO=" +
//         payload.ContactNo +
//         "&USEREMAIL=" +
//         payload.email +
//         "&USERADDRESSLINE1=" +
//         payload.USERADDRESSLINE1 +
//         "&USERADDRESSLINE2=" +
//         payload.USERADDRESSLINE2 +
//         "&USERPOSCODE=" +
//         payload.USERPOSCODE +
//         "&USERSTATE=" +
//         payload.USERSTATE +
//         "&USERCITY=" +
//         payload.USERCITY +
//         "&COUNTRYID=" +
//         payload.COUNTRYID
//       );
//       let json = await response.json();
//       json = JSON.parse(json);
//       if (json[0].ReturnVal === 1) {
//         toast.success("Address successfully added");
//       }
//       try {
//         const response_1 = await fetch(
//           url +
//           "User_ViewAddressBook?USERID=" +
//           payload.USERID
//         );
//         let json_1 = await response_1.json();
//         json_1 = JSON.parse(json_1);


//         return {
//           type: GitAction.AddedAddress,
//           payloadCondition: json,
//           payloadValue: json_1,
//         };
//       } catch (error) {
//         alert('Err code 1901: ' + error);
//         return {
//           type: GitAction.GotAddress,
//           payload: [],
//         };
//       }
//     } catch (error) {
//       alert('Err code 1902: ' + error);
//       return {
//         type: GitAction.GotAddress,
//         payloadCondition: [],
//         payloadValue: [],
//       };
//     }
//   });

updateAddress = action$ =>
  action$.pipe(filter(action => action.type === GitAction.UpdateAddress), map(action => {
    return dispatch => {
      try {
        return fetch(url +
          "User_UpdateAddressBook?USERADDRESSBOOKID=" + action.payload.AddressBookNo +
          "&USERADDRESSNAME=" + action.payload.Name +
          "&USERID=" + action.payload.USERID +
          "&USERCONTACTNO=" + action.payload.ContactNo +
          "&USEREMAIL=" + action.payload.email +
          "&USERADDRESSLINE1=" + action.payload.USERADDRESSLINE1 +
          "&USERADDRESSLINE2=" + action.payload.USERADDRESSLINE2 +
          "&USERPOSCODE=" + action.payload.USERPOSCODE +
          "&USERSTATE=" + action.payload.USERSTATE +
          "&USERCITY=" + action.payload.USERCITY +
          "&COUNTRYID=" + action.payload.COUNTRYID)
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            if (json[0].ReturnVal === 1) {
              return dispatch({ type: GitAction.UpdatedAddress, payload: JSON.parse(json[0].ReturnData) });
            } else {
              //toast.error(json[0].ReturnMsg)
              return dispatch({ type: GitAction.UpdatedAddress, payload: [] });
            }
          });
      } catch (error) {
        toast.error("Error Code: updateAddress. Please check on URL")
        return dispatch({ type: GitAction.UpdatedAddress, payload: [] });
      }
    }
  }));

// updateAddress = (action$) =>
//   action$.ofType(GitAction.UpdateAddress).switchMap(async ({ payload }) => {
//     try {
//       const response = await fetch(
//         url +
//         "User_UpdateAddressBook?USERADDRESSBOOKID=" +
//         payload.AddressBookNo +
//         "&USERADDRESSNAME=" +
//         payload.Name +
//         "&USERID=" +
//         payload.USERID +
//         "&USERCONTACTNO=" +
//         payload.ContactNo +
//         "&USEREMAIL=" +
//         payload.email +
//         "&USERADDRESSLINE1=" +
//         payload.USERADDRESSLINE1 +
//         "&USERADDRESSLINE2=" +
//         payload.USERADDRESSLINE2 +
//         "&USERPOSCODE=" +
//         payload.USERPOSCODE +
//         "&USERSTATE=" +
//         payload.USERSTATE +
//         "&USERCITY=" +
//         payload.USERCITY +
//         "&COUNTRYID=" +
//         payload.COUNTRYID
//       );
//       const json = await response.json();

//       if (JSON.parse(json)[0].ReturnVal == 1) {
//         toast.success("Address successfully updated");
//       }
//       try {
//         const response_1 = await fetch(
//           url +
//           "User_ViewAddressBook?USERID=" +
//           payload.USERID
//         );
//         let json_1 = await response_1.json();
//         json_1 = JSON.parse(json_1);
//         return {
//           type: GitAction.UpdatedAddress,
//           payloadCondition: json,
//           payloadValue: json_1,
//         };
//       } catch (error) {
//         alert('Err code 1901: ' + error);
//         return {
//           type: GitAction.GotAddress,
//           payload: [],
//         };
//       }
//     } catch (error) {
//       alert('Err code 1903: ' + error);
//       return {
//         type: GitAction.UpdatedAddress,
//         payloadCondition: [],
//         payloadValue: [],
//       };
//     }
//   });

updateDefaultAddress = action$ =>
  action$.pipe(filter(action => action.type === GitAction.UpdateDefaultAddress), map(action => {
    return dispatch => {
      try {
        return fetch(url +
          "User_UpdateDefaultAddress?USERADDRESSBOOKID=" + action.payload.AddressBookNo +
          "&USEROLDADDRESSBOOKID=" + action.payload.OldAddressBookNo)
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            if (json[0].ReturnVal === 1) {
              return dispatch({ type: GitAction.UpdatedDefaultAddress, payload: JSON.parse(json[0].ReturnData) });
            } else {
              //toast.error(json[0].ReturnMsg)
              return dispatch({ type: GitAction.UpdatedDefaultAddress, payload: [] });
            }
          });
      } catch (error) {
        toast.error("Error Code: updateDefaultAddress. Please check on URL")
        return dispatch({ type: GitAction.UpdatedDefaultAddress, payload: [] });
      }
    }
  }));

// updateDefaultAddress = (action$) =>
//   action$.ofType(GitAction.UpdateDefaultAddress).switchMap(async ({ payload }) => {
//     try {

//       const response = await fetch(
//         url +
//         "User_UpdateDefaultAddress?USERADDRESSBOOKID=" +
//         payload.AddressBookNo +
//         "&USEROLDADDRESSBOOKID=" +
//         payload.OldAddressBookNo
//       );
//       const json = await response.json();

//       if (JSON.parse(json)[0].ReturnVal == 1) {
//         toast.success("Default Address successfully updated");
//       }
//       try {
//         const response_1 = await fetch(
//           url +
//           "User_ViewAddressBook?USERID=" +
//           payload.USERID
//         );
//         let json_1 = await response_1.json();
//         json_1 = JSON.parse(json_1);
//         return {
//           type: GitAction.UpdatedAddress,
//           payloadCondition: json,
//           payloadValue: json_1,
//         };
//       } catch (error) {
//         alert('Err code 1901: ' + error);
//         return {
//           type: GitAction.GotAddress,
//           payload: [],
//         };
//       }
//     } catch (error) {
//       alert('Err code 1903: ' + error);
//       return {
//         type: GitAction.UpdatedDefaultAddress,
//         payloadCondition: [],
//         payloadValue: [],
//       };
//     }
//   });

deleteAddress = action$ =>
  action$.pipe(filter(action => action.type === GitAction.DeleteAddress), map(action => {
    return dispatch => {
      try {
        return fetch(url +
          "User_DeleteAddressBook?USERADDRESSBOOKID=" + action.payload.AddressBookNo)
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            if (json[0].ReturnVal === 1) {
              return dispatch({ type: GitAction.DeletedAddress, payload: JSON.parse(json[0].ReturnData) });
            } else {
              //toast.error(json[0].ReturnMsg)
              return dispatch({ type: GitAction.DeletedAddress, payload: [] });
            }
          });
      } catch (error) {
        toast.error("Error Code: deleteAddress. Please check on URL")
        return dispatch({ type: GitAction.DeletedAddress, payload: [] });
      }
    }
  }));

// deleteAddress = (action$) =>
//   action$.ofType(GitAction.DeleteAddress).switchMap(async ({ payload }) => {
//     try {
//       const response = await fetch(
//         url +
//         "User_DeleteAddressBook?USERADDRESSBOOKID=" +
//         payload.AddressBookNo
//       );
//       const json = await response.json();
//       if (JSON.parse(json)[0].ReturnVal == 1) {
//         toast.success("Address successfully deleted");
//       }
//       try {
//         const response_1 = await fetch(
//           url +
//           "User_ViewAddressBook?USERID=" +
//           payload.USERID
//         );
//         let json_1 = await response_1.json();
//         json_1 = JSON.parse(json_1);
//         return {
//           type: GitAction.DeletedAddress,
//           payloadCondition: json,
//           payloadValue: json_1,
//         };
//       } catch (error) {
//         alert('Err code 1901: ' + error);
//         return {
//           type: GitAction.GotAddress,
//           payload: [],
//         };
//       }
//     } catch (error) {
//       alert('Err code 1904: ' + error);
//       return {
//         type: GitAction.DeletedAddress,
//         payloadCondition: [],
//         payloadValue: [],
//       };
//     }
//   });

// PRODUCT CART

deleteProductCart = action$ =>
  action$.pipe(filter(action => action.type === GitAction.DeleteProductCart), map(action => {
    return dispatch => {
      try {
        return fetch(url +
          "Product_DeleteProductCart?USERCARTID=" + action.payload.userCartID)
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            if (json[0].ReturnVal === 1) {
              try {
                fetch(url +
                  "Product_ItemListInCartByUserID?USERID=" + action.payload.userID)
                  .then(response => response.json())
                  .then(json => {
                    json = JSON.parse(json)
                    if (json[0].ReturnVal === 1) {
                      return dispatch({ type: GitAction.DeletedProductCart, payload: JSON.parse(json[0].ReturnData) });

                    }
                    else {
                      return dispatch({ type: GitAction.DeletedProductCart, payload: [] });
                    }
                  })
              }
              catch (e) { console.log(e) }

            } else {
              //toast.error(json[0].ReturnMsg)
              return dispatch({ type: GitAction.DeletedProductCart, payload: [] });
            }
          });
      } catch (error) {
        toast.error("Error Code: deleteProductCart. Please check on URL")
        return dispatch({ type: GitAction.DeletedProductCart, payload: [] });
      }
    }
  }));

// deleteProductCart = (action$) =>
//   action$.ofType(GitAction.DeleteProductCart).switchMap(async ({ payload }) => {
//     try {
//       const response = await fetch(
//         url +
//         "Product_DeleteProductCart?USERCARTID=" +
//         payload.userCartID
//       );
//       let json = await response.json();
//       json = JSON.parse(json);
//       if (json[0].ReturnVal !== '1') {
//         toast.error("Product " + payload.productName + " is NOT deleted! Please try again.");
//       }
//       try {
//         const response_1 = await fetch(
//           url +
//           "Product_ItemListInCartByUserID?USERID=" +
//           payload.userID
//         );
//         let json_1 = await response_1.json();
//         json_1 = JSON.parse(json_1);
//         return {
//           type: GitAction.DeletedProductCart,
//           payload: json_1,
//         };
//       } catch (error) {
//         alert("viewProductCartList: " + error)
//         return {
//           type: GitAction.ViewedProductCart,
//           payload: [],
//         };
//       }
//     } catch (error) {
//       alert("deleteProductCart: " + error)
//       return {
//         type: GitAction.DeletedProductCart,
//         payload: [],
//       };
//     }
//   });

// updateProductCart = action$ =>
//   action$.pipe(filter(action => action.type === GitAction.UpdateProductCart), map(action => {
//     return dispatch => {
//       try {
//         return fetch(url +
//           "Product_UpdateProductCart?USERCARTID=" + action.payload.userCartID +
//           "&PRODUCTQUANTITY=" + action.payload.productQuantity)
//           .then(response => response.json())
//           .then(json => {
//             json = JSON.parse(json)
//             if (json[0].ReturnVal === 1) {
//               switchMap(action => this.viewProductCartList({ userID: action.payload.userID }))

//               // return dispatch({ type: GitAction.UpdatedProductCart, payload: JSON.parse(json[0].ReturnData) });
//             } else {
//               toast.error(json[0].ReturnMsg)
//               return dispatch({ type: GitAction.UpdatedProductCart, payload: [] });
//             }
//           });
//       } catch (error) {
//         toast.error("Error Code: updateProductCart. Please check on URL")
//         return dispatch({ type: GitAction.UpdatedProductCart, payload: [] });
//       }
//     }
//   }));

updateProductCart = action$ =>
  action$.pipe(
    filter(action => action.type === GitAction.UpdateProductCart),
    map(action => {
      return dispatch => {
        try {
          return fetch(url +
            "Product_UpdateProductCart?USERCARTID=" + action.payload.userCartID +
            "&PRODUCTQUANTITY=" + action.payload.productQuantity)
            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              if (json[0].ReturnVal === 1) {
                try {
                  fetch(url +
                    "Product_ItemListInCartByUserID?USERID=" + action.payload.userID)
                    .then(response => response.json())
                    .then(json => {
                      json = JSON.parse(json)
                      if (json[0].ReturnVal === 1) {
                        return dispatch({ type: GitAction.UpdatedProductCart, payload: JSON.parse(json[0].ReturnData) });

                      }
                      else {
                        return dispatch({ type: GitAction.UpdatedProductCart, payload: [] });
                      }
                    })
                }
                catch (e) { console.log(e) }

              } else {
                toast.error(json[0].ReturnMsg)
                return dispatch({ type: GitAction.UpdatedProductCart, payload: [] });
              }
            });
        } catch (error) {
          toast.error("Error Code: updateProductCart. Please check on URL")
          return dispatch({ type: GitAction.UpdatedProductCart, payload: [] });
        }
      }
    })
    // ,
    // switchMap(action => this.viewProductCartList({ userID: action.payload.userID }))
  );
// updateProductCart = (action$) =>
//   action$.ofType(GitAction.UpdateProductCart).switchMap(async ({ payload }) => {
//     try {
//       const response = await fetch(
//         url +
//         "Product_UpdateProductCart?USERCARTID=" +
//         payload.userCartID +
//         "&PRODUCTQUANTITY=" +
//         payload.productQuantity
//       );
//       let json = await response.json();
//       json = JSON.parse(json);

//       if (json[0].ReturnVal !== 1) {
//         toast.error("Product " + payload.productName + " is NOT updated! Please try again.");
//       } else {
//         toast.success("Product " + payload.productName + " is updated quantity in cart!");
//       }
//       try {
//         const response_1 = await fetch(
//           url +
//           "Product_ItemListInCartByUserID?USERID=" +
//           payload.userID
//         );
//         let json_1 = await response_1.json();
//         json_1 = JSON.parse(json_1);
//         return {
//           type: GitAction.UpdatedProductCart,
//           payload: json_1,
//         };
//       } catch (error) {
//         alert("viewProductCartList: " + error)
//         return {
//           type: GitAction.ViewedProductCart,
//           payload: [],
//         };
//       }
//     } catch (error) {
//       alert("updateProductCart: " + error)
//       return {
//         type: GitAction.UpdatedProductCart,
//         payload: [],
//       };
//     }
//   });

addProductCart = action$ =>
  action$.pipe(filter(action => action.type === GitAction.AddProductCart), map(action => {
    return dispatch => {
      try {
        return fetch(url +
          "Product_AddProductCart?USERID=" + action.payload.userID +
          "&PRODUCTID=" + action.payload.productID +
          "&PRODUCTQUANTITY=" + action.payload.productQuantity +
          "&PRODUCTVARIATIONDETAILID=" + action.payload.productVariationDetailID +
          "&APPLYINGPROMOCODE=" + action.payload.applyingPromoCode)
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            // if (json[0].ReturnVal === 1) {
            //   return dispatch({ type: GitAction.AddedProductCart, payload: JSON.parse(json[0].ReturnData) });
            // } else {
            //   toast.error(json[0].ReturnMsg)
            //   return dispatch({ type: GitAction.AddedProductCart, payload: [] });
            // }
            if (json[0].ReturnVal === 1) {
              try {
                fetch(url +
                  "Product_ItemListInCartByUserID?USERID=" + action.payload.userID)
                  .then(response => response.json())
                  .then(json => {
                    json = JSON.parse(json)
                    if (json[0].ReturnVal === 1) {
                      return dispatch({ type: GitAction.AddedProductCart, payload: JSON.parse(json[0].ReturnData) });

                    }
                    else {
                      return dispatch({ type: GitAction.AddedProductCart, payload: [] });
                    }
                  })
              }
              catch (e) { console.log(e) }

            } else {
              //toast.error(json[0].ReturnMsg)
              return dispatch({ type: GitAction.AddedProductCart, payload: [] });
            }
          });
      } catch (error) {
        toast.error("Error Code: addProductCart. Please check on URL")
        return dispatch({ type: GitAction.AddedProductCart, payload: [] });
      }
    }
  }));

// addProductCart = (action$) =>
//   action$.ofType(GitAction.AddProductCart).switchMap(async ({ payload }) => {
//     try {
//       const response = await fetch(
//         url +
//         "Product_AddProductCart?USERID=" +
//         payload.userID +
//         "&PRODUCTID=" +
//         payload.productID +
//         "&PRODUCTQUANTITY=" +
//         payload.productQuantity +
//         "&PRODUCTVARIATIONDETAILID=" +
//         payload.productVariationDetailID +
//         "&APPLYINGPROMOCODE=" +
//         payload.applyingPromoCode
//       );
//       let json = await response.json();
//       json = JSON.parse(json);
//       if (json[0].ReturnVal === 1) {
//         toast.success("Product " + payload.productName + " is added to cart!");
//       } else {
//         toast.error("Product " + payload.productName + " is NOT added to cart! Please try again.");
//       }
//       try {
//         const response_1 = await fetch(
//           url +
//           "Product_ItemListInCartByUserID?USERID=" +
//           payload.userID
//         );
//         let json_1 = await response_1.json();
//         json_1 = JSON.parse(json_1);
//         return {
//           type: GitAction.AddedProductCart,
//           payload: json_1,
//         };
//       } catch (error) {
//         alert("viewProductCartList: " + error)
//         return {
//           type: GitAction.ViewedProductCart,
//           payload: [],
//         };
//       }
//     } catch (error) {
//       alert("addProductCart: " + error)
//       return {
//         type: GitAction.AddedProductCart,
//         payload: [],
//       };
//     }
//   });

viewProductCartList = action$ =>
  action$.pipe(filter(action => action.type === GitAction.ViewProductCart), map(action => {
    return dispatch => {
      try {
        return fetch(url +
          "Product_ItemListInCartByUserID?USERID=" + action.payload.userID)
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            if (json[0].ReturnVal === 1) {
              return dispatch({ type: GitAction.ViewedProductCart, payload: JSON.parse(json[0].ReturnData) });
            } else {
              //toast.error(json[0].ReturnMsg)
              return dispatch({ type: GitAction.ViewedProductCart, payload: [] });
            }
          });
      } catch (error) {
        toast.error("Error Code: viewProductCartList. Please check on URL")
        return dispatch({ type: GitAction.ViewedProductCart, payload: [] });
      }
    }
  }));

// viewProductCartList = (action$) =>
//   action$.ofType(GitAction.ViewProductCart).switchMap(async ({ payload }) => {
//     try {

//       const response = await fetch(
//         url +
//         "Product_ItemListInCartByUserID?USERID=" +
//         payload.userID
//       );
//       let json = await response.json();
//       json = JSON.parse(json);

//       return {
//         type: GitAction.ViewedProductCart,
//         payload: json,
//       };
//     } catch (error) {
//       alert("viewProductCartList: " + error)
//       return {
//         type: GitAction.ViewedProductCart,
//         payload: [],
//       };
//     }
//   });

// PRODUCT WISHLIST

viewProductWishlist = action$ =>
  action$.pipe(filter(action => action.type === GitAction.ViewProductWishlist), map(action => {
    return dispatch => {
      try {
        return fetch(url +
          "Product_ItemListInWishlistByUserID?USERID=" + action.payload.userID)
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            if (json[0].ReturnVal === 1) {
              return dispatch({ type: GitAction.ViewedProductWishlist, payload: JSON.parse(json[0].ReturnData) });
            } else {
              //toast.error(json[0].ReturnMsg)
              return dispatch({ type: GitAction.ViewedProductWishlist, payload: [] });
            }
          });
      } catch (error) {
        toast.error("Error Code: viewProductWishlist. Please check on URL")
        return dispatch({ type: GitAction.ViewedProductWishlist, payload: [] });
      }
    }
  }));

  addProductWishlist = action$ =>
    action$.pipe(filter(action => action.type === GitAction.AddProductWishlist), map(action => {
      return dispatch => {

        try {
          return fetch(url +
            "Product_AddProductWishlist?USERID=" + action.payload.userID +
            "&PRODUCTID=" + action.payload.productID)
            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              if (json[0].ReturnVal === 1) {
                return dispatch({ type: GitAction.AddedProductWishlist, payload: JSON.parse(json[0].ReturnData) });
              } else {
                //toast.error(json[0].ReturnMsg)
                return dispatch({ type: GitAction.AddedProductWishlist, payload: [] });
              }
            });
        } catch (error) {
          toast.error("Error Code: AddProductWishlist. Please check on URL")
          return dispatch({ type: GitAction.AddedProductWishlist, payload: [] });
        }
      }
    }));


deleteProductWishlist = action$ =>
  action$.pipe(filter(action => action.type === GitAction.DeleteProductWishlist), map(action => {
    return dispatch => {
      console.log(url +
        "Product_DeleteProductWishlist?USERWISHLISTID=" + action.payload.userWishlistID)
      try {
        return fetch(url +
          "Product_DeleteProductWishlist?USERWISHLISTID=" + action.payload.userWishlistID)
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            if (json[0].ReturnVal === 1) {
              return dispatch({ type: GitAction.DeletedProductWishlist, payload: JSON.parse(json[0].ReturnData) });
            } else {
              //toast.error(json[0].ReturnMsg)
              return dispatch({ type: GitAction.DeletedProductWishlist, payload: [] });
            }
          });
      } catch (error) {
        toast.error("Error Code: DeleteProductWishlist. Please check on URL")
        return dispatch({ type: GitAction.DeletedProductWishlist, payload: [] });
      }
    }
  }));

// deleteProductWishlist = (action$) =>
//   action$.ofType(GitAction.DeleteProductWishlist).switchMap(async ({ payload }) => {
//     try {
//       const response = await fetch(
//         url +
//         "Product_DeleteProductWishlist?USERWISHLISTID=" +
//         payload.userWishlistID
//       );
//       let json = await response.json();
//       json = JSON.parse(json);
//       if (json[0].ReturnVal === 1) {
//         toast.success("Product " + payload.productName + " is removed from wishlist!");
//       }
//       try {
//         const response = await fetch(
//           url +
//           "Product_ItemListInWishlistByUserID?USERID=" +
//           payload.userID
//         );
//         let json = await response.json();
//         json = JSON.parse(json);
//         return {
//           type: GitAction.DeletedProductWishlist,
//           payload: json,
//         };
//       } catch (error) {
//         alert("viewProductWishlist: " + error)
//         return {
//           type: GitAction.ViewedProductWishlist,
//           payload: [],
//         };
//       }
//     } catch (error) {
//       alert("deleteProductWishlist: " + error)
//       return {
//         type: GitAction.DeletedProductWishlist,
//         payload: [],
//       };
//     }
//   });

// COUNTRY

getCountry = action$ =>
  action$.pipe(filter(action => action.type === GitAction.GetCountry), map(action => {
    return dispatch => {
      try {
        return fetch(url + "General_CountryList")
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            if (json[0].ReturnVal === 1) {
              return dispatch({ type: GitAction.GotCountry, payload: JSON.parse(json[0].ReturnData) });
            } else {
              //toast.error(json[0].ReturnMsg)
              return dispatch({ type: GitAction.GotCountry, payload: [] });
            }
          });
      } catch (error) {
        toast.error("Error Code: GetCountry. Please check on URL")
        return dispatch({ type: GitAction.GotCountry, payload: [] });
      }
    }
  }));

General_ViewState = action$ =>
  action$.pipe(filter(action => action.type === GitAction.GetState), map(action => {
    return dispatch => {
      try {
        return fetch(url + "General_ViewState")
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            if (json[0].ReturnVal === 1) {
              return dispatch({ type: GitAction.GotState, payload: JSON.parse(json[0].ReturnData) });
            } else {
              //toast.error(json[0].ReturnMsg)
              return dispatch({ type: GitAction.GotState, payload: [] });
            }
          });
      } catch (error) {
        toast.error("Error Code: GetCountry. Please check on URL")
        return dispatch({ type: GitAction.GotState, payload: [] });
      }
    }
  }));

getBanner = action$ =>
  action$.pipe(filter(action => action.type === GitAction.GetBanner), map(action => {
    return dispatch => {
      try {
        return fetch(url + "General_ViewBanner?PROJECTID=2")
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            if (json[0].ReturnVal === 1) {
              return dispatch({ type: GitAction.GotBanner, payload: JSON.parse(json[0].ReturnData) });
            } else {
              //toast.error(json[0].ReturnMsg)
              return dispatch({ type: GitAction.GotBanner, payload: [] });
            }
          });
      } catch (error) {
        toast.error("Error Code: GotBanner. Please check on URL")
        return dispatch({ type: GitAction.GotBanner, payload: [] });
      }
    }
  }));

// All Courier Service

getAllCourierService = action$ =>
  action$.pipe(filter(action => action.type === GitAction.GetCourierService), map(action => {
    return dispatch => {
      try {
        return fetch(url + "User_ViewCourierService")
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            if (json[0].ReturnVal === 1) {
              return dispatch({ type: GitAction.GotCourierService, payload: JSON.parse(json[0].ReturnData) });
            } else {
              //toast.error(json[0].ReturnMsg)
              return dispatch({ type: GitAction.GotCourierService, payload: [] });
            }
          });
      } catch (error) {
        toast.error("Error Code: getAllCourierService. Please check on URL")
        return dispatch({ type: GitAction.GotCourierService, payload: [] });
      }
    }
  }));

// All Payment Method

getAllPaymentMethod = action$ =>
  action$.pipe(filter(action => action.type === GitAction.GetPaymentMethod), map(action => {
    return dispatch => {
      try {
        return fetch(url + "General_ViewPaymentMethod")
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            if (json[0].ReturnVal === 1) {
              return dispatch({ type: GitAction.GotPaymentMethod, payload: JSON.parse(json[0].ReturnData) });
            } else {
              //toast.error(json[0].ReturnMsg)
              return dispatch({ type: GitAction.GotPaymentMethod, payload: [] });
            }
          });
      } catch (error) {
        toast.error("Error Code: getAllPaymentMethod. Please check on URL")
        return dispatch({ type: GitAction.GotPaymentMethod, payload: [] });
      }
    }
  }));

// CREDIT CARD

getAllCreditCard = action$ =>
  action$.pipe(filter(action => action.type === GitAction.GetCreditCard), map(action => {
    return dispatch => {
      try {
        return fetch(url + "User_ViewUserPaymentMethod?USERID=" + action.payload)
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            if (json[0].ReturnVal === 1) {
              return dispatch({ type: GitAction.GotCreditCard, payload: JSON.parse(json[0].ReturnData) });
            } else {
              //toast.error(json[0].ReturnMsg)
              return dispatch({ type: GitAction.GotCreditCard, payload: [] });
            }
          });
      } catch (error) {
        toast.error("Error Code: getAllCreditCard. Please check on URL")
        return dispatch({ type: GitAction.GotCreditCard, payload: [] });
      }
    }
  }));

addCreditCard = action$ =>
  action$.pipe(filter(action => action.type === GitAction.AddCreditCard), map(action => {
    return dispatch => {
      try {
        return fetch(url +
          "User_AddPaymentMethod?USERID=" + action.payload.USERID +
          "&USERCARDNAME=" + action.payload.name +
          "&USERCARDNO=" + action.payload.number +
          "&USERCARDEXPIREDATE=" + action.payload.expiry +
          "&USERCARDTYPE=" + action.payload.cardtype)
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            if (json[0].ReturnVal === 1) {
              return dispatch({ type: GitAction.AddedCreditCard, payload: JSON.parse(json[0].ReturnData) });
            } else {
              //toast.error(json[0].ReturnMsg)
              return dispatch({ type: GitAction.AddedCreditCard, payload: [] });
            }
          });
      } catch (error) {
        toast.error("Error Code: addCreditCard. Please check on URL")
        return dispatch({ type: GitAction.AddedCreditCard, payload: [] });
      }
    }
  }));

// addCreditCard = (action$) =>
//   action$.ofType(GitAction.AddCreditCard).switchMap(async ({ payload }) => {
//     try {
//       const response = await fetch(
//         url +
//         "User_AddPaymentMethod?USERID=" +
//         payload.USERID +
//         "&USERCARDNAME=" +
//         payload.name +
//         "&USERCARDNO=" +
//         payload.number +
//         "&USERCARDEXPIREDATE=" +
//         payload.expiry +
//         "&USERCARDTYPE=" +
//         payload.cardtype
//       );
//       let json = await response.json();
//       json = JSON.parse(json);
//       if (json[0].ReturnVal === 1) {
//         toast.success("Credit Card successfully added");
//       }
//       try {
//         const response_1 = await fetch(
//           url +
//           "User_ViewUserPaymentMethod?USERID=" +
//           payload.USERID
//         );
//         let json_1 = await response_1.json();
//         json_1 = JSON.parse(json_1);
//         return {
//           type: GitAction.AddedCreditCard,
//           payloadCondition: json,
//           payloadValue: json_1,
//         };
//       } catch (error) {
//         alert('getAllCreditCard: ' + error);
//         return {
//           type: GitAction.AddedCreditCard,
//           payloadCondition: [],
//           payloadValue: [],
//         };
//       }
//     } catch (error) {
//       alert('addCreditCard: ' + error);
//       return {
//         type: GitAction.GotCreditCard,
//         payloadCondition: [],
//         payloadValue: [],
//       };
//     }
//   });

updateCreditCard = action$ =>
  action$.pipe(filter(action => action.type === GitAction.UpdateCreditCard), map(action => {
    return dispatch => {
      try {
        return fetch(url +
          "User_UpdatePaymentMethod?USERPAYMENTMETHODID=" + action.payload.USERPAYMENTMETHODID +
          "&USERID=" + action.payload.USERID +
          "&USERCARDNAME=" + action.payload.name +
          "&USERCARDNO=" + action.payload.number +
          "&USERCARDEXPIREDATE=" + action.payload.expiry +
          "&USERCARDTYPE=" + action.payload.cardtype)
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            if (json[0].ReturnVal === 1) {
              return dispatch({ type: GitAction.UpdatedCreditCard, payload: JSON.parse(json[0].ReturnData) });
            } else {
              //toast.error(json[0].ReturnMsg)
              return dispatch({ type: GitAction.UpdatedCreditCard, payload: [] });
            }
          });
      } catch (error) {
        toast.error("Error Code: UpdateCreditCard. Please check on URL")
        return dispatch({ type: GitAction.UpdatedCreditCard, payload: [] });
      }
    }
  }));

// updateCreditCard = (action$) =>
//   action$.ofType(GitAction.UpdateCreditCard).switchMap(async ({ payload }) => {
//     try {
//       const response = await fetch(
//         url +
//         "User_UpdatePaymentMethod?USERPAYMENTMETHODID=" +
//         payload.USERPAYMENTMETHODID +
//         "&USERID=" +
//         payload.USERID +
//         "&USERCARDNAME=" +
//         payload.name +
//         "&USERCARDNO=" +
//         payload.number +
//         "&USERCARDEXPIREDATE=" +
//         payload.expiry +
//         "&USERCARDTYPE=" +
//         payload.cardtype
//       );
//       let json = await response.json();
//       json = JSON.parse(json);
//       if (json[0].ReturnVal === 1) {
//         toast.success("Credit Card successfully updated");
//       }
//       try {
//         const response_1 = await fetch(
//           url +
//           "User_ViewUserPaymentMethod?USERID=" +
//           payload.USERID
//         );
//         let json_1 = await response_1.json();
//         json_1 = JSON.parse(json_1);
//         return {
//           type: GitAction.UpdatedCreditCard,
//           payloadCondition: json,
//           payloadValue: json_1,
//         };
//       } catch (error) {
//         alert('getAllCreditCard: ' + error);
//         return {
//           type: GitAction.GotCreditCard,
//           payload: [],
//         };
//       }
//     } catch (error) {
//       alert('updateCreditCard: ' + error);
//       return {
//         type: GitAction.UpdatedCreditCard,
//         payloadCondition: [],
//         payloadValue: [],
//       };
//     }
//   });

deleteCreditCard = action$ =>
  action$.pipe(filter(action => action.type === GitAction.DeleteCreditCard), map(action => {
    return dispatch => {
      try {
        return fetch(url +
          "User_DeletePaymentMethod?USERPAYMENTMETHODID=" + action.payload.cardId)
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            if (json[0].ReturnVal === 1) {
              return dispatch({ type: GitAction.DeletedCreditCard, payload: JSON.parse(json[0].ReturnData) });
            } else {
              //toast.error(json[0].ReturnMsg)
              return dispatch({ type: GitAction.DeletedCreditCard, payload: [] });
            }
          });
      } catch (error) {
        toast.error("Error Code: deleteCreditCard. Please check on URL")
        return dispatch({ type: GitAction.DeletedCreditCard, payload: [] });
      }
    }
  }));

// deleteCreditCard = (action$) =>
//   action$.ofType(GitAction.DeleteCreditCard).switchMap(async ({ payload }) => {
//     try {
//       const response = await fetch(
//         url +
//         "User_DeletePaymentMethod?USERPAYMENTMETHODID=" +
//         payload.cardId
//       );
//       let json = await response.json();
//       json = JSON.parse(json);
//       if (json[0].ReturnVal === 1) {
//         toast.success("Credit Card selected successfully deleted");
//       }
//       try {
//         const response_1 = await fetch(
//           url +
//           "User_ViewUserPaymentMethod?USERID=" +
//           payload.userId
//         );
//         let json_1 = await response_1.json();
//         json_1 = JSON.parse(json_1);

//         return {
//           type: GitAction.DeletedCreditCard,
//           payloadCondition: json,
//           payloadValue: json_1,
//         };
//       } catch (error) {
//         alert('getAllCreditCard: ' + error);
//         return {
//           type: GitAction.GotCreditCard,
//           payload: [],
//         };
//       }
//     } catch (error) {
//       alert('deleteCreditCard: ' + error);
//       return {
//         type: GitAction.DeletedCreditCard,
//         payloadCondition: [],
//         payloadValue: [],
//       };
//     }
//   });

// PRODUCT

getAllProducts = action$ =>
  action$.pipe(filter(action => action.type === GitAction.GetProduct), map(action => {
    return dispatch => {
      try {
        return fetch(url +
          "Product_ItemListByType?Type=" + action.payload.type +
          "&TypeValue=" + action.payload.typeValue +
          "&USERID=" + action.payload.userId +
          "&PROJECTID=2" +
          "&PRODUCTPERPAGE=" + action.payload.productPage +
          "&PAGE=" + action.payload.page +
          "&PLATFORMTYPE=" + platformType)
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            if (json[0].ReturnVal === 1) {
              return dispatch({ type: GitAction.GotProduct, payload: JSON.parse(json[0].ReturnData) });
            } else {
              //toast.error(json[0].ReturnMsg)
              return dispatch({ type: GitAction.GotProduct, payload: [] });
            }
          });
      } catch (error) {
        toast.error("Error Code: getAllProducts. Please check on URL")
        return dispatch({ type: GitAction.GotProduct, payload: [] });
      }
    }
  }));

getProductsListing = action$ =>
  action$.pipe(filter(action => action.type === GitAction.GetProductListing), map(action => {
    return dispatch => {
      try {
        return fetch(url +
          "Product_ItemListByType?Type=" + action.payload.type +
          "&TypeValue=" + action.payload.typeValue +
          "&USERID=" + action.payload.userId +
          "&PROJECTID=2" +
          "&PRODUCTPERPAGE=" + action.payload.productPage +
          "&PAGE=" + action.payload.page +
          "&PLATFORMTYPE=" + platformType)
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            if (json[0].ReturnVal === 1) {
              return dispatch({ type: GitAction.GotProductListing, payload: JSON.parse(json[0].ReturnData) });
            } else {
              //toast.error(json[0].ReturnMsg)
              return dispatch({ type: GitAction.GotProductListing, payload: [] });
            }
          });
      } catch (error) {
        toast.error("Error Code: getProductsListing. Please check on URL")
        return dispatch({ type: GitAction.GotProductListing, payload: [] });
      }
    }
  }));

getProductDetail = action$ =>
  action$.pipe(filter(action => action.type === GitAction.GetProductDetail), map(action => {
    return dispatch => {
      try {
        return fetch(url +
          "Product_ItemDetailByProductID?ProductID=" + action.payload.productId +
          "&USERID=" + action.payload.userId +
          "&PROJECTID=2" +
          "&PLATFORMTYPE=" + platformType)
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            if (json[0].ReturnVal === 1) {
              return dispatch({ type: GitAction.GotProductDetail, payload: JSON.parse(json[0].ReturnData) });
            } else {
              //toast.error(json[0].ReturnMsg)
              return dispatch({ type: GitAction.GotProductDetail, payload: [] });
            }
          });
      } catch (error) {
        toast.error("Error Code: getProductDetail. Please check on URL")
        return dispatch({ type: GitAction.GotProductDetail, payload: [] });
      }
    }
  }));

checkProduct = action$ =>
  action$.pipe(filter(action => action.type === GitAction.CheckProduct), map(action => {
    return dispatch => {
      try {
        return fetch(url +
          "Product_CheckDuplication?PRODUCTNAME=" + action.payload)
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            if (json[0].ReturnVal === 1) {
              return dispatch({ type: GitAction.ProductChecked, payload: JSON.parse(json[0].ReturnData) });
            } else {
              //toast.error(json[0].ReturnMsg)
              return dispatch({ type: GitAction.ProductChecked, payload: [] });
            }
          });
      } catch (error) {
        toast.error("Error Code: checkProduct. Please check on URL")
        return dispatch({ type: GitAction.ProductChecked, payload: [] });
      }
    }
  }));

// PRODUCT VARIATION DETAIL

addProductVariationDetail = action$ =>
  action$.pipe(filter(action => action.type === GitAction.AddProductVariationDetail), map(action => {
    return dispatch => {
      try {
        return fetch(url +
          "Product_AddProductVariationDetail?PRODUCTVARIATIONID=" + action.payload.ProductVariation +
          "&PRODUCTID=" + action.payload.ProductID +
          "&CUSTOMIZABLE=" + action.payload.Customizable +
          "&VALUE=" + action.payload.Value +
          "&PRODUCTSTOCK=" + action.payload.stock +
          "&PRODUCTVARIATIONSKU=" + action.payload.sku +
          "&PRODUCTVARIATIONPRICE=" + action.payload.price)
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            if (json[0].ReturnVal === 1) {
              return dispatch({ type: GitAction.AddedProductVariationDetail, payload: JSON.parse(json[0].ReturnData) });
            } else {
              //toast.error(json[0].ReturnMsg)
              return dispatch({ type: GitAction.AddedProductVariationDetail, payload: [] });
            }
          });
      } catch (error) {
        toast.error("Error Code: checkProduct. Please check on URL")
        return dispatch({ type: GitAction.AddedProductVariationDetail, payload: [] });
      }
    }
  }));

updateProductVariationDetail = action$ =>
  action$.pipe(filter(action => action.type === GitAction.UpdateProductVariationDetail), map(action => {
    return dispatch => {
      try {
        return fetch(url +
          "Product_UpdateProductVariationDetails?PRODUCTVARIATIONDETAILID=" + action.payload.ProductVariationDetailID +
          "&CUSTOMIZABLE=" + action.payload.Customizable +
          "&VALUE=" + action.payload.Value +
          "&PRODUCTSTOCK=" + action.payload.stock +
          "&PRODUCTVARIATIONSKU=" + action.payload.sku +
          "&PRODUCTVARIATIONPRICE=" + action.payload.price)
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            if (json[0].ReturnVal === 1) {
              return dispatch({ type: GitAction.UpdatedProductVariationDetail, payload: JSON.parse(json[0].ReturnData) });
            } else {
              //toast.error(json[0].ReturnMsg)
              return dispatch({ type: GitAction.UpdatedProductVariationDetail, payload: [] });
            }
          });
      } catch (error) {
        toast.error("Error Code: updateProductVariationDetail. Please check on URL")
        return dispatch({ type: GitAction.UpdatedProductVariationDetail, payload: [] });
      }
    }
  }));

// PRODUCT VARIATION

getAllProductVariation = action$ =>
  action$.pipe(filter(action => action.type === GitAction.GetProductVariation), map(action => {
    return dispatch => {
      try {
        return fetch(url + "Product_ViewProductVariation")
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            if (json[0].ReturnVal === 1) {
              return dispatch({ type: GitAction.GotProductVariation, payload: JSON.parse(json[0].ReturnData) });
            } else {
              //toast.error(json[0].ReturnMsg)
              return dispatch({ type: GitAction.GotProductVariation, payload: [] });
            }
          });
      } catch (error) {
        toast.error("Error Code: getAllProductVariation. Please check on URL")
        return dispatch({ type: GitAction.GotProductVariation, payload: [] });
      }
    }
  }));

getAllProductVariationByCategoryID = action$ =>
  action$.pipe(filter(action => action.type === GitAction.GetProductVariationByCategoryID), map(action => {
    return dispatch => {
      try {
        return fetch(url + "Product_ViewProductVariationByCategoryID?PRODUCTCATEGORYID=" + action.payload)
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            if (json[0].ReturnVal === 1) {
              return dispatch({ type: GitAction.GotProductVariationByCategoryID, payload: JSON.parse(json[0].ReturnData) });
            } else {
              //toast.error(json[0].ReturnMsg)
              return dispatch({ type: GitAction.GotProductVariationByCategoryID, payload: [] });
            }
          });
      } catch (error) {
        toast.error("Error Code: getAllProductVariationByCategoryID. Please check on URL")
        return dispatch({ type: GitAction.GotProductVariationByCategoryID, payload: [] });
      }
    }
  }));

// PRODUCT CATEGORY

getAllCategories = action$ =>
  action$.pipe(filter(action => action.type === GitAction.GetProductCategory), map(action => {
    return dispatch => {
      try {
        return fetch(url + "Product_CategoryListByAll?PROJECTID=2")
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            if (json[0].ReturnVal === 1) {
              return dispatch({ type: GitAction.GotProductCategory, payload: JSON.parse(json[0].ReturnData) });
            } else {
              //toast.error(json[0].ReturnMsg)
              return dispatch({ type: GitAction.GotProductCategory, payload: [] });
            }
          });
      } catch (error) {
        toast.error("Error Code: getAllProductVariationByCategoryID. Please check on URL")
        return dispatch({ type: GitAction.GotProductCategory, payload: [] });
      }
    }
  }));

getAllCategoriesListing = action$ =>
  action$.pipe(filter(action => action.type === GitAction.GetProductCategoryListing), map(action => {
    return dispatch => {
      try {
        return fetch(url + "Product_CategoryListing?ProjectID=2")
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            if (json[0].ReturnVal === 1) {
              return dispatch({ type: GitAction.GotProductCategoryListing, payload: JSON.parse(json[0].ReturnData) });
            } else {
              //toast.error(json[0].ReturnMsg)
              return dispatch({ type: GitAction.GotProductCategoryListing, payload: [] });
            }
          });
      } catch (error) {
        toast.error("Error Code: getAllCategories. Please check on URL")
        return dispatch({ type: GitAction.GotProductCategoryListing, payload: [] });
      }
    }
  }));

// NOTIFICATION

getNotification = action$ =>
  action$.pipe(filter(action => action.type === GitAction.GetNotification), map(action => {
    return dispatch => {
      try {
        return fetch(url + "Product_CategoryListing")
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            if (json[0].ReturnVal === 1) {
              return dispatch({ type: GitAction.GotNotification, payload: JSON.parse(json[0].ReturnData) });
            } else {
              //toast.error(json[0].ReturnMsg)
              return dispatch({ type: GitAction.GotNotification, payload: [] });
            }
          });
      } catch (error) {
        toast.error("Error Code: getNotification. Please check on URL")
        return dispatch({ type: GitAction.GotNotification, payload: [] });
      }
    }
  }));

// SUPPLIER

getAllSupplierByUserStatus = action$ =>
  action$.pipe(filter(action => action.type === GitAction.GetSupplierByUserStatus), map(action => {
    return dispatch => {
      try {
        return fetch(url + "User_ProfileListByUserStatus?UserStatus=" +
          action.payload +
          "&UserRoleID=15")
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            if (json[0].ReturnVal === 1) {
              return dispatch({ type: GitAction.GotSupplierByUserStatus, payload: JSON.parse(json[0].ReturnData) });
            } else {
              //toast.error(json[0].ReturnMsg)
              return dispatch({ type: GitAction.GotSupplierByUserStatus, payload: [] });
            }
          });
      } catch (error) {
        toast.error("Error Code: getAllSupplierByUserStatus. Please check on URL")
        return dispatch({ type: GitAction.GotSupplierByUserStatus, payload: [] });
      }
    }
  }));

registerSupplier = action$ =>
  action$.pipe(filter(action => action.type === GitAction.RegisterSupplier), map(action => {
    return dispatch => {
      try {
        return fetch(url +
          "User_SupplierRegister?USERNAME=" +
          action.payload.repUsername +
          "&USERPASSWORD=" +
          action.payload.repPassword +
          "&USERFIRSTNAME=" +
          action.payload.repFirstName +
          "&USERLASTNAME=" +
          action.payload.repLastName +
          "&USERCONTACTNO=" +
          action.payload.repContact +
          "&USERDATEBIRTH=" +
          action.payload.repDOB +
          "&USEREMAIL=" +
          action.payload.repEmail +
          "&SUPPLIERNAME=" +
          action.payload.supplierName +
          "&SUPPLIERCONTACTNUMBER=" +
          action.payload.supplierContact +
          "&SUPPLIERWEBSITE=" +
          action.payload.supplierWebsite +
          "&SUPPLIERADDRESSLINE1=" +
          action.payload.supplierAddress1 +
          "&SUPPLIERADDRESSLINE2=" +
          action.payload.supplierAddress2 +
          "&SUPPLIERPOSCODE=" +
          action.payload.supplierPostal +
          "&SUPPLIERCITY=" +
          action.payload.supplierCity +
          "&SUPPLIERSTATE=" +
          action.payload.supplierState +
          "&SUPPLIERCOUNTRYID=2")
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            if (json[0].ReturnVal === 1) {
              return dispatch({ type: GitAction.RegisteredSupplier, payload: JSON.parse(json[0].ReturnData) });
            } else {
              //toast.error(json[0].ReturnMsg)
              return dispatch({ type: GitAction.RegisteredSupplier, payload: [] });
            }
          });
      } catch (error) {
        toast.error("Error Code: registerSupplier. Please check on URL")
        return dispatch({ type: GitAction.RegisteredSupplier, payload: [] });
      }
    }
  }));

endorseSupplier = action$ =>
  action$.pipe(filter(action => action.type === GitAction.EndorseSupplier), map(action => {
    return dispatch => {
      try {
        return fetch(url +
          "User_EndorseSupplier?USERIDS=" + action.payload.selectedData +
          "&USERSTATUS=" + action.payload.status)
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            if (json[0].ReturnVal === 1) {
              return dispatch({ type: GitAction.EndorsedSupplier, payload: JSON.parse(json[0].ReturnData) });
            } else {
              //toast.error(json[0].ReturnMsg)
              return dispatch({ type: GitAction.EndorsedSupplier, payload: [] });
            }
          });
      } catch (error) {
        toast.error("Error Code: endorseSupplier. Please check on URL")
        return dispatch({ type: GitAction.EndorsedSupplier, payload: [] });
      }
    }
  }));

// REVIEW

viewProductReviewByProductID = action$ =>
  action$.pipe(filter(action => action.type === GitAction.GetProductReviewByProductID), map(action => {
    return dispatch => {
      try {
        return fetch(url +
          "Product_ViewReviewByProductID?PRODUCTID=" + action.payload.ProductID +
          "&PARENTPRODUCTREVIEWID=" + action.payload.ParentProductReviewID)
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            if (json[0].ReturnVal === 1) {
              return dispatch({ type: GitAction.GotProductReviewByProductID, payload: JSON.parse(json[0].ReturnData) });
            } else {
              //toast.error(json[0].ReturnMsg)
              return dispatch({ type: GitAction.GotProductReviewByProductID, payload: [] });
            }
          });
      } catch (error) {
        toast.error("Error Code: viewProductReviewByProductID. Please check on URL")
        return dispatch({ type: GitAction.GotProductReviewByProductID, payload: [] });
      }
    }
  }));

viewProductReview = action$ =>
  action$.pipe(filter(action => action.type === GitAction.GetProductReview), map(action => {
    return dispatch => {
      try {
        return fetch(url +
          "Product_ViewProductReview?USERID=" + action.payload.UserID)
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            if (json[0].ReturnVal === 1) {
              return dispatch({ type: GitAction.GotProductReview, payload: JSON.parse(json[0].ReturnData) });
            } else {
              //toast.error(json[0].ReturnMsg)
              return dispatch({ type: GitAction.GotProductReview, payload: [] });
            }
          });
      } catch (error) {
        toast.error("Error Code: viewProductReview. Please check on URL")
        return dispatch({ type: GitAction.GotProductReview, payload: [] });
      }
    }
  }));

addProductReview = action$ =>
  action$.pipe(filter(action => action.type === GitAction.addProductReview), map(action => {
    return dispatch => {
      try {
        return fetch(url +
          "Product_AddReview?PARENTPRODUCTREVIEWID=" + action.payload.parentProductReviewID
          + "&PRODUCTID=" + action.payload.productID
          + "&USERID=" + action.payload.UserID
          + "&PRODUCTREVIEWRATING=" + action.payload.productReviewRating
          + "&PRODUCTREVIEWCOMMENT=" + action.payload.productReviewComment
          + "&REPLYPARENTID=" + action.payload.replyParentID)
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            if (json[0].ReturnVal === 1) {
              return dispatch({ type: GitAction.addedProductReview, payload: JSON.parse(json[0].ReturnData) });
            } else {
              //toast.error(json[0].ReturnMsg)
              return dispatch({ type: GitAction.addedProductReview, payload: [] });
            }
          });
      } catch (error) {
        toast.error("Error Code: viewProductReview. Please check on URL")
        return dispatch({ type: GitAction.addedProductReview, payload: [] });
      }
    }
  }));

// addProductReview = (action$) =>
//   action$.ofType(GitAction.addProductReview).switchMap(async ({ payload }) => {
//     try {
//       const response = await fetch(
//         url +
//         "Product_AddReview?PARENTPRODUCTREVIEWID=" +
//         payload.parentProductReviewID
//         + "&PRODUCTID=" +
//         payload.productID
//         + "&USERID=" +
//         payload.UserID
//         + "&PRODUCTREVIEWRATING=" +
//         payload.productReviewRating
//         + "&PRODUCTREVIEWCOMMENT=" +
//         payload.productReviewComment
//         + "&REPLYPARENTID=" +
//         payload.replyParentID
//       );
//       let json = await response.json();
//       json = JSON.parse(json);
//       if (json[0].ReturnVal === 1) {
//         toast.success("Sucessfully send a review");
//       }
//       try {
//         const response_1 = await fetch(
//           url +
//           "Product_ViewReviewByProductID?PRODUCTID=" +
//           payload.productID +
//           "&PARENTPRODUCTREVIEWID=0"
//         );
//         let json_1 = await response_1.json();
//         return {
//           type: GitAction.addedProductReview,
//           payload: json_1,
//           payload2: json,
//         };
//       } catch (error) {
//         alert('viewProductReviewByProductID: ' + error);
//         return {
//           type: GitAction.addedProductReview,
//           payload: [],
//         };
//       }
//     } catch (error) {
//       alert('addProductReview: ' + error);
//       return {
//         type: GitAction.addedProductReview,
//         payload: [],
//       };
//     }
//   });

// ORDER

AddOrder = action$ =>
  action$.pipe(filter(action => action.type === GitAction.AddOrder), map(action => {
    return dispatch => {
      try {
        return fetch(url + "Order_AddOrder"
          , {
            method: 'POST',

            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Access-Control-Allow-Headers': '*',
            },
            body: JSON.stringify({
              USERID: action.payload.UserID,
              USERADDRESSID: action.payload.UserAddressID,
              PROMOTIONID: 0,
              USERCARTID: action.payload.UserCartID,
              PROMOTIONCODEID: action.payload.PromotionCodeID,
              PAYMENTMETHODID: action.payload.PaymentMethodID,
              USERPAYMENTMETHODID: action.payload.UserPaymentMethodID,
              ORDERTOTALAMOUNT: action.payload.OrderTotalAmount,
              ORDERPAIDAMOUNT: action.payload.OrderPaidAmount,
              ORDERSHIPPINGFEEAMOUNT: action.payload.OrderShippingFee,
              ORDERTAXAMOUNT: action.payload.OrderTax,
              PRODUCTID: action.payload.ProductID,
              PRODUCTQUANTITY: action.payload.ProductQuantity,
              PRODUCTVARIATIONDETAILID: action.payload.ProductVariationDetailID,
              TRACKINGSTATUSID: action.payload.TrackingStatusID,
              PickUpInd: action.payload.PickUpInd,
              TRANSACTIONUUID: action.payload.TRANSACTIONUUID,
              ProjectID: 2,
              fpx_msgToken: action.payload.fpx_msgToken,
              fpx_sellerExOrderNo: action.payload.fpx_sellerExOrderNo,
              fpx_sellerTxnTime: action.payload.fpx_sellerTxnTime,
              fpx_sellerOrderNo: action.payload.fpx_sellerOrderNo,
              fpx_sellerBankCode: action.payload.fpx_sellerBankCode,
              fpx_buyerEmail: action.payload.fpx_buyerEmail,
              fpx_buyerName: action.payload.fpx_buyerName,
              fpx_buyerBankId: action.payload.fpx_buyerBankId,
              fpx_buyerBankBranch: action.payload.fpx_buyerBankBranch,
              fpx_buyerAccNo: action.payload.fpx_buyerAccNo,
              fpx_buyerId: action.payload.fpx_buyerId,
              fpx_makerName: action.payload.fpx_makerName,
              fpx_buyerIban: action.payload.fpx_buyerIban,
              fpx_version: action.payload.fpx_version,
              fpx_productDesc: action.payload.fpx_productDesc
            })
          })
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            if (json[0].ReturnVal === 1) {
              return dispatch({ type: GitAction.AddedOrder, payload: JSON.parse(json[0].ReturnData) });
            } else {
              //toast.error(json[0].ReturnMsg)
              return dispatch({ type: GitAction.AddedOrder, payload: [] });
            }
          });
      } catch (error) {
        toast.error("Error Code: AddOrder. Please check on URL")
        return dispatch({ type: GitAction.AddedOrder, payload: [] });
      }
    }
  }));

// AddOrder = (action$) =>
//   action$.ofType(GitAction.AddOrder).switchMap(async ({ payload }) => {
//     console.log("payload", payload)
//     try {
//       const response = await fetch(
//         url + "Order_AddOrder"
//         , {
//           method: 'POST',
//           headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({
//             USERID: payload.UserID,
//             USERADDRESSID: payload.UserAddressID,
//             PROMOTIONID: 0,
//             PROMOTIONCODEID: 0,
//             PAYMENTMETHODID: payload.PaymentMethodID,
//             USERPAYMENTMETHODID: payload.UserPaymentMethodID,
//             ORDERTOTALAMOUNT: payload.OrderTotalAmount,
//             ORDERPAIDAMOUNT: payload.OrderPaidAmount,
//             PRODUCTID: payload.ProductID,
//             PRODUCTQUANTITY: payload.ProductQuantity,
//             PRODUCTVARIATIONDETAILID: payload.ProductVariationDetailID,
//             TRACKINGSTATUSID: payload.TrackingStatusID,
//             PickUpInd: payload.PickUpInd,
//             TRANSACTIONUUID: payload.TRANSACTIONUUID,
//             ProjectID: 2,

//             // fpx_msgType: payload.fpx_msgType,
//             fpx_msgToken: payload.fpx_msgToken,
//             // fpx_sellerExId: payload.fpx_sellerExId,
//             fpx_sellerExOrderNo: payload.fpx_sellerExOrderNo,
//             fpx_sellerTxnTime: payload.fpx_sellerTxnTime,
//             fpx_sellerOrderNo: payload.fpx_sellerOrderNo,
//             // fpx_sellerId: payload.fpx_sellerId,
//             fpx_sellerBankCode: payload.fpx_sellerBankCode,
//             // fpx_txnCurrency: payload.fpx_txnCurrency,
//             fpx_buyerEmail: payload.fpx_buyerEmail,
//             // fpx_checkSum: payload.fpx_checkSum,

//             fpx_buyerName: payload.fpx_buyerName,
//             fpx_buyerBankId: payload.fpx_buyerBankId,
//             fpx_buyerBankBranch: payload.fpx_buyerBankBranch,
//             fpx_buyerAccNo: payload.fpx_buyerAccNo,
//             fpx_buyerId: payload.fpx_buyerId,
//             fpx_makerName: payload.fpx_makerName,
//             fpx_buyerIban: payload.fpx_buyerIban,
//             fpx_version: payload.fpx_version,
//             fpx_productDesc: payload.fpx_productDesc
//           })
//         }
//       )
//       let json = await response.json();
//       if (json[0].ReturnVal === 1) {
//         toast.success("Order is successfully created ORDERID : " + json[0].OrderID);
//       }
//       try {
//         console.log(url +
//           "Product_DeleteProductCart?USERCARTID=" +
//           payload.UserCartID)
//         const response_1 = await fetch(
//           url +
//           "Product_DeleteProductCart?USERCARTID=" +
//           payload.UserCartID
//         );
//         let json_1 = await response_1.json();
//         return {
//           type: GitAction.AddedOrder,
//           payload: json_1,
//         };
//       } catch (error) {
//         alert('deleteProductCart: ' + error);
//         return {
//           type: GitAction.AddedOrder,
//           payload: [],
//         };
//       }
//     }
//     catch (error) {
//       alert('Order_AddOrder: ' + error);
//       return {
//         type: GitAction.AddedOrder,
//         payload: [],
//       };
//     }
//   });

AddOrder_CreditCard = action$ =>
  action$.pipe(filter(action => action.type === GitAction.AddOrderCreditCard), map(action => {
    return dispatch => {
      try {
        return fetch(url + "Order_AddCreditCardOrder"
          , {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              USERID: action.payload.UserID,
              USERADDRESSID: action.payload.UserAddressID,
              PROMOTIONID: 0,
              USERCARTID: action.payload.UserCartID,
              PROMOTIONCODEID: action.payload.PromotionCodeID,
              PAYMENTMETHODID: action.payload.PaymentMethodID,
              USERPAYMENTMETHODID: action.payload.UserPaymentMethodID,
              ORDERTOTALAMOUNT: action.payload.OrderTotalAmount,
              ORDERPAIDAMOUNT: action.payload.OrderPaidAmount,
              ORDERSHIPPINGFEEAMOUNT: action.payload.OrderShippingFee,
              ORDERTAXAMOUNT: action.payload.OrderTax,
              PRODUCTID: action.payload.ProductID,
              PRODUCTQUANTITY: action.payload.ProductQuantity,
              PRODUCTVARIATIONDETAILID: action.payload.ProductVariationDetailID,
              TRACKINGSTATUSID: action.payload.TrackingStatusID,
              PickUpInd: action.payload.PickUpInd,
              TRANSACTIONUUID: action.payload.TRANSACTIONUUID,
              ProjectID: 2,
              signed_field_names: action.payload.signed_field_names,
              signed_date_time: action.payload.signed_date_time,
              locale: action.payload.locale,
              reference_number: action.payload.reference_number,
              currency: action.payload.currency,
              bill_to_surname: action.payload.bill_to_surname,
              bill_to_forename: action.payload.bill_to_forename,
              bill_to_email: action.payload.bill_to_email,
              bill_to_address_line1: action.payload.bill_to_address_line1,
              bill_to_address_city: action.payload.bill_to_address_city,
              bill_to_address_country: action.payload.bill_to_address_country
            })
          })
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            if (json[0].ReturnVal === 1) {
              return dispatch({ type: GitAction.AddedOrderCreditCard, payload: JSON.parse(json[0].ReturnData) });
            } else {
              //toast.error(json[0].ReturnMsg)
              return dispatch({ type: GitAction.AddedOrderCreditCard, payload: [] });
            }
          });
      } catch (error) {
        toast.error("Error Code: viewProductReview. Please check on URL")
        return dispatch({ type: GitAction.AddedOrderCreditCard, payload: [] });
      }
    }
  }));

// AddOrder_CreditCard = (action$) =>
//   action$.ofType(GitAction.AddOrderCreditCard).switchMap(async ({ payload }) => {
//     try {
//       const response = await fetch(
//         url + "Order_AddCreditCardOrder"
//         , {
//           method: 'POST',
//           headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({
//             USERID: payload.UserID,
//             USERADDRESSID: payload.UserAddressID,
//             PROMOTIONID: 0,
//             PROMOTIONCODEID: 0,
//             PAYMENTMETHODID: payload.PaymentMethodID,
//             USERPAYMENTMETHODID: payload.UserPaymentMethodID,
//             ORDERTOTALAMOUNT: payload.OrderTotalAmount,
//             ORDERPAIDAMOUNT: payload.OrderPaidAmount,
//             PRODUCTID: payload.ProductID,
//             PRODUCTQUANTITY: payload.ProductQuantity,
//             PRODUCTVARIATIONDETAILID: payload.ProductVariationDetailID,
//             TRACKINGSTATUSID: payload.TrackingStatusID,
//             PickUpInd: payload.PickUpInd,
//             TRANSACTIONUUID: payload.TRANSACTIONUUID,
//             ProjectID: 2,

//             signed_field_names: payload.signed_field_names,
//             signed_date_time: payload.signed_date_time,
//             locale: payload.locale,
//             reference_number: payload.reference_number,
//             currency: payload.currency,
//             bill_to_surname: payload.bill_to_surname,
//             bill_to_forename: payload.bill_to_forename,
//             bill_to_email: payload.bill_to_email,
//             bill_to_address_line1: payload.bill_to_address_line1,
//             bill_to_address_city: payload.bill_to_address_city,
//             bill_to_address_country: payload.bill_to_address_country
//           })
//         }
//       )
//       let json = await response.json();
//       if (json[0].ReturnVal === 1) {
//         toast.success("Order is successfully created ORDERID : " + json[0].OrderID);
//       }
//       try {
//         const response_1 = await fetch(
//           url +
//           "Product_DeleteProductCart?USERCARTID=" +
//           payload.UserCartID
//         );
//         let json_1 = await response_1.json();
//         return {
//           type: GitAction.AddedOrderCreditCard,
//           payload: json_1,
//         };
//       } catch (error) {
//         alert('deleteProductCart: ' + error);
//         return {
//           type: GitAction.AddedOrderCreditCard,
//           payload: [],
//         };
//       }
//     }
//     catch (error) {
//       alert('deleteProductCart: ' + error);
//       return {
//         type: GitAction.AddedOrderCreditCard,
//         payload: [],
//       };
//     }
//   });

UpdateOrder_AccountOrder = action$ =>
  action$.pipe(filter(action => action.type === GitAction.UpdateOrder), map(action => {
    return dispatch => {
      try {
        return fetch(url +
          "Order_UpdateOrder?OrderID=" + action.payload.OrderID +
          "&PaymentMethodID=" + action.payload.PaymentMethodID +
          "&UserPaymentMethodID=" + action.payload.UserPaymentMethodID +
          "&OrderTotalAmount=" + action.payload.OrderTotalAmount +
          "&OrderPaidAmount=" + action.payload.OrderPaidAmount +
          "&TRANSACTIONUUID=" + action.payload.TRANSACTIONUUID +
          "&fpx_msgToken=" + action.payload.fpx_msgToken +
          "&fpx_sellerExOrderNo=" + action.payload.fpx_sellerExOrderNo +
          "&fpx_sellerTxnTime=" + action.payload.fpx_sellerTxnTime +
          "&fpx_sellerOrderNo=" + action.payload.fpx_sellerOrderNo +
          "&fpx_sellerBankCode=" + action.payload.fpx_sellerBankCode +
          "&fpx_buyerEmail=" + action.payload.fpx_buyerEmail +
          "&fpx_buyerName=" + action.payload.fpx_buyerName +
          "&fpx_buyerBankId=" + action.payload.fpx_buyerBankId +
          "&fpx_buyerBankBranch=" + action.payload.fpx_buyerBankBranch +
          "&fpx_buyerAccNo=" + action.payload.fpx_buyerAccNo +
          "&fpx_buyerId=" + action.payload.fpx_buyerId +
          "&fpx_makerName=" + action.payload.fpx_makerName +
          "&fpx_buyerIban=" + action.payload.fpx_buyerIban +
          "&fpx_version=" + action.payload.fpx_version +
          "&fpx_productDesc=" + action.payload.fpx_productDesc)
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            if (json[0].ReturnVal === 1) {
              return dispatch({ type: GitAction.UpdatedOrder, payload: JSON.parse(json[0].ReturnData) });
            } else {
              //toast.error(json[0].ReturnMsg)
              return dispatch({ type: GitAction.UpdatedOrder, payload: [] });
            }
          });
      } catch (error) {
        toast.error("Error Code: UpdateOrder_AccountOrder. Please check on URL")
        return dispatch({ type: GitAction.UpdatedOrder, payload: [] });
      }
    }
  }));

UpdateOrder_AccountOrderCreditCard = action$ =>
  action$.pipe(filter(action => action.type === GitAction.UpdateOrder_CreditCard), map(action => {
    return dispatch => {
      try {
        return fetch(url +
          "Order_UpdateOrder_CreditCard?OrderID=" + action.payload.OrderID +
          "&PaymentMethodID=" + action.payload.PaymentMethodID +
          "&UserPaymentMethodID=" + action.payload.UserPaymentMethodID +
          "&OrderTotalAmount=" + action.payload.OrderTotalAmount +
          "&OrderPaidAmount=" + action.payload.OrderPaidAmount +
          "&TRANSACTIONUUID=" + action.payload.TRANSACTIONUUID +
          "&signed_field_names=" + action.payload.signed_field_names +
          "&signed_date_time=" + action.payload.signed_date_time +
          "&locale=" + action.payload.locale +
          "&reference_number=" + action.payload.reference_number +
          "&currency=" + action.payload.currency +
          "&bill_to_surname=" + action.payload.bill_to_surname +
          "&bill_to_forename=" + action.payload.bill_to_forename +
          "&bill_to_email=" + action.payload.bill_to_email +
          "&bill_to_address_line1=" + action.payload.bill_to_address_line1 +
          "&bill_to_address_city=" + action.payload.bill_to_address_city +
          "&bill_to_address_country=" + action.payload.bill_to_address_country)
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            if (json[0].ReturnVal === 1) {
              return dispatch({ type: GitAction.UpdatedOrder_CreditCard, payload: JSON.parse(json[0].ReturnData) });
            } else {
              //toast.error(json[0].ReturnMsg)
              return dispatch({ type: GitAction.UpdatedOrder_CreditCard, payload: [] });
            }
          });
      } catch (error) {
        toast.error("Error Code: UpdateOrder_AccountOrderCreditCard. Please check on URL")
        return dispatch({ type: GitAction.UpdatedOrder_CreditCard, payload: [] });
      }
    }
  }));

// View Order Payment Details - Get FPX status
Order_ViewPaymentDetailsByUUID = action$ =>
  action$.pipe(filter(action => action.type === GitAction.ViewOrderStatus), map(action => {
    return dispatch => {
      try {
        return fetch(url +
          "Order_ViewPaymentDetailsByUUID?Transactionuuid=" + action.payload.Transactionuuid +
          "&ProjectID=2" + "&PaymentType=" + action.payload.paymentType)
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            if (json[0].ReturnVal === 1) {
              return dispatch({ type: GitAction.ViewedOrderStatus, payload: JSON.parse(json[0].ReturnData) });
            } else {
              //toast.error(json[0].ReturnMsg)
              return dispatch({ type: GitAction.ViewedOrderStatus, payload: [] });
            }
          });
      } catch (error) {
        toast.error("Error Code: Order_ViewPaymentDetailsByUUID. Please check on URL")
        return dispatch({ type: GitAction.ViewedOrderStatus, payload: [] });
      }
    }
  }));

// UPDATE TRACKING

updateOrderTrackingNumber = action$ =>
  action$.pipe(filter(action => action.type === GitAction.updateTrackingNumber), map(action => {
    return dispatch => {
      try {
        return fetch(url +
          "Order_UpdateTrackingNumber?ORDERTRACKINGNUMBER=" + action.payload.ORDERTRACKINGNUMBER +
          "&LOGISTICID=" + action.payload.LOGISTICID +
          "&ORDERPRODUCTDETAILSID=" + action.payload.ORDERPRODUCTDETAILSID)
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            if (json[0].ReturnVal === 1) {
              return dispatch({ type: GitAction.updatedTrackingNumber, payload: JSON.parse(json[0].ReturnData) });
            } else {
              //toast.error(json[0].ReturnMsg)
              return dispatch({ type: GitAction.updatedTrackingNumber, payload: [] });
            }
          });
      } catch (error) {
        toast.error("Error Code: Order_ViewPaymentDetailsByUUID. Please check on URL")
        return dispatch({ type: GitAction.updatedTrackingNumber, payload: [] });
      }
    }
  }));


Order_UpdateTrackingStatus = action$ =>
  action$.pipe(filter(action => action.type === GitAction.OrderTrackingStatusUpdate), map(action => {
    return dispatch => {
      try {
        return fetch(url +
          "Order_UpdateTrackingStatus?OrderID=" + action.payload.OrderID +
          "&TrackingStatusID=" + action.payload.TrackingStatusID)
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            if (json[0].ReturnVal === 1) {
              return dispatch({ type: GitAction.OrderTrackingStatusUpdated, payload: JSON.parse(json[0].ReturnData) });
            } else {
              // toast.error(json[0].ReturnMsg)
              return dispatch({ type: GitAction.OrderTrackingStatusUpdated, payload: [] });
            }
          });
      } catch (error) {
        toast.error("Error Code: OrderTrackingStatusUpdated. ")
        return dispatch({ type: GitAction.OrderTrackingStatusUpdated, payload: [] });
      }
    }
  }));


Order_RequestOrderShipmentStatus = action$ =>
  action$.pipe(filter(action => action.type === GitAction.OrderRequestShipmentStatus), map(action => {
    return dispatch => {
      try {
        return fetch(url +
          "Order_RequestOrderStatus?TRACKINGNUMBER=" + action.payload.TRACKINGNUMBER +
          "&TYPE=" + action.payload.TYPE +
          "&PROJECTID=" + action.payload.PROJECTID)
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            if (json[0].ReturnVal === 0) {
              return dispatch({ type: GitAction.OrderRequestedShipmentStatus, payload: JSON.parse(json[0].ReturnData) });
            } else {
              toast.error(json[0].ReturnMsg)
              return dispatch({ type: GitAction.OrderRequestedShipmentStatus, payload: [] });
            }
          });
      } catch (error) {
        toast.error("Error Code: OrderRequestedShipmentStatus. Please check on URL")
        return dispatch({ type: GitAction.OrderRequestedShipmentStatus, payload: [] });
      }
    }
  }));

// DELIVERY

getDeliverableList = action$ =>
  action$.pipe(filter(action => action.type === GitAction.GetDeliverableList), map(action => {
    return dispatch => {
      try {
        return fetch(url + "Order_ViewOrderByIncomplete")
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            if (json[0].ReturnVal === 1) {
              return dispatch({ type: GitAction.GotDeliverableList, payload: JSON.parse(json[0].ReturnData) });
            } else {
              //toast.error(json[0].ReturnMsg)
              return dispatch({ type: GitAction.GotDeliverableList, payload: [] });
            }
          });
      } catch (error) {
        toast.error("Error Code: Order_ViewPaymentDetailsByUUID. Please check on URL")
        return dispatch({ type: GitAction.GotDeliverableList, payload: [] });
      }
    }
  }));

getOrderListByID = action$ =>
  action$.pipe(filter(action => action.type === GitAction.GetOrderListByOrderID), map(action => {
    return dispatch => {
      try {
        return fetch(url +
          "Order_ViewOrderByOrderID?ORDERID=" + action.payload.OrderID)
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            if (json[0].ReturnVal === 1) {
              return dispatch({ type: GitAction.GotOrderListByOrderID, payload: JSON.parse(json[0].ReturnData) });
            } else {
              //toast.error(json[0].ReturnMsg)
              return dispatch({ type: GitAction.GotOrderListByOrderID, payload: [] });
            }
          });
      } catch (error) {
        toast.error("Error Code: getOrderListByID. Please check on URL")
        return dispatch({ type: GitAction.GotOrderListByOrderID, payload: [] });
      }
    }
  }));

Order_CalculateOrderShipping = action$ =>
  action$.pipe(filter(action => action.type === GitAction.GetOrderShippingFee), map(action => {
    return dispatch => {
      try {
        return fetch(url +
          "Order_CalculateOrderShipping?PRODUCTID=" + action.payload.PRODUCTID
          + "&PROJECTID=" + action.payload.PROJECTID
          + "&PRODUCTQUANTITY=" + action.payload.PRODUCTQUANTITY
          + "&POSCODE=" + action.payload.POSCODE)
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            if (json[0].ReturnVal === 1) {
              return dispatch({ type: GitAction.GotOrderShippingFee, payload: JSON.parse(json[0].ReturnData) });
            } else {
              toast.error(json[0].ReturnMsg)
              return dispatch({ type: GitAction.GotOrderShippingFee, payload: [] });
            }
          });
      } catch (error) {
        toast.error("Error Code: Order_CalculateOrderShipping. Please check on URL")
        return dispatch({ type: GitAction.GotOrderShippingFee, payload: [] });
      }
    }
  }));


// PROMOTION

getAllPromotion = action$ =>
  action$.pipe(filter(action => action.type === GitAction.GetPromotion), map(action => {
    return dispatch => {
      try {
        return fetch(url +
          "Promo_ViewPromotion?ACTIVEIND")
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            if (json[0].ReturnVal === 1) {
              return dispatch({ type: GitAction.GotPromotion, payload: JSON.parse(json[0].ReturnData) });
            } else {
              //toast.error(json[0].ReturnMsg)
              return dispatch({ type: GitAction.GotPromotion, payload: [] });
            }
          });
      } catch (error) {
        toast.error("Error Code: getAllPromotion. Please check on URL")
        return dispatch({ type: GitAction.GotPromotion, payload: [] });
      }
    }
  }));

checkPromoCode = action$ =>
  action$.pipe(filter(action => action.type === GitAction.checkPromoCode), map(action => {
    return dispatch => {
      try {
        return fetch(url +
          "Promo_ViewPromoCodeByCode?PROMOCODE=" + action.payload.promoCode)
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            if (json[0].ReturnVal === 1) {
              return dispatch({ type: GitAction.checkedPromoCode, payload: JSON.parse(json[0].ReturnData) });
            } else {
              //toast.error(json[0].ReturnMsg)
              return dispatch({ type: GitAction.checkedPromoCode, payload: [] });
            }
          });
      } catch (error) {
        toast.error("Error Code: checkPromoCode. Please check on URL")
        return dispatch({ type: GitAction.checkedPromoCode, payload: [] });
      }
    }
  }));

getAllProductPromos = action$ =>
  action$.pipe(filter(action => action.type === GitAction.GetPromo), map(action => {
    return dispatch => {
      try {
        return fetch(url +
          "Promo_ViewPromotion?ACTIVEIND=0")
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            if (json[0].ReturnVal === 1) {
              return dispatch({ type: GitAction.GotPromo, payload: JSON.parse(json[0].ReturnData) });
            } else {
              //toast.error(json[0].ReturnMsg)
              return dispatch({ type: GitAction.GotPromo, payload: [] });
            }
          });
      } catch (error) {
        toast.error("Error Code: getAllProductPromos. Please check on URL")
        return dispatch({ type: GitAction.GotPromo, payload: [] });
      }
    }
  }));

getAllPromoCodes = action$ =>
  action$.pipe(filter(action => action.type === GitAction.GetPromoCode), map(action => {
    return dispatch => {
      try {
        return fetch(url +
          "Promo_ViewPromoCode?ACTIVEIND=0")
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            if (json[0].ReturnVal === 1) {
              return dispatch({ type: GitAction.GotPromoCode, payload: JSON.parse(json[0].ReturnData) });
            } else {
              //toast.error(json[0].ReturnMsg)
              return dispatch({ type: GitAction.GotPromoCode, payload: [] });
            }
          });
      } catch (error) {
        toast.error("Error Code: getAllPromoCodes. Please check on URL")
        return dispatch({ type: GitAction.GotPromoCode, payload: [] });
      }
    }
  }));

// TRANSACTION

getAllTransactions = action$ =>
  action$.pipe(filter(action => action.type === GitAction.GetTransactions), map(action => {
    return dispatch => {
      try {
        return fetch(url +
          "Order_ViewOrder?TRACKINGSTATUS=" + action.payload)
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            if (json[0].ReturnVal === 1) {
              return dispatch({ type: GitAction.GotTransactions, payload: JSON.parse(json[0].ReturnData) });
            } else {
              //toast.error(json[0].ReturnMsg)
              return dispatch({ type: GitAction.GotTransactions, payload: [] });
            }
          });
      } catch (error) {
        toast.error("Error Code: getAllTransactions. Please check on URL")
        return dispatch({ type: GitAction.GotTransactions, payload: [] });
      }
    }
  }));

getAllDeliveryList = action$ =>
  action$.pipe(filter(action => action.type === GitAction.GetTransactionsWithDelivery), map(action => {
    return dispatch => {
      try {
        return fetch(url +
          "Order_ViewOrderByDelivery")
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            if (json[0].ReturnVal === 1) {
              return dispatch({ type: GitAction.GotTransactionsWithDelivery, payload: JSON.parse(json[0].ReturnData) });
            } else {
              //toast.error(json[0].ReturnMsg)
              return dispatch({ type: GitAction.GotTransactionsWithDelivery, payload: [] });
            }
          });
      } catch (error) {
        toast.error("Error Code: getAllDeliveryList. Please check on URL")
        return dispatch({ type: GitAction.GotTransactionsWithDelivery, payload: [] });
      }
    }
  }));

getAllTransactionStatus = action$ =>
  action$.pipe(filter(action => action.type === GitAction.GetTransactionStatus), map(action => {
    return dispatch => {
      try {
        return fetch(url +
          "Order_ViewOrderStatus")
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            if (json[0].ReturnVal === 1) {
              return dispatch({ type: GitAction.GotTransactionStatus, payload: JSON.parse(json[0].ReturnData) });
            } else {
              //toast.error(json[0].ReturnMsg)
              return dispatch({ type: GitAction.GotTransactionStatus, payload: [] });
            }
          });
      } catch (error) {
        toast.error("Error Code: getAllTransactionStatus. Please check on URL")
        return dispatch({ type: GitAction.GotTransactionStatus, payload: [] });
      }
    }
  }));

// INVENTORY

// EMAIL SUBSCRIBE

getAllSubs = action$ =>
  action$.pipe(filter(action => action.type === GitAction.GetSubs), map(action => {
    return dispatch => {
      try {
        return fetch(url +
          "Subcriber_ViewSubcriber")
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            if (json[0].ReturnVal === 1) {
              return dispatch({ type: GitAction.GotSubs, payload: JSON.parse(json[0].ReturnData) });
            } else {
              //toast.error(json[0].ReturnMsg)
              return dispatch({ type: GitAction.GotSubs, payload: [] });
            }
          });
      } catch (error) {
        toast.error("Error Code: getAllSubs. Please check on URL")
        return dispatch({ type: GitAction.GotSubs, payload: [] });
      }
    }
  }));

AddSubs = action$ =>
  action$.pipe(filter(action => action.type === GitAction.AddSubcs), map(action => {
    return dispatch => {
      try {
        return fetch(url +
          "Subcriber_AddNew?SUBSCRIBEREMAIL=" + action.payload.SubsMail +
          "&ProjectID=2")
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            if (json[0].ReturnVal === 1) {
              return dispatch({ type: GitAction.AddedSubcs, payload: JSON.parse(json[0].ReturnData) });
            } else {
              //toast.error(json[0].ReturnMsg)
              return dispatch({ type: GitAction.AddedSubcs, payload: [] });
            }
          });
      } catch (error) {
        toast.error("Error Code: AddSubs. Please check on URL")
        return dispatch({ type: GitAction.AddedSubcs, payload: [] });
      }
    }
  }));


getAllMerchants = action$ =>
  action$.pipe(filter(action => action.type === GitAction.GetMerchants), map(action => {
    return dispatch => {
      try {
        return fetch(url + "User_ProfileListByType?TYPE=" + action.payload.type +
          "&TYPEVALUE=" + action.payload.typeValue +
          "&USERID=" + action.payload.USERID +
          "&PROJECTID=2" +
          "&UserRoleID=" + action.payload.userRoleID +
          "&LISTPERPAGE=" + action.payload.productPage +
          "&PAGE=" + action.payload.page)
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            if (json[0].ReturnVal === 1) {
              return dispatch({ type: GitAction.GotMerchants, payload: JSON.parse(json[0].ReturnData) });
            } else {
              //toast.error(json[0].ReturnMsg)
              return dispatch({ type: GitAction.GotMerchants, payload: [] });
            }
          });
      } catch (error) {
        toast.error("Error Code: getAllMerchants. Please check on URL")
        return dispatch({ type: GitAction.GotMerchants, payload: [] });
      }
    }
  }));

getAllMerchantOrders = action$ =>
  action$.pipe(filter(action => action.type === GitAction.GetMerchantOrders), map(action => {
    return dispatch => {
      try {
        return fetch(url +
          "Order_ViewOrderByUserID?TRACKINGSTATUS=" + action.payload.trackingStatus +
          "&USERID=" + action.payload.UserID)
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            if (json[0].ReturnVal === 1) {
              return dispatch({ type: GitAction.GotMerchantOrders, payload: JSON.parse(json[0].ReturnData) });
            } else {
              //toast.error(json[0].ReturnMsg)
              return dispatch({ type: GitAction.GotMerchantOrders, payload: [] });
            }
          });
      } catch (error) {
        toast.error("Error Code: getAllMerchants. Please check on URL")
        return dispatch({ type: GitAction.GotMerchantOrders, payload: [] });
      }
    }
  }));

// PRODUCT ORDERS

getAllProductOrders = action$ =>
  action$.pipe(filter(action => action.type === GitAction.GetProductOrders), map(action => {
    return dispatch => {
      try {
        return fetch(url +
          "Order_ViewSummaryOrderProduct")
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            if (json[0].ReturnVal === 1) {
              return dispatch({ type: GitAction.GotProductOrders, payload: JSON.parse(json[0].ReturnData) });
            } else {
              //toast.error(json[0].ReturnMsg)
              return dispatch({ type: GitAction.GotProductOrders, payload: [] });
            }
          });
      } catch (error) {
        toast.error("Error Code: getAllProductOrders. Please check on URL")
        return dispatch({ type: GitAction.GotProductOrders, payload: [] });
      }
    }
  }));

getProductStockByStatus = action$ =>
  action$.pipe(filter(action => action.type === GitAction.GetProductOrders), map(action => {
    return dispatch => {
      try {
        return fetch(url +
          "Order_ViewSummaryOrderProductByStatus?PRODUCTSTOCKSTATUS=" + action.payload.ProductStockStatus +
          "&USERID=" + action.payload.UserID)
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            if (json[0].ReturnVal === 1) {
              return dispatch({ type: GitAction.GotProductStockByStatus, payload: JSON.parse(json[0].ReturnData) });
            } else {
              //toast.error(json[0].ReturnMsg)
              return dispatch({ type: GitAction.GotProductStockByStatus, payload: [] });
            }
          });
      } catch (error) {
        toast.error("Error Code: getProductStockByStatus. Please check on URL")
        return dispatch({ type: GitAction.GotProductStockByStatus, payload: [] });
      }
    }
  }));

//=================================== PAYMENT ===================================//

Payment_Send = action$ =>
  action$.pipe(filter(action => action.type === GitAction.SendPayment), map(action => {
    return dispatch => {
      try {
        return fetch("https://apitest.cybersource.com/pts/v2/payments"
          , {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Signature': 'keyid="08c94330-f618-42a3-b09d-e1e43be5efda", algorithm="HmacSHA256", headers="host (request-target) digest v-c-merchant-id", signature="ldqJNbiFZ0ZhOHzhejvuAaNomlFmXv1xykNAEq7irn4="',
              'Host': 'apitest.cybersource.com',
              'v-c-merchant-id': 'emporiatest',
              'Date': 'Fri, 12 Jul 201900:44:13 GMT'

            },
            body: JSON.stringify({
              clientReferenceInformation: action.payload.clientReferenceInformation,
              paymentInformation: action.payload.paymentInformation,
              orderInformation: action.payload.orderInformation
            })
          })
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            if (json[0].ReturnVal === 1) {
              return dispatch({ type: GitAction.SentPayment, payload: JSON.parse(json[0].ReturnData) });
            } else {
              //toast.error(json[0].ReturnMsg)
              return dispatch({ type: GitAction.SentPayment, payload: [] });
            }
          });
      } catch (error) {
        toast.error("Error Code: Payment_Send. Please check on URL")
        return dispatch({ type: GitAction.SentPayment, payload: [] });
      }
    }
  }));

FPXResponseList_View = action$ =>
  action$.pipe(filter(action => action.type === GitAction.GetProductOrders), map(action => {
    return dispatch => {
      try {
        return fetch(url + "General_FPXResponseList")
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            if (json[0].ReturnVal === 1) {
              return dispatch({ type: GitAction.gotFPXResponseList, payload: JSON.parse(json[0].ReturnData) });
            } else {
              //toast.error(json[0].ReturnMsg)
              return dispatch({ type: GitAction.gotFPXResponseList, payload: [] });
            }
          });
      } catch (error) {
        toast.error("Error Code: FPXResponseList_View. Please check on URL")
        return dispatch({ type: GitAction.gotFPXResponseList, payload: [] });
      }
    }
  }));

BankList_View = action$ =>
  action$.pipe(filter(action => action.type === GitAction.ViewBankList), map(action => {
    return dispatch => {
      try {
        return fetch("https://uat.mepsfpx.com.my/FPXMain/RetrieveBankList"
          , {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: {}
          })
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            if (json[0].ReturnVal === 1) {
              return dispatch({ type: GitAction.ViewedBankList, payload: JSON.parse(json[0].ReturnData) });
            } else {
              //toast.error(json[0].ReturnMsg)
              return dispatch({ type: GitAction.ViewedBankList, payload: [] });
            }
          });
      } catch (error) {
        toast.error("Error Code: BankList_View. Please check on URL")
        return dispatch({ type: GitAction.ViewedBankList, payload: [] });
      }
    }
  }));


// =============================== Postcode ======================================

ViewPostcodesList = action$ =>
  action$.pipe(filter(action => action.type === GitAction.GetPostcodes), map(action => {
    return dispatch => {
      try {
        return fetch(url + "General_PoscodeList")
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            if (json[0].ReturnVal === 1) {
              return dispatch({ type: GitAction.GotPostcodes, payload: JSON.parse(json[0].ReturnData) });
            } else {
              //toast.error(json[0].ReturnMsg)
              return dispatch({ type: GitAction.GotPostcodes, payload: [] });
            }
          });
      } catch (error) {
        toast.error("Error Code: BankList_View. Please check on URL")
        return dispatch({ type: GitAction.GotPostcodes, payload: [] });
      }
    }
  }));
}
export let gitEpic = new GitEpic();
