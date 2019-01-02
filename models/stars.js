var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var starSchema = new Schema({
    userId: String,
    videoId: String
})

module.exports = mongoose.model('stars', starSchema);