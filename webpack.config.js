const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path');

const sassLoaders = [
  'css-loader',
  'sass-loader?indentedSyntax=sass&includePaths[]=' + path.resolve(__dirname, './src/stylehseets')
]

module.exports = {
  target: 'node',
  entry: {
    browser: './src/browser/index.js',
    server: './src/server/index.js'
  },
  output: {
    filename: '[name]-bundle.js',
    path: path.resolve(__dirname, 'dist/assets')
  },
  plugins: [
    new ExtractTextPlugin('style.css')
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.sass'],
    alias: {
      Stylesheets: path.resolve(__dirname, './src/stylesheets')
    }
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.sass$|\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: sassLoaders.join('!')
        })
      }
    ]
  }
};
