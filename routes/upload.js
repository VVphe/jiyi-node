var express = require('express');
var router = express.Router();

var ffmpeg = require('fluent-ffmpeg')
var multer = require('multer');
var fs = require('fs')
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, '/Users/apple/WebApps/jiyi/images')
  },
  filename: function(req, file, cb) {
      cb(null, 'avator' + Date.now() + '.' + file.originalname.split('.')[1]);
  }
})
var upload = multer({
  storage: storage
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
})



module.exports = router;