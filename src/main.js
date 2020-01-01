import Vue from "vue";
import App from "./App.vue";
// import store from "./store";

// import( /* webpackChunkName: "CSSStyle" */ '../darkly.scss' );
import './darkly.scss';

Vue.config.productionTip = false;

new Vue( {
	// store,
	render: h => h( App )
} ).$mount( "#app" );
