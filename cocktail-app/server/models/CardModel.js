const mongoose = require("mongoose");

const cardSchema = mongoose.Schema({
  postedBy: { type: mongoose.Schema.ObjectId, ref: "User" },
  created: {
    type: Date,
    default: Date.now,
  },
  strDrink: {
    type: String,
    trim: true,
    minLength: [1, "Must include a cocktail name."],
    required: true,
  },
  strInstructions: {
    type: String,
    trim: true,
    minLength: [1, "Must include instructions."],
    required: true,
  },
  strImageSource: {
    type: String,
    //todo give default picture of cocktail
  },
  strIngredient1: {
    type: String,
    trim: true,
    minLength: [1, "Must include at least 2 ingredients."],
    required: true,
  },
  strIngredient2: {
    type: String,
    trim: true,
    minLength: [1, "Must include at least 2 ingredients."],
    required: true,
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
    trim: true,
    required: true,
  },
  strMeasure2: {
    type: String,
    trim: true,
    required: true,
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
