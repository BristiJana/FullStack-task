import React, { Component } from "react";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import EmailIcon from "@mui/icons-material/Email";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import '../assets/style/page.css'
export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      phone: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { name, email, phone } = this.state;
    console.log(name, email, phone);
    fetch("http://localhost:5000/register", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.error == "All inputs are Required") {
          alert("All inputs are Required");
        }
        if (data.error == "User Exists") {
          alert("User already Exist");
        }
        if (data.error == "Invalid Password") {
          alert("Invalid Password");
        }
        if (data.status == "ok") {
          alert("Registered successful");
          window.location.href = "./userDetails";
        }
      });
  }
  render() {
    return (
      <div className="backsignup">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <form onSubmit={this.handleSubmit}>
              <h3
                style={{
                  color: "black",
                  fontWeight: "bold",
                  marginTop: "30px",
                }}
              >
                Sign Up
              </h3>

              <div className="wrap-input100  m-b-23">
                <span className="label-input100">Name</span>
                <input type="text" className="input100" placeholder="name" onChange={(e) => this.setState({ name: e.target.value })} />
                <span class="focus-input100">
                  <PermIdentityIcon
                className="icon-style"
                  />
                </span>
              </div>

              <div className="wrap-input100  m-b-23">
                <label className="label-input100">Email address</label>
                <input
                  type="email"
                  className="input100"
                  placeholder="Enter email"
                  onChange={(e) => this.setState({ email: e.target.value })}
                />
                <span class="focus-input100">
                  <EmailIcon
                   className="icon-style"
                  />
                </span>
              </div>

              <div className="wrap-input100  m-b-23" style={{ marginBottom: "20px" }}>
                <label className="label-input100">Phone Number</label>
                <input
                  type="text"
                  className="input100"
                  placeholder="Enter phone-number"
                  onChange={(e) => this.setState({ phone: e.target.value })}
                />
                <span class="focus-input100">
                  <LockOpenIcon
                    className="icon-style"
                  />
                </span>
              </div>

              <div className="d-grid">
                <div class="container-login100-form-btn">
                  <div class="wrap-login100-form-btn">
                    <div class="login100-form-bgbtn"></div>
                    <button type="submit" class="login100-form-btn">
                      Sign Up
                    </button>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: "10px", textAlign: "center" }}>
                <span class="txt1 p-b-17">Already registered</span>
                <br />
                <a href="/sign-in" class="txt2" style={{ color: "black" }}>
                  Sign in?
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
