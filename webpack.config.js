var webpack = require('webpack');
const prod = process.argv.indexOf('-p') !== -1;
// npm run build2 
/*
 * Default webpack configuration for development
 */
var config = {
  devtool: 'source-map',
  entry: { index : __dirname + "/app/App.js",
		contact : __dirname + "/app/ContactsApp.js"
	},
  output: {
    path: __dirname + "/public",
    filename: "[name].bundle.js"
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015','react']
      }
    }]
  },
  devServer: {
    contentBase: "./public",
    colors: true,
    historyApiFallback: true,
    inline: true
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
  ]
}


if (prod) { config.devtool = false;
  config.plugins.push( new webpack.DefinePlugin({
      'process.env': {
          'NODE_ENV': JSON.stringify('production')
      }
  }) );
  config.plugins.push( new webpack.optimize.UglifyJsPlugin({ minimize: true, comments: false, compressor:{warnings:false} }) );
};


/*
 * If bundling for production, optimize output
 */
 /*
if (process.env.NODE_ENV === 'production') {
  config.devtool = false;
  config.plugins = [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {'NODE_ENV': JSON.stringify('production')}
    }),
	new webpack.optimize.UglifyJsPlugin({ minimize: true, comments: false, compressor:{warnings:false} }),
  ];
};
 */
module.exports = config;
