const webpack = require("webpack");
const path = require("path");
const glob = require("glob");
const CopyPlugin = require("copy-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const mode =
	process.env.NODE_ENV === "development" ? "development" : "production";
const devtool = mode === "development" ? "eval-cheap-source-map" : false;

module.exports = {
	mode: mode,
	devtool: devtool,
	entry: glob.sync("./src/sections/**/scripts.js").reduce((acc, path) => {
		const entry = path.split("/").reverse()[1];
		acc[entry] = path;
		return acc;
	}, {}),
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "./assets/section.[name].js",
	},
	plugins: [
		new webpack.ProgressPlugin(),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: "./assets/section.[name].css",
		}),
		new CopyPlugin({
			patterns: [
				{
					from: "src",
					to({ context, absoluteFilename }) {
						return `${path.relative(context, absoluteFilename)}`;
					},
					globOptions: {
						dot: true,
						gitignore: true,
						ignore: [
							"**/snippets/**/*",
							"**/assets/**/*",
							"**/sections/**/*",
						],
					},
				},
				{
					from: "src/assets/**/*",
					to: "assets/[name][ext]",
				},
				{
					from: "src/sections/**/index.liquid",
					to: "sections/[name][ext]",
				},
				{
					from: "src/snippets/**/*.liquid",
					to: "snippets/[name][ext]",
				},
			],
		}),
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/env", "@shopify/babel-preset"],
					},
				},
			},
			{
				test: /\.(css)$/,
				exclude: /node_modules/,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					"postcss-loader",
				],
			},
		],
	},
};
