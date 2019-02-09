var express = require('express');
var router = express.Router();
var fs = require('fs')

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