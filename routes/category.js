var express = require('express');
var router = express.Router();
var videoModel = require('../models/videos');

var moment = require('moment');

router.get('/latestPopulor', function(req, res) {
    let daysArr = [];

    let startDay = moment().startOf('week');
    let endDay = moment().endOf('week');

    while(endDay.diff(startDay) >= 0) {
        daysArr.push(startDay.format('YYYY-MM-DD'));
        startDay.add(1, 'days');
    }

    videoModel
        .where('category').equals(req.query.category)
        .where('publishTime').in(daysArr)
        .sort({starsCount: -1})
        .limit(3)
        .exec(function(err, data) {
            if (err) throw err;
            res.send(data);
        })
})

router.get('/populor', function(req, res) {
    videoModel
        .where('category').equals(req.query.category)
        .sort({starsCount: -1})
        .limit(3)
        .exec(function(err, data) {
            if (err) throw err;
            res.send(data);
        })
})

router.get('/latest', function(req, res) {
    videoModel
        .where('category').equals(req.query.category)
        .sort({publishTime: -1})
        .limit(10)
        .exec(function(err, data) {
            if (err) throw err;
            res.send(data);
        })
})

router.get('', function(req, res) {
    videoModel
        .where('category').equals(req.query.category)
        .sort({publishTime: -1})
        .limit(10)
        .exec(function(err, data) {
            if (err) throw err;
            res.send(data);
        })
})

module.exports = router;