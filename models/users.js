var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    id: {
        type: String,
        unique: true
    },
    username: {
        type: String,
        unique: true
    },
    password: String,
    avator: String,
    description: String
});
// 将数据模型暴露出去
module.exports = mongoose.model('users', userSchema);

