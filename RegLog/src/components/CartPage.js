import React, { Component } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Navbar from "./navbar";
import '../assets/style/page.css'
export default class CartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      total: 0,
      firstName: "",
      lastName: "",
      address: "",
    };
  }

  componentDidMount() {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    this.setState({ cart: cartData });
    this.calculateTotal(cartData);
  }

  calculateTotal(cartData) {
    let totalPrice = 0;
    cartData.forEach((item) => {
      totalPrice += item.price * item.quantity;
    });
    this.setState({ total: totalPrice });
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { firstName,lastName,address,cart} = this.state;
    if (firstName && lastName && address) {
      fetch("http://localhost:5000/place-order", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          address,
          cart
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error == "All inputs are Required") {
            alert("All inputs are Required");
          }
          if (data.status == "ok") {
            alert("Order placed successfully!");
            localStorage.removeItem("cart");
            window.location.href = "./userDetails";
            this.setState({ cart: [], total: 0});
          }
        });
    } else {
      alert("Please fill all required fields.");
    }
  };

  render() {
    return (
      <div>
      <Navbar brand="E-Commerce" fir="" sec={<AccountCircleIcon />}/>
        <div class="userstyle">
          <h1 class="title">Your Cart Item</h1>
          <br />
          <br />
          <div class="card-deck" style={{ width: "100%" ,marginBottom:"60px"}}>
          {this.state.cart.length > 0 && (
               this.state.cart.map((product) => (
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
              ))
              )}
          </div>
          <div className="row w-100">
            <div className="col-md-12">
              {this.state.cart.length > 0 ? (
                <div>
                  <table className="table" style={{ backgroundColor: "white" }}>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.cart.map((item, index) => (
                        <tr key={index}>
                          <td>{item.name}</td>
                          <td>${item.price}</td>
                          <td>{item.quantity}</td>
                          <td>${item.price * item.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p style={{fontSize:"22px",fontWeight:"bold"}}> Total: ${this.state.total}</p>
                </div>
              ) : (
                <p className="big-head">Your cart is empty.</p>
              )}
            </div>
            <div style={{paddingTop:"60px",alignItems: "center", width: "400px", margin: "0 auto" ,height:"410px" }}>
            
                <form onSubmit={this.handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">
                      First Name:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      name="firstName"
                      value={this.state.firstName}
                      onChange={this.handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">
                      Last Name:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      name="lastName"
                      value={this.state.lastName}
                      onChange={this.handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">
                      Address:
                    </label>
                    <textarea
                      type="text"
                      className="form-control"
                      id="address"
                      name="address"
                      value={this.state.address}
                      onChange={this.handleInputChange}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Place Order
                  </button>
                </form>
             
            </div>
          </div>
        </div>
      </div>
    );
  }
}
