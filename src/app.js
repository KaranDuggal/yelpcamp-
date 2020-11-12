const ejs = require('ejs');
const path = require('path');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const { Router } = require('express');
const port = process.env.PORT || 8000;
const app = express();


// connect to databass 
mongoose.connect('mongodb://localhost:27017/blog_app', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log('connect successfully'))
    .catch((err) => console.log(err));

// set paths
const publicFile = path.join(__dirname, '../public');
const viewsFile = path.join(__dirname, '../templates/views');
const partialFile = path.join(__dirname, '../templates/partials');
app.set('view engine', 'ejs');
app.set('views', viewsFile);
app.use(express.static(publicFile));
app.use(bodyParser.urlencoded({ extended: true }));

// blog schema 
const blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    date: {
        type: Date,
        default: Date.now
    }
});
const blog = mongoose.model('blog', blogSchema);

// Routes
app.get('/', (req, res) => {
    res.render('index');
});
// index route
app.get('/blogs', (req, res) => {
    blog.find({}, (err, blogs) => {
        try {
            res.render('blog',{blogs:blogs});
        } catch (err) {
            console.log(err);
        }
    })
});
// new route 
app.get('/blogs/new', (req, res) => {
    res.render('new');
});
// about 
app.get('/about', (req, res) => {
    res.render('new');
});


app.listen(port, () => {
    console.log(`lisening to the port number at ${port}`);
});