var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var concernSchema = new Schema({
    userId: String,
    concernedUserId: String
})

module.exports = mongoose.model('concerns', concernSchema);