<template>
  <div class="new-tenant">

    <field name="first name" :errors="errors">
      <input type="text" name="first name" v-model="first_name" v-validate="'required'">
    </field>

    <field name="last name" :errors="errors">
      <input type="text" name="last name" v-model="last_name" v-validate="'required'">
    </field>

    <field name="email" :errors="errors">
      <input type="text" name="email" v-model="email" v-validate="'required|email'">
    </field>

    <field name="phone" :errors="errors">
      <input type="text" name="phone" v-model="phone">
    </field>

    <field name="password" :errors="errors">
      <password v-model="password" v-validate="'required'" name="password" />
    </field>

    <div class="actions" :errors="errors">
      <button class="primary" @click="add">Add</button>
    </div>

  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { trimObj } from '@/utils'
import User from '@/models/user/new'

export default {
  name: 'lease-add--tenant---new',
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
        role: 'tenant'
      }, {
        persist: true
      })
    }
  },
  methods: {
    async add() {
      const passed = await this.$validator.validateAll()
      if (passed) {
        // this.$user = {
        //   first_name: this.first_name,
        //   last_name: this.last_name,
        //   email: this.email,
        //   phone: this.phone,
        //   password: this.password
        // }
        this.$user = trimObj(this.$data, '')
        this.$parent.addTenant(this.$user)
        this.$parent.new = false
      }
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
  
</style>