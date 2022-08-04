var express = require('express');
var router = express.Router();
const multer  = require('multer');
const path = require("path");
var fileName;

var fileStorage = multer.diskStorage({
    destination: function(req, file, callback ) {
        callback(null, './public/images');
    },
    filename: function(req, file, callback) {
        fileName = 'restaurent_' + Date.now() + path.extname(file.originalname);
        // fileName = file.originalname;
        callback(null, fileName);
    }
});

var upload = multer({ storage: fileStorage }).single('restaurentPic');

/* GET home page. */
router.post('/', function(req, res, next) {

    var data = {};
    upload(req, res, (error) => {
        if (error) {
            data.msg = 'Error while uploading file';
        } else {
            data.filepath = 'images/' + fileName;
            data.msg = 'uploaded succesfly';
        }
        res.send(JSON.stringify(data));
    });
});

module.exports = router;
