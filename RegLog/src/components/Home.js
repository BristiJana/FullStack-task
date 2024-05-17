import React from "react";
import "../assets/style/styles.css";
import { Link } from "react-router-dom";

const Home = ({ data }) => {
  return (
    <div className="main">
      <ul className="text-left my-3 headers">
        {data.map((item, index) => (
          <li key={index}>
            <Link to={`/item/${item.id}`} className="lisi">
              <div className="top-head">{item.name}</div>
              <div className={`small ${item.color === "green" ? "green" : "red"}`}>{item.tag}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
