/* global require, console */
var gulp = require('gulp')
var del = require('del')
var vulcanize = require('gulp-vulcanize')
var imagemin = require('gulp-imagemin')
var eslint = require('gulp-eslint')
var standard = require('gulp-standard')
var bSync = require('browser-sync')
var runSequence = require('run-sequence')

gulp.task('lint', () => {
  return gulp.src(['**/*.js', 'src/**/*.js', 'src/**/*.html', '!node_modules/**', '!libs/**', '!dist/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})

gulp.task('standard', function () {
  return gulp.src(['**/*.js', 'src/**/*.js', 'src/**/*.html', '!node_modules/**', '!libs/**', '!dist/**'])
    .pipe(standard())
    .pipe(standard.reporter('default', {
      breakOnError: true,
      quiet: true
    }))
})

gulp.task('reset', () => del(['dist']))
gulp.task('copyImg', () => gulp.src('src/img/**/*').pipe(gulp.dest('dist/img')))
gulp.task('imgMin', () => gulp.src('src/img/chesspieces/wikipedia/*')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/img/chesspieces/wikipedia')))

gulp.task('server', (done) => {
  bSync({server: {baseDir: ['./']}})
  done()
})

gulp.task('buildDist', ['reset', 'imgMin', 'lint'], () =>
  gulp.src('src/Index.html')
    .pipe(vulcanize({
      abspath: '',
      excludes: [],
      inlineScripts: true,
      inlineCss: true,
      rewriteUrlsInTemplates: false,
      stripComments: true
    }))
    .pipe(gulp.dest('dist')))

gulp.task('default', ['buildDist', 'server'],
  function Watcher (done) {
    gulp.watch(['src/**/*'], () => runSequence('buildDist', bSync.reload))
    done()
  })
