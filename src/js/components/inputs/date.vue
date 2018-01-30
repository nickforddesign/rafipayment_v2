<template>
  <div class="date-input">
    <input type="date"
      v-if="is_mobile"
      v-model="input_value" />
    <v-date-picker
      mode="single"
      v-model='input_value'
      :dateFormatter="dateFormatter"
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
    value: [String, Object],
    format: {
      type: String,
      default: 'ISO'
    }
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
    field_format() {
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
    },
    input_value(val) {
      const date = moment.utc(this.input_value).startOf('day')
      const output = this.format === 'ISO'
        ? date.toISOString()
        : date.format(this.format)
      this.$emit('input', output)
    }
  },
  methods: {
    setValue(value) {
      this.input_value = this.is_mobile
        ? moment.utc(value).format(this.field_format)
        : new Date(moment.utc(value).format(this.field_format))
    },
    dateFormatter(date) {
      return moment.utc(date).format('M/D/YYYY')
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
.date-input {
  position: relative;
}
</style>

<style lang="scss">
.date-input {
  .popover-container {
    width: 100%;
  }
}
</style>
