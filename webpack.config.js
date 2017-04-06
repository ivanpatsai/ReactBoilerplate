const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
  entry: [
    'script-loader!jquery/dist/jquery.min.js',
    'script-loader!foundation-sites/dist/js/foundation.min.js',
    './app/app.jsx'
  ],

  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      'node_modules',
      path.resolve(__dirname, './app/components'),
    ]
  },
  externals: {
    jquery: 'jQuery',
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        options: {
          //stage-0 for all es6 experimental features
          presets: ['react', 'es2015', 'stage-0']
        },
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/
      },

      {
        test: /\.scss$/,
        //sass watcher
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                includePaths: [
                  path.resolve(__dirname, 'node_modules/foundation-sites/scss'),
                ]
              }
            }
          ]
        })
      }

    ]
  },
  plugins: [
    //separate css file
    new ExtractTextPlugin({
      filename: './public/[name].bundle.css',
      allChunks: true
    }),
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery'
    }),
  ],
  //for debugging purposes
  devtool: 'cheap-module-eval-source-map'
};