import React, { useState, useEffect } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ItemDetails from "./components/ItemDetails";
import VariableValues from "./components/VariableValues";
function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:5000/getall");
        setData(response.data);
      } catch (error) {
        setError("An error occurred while fetching data");
      }
    };

    fetchData();
  }, []);
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home data={data} />} />
          <Route path="/item/:id" element={<ItemDetails data={data} />} />
          <Route path="/variable/:variable/:id" element={<VariableValues data={data} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
