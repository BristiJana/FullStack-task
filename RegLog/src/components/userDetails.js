import React, { Component, useEffect } from "react";
import "../assets/style/page.css";
import Navbar from "./navbar";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
export default class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: "",
      show: false,
      product: [],
      cart: [],
      total: 0,
    };
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
        this.setState({ product: data.context });
      });
  }

  addToCart = (product) => {
    const existingProductIndex = this.state.cart.findIndex((item) => item.id === product.id);
    if (existingProductIndex !== -1) {
      const updatedCart = [...this.state.cart];
      updatedCart[existingProductIndex].quantity += 1;
      this.setState({ cart: updatedCart }, () => {
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      });
    } else {
      const updatedCart = [...this.state.cart, { ...product, quantity: 1 }];
      this.setState({ cart: updatedCart }, () => {
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      });
    }
  };
  render() {
    return (
      <div>
      <Navbar brand="E-Commerce" fir={<ShoppingCartIcon />} sec={<AccountCircleIcon />}/>
        <div class="userstyle">
          <h1 class="title">Welcome {this.state.userData.name}</h1>
          <br />
          <br />
          <div class="card-deck" style={{ width: "100%" }}>
            {this.state.product.map((product) => (
              <div className="col-md-4 mb-4">
                <div className="card" key={product.id} style={{border:"none"}}>
                  <img src={product.image} className="card-img-top" alt={product.name} style={{ height: "200px" }} />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text"style={{ fontSize: "16px", textAlign: "center"}}>{product.description}</p>

                    <p className="card-text" style={{ fontSize: "20px", fontWeight:"bold"}}>${product.price}</p>
                    <button className="btn btn-primary" onClick={() => this.addToCart(product)}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
