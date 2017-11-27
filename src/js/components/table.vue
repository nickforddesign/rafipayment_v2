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
  },
  created() {
    console.log(this.columns)
  }
}
</script>
<style scoped lang="scss">

</style>