import { QUICKVIEW_CLOSE, QUICKVIEW_OPEN } from "./quickviewActionTypes";

const initialState = {
  open: false,
  product: null,
};

export default function quickviewReducer(state = initialState, action) {
  let newState = state;

  if (action.type === QUICKVIEW_OPEN) {
    console.log("QUICKVIEW_OPEN state=>", state)
    console.log("QUICKVIEW_OPEN action=>", action)
    // newState = {
    //   ...state,
    //   open: true,
    //   product: JSON.parse(JSON.stringify(action.product)),
    //   //   product: action.product,
    // };
  } else if (action.type === QUICKVIEW_CLOSE) {
    newState = {
      ...state,
      open: false,
    };
  }

  return newState;
}
