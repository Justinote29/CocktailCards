const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

//this is how we tell express to look in the client folder for static content so it can open up the html and load it.
app.use(express.static("../src/client"));

//BODY PARSER- lets us pull data out of req.body- We need this for POST requests because they are send req.body-  Still pretty unclear about this
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//1) A) Connection- in mongoconnection.js, this pulls ALL code from mongoconnection and inserts it into the file.
require("./connections/mongoconnection");
//B) Model -

const { CardModel } = require("./models/CardModel");

//res.redirect redirects us to localhost:3000/home when we go to localhost:3000 like amazon.com could take us to our homepage.
// app.get("/", (req, res) => {
//   res.redirect("/home");
// });

//user routes

//cocktail routes

app.get("/home", (req, res) => {
  res.send("I am home route");
});

app.get("*", (req, res) => {
  res.send("I am the everything else");
});

//Create data route handler.  for now, I'm just sending the cocktail name in the body (strDrink).

app.post("/create", (req, res) => {
  //need to connect to DB with the model
  //we'll send the DB a body with all the keys/values for our data from what the user typed in.
  //to send to the DB, we'll do teh create method.  We don't need the id b/c mongo will create it.
  CardModel.create({
    strDrink,
  })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log("Error creating data on the backend", err);
      res.status(444).json({ message: "Unable to create data on backend." });
    });
});

app.listen(port, () => console.log(`Basic Server on port ${port}`));
