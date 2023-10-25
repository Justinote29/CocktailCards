const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first: {
    type: String,
    trim: true,
    // required: "Name is required"
    //May have to be like....
    // required: [true, 'Name is required']
  },
  last: {
    type: String,
    trim: true,
    // required: "Name is required"
    //May have to be like....
    // required: [true, 'Name is required']
  },
  name: {
    type: String,
    trim: true,
    required: "Name is required",
  },
  email: {
    type: String,
    trim: true,
    required: true,
    // enforces uniqueness for the indexed fields
    unique: true,
    //May have to be done like so
    //unique: [true, 'Email is required]
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
  posts: [{ type: mongoose.Schema.ObjectId, ref: "Cards" }],
});
module.exports = mongoose.model("User", userSchema);
