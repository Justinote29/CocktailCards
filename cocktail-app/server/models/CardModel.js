const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
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
  },
  strIngredient1: {
    type: String,
    required: true,
    trim: true,
    minLength: [1, "Must include at least 2 ingredients."],
    required: true,
  },
  strIngredient2: {
    type: String,
    required: true,
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
    required: true,
  },
  strMeasure2: {
    type: String,
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
