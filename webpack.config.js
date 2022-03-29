const HtmlWebpackPlugin = require("html-webpack-plugin");
const miniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "/src/index.js",
  output: {
    assetModuleFilename: "images/[hash][ext][query]",
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /\.node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.html/i,
        use: [
          {
            loader: "html-loader",
            options: {
              minimize: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        type: "asset",
        use: [
          {
            loader: "image-webpack-loader",
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: miniCssExtractPlugin.loader,
            options: {
              publicPath: "./",
            },
          },
          "css-loader",
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
    }),
    new miniCssExtractPlugin(),
  ],
};
