var gulp         = require('gulp'),
    paths        = require('../config').paths;

gulp.task('cname', function() {
  return gulp.src(paths.base.src + "/CNAME", { allowEmpty: true })
    .pipe(gulp.dest(paths.base.dist));
});