var express = require('express');
var router = express.Router();
var starModel = require('../models/stars');
var likeModel = require('../models/likes');
var videoModel = require('../models/videos');
var concernModel = require('../models/concerns');

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

router.post('/publish', function(req, res) {
    var postData = {
        id: (new Date()).getTime,
        title: req.query.title,
        author: req.query.author,
        duration: req.query.duration,
        category: req.query.category,
        thumbnailUri: req.query.thumbnailUri,
        description: req.query.description,
        commentCount: 0,
        starsCount: 0,
        publishTime: req.query.publishTime
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