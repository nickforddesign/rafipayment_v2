<template>
  <component :is="$user.role"></component>
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
  created() {
    console.log('test')
  },
  components: {
    admin,
    tenant
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
