'use strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    rimraf = require('rimraf'),
    runSequence = require('run-sequence'),
    browserSync = require('browser-sync').create();


var paths = {
    styles: 'scss/**/*.scss',
    scripts: 'www/app/**/*.js',
    images: 'www/img/**/*',
    html: {
        main: 'www/index.html',
        files: 'www/app/views/**/*'
    },
    fonts: [
        'www/lib/bootstrap/fonts/**/*',
        'www/lib/font-awesome/fonts/**/*'
    ]
};

/**
 * Compile SCSS files to www/css/*.css
 */
gulp.task('sass', function () {
    return gulp.src('scss/app.scss')
        .pipe($.sass().on('error', $.sass.logError))
        .pipe($.autoprefixer({
            browsers: ['> 1%', 'last 2 versions', 'ie 8', 'ie 9']
        }))
        .pipe(gulp.dest('www/css/'))
        .pipe($.cleanCss({
            keepSpecialComments: 0
        }))
        .pipe($.rename({extname: '.min.css'}))
        .pipe(gulp.dest('www/css/'))
        .pipe(browserSync.stream());
});

/**
 * Shows JS warnings and errors
 */
gulp.task('jshint', function () {
    return gulp.src(paths.scripts)
        .pipe($.jshint())
        .pipe($.jshint.reporter('default'));
});

/**
 * Launch the app in a local webserver and shows it in the default browser while continuously sync files
 * SCSS changes are injected without reloading the browser
 * HTML and JS changes reload the browser
 */
gulp.task('serve', ['jshint', 'sass'], function () {
    browserSync.init({
        server: 'www',
        open: false
    });

    var notifyFileChanged = function (event) {
        console.log('File ' + event.type + ' : ' + event.path);
    };

    gulp.watch(paths.styles, ['sass']).on('change', notifyFileChanged);

    gulp.watch([paths.html.main, paths.html.files]).on('change', function (event) {
        notifyFileChanged(event);
        browserSync.reload();
    });

    gulp.watch(paths.scripts).on('change', function (event) {
        notifyFileChanged(event);
        gulp.src(event.path)
            .pipe($.jshint())
            .pipe($.jshint.reporter('default'));
        browserSync.reload();
    });
});

/**
 * Launch the built production app in a local webserver and shows it in the default browser
 */
gulp.task('serve:dist', ['build'], function () {
    browserSync.init({
        server: 'build/dist',
        open: false
    });
});

/**
 * The default gulp task is to run the "serve" task
 */
gulp.task('default', ['serve']);


/**
 * Distribution build tasks are below
 * Production files are minified, concatenated and moved to the "build/dist" folder
 */


/**
 * Delete the build and build/dist folder
 */
gulp.task('build:clean', function (cb) {
    rimraf('build/dist', cb);
});

/**
 * Move angular views to the distribution folder
 */
gulp.task('build:html', function () {
    return gulp.src(paths.html.files)
        .pipe($.htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('build/dist/app/views'));
});

/**
 * Move images to the distribution folder
 */
gulp.task('build:images', function () {
    return gulp.src(paths.images)
        .pipe(gulp.dest('build/dist/img'));
});

/**
 * Move hidden files (.*) to the distribution folder
 */
gulp.task('build:extras', function () {
    var patterns = [
        'www/*/.*',
        'www/favicon.ico',
        '!www/*/.gitkeep'
    ];

    return gulp.src(patterns, {dot: true})
        .pipe(gulp.dest('build/dist'));
});

/**
 * Move fonts files (woff, ttf, etc.) to the distribution folder
 */
gulp.task('build:fonts', function () {
    return gulp.src(paths.fonts)
        .pipe(gulp.dest('build/dist/fonts'));
});

/**
 * Minify, concatenate and move CSS / JS files to the distribution folder
 */
gulp.task('build:src', ['build:html', 'jshint', 'sass'], function () {
    var jsFilter = $.filter('**/*.js', {restore: true});
    var cssFilter = $.filter('**/*.css', {restore: true});
    var htmlFilter = $.filter('**/*.html', {restore: true});
    var indexHtmlFilter = $.filter(['**/*', '!' + paths.html.main], { restore: true });

    return gulp.src(paths.html.main)
        .pipe($.useref({searchPath: ['www']}))
        .pipe(jsFilter)
        .pipe($.ngAnnotate())
        .pipe($.uglify())
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe($.cleanCss({
            keepSpecialComments: 0,
            cache: true
        }))
        .pipe(cssFilter.restore)
        .pipe(htmlFilter)
        .pipe($.htmlmin({collapseWhitespace: true}))
        .pipe(htmlFilter.restore)
        .pipe(indexHtmlFilter)
        .pipe($.rev())
        .pipe(indexHtmlFilter.restore)
        .pipe($.revReplace())
        .pipe(gulp.dest('build/dist'));
});

/**
 * Launch all the build tasks
 */
gulp.task('build', ['build:clean'], function (callback) {
    runSequence([
        'build:images',
        'build:extras',
        'build:fonts',
        'build:src'
    ], callback);
});