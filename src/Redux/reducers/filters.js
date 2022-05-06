import {types} from "../types";

const initialState = {
  sortBy: "popularity",
  categories: 0,
};

const filters = (state = initialState, action) => {
  if (action.type === types.filters.setSortBy) {
    return {
      ...state,
      sortBy: action.payload,
    };
  }

  if (action.type === types.filters.setCategory) {
    return {
      ...state,
      categories: action.payload,
    };
  }
  return state;
};

export default filters;
