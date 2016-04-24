var webpack = require('webpack');
var path = require('path');

module.exports = {
	devtool: 'inline-source-map',
	entry: [
		'webpack-dev-server/client?http://127.0.0.1:8080/',
		'webpack/hot/only-dev-server',
		'./src' /* src directory is where the entry point is */
	],
	output: { /* where to put the bundle */
		path: path.join(__dirname,'public'),
		filename: 'bundle.js'
	},
	resolve:{ /* where webpack will look for files */
		modulesDirectories: ['node_modules','src'],
		extension: ['','.js']
	},
	module: [ /* define loaders */
	{
		test:/\.js$/,
		exclude: /node_modules/,
		loader: 'babel',
		query: {
			presets: ['es2015']
		}
	},
	{
		test:/\.html$/,
		loader: _'raw'_
	}
	],
	plugins:[
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	],
	devServer: { /* where web pack will look for server */
		hot: true,
		proxy: {
			'*': 'http://localhost:3000'
		}
	}
}