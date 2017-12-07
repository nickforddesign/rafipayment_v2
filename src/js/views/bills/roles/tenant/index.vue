<template>
  <div>
    <ul class="tabs">
      <li>
        <router-link :to="`/bills/current`">Current</router-link>
      </li>
      <li>
        <router-link :to="`/bills/past`">Past</router-link>
      </li>
    </ul>
    <router-view />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
export default {
  name: 'leases',
  created() {
    this.checkUrl()
  },
  watch: {
    $route() {
      this.checkUrl()
    }
  },
  methods: {
    checkUrl() {
      if (this.$route.path === '/bills') {
        this.$router.replace(`/bills/current`)
      }
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
