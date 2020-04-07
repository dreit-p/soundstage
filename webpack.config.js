var webpack = require('webpack');

module.exports = {
	watch: false,
	mode: process.env.NODE_ENV,
	devtool: process.env.NODE_ENV == 'development' ? 'source-map' : 'none',
	output: {
		filename: '[name].js',
	},
	plugins: [
		new webpack.EnvironmentPlugin(['NODE_ENV', 'API_HOST'])
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env']
						}
					}
				],
			}
		]
	}
}
