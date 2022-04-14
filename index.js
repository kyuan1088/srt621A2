// use mongoose to connect to mongoDB
// Book is the model used during document creation
// express.js used for routing
// mongoDB link and listening port are added to .env
const mongoose = require("mongoose");
const Book = require("./models/book.js");
const booksController = require("./controllers/booksController");
const express = require("express"),
  app = express();
app.set("view engine", "ejs");

app.set("port", process.env.PORT || 3000);

// add static route to the public folder
app.use(express.static("public"));
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());

require("dotenv").config();
const uri = process.env.ATLAX_URI;

console.log(uri);

mongoose.connect(uri, { useUnifiedTopology: true });

const db = mongoose.connection;

db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

// use the controller to add data to views
app.get("/home", booksController.getAllBook, (req, res, next) => {
  console.log(req.data);
  res.render("home", { books: req.data });
  //   res.send(req.data);
});
app.get(
  "/books/:bookNumber",
  booksController.respondWithName,
  (req, res, next) => {
    console.log(req.data);
    res.render("books", { bookDetail: req.data });
  }
);
app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});

// **Code below are not used, just for note taking purpose **//

// var myQuery = Book.findOne({
//   name: "kyuan101",
// }).where("author", /seneca/);

// myQuery.exec((error, data) => {
//   if (data) console.log(data.name + ":" + data.author);
// });

// Book.create(
//   {
//     name: "The Eye of the World",
//     author: "Robert Jordan",
//     link:
//       "https://www.amazon.ca/Eye-World-Book-Wheel-Time/dp/1250768683/ref=sr_1_3?crid=31SJVU5KXJ7K9&keywords=the+eye+of+the+world&qid=1649892867&sprefix=the+eye+of+the+world%2Caps%2C92&sr=8-3",
//     id: 3,
//   },

//   function (error, savedDocument) {
//     if (error) console.log(error);
//     console.log(savedDocument);
//   }
// );
