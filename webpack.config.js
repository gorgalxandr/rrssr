const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const browser = {
  mode: 'developemnt',
  entry: {
    bundle: [
      'babel-polyfill',
      './src/browser/index.js'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      { 
        test: /\.(js)$/,
        use: 'babel-loader'
      },
      {
        test: /\.(jpe?g|png|gif|woff|svg|eot|ttf)\??.*$/,
        loader: 'url-loader',
        options: {
          limit: 8192
        }
      },
      {
        test: /(\.css|\.styl)$/,
        use: process.env.NODE_ENV === 'production'
          ? [ MiniCssExtractPlugin.loader, 'css-loader' ]
          : [
            'style-loader',
            'css-loader',
            'postcss-loader',
            'stylus-loader'
            // {
            //   loader: 'stylus-loader',
            //   options: {
            //     // use: [require('yeticss')]
            //   }
            // }
        ],
        exclude: path.resolve(__dirname, './node_modules')
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: 'true'
    })
  ]
}

const server = {
  mode: 'developemnt',
  entry: {
    server: [
      'babel-polyfill',
      './src/server/index.js'
    ]
  },
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: __dirname,
    filename: './dist/server.js',
    publicPath: '/',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      { 
        test: /\.(js)$/,
        use: 'babel-loader'
      },
      {
        test: /\.(jpe?g|png|gif|woff|svg|eot|ttf)\??.*$/,
        loader: 'url-loader',
        options: {
          limit: 8192
        }
      },
      {
        test: /(\.css|\.styl)$/,
        use: [ MiniCssExtractPlugin.loader, 'css-loader', 'stylus-loader' ],
        exclude: path.resolve(__dirname, './node_modules')
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: 'false'
    })
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }))
  ]
}

module.exports = [browser, server]