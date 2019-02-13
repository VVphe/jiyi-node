var express = require('express');
var router = express.Router();
var videoModel = require('../models/videos');

var fs = require('fs')

router.get('/detail', function(req, res) {
    videoModel.find({ id: req.query.videoId }, function(err, data) {
        if (err) throw err;
        res.send(data[0] || {});
    })
})

router.get('/:videoId', function(req, res) {
    const videoId = req.params.videoId;
    const path = '/Users/apple/Downloads/' + videoId + '.mp4';
    const stat = fs.statSync(path)
    const fileSize = stat.size

    const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
    }

    res.writeHead(200, head)
    fs.createReadStream(path).pipe(res)
})

module.exports = router;