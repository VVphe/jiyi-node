var express = require('express');
var router = express.Router();
var videoModel = require('../models/videos');

router.get('/recommend', function(req, res) {
    videoModel
        .where('labels').exists()
        .sort({'starsCount': -1})
        .limit(10)
        .exec(function(err, data) {
            if (err) throw err;
            res.send(data);
        })
})

router.get('/label', function(req, res) {
    var queryCondition = {
        labels: req.query.label
    }
    videoModel.find(queryCondition, null, {sort: {starsCount: -1}}, function(err, data) {
        if (err) throw err;
        res.send(data);
    })
})

module.exports = router;