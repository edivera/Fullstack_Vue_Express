const express = require('express');
const bodyParser = require('body-parser'); // for json parsing
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// my post api, the api that handles blog posts on the page
const posts = require('./routes/api/posts');    // the file path to the api
app.use('/api/posts', posts);   // renames the router of the /api/posts to a "posts" 
                                //   variable for our use in this file

// Handle production
if(process.env.NODE_ENV === 'production') {
    // this stuff needs to be below the read files associated with the api
    // set static folder
    app.use(express.static(__dirname + '/public/'));

    // Handle single page application
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
