<template>
  <div class="model-view">
    <header>
      <div class="meta">
        <h2>Dashboard</h2>
      </div>
      <div class="actions">
        <button class="primary">Create New</button>
      </div>
    </header>
    <div class="table-container">
      <div class="header">
        Reports
      </div>
    </div>
    <div class="table-container">
      <div class="header">
        Recently Updated
      </div>
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import session from '@/session'

export default {
  models: {
    user() {
      return session.$user
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
  
</style>