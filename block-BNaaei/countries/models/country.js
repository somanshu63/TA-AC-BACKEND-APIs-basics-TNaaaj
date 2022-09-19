var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var countrySchema = new Schema({
    name: String,
    states: [{type: Schema.Types.ObjectId, ref: 'State'}],
    continent: String,
    population: Number,
    ethnicity: [String],
    area: String,
    neighbouring_counties: [{type: Schema.Types.ObjectId}]
});

module.exports = mongoose.model('Country', countrySchema);
