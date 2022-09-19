var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema({
    title: String,
    author: String,
    image: String,
    pages: Number,
});

module.exports = mongoose.model('Book', bookSchema);