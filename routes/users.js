var express = require('express');
var router = express.Router();
var userModel = require('../models/users');
var concernModel = require('../models/concerns');
var videoModel = require('../models/videos');
var likeModel = require('../models/likes');

// 这里的业务逻辑将写在 两个post 路由里 
router.post('/login', function (req, res) {

});
router.post('/register', function (req, res) {
    var postData = {
        userId: "47843875231",
        username: "李东",
        password: "123456",
        age: 18,
        avator: '../../../assets/icon/page-1.png',
        description: 'emmmmmmm'
    }

    userModel.create(postData, function(err, data) {
        if (err) throw err;
        res.send(data);
    })
});

router.get('/info', function(req, res) {
    var queryCondition = {
        userId: req.query.userId
    }

    userModel.find(queryCondition, { userId: 1, username: 1, age: 1, avator: 1, description: 1 }, function(err, data) {
        if (err) throw err;
        res.send(data.length > 0 ? data[0] : data);
    })
})

router.get('/concerned', function(req, res) {
    var queryCondition = {
        userId: req.query.userId,
        concernedUserId: req.query.concernedUserId
    }

    concernModel.find(queryCondition, function(err, data) {
        if (err) throw err;
        if (data && data.length > 0) {
            res.send(true);
        } else {
            res.send(false);
        }
    })
})

router.get('/concernList', function(req, res) {
    var queryCondition = {
        userId: req.query.userId
    }

    concernModel.find(queryCondition, function(err, data) {
        if (err) throw err;
        if (data && data.length > 0) {
            let promiseArr = [];
            data.forEach(item => {
                promiseArr.push(new Promise((resolve, reject) => {
                    userModel.find({ userId: item.concernedUserId }, function(err, data) {
                        if (err) throw err;
                        resolve(data);
                    })
                }))
            })
            Promise.all(promiseArr).then((values) => {
                res.send(values);
            })
        } else {
            res.send(data);
        }
    })
})

router.get('/works', function(req, res) {
    var queryCondition = {
        authorId: req.query.authorId
    }

    videoModel.find(queryCondition, null, { sort: { publishTime: -1 } }, function(err, data) {
        if (err) throw err;
        res.send(data);
    })
})

router.get('/likes', function(req, res) {
    var queryCondition = {
        userId: req.query.userId
    }

    likeModel.find(queryCondition, null, { sort: { publishTime: -1 } }, function(err, data) {
        if (err) throw err;
        res.send(data);
    })
})

module.exports = router;
