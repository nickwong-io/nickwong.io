var gulp              = require('gulp'),
    paths             = require('../config').paths;

gulp.task('images', function() {
  return gulp.src([
    paths.src.images + "/**/*.{gif,jpg,jpeg,png,svg,pdf,mov,mp4,webm}",
    "!" + paths.src.images + "/montreal_highlights_final.mov"
  ], { allowEmpty: true })
    .pipe(gulp.dest(paths.dist.images));
});
