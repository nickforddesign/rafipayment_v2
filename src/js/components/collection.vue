<template>
  <div class="collection-view">
    <header>
      <div class="meta">
        <h2>
          {{ name | capitalize }}
          ({{ collection.length }}/{{$collection.total_count || 0}})
        </h2>
      </div>
      <div class="actions">
        <slot name="actions" />
      </div>
    </header>
      
    <slot name="content" v-if="fetched" />
    <loading v-else />

    <ul class="pagination" v-if="paginate && page_count > 1">
      <li v-for="(n, index) in page_count" :key="index">
        <a href="#" @click.prevent="pushCurrent(n)" :class="[paginator_class(n)]">{{ n }}</a>
      </li>
    </ul>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
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
      current_page_index: 0
    }
  },
  created() {
    const basePath = this.$collection.$basePath
    if (!basePath.includes('paginator') && this.paginate) {
      this.$collection.basePath = () => {
        return `${basePath}?paginator_limit=${this.limit}&paginator_skip=${this.skip}`
      }
    }
    if (this.paginate) {
      const page_number = this.$route.query.page || 1
      this.setCurrent(page_number)
    }
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
    }
  },
  watch: {
    current_page_index(val) {
      this.fetch()
    },
    $route(val) {
      const page_number = val.query.page
      this.setCurrent(page_number)
    }
  },
  methods: {
    async fetch() {
      this.fetched = false
      this.$collection.reset()
      await this.$collection.fetch()
      this.fetched = true
    },
    pushCurrent(page_number) {
      this.$router.push({
        query: {
          page: page_number
        }
      })
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

