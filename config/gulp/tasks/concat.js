import gulp from 'gulp';

import settings from '../settings';


function concat() {
    settings.concat.forEach(
        pathPair => gulp.src([pathPair.src])
            .pipe(concat(pathPair.dest))
            .pipe(gulp.dest('.'))
    );
}


export default concat;
