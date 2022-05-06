import {types} from "../types.js"
const initialState = {
  items: [],
  isLoaded: false,
};

const pizzas = (state = initialState, action) => {
  switch (action.type) {
    case types.pizzas.setPizzas:
      return {
        ...state,
        items: action.payload,
        isLoaded: true,
      };
    case types.pizzas.setLoaded:
      return {
        ...state,
        isLoaded: action.payload,
      };
    default:
      return state;
  }
};

export default pizzas;
