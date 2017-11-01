/* global require, console */
var gulp        = require('gulp'),
    del         = require('del'),
    vulcanize   = require('gulp-vulcanize'),
    imagemin    = require('gulp-imagemin'),
    eslint      = require('gulp-eslint')  

gulp.task('lint', () => {
    // ESLint ignores files with "node_modules" paths.
    // So, it's best to have gulp ignore the directory as well.
    // Also, Be sure to return the stream from the task;
    // Otherwise, the task may end before the stream has finished.
    return gulp.src(['**/*.js','!node_modules/**', '!libs/**', '!dist/**'])
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError())
})

gulp.task('reset', () => del(['dist']) )
gulp.task('copyImg', () => gulp.src('src/img/**/*').pipe(gulp.dest('dist/img')))
gulp.task('imgMin', () => gulp.src('src/img/chesspieces/wikipedia/*')
                              .pipe(imagemin())
                              .pipe(gulp.dest('dist/img/chesspieces/wikipedia')))

gulp.task('default', ['reset', 'imgMin'], () =>
    gulp.src('src/Index.html')
        .pipe(vulcanize({
			abspath: '',
            excludes: [],
            inlineScripts: true,
            inlineCss: true,
            rewriteUrlsInTemplates: false,
            stripComments: true
          } ))
        .pipe(gulp.dest('dist'))) 