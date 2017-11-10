<template>
  <component :is="$user.role"></component>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import session from '@/session'
import admin from './roles/admin/view'
import tenant from './roles/tenant/view'

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
