import React from "react";
import { useParams } from "react-router-dom";

const VariableValues = ({ data }) => {
  const { variable, id } = useParams();
  const decodedVariable = decodeURIComponent(variable);
  const items = data.find((item) => item.id === parseInt(id));
  const filteredData = items && items.criteria.map((criterion, index) => criterion.variable);
  function ans() {
    return filteredData.map((obj) => obj[decodedVariable]).filter((val) => val !== undefined)[0];
  }
  const final = ans();

  const capitalizeFirstLetter = (string) => {
    if (!string) return string;
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="main">
      {final.type == "indicator" ? (
        <>
          <div class="text-left margin-btm-10 indicator-header">{final.study_type.toUpperCase()}</div>
          <div class="text-left margin-btm-10 indicator-sub-header">Set Parameters</div>
          <div class="indicator-variable-section">
            <div class="left">{capitalizeFirstLetter(final.parameter_name)}</div>
            <input type="text" name="" value={final.default_value} class="right" />
          </div>
        </>
      ) : (
        <ul className="text-left my-3 headers params-array">
          {final.values.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default VariableValues;
