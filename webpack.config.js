const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  entry : {
    index: ['./src/index.js'],
    edit: ['./src/edit.js']
  },
  output: {
    path: path.resolve(__dirname, 'public/assets'),
    filename: '[name]-bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options:{
            presets: ['env']
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {loader: 'css-loader', options: {url: false, sourceMap: true }},
          { loader: 'sass-loader', options: { sourceMap: true } }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles.css"
    })
  ],
  devServer:{
    contentBase: path.resolve(__dirname, 'public'),
    publicPath: '/assets/'
  },
  devtool: 'source-map',
  mode: devMode ? 'development' : 'production'
}
