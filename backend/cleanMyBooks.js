// Script to clean up myBooks test data for a specific userId in db.json
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'db.json');
const userIdToRemove = process.argv[2]; // Pass userId as argument

if (!userIdToRemove) {
  console.error('Usage: node cleanMyBooks.js <userId>');
  process.exit(1);
}

const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
const beforeCount = db.myBooks.length;
db.myBooks = db.myBooks.filter(entry => entry.userId !== userIdToRemove);
const afterCount = db.myBooks.length;

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
console.log(`Removed ${beforeCount - afterCount} myBooks entries for userId: ${userIdToRemove}`);
