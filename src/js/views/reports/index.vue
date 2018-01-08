<template>
  <div>
    <header>
      <h2>Reports</h2>
    </header>
    <div class="content grid">
      <div class="grid__col grid__col--1-of-2">
        <transfers />
      </div>
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import Transfers from './transfers'

export default {
  name: 'reports',
  components: {
    Transfers
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
  
</style>