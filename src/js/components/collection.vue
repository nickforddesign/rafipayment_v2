<template>
  <div class="collection-view">
    <header>
      <div class="meta">
        <h2>
          <slot name="header">
            <div slot="header">
              <div class="flexbox">
                <div class="flex">{{ name | capitalize }}</div>
                <div class="solid range" v-if="range && $collection.total_count">
                  <select-menu name="range" v-model="range_selected">
                    <option v-for="(label, index) in ranges" :value="label" :key="index">
                      {{ label }}
                    </option>
                  </select-menu>
                </div>
              </div>
            </div>
          </slot>
        </h2>
      </div>
      <div class="actions flexbox text-right">
        <div class="flex search">
          <search @submit="search" v-if="searchable" />
        </div>
        <div class="solid action-buttons">
          <slot name="actions" />
        </div>
      </div>
    </header>

    <div v-if="filters_keys.length" class="filters">
      <div v-for="(value, key) in filters" :key="key" class="filter">
        {{ key | capitalize }}: {{ value }}
        <button class="x-small" @click="removeFilter(key)">X</button>
      </div>
    </div>
      
    <slot name="content" v-if="fetched && collection.length" />
    <empty v-else-if="fetched && !collection.length">
      <div slot="message">There are no {{ collection_name || name }}</div>
    </empty>

    <div class="pagination-container" v-if="paginate && page_count > 1">
      <div class="summary">
        {{ skip + 1 }} - {{ skip + collection.length }} of {{ $collection.total_count || 0 }} items
      </div>
      <ul class="pagination">
        <li v-for="(n, index) in page_count" :key="index">
          <a href="#" @click.prevent="setCurrent(n)" :class="[paginator_class(n)]">{{ n }}</a>
        </li>
      </ul>
    </div>
    <loading v-if="!fetched" />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import Vue from 'vue'
import moment from 'moment'
import { equals } from 'ramda'
import { getMonthsArray } from '@/utils'

