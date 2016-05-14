var gulp = require('gulp'),
    watch = require('gulp-watch'),
    uglify = require('gulp-uglify'), //JS最簡壓縮用



gulp.task('babel', function() {
    gulp.src('app/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest(''))
});

gulp.task('watch', function() {
    gulp.watch('app/**/*.js', ['babel']);
});
// Default task
gulp.task('default', ['babel','watch']);
