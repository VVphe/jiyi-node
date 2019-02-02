var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commendSchema = new Schema({
    videoId: String,
    userId: String,
    username: String,
    avator: String,
    content: String,
    type: String,
    commentContent: String,
    commentUserId: String,
    commentUsername: String,
    commentAvator: String,
    date: String
})

module.exports = mongoose.model('commends', commendSchema);