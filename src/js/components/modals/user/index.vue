<template>
  <modal @close="close" :confirm="validate">
    <h1 slot="header">Add {{ role | capitalize }}</h1>
    <div slot="body">
      <div class="field-group">
        <legend>First Name</legend>
        <input type="text" v-model="first_name" v-validate="'required'" name="first name" ref="default">
        <validation name="first name" :errors="errors" />
      </div>
      <div class="field-group">
        <legend>Last Name</legend>
        <input type="text" v-model="last_name" v-validate="'required'" name="last name">
        <validation name="last name" :errors="errors" />
      </div>
      <div class="field-group">
        <legend>Email</legend>
        <input type="email" v-model="email" v-validate="'required|email'" name="email">
        <validation name="email" :errors="errors" />
      </div>
      <div class="field-group">
        <legend>Phone</legend>
        <input type="phone" v-model="phone">
        <validation name="phone" :errors="errors" />
      </div>
      <div class="field-group">
        <legend>Password</legend>
        <password v-model="password" v-validate="'required'" name="password" />
        <validation name="password" :errors="errors" />
      </div>
    </div>
  </modal>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { Deferred } from '@/utils'
import User from '@/models/user'

export default {
  name: 'modal-user-add',
  props: {
    model: Object,
    confirm: Function,
    role: String
  },
  data() {
    return {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      password: ''
    }
  },
  models: {
    user() {
      return new User({
        role: this.role
      })
    }
  },
  // created() {
  //   console.log(this.confirm())
  // },
  methods: {
    close() {
      this.$emit('close')
    },
    async validate() {
      const deferred = new Deferred()
      let passed = await this.$validator.validateAll()
      console.log({passed})
      if (passed) {
        await this.confirmChange()
        deferred.resolve()
      } else {
        deferred.reject()
      }
      return deferred.promise
    },
    async confirmChange() {
      this.loading = true

      const data = this.$data
      const request = this.$user.save(data)
      request.then(response => {
        this.confirm()
      })
      .catch(error => {
        console.log({error})
      })
      return request
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
  
</style>