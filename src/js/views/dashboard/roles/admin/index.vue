<template>
  <div class="model-view">
    <header>
      <div class="meta">
        <h2>Dashboard</h2>
      </div>
      <div class="actions">
        <!-- <button class="primary">Create New</button> -->
      </div>
    </header>
    <div class="table-container">
      <div class="header">
        Reports
      </div>
      <div class="box">
        Coming soon...
        <!-- <button @click="getReport">Test</button> -->
        <a :href="`${api}reports/account?date=${today}&token=${token.token}`" target="_blank">Get Report</a>
      </div>
    </div>
    <!-- <div class="table-container">
      <div class="header">
        Recently Updated
      </div>
    </div> -->
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
import config from '@/config'
import session from '@/session'

export default {
  models: {
    user() {
      return session.$user
    }
  },
  computed: {
    api() {
      return config.api
    },
    today() {
      return moment.utc().format('YYYY-MM-DD')
    },
    ...mapGetters({
      token: 'session:access'
    })
  }
  // methods: {
  //   getReport() {
  //     this.$request(`${this.api}reports/account?date=${this.today}`)
  //   }
  // }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
  
</style>