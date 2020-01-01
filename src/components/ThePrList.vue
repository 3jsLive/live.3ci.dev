<template>
  <div
    id="collapsePulls"
  >
    <div class="row justify-content-lg-between">
      <div class="col-12 col-lg-6 d-flex d-lg-block justify-content-center">
        <div
          id="buttonsgroup"
          class="btn-group input-group-sm btn-group-toggle pb-3"
          data-toggle="buttons"
        >
          <div class="input-group-sm input-group-prepend">
            <span class="input-group-text">
              Filter
            </span>
          </div>
          <label
            class="btn btn-sm btn-outline-dark svg-pullrequest-open svg-small pl-4"
            :class="{ active: filterState.includes( 'open' ) }"
          >
            <input
              id="option1"
              v-model="filterState"
              type="checkbox"
              name="options"
              autocomplete="off"
              value="open"
              @change="/*Object.keys( commits ).length > 0 && loadPrList*/"
            > Open
          </label>
          <label
            class="btn btn-sm btn-outline-dark svg-pullrequest-merged svg-small pl-4"
            :class="{ active: filterState.includes( 'merged' ) }"
          >
            <input
              id="option2"
              v-model="filterState"
              type="checkbox"
              name="options"
              autocomplete="off"
              value="merged"
              @change="loadPrList"
            > Merged
          </label>
          <label
            class="btn btn-sm btn-outline-dark svg-pullrequest-closed svg-small pl-4"
            :class="{ active: filterState.includes( 'closed' ) }"
          >
            <input
              id="option3"
              v-model="filterState"
              type="checkbox"
              name="options"
              autocomplete="off"
              value="closed"
              @change="loadPrList"
            > Closed
          </label>
        </div>
      </div>
      <div class="col-12 col-lg-6">
        <div class="input-group mb-1 input-group-sm d-flex justify-content-center">
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
          <div class="input-group-append">
            <div class="input-group-text">
              <input
                id="checkboxSearchCommits"
                v-model="searchCommits"
                type="checkbox"
              >
              <label
                class="form-check-label"
                for="checkboxSearchCommits"
              >
                Include commits
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="loading.prs === true"
      class="row"
    >
      <div class="col-12 d-flex justify-content-center">
        <img
          class="mt-4 spinner"
          src="../../assets/logo-50.png"
        >
      </div>
    </div>
    <template v-for="push in queryMatches">
      <ThePrListRow
        :key="push.number"
        :pullrequest="push"
      />
    </template>
  </div>
</template>

<script>

import { Button } from 'bootstrap.native';

import ThePrListRow from './ThePrListRow.vue';

export default {

	name: "ThePrList",

	components: {
		ThePrListRow
	},

	props: {
		commits: {
			type: Object,
			required: true
		}
	},

	data: function () {

		return {
			pullrequests: [],
			filterState: [ 'open' ],
			searchCommits: false,
			collapses: {},
			query: '',
			loading: { prs: true }
		};

	},

	computed: {

		queryMatches: function () {

			let matches = this.pullrequests.filter( entry => this.filterState.includes( entry.state ) );

			// first: apply query filter
			if ( this.query.length > 0 ) {

				matches = matches

					// filter by actual matches (case insensitive)
					.filter( entry => {

						const lowQuery = this.query.toLowerCase();

						const matchInPrData = entry.title.toLowerCase().includes( lowQuery ) ||
							entry.author.toLowerCase().includes( lowQuery ) ||
							entry.number.toString().includes( lowQuery );


						// match in PR data, early exit
						if ( matchInPrData === true )
							return true;


						if ( this.searchCommits === true ) {

							// no match in PR data, but search commits
							return entry.commits.some( c => {

								return c.author.toLowerCase().includes( lowQuery ) ||
									c.message.toLowerCase().includes( lowQuery ) ||
									c.sha.toLowerCase().includes( lowQuery );

							} );

						} else {

							// no match in PR data, don't search commits
							return matchInPrData;

						}

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

			}

			return matches;

		}

	},

	watch: {

		commits: function () {

			if ( Object.keys( this.commits ).length > 0 ) {

				this.loadPrList();

			}

		}

	},

	created() { },

	mounted() {

		new Button( document.getElementById( 'buttonsgroup' ) );

	},

	methods: {

		loadPrList() {

			this.loading.prs = true;

			return fetch( `http://localhost:9871/pullrequests?state=${this.filterState.join( ',' )}` )
			// return fetch( `/.netlify/functions/get-pullrequests?state=${this.filterState.join( ',' )}` )
				.then( res => res.json() )
				.then( content => {

					// console.log( 'prs', { content } );

					this.pullrequests = content;

					this.pullrequests.sort( ( a, b ) => b.updated_at.localeCompare( a.updated_at ) );

					this.pullrequests.forEach( pr => {

						pr.commits = pr.commits.map( sha => ( { sha, ...this.commits[ sha ] } ) );

					} );
					this.pullrequests.forEach( push => push.commits.sort( ( a, b ) => b.timestamp.localeCompare( a.timestamp ) ) );

					return true;

				} )
				.catch( err => {

					// console.error( err );

					return false;

				} )
				.then( result => {

					this.loading.prs = false;

					return result;

				} );

		},

		notice: function ( param ) {

			// console.log( 'notice:', param );

		},

		switchChooseRevision: function ( number, event ) {

			// if ( event.path.length >= 5 )
			// event.path[ 4 ].classList.toggle( 'open' );

			// console.log( number );

			this.collapses[ number ].toggle( event );

		}

	}

};
</script>

<style scoped>

svg.open {
	fill: currentColor;
	color: #28a745;
}

svg.merged {
	fill: currentColor;
	color: #6f42c1;
}

svg.closed {
	fill: currentColor;
	color: #cb2431;
}

#collapsePulls .row {
	margin-right: 0px;
	margin-left: 0px;
}

#collapsePulls {
	text-align: left
}

.svg-small {
	background-size: 20%;
	background-position-x: 5px
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
