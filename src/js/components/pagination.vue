<template>
  <div class="pagination-container" v-if="page_count > 1">
    <div class="summary">
      {{ skip + 1 }} - {{ skip + collection.models.length }} of {{ collection.total_count || 0 }} items,
      <select-menu class="per-page" v-model="limit_value" :options="[
        10,
        20,
        50,
        100
      ]" />
      per page
    </div>
    <ul class="pagination">
      <li v-if="!low_visible">
        <a href="#" @click.prevent="setCurrent(1)" :class="[paginator_class(1)]">
          1 ...
        </a>
      </li>
      <li v-for="(n, index) in page_range" :key="index">
        <a href="#" @click.prevent="setCurrent(n)" :class="[paginator_class(n)]">
          {{ n }}
        </a>
      </li>
      <li v-if="!high_visible">
        <a href="#" @click.prevent="setCurrent(page_count)" :class="[paginator_class(page_count)]">
          ... {{ page_count }}
        </a>
      </li>
    </ul>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
const range_padding = 5

export default {
  name: 'pagination',
  props: ['active', 'collection', 'limit'],
  data() {
    return {
      limit_value: this.limit,
      low_visible: false,
      high_visible: false
    }
  },
  watch: {
    limit_value(val) {
      this.$emit('change-limit', val)
    }
  },
  computed: {
    page_count() {
      return this.collection.total_count && this.collection.models.length
        ? Math.ceil(this.collection.total_count / this.limit)
        : 0
    },
    page_range() {
      this.low_visible = this.high_visible = false
      let low = this.active + 1 - range_padding
      let high = this.active + 1 + range_padding
      if (low <= 1) {
        low = 1
        high = range_padding * 2
        this.low_visible = true
      } else if (high >= this.page_count) {
        high = this.page_count
        low = high - range_padding * 2
        this.high_visible = true
      }
      return this.range(low, high)
    },
    skip() {
      return (this.active) * this.limit
    }
  },
  methods: {
    range(low, high) {
      const array = []
      for (let i = low; i <= high; i++) {
        array.push(i)
      }
      return array
    },
    paginator_class(n) {
      if (n - 1 === this.active) {
        return 'active'
      }
    },
    setCurrent(n) {
      this.$emit('set', n)
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
@import '~%/colors';

$pagination-border-radius: 5px;

.pagination-container {
  margin-top: 20px;
}

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

.select-container.per-page {
  display: inline-block;
  width: 60px;
}
</style>
