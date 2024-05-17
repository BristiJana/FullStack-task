import React from "react";
import { useParams } from "react-router-dom";
import "../assets/style/styles.css";
import CriteriaList from "./CriteriaList";

const ItemDetails = ({ data }) => {
  const { id } = useParams();
  const item = data.find((item) => item.id === parseInt(id));

  if (!item) return <p>Item not found</p>;

  return <CriteriaList item={item} />;
};

export default ItemDetails;
