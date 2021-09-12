module.exports = {
	plugins: [
		require("postcss-advanced-variables"),
		require("postcss-nested"),
		require("postcss-sort-media-queries"),
		require("autoprefixer")({ grid: "autoplace" }),
		require("cssnano"),
	],
};
