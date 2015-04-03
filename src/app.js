"use strict";

var express = require('express')
  , stylus = require('stylus')
  , browserify = require('browserify-middleware')
  , Nano = require('nanotemplates')
  , http = require('http');

var nano = new Nano({ basedir: 'views' });

var app = express();

app.use(stylus.middleware({
  src: 'public',
  compile: function(str, path) {
    return stylus(str)
      .set('filename', path)
      .set('compress', true)
      .set('include css', true)
      .use(require('nib')())
      .import('nib');
  }
}));

app.use(express.static('public'));

app.get('/js/index.js', browserify('src/client/index.js'));

app.get('/',function(req, res, next) {
  req.url = '/index.html';
  next();
});

app.get('/*.html', function(req, res, next) {
  nano.render(req.params[0] + '.html', { baseUrl: ''}, function(err, html) {
    /* istanbul ignore if */
    if (err) return next(err);
    res.send(html);
  });
});

http.createServer(app).listen(8080, function() {
  console.log('Type http://localhost:8080 in omnibox, bro.');
});
