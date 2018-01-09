<template>
  <modal @close="close" :confirm="validate">
    <h1 slot="header">Add {{ role | capitalize }}</h1>
    <div slot="body">
      <field name="first name" :errors="errors">
        <input type="text" v-model="first_name" v-validate.disable="'required'" name="first name" ref="default" autocomplete="nopls">
      </field>

      <field name="last name" :errors="errors">
        <input type="text" v-model="last_name" v-validate.disable="'required'" name="last name" autocomplete="nopls">
      </field>

      <field name="email" :errors="errors">
        <input type="email" v-model="email" v-validate.disable="'required|email'" name="email" autocomplete="nopls">
      </field>

      <field name="phone" :errors="errors">
        <phone v-model="phone" v-validate.disable="'phone'" name="phone" autocomplete="nopls" />
      </field>

      <field name="password" :errors="errors" v-if="role === 'superadmin'">
        <password v-model="password" v-validate.disable="'required'" name="password" autocomplete="nopls" />
      </field>

      <field name="company" :errors="errors" v-if="collection.length">
        <select-menu v-model="company" v-validate.disable="'required'" name="company">
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

      const data = trimObj(this.$data, '', undefined)

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
