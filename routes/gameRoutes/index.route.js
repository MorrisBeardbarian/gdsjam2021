var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));

router.get('/', function(req, res, next){
    res.render('index.ejs', { app_name: process.env.APP_NAME });
});

module.exports = router;