const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    'prod-vendor': './src/js/vendor.js',
    'prod-script': './src/js/main.js'
  },
  output: {
    filename: '[name].js?v=2.0.1',
    path: path.resolve(__dirname, 'wp-content/themes/stone-style/dist'),
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.glsl$/,
        use: ['raw-loader']
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'prod-style.css?v=2.0.1'
    })
  ],
  resolve: {
    extensions: ['.js', '.glsl']
  }
};
