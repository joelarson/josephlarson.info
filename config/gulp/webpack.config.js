import gutil from 'gulp-util';
import webpack from 'webpack';
import CompressionWebpackPlugin from 'compression-webpack-plugin';
import ForceCaseSensitivityPlugin from 'force-case-sensitivity-webpack-plugin';

import settings from './settings';


export default {
    context: settings.root,
    // debug: process.env.NODE_ENV !== 'production',
    devtool: process.env.NODE_ENV !== 'production' ? '#eval-source-map' : 'source-map',
    entry: {
        ...settings.js.entries.local,
        ...settings.js.entries.external,
    },
    output: {
        ...settings.js.output,
    },
    plugins: process.env.NODE_ENV === 'production' ? [
        new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: settings.js.output.filename,
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({ comments: false }),
        new CompressionWebpackPlugin({ threshold: 0 }),
    ] : [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: settings.js.output.filename,
        }),
        new webpack.NamedModulesPlugin(),
        new ForceCaseSensitivityPlugin(),  // OSX wont check but other unix os will
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [
            settings.js.root,  // allows absolute paths from the project root
            'node_modules',
        ],
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    babelrc: false,
                    presets: ['react', ['es2015', { modules: false }]],
                    plugins: [
                        // 'transform-runtime',  // es2015 polyfills
                        'transform-object-rest-spread',
                    ],
                },
            },
            { test: /\.json$/, loader: 'json-loader' },
        ],
    },
};
