var gulp = require('gulp'),
    watch = require('gulp-watch'),
    uglify = require('gulp-uglify'), //JS最簡壓縮用
    jshint = require('gulp-jshint'), //js 檢測用
    webserver = require('gulp-webserver') //內建伺服器用
    livereload = require('gulp-livereload'), //即時更新
    jade = require('gulp-jade'), //html 用
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer');

    gulp.task('jade', function() {
        gulp.src('app/jade/**/*.jade')
            .pipe(jade({
                locals: {
                    title: 'OMG THIS IS THE TITLE'
                }
            }))
            .pipe(gulp.dest(''))
            .pipe(livereload());
    });
// Sass
gulp.task('sass', function() {
      gulp.src('app/sass/**/*.sass')
        .pipe(plumber())
        .pipe(sass({
          outputStyle: 'compressed',
          includePaths: [
                    './node_modules/susy/sass'
                ]
              })
        .on('error', sass.logError))
        .pipe(gulp.dest('app/css/'))
    });
gulp.task('css', function () {
      var processors = [
        autoprefixer({browsers: ['last 1 version']})
      ];
      watch(['app/css/**/*.css'], function() {
          gulp.src('app/css/**/**.css')
            .pipe(plumber())
            .pipe(postcss(processors))
            .pipe(gulp.dest(''));

      });
    });
gulp.task('babel', function() {
    gulp.src('app/js/**/*.js')
        .pipe(jshint())
        .pipe(uglify())
        .pipe(gulp.dest(''))
});

gulp.task('webserver', function() {
    gulp.src('')
        .pipe(webserver({
            port: 80,
            livereload: true,
        }));
});

gulp.task('watch', function() {
    gulp.watch('app/js/**/*.js', ['babel']);
    gulp.watch('app/sass/**/*.sass', ['sass']);
    gulp.watch('app/jade/**/*.jade', ['jade']);
});
// Default task
gulp.task('default', ['jade','sass','babel','webserver','watch']);
