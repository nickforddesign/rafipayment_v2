<template>
  <div class="collection-view">
    <header>
      <div class="meta">
        <h2>
          {{ name | capitalize }}
          ({{ collection.length }}/{{ $collection.total_count || 0 }})
        </h2>
        <div v-if="filters.length">
          <div v-for="(filter, index) in filters" :key="index" class="filter">
            {{ filter.key | capitalize }}: {{ filter.value }}
            <button class="x-small" @click="removeFilter(filter)">X</button>
          </div>
        </div>
      </div>
      <div class="actions">
        <slot name="actions" />
      </div>
    </header>
      
    <slot name="content" v-if="fetched" />
    <loading v-else />

    <ul class="pagination" v-if="paginate && page_count > 1">
      <li v-for="(n, index) in page_count" :key="index">
        <a href="#" @click.prevent="setCurrent(n)" :class="[paginator_class(n)]">{{ n }}</a>
      </li>
    </ul>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { mergeDeepRight } from 'ramda'

export default {
  name: 'collection-table',
  props: {
    name: {
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
    }
  },
  data() {
    return {
      fetched: false,
      modal_visible: false,
      current_page_index: 0,
      original_base: '',
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
      const has_pagination = !basePath.includes('paginator') && this.paginate
      if (has_pagination) {
        basePath += `?paginator_limit=${this.limit}&paginator_skip=${this.skip}`
      }
      if (this.filters.length) {
        const filterQuery = this.filters.map(filter => {
          return `filter_${filter.key}=${filter.value}`
        })
        basePath += has_pagination
          ? '&'
          : '?'
        basePath += filterQuery
      }
      return basePath
    }
  },
  watch: {
    current_page_index(val) {
      this.updateUrl()
      this.fetch()
    },
    $route(val) {
      const page_number = val.query.page
      this.setCurrent(page_number)
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
      this.initPagination()
      this.initFilters()
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
    initPagination() {
      if (this.paginate) {
        const page_number = this.$route.query.page || 1
        this.setCurrent(page_number)
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
    updateUrl() {
      let new_query = {}

      if (this.filters.length) {
        const filter_map = this.filters.reduce((acc, filter) => {
          acc[`filter_${filter.key}`] = filter.value
          return acc
        }, {})
        new_query = mergeDeepRight(new_query, filter_map)
      }

      new_query = mergeDeepRight(new_query, {
        page: this.current_page_index + 1
      })

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
</style>

