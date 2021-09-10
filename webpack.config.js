const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const mode =
	process.env.NODE_ENV === "development" ? "development" : "production";
const devtool = mode === "development" ? "eval-cheap-source-map" : false;
const paths = {
	src: path.join(__dirname, "src"),
	dist: path.join(__dirname, "dist"),
};

module.exports = {
	mode: mode,
	devtool: devtool,
	entry: [
		`${paths.src}/sections/footer/script.js`,
		`${paths.src}/sections/header/script.js`,
	],
	output: {
		path: paths.dist,
	},
	plugins: [
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: "./assets/bundle.[name].css.liquid",
		}),
		// new CopyPlugin({
		// 	patterns: [
		// 		{
		// 			from: "src",
		// 			to({ context, absoluteFilename }) {
		// 				return `${path.relative(context, absoluteFilename)}`;
		// 			},
		// 			globOptions: {
		// 				ignore: [
		// 					"**/snippets/**/*",
		// 					"**/assets/**/*",
		// 					"**/sections/**/*",
		// 				],
		// 			},
		// 		},
		// 		{
		// 			from: "src/assets/**/*",
		// 			to: "assets/[name][ext]",
		// 		},
		// 		{
		// 			from: "src/sections/**/*.liquid",
		// 			to: "sections/[name][ext]",
		// 		},
		// 		{
		// 			from: "src/snippets/**/*.liquid",
		// 			to: "snippets/[name][ext]",
		// 		},
		// 		{
		// 			from: "src/sections/**/*.css",
		// 			to({ context, absoluteFilename }) {
		// 				const fileName = path.basename(
		// 					path.dirname(absoluteFilename)
		// 				);
		// 				return `assets/section.${fileName}[ext]`;
		// 			},
		// 		},
		// 	],
		// }),
	],
	module: {
		rules: [
			{
				test: /\.(c)ss$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: {
							url: false,
						},
					},
					"postcss-loader",
				],
			},
		],
	},
};
