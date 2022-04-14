const Book = require("../models/book");

exports.getAllBook = (req, res, next) => {
  Book.find({}, (error, books) => {
    if (error) next(error);
    req.data = books;
    next();
  });
};

// Use the id field to match with the book name (1,2,3)
exports.respondWithName = (req, res, next) => {
  let paramsName = req.params.bookNumber;
  if (paramsName == 1) {
    Book.findOne({ id: 1 }, (error, bookDetail) => {
      if (error) next(error);
      req.data = bookDetail;
      next();
    });
  } else if (paramsName == 2) {
    Book.findOne({ id: 2 }, (error, bookDetail) => {
      if (error) next(error);
      req.data = bookDetail;
      next();
    });
  } else if (paramsName == 3) {
    Book.findOne({ id: 3 }, (error, bookDetail) => {
      if (error) next(error);
      req.data = bookDetail;
      next();
    });
  }
};
