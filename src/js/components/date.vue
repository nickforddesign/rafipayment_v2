<template>
  <div class="date-input">
    <!-- <input type="date" v-model="input_value" :name="name"> -->
    <v-date-picker
      mode='single'
      v-model='input_value'>
    </v-date-picker>
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
    this.input_value = moment.utc(value).toDate()
  },
  watch: {
    value(val) {
      this.input_value = moment.utc(val).toDate()
    },
    input_value(val) {
      this.$emit('input', moment.utc(this.input_value).toISOString())
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
  
</style>