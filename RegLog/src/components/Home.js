import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import "./Home.css";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: "",
    };
  }
  componentDidMount() {}
  render() {
    return (
      <div class="main">
        <div class="small">
          <h1 class="title">Welcome to BlockStar</h1>
          <br />
          <br />
          <div className="mb-2">
            <Link
              to={{
                pathname: "/sign-up",
              }}
            >
              <Button size="lg" class="btn">
                Get Started <FaArrowRight />
              </Button>
            </Link>{" "}
          </div>
        </div>
      </div>
    );
  }
}
