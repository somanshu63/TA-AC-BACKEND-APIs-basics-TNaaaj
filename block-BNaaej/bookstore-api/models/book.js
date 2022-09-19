var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema({
    title: String,
    author: String,
    image: String,
    pages: Number,
    author: String,
    tags: String,
    category: [{type: Schema.Types.ObjectId, ref: 'Category'}]
});

module.exports = mongoose.model('Book', bookSchema);