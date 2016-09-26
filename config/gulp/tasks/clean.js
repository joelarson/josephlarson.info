import del from 'del';

import settings from '../settings';


function clean() {
    settings.clean.forEach(taskPath => del(taskPath));
}


export default clean;
