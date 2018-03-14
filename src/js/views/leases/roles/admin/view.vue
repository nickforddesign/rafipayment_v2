<template>
  <div>
    <div class="model-view" v-if="fetched">
      <header>
        <div class="meta">
          <legend>Lease</legend>
          <h2>
            <router-link :to="`/properties/${$lease.property.id}`">{{ $lease.property.address }}</router-link>,
            <router-link :to="`/units/${$lease.unit.id}`">
              {{ $lease.unit.name }}
            </router-link>
          </h2>
        </div>
        <div class="actions">
          <button class="link" @click="promptRemove">Delete</button>
          <button class="primary" @click="showModal('lease')">Edit</button>
        </div>
      </header>

      <div class="grid">
        <div class="grid__col grid__col--1-of-2">
          <div class="table-container">
            <div class="header">
              Lease Terms
            </div>

            <dl>
              <dt>Type</dt>
              <dd>{{ $lease.type }}</dd>
            </dl>

            <dl>
              <dt>Start Date</dt>
              <dd>{{ $lease.start_date | moment('M/D/YY', true) }}</dd>
            </dl>
            <dl>
              <dt>End Date</dt>
              <dd>{{ $lease.end_date | moment('M/D/YY', true) }}</dd>
            </dl>
            <dl>
              <dt>Bill Due Day</dt>
              <dd>{{ $lease.bill_due_day }}</dd>
            </dl>

            <dl v-if="$lease.security">
              <dt>Security Deposit</dt>
              <dd>{{ $lease.security | currency }}</dd>
            </dl>

          </div>
        </div>

        <div class="table-container grid__col grid__col--1-of-2">
          <div class="header">
            Tenants
          </div>
          
          <dl v-for="(tenant, index) in $lease.tenants" :key="index">
            <dt>
              <tenant :data="tenant" />
            </dt>
            <dd
              class="text-color"
              :class="tenant.autopay ? 'success' : 'warning'">
              Autopay {{ tenant.autopay ? 'on' : 'off' }}
            </dd>
          </dl>

        </div>
      </div>

      <div class="table-container">
        <div class="header">
          Billing Terms

          <div class="actions">
            <button class="small" @click="showModal('period')">Add Period</button>
          </div>
        </div>
      
        <div class="grid">
          <period-view
            @fetch="fetch"
            :active_period="active_period"
            :lease="$lease" />

          <div class="grid__col grid__col--1-of-2">
            <div class="box periods">
              <radio v-model="active_period" :options="periods" />
            </div>
          </div>

        </div>
      </div>

      <div class="table-container">
        <div class="header">
          Lease Charges

          <div class="actions">
            <button class="small" @click="showModal('charge')">Add charge</button>
          </div>
        </div>

        <div v-if="$lease.charges.length || tenant_charges.length">
          <responsive-table :columns="[
            'Type',
            'Date',
            'Description',
            'Tenants',
            'Amount',
            {
              name: ' ',
              class: 'text-right'
            }
          ]">
            <charge-row
              v-for="(charge, index) in $lease.charges"
              :key="index" :model="charge"
              :lease="$lease"
              :basePath="`${$lease.url}/charges`"
              @destroy="fetch" />
            <charge-row
              v-for="charge in tenant_charges"
              :key="charge.tenant.id"
              :model="charge"
              :basePath="`${$lease.url}/tenants/${charge.tenant.id}/charges`"
              @destroy="fetch" />
          </responsive-table>
        </div>

        <empty v-else>
          <div slot="message">There are no additional lease charges</div>
          <button class="primary" slot="actions" @click="showModal('lease_charge')">Add a charge</button>
        </empty>
      </div>

      <bills-table :basePath="`bills?filter_lease=${$lease.id}`" />

      <lease-edit-modal
        v-if="modals.lease"
        @close="closeModal('lease')"
        :confirm="fetch"
        :model="$lease" />

      <period-modal
        v-if="modals.period"
        @close="closeModal('period')"
        :confirm="fetch"
        :lease="$lease"
        :basePath="`${$lease.url}/periods`" />

      <charge-modal
        v-if="modals.charge"
        @close="closeModal('charge')"
        :confirm="fetch"
        :lease="$lease" />

    </div>
    <loading v-else />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
// import { path } from 'ramda'
import moment from 'moment'
import app from '@/app'
import Lease from '@/models/lease'

// cards
// import Period from './period'
import Tenant from './tenant'

// rows
import ChargeRow from './charge_row'
import PeriodView from './period_view'

// modals
import LeaseEditModal from '@/components/modals/lease/edit'
import PeriodModal from '@/components/modals/lease/period'
import ChargeModal from '@/components/modals/lease/charge'

// tables
import BillsTable from '@/views/bills/table'

export default {
  name: 'lease',
  data() {
    return {
      fetched: false,
      active_period: 0,
      modals: {
        lease: false,
        period: false,
        charge: false
      }
    }
  },
  models: {
    lease() {
      return new Lease({
        id: this.$route.params.id
      })
    }
  },
  created() {
    this.fetch()
  },
  computed: {
    tenant_charges() {
      const charges = []
      this.$lease.tenants.map(tenant => {
        tenant.charges.map(charge => {
          charges.push(Object.assign({}, charge, { tenant }))
        })
      })
      return charges
    },
    periods() {
      return this.$lease.periods.map((period, index) => {
        return {
          label: moment.utc(period.start_date).format('M/D/YY'),
          value: index
        }
      })
    }
  },
  methods: {
    async fetch() {
      this.fetched = false
      await this.$lease.fetch()
      if (this.$lease.current_period !== undefined) {
        this.active_period = this.$lease.current_period
      }
      this.fetched = true
    },
    promptRemove() {
      app.confirm(
        `Are you sure you want to remove ${this.$lease.address}?`,
        this.remove,
        'Delete lease'
      )
    },
    async remove() {
      await this.$lease.destroy()
      this.$router.push(`/leases`)
    },
    showModal(modal) {
      this.modals[modal] = true
    },
    closeModal(modal) {
      this.modals[modal] = false
    }
  },
  components: {
    BillsTable,
    LeaseEditModal,
    PeriodModal,
    ChargeModal,
    ChargeRow,
    Tenant,
    PeriodView
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
@import '~%/colors';

.period {
  margin-top: 10px;
}
.checkbox {
  display: inline-block;
}
.periods {
  margin-top: 20px;
  background: darken($color-background-dark, 5%);
}
.box {
  padding: 7px 1.25rem 12px;
}
</style>

<style lang="scss">
.periods {
  .radio {
    .option {
      display: block !important;
      margin: 6px 0;
    }
  }
}
</style>

