module.exports = {
	chainWebpack: config => {

		// Bootstrap.native loader
		config.module
			.rule( 'bootstrap.native-loader' )
			.test( /bootstrap\.native/ )
			.use( 'bootstrap.native-loader' )
			.loader( 'bootstrap.native-loader' )
			.options( {

				// ['alert', 'button',  'carousel', 'collapse', 'dropdown', 'modal', 'popover', 'scrollspy', 'tab', 'tooltip']
				only: [ 'button', 'collapse' ]
				// ignore: [ 'alert', 'carousel', 'dropdown', 'modal', 'scrollspy', 'tooltip', 'popover', 'tab' ]

			} )
			.end();

	},
	configureWebpack: {
		optimization: {
			splitChunks: {
				chunks: "all"
			}
		},
		resolve: {
			alias: {
				'@': './src',
				vue$: "vue/dist/vue.esm.js",
				vuex$: "vuex/dist/vuex.esm.js"
			}
		},
		//		devtool: 'eval-source-map'
		devtool: 'none'
	}
};
