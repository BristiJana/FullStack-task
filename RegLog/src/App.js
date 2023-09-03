import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Login from "./components/login_component";

import SignUp from "./components/signup_component";
import UserDetails from "./components/userDetails";
import Congratulation from "./components/Congratulation";
import Forgetpassword from "./components/forget_password";
import Home from "./components/Home";
import Idinput from "./components/Idinput";

import UserAccount from "./components/userAccount";
import ConnAccount from "./components/connAccount";
import Tweetpost from "./components/tweetspost";
import Credit from "./components/credit";
import TweeterLink from "./components/tweeterLink";
import Linkpost from "./components/linkpost";
import { LinkedInCallback } from "react-linkedin-login-oauth2";
import Page from "./components/Page";
import Reset from "./components/resetpassword";

function App() {
  return (
    <Router>
      <div className="App">
        {/* <div className="auth-wrapper">
          <div className="auth-inner"> */}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/resspass" element={<Reset />} />
          <Route path="/congratulation" element={<Congratulation />} />
          <Route path="/forget" element={<Forgetpassword />} />
          <Route path="/userDetails" element={<UserDetails />} />
          <Route path="/idinput" element={<Idinput />} />
          <Route path="/useracc" element={<UserAccount />} />
          <Route path="/connacc" element={<ConnAccount />} />
          <Route path="/tweety" element={<Tweetpost />} />
          <Route path="/linky" element={<Linkpost />} />
          <Route path="/credit" element={<Credit />} />
          <Route path="/tweetLink" element={<TweeterLink />} />
          <Route path="/linkedin" element={<LinkedInCallback />} />
          <Route path="/pagee" element={<Page />} />
        </Routes>
        {/* </div>
        </div> */}
      </div>
    </Router>
  );
}

export default App;
