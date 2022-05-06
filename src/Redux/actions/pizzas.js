import { types } from "../types";
import { pizzasAPI } from "../../API/pizzasAPI";

export const setLoaded = (payload) => ({
  type: types.pizzas.setLoaded,
  payload,
});

export const fetchPizzas = (sortBy, categories) => (dispatch) => {
  dispatch({
    type: types.pizzas.setLoaded,
    payload: false,
  });
  pizzasAPI.getPizzas(sortBy, categories).then(({ data }) => {
    dispatch(setPizzas(data));
  });
};
/*У нас цей екшн є асинхронним завдяки бібліотцеці thunk. Він фетчить а лише потім відправляє це все діспатчом в редакс,  в стор. thunk розписаний в файлі стор.  */

export const setPizzas = (items) => ({
  type: types.pizzas.setPizzas,
  payload: items,
});
