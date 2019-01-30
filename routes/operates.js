var express = require('express');
var router = express.Router();
var starModel = require('../models/stars');
var likeModel = require('../models/likes');
var videoModel = require('../models/videos');
var concernModel = require('../models/concerns');

var multer = require('multer');
var moment = require('moment');

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'videos/')
    },
    filename: function(req, file, cb) {
        cb(null, req.query.authorId + '-' + Date.now() + '-' + file.originalname);
    }
})

var upload = multer({
    storage: storage
});

router.post('/star', function(req, res) {
    var postData = {
        userId: req.query.userId,
        videoId: req.query.videoId
    }

    starModel.create(postData, function(err, data) {
        if (err) throw err;
        res.send(data);
    })
})

router.post('/like', function(req, res) {
    var postData = {
        userId: req.query.userId,
        videoId: req.query.videoId
    }

    likeModel.create(postData, function(err, data) {
        if (err) throw err;
        res.send(data);
    })
})

router.post('/publish', upload.single('file'), function(req, res) {
    var postData = {
        id: (new Date()).getTime(),
        title: req.query.title,
        subTitle: req.query.subTitle,
        authorId: req.query.authorId,
        avatorUri: req.query.avatorUri,
        duration: req.query.duration,
        category: req.query.category,
        thumbnailUri: req.query.thumbnailUri,
        description: req.query.description,
        commentCount: 0,
        starsCount: 0,
        publishTime: moment().format('YYYY-MM-DD')
    }

    videoModel.create(postData, function(err, data) {
        if (err) throw err;
        res.send(data);
    })
})

router.post('/concern', function(req, res) {
    var postData = {
        userId: req.query.userId,
        concernedUserId: req.query.concernedUserId
    }

    concernModel.create(postData, function(err, data) {
        if (err) throw err;
        res.send(data);
    })
})

module.exports = router;