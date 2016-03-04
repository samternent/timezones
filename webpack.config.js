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
      extensions: ['', '.js', '.scss'],
  },
  module: {
      loaders: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loaders: ["react-hot", "babel-loader"]
          },
          {
            test: /\.scss$/,
            loader: 'style!css!sass'
          },
          {
            test: /\.html$/,
            loader: "file?name=[name].[ext]",
          },
        ]
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ]
};
