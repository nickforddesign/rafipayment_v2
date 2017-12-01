<template>
  <loading />
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import filters from '@/modules/filters'
import app from '@/app'

export default {
  name: 'confirm-phone',
  data() {
    return {
      token: null
    }
  },
  created() {
    this.token = this.$route.query.token
    const body = {
      token: this.token
    }
    this.$request('account/profile/phone', {
      method: 'put',
      body
    })
      .then(response => {
        app.alert(
          `Thank you, your phone ${filters.phone(response.phone)} has been verified.`,
          null,
          'Phone verified',
          'OK',
          'success'
        )
      })
      .catch(() => {
        app.alert(
          `It looks like the verification link you clicked is not valid.`,
          null,
          'Invalid token',
          'OK',
          'neutral'
        )
      })
      .then(() => {
        this.$router.push('/')
      })
  }
}
</script>
