// Gulp requirements
var gulp = require('gulp');
var sass = require('gulp-sass');
var webserver = require('gulp-webserver');

// Converts all sass files in app/scss to css files in app/css
gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('app/css'));
});

// Creates a webserver at http://localhost:3000/ 
gulp.task('serve', function() {
	return gulp.src('app/')
	  	.pipe(webserver({
	      	port: 3000,
	      	livereload: true
		}));
});

// Watches for changes in all scss files and automatically converts to css
gulp.task('watch', function() {
	gulp.watch('app/scss/**/*.scss', gulp.series('sass'));
});

// Activates both the websever and sass conversions when 'gulp' command is run
gulp.task('default', gulp.parallel('serve', 'watch'));