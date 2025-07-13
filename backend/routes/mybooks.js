const express = require('express');
const router = express.Router();
const myBookController = require('../controllers/myBookController');
const auth = require('../middleware/auth');

router.get('/', auth, myBookController.getMyBooks);
router.post('/:bookId', auth, myBookController.addBook);
router.patch('/:bookId/status', auth, myBookController.updateStatus);
router.patch('/:bookId/rating', auth, myBookController.updateRating);

module.exports = router;
