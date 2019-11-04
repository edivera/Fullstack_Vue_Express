const express = require('express');
const bodyParser = require('body-parser'); // for json parsing
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// my post apis 
const posts = require('./routes/api/posts');    // the file path to the api
app.use('/api/posts', posts);   // the path on the site

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
