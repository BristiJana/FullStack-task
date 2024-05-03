import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login_component";
import SignUp from "./components/signup_component";
import UserDetails from "./components/userDetails";
import Forgetpassword from "./components/forget_password";
import Home from "./components/Home";
import Reset from "./components/resetpassword";
import CartPage from "./components/CartPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/resspass" element={<Reset />} />
          <Route path="/forget" element={<Forgetpassword />} />
          <Route path="/userDetails" element={<UserDetails />} />
          <Route path="/cart"  element={<CartPage/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
