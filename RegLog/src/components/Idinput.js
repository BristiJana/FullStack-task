import React, { Component, useEffect, useState } from "react";
import "../index.css";
export default class Idinput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: "",

      emi: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:5000/userData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        this.setState({ userData: data.data });
        this.setState({ emi: data.data.email });
      });
  }

  handleSubmit(e) {
    e.preventDefault();

    const { twitid, linkid, emi } = this.state;
    console.log(twitid, linkid, emi);
    fetch("http://localhost:5000/id", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        emi,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.error == "All inputs are Required") {
          alert("All inputs are Required");
        }

        if (data.status == "ok") {
          alert("Connected successful");
          window.location.href = "./userDetails";
        }
      });
  }
  render() {
    return (
      <div class="userstyle">
        <h1 class="title">Hello {this.state.userData.name}</h1>
        <h1>{this.state.emi}</h1>
      </div>
    );
  }
}
