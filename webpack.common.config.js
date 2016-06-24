var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var precss       = require('precss');
var packages = require(path.resolve(__dirname, 'package.json'))

var node_modules = path.resolve(__dirname, 'node_modules');

var process = require('process');
var cwd = process.cwd();
// console.log(path.resolve(__dirname, "index.js"))

var config = {
    //devtool: 'inline-source-map',
		progress: true,
		debug: true,
		devtool: 'eval',
    context: cwd,
    resolve: {
        root:[__dirname],
        modulesDirectories: ["web_modules", "node_modules", "components", "less"],
        alias: {
        }
    },
    entry: {
      "main": ["./routers/index.js"],
      "vendors": ['react', 'react-dom', 'react-router', 'es6-promise', 'whatwg-fetch', 'fastclick', 'ua-parser-js']
    },//[ path.resolve(__dirname, 'app.js')],//'webpack/hot/dev-server',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        chunkFilename: '[chunkhash].chunk.js',
        publicPath: "/dist/"
    },
    // stats: {
    //     colors: true,
    //     modules: true,
    //     reasons: true,
    //     errorDetails: true
    // },

    module: {
        loaders: [
					// css
          {
            test: /\.css$/,//"modifyVars": '+ JSON.stringify(require('./variables.less.js'))  +',
            loader: 'style!css'
          },
          // LESS
          {
            test: /\.less$/,//"modifyVars": '+ JSON.stringify(require('./variables.less.js'))  +',
            loader: 'style!css!postcss!less'
          },
          {
            test: /\.((woff2?|svg)(\?v=[0-9]\.[0-9]\.[0-9]))|(woff2?|svg|jpe?g|png|gif|ico)$/,
            loader: 'url'
          },
          {
            test: /\.((ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9]))|(ttf|eot)$/,
            loader: 'url'
          },
          {
              test: /\.jsx?$/,// run npm install babel-core babel-preset-es2015 babel-preset-react
              exclude: /(node_modules|bower_components)/,
              loader: 'babel', // 'babel-loader' is also a legal name to reference
              query: {
                presets: ['react', 'es2015', 'stage-1']
              }
         },
        // {
        //       test: /\.jsx?$/,
        //       loader: 'babel-loader!jsx-loader?harmony'
        // },

      ],
      //如果在require文件时不想写文件后缀名，你可以在resolve.extensions告诉webpack
      resolve: {
        extensions: ['', '.js', '.json', '.coffee']
      }
    },
    plugins: [
      // Promise: 'imports?this=>global!exports?global.Promise!es6-promise',
      // fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch',
      // new webpack.ProvidePlugin({
      //    Promise: 'imports?this=>global!es6-promise',
      //    fetch: 'imports?this=>global!whatwg-fetch',
      // }),
      new webpack.DefinePlugin({
        __DEBUG__: true,
        __VERSION__:  JSON.stringify(packages.version)
      }),
			new webpack.HotModuleReplacementPlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.CommonsChunkPlugin("vendors", 'vendors.js'),


      //new ExtractTextPlugin('styles.css')


    ],
    resolveLoader: {
      //root: path.join(__dirname, 'node_modules')
    },
    postcss: function () {
        return [autoprefixer, precss];
    }
};

module.exports = config;
