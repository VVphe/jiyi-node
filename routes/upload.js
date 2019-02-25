var express = require('express');
var router = express.Router();
var userModel = require('../models/users');
var videoModel = require('../models/videos');

var ffmpeg = require('fluent-ffmpeg')
var multer = require('multer');

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, '/Users/apple/WebApps/jiyi/images')
  },
  filename: function(req, file, cb) {
      cb(null, req.body.userId + '.' + file.originalname.split('.')[1]);
  }
})
var upload = multer({
  storage: storage
});

var storageVideo = multer.diskStorage({
  destination: function(req, file, cb) {
      // cb(null, '/Users/apple/WebApps/jiyi/videos')
      cb(null, '/root/jiyi/videos')
  },
  filename: function(req, file, cb) {
      cb(null, new Date().getTime() + '.' + file.originalname.split('.')[1]);
  }
})
var uploadVideo = multer({
  storage: storageVideo
});

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

router.post('/avator', upload.single('imgFile'), function(req, res) {
  // const imgData = req.body.base64;
  // const base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
  // const dataBuffer = new Buffer(base64Data, 'base64');
  // // 设置图像名
  // // const imgName = req.body.name.split('.')[0] + '_' + Date.parse(new Date()) 
  // //     + '.' + req.body.name.split('.')[1];
  // const imgName = 'test.jpg';
 
  // // 保存图片
  // fs.writeFile('/Users/apple/WebApps/jiyi/images/' + imgName, dataBuffer, function(err) {
  //   if (err){
  //     throw err
  //   } 

  //   res.send();
  // })
  userModel.update({ userId: req.body.userId }, { avator: req.body.userId }, function(err, data) {
    if (err) throw err;
    res.send(data);
  });

})

router.post('/video', uploadVideo.single('videoFile'), function(req, res) {
  ffmpeg(req.file.path)
    .on('filenames', function(filenames) {
      console.log('screenshots are ' + filenames.join(', '));
    })
    .on('end', function() {
      console.log('screenshots were saved');
      res.send(req.file.filename.split('.')[0]);
    })
    .on('error', function(err) {
      console.log('an error happened: ' + err.message);
    })
    // take 2 screenshots at predefined timemarks and size
    // .takeScreenshots({ timemarks: ['50%'], size: '320x240', filename: '%b.png' }, '/Users/apple/WebApps/jiyi/thumbnails');
    .takeScreenshots({ timemarks: ['50%'], size: '320x240', filename: '%b.png' }, '/root/jiyi/thumbnails');
    // .screenshots({
    //   timemarks: ['50%'],
    //   filename: req.file.path.split('.')[0] + '.png',
    //   folder: '/Users/apple/WebApps/jiyi/thumbnails',
    //   size: '320x240'
    // })
  // videoModel.update()
})



module.exports = router;