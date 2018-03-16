<template>
  <div class="tr" @click.exact="goToModel" @click.ctrl="goToModelNew" @click.meta="goToModelNew">
    <cell>
      <router-link :to="$company.urlRoot">{{ $company.name }}</router-link>
    </cell>
    <cell>{{ $company.created | moment('MM/DD/YYYY h:mm:ssa') }}</cell>
    <cell>{{ $company.first_name }} {{ $company.last_name }}</cell>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import Company from '@/models/company'
import { smartClick } from '@/utils'

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
    goToModel(e) {
      smartClick(e, () => this.$router.push(`${this.$company.urlRoot}`))
    },
    goToModelNew(e) {
      smartClick(e, () => window.open(`${this.$company.urlRoot}`))
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
