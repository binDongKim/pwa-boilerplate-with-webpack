const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: {
		"js/bundle": "./src/index.js"
	},
	output: {
		filename: "[name].js",
		path: path.join(process.cwd(), "dist")
	},

	module: {
		rules: [{
			test: /(\.js)$/,
			exclude: /(node_modules)/,
			loader: "babel-loader"
		},
		{
			test: /(\.js)$/,
			loader: "eslint-loader",
			include: path.resolve(process.cwd(), "src"),
			exclude: /(node_modules)/,
			enforce: "pre"
		}]
	},

	devtool: "cheap-module-source-map",
	devServer: {
		port: 8080,
		contentBase: path.join(process.cwd(), "dist"),
		inline: true

	},

	plugins: [
		new HtmlWebpackPlugin({
			filename: "index.html",
			template: "./src/assets/index.html"
		})
	]
};
