var WebpackDevServer = require("webpack-dev-server");
var webpack = require("webpack");

var config = require('./webpack.common.config.js')

config.entry['main'].unshift("webpack-dev-server/client?http://localhost:80/", "webpack/hot/dev-server");
config.entry['vendors'].unshift("webpack-dev-server/client?http://localhost:80/");

var compiler = webpack(config);

console.log(JSON.stringify(config))

var server = new WebpackDevServer(compiler, {
  // webpack-dev-server options
	devtool: 'eval',
	progress:true,
	inline: true,
  contentBase: ".",
  // or: contentBase: "http://localhost/",

  hot: true,
  // Enable special support for Hot Module Replacement
  // Page is no longer updated, but a "webpackHotUpdate" message is send to the content
  // Use "webpack/hot/dev-server" as additional module in your entry point
  // Note: this does _not_ add the `HotModuleReplacementPlugin` like the CLI option does.

  // Set this as true if you want to access dev server from arbitrary url.
  // This is handy if you are using a html5 router.
  historyApiFallback: false,

  // Set this if you want to enable gzip compression for assets
  compress: true,

  // Set this if you want webpack-dev-server to delegate a single path to an arbitrary server.
  // Use "*" to proxy all paths to the specified server.
  // This is useful if you want to get rid of 'http://localhost:8080/' in script[src],
  // and has many other use cases (see https://github.com/webpack/webpack-dev-server/pull/127 ).
  // proxy: {
  //   "*": "http://localhost:9090"
  // },

  // pass [static options](http://expressjs.com/en/4x/api.html#express.static) to inner express server
  staticOptions: {
  },

  // webpack-dev-middleware options
  quiet: false,
  noInfo: false,
  // lazy: true,
  // filename: "[name].js",
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
  publicPath: "/dist/",
  //headers: { "X-Custom-Header": "yes" },
  stats: { colors: true }
});
server.listen(80, "localhost", function() {
	console.log('webpack dev server starting')
});
