const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.[contenthash].js",
    clean: true,
    publicPath: "/", // важно: все ассеты от корня
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      { test: /\.svg$/, use: ["@svgr/webpack"], issuer: /\.[jt]sx?$/ },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|ico|webp)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    // Генерим index.html + инжектим <script src="bundle.js">
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
      inject: "body",
    }),
    // Копируем из public всё, кроме index.html
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "public"),
          filter: async (resourcePath) => !resourcePath.endsWith("index.html"),
          to: path.resolve(__dirname, "dist"),
        },
      ],
    }),
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"), // теперь сервим свою сборку
    },
    port: 3000,
    hot: true,
    open: true,
    historyApiFallback: true, // SPA: все маршруты на index.html
  },
  stats: {
    children: true,
    errorDetails: true,
  },
};
