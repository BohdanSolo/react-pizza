import React from "react";
import PropTypes from "prop-types";

const Categories = React.memo(({ items, onClickItem, activeCategory }) => {
  return (
    <div className="categories">
      <ul>
        {items &&
          items.map((item, i) => (
            <li
              className={activeCategory === i ? "active" : ""}
              onClick={() => onClickItem(i)}
              key={`${item}_${i}`}
            >
              {item}
            </li>
          ))}
      </ul>
    </div>
  );
});

Categories.propTypes = {
  activeCategory: PropTypes.number.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClickItem: PropTypes.func,
};

Categories.defaultTypes = {
  items: [],
  activeCategory: 0,
};

export default Categories;
