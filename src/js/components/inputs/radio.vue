<template>
  <div class="radio">
    <div class="option" v-for="(option, index) in options" :key="index">
      <input type="radio"
        :id="`${_uid}-${index}`"
        :name="`${_uid}-${index}`"
        :value="option.value"
        v-model="field_value">
      <label :for="`${_uid}-${index}`">
        {{ option.label || option.value }}
      </label>
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
export default {
  name: 'radio',
  props: {
    options: {
      type: Array
    },
    value: {
      type: [String, Boolean, Number]
    }
  },
  data() {
    return {
      field_value: this.value
    }
  },
  watch: {
    field_value() {
      this.$emit('input', this.field_value)
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
.option {
  display: inline-block;
}
</style>
