<template>
  <div :class="['td', className]">
    <label v-if="label !== ' '">{{ label }}</label>
    <slot />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
export default {
  name: 'cell',
  props: {
    className: String
  },
  data() {
    return {
      label: null,
      index: null
    }
  },
  mounted() {
    this.index = this.$parent.$children.indexOf(this)
    const column = this.$parent.$parent.columns[this.index]
    this.label = typeof column === 'object'
      ? column.label !== false
        ? column.name
        : null
      : column
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">

</style>