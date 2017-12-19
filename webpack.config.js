/*
    ./webpack.config.js
*/

const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: './src/index.jsx',
    output: {
        path: path.resolve('dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        loaders: [
        { 
            test: /\.js?$/, 
            loader: 'babel-loader', 
            exclude: /node_modules/,
            query: {
                "presets": ["es2015", "stage-0"]
            }
        },
        { 
            test: /\.jsx?$/, 
            loader: 'babel-loader', 
            exclude: /node_modules/,
            query:{
                "presets": ["react", "es2015", "stage-0"]
            } 
        }
        ]
    }
}