const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const db = require("./config/keys").mongoURI;
const port = process.env.PORT || 5000;
const tweets = require("./routes/api/tweets");
const users = require("./routes/api/users");

mongoose
  .connect(db, {useNewUrlParser: true})
  .then(() => console.log("Connected to MongoDB successfully."))
  .catch( err => console.log(err));

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("heyo world!"));
app.use("/api/tweets", tweets);
app.use("/api/users", users);

app.listen(port, () => { console.log(`Server is running on port ${port}`)});