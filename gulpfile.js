var gulp = require('gulp');
var concat = require('gulp-concat');
var ngmin = require('gulp-ngmin');
var uglify = require('gulp-uglify');
var webserver = require('gulp-webserver');

gulp.task('compile', function() {
  return gulp.src([
      './src/config.js',
      './src/app.js',
      './src/services/soundcloud.js',
      './src/services/player.js',
      './src/services/storage.js',
      './src/directives/icons.js',
      './src/controllers/main.js',
      './src/controllers/tracklist.js',
      './src/controllers/stream.js'
      ])
    .pipe(concat('app.js'))
    .pipe(ngmin())
    .pipe(gulp.dest('./js/'));
});

gulp.task('serve', function() {
  gulp.src('./')
    .pipe(webserver({}));
});

gulp.task('dev', ['compile', 'serve'], function() {
  gulp.watch(['./src/**/*'], ['compile']);
});

