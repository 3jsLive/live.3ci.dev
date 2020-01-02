<template>
  <div
    class="no-gutters row pulls-item"
    :class="{ open: isOpen }"
  >
    <div
      class="col-12"
    >
      <div class="no-gutters row">
        <div
          class="col-lg-9 col-10 pl-5"
          :class="{ [ 'svg-pullrequest-' + pullrequest.state ]: true }"
        >
          <div class="row">
            <div class="col text-truncate font-weight-bold">
              <span
                v-if="errorCommit"
                class="badge badge-danger"
              >
                Build error
              </span><span
                v-if="missingCommit"
                class="badge badge-warning"
              >
                Missing commit
              </span>
              {{ pullrequest.title }}
            </div>
          </div>
          <div class="row">
            <div class="col-12 small text-truncate d-none d-lg-block">
              <strong class="text-monospace">
                {{ '#' + pullrequest.number }}
              </strong> opened by <strong>{{ pullrequest.author }}</strong> and last updated on <strong>{{ pullrequest.updated_at | localizeDate }}</strong>
            </div>
            <div class="col-12 small text-truncate d-block d-lg-none">
              <strong class="text-monospace">
                {{ '#' + pullrequest.number }}
              </strong> by <strong>{{ pullrequest.author }}</strong>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-2 d-flex align-items-center justify-content-end">
          <a
            :id="`selectHead-${pullrequest.number}`"
            class="btn btn-sm btn-outline-primary mr-3 d-none d-lg-block"
            :href="`https://dreamy-visvesvaraya-ba5944.netlify.com/rev/${pullrequest.commits[ 0 ].sha}/examples/`"
          >
            Select HEAD
          </a>
          <button
            :id="`revisionsButton-${pullrequest.number}`"
            class="btn btn-sm"
            type="button"
            data-toggle="collapse"
            :data-target="`#revision-${pullrequest.number}`"
            aria-expanded="false"
            :aria-controls="`revision-${pullrequest.number}`"
            @click="switchChooseRevision"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 10 16"
            >
              <path
                fill-rule="evenodd"
                fill="black"
                :d="getChevron"
              />
            </svg>
          </button>
        </div>
      </div>
      <div
        :id="`revision-${pullrequest.number}`"
        class="row collapse"
      >
        <div class="col commits-list">
          <template
            v-for="commit in pullrequest.commits"
          >
            <ThePrListCommitRow
              :key="commit.sha"
              :commit="commit"
            />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { Collapse } from 'bootstrap.native';

import ThePrListCommitRow from './ThePrListCommitRow.vue';

export default {

	name: "ThePrListRow",

	components: {
		ThePrListCommitRow
	},

	filters: {

		localizeDate: function ( dateString ) {

			return new Date( dateString ).toUTCString();

		},

		trim: function ( str ) {

			if ( str.length > 70 )
				return str.slice( 0, 65 ) + '…';
			else
				return str;

		}

	},

	props: {
		pullrequest: {
			type: Object,
			required: true
		}
	},

	data: function () {

		return {
			// buttons: {},
			collapse: null,
			isOpen: false
		};

	},

	computed: {

		missingCommit: function ( ) {

			return this.pullrequest.commits.some( c => c.state === 'missing' );

		},

		errorCommit: function ( ) {

			return this.pullrequest.commits.some( c => c.state === 'error' );

		},

		getChevron: function ( ) {

			if ( this.isOpen === true ) {

				return 'M10 10l-1.5 1.5L5 7.75 1.5 11.5 0 10l5-5 5 5z';

			} else {

				return 'M5 11L0 6l1.5-1.5L5 8.25 8.5 4.5 10 6l-5 5z';

			}

		}

	},

	mounted() {

		this.collapse = new Collapse( document.getElementById( `revisionsButton-${this.pullrequest.number}` ) );

	},

	methods: {

		switchChooseRevision: function ( ) {

			this.isOpen = ! this.isOpen;

		}

	}

};
</script>

<style scoped>

</style>
