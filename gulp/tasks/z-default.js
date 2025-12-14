var gulp = require('gulp');

// Build Production Files, the Default Task
gulp.task('default', gulp.series(
  'clean',
  gulp.parallel('html', 'css', 'fonts', 'js', 'images', 'cname'),
  'watch'
));
