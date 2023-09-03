import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class Congratulation extends Component {
  render() {
    return (
      <div class="backlogin">
        <h1 style={{ paddingTop: "60px", color: "white" }}>
          <center>Congratulation Registered Succesfully</center>
        </h1>
        <br />
        <Link
          to="/sign-in"
          style={{
            color: "white",
            textDecorationLine: "none",
            fontSize: "30px",
          }}
        >
          Go Back
        </Link>
      </div>
    );
  }
}
