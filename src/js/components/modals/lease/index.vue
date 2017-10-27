<template>
  <modal @close="close" :confirm="validate">
    <h1 slot="header">Add Lease</h1>
    <div slot="body">
      <!-- <field name="start date" :errors="errors">
        <input type="date" v-model="start" v-validate="'required'">
      </field> -->

      <div v-if="periods.length">
        <legend>Billing Periods</legend>
        <div class="box" v-for="(period, index) in periods" :key="index">
          <field name="start" :errors="errors">
            <input type="date" v-model="period.start_date" v-validate="'required'">
          </field>
          <field name="amount" :errors="errors">
            <currency v-model="period.amount" />
            <!-- <input type="date" v-model="period.start_date" v-validate="'required'"> -->
          </field>
          {{ period }}
        </div>
      </div>

      <button @click="addPeriod">Add Billing Period</button>

      <field name="type" :errors="errors">
        <input type="radio" id="fixed" name="type" :value="true" v-model="is_fixed">
        <label for="fixed">Fixed Term</label>
        <input type="radio" id="m2m" name="type" :value="false" v-model="is_fixed">
        <label for="m2m">Month to Month</label>
      </field>

      <field name="end date" :errors="errors" v-if="is_fixed">
        <input type="date" v-model="end_date" v-validate="'required'">
      </field>

      <field name="bill due day" :errors="errors">
        <number maxlength="2" v-validate="'required|numeric|max_value:28'" v-model="bill_due_day" name="bill due day" />
      </field>

      <!-- <field name="property" :errors="errors">
        <select-menu v-model="property" v-validate="'required'" name="property">
          <option disabled value="">Please select one</option>
          <option 
            v-for="(property, index) in properties_collection.models"
            :value="property.id"
            :key="index"
            :label="property.address">
            {{ property.address }}
          </option>
        </select-menu>
      </field> -->

      <field name="tenants" :errors="errors">
        <select-menu :multiple="true" v-model="tenants_selected">
          <!-- <option disabled value="">Please select one</option> -->
          <option 
            v-for="(tenant, index) in tenants_collection.models"
            :value="tenant.id"
            :key="index"
            :label="`${tenant.first_name} ${tenant.last_name}`">
            {{ tenant.first_name }} {{ tenant.last_name }}
          </option>
        </select-menu>
      </field>

      <field name="property" :errors="errors">
        <select-menu v-model="property">
          <option disabled value="">Please select one</option>
          <option 
            v-for="(property, index) in properties_collection.models"
            :value="property.id"
            :key="index"
            :label="property.address">
            {{ property.address }}
          </option>
        </select-menu>
      </field>

      <field name="unit" :errors="errors">
        <select-menu v-model="unit" :disabled="units_disabled">
          <option disabled value="">Please select one</option>
          <option 
            v-for="(unit, index) in units_filtered"
            :value="unit.id"
            :key="index"
            :label="unit.address">
            {{ unit.name }}
          </option>
        </select-menu>
      </field>

      <!-- {{ properties_collection.models }} -->
      <!-- {{ units_filtered }} -->
      {{ tenants }}
    </div>
  </modal>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { Collection } from 'vue-collections'
import { Deferred } from '@/utils'

import Lease from '@/models/lease/new'
import User from '@/models/user'
import Property from '@/models/property'
import Unit from '@/models/unit'

const tenantsCollection = new Collection({
  basePath: 'tenants',
  model: User
})

const propertiesCollection = new Collection({
  basePath: 'properties',
  model: Property
})

const unitsCollection = new Collection({
  basePath: 'units',
  model: Unit
})

export default {
  name: 'modal-lease-add',
  props: {
    model: Object,
    confirm: Function
  },
  data() {
    return {
      // model data
      bill_due_day: 1,
      end_date: '2018-09-01',
      periods: [{
        start_date: '2017-09-01',
        amount: ''
      }],
      charges: [],
      property: '',
      unit: '',
      // other
      is_fixed: true,
      tenants_selected: [],
      units_disabled: true,
      units_filtered: []
    }
  },
  models: {
    lease() {
      return new Lease()
    }
  },
  created() {
    this.tenants_collection.fetch()
    this.properties_collection.fetch()
    this.units_collection.fetch()
  },
  watch: {
    property(val) {
      if (!val) {
        this.units_disabled = true
        this.units_filtered = []
      } else {
        this.units_disabled = false
        this.units_filtered = this.units_collection.models.filter(unit => {
          return unit.property._id === this.property
        })
      }
    }
  },
  computed: {
    tenants_collection() {
      return tenantsCollection
    },
    properties_collection() {
      return propertiesCollection
    },
    units_collection() {
      return unitsCollection
    },
    tenants() {
      return this.tenants_selected.map(id => {
        return {
          _id: id,
          charges: []
        }
      })
      // return this.tenants_selected.reduce((acc, id) => {
      //   acc[id] = {
      //     charges: [],
      //     autopay: null,
      //     split: null
      //   }
      //   return acc
      // }, {})
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    addPeriod() {
      this.periods.push({
        start_date: '2017-09-01',
        amount: ''
      })
    },
    async validate() {
      const deferred = new Deferred()
      let passed = await this.$validator.validateAll()
      // console.log({passed})
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
      console.log(this.tenants)

      const data = {
        bill_due_day: this.bill_due_day,
        end_date: this.end_date,
        periods: this.periods,
        charges: this.charges,
        tenants: this.tenants,
        property: this.property,
        unit: this.unit
      }

      console.log({data})

      const lease = new Lease(data)
      console.log(lease.encode())

      // throw Error('ok')
      // const request = this.$lease.save(lease.encode())
      const request = this.$lease.save(data)
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