var express = require('express');
var router = express.Router();
var Book = require('../models/book')
var Comment = require('../models/comment')


//list of all books
router.get('/', function(req, res, next) {
    Book.find({}, (err, books) => {
        if(err) return next(err);
        res.json({books});
    });
});

//get single book
router.get('/:id', (req, res, next) => {
    var id = req.params.id;
    Book.findById(id, (err, book) => {
        if(err) return next(err);
        res.json({book});
    });
});


//create book
router.post('/', (req, res, next) => {
    Book.create(req.body, (err, book) => {
        if(err) return next(err);
        res.json(`{created: ${book}}`);
    });
});

//update book
router.put('/:id', (req, res, next) => {
    var id = req.params.id;
    Book.findByIdAndUpdate(id, {$set: req.body}, (err, book) => {
        if(err) return next(err);
        res.json(`{updated: ${book}}`);
    });
});

//delete book
router.delete('/:id', (req, res, next) => {
    var id = req.params.id;
    Book.findByIdAndDelete(id, (err, book) => {
        if(err) return next(err);
        res.json(`{deleted: ${book}}`)
    });
});


//view all comments for specific book
router.get('/:id/comments', (req, res, next) => {
    var id = req.params.id;
    Comment.find({book: id}, (err, comments) => {
        if(err) return next(err);
        res.json({comments});
    });
});


//create comment
router.post('/:id/addcomment', (req, res, next) => {
    var id = req.params.id;
    req.body.book = id;
    Comment.create(req.body, (err, comment) => {
        if(err) return next(err);
        res.json(`{created: ${comment}}`);
    });
});

//update comment
router.put('/comments/:id', (req, res, next) => {
    var id = req.params.id;
    Comment.findByIdAndUpdate(id, {$set: req.body}, (err, comment) => {
        if(err) return next(err);
        res.json(`{updated: ${comment}}`);
    });
});

//delete comment
router.delete('/comments/:id', (req, res, next) => {
    var id = req.params.id;
    Comment.findByIdAndDelete(id, (err, comment) => {
        if(err) return next(err);
        res.json(`{deleted: ${comment}}`)
    });
});






module.exports = router;
