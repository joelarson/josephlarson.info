import gulp from 'gulp';
import gulpsass from 'gulp-ruby-sass';
import autoprefixer from 'gulp-autoprefixer';
import cssnano from 'gulp-cssnano';
import notify from 'gulp-notify';  // get os notificatio;
import sourcemaps from 'gulp-sourcemaps';
import gulpif from 'gulp-if';

import settings from '../settings';


function sass() {
    settings.sass.forEach((pathPair) => {
        gulpsass(pathPair.src, { sourcemap: true, emitCompileError: true })
            .on('error', notify.onError(error => ({
                title: 'SASS Error',
                message: `SASS compilation failed :( \n ${error}`,
            })))
            .pipe(sourcemaps.init())
            .pipe(autoprefixer())
            .pipe(gulpif(process.env.NODE_ENV === 'production', cssnano()))
            .pipe(sourcemaps.write('.', {
                includeContent: false,
                sourceRoot: 'source',
            }))
            .pipe(gulp.dest(pathPair.dest));
    });
}


export default sass;
