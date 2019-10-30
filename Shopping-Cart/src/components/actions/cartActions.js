import {
  ADD_ITEM,
  SUB_ITEM,
  SUB_QUANTITY,
  ADD_QUANTITY,
  ADD_SHIPPING,
  SUB_SHIPPING
} from "./action-types/cart-actions";

export const addToCart = id => {
  return {
    type: ADD_ITEM,
    id
  };
};
export const addToCartMongo = id => {
  return dispatch => {
    dispatch(addToCart(id));
    return fetch("http://localhost:3002/post-data", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id })
    }).catch(err => console.log(err));
  };
};
export const removeItem = id => {
  return {
    type: SUB_ITEM,
    id
  };
};
export const removeItemMongo = id => {
  return dispatch => {
    dispatch(removeItem(id));
    return fetch("http://localhost:3002/remove-item", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id })
    });
  };
};
export const subtractQuantity = id => {
  return {
    type: SUB_QUANTITY,
    id
  };
};
export const subtractQuantityMongo = id => {
  return dispatch => {
    dispatch(subtractQuantity(id));
    return fetch("http://localhost:3002/subtract-count", {
      method: "POST",
      headers: {
        Accept: "appication/json , text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id })
    });
  };
};
export const addQuantity = id => {
  return {
    type: ADD_QUANTITY,
    id: id
  };
};
export const addQuantityMongo = id => {
  return dispatch => {
    dispatch(addQuantity(id));
    return fetch("http://localhost:3002/add-count", {
      method: "POST",
      headers: {
        Accept: "appication/json , text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id })
    });
  };
};
export const addShipping = () => {
  return {
    type: ADD_SHIPPING
  };
};
export const subShipping = () => {
  return {
    type: SUB_SHIPPING
  };
};
