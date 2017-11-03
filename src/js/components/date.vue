<template>
  <div class="date-input">
    <input type="date" v-model="input_value" :name="name">
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import moment from 'moment'

export default {
  name: 'date-picker',
  props: {
    value: String,
    name: String
  },
  data() {
    return {
      input_value: null
    }
  },
  created() {
    const value = this.value || undefined
    this.input_value = moment.utc(value).format('YYYY-MM-DD')
  },
  watch: {
    value(val) {
      this.input_value = val
    },
    input_value(val) {
      this.$emit('input', val)
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
  
</style>