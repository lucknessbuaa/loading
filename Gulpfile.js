var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

gulp.task('test', function() {
    return browserify('./test.js')
        .bundle()
        .pipe(source('test.bundle.js'))
        .pipe(buffer())
        .pipe(gulp.dest('./'))
});
