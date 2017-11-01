var gulp        = require('gulp'),
    uglify      = require('gulp-uglify'),
    concat      = require('gulp-concat'),
    del         = require('del'),
    vulcanize = require('gulp-vulcanize'),
    imagemin = require('gulp-imagemin');    

gulp.task('test', () => console.log('Hello world!'))

gulp.task('scripts', () => gulp.src('libs/**/*.js')
                            .pipe(concat('bundle.js'))
                            .pipe(uglify())                            
                            .pipe(gulp.dest(DIST)))

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