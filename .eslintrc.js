module.exports = {
	root: true,
	env: {
		browser: true
	},
	extends: [
		'plugin:vue/essential',
		"plugin:vue/recommended",
		"mdcs",
	],
	rules: {
		"no-console": process.env.NODE_ENV === "production" ? "error" : "off",
		"no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
	},
	parserOptions: {
		parser: "babel-eslint",
		ecmaVersion: 2018
	}
};
