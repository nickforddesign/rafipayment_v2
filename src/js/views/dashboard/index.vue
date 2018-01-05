<template>
  <component :is="$user.role"></component>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import session from '@/session'
import Superadmin from './roles/superadmin/index'
import Admin from './roles/admin/index'
import Tenant from './roles/tenant/index'

export default {
  models: {
    user() {
      return session.$user
    }
  },
  components: {
    Superadmin,
    Admin,
    Tenant
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
