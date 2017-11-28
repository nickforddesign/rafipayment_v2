<template>
  <div class="text-center">
    <logo />
    <form class="box small" @submit.prevent="submit">
      <field name="email" :errors="errors" :disabled="this.submitted">
        <input type="text" v-model="email" name="email">
      </field>

      <button type="submit">Submit</button>
    </form>

    <div class="actions">
      <router-link to="/">Cancel</router-link>
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
export default {
  name: 'forgot-password',
  data() {
    return {
      email: '',
      submitted: false
    }
  },
  methods: {
    async submit() {
      if (!this.submitted) {
        await this.request()
        this.submitted = true
      }
    },
    async request() {
      const body = {
        email: this.email
      }
      const response = await this.$request('account/profile/password', {
        body,
        method: 'post'
      })
      alert(`Thank you, an email has been sent to ${this.email}`)
      return response
    },
    async send() {
      const body = {
        email: this.email,
        code: this.code
      }
      const response = await this.$request('account/profile/password', {
        body,
        method: 'put'
      })
      return response
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
.logo {
  width: 200px;
  margin: 0 auto;
}
.box {
  width: 360px;
}
.actions {
  margin-top: 20px;
}
</style>