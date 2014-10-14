var gulp = require('gulp');
var concat = require('gulp-concat');
var ngmin = require('gulp-ngmin');
var uglify = require('gulp-uglify');
var webserver = require('gulp-webserver');

gulp.task('compile', function() {
  return gulp.src([
      './src/js/lib/moment.min.js',
      './src/js/lib/mousetrap.min.js',
      //'./js/lib/jquery-1.11.0.min.js',
      //'./js/lib/angular.min.js',
      //'./js/lib/angular-route.min.js',
      //'./src/js/lib/angular-touch.min.js',
      //'./src/js/lib/angular-sanitize.min.js',
      //'./js/lib/ng-infinite-scroll.min.js',
      './src/js/config.js',
      './src/js/app.js',
      './src/js/services.js',
      './src/js/controllers.js',
      ])
    .pipe(concat('script.js'))
    .pipe(ngmin())
    .pipe(gulp.dest('./js/'));
});

gulp.task('serve', function() {
  gulp.src('./')
    .pipe(webserver({}));
});

gulp.task('dev', ['compile', 'serve'], function() {
  gulp.watch(['./src'], ['compile']);
});

