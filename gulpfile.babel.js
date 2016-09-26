// to modify task settings, see config/gulp/settings.js
import gulp from 'gulp';

import settings from './config/gulp/settings';
import * as tasks from './config/gulp/tasks';


// /////////////////////////////
// task: clean

gulp.task('clean', tasks.clean);


// /////////////////////////////
// task: js

gulp.task('js', tasks.js);


// /////////////////////////////
// task: sass

gulp.task('sass', tasks.sass);


// /////////////////////////////
// task: concat

gulp.task('concat', tasks.concat);


// /////////////////////////////
// task: copy

gulp.task('copy', tasks.copy);


// /////////////////////////////
// task: build

gulp.task('build', ['clean', 'sass', 'js', 'concat', 'copy']);


// /////////////////////////////
// task: server

gulp.task('server', tasks.server);


// /////////////////////////////
// task: watch-sass

gulp.task('watch-sass', ['sass'], () => gulp.watch(
    settings.sass.map(pathPair => pathPair.src), ['sass']
));


// /////////////////////////////
// task: watch-concat

gulp.task('watch-concat', ['concat'], () => gulp.watch(
    settings.concat.map(pathPair => pathPair.src), ['concat']
));


// /////////////////////////////
// task: watch-copy

gulp.task('watch-copy', ['copy'], () => gulp.watch(
    settings.copy.map(pathPair => pathPair.src), ['copy']
));


// /////////////////////////////
// task: watch

gulp.task('watch', ['watch-sass', 'watch-concat', 'watch-copy', 'server']);
