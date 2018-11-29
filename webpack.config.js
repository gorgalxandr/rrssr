const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const browser = {
  mode: process.env.NODE_ENV || 'development',
  devServer: {
    contentBase: path.join(__dirname, 'src')
  },
  entry: {
    bundle: [
      '@babel/polyfill',
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
        use: 'babel-loader',
        // query: {
        //   presets: ['stage-0']
        // }
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
            // 'postcss-loader',
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
  ],
  resolve: {
    extensions: ['.js', '.json', '.styl'],
    // mainFields: ['module', 'browser', 'main']
  },
  target: 'web'
}

const server = {
  mode: process.env.NODE_ENV || 'development',
  entry: {
    server: [
      '@babel/polyfill',
      './src/server/index.js'
    ]
  },
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
        use: 'babel-loader',
        // query: {
        //   presets: ['stage-0']
        // }
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
    }),
    new MiniCssExtractPlugin({
      filename: './public/styles/[name].css',
      chunkFilename: './public/styles/[id].css'
    })
  ],
  resolve: {
    extensions: ['.js', '.json', '.styl'],
    // mainFields: ['module', 'browser', 'main']
  },
  target: 'node'
}

module.exports = [browser, server]