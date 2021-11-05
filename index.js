//Requires
{
    var express = require('express');
    var path = require('path');
    var bodyParser = require('body-parser');
    var fs = require('fs');
    var ejs = require('ejs');
    var dotenv = require("dotenv");
}

//Route services
{
    var gameRouter = require('./routes/game.route');
}

//DOTenv config
{
    dotenv.config()
}

//App setup
{
    var app = express();
    app.version = '1.0.0';
}

//Views engine
{
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');
    app.engine('html', require('ejs').renderFile);
}

// Set Static Folder
{
    app.use('/public', express.static('public'));
}

// Body Parser MW
{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
}

// Router
{
    gameRouter.gameRouteMe(app);
}

//Server start
{
    var serv = require('http').Server(app);
    serv.listen(process.env.APP_PORT);
    console.log("server started on port " + process.env.APP_PORT);
}