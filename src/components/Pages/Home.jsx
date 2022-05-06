import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Categories } from "../index";
import SortPopup from "../SortPopup";
import PizzaBlock from "../PizzaBlock";
import { setCategory, setSortBy } from "../../Redux/actions/filters";
import { fetchPizzas } from "../../Redux/actions/pizzas";
import { addPizzaToCart } from "../../Redux/actions/cart";
import PizzaLoading from "./PizzaLoading";

const categoryName = [
  "Всі",
  "М'ясні",
  "Вегетаріанські",
  "Гриль",
  "Гострі",
  "Закриті",
];

const sortItems = [
  { name: "популярності", type: "popularity" },
  { name: "по ціні", type: "price" },
  { name: "по алфавіту", type: "name" },
];

const Home = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.pizzas.items);
  const cartItems = useSelector(({cart}) => cart.items);
  const isLoaded = useSelector((state) => state.pizzas.isLoaded);
  const { categories, sortBy } = useSelector(({ filters }) => filters);
  /*Аналог першого аргументу конекту (mapStateToProps)*/

  /* або const state = ... і певертаємо об'єкт з якого витягуємо те, що потрібно + Ми перекинули це в Хом тому що в Епі воно не вик, піци використовуються лише в Хомі. Ми залишили іспатч в Епі тому, що нам потріно лише раз його віндрендерити. Якщо він буви би в Хомі тоді б кожен раз коли я повертаюся зі корзни в хом рендерилися б піци.    Тепер стор заповнюється піцами в Епі, а дані зі стору я витягаю тут*/
  const onSelectCategory = useCallback(
    (i) => {
      dispatch(setCategory(i));
    },
    [categories, sortBy]
  );

  const onSelectSortType = useCallback((type) => {
    dispatch(setSortBy(type));
  }, []);

  useEffect(() => {
    dispatch(fetchPizzas(sortBy, categories));
    /*2 in App*/
  }, [sortBy, categories]);

  const handleAddPizzaToCart = (obj) => {
    dispatch(addPizzaToCart(obj));
  };

  return (
    <div className="content">
      <div className="container">
        <div className="content__top">
          <Categories
            items={categoryName}
            onClickItem={onSelectCategory}
            activeCategory={categories}
          />
          <SortPopup
            activeSortType={sortBy}
            items={sortItems}
            onClickSortType={onSelectSortType}
          />
        </div>
        <h2 className="content__title">Всі піци</h2>
        <div className="content__items">
          {isLoaded
            ? items.map((obj) => (
                <PizzaBlock
                  onClickAddPizza={handleAddPizzaToCart}
                  key={obj.id}
                  {...obj}
                  addedItemsCart={cartItems[obj.id] && cartItems[obj.id].items.length}
                />
              ))
            : Array(12)
                .fill(0)
                .map((_, i) => <PizzaLoading key={i} />)}
        </div>
      </div>
    </div>
  );
};

export default Home;
