<template>
  <div class="tr" @click="goToModel">
    <div class="td">
      <a :href="`/${$unit.urlRoot}`" @click.prevent>{{ $unit.name }}</a>
    </div>
    <div class="td">{{ $unit.property_name }}</div>
    <div class="td">-</div>
    <div class="td">{{ $unit.bed_count }}</div>
    <div class="td">{{ $unit.bath_count }}</div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import Unit from '@/models/unit'

export default {
  name: 'row',
  props: ['model'],
  models: {
    unit() {
      return new Unit()
    }
  },
  created() {
    this.$unit = this.model
  },
  methods: {
    goToModel() {
      this.$router.push(`/${this.$unit.urlRoot}`)
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
