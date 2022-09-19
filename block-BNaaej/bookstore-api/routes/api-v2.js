var express = require('express');
var router = express.Router();
var Book = require('../models/book')
var Comment = require('../models/comment')
var Category = require('../models/category')



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

//create category
router.post('/:id/addcategories', (req, res, next) => {
    var id = req.params.id;
    req.body.book = id;
    Category.create(req.body, (err, category) => {
        if(err) return next(err);
        res.json({category});
    });
});

//edit category
router.put('/categories/:id', (req, res, next) => {
    var id = req.params.id;
    Category.findByIdAndUpdate(id, {$set: req.body}, (err, category) => {
        if(err) return next(err);
        res.json({category});
    });
});

//delete category
router.delete('/categories/:id', (req, res, next) => {
    var id = req.params.id;
    Category.findByIdAndDelete(id, (err, category) => {
        if(err) return next(err);
        res.json({category});
    });
});

//list all categories
router.get('/categories', (req, res, next) => {
    Category.find({}, (err, categories) => {
        if(err) return next(err);
        res.json({categories});
    });
});

//list books by category
router.get('/:category', (req, res, next) => {
    var category = req.params.id;
    Category.findOne({name: category}, (err, category) => {
        if(err) return next(err);
        Book.findOne({category: category.id}, (err, books) => {
            if(err) return next(err);
            res.json({books});
        });
    });
});

//count books for each category
router.get('/count', (req, res, next) => {
    Book.aggregate([{$group: {_id: "$category", count: {$sum: 1}}}]).exec((err, books) => {
        if(err) return next(err);
        res.json({books})
    });
});


//list boooks by author
router.get('/:author', (req, res, next) => {
    var author = req.params.id;
    Book.find({author: author}, (err, books) => {
        if(err) return next(err);
        res.json({books})
    });
});

//list all tags
router.get('/tags', (req, res, next) => {
    Book.distinct('tags').exec((err, tags) => {
        if(err) return next(err);
        res.json({tags});
    });
});


//list tags asc/dsc
router.get('/tags/:type', (req, res, next) => {
    var type = req.params.type;
    if(type == 'ascending'){
        var sort = 1;
    }else if(type == 'descending'){
        var sort = -1;
    }
    Book.distinct('tags').sort({tags: sort}).exec((err, tags) => {
        if(err) return next(err);
        res.json({tags});
    });
});

//filter book by tags
router.get('/:tags', (req, res, next) => {
    var tag = req.params.tags;
    Book.find({tags: tag}, (err, books) => {
        if(err) return next(err);
        res.json({books});
    });
});

//count of books for each tags
router.get('/tags/count', (req, res, next) => {
    Book.aggregate([{$group: {_id: "$tags", count: {$sum: 1}}}]).exec((err, count) => {
        if(err) return next(err);
        res.json({count});
    });
});
















































module.exports = router;
