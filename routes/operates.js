var express = require('express');
var router = express.Router();
var starModel = require('../models/stars');
var likeModel = require('../models/likes');
var videoModel = require('../models/videos');
var concernModel = require('../models/concerns');
var commmentModel = require('../models/commends');
var notificationModel = require('../models/notification');

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
        userId: req.body.userId,
        videoId: req.body.videoId
    }

    starModel.create(postData, function(err, data) {
        if (err) throw err;
        videoModel.find({ id: postData.videoId }, { authorId: 1 }, function(err, data) {
            if (err) throw err;
            notificationModel.create({
                videoId: postData.videoId,
                type: 'star',
                userId: data[0].authorId,
                authorId: postData.userId
            })
        })
        res.send(data);
    })
})

router.post('/like', function(req, res) {
    var postData = {
        userId: req.body.userId,
        videoId: req.body.id,
        title: req.body.title,
        subTitle: req.body.subTitle,
        authorId: req.body.authorId,
        avatorUri: req.body.avatorUri,
        duration: req.body.duration,
        category: req.body.category,
        thumbnailUri: req.body.thumbnailUri,
        videoUri: req.body.videoUri,
        description: req.body.description,
        commentCount: req.body.commentCount,
        starsCount: req.body.starsCount,
        publishTime: req.body.publishTime
    }

    likeModel.create(postData, function(err, data) {
        if (err) throw err;
        notificationModel.create({
            videoId: postData.videoId,
            type: 'like',
            userId: postData.authorId,
            authorId: postData.userId
        })
        res.send(data);
    })
})

router.post('/comment', function(req, res) {
    var postData = {
        videoId: req.body.videoId,
        userId: req.body.userId,
        username: req.body.username,
        avator: req.body.avator,
        content: req.body.content,
        type: 'comment',
        date: moment().format('YYYY-MM-DD')
    }

    commmentModel.create(postData, function(err, data) {
        if (err) throw err;
        videoModel.findOneAndUpdate({ id: postData.videoId }, { $inc: { commentCount: 1 } }, function(err, data) {
            if (err) throw err;
            res.send({ ...postData, commentCount: data.commentCount += 1 });
        })
        videoModel.find({ id: postData.videoId }, { authorId: 1 }, function(err, data) {
            if (err) throw err;
            notificationModel.create({
                videoId: postData.videoId,
                type: 'comment',
                userId: data[0].authorId,
                authorId: postData.userId
            })
        })
    })
})

router.post('/reply', function(req, res) {
    var postData = {
        videoId: req.body.videoId,
        userId: req.body.userId,
        username: req.body.username,
        avator: req.body.avator,
        content: req.body.content,
        type: 'reply',
        commentContent: req.body.commentContent,
        commentUserId: req.body.commentUserId,
        commentUsername: req.body.commentUsername,
        commentAvator: req.body.commentAvator,
        date: moment().format('YYYY-MM-DD')
    }

    commmentModel.create(postData, function(err, data) {
        if (err) throw err;
        commmentModel.create(postData, function(err, data) {
            if (err) throw err;
            videoModel.findOneAndUpdate({ id: postData.videoId }, { $inc: { commentCount: 1 } }, function(err, data) {
                if (err) throw err;
                res.send({ ...postData, commentCount: data.commentCount });
            })
        })
        notificationModel.create({
            videoId: postData.videoId,
            type: 'reply',
            userId: data.authorId,
            authorId: postData.userId
        })
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
        userId: req.body.userId,
        concernedUserId: req.body.concernedUserId
    }

    concernModel.create(postData, function(err, data) {
        if (err) throw err;
        res.send(data);
    })
})

router.post('/cancelConcern', function(req, res) {
    var postData = {
        userId: req.body.userId,
        concernedUserId: req.body.concernedUserId
    }

    concernModel.remove(postData, function(err, data) {
        if (err) throw err;
        res.send(data);
    })
})

router.get('/comments', function(req, res) {
    var queryCondition = {
        videoId: req.query.videoId
    }

    commmentModel.find(queryCondition, null, { sort: { date: -1 } }, function(err, data) {
        if (err) throw err;
        res.send(data);
    })
})

module.exports = router;