<template>
  <tr>
    <td>{{ $property.name }}</td>
    <td>{{ $property.address }}</td>
    <td>{{ $property.units.length }}</td>
  </tr>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import Property from '@/models/property'

export default {
  name: 'row',
  props: ['model'],
  models: {
    property() {
      return new Property()
    }
  },
  created() {
    this.$property = this.model
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
