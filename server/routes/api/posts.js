// posts.js will actually handle the posts in the website, not necessarily post requests like I thought

const mongodb = require('mongodb');
const express = require('express');

const router = express.Router();    // allows us to create an api out of this file

// Get Posts
router.get('/', async (req, res) => { // the '/' in this case refers to /routes/api
    // but in the context of index.js. I think it refers to /
    // that way this code is usable from another page
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
router.delete('/:id', async (req, res) => {
    const posts = await loadHostCollection();
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});  // _id is an object id
    res.sendStatus(200);
});


async function loadHostCollection() {
    const user = 'abc123';  // these don't exist anymore
    const password = 'lmao9513';    // these don't exist anymore
    const uri = `mongodb+srv://${user}:${password}@cluster0-plxv3.mongodb.net/vue_express?retryWrites=true&w=majority`;

    const client = await mongodb.MongoClient.connect(uri, 
        {useNewUrlParser : true, useUnifiedTopology: true});

    return client.db('vue_express').collection('posts');
}

module.exports = router;    // this allows the requests to be used outside, making this an api