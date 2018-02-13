<template>
  <div>
    <h2>Are there any additional fees / credits?</h2>

    <button @click="previous" class="back-button small">Back</button>

    <div class="container x-sm">
      <div class="box">
        <field name="Fees collected">
          <check-box v-model="first_collected">First month</check-box>
          <field v-if="first_collected" name="amount first" label="Amount" :errors="errors">
            <currency
              v-model="first_amount"
              v-validate.disable="'required'"
              data-vv-as="amount"
              name="amount first" />
          </field>

          <check-box v-model="last_collected" v-if="models.lease.end_date">Last month</check-box>
          <field v-if="last_collected" name="amount last" label="Amount" :errors="errors">
            <currency
              v-model="last_amount"
              v-validate.disable="'required'"
              data-vv-as="amount"
              name="amount last" />
          </field>

          <check-box v-model="security_collected">Security</check-box>
          <field v-if="security_collected" name="security last" label="Amount" :errors="errors">
            <currency
              v-model="security_amount"
              v-validate.disable="'required'"
              data-vv-as="amount"
              name="security last" />
          </field>
        </field>
      </div>
    </div>

    <div v-if="charges.length" class="container x-sm">
      <legend>Charges</legend>

      <div class="box" v-for="(charge, index) in charges" :key="index">
        <button class="close small" @click="removeCharge(index)">X</button>

        <field>
          <radio v-model="charge.kind" :options="[
            {
              label: 'Fee',
              value: 'fee'
            },
            {
              label: 'Credit',
              value: 'credit'
            }
          ]" />
          <!-- <input type="radio" :id="`fee-${index}`" :name="`kind-${index}`" value="fee" v-model="charge.kind">
          <label :for="`fee-${index}`">Fee</label>
          <input type="radio" :id="`credit-${index}`" :name="`kind-${index}`" value="credit" v-model="charge.kind">
          <label :for="`credit-${index}`">Credit</label> -->
        </field>

        <field :name="`amount ${index}`" label="Amount" :errors="errors">
          <currency
            v-model="charge.amount"
            :name="`amount ${index}`"
            data-vv-as="amount"
            v-validate="'required|min_currency:0.01|max_currency:5000'" />
        </field>

        <field name="description">
          <input type="text" v-model="charge.description">
        </field>

        <field name="type">
          <radio v-model="charge.type" :options="[
            {
              label: 'Recurring',
              value: 'recurring'
            },
            {
              label: 'Scheduled',
              value: 'scheduled'
            }
          ]" />
        </field>

        <field v-if="charge.type === 'scheduled'" name="date" :errors="errors">
          <date-picker
            v-model="charge.date"
            v-validate="`required|date_format:M/D/YYYY|date_between:${start_date},${end_date}`"
            name="date"
            format="M/D/YYYY" />
        </field>

        <field name="target">
          <input type="radio" :id="`lease-${index}`" :name="`target-${index}`" :value="false" v-model="charge.target_tenant">
          <label :for="`lease-${index}`">All Tenants</label>
          <input type="radio" :id="`tenant-${index}`" :name="`target-${index}`" :value="true" v-model="charge.target_tenant">
          <label :for="`tenant-${index}`">Specific Tenant</label>
        </field>

        <field :name="`tenant ${index}`" label="Tenant" :errors="errors" v-if="charge.target_tenant">
          <select-menu v-model="charge.tenant" v-validate="'required'" data-vv-as="tenant" :name="`tenant ${index}`" data-vv-value-path="field_value">
            <option disabled value="">Please select one</option>
            <option
              v-for="(tenant, index) in tenants"
              :value="tenant.email"
              :key="index"
              :label="tenant.full_name">
              {{ tenant.full_name }}
            </option>
          </select-menu>
        </field>

      </div>
    </div>

    <div class="actions">
      <div class="text-center">
        <button class="link" @click="addCharge">Add Charge</button>
      </div>
      <div>
        <button class="primary" @click="validate">Next</button>
      </div>
    </div>
    
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import moment from 'moment'

export default {
  name: 'lease-add--charges',
  props: {
    models: Object
  },
  data() {
    return {
      first_collected: false,
      first_amount: null,
      last_collected: false,
      last_amount: null,
      security_collected: false,
      security_amount: null,
      charges: []
    }
  },
  created() {
    this.models.lease.charges = []
    this.models.tenants.forEach(tenant => {
      tenant.charges = []
    })
  },
  computed: {
    tenants() {
      return this.models.tenants
    },
    start_date() {
      return moment.utc(this.models.lease.start_date).format('M/D/YYYY')
    },
    end_date() {
      return moment.utc(this.models.lease.end_date).format('M/D/YYYY')
    }
  },
  methods: {
    addCharge() {
      this.charges.push({
        type: 'recurring',
        kind: 'fee',
        amount: '',
        description: '',
        target_tenant: false,
        tenant: null
      })
    },
    removeCharge(index) {
      this.charges.splice(index, 1)
    },
    async validate() {
      const passed = await this.$validator.validateAll()
      if (passed) {
        this.complete()
      }
    },
    complete(model) {
      const lease_charges = []
      const tenant_charges = []

      // set first month
      if (this.first_collected) {
        lease_charges.push({
          amount: -this.first_amount,
          type: 'first_month',
          description: 'First month\'s rent',
          date: this.models.lease.start_date
        })
      }

      // set last month
      if (this.last_collected) {
        lease_charges.push({
          amount: -this.last_amount,
          type: 'last_month',
          description: 'Last month\'s rent',
          date: moment(this.models.lease.end_date).startOf('month').toISOString()
        })
      }

      // security deposit
      this.models.lease.security = this.security_collected
        ? this.security_amount
        : null

      console.log(this.models.lease)

      // distribute charges
      this.charges.map(charge => {
        const multiplier = charge.kind === 'fee'
          ? 1
          : -1
        const amount = charge.amount * multiplier

        if (charge.target_tenant) {
          tenant_charges.push({
            amount,
            date: charge.date,
            tenant: charge.tenant,
            description: charge.description
          })
        } else {
          lease_charges.push({
            amount,
            date: charge.date,
            description: charge.description
          })
        }
      })

      // set charges on model
      if (lease_charges.length) {
        this.models.lease.set({
          charges: lease_charges
        })
      }

      if (tenant_charges.length) {
        tenant_charges.map(charge => {
          const tenant = this.models.tenants.find(tenant => {
            return tenant.email === charge.tenant
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
    },
    moment: moment
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style lang="scss" scoped>
.box {
  .close {
    position: absolute;
    right: 14px;
    top: 6px;
    z-index: 10;
    background: transparent;
    box-shadow: none;
  }
}
</style>
