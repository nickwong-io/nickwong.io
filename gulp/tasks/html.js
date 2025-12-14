var gulp         = require('gulp'),
    paths        = require('../config').paths,
    errorHandler = require('../config').swallowError;

gulp.task('html', function() {
  return gulp.src(paths.src.html + "/**/*.html", { allowEmpty: true })
    .on('error', errorHandler)
    .pipe(gulp.dest(paths.dist.html));
});
