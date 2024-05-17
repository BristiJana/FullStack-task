const express = require("express");
const app = express();
const axios = require("axios");
app.use(express.json());
const cors = require("cors");
app.use(cors());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.post("/getall", async (req, res) => {
  try {
    const response = await axios.get("http://coding-assignment.bombayrunning.com/data.json");
    const data = response.data;

    if (!data || data.error) {
      return res.send({ error: data ? data.error : "An error occurred while fetching data" });
    }
    res.send(data);
  } catch (error) {
    res.send({ error: "An error occurred while fetching data" });
  }
});

app.listen(5000, () => {
  console.log("Server Started");
});
