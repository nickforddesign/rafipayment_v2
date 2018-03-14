<template>
  <div class="table-container">
    <div class="table">
      <div class="thead">
        <div class="tr">
          <div class="th" v-for="(column, index) in columns_normalized" :key="index" :style="{ width: column.width }" :class="column.class">
            <a href="#"
              v-if="is_sortable && column.sort"
              @click.prevent="sort(column)">
              {{ column.name }}
              <div
                v-if="$parent.sort_key === column.sort"
                :class="['arrow', direction]" />
            </a>
            <span v-else>{{ column.name }}</span>
          </div>
        </div>
      </div>
      <div class="tbody">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'responsive-table',
  props: {
    columns: [Array]
  },
  computed: {
    direction() {
      return this.$parent.sort_asc
        ? 'down'
        : 'up'
    },
    columns_normalized() {
      return this.columns.map(column => {
        return {
          name: column.name || column,
          class: column.class,
          width: column.width,
          sort: column.sort || (column.sort === false
            ? false
            : this.toSnakeCase(column.name || column))
        }
      })
    },
    is_sortable() {
      return this.$parent.$options.name === 'collection'
    }
  },
  methods: {
    sort(column) {
      this.$parent.sort(column.sort)
    },
    toSnakeCase(string) {
      return string.toLowerCase().replace(/\s+/gi, '_')
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
@import '~%/colors';

.arrow {
  position: absolute;
  display: inline-block;
  margin: 6px 0 0 3px;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 6px 6px 6px;
  border-color: transparent transparent $color-highlight transparent;

  &.down {
    transform: rotate(180deg);
  }
}

.table-container {
  max-width: 100%;
  overflow-x: auto;
}
</style>