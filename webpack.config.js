var webpack = require('webpack');
var path = require('path');

module.exports = {
  context: __dirname + "/app",
  entry: {
    javascript: "./app.js",
    html: "./index.html"
  },
  output: {
    filename: "app.js",
    path: __dirname + "/dist",
  },
  resolve: {
      extensions: ['', '.js', '.scss', 'json']
  },
  module: {
      loaders: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loaders: ["react-hot", "babel?presets[]=react,presets[]=es2015"]
          },
          {
            test: /\.scss$/,
            loader: 'style!css!sass'
          },
          {
            test: /\.html$/,
            loader: "file?name=[name].[ext]",
          },
          {
            test: /\.json$/,
            loader: "json-loader",
          },
          { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' },
        ]
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ]
};
