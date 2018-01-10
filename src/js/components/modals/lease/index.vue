<template>
  <modal @close="close" :keywatch="false" :full="true">
    <h1 slot="header">New Lease</h1>
    <div slot="body">
      <div v-if="!loading">
        <div class="container sm breadcrumbs">
          <div v-if="models.property" class="breadcrumb">
            <legend>Property</legend>
            {{ models.property.address }}
          </div>
          <div v-if="models.unit" class="breadcrumb">
            <legend>Unit</legend>
            {{ models.unit.name }}
          </div>
        </div>

        <div class="container modal-steps sm">
          <component :is="steps[current_step]" :models="models" @next="next" @previous="previous" />
        </div>
      </div>
      <loading v-else :fixed="true" />
    </div>
  </modal>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { clone } from 'ramda'

import app from '@/app'

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
    confirm: Function,
    property: Object,
    unit: Object,
    tenants: Array
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
      current_step: 0,
      loading: false
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
    // inject any models that were preselected
    if (this.property) {
      this.models.property = this.property
      this.current_step = 1
    }
    if (this.unit) {
      this.models.unit = this.unit
      this.current_step = 2
    }
    if (this.tenants && this.tenants.length) {
      this.models.tenants = this.tenants
    }
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
    async saveProperty() {
      if (this.models.property.isNew) {
        await this.models.property.save(this.models.property.$data)
      }
      this.models.unit.property = this.models.property.id
    },
    async saveUnit() {
      if (this.models.unit.isNew) {
        await this.models.unit.save(this.models.unit.$data)
      }
    },
    async saveTenants() {
      this.models.tenants = await Promise.all(
        this.models.tenants.map(async tenant => {
          if (tenant.isNew) {
            await tenant.save({
              first_name: tenant.first_name,
              last_name: tenant.last_name,
              email: tenant.email
            })
          }
          return tenant
        })
      )
    },
    async saveLease() {
      const lease_data = this.getLeaseData()
      await this.models.lease.save(lease_data)
    },
    async saveModels() {
      this.loading = true
      try {
        await this.saveProperty()
        await this.saveUnit()
        await this.saveTenants()
        await this.saveLease()
      } catch (error) {
        console.warn('error', error)
        app.alert(
          `${error.message}: ${error.data.message}`,
          null,
          'Error',
          'OK',
          'danger'
        )
      } finally {
        this.loading = false
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
@import '~%/colors';

// .container {
//   margin: 40px auto 0;
// }

.breadcrumbs {
  margin-top: 40px;

  .breadcrumb {
    display: inline-block;

    &:not(:last-child) {

      &:after {
        content: '';
        display: inline-block;
        width: 10px;
        height: 10px;
        margin: 0 20px;
        border-bottom: 2px solid $color-grey-70;
        border-right: 2px solid $color-grey-70;
        transform: rotate(-45deg);
      }
    }
  }
}
</style>

<style lang="scss">
.modal-steps {
  margin-top: 40px;

  h2 {
    text-align: center;
  }
  .back-button {
    position: absolute;
    top: 0;
    left: 0;
    // top: 20px;
    // left: 20px;
    // margin-bottom: 20px;
  }
  .actions {
    margin-top: 20px;
  }
  .container {
    margin: 0 auto;
  }
}
</style>

