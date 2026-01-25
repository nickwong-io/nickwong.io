// deploy to gh-pages using git directly
var gulp = require('gulp');
var exec = require('child_process').exec;

var commands = [
  'cd dist',
  'rm -rf .git',
  'git init',
  'git add -A',
  'git commit -m "Deploy"',
  'git push -f git@github.com:nickwong-io/nickwong.io.git HEAD:gh-pages',
  'rm -rf .git'
].join(' && ');

gulp.task('deploy', function(done) {
  exec(commands, { maxBuffer: 1024 * 1024 }, function(err, stdout, stderr) {
    if (stdout) console.log(stdout);
    if (stderr) console.log(stderr);
    done(err);
  });
});
