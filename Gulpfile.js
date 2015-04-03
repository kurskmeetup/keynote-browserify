"use strict";

var gulp = require('gulp');

gulp.task('default', ['stylus', 'browserify', 'nano']);

gulp.task('stylus', function() {
  return gulp.src('public/css/index.styl')
    .pipe(require('gulp-stylus')({
      compile: function(str, path) {
        return require('stylus')(str)
          .set('filename', path)
          .set('compress', true)
          .set('include css', true)
          .use(require('nib')())
          .import('nib');
      }
    }))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('browserify', function() {
  gulp.src('src/client/index.js', { read: false })
    .pipe(require('gulp-browserify')())
    .pipe(gulp.dest('./public/js'));
});

gulp.task('nano', function() {
  var map = require('map-stream')
    , path = require('path');
  var render = function(file, cb) {
    var Nano = require('nanotemplates')
      , nano = new Nano({ basedir: 'views' });
    var relPath = path.relative('views', file.path);
    nano.render(relPath, function(err, html) {
      if (err) return cb(err);
      file.contents = new Buffer(html, 'utf-8');
      cb(null, file);
    });
  };
  gulp.src('views/*.html')
    .pipe(map(render))
    .pipe(gulp.dest('.'));
});
