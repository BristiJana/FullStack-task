import React, { Component, useEffect } from "react";
import { Link } from "react-router-dom";
import "../assets/style/page.css";
export default class Navbar extends Component {
 
  render() {
    const { brand, fir,sec } = this.props;
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              {brand}
            </Link>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/cart">
                   {fir}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="#">
                  {sec}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
    );
  }
}
