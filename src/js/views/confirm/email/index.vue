<template>
  <loading />
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import app from '@/app'

export default {
  name: 'confirm-email',
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
    this.$request('account/profile/email', {
      method: 'put',
      body
    })
      .then(response => {
        app.alert(
          `Thank you, your email address has been verified.`,
          null,
          'Email verified',
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