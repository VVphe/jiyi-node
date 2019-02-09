var express = require('express');
var router = express.Router();

var ffmpeg = require('fluent-ffmpeg')

router.get('/transform', function(req, res) {
    ffmpeg('/Users/apple/Downloads/IMG_0410.TRIM.MOV')
    .format('mp4')
    .on('error', function(err) {
      console.log('An error occurred: ' + err.message);
    })
    .on('end', function() {
      console.log('Processing finished !');
    })
    .save('/Users/apple/Downloads/IMG_0410.mp4');
})

module.exports = router;