<template>
  <modal @close="close" :keywatch="false">
    <h1 slot="header">New Bill</h1>
    <div slot="body">
      <div v-if="!loading" class="container sm modal-bill">
        <div class="breadcrumbs">
          <div v-if="models.property" class="breadcrumb">
            <legend>Property</legend>
            {{ models.property.address }}
          </div>
          <div v-if="models.unit" class="breadcrumb">
            <legend>Unit</legend>
            {{ models.unit.name }}
          </div>
          <div v-if="models.lease" class="breadcrumb">
            <legend>Lease</legend>
            {{ models.lease.label }}
          </div>
        </div>
        <button @click="previous" class="back-button small" v-if="has_back">Back</button>
        <div class="modal-steps">
          <component :is="steps[current_step]" :models="models" @next="next" @previous="previous" />
        </div>
      </div>
      <loading v-else :fixed="true" />
    </div>
  </modal>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import Bill from '@/models/bill/new'

import Property from './steps/property'
import Unit from './steps/unit'
import Lease from './steps/lease'
import Charges from './steps/charges'
import DueDate from './steps/date'

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
        'lease',
        'charges',
        'due-date'
      ],
      models: {
        property: null,
        unit: null,
        lease: null,
        tenants: null,
        bill: new Bill()
      },
      current_step: 0,
      loading: false
    }
  },
  components: {
    Property,
    Unit,
    Lease,
    Charges,
    DueDate
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
    async save() {
      this.loading = true
      const body = {
        property: this.models.property.id,
        unit: this.models.unit.id,
        lease: this.models.lease.id,
        tenants: this.models.tenants.map(tenant => {
          return {
            id: tenant.id,
            charges: tenant.charges
          }
        }),
        due_date: this.models.bill.due_date
      }
      await this.models.bill.save(body)
    },
    async validate() {
      await this.save()
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
.modal-bill {
  .back-button {
    margin-top: 20px;
  }
}
.modal-steps {
  margin-top: 40px;

  h2 {
    text-align: center;
  }
  .actions {
    margin-top: 20px;
  }
}
</style>

