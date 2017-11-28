<template>
  <div class="tr" @click="goToModel">
    <cell>
      <a :href="$company.urlRoot" @click.prevent>{{ $company.name }}</a>
    </cell>
    <cell>{{ $company.created | moment('MM/DD/YYYY h:mm:ssa') }}</cell>
    <cell>{{ $company.first_name }} {{ $company.last_name }}</cell>
  </div>
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
