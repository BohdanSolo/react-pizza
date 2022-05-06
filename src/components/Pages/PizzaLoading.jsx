import React from "react";
import ContentLoader from "react-content-loader";

const PizzaLoading = () => {
  return (
    <ContentLoader
      speed={2}
      width={280}
      height={480}
      viewBox="0 0 280 480"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      style={{marginRight: "35px"}}
    >
      <circle cx="134" cy="122" r="117" />
      <rect x="0" y="254" rx="3" ry="3" width="280" height="26" />
      <rect x="0" y="295" rx="6" ry="6" width="280" height="84" />
      <rect x="180" y="102" rx="0" ry="0" width="3" height="13" />
      <rect x="3" y="399" rx="5" ry="5" width="78" height="35" />
      <rect x="166" y="391" rx="20" ry="20" width="114" height="44" />
    </ContentLoader>
  );
};

export default PizzaLoading;
