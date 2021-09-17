import { toast } from "react-toastify";
import {
  CART_RETRIEVE_ITEM,
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_UPDATE_QUANTITIES,
} from "./cartActionTypes";

export function cartAddItemSuccess(product , options = [], quantity = 1) {
  toast.success(`Product "${product.ProductName}" added to cart!`);

  return {
    type: CART_ADD_ITEM,
    product,
    options,
    quantity,
  };
}

// export function cartRetrieveItems(userId) {
//   toast.success("here")
//   console.log("HERE")
//   return {
//     type: CART_RETRIEVE_ITEM,
//     userId
//   };
// }

export function cartRemoveItemSuccess(itemId) {
  return {
    type: CART_REMOVE_ITEM,
    itemId,
  };
}

export function cartUpdateQuantitiesSuccess(quantities) {
  return {
    type: CART_UPDATE_QUANTITIES,
    quantities,
  };
}

export function cartAddItem(product, options = [], quantity = 1) {
  // sending request to server, timeout is used as a stub
  // cartAddItemSuccess(product, options, quantity);
    return (dispatch) =>
      new Promise((resolve) => {
        setTimeout(() => {
          dispatch(cartAddItemSuccess(product, options, quantity));
          resolve();
        }, 500);
      });
}

export function cartRemoveItem(itemId) {
  // sending request to server, timeout is used as a stub
  return (dispatch) =>
    new Promise((resolve) => {
      setTimeout(() => {
        dispatch(cartRemoveItemSuccess(itemId));
        resolve();
      }, 500);
    });
  }

export function cartUpdateQuantities(quantities) {
  // sending request to server, timeout is used as a stub
  return (dispatch) =>
    new Promise((resolve) => {
      setTimeout(() => {
        dispatch(cartUpdateQuantitiesSuccess(quantities));
        resolve();
      }, 500);
    });
}

// export function cartItems(userId) {
//   // sending request to server, timeout is used as a stub
//   console.log("cartItems(userId)", userId)
//   return (dispatch) =>
//   new Promise((resolve) => {
//     setTimeout(() => {
//       dispatch(cartRetrieveItems(userId));
//       resolve();
//     }, 500);
//   });

  // return {

  //   new Promise((resolve) => {
  //     setTimeout(() => {
  //       cartRetrieveItems(userId);
  //       resolve();
  //     }, 500);
  //   });
  // }
  
// }