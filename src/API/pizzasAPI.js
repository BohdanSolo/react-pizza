import axios from "axios";

export const pizzasAPI = {
  getPizzas(sortBy, categories) {
    return axios.get(
      `http://localhost:3001/pizzas?${
        categories > 0 ? `category=${categories}` : ""
      }&_sort=${sortBy}&_order=desc`
    );
  },
};
