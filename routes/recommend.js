var express = require('express');
var router = express.Router();
var videoModel = require('../models/videos');

var moment = require('moment');

// datetime
router.get('/', function(req, res) {
    var queryCondition = {
        publishTime: req.query.publishTime
    }

    videoModel.find(queryCondition, function(err, data) {
        if (err) throw err;
        if (data) {
            // let categoryList = ['campus', 'technology', 'life', 'music', 'sport'];
            var resObj = [
                {
                    category: 'campus',
                    videos: []
                },
                {
                    category: 'technology',
                    videos: []
                },
                {
                    category: 'life',
                    videos: []
                },
                {
                    category: 'music',
                    videos: []
                },
                {
                    category: 'sport',
                    videos: []
                },
            ];
            let categoryMap = {
                campus: 0,
                technology: 1,
                life: 2,
                music: 3,
                sport: 4
            };
            data = data.slice(0, 100);
            for (let video of data) {
                if (resObj[categoryMap[video.category]].videos.length < 3) {
                    // resObj[categoryMap[video.category]].videos.push()
                    resObj[categoryMap[video.category]].videos.push({
                        id: video.id,
                        title: video.title,
                        subTitle: video.subTitle,
                        thumbnailUri: video.thumbnailUri,
                        authorId: video.authorId,
                        avatorUri: video.avatorUri,
                        videoUri: video.videoUri,
                        description: video.description,
                        publishTime: video.publishTime
                    })
                }
            }
            var result = [];
            for (let i in resObj) {
                if (resObj[i].videos.length != 0) {
                    result.push(resObj[i]);
                }
            }
        }
        res.send(result || []);
    })
})

router.get('/everydayPick', function(req, res) {
    var queryCondition = {
        publishTime: req.query.publishTime
    }

    videoModel.find(queryCondition, null, {sort: {commentCount: -1}}, function(err, data) {
        if (err) throw err;
        if (data && data.length > 0) {
            data = data[0];
            res.send(data);
        } else {
            res.send(null);
        } 
    })
})

router.get('/rank', function(req, res) {
    let daysArr = [];

    let startDay = moment().startOf('week');
    let endDay = moment().endOf('week');

    while(endDay.diff(startDay) >= 0) {
        daysArr.push(startDay.format('YYYY-MM-DD'));
        startDay.add(1, 'days');
    }

    videoModel
        .where('publishTime').in(daysArr)
        .sort({commentCount: -1})
        .limit(10)
        .exec(function(err, data) {
            if (err) throw err;
            res.send(data);
        })
})

module.exports = router;