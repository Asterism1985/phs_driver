var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');

///minify the code for production
var templateCache = require('gulp-angular-templatecache');
var ngAnnotate = require('gulp-ng-annotate');
var useref = require('gulp-useref');
var stylish = require('jshint-stylish');
var jshint = require('gulp-jshint');
var livereload = require('gulp-livereload');
var preprocess = require('gulp-preprocess');
var uglify = require('gulp-uglify');

var paths = {
  sass: ['./scss/**/*.scss'],
  index: ['./phs/index.html'],
  templatecache: ['./phs/templates/*.html', './phs/templates/**/*.html'],
  js: ['./phs/js/*.js', './phs/js/**/*.js'],
  vendors: ['./node_modules/angular-localforage/dist/angular-localForage.min.js',
    './node_modules/angular-localforage/bower_components/localforage/dist/localForage.min.js',
    './node_modules/ng-file-upload/dist/ng-file-upload-shim.min.js',
    './node_modules/ng-file-upload/dist/ng-file-upload.min.js',
    './phs/vendors/sektor.js'
  ],
  libs: [
  './lib/ionic/js/ionic.bundle.js',
  './lib/ngCordova/dist/ng-cordova.js',
  './lib/countUp.js/dist/countUp.min.js',
  './lib/countup-angularjs-directive/dist/countup-angularjs-directive.min.js'
  ],
  cleanFolder: ['./www/js', './www/templates'],
};

gulp.task('default', ['sass', 'copy-html','templatecache', 'copy-vendors', 'copy-libs', 'compile-js']);

gulp.task('production', ['default'], function() {
  return gulp.src([
      'www/js/phsdriver.js',
    ])
    .pipe(concat('phsdriver.js'))
    .pipe(uglify())
    .pipe(gulp.dest('www/js'))
    .on('end', function() {
      console.log('Compress PROD DONE');
    });
});

gulp.task('copy-vendors', function copyVendors() {
  gulp.src(paths.vendors)
    .pipe(gulp.dest('./www/vendors'));
});

gulp.task('copy-html', function copyHtml() {
  gulp.src(paths.index)
    .pipe(gulp.dest('./www'))
    .pipe(livereload());
});

gulp.task('copy-js', function copyJS() {
  gulp.src(paths.css)
    .pipe(gulp.dest('./www/js'))
    .pipe(livereload());
});


gulp.task('copy-libs', function copyLibs() {
  gulp.src(paths.libs)
    .pipe(gulp.dest('./www/lib'));
});

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('compile-js', function compileJs() {
  gulp.src(paths.js)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(ngAnnotate())
    .pipe(concat('phsdriver.js'))
    .pipe(gulp.dest('./www/js'))
    .pipe(livereload());
});


gulp.task('templatecache', function(done) {
  gulp.src(paths.templatecache)

  .pipe(templateCache({
      standalone: true,
      filename: 'phsviews.js',
      module: 'phsDriverApp.templates',
      root: 'templates'
    }))
    .pipe(gulp.dest('./www/js/'))
    .pipe(livereload())
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});