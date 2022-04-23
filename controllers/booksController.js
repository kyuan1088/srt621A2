var Book = require("../models/book");

// route to Home page
exports.getHomePage = (req, res) => {
  res.render("home");
};

// Use the find() method to query all documents in the Book collection.
exports.getAllBook = (req, res, next) => {
  Book.find({}, (error, books) => {
    if (error) {
      console.log("Error detected when grabing a list of book");
      return res.redirect("/home");
    }
    req.data = books;
    next();
  });
};

// Use the objectID from mongoDB to identify which book is queried by the user
// If an error occured like the link is not found, then return to the home page.
exports.respondWithName = (req, res, next) => {
  let objectID = req.params.bookNumber;
  Book.findById(objectID, (error, bookDetail) => {
    if (error) {
      console.log(
        "Error detected when browsing a book's detail, redirect back to home page"
      );
      return res.redirect("/home");
    }
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
exports.saveBook = (req, res) => {
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
    console.log(`${result} | New book added successfully`);
    res.redirect("/home");
  });
};

// Delete a book, if successful redirect back to home page
exports.deleteBook = (req, res) => {
  let objectID = req.params.bookNumber;
  Book.findByIdAndRemove(objectID, (error) => {
    if (error) {
      console.log(`Error removing a book with its ID: ${error}`);
      return res.redirect("DeleteABook");
    }
    console.log("Successfully deleted a book, retuning to home page");
    res.redirect("/home");
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
