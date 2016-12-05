import gutil from 'gulp-util';
import webpack from 'webpack';
import del from 'del';

import webpackConfig from '../webpack.config';


function js(callback) {
    // run webpack
    webpack(webpackConfig, (err, stats) => {
        if (err) throw new gutil.PluginError('webpack', err);
        gutil.log('[webpack]', stats.toString({
            colors: true,
        }));
        // bundles all get gzipped so we can feel warm and fuzzy by the size
        // but we don't actually want that file in the static dir so we delete it
        del(`${webpackConfig.output.path}**/*.gz`);
        callback();
    });
}


export default js;
