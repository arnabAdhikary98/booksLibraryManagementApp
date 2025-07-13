const MyBook = require('../models/MyBook');
const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '../db.json');

exports.getMyBooks = async (req, res) => {
  const myBooks = await MyBook.find({ userId: req.user.id }).populate('bookId');
  res.json(myBooks);
};

exports.addBook = async (req, res) => {
  const { bookId } = req.params;
  const exists = await MyBook.findOne({ userId: req.user.id, bookId });
  if (exists) return res.status(400).json({ message: 'Already added' });

  const myBook = await MyBook.create({ userId: req.user.id, bookId });

  // Add to db.json
  let db = { users: [], books: [], myBooks: [] };
  try {
    if (fs.existsSync(dbPath)) {
      db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
    }
    db.myBooks.push({
      userId: req.user.id,
      bookId,
      status: myBook.status,
      rating: myBook.rating
    });
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  } catch (err) {
    // Optionally log error but don't block response
    console.error('Failed to write to db.json:', err);
  }

  res.json(myBook);
};

exports.updateStatus = async (req, res) => {
  const { bookId } = req.params;
  const { status } = req.body;
  await MyBook.findOneAndUpdate({ userId: req.user.id, bookId }, { status });
  res.json({ message: 'Status updated' });
};

exports.updateRating = async (req, res) => {
  const { bookId } = req.params;
  const { rating } = req.body;
  await MyBook.findOneAndUpdate({ userId: req.user.id, bookId }, { rating });
  res.json({ message: 'Rating updated' });
};
