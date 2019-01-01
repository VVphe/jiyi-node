var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var likeSchema = new Schema({
    userId: String,
    videoId: String
})

module.exports = mongoose.model('likes', likeSchema);