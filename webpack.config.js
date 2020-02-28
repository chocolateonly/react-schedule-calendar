const path = require('path')
const HtmlPlugin=require('html-webpack-plugin')

module.exports = {
  mode: "development",
  entry: {
    app: path.join(__dirname, 'src/index.js')
  },
  output: {
    filename: 'boundle.js',
    path: path.join(__dirname, 'dist'),
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: path.join(__dirname, 'node_modules'),
        use: ['babel-loader']
      },{
        test: /\.less$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "less-loader" // compiles Less to CSS
        }
        ],
      },
    ],
  },
  plugins: [
    new HtmlPlugin({
      filename: 'index.html',
      template: path.join(__dirname, 'src/index.html'),
    })
  ],

  devServer: {
    hot: true,
    host: '0.0.0.0',
    port: '3000',
    overlay: true
  },
  }