// Include gulp
var gulp = require('gulp'); 

// Include Our Plugins
var jshint = require('gulp-jshint'),
    less = require('gulp-less'),
    concat = require('gulp-concat'),
    jade = require('gulp-jade'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    livereload = require('gulp-livereload');

// Lint Task
gulp.task('lint', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Less
gulp.task('less', function() {
    return gulp.src('src/stylesheets/*.less')
        .pipe(less())
        .pipe(gulp.dest('dist/css'))    
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('src/js/*.js')
        // .pipe(concat('all.js'))
        .pipe(gulp.dest('dist/js'))
        // .pipe(rename('all.min.js'))
        // .pipe(uglify())
        // .pipe(gulp.dest('dist/js'));
});



// Compile Jade templates to html
gulp.task('templates', function() {
  return gulp.src('src/views/*.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('dist/'))
    .pipe( livereload(4002));
    console.log("hello");
});



// Watch Files For Changes
gulp.task('watch', function() {
    livereload.listen(4002);
    gulp.watch('src/js/*.js', ['lint', 'scripts']);
    gulp.watch('src/stylesheets/*.less', ['less']);
    gulp.watch('src/views/*.jade',['templates']);

});

// Default Task
gulp.task('default', ['lint', 'less', 'scripts', 'templates' , 'watch']);