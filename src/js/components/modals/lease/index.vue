<template>
  <modal @close="close">
    <h1 slot="header">New Lease</h1>
    <div slot="body">
      <div class="breadcrumbs">
        <div v-if="models.property">
          <legend>Property</legend>
          {{ models.property.address }}
        </div>
        <div v-if="models.unit">
          <legend>Unit</legend>
          {{ models.unit.name }}
        </div>

      </div>
      <component :is="steps[current_step]" :models="models" @next="next" @previous="previous" />
    </div>
  </modal>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { clone } from 'ramda'

import Lease from '@/models/lease/new'

import Property from './steps/property'
import Unit from './steps/unit'
import Terms from './steps/terms'
import Tenants from './steps/tenants'
import Charges from './steps/charges'
import LeaseSummary from './steps/summary'

export default {
  name: 'modal-lease--add',
  props: {
    model: Object,
    confirm: Function
  },
  data() {
    return {
      steps: [
        'property',
        'unit',
        'terms',
        'tenants',
        'charges',
        'lease-summary'
      ],
      models: {
        property: null,
        unit: null,
        tenants: null,
        lease: new Lease()
      },
      current_step: null
    }
  },
  components: {
    Property,
    Unit,
    Terms,
    Tenants,
    Charges,
    LeaseSummary
  },
  models: {
    lease() {
      return new Lease(this.model)
    }
  },
  created() {
    this.current_step = 0
  },
  computed: {
    has_back() {
      return this.current_step > 0
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    next() {
      if (this.current_step + 1 < this.steps.length) {
        this.current_step++
      } else {
        this.validate()
      }
    },
    previous() {
      if (this.has_back) {
        this.current_step--
      }
    },
    getLeaseData() {
      const data = clone(this.models.lease.$data)
      data.property = this.models.property.id
      data.unit = this.models.unit.id
      for (let tenant of this.models.tenants) {
        data.tenants.push({
          id: tenant.id,
          charges: tenant.charges || []
        })
      }
      return data
    },
    async saveModels() {
      try {
        if (this.models.property.isNew) {
          this.models.property = await this.models.property.save(this.models.property.$data)
        }
        this.models.unit.property = this.models.property.id

        if (this.models.unit.isNew) {
          this.models.unit = await this.models.unit.save(this.models.unit.$data)
        }
        for (let tenant of this.models.tenants) {
          if (tenant.isNew) {
            tenant = await tenant.save(tenant.$data)
          }
        }
        const lease_data = this.getLeaseData()
        await this.models.lease.save(lease_data)
      } catch (error) {
        console.warn('error', error)
      }
    },
    async validate() {
      await this.saveModels()
      if (this.confirm) {
        this.confirm()
      }
      this.close()
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
.breadcrumbs {
  margin-bottom: 30px;
}
</style>
