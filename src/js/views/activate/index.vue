<template>
  <div class="activate">
    <component :is="$user.role"></component>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import session from '@/session'
import admin from './roles/admin/index'
import tenant from './roles/tenant/index'

export default {
  models: {
    user() {
      return session.$user
    }
  },
  async created() {
    const token = this.$route.query.token
    await session.activate(this, token)
  },
  components: {
    admin,
    tenant
  }
}
</script>

<style lang="scss">
@import '~%/activation';
</style>
