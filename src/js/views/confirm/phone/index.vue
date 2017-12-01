<template>
  <div>
    Phone
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
export default {
  name: 'confirm-phone',
  data() {
    return {
      token: null
    }
  },
  created() {
    this.token = this.$route.query.token
    // console.log(this.token)
    const body = {
      token: this.token
    }
    this.$request('account/profile/phone', {
      method: 'put',
      body
    })
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">

</style>