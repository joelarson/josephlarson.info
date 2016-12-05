import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import BrowserSync from 'browser-sync';
import childProcess from 'child_process';

import settings from '../settings';
import webpackConfigBase from '../webpack.config';


const webpackConfig = { ...webpackConfigBase };
// add hot loader paths to local entries
Object.keys(settings.js.entries.local).forEach(entryName => {
    webpackConfig.entry = {
        ...webpackConfig.entry,
        [entryName]: [
            'react-hot-loader/patch',
            'webpack-hot-middleware/client',
            ...webpackConfig.entry[entryName],
        ],
    };
});
// add react hot loader to babel config
webpackConfig.module = { ...webpackConfig.module, loaders: [...webpackConfig.module.loaders] };
webpackConfig.module.loaders[0] = {
    ...webpackConfig.module.loaders[0],
    query: {
        ...webpackConfig.module.loaders[0].query,
        plugins: [
            'react-hot-loader/babel',  // hot load react components
            ...webpackConfig.module.loaders[0].query.plugins,
        ],
    },
};
// add HMR and browsersync plugins to wbepackConfig
webpackConfig.plugins = [
    new webpack.HotModuleReplacementPlugin(),
    ...webpackConfig.plugins,
    new webpack.NoErrorsPlugin(),
];


function server() {
    // setup/start django dev server
    const serverProcess = childProcess.spawn(
        'python',
        ['manage.py', 'runserver_plus', settings.server.djangoPort],
        { stdio: 'inherit' }
    );
    // kill gulp when django server exits
    serverProcess.on('exit', () => process.kill());
    // stop django server when gulp stops
    process.on('exit', () => serverProcess.kill());

    const browsersync = BrowserSync.create();
    const compiler = webpack(webpackConfig);
    const options = {
        proxy: {
            target: `localhost:${settings.server.djangoPort}`,
            middleware: [
                webpackDevMiddleware(compiler, {
                    publicPath: webpackConfig.output.publicPath,
                    stats: {
                        colors: true,
                        chunks: false,
                        version: false,
                        hash: false,
                        timings: false,
                    },
                }),
                webpackHotMiddleware(compiler),
            ],
        },
        port: settings.server.appPort,
        open: false,
        files: [
            ...settings.sass.map(pathPair => `${pathPair.dest}**/*.css`),
            './*/templates/**/*.html',
        ],
    };

    browsersync.init(options);
}


export default server;
