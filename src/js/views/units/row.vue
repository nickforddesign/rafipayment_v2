<template>
  <tr @click="goToModel">
    <td>
      <a :href="`/${$unit.urlRoot}`" @click.prevent>{{ $unit.name }}</a>
    </td>
    <td>{{ $unit.property_name }}</td>
    <td>-</td>
    <td>{{ $unit.bed_count }}</td>
    <td>{{ $unit.bath_count }}</td>
  </tr>
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
