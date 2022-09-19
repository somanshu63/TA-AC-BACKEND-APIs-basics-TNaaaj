var express = require('express');
var router = express.Router();
var State = require('../models/state')

//add state
router.post('/', (req, res, next) => {
    State.create(req.body, (err, country) => {
        if(err) return next(err);
        res.json({country});
    }); 
});

//list all states for a country in ascending order
router.get('/asc', (req, res, next) => {
    State.find({}).sort({name: 1}).exec((err, states) => {
        if(err) return next(err);
        res.json({states});
    });
});

//list all states in an ascending order of their population
router.get('/ascpop', (req, res, next) => {
    State.find({}).sort({population: 1}).exec((err, states) => {
        if(err) return next(err);
        res.json({states});
    });
});

//for a particular state, list all neighbouring states
router.get('/:id/ns', (req, res, next) => {
    var id = req.params.id;
    State.findById(id).distinct('neighbouring_state').exec((err, states) => {
        if(err) return next(err);
        res.json({states});
    });
});















module.exports = router;
