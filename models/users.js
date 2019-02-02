var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    userId: String,
    username: String,
    age: Number,
    password: String,
    avator: String,
    description: String
});
// 将数据模型暴露出去
module.exports = mongoose.model('users', userSchema);

