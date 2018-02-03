var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var log = require('./libs/log')(module);
var config = require('./libs/config');
var app = express();
var exphbs = require('express-handlebars');

app.engine('.hbs', exphbs({defaultLayout: 'single', extname: '.hbs'}));
app.set('view engine', '.hbs');

//app.use(express.favicon());
//app.use(express.logger('dev'));
//app.use(bodyParser());
//app.use(express.methodOverride());
//app.use(app.router);
app.use(express.static(path.join(__dirname, "public")));

app.get('/home', function(req, res) {
  var con = {
    title: config.get("homeTitle"),
    cam1: config.get("cam1"),
    cam2: config.get("cam2"),
    cam3: config.get("cam3"),
    cam4: config.get("cam4"),
    cams: config.get("cams"),
    helpers: {
       half: function (index) {
          if(index === config.get("cams").length/2 - 1){
             return "</div><div class=\"card-column\">";
          }
       },

    }
  };
  res.render('index', con);
});

app.get('/cam1', function(req, res) {
  var con = {
    title: "CAM 1",
    video: config.get("cam1"),
  };
  res.render('cam', con);
});

app.get('/cam2', function(req, res) {
  var con = {
    title: "CAM 2",
    video: config.get("cam2"),
  };
  res.render('cam', con);
});

app.get('/cam3', function(req, res) {
  var con = {
    title: "CAM 3",
    video: config.get("cam3"),
  };
  res.render('cam', con);
});

app.get('/cam4', function(req, res) {
  var con = {
    title: "CAM 4",
    video: config.get("cam4"),
  };
  res.render('cam', con);
});

app.get('/api', function(req, res) {
  res.send('API is running');
});

app.get('/ErrorExample', function(req, res, next){
  next(new Error('Random Error!'));
});

app.use(function(req, res, next) {
  res.status(404);
  log.error('URL not found: %s',req.url);
  var u = {
    url: req.url
  };
  res.render('404', u);
  return;
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  log.error('Internal error(%d): %s', res.statusCode, err.message);
  var e = {
    error: err.message
  };
  res.render('500', e);
});

app.listen(config.get('port'), function() {
  log.info('Video server listening on port 1337');
});
