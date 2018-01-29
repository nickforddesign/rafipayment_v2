
<template>
  <div class="phone-input">
    <the-mask :mask="'(###) ###-####'" v-model="input_value" ref="input" />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
export default {
  name: 'phone',
  props: {
    value: String
  },
  data() {
    return {
      input_value: null
    }
  },
  created() {
    if (this.value) {
      this.input_value = this.value
    }
  },
  watch: {
    input_value(val) {
      this.$emit('input', val)
    }
  },
  methods: {
    focus() {
      // this.$refs.input.focus()
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
  
</style>