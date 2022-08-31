const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = (env, args) => {
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
      // Add your plugins here
      // Learn more about plugins from https://webpack.js.org/configuration/plugins/
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

        // Add your rules for custom modules here
        // Learn more about loaders from https://webpack.js.org/loaders/
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
    },
    mode: isProduction ? 'production' : 'development',
  };
};
