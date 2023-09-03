import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import LockOpenIcon from "@mui/icons-material/LockOpen";

function Forget() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(email);
    var responseClone;
    fetch("http://localhost:5000/forgot-password", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
      }),
    })
      .then((res) => res.json())
      .then(
        (data) => {
          console.log(data, "userRegister");

          if (data.status == "User does nor Exist") {
            alert("User Not found");
          }
          if (data.status == "ok") {
            navigate("/resspass");
          }
          if (data.status == "Some error") {
            alert("Some Error Occur");
          }
        },
        function (rejectionReason) {
          // 3
          console.log(
            "Error parsing JSON from response:",
            rejectionReason,
            responseClone
          ); // 4
          responseClone
            .text() // 5
            .then(function (bodyText) {
              console.log(
                "Received the following instead of valid JSON:",
                bodyText
              ); // 6
            });
        }
      );
    // Your fetch and data handling code
  };

  return (
    <div className="backlogin">
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form onSubmit={handleSubmit} className="logform">
            <h3 className="title">Forget Password</h3>

            <div
              className="wrap-input100 m-b-23"
              style={{ marginBottom: "20px" }}
            >
              <span className="label-input100">Email address</span>
              <input
                type="email"
                className="input100"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="focus-input100">
                <PermIdentityIcon
                  style={{
                    position: "absolute",
                    top: "38px",
                    color: "#adadad",
                  }}
                />
              </span>
            </div>

            <div className="d-grid">
              <div className="container-login100-form-btn">
                <div className="wrap-login100-form-btn">
                  <div className="login100-form-bgbtn"></div>
                  <button type="submit" className="login100-form-btn">
                    Sent Email
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Forget;