export default {
  name: 'collection',
  props: {
    name: {
      type: String
    },
    collection_name: {
      type: String
    },
    $collection: {
      type: Object
    },
    limit: {
      type: Number,
      default: 10
    },
    paginate: {
      type: Boolean,
      default: true
    },
    searchable: {
      type: Boolean,
      default: true
    },
    range: String
  },
  data() {
    return {
      fetched: false,
      ranges: null,
      range_fetched: false,
      range_selected: null,
      range_has_been_selected: false,
      current_page_index: 0,
      search_term: '',
      filters: {}
    }
  },
  async created() {
    await this.init()
    this.fetch()
  },
  computed: {
    collection() {
      return this.$collection.models
    },
    page_count() {
      return this.$collection.total_count && this.collection.length
        ? Math.ceil(this.$collection.total_count / this.limit)
        : 0
    },
    skip() {
      return (this.current_page_index) * this.limit
    },
    filters_keys() {
      return Object.keys(this.filters)
    },
    filters_ready() {
      const filters = {}
      for (let key in this.filters) {
        filters[`filter_${key}`] = this.filters[key]
      }
      return filters
    },
    filters_query() {
      // for fetching range only
      return this.filters_keys.length
        ? '?' + Object.keys(this.filters_ready).map(key =>
          `${key}=${this.filters_ready[`${key}`]}`
        ).join('&')
        : ''
    },
    range_query() {
      if (this.range_selected && this.range_selected !== 'All') {
        const arr = this.range_selected.split('/')
        const date_str = [arr[0], '1', arr[1]].join('/')
        const date = moment.utc(date_str, 'M/D/YYYY')
        const start = date.startOf('month').format('YYYY-MM-DD')
        const end = date.endOf('month').format('YYYY-MM-DD')
        return {
          [`range_${this.range}`]: `${start},${end}`
        }
      }
    }
  },
  watch: {
    $route(val) {
      const page_number = val.query.page || 1
      this.setCurrent(page_number)
      const filters = this.getFiltersFromRoute()
      if (!equals(filters, this.filters)) {
        this.initFilters()
        this.updateFilters()
      }
    },
    current_page_index(val) {
      this.updateUrl()
      this.updateQueries()
      if (this.fetched) {
        this.fetch()
      }
    },
    async filters() {
      await this.initRange()
      this.updateUrl()
      this.updateQueries()
      if (this.fetched) {
        this.fetch()
      }
    },
    range_selected() {
      if (!this.range_has_been_selected) {
        this.range_has_been_selected = true
      }
      this.clearPagination()
      this.updateQueries()
      if (this.fetched) {
        this.fetch()
      }
    }
  },
  methods: {
    async init() {
      await this.initFilters()
      await this.initRange()
      await this.initPagination()
      if (!this.$collection.modified) {
        this.updateQueries()
        this.$collection.modified = true
      }
    },
    async fetch() {
      this.fetched = false
      this.$collection.reset()
      await this.$collection.fetch()
      this.fetched = true
    },
    search(term) {
      this.clearAll()
      if (this.range && !this.range_has_been_selected) {
        this.range_selected = 'All'
      }
      this.search_term = term
    },
    initPagination() {
      if (this.paginate) {
        const page_query = this.$route.query.page
        const page_number = isNaN(page_query) || page_query === undefined
          ? 1
          : page_query
        this.setCurrent(page_number)
        this.updateUrl()
      }
    },
    async initRange() {
      if (this.range && !this.range_fetched) {
        const { min, max } = await this.$request(
          `${this.$collection.$basePath}/range/${this.range}${this.filters_query}`
        )
        if (min && max) {
          const months_array = getMonthsArray(min, max)
          months_array.push('All')
          this.ranges = months_array

          const now = moment.utc().startOf('month')
          let selected_month = this.ranges[this.ranges.length - 2] // skip "All"

          for (let i = this.ranges.length - 1; i--;) {
            if (moment.utc(this.ranges[i], 'M/YYYY') < now) {
              break
            } else {
              selected_month = this.ranges[i]
            }
          }
          this.range_selected = selected_month
          this.range_has_been_selected = false
        }
        this.range_fetched = true
      }
    },
    async initFilters() {
      const filters = this.getFiltersFromRoute()
      this.filters = Object.assign({}, filters)
    },
    getFiltersFromRoute() {
      const filter_keys = Object.keys(this.$route.query).filter(key => key.includes('filter'))
      const map = {}
      filter_keys.map(key => {
        map[key.replace('filter_', '')] = this.$route.query[key]
      })
      return map
    },
    removeFilter(filter) {
      Vue.delete(this.filters, filter)
    },
    clearFilters() {
      this.filters = []
    },
    clearPagination() {
      this.current_page_index = 0
    },
    clearAll() {
      this.clearFilters()
      this.clearPagination()
    },
    updateUrl() {
      const query = {}
      if (this.filters_keys.length) {
        Object.assign(query, this.filters_ready)
      }
      if (this.current_page_index) {
        Object.assign(query, {
          page: this.current_page_index + 1
        })
      }
      this.$router.push({
        query
      })
    },
    updateQueries() {
      this.updateSearchQuery()
      this.updatePagination()
      this.updateFilters()
      this.updateRangeQuery()
    },
    updateSearchQuery() {
      if (this.search_term) {
        this.$collection.query_set({
          search: this.search_term.split(' ').join(',')
        })
      } else {
        this.$collection.query_remove('search')
      }
    },
    updatePagination() {
      if (this.paginate) {
        this.$collection.query_push({
          paginator_limit: this.limit,
          paginator_skip: this.skip
        })
      }
    },
    updateFilters() {
      // remove existing filters
      Object.keys(this.$collection.query)
        .filter(key => key.includes('filter'))
        .map(key => {
          this.$collection.query_remove(key)
        })
      if (this.filters_keys.length) {
        this.$collection.query_push(this.filters_ready)
      }
    },
    updateRangeQuery() {
      if (this.range_query) {
        this.$collection.query_push(this.range_query)
      } else {
        this.$collection.query_remove(`range_${this.range}`)
      }
    },
    setCurrent(page_number) {
      this.current_page_index = page_number - 1
    },
    paginator_class(n) {
      if (n - 1 === this.current_page_index) {
        return 'active'
      }
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
@import '~%/colors';

$pagination-border-radius: 5px;

.pagination {
  display: inline-block;
  margin-top: 20px;

  li {
    display: inline-block;
    margin: 0;

    &:first-child {
      a {
        border-top-left-radius: $pagination-border-radius;
        border-bottom-left-radius: $pagination-border-radius;
      }
    }

    &:last-child {
      a {
        border-top-right-radius: $pagination-border-radius;
        border-bottom-right-radius: $pagination-border-radius;
      }
    }

    &:not(:first-child) {
      a {
        margin-left: -1px;
      }
    }

    a {
      position: relative;
      display: inline-block;
      padding: 10px 14px;
      border: 1px solid $color-grey-80;

      &:hover {
        text-decoration: none;
        background: $color-grey-80;
      }

      &.active {
        color: $color-background-default;
        background: $color-highlight;
        border-color: $color-highlight;
        z-index: 3;
      }
    }
  }
}

.filters {
  margin-bottom: 10px;

  .filter {
    display: inline-block;
    background: $color-box-background;
    padding: 6px;
    border-radius: 4px;
    box-shadow: 0 2px 5px rgba(0,0,0, 0.3);
  }
}

.summary {
  margin: 30px 0 6px;
  font-size: 0.75em;
}

.actions {
  & > .search {
    width: 100%;
  }
}

.search-container {
  position: relative;
}

.action-buttons {
  & > div {
    margin-left: 10px;
  }
}

header {
  h2 {
    margin: 0 10px 0 0;
  }
}

.meta {
  .range {
    margin-left: 10px;
    position: relative;
    top: -2px;
  }
  .select-container {
    display: inline-block;
    padding-top: 2px;
  }
}
</style>

<style lang="scss">
@import '~%/breakpoints';

.vue-pull-to-wrapper {
  position: relative;
}

@media (max-width: $breakpoint-medium) {
  .collection-view {
    .search-container {
      input {
        width: 100%;
      }
    }
  }
}
</style>

