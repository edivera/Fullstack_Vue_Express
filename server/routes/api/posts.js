const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Posts
router.get('/', (req, res) => { // the '/' in this case refers to /routes/api
    res.send('hello');
})

// Add Post

// Delete Post

module.exports = router;