import path from 'path';
import gutil from 'gulp-util';


// set NODE_ENV to production if --prod flag is set
if (gutil.env.prod) process.env.NODE_ENV = 'production';

// disables notifier by default, enable with `export ENABLE_NOTIFIER=true`
if (process.env.ENABLE_NOTIFIER !== 'true') process.env.DISABLE_NOTIFIER = 'true';


const PROJECT_ROOT = path.resolve(__dirname, '..', '..');
const JS_ROOT = path.resolve(PROJECT_ROOT, 'assets', 'js');
const APP_PORT = 8001;

const settings = {
    root: PROJECT_ROOT,

    js: {
        root: JS_ROOT,
        entries: {
            local: {
                app: [path.resolve(JS_ROOT, 'index.js')],
            },
            external: {
                vendor: [
                    // 'jquery',
                    'moment',
                    'react',
                    'react-dom',
                    'redux',
                    'redux-thunk',
                    'react-redux',
                    'redux-devtools',
                    'react-hot-loader',
                ],
            },
        },
        output: {
            path: path.resolve(PROJECT_ROOT, 'core', 'static', 'js'),
            publicPath: '/static/js/',
            filename: '[name].bundle.js',
        },
    },

    sass: [
        { src: './assets/scss/**/*.scss', dest: './core/static/css/' },
    ],

    concat: [
        // {src: './assets/js/lib/**/*.js', dest: './core/static/js/libs.js'},
    ],

    copy: [
        { src: './assets/img/**/*', dest: './core/static/img/' },
        { src: './assets/js/lib/**/*', dest: './core/static/js/lib/' },
    ],

    clean: [
        './core/static/**/*',
    ],

    server: {
        appPort: APP_PORT,
        djangoPort: APP_PORT + 10000,
    },
};


export default settings;
