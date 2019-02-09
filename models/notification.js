var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var notificationSchema = new Schema({
    videoId: String,
    type: String,
    userId: String,
    authorId: String
});

module.exports = mongoose.model('notification', notificationSchema);