var webpack = require('webpack')
var path = require('path')
module.exports = {
  entry: {
    sample: `${__dirname}/src/index.js`,
    vendor: [
      'ramda'
    ]
  },
  stats: {
    colors: true,
    modules: true,
    reasons: true,
    errorDetails: true
  },
  mode: 'development',
  output: {
    path: `${__dirname}/dist`,
    filename: '[name].js'
  },
  target: 'node',
  resolve: {
    modules: [`${__dirname}/../../`, 'node_modules']
  },
  resolveLoader: {
    alias: {
      'ramda-loader': `${__dirname}/../`
    }
  },
  optimization: {
    minimize: false,
    runtimeChunk: "single", // enable "runtime" chunk
    namedChunks: true,
    splitChunks: {
      cacheGroups: {
        default: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor"
        },
        sample: {
          test: /[\\/]node_modules[\\/]/,
          name: "sample"
        }
      }
    }
  },
  module: {
    noParse: [/ramda/],
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['babel-preset-es2015']
        }
      }
    }, {
      test: /.*/,
      exclude: /node_modules|wrapper/,
      use: 'ramda-loader?debug=true'
    }]
  }
}
