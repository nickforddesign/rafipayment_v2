<template>
  <div class="collection-view">
    <header>
      <div class="meta">
        <h2>
          {{ name | capitalize }}
        </h2>
      </div>
      <div class="actions">
        <search @submit="search" v-if="searchable" />
        <slot name="actions" />
      </div>
    </header>

    <div v-if="filters.length" class="filters">
      <div v-for="(filter, index) in filters" :key="index" class="filter">
        {{ filter.key | capitalize }}: {{ filter.value }}
        <button class="x-small" @click="removeFilter(filter)">X</button>
      </div>
    </div>
      
    <slot name="content" v-if="fetched && collection.length" />
    <empty v-else-if="fetched && !collection.length">
      <div slot="message">There are no {{ collection_name || name }} yet</div>
    </empty>
    <loading v-else />

    <div class="pagination-container" v-if="paginate && page_count > 1">
      <div class="summary">
        <!-- Page {{ current_page_index + 1 }} of {{ page_count }}, -->
        {{ skip + 1 }} - {{ skip + collection.length }} of {{ $collection.total_count || 0 }} items
      </div>
      <ul class="pagination">
        <li v-for="(n, index) in page_count" :key="index">
          <a href="#" @click.prevent="setCurrent(n)" :class="[paginator_class(n)]">{{ n }}</a>
        </li>
      </ul>
    </div>

  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { mergeDeepRight } from 'ramda'

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
    }
  },
  data() {
    return {
      fetched: false,
      modal_visible: false,
      current_page_index: 0,
      original_base: '',
      search_term: '',
      filters: []
    }
  },
  created() {
    this.init()
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
    basePath() {
      let basePath = this.original_base
      const has_query = basePath.includes('?')
      const joiner = has_query
        ? '&'
        : '?'

      if (!this.search_term) {
        const has_pagination = !basePath.includes('paginator') && this.paginate
        if (has_pagination) {
          basePath += `${joiner}paginator_limit=${this.limit}&paginator_skip=${this.skip}`
        }
        if (this.filters.length) {
          const filterQuery = this.filters.map(filter => {
            return `filter_${filter.key}=${filter.value}`
          })
          basePath += has_pagination
            ? '&'
            : joiner
          basePath += filterQuery.join('&')
        }
      } else {
        basePath += `?search=${this.search_term.split(' ').join(',')}`
      }
      return basePath
    }
  },
  watch: {
    current_page_index(val) {
      this.updateUrl()
      if (this.fetched) {
        this.fetch()
      }
    },
    $route(val) {
      const page_number = val.query.page
      if (page_number !== undefined) {
        this.setCurrent(page_number)
      }
      this.initFilters()
    },
    filters(val) {
      this.updateUrl()
      this.updateBasePath()
      this.fetch()
    }
  },
  methods: {
    init() {
      this.initFilters()
      this.initPagination()
      if (!this.$collection.modified) {
        this.updateBasePath()
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
    initFilters() {
      for (let key in this.$route.query) {
        if (key.includes('filter')) {
          const value = this.$route.query[key]
          key = key.replace('filter_', '')
          this.addFilter({
            key,
            value
          })
        }
      }
    },
    addFilter(filter) {
      const match = this.filters.find((item, i) => {
        return item.key === filter.key && item.value === filter.value
      })
      if (!match) {
        this.filters.push(filter)
      }
    },
    removeFilter(filter) {
      let index
      this.filters.find((item, i) => {
        if (item.key === filter.key && item.value === filter.value) {
          index = i
        }
      })
      this.filters.splice(index, 1)
    },
    clearFilters() {
      this.filters = []
    },
    clearAll() {
      this.clearFilters()
      this.current_page_index = 0
    },
    updateUrl() {
      let new_query = {}

      if (this.filters.length) {
        const filter_map = this.filters.reduce((acc, filter) => {
          acc[`filter_${filter.key}`] = filter.value
          return acc
        }, {})
        new_query = mergeDeepRight(new_query, filter_map)
      }

      if (this.current_page_index) {
        new_query = mergeDeepRight(new_query, {
          page: this.current_page_index + 1
        })
      }

      this.$router.push({
        query: new_query
      })
    },
    updateBasePath() {
      if (!this.$collection.modified) {
        this.original_base = this.$collection.$basePath
      }
      this.$collection.basePath = () => {
        return this.basePath
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
}

.summary {
  margin: 30px 0 6px;
  font-size: 0.75em;
}

.search-container {
  position: relative;
  top: 7px;
}

header {
  h2 {
    margin: 0 10px 0 0;
  }
}
</style>

