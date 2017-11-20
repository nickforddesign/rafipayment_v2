<template>
  <div class="field-group">
    <legend>{{ legend }}</legend>
    <slot></slot>
    <validation v-if="errors" :name="name" :errors="errors" />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import filters from '@/modules/filters'

export default {
  name: 'field',
  props: {
    name: String,
    label: String,
    errors: Object
  },
  beforeCreate() {
    // HACK: vee-validate creates an instance of itself on all nested components
    // so this.errors is conflicting between the prop and the computed property
    delete this.$options.computed.errors
  },
  computed: {
    legend() {
      return (this.label !== undefined)
       ? this.label
       : filters.capitalize(this.name)
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
// legend {
//   text-transform: capitalize;
// }
</style>