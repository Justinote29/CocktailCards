const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

//this is how we tell express to look in the client folder for static content so it can open up the html and load it.
app.use(express.static("../client"));

//BODY PARSER- lets us pull data out of req.body- We need this for POST requests because they are send req.body-  Still pretty unclear about this
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//1)Connection- in mongoconnection.js, this pulls ALL code from mongoconnection and inserts it into the file.
require("./connections/mongoconnection");

//res.redirect redirects us to localhost:3000/home when we go to localhost:3000 like amazon.com could take us to our homepage.
app.get("/", (req, res) => {
  res.redirect("/home");
});

app.get("/home", (req, res) => {
  res.send("I am home route");
});

app.get("*", (req, res) => {
  res.send("I am the everything else");
});

app.listen(port, () => console.log(`Basic Server on port ${port}`));
