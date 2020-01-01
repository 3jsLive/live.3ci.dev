<template>
  <div
    id="collapseCommits"
  >
    <div class="row d-flex justify-content-center">
      <div class="col-12 col-lg-6">
        <div class="input-group mb-3 input-group-sm">
          <div class="input-group-prepend">
            <span class="input-group-text">
              Search
            </span>
          </div>
          <input
            v-model="query"
            type="search"
            class="form-control"
          >
        </div>
      </div>
    </div>
    <div
      v-if="Object.keys( commits ).length === 0"
      class="row"
    >
      <div class="col-12 d-flex justify-content-center">
        <img
          class="mt-4 spinner"
          src="../../assets/logo-50.png"
        >
      </div>
    </div>
    <!-- <template v-for="sha in sortedKeys"> -->
    <template v-for="sha in queryMatches">
      <TheCommitsListRow
        :key="sha"
        :commit="commits[ sha ]"
      />
    </template>
  </div>
</template>

<script>

import { Button } from 'bootstrap.native';

import TheCommitsListRow from './TheCommitsListRow.vue';

export default {

	name: "TheCommitsList",

	components: {
		TheCommitsListRow
	},

	props: {
		commits: {
			type: Object,
			required: true
		}
	},

	data: function () {

		return {
			query: ''
		};

	},

	computed: {

		queryMatches: function () {

			// first: apply query filter
			if ( this.query.length > 0 ) {

				return this.sortedKeys

					// filter by actual matches (case insensitive)
					.filter( sha => {

						const lowQuery = this.query.toLowerCase();
						const commit = this.commits[ sha ];

						return commit.message.toLowerCase().includes( lowQuery ) ||
							commit.author.toLowerCase().includes( lowQuery ) ||
							commit.sha.includes( lowQuery );

					} );

				// highlight query-hits
				// .map( file => ( {
				// 	raw: file.name,
				// 	markup: file.name.replace( matchRx, '<b>$1</b>' ),
				// 	...file
				// } ) );

			} else {

				// or don't, just adapt to expected format
				// matches = this.pullrequests;

				return this.sortedKeys;

			}

		},

		sortedKeys: function () {

			const keys = Object.keys( this.commits );
			keys.sort();

			return keys;

		}

	},

	created() {

		// this.loadCommitsList();

	},

	mounted() {

		new Button( document.getElementById( 'buttonsgroup' ) );

	},

	methods: {

		// loadCommitsList() {

		// 	this.loading.commits = true;

		// 	return fetch( `http://localhost:9871/commits` )
		// 	// return fetch( `/.netlify/functions/get-commits` )
		// 		.then( res => res.json() )
		// 		.then( content => {

		// 			console.log( 'commits', { content } );

		// 			this.sortedKeys = Object.keys( content );
		// 			this.sortedKeys.sort();

		// 			this.commits = content;

		// 			// FIXME: hack
		// 			this.sortedKeys.forEach( sha => {

		// 				this.commits[ sha ].sha = sha;

		// 			} );

		// 			this.loading.commits = false;

		// 			return content;

		// 		} )
		// 		.catch( err => {

		// 			console.error( err );

		// 			this.loading.commits = false;

		// 		} );

		// },

		notice: function ( param ) {

			console.log( 'notice:', param );

		},

		switchChooseRevision: function ( number, event ) {

			console.log( number );

			this.collapses[ number ].toggle( event );

		}

	}

};
</script>

<style scoped>

#collapseCommits .row {
	margin-right: 0px;
	margin-left: 0px;
}

#collapseCommits {
	text-align: left
}

img.spinner {
	animation: spin 1s linear infinite;
}

@keyframes spin {
	to {
		transform: rotate(360deg);
		/* transform-origin: 25px 25px; */
		/* transform-origin: 162px 186px; */
		transform-origin: center
	}
}

</style>
