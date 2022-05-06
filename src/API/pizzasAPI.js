import axios from "axios";

export const BASE_URL = "https://react-pizza-solo.herokuapp.com/api"
export const pizzasAPI = {
  getPizzas(sortBy, categories) {
    return axios.get(
      `${BASE_URL}/pizzas?${
        categories > 0 ? `category=${categories}` : ""
      }&_sort=${sortBy}&_order=desc`
    );
  },
};
