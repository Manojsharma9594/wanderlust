const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

main()
  .then(() => {
    console.log("connection is build");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

app.get("/", (req, res) => {
  res.redirect("/listings");
});

// listing route

app.get("/listings", async (req, res) => {
  const allListing = await Listing.find({});
  res.render("listings/index.ejs", { allListing });
});

// new route

app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

// post route

app.post("/listings", async (req, res) => {
  const listing = new Listing(req.body.listing);
  await listing.save();
  res.redirect("/listings");
});

// showroute

app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/showroute.ejs", { listing });
});

// edit route

app.get("/listings/:id/edit", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  // console.log(listing);
  res.render("listings/edit.ejs", { listing });
});

// update route

app.put("/listings/:id", async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listings/${id}`);
});

app.delete("/listing/:id", async (req, res) => {
  let { id } = req.params;
  let deletedData = await Listing.findByIdAndDelete(id);
  console.log(deletedData);
  res.redirect("/listings");
});

// app.get("/testlisting", async (req, res) => {
//   let sampleListing = new listing({
//     title: "my villa",
//     discription: "by the beach",
//     price: 1500,
//     location: "ginya, Amya",
//     country: "India",
//   });

//   await sampleListing.save();
//   console.log("sample was saved");
//   res.send("successfully testing");
// });

app.listen(8080, () => {
  console.log("I am listening");
});
