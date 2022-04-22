var Book = require("../models/book");

// route to Home page
exports.getHomePage = (req, res) => {
  res.render("home");
};
// Use the find() method to query all documents in the Book collection.
exports.getAllBook = (req, res, next) => {
  Book.find({}, (error, books) => {
    if (error) next(error);
    req.data = books;
    next();
  });
};

// Use the objectID from mongoDB to identify which book is queried by the user
// The objectID of a book will be part of the URL using this method instead of /1 /2 /3.
// Easier to manage if many books are added or deleted regularly to the Book collection on mongoDB.
exports.respondWithName = (req, res, next) => {
  let paramsName = req.params.bookNumber;
  Book.findById(paramsName, (error, bookDetail) => {
    if (error) next(error);
    req.data = bookDetail;
    next();
  });
};

// route to AddNewBook submite page
exports.getSubmitPage = (req, res) => {
  res.render("AddNewBook");
};

// route to DeleteABook page
exports.getDeletePage = (req, res) => {
  res.render("DeleteABook");
};

// route to error page
exports.getErrorPage = (req, res) => {
  res.render("error");
};
// Create a new object using the Book Model
// Save the object to the database collection upon user hit the submit button
// Then redirect back to the home page
exports.saveBook = (req, res, next) => {
  let newBook = new Book({
    name: req.body.name,
    trueName: req.body.name,
    author: req.body.author,
    link: req.body.link,
  });
  newBook.save((error, result) => {
    if (error) {
      console.log(
        "Error detected when adding new book, potentially duplicate book name"
      );
      return res.redirect("error");
    }
    console.log(result);
    res.redirect("home");
  });
};

// ** Below are previous code for lab 10, left only for reference on changes for personal use **

// exports.respondWithName = (req, res, next) => {
//   let paramsName = req.params.bookNumber;
//   Book.findOne({ id: paramsName }, (error, bookDetail) => {
//     if (error) next(error);
//     req.data = bookDetail;
//     next();
//   });
// };