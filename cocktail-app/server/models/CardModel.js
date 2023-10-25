const mongoose = require("mongoose");

const cardSchema = mongoose.Schema({
  postedBy: { type: mongoose.Schema.ObjectId, ref: "User" },
  strDrink: {
    type: String,
    trim: true,
    minLength: [1, "Must include a cocktail name."],
  },
  strInstructions: {
    type: String,
    trim: true,
    minLength: [1, "Must include instructions."],
  },
  strImageSource: {
    type: String,
  },
  strIngredient1: {
    type: String,
    trim: true,
    minLength: [1, "Must include at least 2 ingredients."],
  },
  strIngredient2: {
    type: String,
    trim: true,
    minLength: [1, "Must include at least 2 ingredients."],
  },
  strIngredient3: {
    type: String,
  },
  strIngredient4: {
    type: String,
  },
  strIngredient5: {
    type: String,
  },
  strIngredient6: {
    type: String,
  },
  strIngredient7: {
    type: String,
  },
  strIngredient8: {
    type: String,
  },
  strMeasure1: {
    type: String,
  },
  strMeasure2: {
    type: String,
  },
  strMeasure3: {
    type: String,
  },
  strMeasure4: {
    type: String,
  },
  strMeasure5: {
    type: String,
  },
  strMeasure5: {
    type: String,
  },
  strMeasure6: {
    type: String,
  },
  strMeasure7: {
    type: String,
  },
  strMeasure8: {
    type: String,
  },
});

const CardModel = mongoose.model("Card", cardSchema);

module.exports = { CardModel };
