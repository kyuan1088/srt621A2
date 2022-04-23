// use mongoose to connect to mongoDB
// Book is the model used during document creation
// express.js used for routing
// mongoDB link and listening port are added to .env
const mongoose = require("mongoose");
const booksController = require("./controllers/booksController"),
  errorController = require("./controllers/errorController");
const methodOverride = require("method-override");
const express = require("express"),
  app = express();
app.set("view engine", "ejs");

// using the method override module to make delete a POST request
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);

// add static route to the public folder
app.use(express.static("public"));
app.set("port", process.env.PORT || 3000);

app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());

// Connect to the cloud mongoDB on Atlas
require("dotenv").config();
const uri = process.env.ATLAS_URI;

console.log(uri);

app.get("/home", booksController.getHomePage);

mongoose.connect(uri, { useUnifiedTopology: true });

const db = mongoose.connection;

db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

// use the controller to add data to views
app.get("/home", booksController.getAllBook, (req, res, next) => {
  console.log(req.data);
  res.render("home", { books: req.data });
});
app.get(
  "/books/:bookNumber",
  booksController.respondWithName,
  (req, res, next) => {
    console.log(req.data);
    res.render("books", { bookDetail: req.data });
  }
);
// submit page routes
app.get("/AddNewBook", booksController.getSubmitPage);
app.post("/AddNewBook", booksController.saveBook);

// delete page routes
app.get("/DeleteABook", booksController.getAllBook, (req, res, next) => {
  console.log(req.data);
  res.render("DeleteABook", { books: req.data });
});
app.delete("/books/:bookNumber/delete", booksController.deleteBook);

// Error handling using the errorController.js
app.get("/error", booksController.getErrorPage);
app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

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
