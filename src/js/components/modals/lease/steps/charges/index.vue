<template>
  <div class="container x-sm">
    <h2>Are there any additional fees / credits?</h2>

    <button @click="previous">Back</button>

    <div v-if="charges.length">
      <legend>Charges</legend>

      <div class="box" v-for="(charge, index) in charges" :key="index">
        <field name="amount" :errors="errors">
          <currency v-model="charge.amount" />
        </field>

        <field name="description">
          <input type="text" v-model="charge.description">
        </field>


        <field name="type">
          <input type="radio" :id="`recurring-${index}`" :name="`type-${index}`" value="recurring" v-model="charge.type">
          <label :for="`recurring-${index}`">Recurring</label>
          <input type="radio" :id="`scheduled-${index}`" :name="`type-${index}`" value="scheduled" v-model="charge.type">
          <label :for="`scheduled-${index}`">Scheduled</label>
        </field>

        <field v-if="charge.type === 'scheduled'" name="date">
          <date-picker v-model="charge.date" v-validate="'required'" name="date" />
        </field>

        <field name="target">
          <input type="radio" :id="`lease-${index}`" :name="`target-${index}`" :value="false" v-model="charge.target_tenant">
          <label :for="`lease-${index}`">All Tenants</label>
          <input type="radio" :id="`tenant-${index}`" :name="`target-${index}`" :value="true" v-model="charge.target_tenant">
          <label :for="`tenant-${index}`">Specific Tenant</label>
        </field>

        <field name="tenant" v-if="charge.target_tenant">
          <select-menu v-model="charge.tenant" v-validate="'required'" name="tenant">
            <option disabled value="">Please select one</option>
            <option
              v-for="(tenant, index) in tenants"
              :value="tenant.id"
              :key="index"
              :label="tenant.full_name">
              {{ tenant.full_name }}
            </option>
          </select-menu>
        </field>

      </div>
    </div>

    <!-- {{ charges }} -->

    <div class="actions">
      <div>
        <button class="link" @click="addCharge">Add Charge</button>
      </div>
      <div>
        <button class="primary" @click="complete">Next</button>
      </div>
    </div>
    
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
export default {
  name: 'lease-add--charges',
  props: {
    models: Object
  },
  data() {
    return {
      charges: []
    }
  },
  computed: {
    tenants() {
      return this.models.tenants
    }
  },
  methods: {
    addCharge() {
      this.charges.push({
        type: 'recurring',
        amount: '',
        description: '',
        target_tenant: false,
        tenant: null
      })
    },
    complete(model) {
      const lease_charges = []
      const tenant_charges = []

      this.charges.forEach(charge => {
        if (charge.target_tenant) {
          tenant_charges.push({
            amount: charge.amount,
            date: charge.date,
            tenant: charge.tenant,
            description: charge.description
          })
        } else {
          lease_charges.push({
            amount: charge.amount,
            date: charge.date,
            description: charge.description
          })
        }
      })

      // console.log('LEASE', lease_charges)
      // console.log('TENANTS', tenant_charges)

      if (lease_charges.length) {
        this.models.lease.set({
          charges: lease_charges
        })
      }

      if (tenant_charges.length) {
        tenant_charges.map(charge => {
          const tenant = this.models.tenants.find(tenant => {
            return tenant.id === charge.tenant
          })
          tenant.charges.push({
            amount: charge.amount,
            date: charge.date,
            description: charge.description
          })
        })
      }
      this.next()
    },
    next() {
      this.$emit('next')
    },
    previous() {
      this.$emit('previous')
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
