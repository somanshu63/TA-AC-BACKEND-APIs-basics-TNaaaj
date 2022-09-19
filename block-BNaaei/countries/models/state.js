var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var stateSchema = new Schema({
    name: String,
    country: {type: Schema.Types.ObjectId, ref: 'Country'},
    population: Number,
    area: String,
    neighbouring_state: [{type: Schema.Types.ObjectId}]
});

module.exports = mongoose.model('State', stateSchema);