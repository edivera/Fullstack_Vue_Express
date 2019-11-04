// posts.js will actually handle the posts in the website, not necessarily post requests like I thought

const mongodb = require('mongodb');
const express = require('express');

const router = express.Router();

// Get Posts
router.get('/', async (req, res) => { // the '/' in this case refers to /routes/api
    const posts = await loadHostCollection();
    res.send(await posts.find({}).toArray()); // find takes an input query. Blank means all. needed await
});

// Add Post
router.post('/', async (req, res) => {
    const posts = await loadHostCollection();
    await posts.insertOne({
        text: req.body.text,    // from the body of the post request
        createdAt: new Date()   // current date
    });
    res.sendStatus(201);  // 201 means everything went ok and something was created
});

// Delete Post
router.delete('/', async (req, res) => {

});


async function loadHostCollection() {
    const user = 'abc123'; 
    const password = 'lmao9513';
    const uri = `mongodb+srv://${user}:${password}@cluster0-plxv3.mongodb.net/vue_express?retryWrites=true&w=majority`;

    const client = await mongodb.MongoClient.connect(uri, 
        {useNewUrlParser : true, useUnifiedTopology: true});

    return client.db('vue_express').collection('posts');
}

module.exports = router;