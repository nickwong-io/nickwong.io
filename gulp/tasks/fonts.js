var gulp              = require('gulp'),
    paths             = require('../config').paths;

gulp.task('fonts', function() {
  return gulp.src(paths.src.fonts + "/*", { allowEmpty: true })
    .pipe(gulp.dest(paths.dist.fonts));
});
