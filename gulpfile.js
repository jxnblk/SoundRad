var gulp = require('gulp');
var concat = require('gulp-concat');
var ngmin = require('gulp-ngmin');
var uglify = require('gulp-uglify');
var webserver = require('gulp-webserver');
var rename = require('gulp-rename');

gulp.task('compile', function() {
  return gulp.src([
      './src/config.js',
      './src/app.js',
      './src/services/soundcloud.js',
      './src/services/player.js',
      './src/services/storage.js',
      './src/directives/icons.js',
      './src/filters/pretty-time.js',
      './src/controllers/main.js',
      './src/controllers/tracklist.js',
      './src/controllers/stream.js',
      './src/controllers/user.js',
      './src/controllers/likes.js',
      './src/controllers/sets.js',
      './src/controllers/set.js'
      ])
    .pipe(concat('app.js'))
    .pipe(ngmin())
    .pipe(gulp.dest('./js/'));
});

gulp.task('serve', function() {
  gulp.src('./')
    .pipe(webserver({}));
});

gulp.task('dupeindex', function() {
  gulp.src('./index.html')
    .pipe(rename('404.html'))
    .pipe(gulp.dest('.'));
});

gulp.task('dev', ['compile', 'dupeindex', 'serve'], function() {
  gulp.watch(['./src/**/*', './index.html'], ['compile', 'dupeindex']);
});

