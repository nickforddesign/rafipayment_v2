<template>
  <div class="date-input">
    <input type="date"
      v-if="is_mobile"
      v-model="input_value" />
    <v-date-picker
      mode='single'
      v-model='input_value'
      v-else />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import moment from 'moment'
import { isMobile } from '@/utils'

export default {
  name: 'date-picker',
  props: {
    value: [String, Object]
  },
  data() {
    return {
      input_value: null
    }
  },
  created() {
    const value = this.value || undefined
    this.setValue(value)
  },
  computed: {
    format() {
      return this.is_mobile
        ? 'YYYY-MM-DD'
        : 'MM/DD/YYYY'
    },
    is_mobile() {
      return isMobile()
    }
  },
  watch: {
    value(value) {
      this.setValue(value)
      // this.input_value = new Date(moment.utc(value).format('MM/DD/YYYY'))
    },
    input_value(val) {
      this.$emit('input', moment.utc(this.input_value).startOf('day').toISOString())
    }
  },
  methods: {
    setValue(value) {
      this.input_value = this.is_mobile
        ? moment.utc(value).format(this.format)
        : new Date(moment.utc(value).format(this.format))
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
  
</style>