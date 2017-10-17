<template>
  <tr>
    <td>{{ $company.name }}</td>
    <td>{{ $company.address }}</td>
    <td>{{ $company.units }}</td>
  </tr>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import Company from '@/models/company'

export default {
  name: 'row',
  props: ['model'],
  models: {
    company() {
      return new Company()
    }
  },
  created() {
    this.$company = this.model
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
