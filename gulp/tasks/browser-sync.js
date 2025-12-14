var gulp = require('gulp'),
		browsersync = require('browser-sync'),
		paths = require('../config').paths,
		fs = require('fs');

  gulp.task('browsersync', function(done) {
    browsersync.init([paths.dist.html, paths.dist.css, paths.dist.js], {
      server: {
        baseDir: paths.dist.html
      }
    });
    done();
  });


  gulp.task('watch', gulp.series('browsersync', function(done) {
    gulp.watch(paths.src.html + "/**/*.html", gulp.series('html'));
    gulp.watch(paths.src.images + "/**/*.svg", gulp.series('html'));
    gulp.watch(paths.src.scss + "/**/*", gulp.series('css'));
    // gulp.watch(paths.src.fonts + "/**/*", gulp.series('fonts'));
    gulp.watch(paths.src.js + "/**/*", gulp.series('js'));
    gulp.watch(paths.src.images + "/**/*.{gif,jpg,png,svg}", gulp.series('images'));
    done();
  }));
