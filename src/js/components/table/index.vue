<template>
  <div class="table">
    <div class="thead">
      <div class="tr">
        <div class="th" v-for="(column, index) in columns" :key="index" :width="column.width" :class="column.class">
          <span v-if="typeof column === 'object'">{{ column.name }}</span>
          <span v-else>{{ column }}</span>
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
  }
  // beforeMount() {
  //   console.log(this)
  // }
  // mounted() {
  //   // add column labels for mobile
  //   const $rows = this.$slots.default
  //   $rows.forEach(($row, index) => {
  //     const $cols = $row.elm.querySelectorAll('.td')
  //     $cols.forEach(($col, index) => {
  //       $col.innerHTML = `<label>${this.columns[index]}</label>${$col.innerHTML}`
  //     })
  //   })
  // }
}
</script>
<style scoped lang="scss">

</style>