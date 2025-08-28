const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: String,
  description: String,
  image: {
    filename: String,
    url: String,
  },
  price: {
    type: String,
    required: true,
  },
  location: String,
  country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
