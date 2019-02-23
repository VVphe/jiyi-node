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
    const path = '/Users/apple/WebApps/jiyi/videos/' + videoId;
    const stat = fs.statSync(path)
    const fileSize = stat.size
    var range = req.headers.range;

    var parts = range.replace(/bytes=/, "").split("-")
    var start = parseInt(parts[0], 10);
    var end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    var chunksize = (end-start) + 1;
    var file = fs.createReadStream(path, {start, end})

    const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
    }

    res.writeHead(206, head)
    file.pipe(res)
})

router.get('/thumbnail/:thumbnailUri', function(req, res) {
    const thumbnailUri = req.params.thumbnailUri;
    const path = '/Users/apple/WebApps/jiyi/thumbnails/' + thumbnailUri + '.png';
    const stat = fs.statSync(path);
    const fileSize = stat.size;

    const head = {
        'Content-Length': fileSize,
        'Content-Type': 'image/png',
    }

    res.writeHead(200, head);
    fs.createReadStream(path).pipe(res);
    
})

module.exports = router;