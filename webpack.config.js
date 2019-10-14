const webpack = require('webpack');
const path = require('path');

const PATHS = {
    src: path.join(process.cwd(), 'src', 'js'),
    dist: path.join(process.cwd(), 'public', 'js')
};

module.exports = {
    output: {
        path: PATHS.dist,
        filename: '[name].js',
        chunkFilename: '[name].js',
        publicPath: '/js/'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    module: {
      rules: [
        {
            test: /\.(tsx?|jsx?)$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
        }
      ]
    },
    devtool: 'source-map'
};  