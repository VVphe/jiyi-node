var express = require('express');
var router = express.Router();
var videoModel = require('../models/videos')

// datetime
router.get('/', function(req, res) {
    var queryCondition = {
        publishTime: req.query.publishTime
    }
    videoModel.find(queryCondition, function(err, data) {
        if (err) throw err;
        if (data) {
            data = data.slice(0, 10);
        }
        res.send(data);
    })
})

module.exports = router;