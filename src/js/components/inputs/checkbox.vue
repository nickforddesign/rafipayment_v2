<template>
  <div class="checkbox">
    <input type="checkbox" v-model="field_value" :id="_uid" :disabled="disabled">
    <label :for="_uid">
      <slot>
        {{ label }}
      </slot>
    </label>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
export default {
  name: 'check-box',
  props: ['value', 'label', 'disabled'],
  data() {
    return {
      field_value: this.value
    }
  },
  watch: {
    field_value(val) {
      this.$emit('input', val)
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
.checkbox {
  margin-bottom: 20px;
}
</style>
