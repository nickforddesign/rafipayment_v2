<template>
  <div>
    <header>
      <div class="meta">
        <!-- <legend>Dashboard</legend> -->
        <h2>Dashboard</h2>
      </div>
    </header>
    <pre>{{ $user }}</pre>
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