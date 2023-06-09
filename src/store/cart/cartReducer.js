import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_UPDATE_QUANTITIES,
  CART_RETRIEVE_ITEM
} from "./cartActionTypes";

/**
 * @param {array} items
 * @param {object} product
 * @param {array} options
 * @return {number}
 */

const url = "https://myemporia.my/emporiaApi/api/"
//  const url = "localhost/api/"

function retrieveItem(state, userId) {
  let newItemsList = [];


  fetch(url + "Product_ItemListInCartByUserID?USERID=" + userId)
    .then((response) => response.json())
    .then((json) => {

      if (json !== "fail") {
        json = JSON.parse(json);
      } else {
        json = [];
      }
      if (json !== []) {
        json.map((x) => {
          newItemsList.push(
            {
              id: x.UserCartID,
              product: x,
              options: [],
              price: x.ProductSellingPrice,
              total: x.ProductQuantity * x.ProductSellingPrice,
              quantity: x.ProductQuantity
            }
          )
        })

      }
    })
    .catch((error) => alert("Something went wrong. Error code: Product_ItemListInCartByUserID"));

  return {
    ...state,
    items: newItemsList,
    cartNewItem: newItemsList,
    // cartItemList : json
  };
}

function findItemIndex(items, product, options) {
  return items.findIndex((item) => {
    if (
      item.product.ProductID !== product.ProductID ||
      item.options.length !== options.length
    ) {
      return false;
    }

    for (let i = 0; i < options.length; i += 1) {
      const option = options[i];
      const itemOption = item.options.find(
        (itemOption) =>
          itemOption.optionId === option.optionId &&
          itemOption.valueId === option.valueId
      );

      if (!itemOption) {
        return false;
      }
    }

    return true;
  });

}

function calcSubtotal(items) {
  return items.reduce((subtotal, item) => subtotal + item.total, 0);
}

function calcQuantity(items) {
  return items.reduce((quantity, item) => quantity + item.quantity, 0);
}

function calcTotal(subtotal, extraLines) {
  return (
    subtotal +
    extraLines.reduce((total, extraLine) => total + extraLine.price, 0)
  );
}

function addItem(state, product, options, quantity) {
  const itemIndex = findItemIndex(state.items, product, options);
  let newItems;
  let { lastItemId } = state;

  // state.items.findIndex((x) => {
  //   if (x.product.ProductID === product.ProductID) {
  //     console.log(x)
  //     console.log(x.quantity)
  //     console.log(quantity)
  //     console.log(x.quantity + quantity > product.SKU)

  //     if (x.quantity + quantity > product.SKU === false) {

  //     }
  //   }
  //   if (product.ProductID !== x.product.ProductID) {
  //     console.log(quantity > product.SKU)
  //   }
  // })

  if (itemIndex === -1) {
    lastItemId += 1;
    newItems = [
      ...state.items,
      {
        id: lastItemId,
        product: JSON.parse(JSON.stringify(product)),
        options: JSON.parse(JSON.stringify(options)),
        price: product.ProductSellingPrice,
        total: product.ProductSellingPrice * quantity,
        quantity,
      },
    ];
  } else {
    const item = state.items[itemIndex];

    newItems = [
      ...state.items.slice(0, itemIndex),
      {
        ...item,
        quantity: item.quantity + quantity,
        total: (item.quantity + quantity) * item.product.ProductSellingPrice,
      },
      ...state.items.slice(itemIndex + 1),
    ];
  }

  const subtotal = calcSubtotal(newItems);
  const total = calcTotal(subtotal, state.extraLines);
  return {
    ...state,
    lastItemId,
    subtotal,
    total,
    items: newItems,
    quantity: calcQuantity(newItems),
  };
}

function removeItem(state, itemId) {
  const { items } = state;
  const newItems = items.filter((item) => item.id !== itemId);

  const subtotal = calcSubtotal(newItems);
  const total = calcTotal(subtotal, state.extraLines);

  return {
    ...state,
    items: newItems,
    quantity: calcQuantity(newItems),
    subtotal,
    total,
  };
}

function updateQuantities(state, quantities) {
  let needUpdate = false;

  const newItems = state.items.map((item) => {
    const quantity = quantities.find(
      (x) => x.itemId === item.id && x.value !== item.quantity
    );

    if (!quantity) {
      return item;
    }

    needUpdate = true;

    return {
      ...item,
      quantity: quantity.value,
      total: quantity.value * item.price,
    };
  });

  if (needUpdate) {
    const subtotal = calcSubtotal(newItems);
    const total = calcTotal(subtotal, state.extraLines);

    return {
      ...state,
      items: newItems,
      quantity: calcQuantity(newItems),
      subtotal,
      total,
    };
  }

  return state;
}

/*
 * item example:
 * {
 *   id: 1,
 *   product: {...}
 *   options: [
 *     {optionId: 1, optionTitle: 'Color', valueId: 1, valueTitle: 'Red'}
 *   ],
 *   price: 250,
 *   quantity: 2,
 *   total: 500
 * }
 * extraLine example:
 * {
 *   type: 'shipping',
 *   title: 'Shipping',
 *   price: 25
 * }
 */
const initialState = {
  cartNewItem: [],
  lastItemId: 0,
  quantity: 0,
  items: [],
  subtotal: 0,
  extraLines: [
    // shipping, taxes, fees, .etc
    {
      type: "shipping",
      title: "Shipping",
      price: 25,
    },
    {
      type: "tax",
      title: "Tax",
      price: 0,
    },
  ],
  total: 0,
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case CART_ADD_ITEM:
      return addItem(state, action.product, action.options, action.quantity);

    case CART_REMOVE_ITEM:
      return removeItem(state, action.itemId);

    case CART_UPDATE_QUANTITIES:
      return updateQuantities(state, action.quantities);

    case CART_RETRIEVE_ITEM:
      return retrieveItem(state, action.userId);

    default:
      return state;
  }
}
