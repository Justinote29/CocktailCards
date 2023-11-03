const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

//for image files
const multer = require("multer");
const AWS = require("aws-sdk");

//todo- set up an s3 bucket to store uploaded photos in and then send the url to mongo.
// Configure Multer to specify where to store uploaded files

const storage = multer.memoryStorage(); // Store files in memory, not on disk
//multer storage for cocktailPic
const upload = multer({ storage: storage });

const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION } = process.env;

// brings in aws-sdk library
const s3 = new AWS.S3({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: AWS_REGION,
});

//this is how we tell express to look in the client folder for static content so it can open up the html and load it.
app.use(express.static("../src/client"));

//BODY PARSER- lets us pull data out of req.body- We need this for POST requests because they are send req.body-
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//give app access to cors
app.use(cors());

//1) A) Connection- in mongoconnection.js, this pulls ALL code from mongoconnection and inserts it into the file.
require("./connections/mongoconnection");
//B) Model -

//bring in models
const { CardModel } = require("./models/CardModel");
const User = require("./models/UserModel");
//res.redirect redirects us to localhost:3000/home when we go to localhost:3000 like amazon.com could take us to our homepage.
// app.get("/", (req, res) => {
//   res.redirect("/home");
// });

//user routes

//create user

//cocktail routes

//save a cocktail after searching for a cocktail to your cocktail cards (save button)

//create cocktail- this will create a card like the one we made when we searched for a cocktail.

app.post("/create", upload.single("cocktailPhoto"), async (req, res) => {
  try {
    //Set CORS headers
    res.set("Access-Control-Allow-Origin", "*");
    //Get the uploaded file
    const cocktailPhoto = req.file;

    //Check if file exists
    if (!cocktailPhoto) {
      return res.status(400).json({ error: "Audio file is missing" });
    }

    const s3Params = {
      Bucket: "mycocktailcardsimages",
      Key: `images/${Date.now()}${cocktailPhoto.originalname}`,
      Body: cocktailPhoto.buffer,
    };

    // Upload the profile picture to S3
    s3.upload(s3Params, async (err, data) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ error: "Failed to upload profile picture to S3" });
      }

      // S3 upload was successful, get the S3 object URL
      const s3CocktailPhotoUrl = data.Location;
      console.log(data);
      try {
        //pull out data from body
        //todo - add other ingredients, measurements and file
        const {
          strDrink,
          strInstructions,
          strIngredient1,
          strIngredient2,
          strIngredient3,
          strIngredient4,
          strIngredient5,
          strIngredient6,
          strIngredient7,
          strIngredient8,
          strMeasure1,
          strMeasure2,
          strMeasure3,
          strMeasure4,
          strMeasure5,
          strMeasure6,
          strMeasure7,
          strMeasure8,
          strMeasure9,
        } = req.body; // fixed syntax error
        // variable usted to save a new cocktail with data send from frontend
        const newCocktailCard = new CardModel({
          strDrink,
          strInstructions,
          strIngredient1,
          strIngredient2,
          strIngredient3,
          strIngredient4,
          strIngredient5,
          strIngredient6,
          strIngredient7,
          strIngredient8,
          strMeasure1,
          strMeasure2,
          strMeasure3,
          strMeasure4,
          strMeasure5,
          strMeasure6,
          strMeasure7,
          strMeasure8,
          strMeasure9,
          file: s3CocktailPhotoUrl,
        });
        //api call to db to save cocktail in db
        try {
          //save cocktail card in db
          const savedCocktailCard = await newCocktailCard.save();
          res.status(201).json(savedCocktailCard); // fixed variable name
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "Server error" });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

//update cocktail

//delete cocktail

//read all of a user's cocktails- for now it will read all the cocktails and later after implementing authentication and creating users we'll have it just return a single user's cocktails

app.get("/mycocktails", (req, res) => {
  CardModel.find({})
    .catch((error) => {
      // if there are issues connecting
      console.log(`Error with reading data on backend: `, error.message);
      res.status(444).json({ message: "Unable to read data on backend." });
    })
    .then((result) => {
      // no issues
      // convert data from database into usable format - happening automatically
      // send back everything from the database to client
      // before we send to client, need to convert to JSON
      res.json(result);
    });
});

app.get("/home", (req, res) => {
  res.send("I am home route");
});

app.get("*", (req, res) => {
  res.send("I am the everything else");
});

app.listen(port, () => console.log(`Basic Server on port ${port}`));
