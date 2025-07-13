require('dotenv').config();
const mongoose = require('mongoose');
const Book = require('./models/Book');
const books = require('./books.json');

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    await Book.deleteMany();
    await Book.insertMany(books);
    console.log('Books seeded!');
    process.exit();
  })
  .catch(console.error);
// Ensure the connection is closed after seeding