<template>
  <component :is="$user.role" />
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
  components: {
    admin,
    tenant
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
