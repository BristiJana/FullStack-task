import React, { useState } from "react";
import '../assets/style/page.css'
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useLocation } from "react-router-dom";

function Reset() {
  const [newpass, setNewpass] = useState("");
  const [conpass, setConpass] = useState("");

  const location = useLocation();

  const receivedData = location.state;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/reset", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          newpass,
          conpass,
          receivedData,
        }),
      });

      const data = await response.json();

      console.log(data, "userRegister");

      if (data.error === "All inputs are Required") {
        alert("All inputs are required");
      }
      if (data.error === "Password Not matched") {
        alert("Password not matched");
      }
      if (data.status === "ok") {
        alert("Password Reset Succesfully");
        window.location.href = "./sign-in";
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="backlogin">
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form onSubmit={handleSubmit} className="logform">
            <h3 className="head-style"style={{ color: "black", fontWeight: "bold", marginTop: "30px" }}>Reset Password</h3>

            <div className="wrap-input100  m-b-23">
              <span className="label-input100">New Password</span>
              <input
                type="password"
                className="input100"
                placeholder="Enter new password"
                value={newpass}
                onChange={(e) => setNewpass(e.target.value)}
              />
              <span className="focus-input100">
                <LockOpenIcon
                  className="icon-style"
                />
              </span>
            </div>

            <div className="wrap-input100  m-b-23" style={{ marginBottom: "30px" }}>
              <span className="label-input100">Confirm Password</span>
              <input
                type="password"
                className="input100"
                placeholder="Enter password"
                value={conpass}
                onChange={(e) => setConpass(e.target.value)}
              />
              <span className="focus-input100">
                <LockOpenIcon
                  className="icon-style"
                />
              </span>
            </div>

            <div className="d-grid">
              <div className="container-login100-form-btn">
                <div className="wrap-login100-form-btn">
                  <div className="login100-form-bgbtn"></div>
                  <button type="submit" className="login100-form-btn">
                    Reset
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

export default Reset;
