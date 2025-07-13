const Book = require('../models/Book');

exports.getAllBooks = async (req, res) => {
  const books = await Book.find().lean();
  // Ensure _id is a string for frontend
  const booksWithId = books.map(book => ({ ...book, _id: book._id.toString() }));
  res.json(booksWithId);
};
