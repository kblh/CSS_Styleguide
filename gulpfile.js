var gulp         = require('gulp');  
var gulpSequence = require('gulp-sequence');
var less         = require('gulp-less');  
var watch        = require('gulp-watch');  
var size         = require('gulp-size');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS    = require('gulp-minify-css');  
var cleanCSS     = require('gulp-clean-css');
var rename       = require('gulp-rename');  
var header       = require('gulp-header');
var eslint       = require('gulp-eslint');
var concat       = require('gulp-concat');
var uglyfly      = require('gulp-uglyfly');
var base64       = require('gulp-base64');
var criticalCss  = require('gulp-critical-css');
var fileinclude  = require('gulp-file-include');
var browserSync  = require('browser-sync').create();
var pkg          = require('./package.json');


/*********************
  Directories
*********************/
const dir = {
  appDst: './assets/dist/',
  appSrc: './assets/src/'
};


/*********************
  CSS
*********************/

/* compile less (SRC -> SRC) */
gulp.task('compile-less', function() {  
  gulp.src(dir.appSrc + 'css/main.less')
    .pipe(less())
    .pipe(gulp.dest(dir.appSrc + 'css/'));
});


/* watch less changes (SRC) */
gulp.task('css.watch', ['fileinclude','compile-less'], function() {
  browserSync.init({
    server: {
      baseDir: dir.appSrc
    }
  });
  gulp.watch(dir.appSrc + 'css/**/*.less' , ['compile-less']);
  gulp.watch(dir.appSrc + 'styleguide/*.html' , ['fileinclude']);
  gulp.watch(dir.appSrc + 'styleguide/*.html').on('change', browserSync.reload);
  gulp.watch(dir.appSrc + 'css/*.css').on('change', browserSync.reload);
});


/* compile less -> autoprefixer -> images base64 -> minify (SRC -> DIST) */
gulp.task('css.dist', ['images.dist'], function() {  
  gulp.src(dir.appSrc + 'css/main.less')
    .pipe(less())
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        // browsers: [ "Safari >= 8", "iOS >= 7", "Chrome >= 30", "Firefox >= 20", "Explorer >= 9", "last 2 Edge versions" ],
        cascade: false
    }))
    .pipe(base64({
      extensions: ['jpg', 'png', 'svg'],
      debug: true,
      maxImageSize: 32*1024 // max size in bytes, 32kb limit is strongly recommended due to IE limitations
    }))                                                                                                                                                                                                                      
    .pipe(cleanCSS({
      keepSpecialComments : 0
    }))
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest(dir.appDst + 'css/'))
    .pipe(size({
      title: 'Size of LESS styles'
    }));
});


/* make critical CSS */
gulp.task('css.critical', () => {
  gulp.src(dir.appDst + 'css/main.css')
    .pipe(criticalCss())
    .pipe(gulp.dest(dir.appDst + 'css/critical/'));
});



/*********************
  JS
*********************/

/* js libs concat -> uglyfly -> rename (SRC -> DIST) */
gulp.task('js-lib.dist', function() {
  gulp.src(dir.appSrc + 'js/libs/*.js')
    .pipe(concat('libs.js'))
    .pipe(uglyfly())
    .pipe(rename('libs.min.js'))
    .pipe(gulp.dest(dir.appDst + 'js/'))
    .pipe(size({
      title: 'Size of JS'
    }));
});


/* script.js uglyfly -> copy (SRC -> DIST) */
gulp.task('js.dist', function() {
  gulp.src(dir.appSrc + 'js/scripts.js')
    .pipe(uglyfly())
    .pipe(gulp.dest(dir.appDst + 'js/'));
});



/*********************
  HTML
*********************/

/* copy HTML (SRC -> DIST) */
gulp.task('html.dist', function() {
  gulp.src([
    dir.appSrc + 'styleguide/*',
    dir.appSrc + 'styleguide/*/*'
  ])
    .pipe(gulp.dest(dir.appDst + 'styleguide/'))
    .pipe(size({
      title: 'Size of HTML'
    }));
});

/* copy images (SRC -> DIST) */
gulp.task('images.dist', function() {
  gulp.src([
    dir.appSrc + 'images/*',
    dir.appSrc + 'images/*/*'
  ])
    .pipe(gulp.dest(dir.appDst + 'images/'))
    .pipe(size({
      title: 'Size of images'
    }));
});

/* copy fonts (SRC -> DIST) */
gulp.task('fonts.dist', function() {
  gulp.src([
    dir.appSrc + 'css/fonts/*'
  ])
    .pipe(gulp.dest(dir.appDst + 'css/fonts/'))
    .pipe(size({
      title: 'Size of fonts'
    }));
});


/*********************
  Fileinclude
*********************/

gulp.task('fileinclude', function() {
  gulp.src([dir.appSrc + 'templates/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest(dir.appSrc + 'result'));
});


/*********************
  Webserver
*********************/

gulp.task('browser-sync', () => {
  browserSync({
    server: {
      baseDir: dir.appSrc+"/styleguide/00-index.html"
    }
  });
});



/* Task when running `gulp build` from terminal */
// gulp.task('build', ['minify-css', 'concat-js', 'minify-js']);  


/* Task when running `gulp` from terminal */
// gulp.task('watch', ['compile-less', 'watch-less']);

/* Task when running `gulp` from terminal */
// gulp.task('less', ['compile-less','minify-css']);
// NONON gulp.task('less', gulp.series('compile-less', 'minify-css'))

// gulp.task('less', function () {
  // gulpSequence('compile-less', 'minify-css')()
// })

// gulp.task('less1', ['compile-less']);
// gulp.task('less2', ['minify-css']);
/* Task when running `gulp build` from terminal */
// gulp.task('js', ['concat-js', 'minify-js']);  


/* Task when running `gulp` from terminal */
gulp.task('default', ['css.watch']);
gulp.task('include', ['fileinclude']);
gulp.task('dist', ['images.dist','fonts.dist','html.dist','css.dist','js-lib.dist','js-lib.dist','js.dist']);

