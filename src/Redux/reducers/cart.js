import {types} from "../types";

const initialState = {
  items: {},
  totalPrice: 0,
  totalCount: 0,
};
const getTotalPrice = (arr) => arr.reduce((sum, obj) => sum + obj.price, 0);

const cart = (state = initialState, action) => {
  switch (action.type) {
    case types.cart.addPizzaCart:
      const currentPizzaItems = !state.items[
        action.payload.id
      ] /*Якщо динамічний кі потрібно, тоді обертай ключ в []*/
        ? [action.payload]
        : [
            ...state.items[action.payload.id].items,
            action.payload,
          ]; /*Якщо тернарки не буде тоді буде така помилка:  TypeError: state.items[action.payload.id] is not iterable*/
      const newItem = {
        /*ств newItem, щоб не писати це в ретарн, куз лише так ми можемо отримати актуальні значення totalCount, а не попередні  */
        ...state.items,
        [action.payload.id]: {
          items: currentPizzaItems,
          totalPrice: getTotalPrice(currentPizzaItems),
        },
      };
      const items = Object.values(newItem).map((obj) => obj.items);
      const allPizzas = [].concat.apply(
        [],
        items
      ); /*ця строчка робить з вложеих масивів і об'єктів один однорівневий масив*/
      const totalPrice = getTotalPrice(allPizzas);

      return {
        ...state,
        items: newItem,
        totalCount: allPizzas.length,
        totalPrice: totalPrice,
      };

    case types.cart.clearCart:
      return {
        items: {},
        totalPrice: 0,
        totalCount: 0,
      };

    case types.cart.removeCartItem: {
      const newItem = {
        ...state.items,
      };

      const currentTotalPrice = newItem[action.payload].totalPrice;
      const currentTotalCount = newItem[action.payload].items.length;
      console.log(currentTotalCount);
      delete newItem[action.payload];
      console.log(newItem);
      return {
        ...state,
        items: newItem,
        totalPrice: state.totalPrice - currentTotalPrice,
        totalCount: state.totalCount - currentTotalCount,
      };
    }
    case types.cart.addCartSubItem:
      const newAddedSubItem = [
        ...state.items[action.payload].items,
        state.items[action.payload].items[0],
      ];
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload]: {
            items: newAddedSubItem,
            totalPrice: getTotalPrice(newAddedSubItem),
          },
        },
        totalPrice: state.totalPrice + state.items[action.payload].totalPrice/state.items[action.payload].items.length,
        totalCount: state.totalCount + 1,
      };

    case types.cart.removeCartSubItem:
      const currentItems = state.items[action.payload].items;
      const newRemovedSubItem =
        currentItems.length > 1
          ? state.items[action.payload].items.slice(1)
          : currentItems;
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload]: {
            items: newRemovedSubItem,
            totalPrice: getTotalPrice(newRemovedSubItem),
          },
        },
        totalPrice:
          currentItems.length > 1
            ? state.totalPrice - state.items[action.payload].totalPrice/state.items[action.payload].items.length
            : state.totalPrice,
        totalCount:
          currentItems.length > 1 ? state.totalCount - 1 : state.totalCount,
      };

    default:
      return state;
  }
};

export default cart;
