<template>
  <div class="tr" @click="goToModel">
    <cell>
      <a :href="`/${$unit.urlRoot}`" @click.prevent>{{ $unit.name }}</a>
    </cell>
    <cell>{{ $unit.property_name }}</cell>
    <cell>-</cell>
    <cell>{{ $unit.bed_count }}</cell>
    <cell>{{ $unit.bath_count }}</cell>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import Unit from '@/models/unit'
// import Lease from '@/models/lease'

export default {
  name: 'row',
  props: ['model'],
  models: {
    unit() {
      return new Unit()
    }
    // lease() {
    //   return new Lease()
    // }
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
