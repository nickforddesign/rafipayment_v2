<template>
  <modal @close="close" :confirm="validate">
    <h1 slot="header">Add {{ role | capitalize }}</h1>
    <div slot="body">
      <field name="first name" :errors="errors">
        <input type="text" v-model="first_name" v-validate="'required'" name="first name" ref="default">
      </field>

      <field name="last name" :errors="errors">
        <input type="text" v-model="last_name" v-validate="'required'" name="last name">
      </field>

      <field name="email" :errors="errors">
        <input type="email" v-model="email" v-validate="'required|email'" name="email">
      </field>

      <field name="phone" :errors="errors">
        <phone v-model="phone" v-validate.disable="'phone'" name="phone" />
      </field>

      <field name="password" :errors="errors" v-if="role === 'superadmin'">
        <password v-model="password" v-validate="'required'" name="password" />
      </field>

      <field name="company" :errors="errors" v-if="collection.length">
        <select-menu v-model="company" v-validate="'required'" name="company">
          <option disabled value="">Please select one</option>
          <option 
            v-for="(company, index) in collection"
            :value="company.id"
            :key="index"
            :label="company.name">
            {{ company.name }}
          </option>
        </select-menu>
      </field>

    </div>
  </modal>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import Company from '@/models/company'
import { Collection } from 'vue-collections'
import { Deferred, trimObj } from '@/utils'
import User from '@/models/user/new'
import session from '@/session'

export default {
  name: 'modal-user-add',
  props: {
    model: Object,
    confirm: Function,
    role: String
  },
  collection() {
    return new Collection({
      basePath: 'companies',
      model: Company
    })
  },
  data() {
    return {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      password: '',
      company: ''
    }
  },
  models: {
    user() {
      return new User({
        role: this.role
      })
    }
  },
  created() {
    if (session.$user.role === 'superadmin' && this.role !== 'superadmin') {
      this.$collection.fetch()
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    async validate() {
      const deferred = new Deferred()
      let passed = await this.$validator.validateAll()
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

      const data = trimObj(this.$data, '')

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