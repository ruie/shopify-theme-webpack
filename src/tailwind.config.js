/**
 * Tailwind CSS configuration file
 *
 * docs: https://tailwindcss.com/docs/configuration
 * default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
const path = require("path");

module.exports = {
	mode: "jit",
	darkMode: false,
	theme: {
		extend: {},
		container: {
			center: true,
			padding: "1rem",
		},
	},
	variants: {},
	plugins: [
		require("@tailwindcss/forms"),
		require("@tailwindcss/aspect-ratio"),
	],
	purge: {
		enabled: process.env.NODE_ENV === "production",
		content: [
			path.resolve(__dirname, "**/*.{js}"),
			path.resolve(__dirname, "../shopify/**/*.liquid"),
		],
	},
};