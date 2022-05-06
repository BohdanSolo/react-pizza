import {types} from "../types";

export const setSortBy = (name) => ({
  type: types.filters.setSortBy,
  payload: name,
});

export const setCategory = (catIndex) => ({
  type: types.filters.setCategory,
  payload: catIndex,
});
