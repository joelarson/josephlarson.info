'use strict';
var gulp = require('gulp');
var gutil = require('gulp-util');

// disables notifier by default, enable with `export ENABLE_NOTIFIER=true`
if (process.env.ENABLE_NOTIFIER != 'true') process.env.DISABLE_NOTIFIER = 'true';
var notify = require('gulp-notify');
// auto reload/stream changes to browser on html/js/css change
var browserSync = require('browser-sync').create();


var APP_PORT = 8001;
var DJANGO_PORT = APP_PORT + 1000;

var PATHS = {
    'js': [
        {'src': './assets/js/app.js', 'dest': './core/static/js/app.js'},
    ],
    'sass': [
        {'src': './assets/scss/**/*.scss', 'dest': './core/static/css/'},
    ],
    'concat': [
        // {'src': './assets/js/lib/**/*.js', 'dest': './core/static/js/libs.js'},
    ],
    'copy': [
        // {'src': './assets/img/**/*', 'dest': './core/static/img/'},
    ],
    'clean': [
        './core/static/**/*',
    ]
};


///////////////////////////////
// task: build
gulp.task('build', ['sass', 'js', 'concat', 'copy']);


///////////////////////////////
// task: clean
gulp.task('clean', function() {
    var del = require('del');

    PATHS.clean.forEach(function(path) {
        del(path);
    });
});


///////////////////////////////
// task: js
gulp.task('js', function() {
    return bundle(false);
});

function bundle(watch) {
    watch = watch === undefined ? false : watch;

    var babelify = require('babelify');
    var browserify = require('browserify');
    var buffer = require('vinyl-buffer');  // buffer and source allow us to turn watchify into a gulp compatible interface
    var source = require('vinyl-source-stream');
    var watchify = require('watchify');  // makes browserify way faster by rebuilding only what was changed
    var sourcemaps = require('gulp-sourcemaps');
    var es = require('event-stream');

    var subTasks = PATHS.js.map(function(pathPair) {
        var props = {
            entries: [pathPair.src],
            transform: [[babelify]], // uses babel with browserify
        };
        // use watchify in watch mode
        var b = watch ? watchify(browserify(props)) : browserify(props);

        var rebundleCount = 0;
        function rebundle() {
            rebundleCount += 1;
            if (watch && rebundleCount == 1) gutil.log('Initializing js...');
            if (watch && rebundleCount > 1) gutil.log('Updating js...');

            return b.bundle()
                .on('error', gutil.log.bind(gutil, 'Browserify Error'))  // log errors if they happen
                .on('error', notify.onError(function (error) {
                    return {title: 'Browserify Error', message: 'JS compilation failed :('};
                }))
                .pipe(source(pathPair.dest))
                .pipe(buffer())  // optional, remove if you don't need to buffer file contents
                .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
                // Add transformation tasks (e.g. uglify) to the pipeline here.
                .pipe(sourcemaps.write('.')) // writes .map file
                .pipe(gulp.dest('.'));
        }

        b.on('update', rebundle); // on any dep update, runs the bundler
        b.on('log', gutil.log); // output build logs to terminal

        return rebundle();
    });
    // merge subTasks into single stream
    return es.merge.apply(null, subTasks);
}


///////////////////////////////
// task: sass
gulp.task('sass', function() {
    var sass = require('gulp-ruby-sass');
    var sourcemaps = require('gulp-sourcemaps');
    var autoprefixer = require('gulp-autoprefixer');

    PATHS.sass.forEach(function(pathPair){
        sass(pathPair.src, {sourcemap: true, emitCompileError: true})
            .on('error', notify.onError(function (error) {
                return {title: 'SASS Error', message: 'SASS compilation failed :('};
            }))
            .pipe(sourcemaps.init())
            .pipe(autoprefixer())
            .pipe(sourcemaps.write('.', {
                includeContent: false,
                sourceRoot: 'source',
            }))
            .pipe(gulp.dest(pathPair.dest))
            .pipe(browserSync.stream({match: '**/*.css'}));
    });
});


///////////////////////////////
// task: concat
gulp.task('concat', function() {
    var concat = require('gulp-concat');

    PATHS.concat.forEach(function(pathPair){
        return gulp.src([pathPair.src])
            .pipe(concat(pathPair.dest))
            .pipe(gulp.dest('.'));
    });
});


///////////////////////////////
// task: copy
gulp.task('copy', function() {
    PATHS.copy.forEach(function(pathPair){
        return gulp.src([pathPair.src])
            .pipe(gulp.dest(pathPair.dest));
    });
});


///////////////////////////////
// task: server
gulp.task('server', ['watch-html'], function(){
    var spawn = require('child_process').spawn;
    var os = require('os');

    var server_process = spawn(
        'python',
        ['manage.py', 'runserver_plus', DJANGO_PORT],
        {stdio: 'inherit'}
    );

    // kill gulp when django server exits
    server_process.on('exit', function() {
        process.kill();
    });
    // stop django server when gulp stops
    process.on('exit', function(){
        server_process.kill();
    });

    browserSync.init({
        proxy: {
            target: '127.0.0.1:' + DJANGO_PORT,
            // I have no idea why this works, but if you comment it out
            // cas redirects to the internal ip address...
            reqHeaders: function(config) {},
        },
        port: APP_PORT,
        open: false // don't aut open browser
    });
});


///////////////////////////////
// task: watch
gulp.task('watch', ['watch-js', 'watch-sass', 'watch-html', 'watch-concat', 'watch-copy', 'server']);

gulp.task('watch-js', function() {
    var sources = [];
    PATHS.js.forEach(function(pathPair){sources.push(pathPair.src)});
    gulp.watch(sources, browserSync.reload);

    return bundle(true);
});

gulp.task('watch-sass', ['sass'], function() {
    var sources = [];
    PATHS.sass.forEach(function(pathPair){sources.push(pathPair.src)});
    gulp.watch(sources, ['sass']);
});

gulp.task('watch-html', function() {
    gulp.watch('./*/templates/**/*.html').on('change', browserSync.reload);
});

gulp.task('watch-concat', function() {
    var sources = [];
    PATHS.concat.forEach(function(pathPair){sources.push(pathPair.src)});
    gulp.watch(sources, ['concat'], browserSync.reload);
});

gulp.task('watch-copy', function() {
    var sources = [];
    PATHS.copy.forEach(function(pathPair){sources.push(pathPair.src)});
    gulp.watch(sources, ['copy'], browserSync.reload);
});
