const express = require("express");
const qs = require("qs");
const axios = require("axios");
const app = express();
const mongoose = require("mongoose");
const needle = require("needle");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const JWT_SECRET =
  "gfjgfhjhhkhgkhg67867867686()gggkk?[]uyuiyy68587587ghgg[]]fhfjgfj6786";
const mongoUrl = "mongodb+srv://dbuser:1234@cluster0.sq9rrxz.mongodb.net/test";

const bearerToken =
  "AAAAAAAAAAAAAAAAAAAAADjylAEAAAAAm3Et7T%2F2fJfd1biJoQTO1bkgLnk%3DrSlBZvRUlnC1LjmhQxfxE5XAGfTV4BfgpxjfhRqO1xCtnc5aog";
const LINKEDIN_CLIENT_ID = "774pwec0qf8bfq";
const LINKEDIN_CLIENT_SECRET = "UeOe2d8CSJMjfUlB";
const LINKEDIN_REDIRECT_URI = "http://localhost:3000/linkedin";

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));

require("./userDetails");

const User = mongoose.model("UserInfo");

app.post("/register", async (req, res) => {
  const { name, email, phone } = req.body;

  try {
    if (!(name && email && phone)) {
      return res.send({ error: "All inputs are Required" });
    }

    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.send({ error: "User Exists" });
    }
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?";
    let password = "";
    const test = "1234";
    for (let i = 0; i < 12; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "bristi0654@gmail.com",
        pass: "hicu ttjs hvsh uiuf",
      },
    });

    const mailOptions = {
      from: "bristi0654@gmail.com",
      to: email,
      subject: "Your Password",
      text: password,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent successfully:", info.response);
      }
    });
    await User.create({
      name,
      email,
      phone,
      password,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "All inputs are Required" });
  }
});

app.post("/id", async (req, res) => {
  const { emi } = req.body;

  try {
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "Some error" });
  }
});

app.post("/login-user", async (req, res) => {
  const { email, password } = req.body;
  if (!(email && password)) {
    return res.send({ error: "All inputs are Required" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.send({ error: "User Not found" });
  }
  if (user && password !== user.password) {
    return res.send({ error: "Password not match" });
  }

  if (user && password === user.password) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET);

    if (res.status(201)) {
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "InvAlid Password" });
});

app.post("/userData", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    console.log(user);

    const useremail = user.email;
    User.findOne({ email: useremail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
});

app.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser) {
      return res.send({ status: "User does nor Exist" });
    }
    return res.send({ status: "ok", data: oldUser.email });
  } catch (error) {
    res.send({ status: "Some error" });
  }
});

app.post("/reset", async (req, res) => {
  const { newpass, conpass, receivedData } = req.body;

  try {
    if (!(newpass && conpass)) {
      return res.send({ error: "All inputs are Required" });
    }
    if (newpass !== conpass) {
      return res.send({ error: "Password Not matched" });
    }
    console.log(newpass, conpass, receivedData);
    const filter = { email: receivedData };
    const update = { password: newpass };
    await User.findOneAndUpdate(filter, update);
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "Some error" });
  }
});
app.listen(5000, () => {
  console.log("Server Started");
});
