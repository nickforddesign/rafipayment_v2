<template>
  <modal @close="close" :confirm="validate">
    <h1 slot="header">Add Company</h1>
    <div slot="body">
      <field name="company name" :errors="errors">
        <input type="text" v-model="name" v-validate="'required'" name="name" ref="default">
      </field>

      <field name="industry" :errors="errors">
        <select-menu v-model="category" v-validate="'required'" name="industry">
          <option disabled value="">Please select one</option>
          <option v-for="(category, index) in categories" :value="category.id" :key="index" :label="category.name">{{ category.name }}</option>
        </select-menu>
      </field>

      <field name="business classification" :errors="errors">
        <select-menu v-model="business_classification" v-validate="'required'" name="business classification">
          <option disabled value="">Please select one</option>
          <option v-for="(classification, index) in classifications" :value="classification.id" :key="index" :label="classification.name">{{ classification.name }}</option>
        </select-menu>
      </field>

      <field name="business type" :errors="errors">
        <select-menu v-model="business_type" v-validate="'required'" name="business type">
          <option disabled value="">Please select one</option>
          <option value="llc">LLC</option>
          <option value="corporation">Corporation</option>
          <option value="partnership">Partnership</option>
          <option value="soleproprietorship">Sole Proprietorship</option>
        </select-menu>
      </field>

      <field name="ein" :errors="errors">
        <input type="text" v-model="ein" v-validate="'required'" name="ein">
      </field>

      <field name="address 1" :errors="errors">
        <input type="text" v-model="address1" v-validate="'required'" name="address 1">
      </field>

      <field name="address 2" :errors="errors">
        <input type="text" v-model="address2" name="address 2">
      </field>
      
      <field name="city" :errors="errors">
        <input type="text" v-model="city" v-validate="'required'" name="city">
      </field>
      
      <field name="state" :errors="errors">
        <input type="text" v-model="state" v-validate="'required'" name="state">
      </field>
      
      <field name="zip code" :errors="errors">
        <input type="text" v-model="postal_code" v-validate="'required'" name="zip code">
      </field>

      <h2>Company Representative</h2>
      
      <field name="first name" :errors="errors">
        <input type="text" v-model="first_name" v-validate="'required'" name="first name">
      </field>

      <field name="last name" :errors="errors">
        <input type="text" v-model="last_name" v-validate="'required'" name="last name">
      </field>

      <field name="email" :errors="errors">
        <input type="email" v-model="email" v-validate="'required|email'" name="email">
      </field>

      <field name="phone" :errors="errors">
        <input type="text" v-model="phone" name="phone">
      </field>

      <field name="date of birth" label="Date of Birth" :errors="errors">
        <input type="string" v-model="date_of_birth" name="date of birth">
      </field>

      <field name="ssn" label="SSN" :errors="errors">
        <input type="string" v-model="ssn" name="ssn">
      </field>

    </div>
  </modal>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
// import _ from 'lodash'
import Vue from 'vue'
import { path, pickBy } from 'ramda'
import { Deferred } from '@/utils'
import Company from '@/models/company'

export default {
  name: 'modal-user-add',
  props: {
    model: Object,
    confirm: Function,
    role: String
  },
  data() {
    return {
      category: '',
      categories: [],
      // current_classification: '',
      // model data
      name: '',
      business_classification: '',
      business_type: '',
      ein: '123456789',
      address1: '',
      address2: '',
      city: 'Boston',
      state: 'MA',
      postal_code: '02110',
      first_name: '',
      last_name: '',
      email: '',
      date_of_birth: '1999-08-10',
      ssn: '123-45-6789',
      phone: '6175551234'
    }
  },
  computed: {
    classifications() {
      return path(['_embedded', 'industry-classifications'], this.classifications_match)
    },
    classifications_match() {
      return this.categories.find(category => {
        return category.id === this.category
      })
    }
  },
  mounted() {
    this.$request('payment/business_classifications')
    .then(response => {
      Vue.set(this, 'categories', response)
    })
    .catch(error => {
      console.log(error)
    })
  },
  models: {
    company() {
      return new Company()
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
      const data = pickBy(val => val !== '', {
        name: this.name,
        business_classification: this.business_classification,
        business_type: this.business_type,
        ein: this.ein,
        address1: this.address1,
        address2: this.address2,
        city: this.city,
        state: this.state,
        postal_code: this.postal_code,
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        date_of_birth: this.date_of_birth,
        ssn: this.ssn,
        phone: this.phone
      })

      // console.log({data})

      const request = this.$company.save(data)
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