var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var ghPages = require('gulp-gh-pages');

gulp.task('deploy', function() {
  return gulp.src('./build/**/*')
    .pipe(ghPages());
});
gulp.task('clean', function () {
  return gulp.src('build/', {read: false})
    .pipe(clean());
});

gulp.task('scripts', ['clean'], function () {
  return gulp.src('./js/*.js')
    .pipe(concat('script.js'))
    .pipe(uglify())
    .pipe(clean({force: true}))
    .pipe(gulp.dest('./build/js/'));
});

gulp.task('default', ['scripts']);
