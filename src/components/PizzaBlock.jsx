import React, { useState } from "react";

import classNames from "classnames";
import PropTypes from "prop-types";
import {Button} from "./index";

const PizzaBlock = ({ id, name, types, imageUrl, sizes, price, onClickAddPizza, addedItemsCart }) => {
  const [activeType, setActiveType] = useState(types[0]);
  const [activeSize, setActiveSize] = useState(0);
  const availableTypes = ["тонке", "класичне"];
  const availableSizes = [26, 30, 40];

  const onSelectType = (i) => {
    setActiveType(i);
  };

  const onSelectSize = (i) => {
    setActiveSize(i);
  };
  
  const onAddPizza = () => {  /*Знову ж таки краще не ств анон фнції а ств конст і фнцію як тут, тоді вона не буде лишній раз ререндеритися. Але є випадки коли ан фнц ніяк, напрк коли нам потрібно взяти аргумент який іменно прив'язаний до компонента. Як от тут: li в <div className="pizza-block__selector">*/
    const obj = {
      id,
      name,
      imageUrl,
      price,
      size: availableSizes[activeSize],
      type: availableTypes[activeType],
    }
    onClickAddPizza(obj)
  }
  
  return (
    <div className="pizza-block">
      <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      <h4 className="pizza-block__title">{name}</h4>
      <div className="pizza-block__selector">
        <ul>
          {availableTypes.map((name, i) => (
            <li
              className={classNames({
                active: activeType === i,
                disabled: !types.includes(i),
              })}
              onClick={() => onSelectType(i)}
              key={name}
            >
              {name}
            </li>
          ))}
        </ul>
        <ul>
          {availableSizes.map((size, i) => (
            <li
              key={size}
              onClick={() => onSelectSize(i)}
              className={classNames({
                active: activeSize === i,
                disabled: !sizes.includes(size),
              })}
            >
              {size} см.
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">{price}₴</div>
        <Button onClick={onAddPizza} className={"button--outline button--add"}>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Додати</span>
          {addedItemsCart && <i>{addedItemsCart}</i>}
        </Button>
      </div>
    </div>
  );
};

PizzaBlock.propTypes = {
  name: PropTypes.string.isRequired, /*Вказуємо що нейм має бути строкою ітд*/
  price: PropTypes.number.isRequired,
  imageUrl: PropTypes.string.isRequired,
  types: PropTypes.arrayOf(PropTypes.number).isRequired, /*Тайпс має бути масивом чисел*/
  sizes: PropTypes.arrayOf(PropTypes.number).isRequired,
  isLoaded: PropTypes.bool,
  onClickAddPizza: PropTypes.func,
  addedItemsCart: PropTypes.number,
};


/* In efaultTypes ми вказуємо які значенн мають бути по замовчуванню якщо ми в них нічого не передамо. Зазвичай вказуються ті без яких компонент не може жити, зазвичай це пусті масиви  */
PizzaBlock.defaultTypes = {
  name: "str",
  price: 0,
  types: [],
  sizes: [],
  isLoaded: false

}

export default PizzaBlock;
