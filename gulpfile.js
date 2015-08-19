'use strict';

var gulp = require('gulp');
var stylus = require('gulp-stylus');
var autoprefixer = require('autoprefixer-stylus');

gulp.task('styles', function () {
  gulp.src('assets/styl/style.styl')
    .pipe(stylus({
        use: [autoprefixer('last 2 versions')],
        // You need a property to include plain css? really? way to go...
        'include css': true
      }))
    .pipe(gulp.dest('assets/'))
});

gulp.task('watch', function() {
  gulp.watch('assets/styl/**/*.styl', ['styles']);
});