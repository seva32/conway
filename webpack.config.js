/* eslint-disable linebreak-style */
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    vendor: ['react', 'react-dom'],
    main: [
      'react-hot-loader/patch',
      '@babel/runtime/regenerator',
      './src/index.js',
    ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
    // publicPath: '/conway',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(jpg|png|ico|gif|eot|otf|woff|woff2|ttf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
              name: 'images/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack', 'url-loader'],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.resolve(__dirname, 'public'),
    },
    hot: true,
  },
  devtool: 'source-map',
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new HtmlWebpackPlugin({
      title: 'Conway',
      template: 'index.html',
    }),
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     NODE_ENV: JSON.stringify('development'),
    //     WEBPACK: true,
    //     SERVER_URL: JSON.stringify(serverUrl),
    //     PAYPAL_CLIENT: JSON.stringify(paypalClient),
    //     BRAINTREE_AUTHORIZATION: JSON.stringify(braintreeAuth),
    //     GOOGLE_CLIENT_ID: JSON.stringify(googleClientId),
    //   },
    // }),
    // new CopyWebpackPlugin({
    //   patterns: [{ from: './**', to: './', context: './public' }],
    // }),
    // new webpack.HotModuleReplacementPlugin(),
  ],
};
