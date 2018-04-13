<template>
  <div class="filter">
    {{ data.key | capitalize }}: {{ data.value }}
    <button class="x-small" @click="emitRemove">X</button>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
export default {
  name: 'collection-filter',
  props: {
    label: {
      type: Array
    },
    data: {
      type: Object
    },
    collection: {
      type: String
    }
  },
  // mounted() {
    // console.log(`${this.data.key}/${this.data.value}`)
    // this.$request(`${this.collection}/${this.data.value}`)
  // },
  methods: {
    emitRemove() {
      this.$emit('remove')
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
@import '~%/colors';

.filter {
  display: inline-block;
  background: $color-box-background;
  padding: 6px;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0,0,0, 0.3);
}
</style>
