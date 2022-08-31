const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = (env) => {
  const isProduction = process.env.NODE_ENV === 'production';
  const envPath = env.ENVIRONMENT ? `.${env.ENVIRONMENT}.env` : '.env';

  return {
    entry: './src/index.tsx',
    output: {
      path: path.join(__dirname, 'build'),
      filename: 'index.bundle.js',
    },
    devServer: {
      open: true,
      host: 'localhost',
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'src', 'index.html'),
      }),
      new Dotenv({
        path: envPath,
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/i,
          loader: 'ts-loader',
          exclude: ['/node_modules/'],
          options: {
            compilerOptions: {
              noEmit: false,
            },
          },
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
          type: 'asset',
        },
        {
          test: /\.(css|scss)$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.js$/,
          enforce: 'pre',
          use: ['source-map-loader'],
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
    },
    mode: isProduction ? 'production' : 'development',
  };
};
