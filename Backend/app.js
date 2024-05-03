const express = require("express");
const app = express();
const mongoose = require("mongoose");
const products = require('./productsData');
app.use(express.json());
const cors = require("cors");
app.use(cors());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

const jwt = require("jsonwebtoken");
const JWT_SECRET = "gfjgfhjhhkhgkhg67867867686()gggkk?[]uyuiyy68587587ghgg[]]fhfjgfj6786";
const mongoUrl = "mongodb+srv://dbuser:1234@cluster0.sq9rrxz.mongodb.net/test";

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
        res.send({ status: "ok", data: data , context:products});
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


app.post('/place-order', (req, res) => {
  const { firstName, lastName, address, cart } = req.body;
  if (!firstName || !lastName || !address) {
    return res.send({ error: "All inputs are Required" });
  }
  console.log('Order Details:');
  console.log('Cart Items:', cart);
  res.send({ status: "ok" });
});
app.listen(5000, () => {
  console.log("Server Started");
});
