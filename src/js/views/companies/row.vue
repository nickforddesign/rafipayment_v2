<template>
  <tr @click="goToModel">
    <td><a :href="$company.urlRoot" @click.prevent>{{ $company.name }}</a></td>
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
  },
  methods: {
    goToModel() {
      this.$router.push(this.$company.urlRoot)
    },
    async remove() {
      await this.$company.destroy()
      // this sux
      await this.$parent.$collection.reset()
      await this.$parent.$collection.fetch()
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
