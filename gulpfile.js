var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('compile', function() {
  return gulp.src([
      './js/lib/moment.min.js',
      './js/lib/mousetrap.min.js',
      './js/lib/jquery-1.11.0.min.js',
      './js/lib/angular.min.js',
      './js/lib/angular-route.min.js',
      './js/lib/angular-touch.min.js',
      './js/lib/angular-sanitize.min.js',
      './js/lib/ng-infinite-scroll.min.js',
      './js/config.js',
      './js/app.js',
      './js/services.js',
      './js/controllers.js',
      ])
    .pipe(concat('script.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./js/'));
});

