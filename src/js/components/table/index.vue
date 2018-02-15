<template>
  <div class="table">
    <div class="thead">
      <div class="tr">
        <div class="th" v-for="(column, index) in columns_normalized" :key="index" :style="{ width: column.width }" :class="column.class">
          <span @click="sort(column)">{{ typeof column === 'object' ? column.name : column }}</span>
        </div>
      </div>
    </div>
    <div class="tbody">
      <slot />
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

<style scoped lang="scss">

</style>