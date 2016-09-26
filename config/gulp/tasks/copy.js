import gulp from 'gulp';

import settings from '../settings';


function copy() {
    settings.copy.forEach(
        pathPair => gulp.src([pathPair.src])
            .pipe(gulp.dest(pathPair.dest))
    );
}


export default copy;
