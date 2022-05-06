import {types} from "../types";

export const addPizzaToCart = (pizzaObj) => ({
  type: types.cart.addPizzaCart,
  payload: pizzaObj,
});

export const clearCart = () => ({
  type: types.cart.clearCart,
});

export const removeCartItem = (id) => ({
  type: types.cart.removeCartItem,
  payload: id,
});

export const addCartSubItem = (id) => ({
  type: types.cart.addCartSubItem,
  payload: id,
});

export const removeCartSubItem = (id) => ({
  type: types.cart.removeCartSubItem,
  payload: id,
});