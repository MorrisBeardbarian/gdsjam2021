var express = require('express');
var router = express.Router();

var gameRoutesFolder = "gameRoutes";

function gameRouteMe(app){

    app.use('/', router);

    var normalizedPath = require("path").join(__dirname, gameRoutesFolder);
    require("fs").readdirSync(normalizedPath).forEach(function(file) {
        var newRoute = require("./"+gameRoutesFolder+"/" + file);
        app.use('/', newRoute);
    });
};



module.exports.gameRouteMe = gameRouteMe;