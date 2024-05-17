import React from "react";
import { Link } from "react-router-dom";
import "../assets/style/styles.css";

const CriteriaList = ({ item }) => {
  return (
    <div className="main">
      <div className="header-section">
        <div className="header">{item.name}</div>
        <div className={`small ${item.color === "green" ? "green" : "red"}`}>{item.tag}</div>
      </div>
      <div className="body-section">
        {item.criteria.map((criterion, index) => (
          <>
            <p key={index} className={item.criteria.length > 1 ? "margin-btm-10" : "mb-0"}>
              {criterion.type === "plain_text" ? criterion.text : renderLinkedText(criterion, item.id)}
            </p>
            {index !== item.criteria.length - 1 && <p className="margin-btm-10 small"> and </p>}
          </>
        ))}
      </div>
    </div>
  );
};

const renderLinkedText = (criterion, id) => {
  const parts = criterion.text.split(/(\$[0-9]+)/g);
  return (
    <span>
      {parts.map((part, index) => {
        if (part.match(/\$[0-9]+/)) {
          const group = part;
          const value =
            criterion.variable[group].type == "indicator" ? criterion.variable[group].default_value : criterion.variable[group].values[0];
          const encodedValue = encodeURIComponent(group);
          return (
            <Link key={index} to={`/variable/${encodedValue}/${id}`}>
              ({value})
            </Link>
          );
        }
        return part;
      })}
    </span>
  );
};
export default CriteriaList;
