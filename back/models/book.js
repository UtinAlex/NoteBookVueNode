const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  telephone: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) throw new Error("The phone number does not exist");
    },
  },
});

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;