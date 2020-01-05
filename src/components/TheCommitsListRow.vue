<template>
  <div
    class="no-gutters row commits-item"
  >
    <!-- @click="(ev) => ev.preventDefault()" -->
    <div class="col text-truncate font-weight-bold">
      <span
        v-if="commit.state === 'error'"
        class="badge badge-danger"
      >
        Build error
      </span><span
        v-if="commit.state === 'missing'"
        class="badge badge-warning"
      >
        Missing
      </span>
      <a
        class="text-decoration-none text-black"
        :href="`https://live.3ci.dev/rev/${commit.sha}/examples/`"
      >
        {{ commit.message | trimMerges }}
      </a>
    </div>
    <div class="col-12 small">
      <span
        class="text-monospace d-inline d-lg-none text-decoration-none"
      >
        {{ commit.sha.slice( 0, 7 ) }}
      </span>
      <span
        class="text-monospace d-none d-lg-inline text-decoration-none"
      >
        {{ commit.sha.slice( 0, 16 ) }}
      </span> by <strong>{{ commit.author }}</strong> <span class="d-none d-md-inline">
        committed on <strong>{{ commit.timestamp.replace( 'Z', '.000Z' ) | localizeDate }}</strong>
      </span>
    </div>
  </div>
</template>

<script>

export default {

	name: "TheCommitsListRow",

	filters: {

		localizeDate: function ( dateString ) {

			return new Date( dateString ).toUTCString();

		},

		trimMerges: function ( str ) {

			if ( /^Merge commit/.test( str ) )
				return str.replace( /^Merge commit '([a-f0-9]{7})[a-f0-9]{33}' of https:..github.com\/([^ ]+) into (.*?)$/, "Merge commit '$1…' of $2 into $3" );
			else if ( /^Merge branch/.test( str ) )
				return str.replace( /^Merge branch '(\w+)' of https:..github.com\/([^ ]+) into (.*?)$/, "Merge branch '$1' of $2 into $3" );
			else if ( /^Merge /.test( str ) )
				return str.slice( 0, 65 ) + '…';
			else
				return str;

		}

	},

	props: {
		commit: {
			type: Object,
			required: true,
			validator: ( value ) => [ 'message', 'sha', 'author', 'timestamp', 'state' ].every( key => Object.keys( value ).includes( key ) )
		}
	},

	data: () => ( {} ),

	computed: { },

	mounted() {

		console.log( 'mounted' );

	},

	methods: { }

};
</script>

<style scoped>


</style>
