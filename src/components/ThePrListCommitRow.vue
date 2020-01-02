<template>
  <div>
    <div
      class="no-gutters row commits-row"
      @click="(ev) => ev.preventDefault()"
    >
      <div class="col-12 small">
        <a
          class="text-monospace text-decoration-none text-black"
          :href="`https://dreamy-visvesvaraya-ba5944.netlify.com/rev/${commit.sha}/examples/`"
        >
          {{ commit.sha.slice( 0, 7 ) }}
        </a> by <strong>{{ commit.author }}</strong> <span class="d-none d-md-inline">
          committed on <strong>{{ commit.timestamp.replace( 'Z', '.000Z' ) | localizeDate }}</strong>
        </span><span
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
      </div>
      <div class="col-12 text-truncate font-weight-bold">
        <a
          class="text-decoration-none text-black"
          :href="`https://dreamy-visvesvaraya-ba5944.netlify.com/rev/${commit.sha}/examples/`"
        >
          {{ commit.message | trimMerges }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>

export default {

	name: "ThePrListCommitRow",

	filters: {

		localizeDate: function ( dateString ) {

			return new Date( dateString ).toUTCString();

		},

		trim: function ( str ) {

			if ( str.length > 70 )
				return str.slice( 0, 65 ) + '…';
			else
				return str;

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

	data: function () {

		return {};

	},

	computed: {

	},

	mounted() {

	},

	methods: { }

};
</script>

<style scoped>


</style>
