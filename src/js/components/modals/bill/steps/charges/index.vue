<template>
  <div class="container x-sm">
    <h2>What are the charges on the bill?</h2>

    <div v-if="charges.length">
      <legend>Charges</legend>

      <div class="box" v-for="(charge, index) in charges" :key="index">
        <button class="close small" @click="removeCharge(index)">X</button>

        <field :name="`amount ${index}`" label="Amount" :errors="errors">
          <currency v-model="charge.amount" :name="`amount ${index}`" data-vv-as="amount" v-validate="'required|min_currency:0.01|max_currency:5000'" />
        </field>

        <field name="description">
          <input type="text" v-model="charge.description">
        </field>

        <field :name="`tenant ${index}`" label="Tenant" :errors="errors">
          <select-menu v-model="charge.tenant" v-validate="'required'" data-vv-as="tenant" :name="`tenant ${index}`" data-vv-value-path="field_value">
            <option disabled value="">Please select one</option>
            <option
              v-for="(tenant, index) in tenants"
              :value="tenant.email"
              :key="index"
              :label="`${tenant.first_name} ${tenant.last_name}`">
              {{ tenant.first_name }} {{tenant.last_name }}
            </option>
          </select-menu>
        </field>

      </div>
    </div>

    <div class="actions">
      <div class="validation container" v-show="errors.has('charges')">
        <div class="error">
          {{ errors.first('charges') }}
        </div>
      </div>
      
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
export default {
  name: 'bill-add--charges',
  props: {
    models: Object
  },
  data() {
    return {
      charges: []
    }
  },
  created() {
    this.models.lease.tenants.forEach(tenant => {
      tenant.charges = []
    })
    if (!this.charges.length) {
      this.addCharge()
    }
  },
  watch: {
    charges(val) {
      if (val.length) {
        this.errors.remove('charges')
      } else {
        this.errors.add(
          'charges',
          'Bills must have at least 1 charge',
          'required'
        )
      }
    }
  },
  computed: {
    tenants() {
      return this.models.lease.tenants
    }
  },
  methods: {
    addCharge() {
      this.charges.push({
        amount: '',
        description: '',
        tenant: null
      })
    },
    removeCharge(index) {
      this.charges.splice(index, 1)
    },
    async validate() {
      const passed = await this.$validator.validateAll()
      if (passed && !this.errors.any()) {
        this.complete()
      }
    },
    async complete(model) {
      const tenants = []

      this.charges.map(charge => {
        const tenant = this.models.lease.tenants.find(tenant => {
          return tenant.email === charge.tenant
        })
        tenant.charges.push({
          amount: charge.amount,
          date: charge.date,
          description: charge.description
        })
      })

      this.models.lease.tenants.map(tenant => {
        if (tenant.charges.length) {
          tenants.push(tenant)
        }
      })

      this.models.tenants = tenants

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

<style lang="scss" scoped>
@import '~%/colors';

.box {
  overflow: visible;

  .close {
    position: absolute;
    right: 14px;
    top: 6px;
    z-index: 10;
    background: transparent;
    box-shadow: none;
  }
}
.error {
  padding: 14px;
  margin: 20px 0;
  background: rgba($color-status-danger, 0.7);
  border: $color-status-danger 1px solid;
  border-radius: 4px;
}
</style>
