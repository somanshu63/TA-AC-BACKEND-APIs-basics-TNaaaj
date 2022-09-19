var express = require('express');
var router = express.Router();
var Country = require('../models/country')

// list all countries
router.get('/', function(req, res, next) {
  Country.find({}).sort({name: 1}).exec((err, countries) => {
    if(err) return next(err);
    res.json({countries});
  });
});

//update
router.put('/:id', (req, res, next) => {
    var id = req.params.id;
    Country.findByIdAndUpdate(id, {$set: req.body} , (err, country) => {
        if(err) return next(err);
        res.json({country});
    })
});

//delete
router.delete('/:id', (req, res, next) => {
    var id = req.params.id;
    Country.findByIdAndDelete(id, (err, country) => {
        if(err) return next(err);
        res.json({country});
    })
});

//add country
router.post('/', (req, res, next) => {
    Country.create(req.body, (err, country) => {
        if(err) return next(err);
        res.json({country});
    }); 
});

//for a particular country, list all neighbouring countires
router.get('/:id/ns', (req, res, next) => {
    var id = req.params.id;
    Country.findById(id).populate('neighbouring_countries').distinct('name').exec((err, countries) => {
        if(err) return next(err);
        res.json({countries});
    });
});

//list all religions present in entire country dataaset.
router.get('/religions', (Req, res, next) => {
    Country.distinct('ethnicity').exec((err, religions) => {
        if(err) return next(err);
        res.json({religions});
    });
});


//list countries based on religions.
router.get('/religion/:religion', (req, res, next) =>{
    var religion = req.params.religion;
    Country.find({ethnicity: religion}, (err, countries) => {
        if(err) return next(err);
        res.json({countries})
    });
});

//list countries based on continents.
router.get('/continent/:continent', (req, res, next) =>{
    var continent = req.params.continent;
    Country.find({continent: continent}, (err, countries) => {
        if(err) return next(err);
        res.json({countries})
    });
});

//list countries based on populations.
router.get('/population/:population', (req, res, next) =>{
    var population = req.params.population;
    Country.find({population: population}, (err, countries) => {
        if(err) return next(err);
        res.json({countries})
    });
});


//update state from country
router.put('/:cid/state/:sid', (req, res, next) => {
    var cId = req.params.cid;
    var sId = req.params.sid;
    Country.findByIdAndUpdate(cId, {$set: {$push: {state: sId}}}, (err, country) => {
        if(err) return next(err);
        res.json({country})
    });
});

//delete state from country
router.delete('/:cid/state/:sid', (req, res, next) => {
    var cId = req.params.cid;
    var sId = req.params.sid;
    Country.findByIdAndDelete(cId, {$set: {$pull: {state: sId}}}, (err, country) => {
        if(err) return next(err);
        res.json({country})
    });
});











module.exports = router;
