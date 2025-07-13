require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');

const app = express();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: 'https://books-library-management-app.vercel.app/',
  credentials: true,
}));

// Serve React static files
// const frontendBuildPath = path.join(__dirname, '../frontend/dist');
// app.use(express.static(frontendBuildPath));

// API routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/books', require('./routes/books'));
app.use('/api/mybooks', require('./routes/mybooks'));

app.use(errorHandler);

// For any non-API route, serve React index.html
// app.get(/^\/(?!api).*/, (req, res) => {
//   res.sendFile(path.join(frontendBuildPath, 'index.html'));
// });

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
