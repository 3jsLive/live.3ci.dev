<template>
  <div id="app">
    <div class="container-fluid">
      <div class="row">
        <div class="col">
          <img
            id="logo"
            alt="three.js live"
            src="../assets/logo_alpha_black_small.png"
          >
        </div>
      </div>
      <div class="row">
        <div class="col-lg-1 d-xl-none" />
        <div class="col-12 col-lg-10 col-xl-6">
          <h3>
            Pull Requests
          </h3>
          <ThePrList :commits="commits" />
        </div>
        <div class="col-12 col-lg-10 col-xl-6">
          <h3>
            Commits
          </h3>
          <TheCommitsList :commits="commits" />
        </div>
        <div class="col-lg-1 d-xl-none" />
      </div>
      <footer>
        <small>
          <b>Icons</b> <a
            href="https://octicons.github.com/"
            target="_blank"
          >
            Octicons
          </a>
        </small>
      </footer>
    </div>
  </div>
</template>

<script>

// const Alert = () => import( /* webpackChunkName: "Alert" */ 'bootstrap.native/lib/V4/alert-native' );
// const Carousel = () => import( /* webpackChunkName: "Carousel" */ 'bootstrap.native/lib/V4/carousel-native' );

import ThePrList from './components/ThePrList.vue';
import TheCommitsList from './components/TheCommitsList.vue';


export default {

	name: "ThreejsLive",

	components: {
		ThePrList,
		TheCommitsList
	},

	data: function () {

		return {
			commits: {}
		};

	},

	async created() {

		return await this.loadCommitsList();

	},

	mounted() {

		console.log( 'mounted' );

	},

	methods: {

		loadCommitsList() {

			return fetch( `http://localhost:9871/commits` )
			// return fetch( `/.netlify/functions/get-commits` )
				.then( res => res.json() )
				.then( content => {

					console.log( 'commits', { content } );

					this.commits = content;

					// FIXME: hack
					Object.keys( content ).forEach( sha => {

						this.commits[ sha ].sha = sha;

					} );

					return true;

				} )
				.catch( err => console.error( err ) );

		}

	}

};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#logo {
	width: 156px;
}

.svg-pullrequest-open {
	background: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="40" viewBox="0 0 12 12" fill="currentColor" color="%2328A745"><path fill-rule="evenodd" d="M11 11.28V5c-.03-.78-.34-1.47-.94-2.06C9.46 2.35 8.78 2.03 8 2H7V0L4 3l3 3V4h1c.27.02.48.11.69.31.21.2.3.42.31.69v6.28A1.993 1.993 0 0 0 10 15a1.993 1.993 0 0 0 1-3.72zm-1 2.92c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zM4 3c0-1.11-.89-2-2-2a1.993 1.993 0 0 0-1 3.72v6.56A1.993 1.993 0 0 0 2 15a1.993 1.993 0 0 0 1-3.72V4.72c.59-.34 1-.98 1-1.72zm-.8 10c0 .66-.55 1.2-1.2 1.2-.65 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"/></svg>');
	background-repeat: no-repeat;
	background-position-x: left;
}

.svg-pullrequest-closed {
	background: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="40" viewBox="0 0 12 12" fill="currentColor" color="%23cb2431"><path fill-rule="evenodd" d="M11 11.28V5c-.03-.78-.34-1.47-.94-2.06C9.46 2.35 8.78 2.03 8 2H7V0L4 3l3 3V4h1c.27.02.48.11.69.31.21.2.3.42.31.69v6.28A1.993 1.993 0 0 0 10 15a1.993 1.993 0 0 0 1-3.72zm-1 2.92c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zM4 3c0-1.11-.89-2-2-2a1.993 1.993 0 0 0-1 3.72v6.56A1.993 1.993 0 0 0 2 15a1.993 1.993 0 0 0 1-3.72V4.72c.59-.34 1-.98 1-1.72zm-.8 10c0 .66-.55 1.2-1.2 1.2-.65 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"/></svg>');
	background-repeat: no-repeat;
	background-position-x: left;
}

.svg-pullrequest-merged {
	background: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="40" viewBox="0 0 12 12" fill="currentColor" color="%236f42c1"><path fill-rule="evenodd" d="M10 7c-.73 0-1.38.41-1.73 1.02V8C7.22 7.98 6 7.64 5.14 6.98c-.75-.58-1.5-1.61-1.89-2.44A1.993 1.993 0 0 0 2 .99C.89.99 0 1.89 0 3a2 2 0 0 0 1 1.72v6.56c-.59.35-1 .99-1 1.72 0 1.11.89 2 2 2a1.993 1.993 0 0 0 1-3.72V7.67c.67.7 1.44 1.27 2.3 1.69.86.42 2.03.63 2.97.64v-.02c.36.61 1 1.02 1.73 1.02 1.11 0 2-.89 2-2 0-1.11-.89-2-2-2zm-6.8 6c0 .66-.55 1.2-1.2 1.2-.65 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm8 6c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"></path></svg>');
	background-repeat: no-repeat;
	background-position-x: left;
}

.chevron-down {
	background: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 10 16"><path fill-rule="evenodd" d="M5 11L0 6l1.5-1.5L5 8.25 8.5 4.5 10 6l-5 5z"></path></svg>');
	background-repeat: no-repeat;
	background-position-x: left;
}

.chevron-up {
	background: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 10 16"><path fill-rule="evenodd" d="M10 10l-1.5 1.5L5 7.75 1.5 11.5 0 10l5-5 5 5z"></path></svg>');
	background-repeat: no-repeat;
	background-position-x: left;
}

</style>
