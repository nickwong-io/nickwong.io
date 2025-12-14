var gulp              = require('gulp'),
    paths             = require('../config').paths;

gulp.task('images', function() {
  return gulp.src(paths.src.images + "/**/*.{gif,jpg,jpeg,png,svg,pdf}", { allowEmpty: true })
    .pipe(gulp.dest(paths.dist.images));
});
