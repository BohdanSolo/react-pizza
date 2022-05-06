import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";


const SortPopup = ({
  items,
  activeSortType,
  onClickSortType,
}) => {
  const [visiblePopup, setVisiblePopup] = useState(false);
  const sortRef = useRef();
  const activeLabel = items.find((obj) => obj.type === activeSortType).name;
  const onToggleVisible = () => {
    setVisiblePopup(!visiblePopup);
  };
  /*Краще робити окрему фукцыю ныж анонымну, тобто ніж onClick={() => setVisiblePopup(!visiblePopup). Тому що коли анонімна фнція тоді вона ств кожний раз заново, а це погано впливає на продуктивність. В той час як окреме посилання на фнцію заново її не рендеритьь кожен раз.} */

  /*Чому ця фнція обернена в мемо? Щоб вона не рендерилася зайвий раз, без мемо, наприклад при рендерингу хоум рендериться і цей компонент, а це погано для продуктивності. Тому потрібно обернути її в мемо і ввсі пропси які з Хоум перелаються сюди винисти як константи за межі хоум*/
  const handleOutsideClick = (e) => {
    let path = e.path || (e.composedPath && e.composedPath());
    if (!path.includes(sortRef.current)) {
      setVisiblePopup(false);
    }
  };

  useEffect(() => {
    document.body.addEventListener("click", handleOutsideClick);
    return () => {
      document.body.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const onSelectItem = (type) => {
    if (onClickSortType) {
      onClickSortType(type);
    }
    setVisiblePopup(false);
  };

  return (
    <div className="sort" ref={sortRef}>
      <div className="sort__label">
        <svg
          className={visiblePopup ? "rotate" : ""}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортування по:</b>
        <span onClick={onToggleVisible}>{activeLabel}</span>
      </div>
      {visiblePopup && (
        <div className="sort__popup">
          <ul>
            {items &&
              items.map((obj, i) => (
                <li
                  onClick={() => onSelectItem(obj.type)}
                  className={activeSortType === obj.type ? "active" : ""}
                  key={`${obj.type}_${i}`}
                >
                  {obj.name}
                </li>
              ))}
          </ul>
        </div>

      )}
    </div>
  );
};

SortPopup.propTypes = {
  activeSortType: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClickSortType: PropTypes.func.isRequired,
};

SortPopup.defaultProps = {
  items: [],
};

export default React.memo(SortPopup);
