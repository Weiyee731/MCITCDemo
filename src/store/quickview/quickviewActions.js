import shopApi from "../../api/shop";
import { QUICKVIEW_CLOSE, QUICKVIEW_OPEN } from "./quickviewActionTypes";

let cancelPreviousRequest = () => {};

export function quickviewOpenSuccess(product) {
  return {
    type: QUICKVIEW_OPEN,
    product,
  };
}

export function quickviewClose() {
  return {
    type: QUICKVIEW_CLOSE,
  };
}

export function quickviewOpen(productSlug) {
  return (dispatch) => {
    cancelPreviousRequest();

    return new Promise((resolve) => {
      let canceled = false;
      // sending request to server, timeout is used as a stub

      if (canceled) {
        return;
      }

      if (productSlug) {
        dispatch(quickviewOpenSuccess(productSlug));
      }

      resolve();

      // can remove the below api after all the codes are settle down
      // const timer = setTimeout(() => {
      //   shopApi.getAllProducts().then((product) => {
      //     console.log(product)
      //     if (canceled) {
      //       return;
      //     }

      //     if (product) {
      //       dispatch(quickviewOpenSuccess(product));
      //     }

      //     resolve();
      //   });
      // }, 350);

      // cancelPreviousRequest = () => {
      //   canceled = true;
      //   clearTimeout(timer);
      //   resolve();
      // };
    });
  };
}
