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
var clean = require('gulp-clean');

var paths = {
  sass: ['./scss/**/*.scss'],
  fonts: ['./lib/ionic/fonts/*'],
  htmlIndex: ['./phs/index.html'],
  templatecache: ['./phs/templates/*.html', './phs/templates/**/*.html'],
  js: ['./phs/js/*.js', './phs/js/**/*.js'],
  appjs: ['./phs/js/app.js'],
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
  cleanJSFolder: ['./www/js'],
  cleanTemplatesFolder: ['./www/templates']
};
 
gulp.task('clean-scripts', function () {
  return gulp.src(paths.cleanJSFolder, {read: false})
    .pipe(clean());
});

gulp.task('clean-template', function () {
  return gulp.src(paths.cleanTemplatesFolder, {read: false})
    .pipe(clean());
});

gulp.task('clean-index', function () {
  return gulp.src('./www/index.html', {read: false})
    .pipe(clean());
});

gulp.task('default', ['sass', 'process-index-prod','templatecache', 'copy-vendors','copy-fonts', 'copy-libs', 'compile-js']);

//for development 
gulp.task('development', ['sass', 'process-index-development', 'copy-template', 'copy-vendors','copy-fonts', 'copy-libs', 'copy-js']);

gulp.task('process-index-development', ['clean-index'], function () {
  gulp.src(paths.htmlIndex)
  .pipe(preprocess({context: { NODE_ENV: 'development', DEBUG: true}})) //To set environment variables in-line
    .pipe(gulp.dest('./www'));
});

gulp.task('process-index-prod', ['clean-index'], function () {
  gulp.src(paths.htmlIndex)
  .pipe(preprocess({context: { NODE_ENV: 'production', DEBUG: true}})) //To set environment variables in-line
    .pipe(gulp.dest('./www'));
});

gulp.task('copy-template', ['clean-template'], function () {
  gulp.src(paths.templatecache)
    .pipe(gulp.dest('./www/templates'));
});

gulp.task('copy-js', ['clean-scripts'], function () {
  gulp.src(paths.js)
  .pipe(preprocess({context: { NODE_ENV: 'development', DEBUG: true}})) //To set environment variables in-line
    .pipe(gulp.dest('./www/js'));
});


gulp.task('production', ['default'], function() {
  return gulp.src([
      'www/js/phsdriver.js',
    ])
    .pipe(concat('phsdriver.js'))
    .pipe(uglify())
    .pipe(gulp.dest('www/js'))
    .on('end', function() {
      console.log('Obfucate the code for PROD DONE');
    });
});

gulp.task('copy-vendors', function copyVendors() {
  gulp.src(paths.vendors)
    .pipe(gulp.dest('./www/vendors'));
});

gulp.task('copy-fonts', function copyFonts() {
  gulp.src(paths.fonts)
    .pipe(gulp.dest('./www/lib/ionic/fonts/'))
    .pipe(livereload());
});


gulp.task('copy-libs', function copyLibs() {
  gulp.src(paths.libs)
    .pipe(gulp.dest('./www/lib/'));
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


gulp.task('templatecache', ['clean-template', 'clean-scripts'], function(done) {
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
  gulp.watch(paths.js, ['development']);
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