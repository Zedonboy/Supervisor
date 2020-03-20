const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const minicss = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = env => {
  console.log(env)
  let production = false
  if(!env) production = false
  else {
    let ans = env.production
    if(ans == 'false'){
      production = false
    } else if(ans == true) production = true
  }
  return {
    entry: "./src/client.ts",
    mode: production ? "production" : "development",
    resolve: {
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: [".ts", ".tsx", ".js", ".css", "jsx", "scss", ".vue"]
    },

    output: {
      path: production ? path.resolve(__dirname, "dist") :  path.resolve(__dirname, "dev_dist"),
      filename: "client.js"
    },
    devtool: production ? "none" : "source-map",
    devServer: {
      contentBase: path.join(__dirname, "dev_dist"),
      hot: true
    },
    target: production ? "electron-main" : "web",
    module: {
      rules: [
        {
          test: /\.(png|woff|woff2|eot|ttf|svg)$/,
          loader: "file-loader",
          options: {
            esModule: false
          }
        },
        
        {
          test: /\.css$/,
          use: ["style-loader", minicss.loader, "css-loader"]
        },
        {
          test: /\.vue$/,
          loader: "vue-loader"
        },
        {
          test: /\.ts(x?)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "ts-loader"
            }
          ]
        },
        {
          test: /\.s(c|a)ss$/,
          use: [
            "vue-style-loader",
            "css-loader",
            {
              loader: "sass-loader",
              // Requires sass-loader@^7.0.0
              options: {
                implementation: require("sass"),
                fiber: require("fibers"),
                indentedSyntax: true // optional
              },
              // Requires sass-loader@^8.0.0
              options: {
                implementation: require("sass"),
                sassOptions: {
                  fiber: require("fibers"),
                  indentedSyntax: true // optional
                }
              }
            }
          ]
        }
      ]
    },
    plugins: [
      // make sure to include the plugin!
      new minicss({
        filename: "app.css"
      }),
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        title : "superVisor",
        template : "index.html"
      })
    ]
  };
};
