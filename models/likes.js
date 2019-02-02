var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var likeSchema = new Schema({
    userId: String,
    videoId: String,
    title: String,
    subTitle: String,
    authorId: String,
    avatorUri: String,
    duration: String,
    category: String,
    thumbnailUri: String,
    videoUri: String,
    description: String,
    commentCount: Number,
    starsCount: Number,
    publishTime: String
})

module.exports = mongoose.model('likes', likeSchema);