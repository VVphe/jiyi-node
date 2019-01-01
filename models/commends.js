var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commendSchema = new Schema({
    userId: String,
    content: String,
    type: String
})

module.exports = mongoose.Model('commends', commendSchema);