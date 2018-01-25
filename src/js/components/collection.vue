<template>
  <div class="collection-view">
      <header>
        <div class="meta">
          <h2>
            <slot name="header">
              {{ name | capitalize }}
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
        <div slot="message">There are no {{ collection_name || name }} yet</div>
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
    queries: Object
  },
  data() {
    return {
      fetched: false,
      current_page_index: 0,
      search_term: '',
      filters: {}
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
    filters_keys() {
      return Object.keys(this.filters)
    },
    filters_ready() {
      const filters = {}
      for (let key in this.filters) {
        filters[`filter_${key}`] = this.filters[key]
      }
      return filters
    }
  },
  watch: {
    current_page_index(val) {
      this.updateUrl()
      this.updateQueries()
      this.fetch()
    },
    $route(val) {
      const page_number = val.query.page || 1
      this.setCurrent(page_number)
      this.initFilters()
    },
    filters() {
      this.updateUrl()
      this.updateQueries()
      this.fetch()
    },
    queries() {
      this.clearPagination()
      this.updateQueries()
      this.fetch()
    }
  },
  methods: {
    init() {
      this.initFilters()
      this.initPagination()
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
          this.addFilter({
            [key.replace('filter_', '')]: value
          })
        }
      }
    },
    addFilter(filter) {
      this.filters = Object.assign({}, filter)
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
      const new_query = {}

      if (this.filters_keys.length) {
        Object.assign(new_query, this.filters_ready)
      }
      if (this.current_page_index) {
        Object.assign(new_query, {
          page: this.current_page_index + 1
        })
      }
      this.$router.push({
        query: new_query
      })
    },
    updateQueries() {
      this.$collection.query_clear()
      if (this.search_term) {
        this.$collection.query_set({
          search: this.search_term.split(' ').join(',')
        })
      } else {
        if (this.paginate) {
          this.$collection.query_push({
            paginator_limit: this.limit,
            paginator_skip: this.skip
          })
        }
        if (this.filters_keys.length) {
          this.$collection.query_push(this.filters_ready)
        }
        if (this.queries) {
          this.$collection.query_push(this.queries)
        }
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

