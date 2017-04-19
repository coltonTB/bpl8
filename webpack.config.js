const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path');

const sassLoaders = [
  'css-loader',
  'sass-loader?indentedSyntax=sass&includePaths[]=' + path.resolve(__dirname, './src/stylehseets')
]

const serverConfig = {
  target: 'node',
  node: {
    __filename: false,
    __dirname: false
  },
  entry: {
    server: './src/server/index.js'
  },
  output: {
    filename: '[name]-bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'handler',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.sass'],
    alias: {
      Stylesheets: path.resolve(__dirname, './src/stylesheets')
    }
  },
  module: {
    loaders: [
      {
        test: /\.sass$|\.css$/,
        loader: 'null-loader'
      },
      {
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'stage-2', 'react'],
          plugins: ["transform-class-properties", ["inline-json-import", {}]]
        }
      }
    ]
  }
};

const browserConfig = {
  target: 'web',
  entry: './src/browser/index.js',
  output: {
    filename: 'browser-bundle.js',
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
          presets: ['es2015', 'stage-2', 'react'],
          plugins: ["transform-class-properties", ["inline-json-import", {}]]
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
}

module.exports = [serverConfig, browserConfig];
