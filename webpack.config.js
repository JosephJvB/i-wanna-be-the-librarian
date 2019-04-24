const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  // put babel/poly before entry so browser code can be polyfilled (needed this for async functions on front end)
  entry: [/*'@babel/polyfill',*/ path.join(__dirname, 'client/index.ts')],
  output: {
    path: path.join(__dirname, 'dist-client'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      // some default thing
      // {
      //   test: /\.m?js$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       presets: ['@babel/preset-env']
      //     }
      //   }
      // },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: "ts-loader",
        options: {
          configFile: "tsconfig.client.json",
          appendTsSuffixTo: [/\.vue$/]
        }
      },
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
  //   alias: {
  //     'vue$': 'vue/dist/vue.esm.js'
  //   }
  },
  plugins: [
    new VueLoaderPlugin(),
    // this one from harrison, thanks harrison
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'client/index.html')
    })
  ]
}