var express = require('express');
var router = express.Router();
var userModel = require('../models/users');
var concernModel = require('../models/concerns');
var videoModel = require('../models/videos');
var likeModel = require('../models/likes');

var fs = require('fs');

// 这里的业务逻辑将写在 两个post 路由里 
router.post('/login', function (req, res) {
    var postData = {
        userId: req.body.userId,
        password:req.body.password
    }

    userModel.find({ userId: postData.userId }, function(err, data) {
        if (err) throw err;
        if (!data || data.length == 0) {
            res.send({message: '无此用户, 请确认账户是否正确'});
        } else {
            if (postData.password !== data[0].password) {
                res.send({message: '密码不正确哦, 请重新填写～'});
            } else {
                res.send(data);
            }
        }
    })
});
router.post('/register', function (req, res) {
    var postData = {
        userId: req.body.userId,
        username: req.body.username,
        password:req.body.password,
        age: 0,
        avator: '../../../assets/icon/page-1.png',
        description: null
    }

    userModel.find({ userId: postData.userId }, function(err, data) {
        if (data.length > 0) {
            res.send({message: '该账号已经被注册过咯～'});
        } else {
            userModel.create(postData, function(err, data) {
                if (err) throw err;
                res.send(data);
            })
        }
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

router.get('/concernVideos', function(req, res) {
    var queryCondition = {
        userId: req.query.userId
    }

    concernModel.find(queryCondition, function(err, data) {
        if (err) throw err;
        if (data && data.length > 0) {
            let promiseArr = [];
            data.forEach(item => {
                promiseArr.push(new Promise((resolve, reject) => {
                    videoModel.find({ authorId: item.concernedUserId }, function(err, data) {
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

router.post('/desc/update', function(req, res) {
    userModel.update({ userId: req.body.userId }, { description: req.body.description }, function(err, data) {
        if (err) throw err;
        res.send(data);
    })
})

router.get('/avator/:avatorUri', function(req, res) {
    const avatorUri = req.params.avatorUri;
    const path = '/Users/apple/WebApps/jiyi/images/' + avatorUri + '.jpg';
    const stat = fs.statSync(path)
    const fileSize = stat.size

    const head = {
        'Content-Length': fileSize,
        'Content-Type': 'image/jpeg',
    }

    res.writeHead(200, head)
    fs.createReadStream(path).pipe(res)
})

module.exports = router;
