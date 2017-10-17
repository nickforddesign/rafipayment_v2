<template>
  <modal @close="close" :confirm="validate">
    <h1 slot="header">Add Company</h1>
    <div slot="body">
      <div class="field-group">
        <legend>Company Name</legend>
        <input type="text" v-model="name" v-validate="'required'" name="name" ref="default">
        <validation name="name" :errors="errors" />
      </div>
      <div class="field-group">
        <legend>Industry</legend>
        <select-menu v-model="category" v-validate="'required'" name="industry">
          <option v-for="(category, index) in categories" :value="category.id" :key="index" :label="category.name">{{ category.name }}</option>
        </select-menu>
        <validation name="industry" :errors="errors" />
      </div>
      <!-- {{ category }} -->
      <!-- <pre>{{ classifications }}</pre> -->
      <div class="field-group">
        <legend>Business Classification</legend>
        <select-menu v-model="business_classification" v-validate="'required'" name="business classification">
          <option v-for="(classification, index) in classifications" :value="classification.id" :key="index" :label="classification.name">{{ classification.name }}</option>
        </select-menu>
        <validation name="business classification" :errors="errors" />
      </div>

      <div class="field-group">
        <legend>Business Type</legend>
        <select-menu v-model="business_type" v-validate="'required'" name="business type">
          <option value="llc" selected>LLC</option>
          <option value="corporation">Corporation</option>
          <option value="partnership">Partnership</option>
          <option value="soleproprietorship">Sole Proprietorship</option>
        </select-menu>
        <validation name="business type" :errors="errors" />
      </div>

      <div class="field-group">
        <legend>EIN</legend>
        <input type="text" v-model="ein" v-validate="'required'" name="ein">
        <validation name="ein" :errors="errors" />
      </div>

      <div class="field-group">
        <legend>Address 1</legend>
        <input type="text" v-model="address1" v-validate="'required'" name="address1">
        <validation name="address1" :errors="errors" />
      </div>

      <div class="field-group">
        <legend>Address 2</legend>
        <input type="text" v-model="address2" name="address2">
        <validation name="address2" :errors="errors" />
      </div>

      <div class="field-group">
        <legend>City</legend>
        <input type="text" v-model="city" v-validate="'required'" name="city">
        <validation name="city" :errors="errors" />
      </div>

      <div class="field-group">
        <legend>State</legend>
        <input type="text" v-model="state" v-validate="'required'" name="state">
        <validation name="state" :errors="errors" />
      </div>

      <div class="field-group">
        <legend>Zip</legend>
        <input type="text" v-model="postal_code" v-validate="'required'" name="zip code">
        <validation name="zip code" :errors="errors" />
      </div>

      <h2>Company Representative</h2>

      <div class="field-group">
        <legend>First Name</legend>
        <input type="text" v-model="first_name" v-validate="'required'" name="first name">
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
        <input type="phone" v-model="phone" name="phone">
        <validation name="phone" :errors="errors" />
      </div>
      <div class="field-group">
        <legend>DOB</legend>
        <input type="string" v-model="date_of_birth" name="dob">
        <validation name="dob" :errors="errors" />
      </div>
      <div class="field-group">
        <legend>SSN</legend>
        <input type="string" v-model="ssn" name="ssn">
        <validation name="ssn" :errors="errors" />
      </div>
    </div>
  </modal>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import _ from 'lodash'
import Vue from 'vue'
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
      name: 'Test Company',
      business_classification: '',
      business_type: '',
      ein: '123456789',
      address1: '262 Washington St',
      address2: '',
      city: 'Boston',
      state: 'MA',
      postal_code: '02110',
      first_name: 'Tony',
      last_name: 'Pepp',
      email: 'tpepp@gmail.com',
      date_of_birth: '1999-08-10',
      ssn: '123-45-6789',
      phone: '6175551234'
    }
  },
  computed: {
    classifications() {
      console.log(this.classifications_match)
      return _.get(this.classifications_match, '_embedded.industry-classifications')
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
      // console.log(response)
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
      console.log(this.$data)
      const deferred = new Deferred()
      let passed = await this.$validator.validateAll()
      console.log(passed)
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

      // const data = this.$data
      let data = {}
      for (let key in this.$data) {
        console.log({key})
        if (this.$data[key]) {
          data[key] = this.$data[key]
        }
      }
      console.log('SAVING')
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