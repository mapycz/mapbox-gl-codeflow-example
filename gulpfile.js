var gulp = require('gulp'),
  through2 = require('through2'),
  exec = require('gulp-exec'),
  rename = require('gulp-rename'),
  connect = require('gulp-connect');

var path = require('path'),
  minimist = require('minimist');

var options = minimist(process.argv.slice(2), {
  string: 'style',
  default: { style: 'style.json' }
});

gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true
  });
});

gulp.task('html', function() {
  gulp.src(['./app/*.html', options.style])
    .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch(['./app/*.html', options.style],
    ['compile', 'html']);
});

gulp.task('compile', function() {
  switch (path.extname(options.style)) {
    case '.js':
      return gulp.src(options.style)
        .pipe(exec('<%= file.path %>', { pipeStdout: true, continueOnError: true }))
        .pipe(through2.obj(function(file, enc, cb) {
          if (!file.exec.stdout && file.exec.stderr) {
            file.contents = new Buffer(JSON.stringify({ error: file.exec.stderr }));
          }
          cb(null, file);
        }))
        .pipe(rename({ basename: 'style', extname: '.json' }))
        .pipe(gulp.dest('app'));
    case '.json':
    default:
      return gulp.src(options.style)
        .pipe(gulp.dest('app'));
  }
});

gulp.task('default', ['connect', 'watch', 'compile']);
