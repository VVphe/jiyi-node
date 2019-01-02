var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var videoSchema = new Schema({
    id: String,
    title: String,
    author: String,
    duration: String,
    category: String,
    thumbnailUri: String,
    description: String,
    commentCount: Number,
    starsCount: Number,
    publishTime: Date
})

module.exports = mongoose.model('videos', videoSchema);

