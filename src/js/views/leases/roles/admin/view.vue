<template>
  <div>
    <div class="model-view" v-if="fetched">
      <header>
        <div class="meta">
          <legend>Lease</legend>
          <h2>{{ $lease.address }}</h2>
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
              Basic Information
            </div>

            <dl>
              <dt>Lease ID</dt>
              <dd>
                #{{ $lease.display_id }}
              </dd>
            </dl>

            <dl>
              <dt>Unit Name</dt>
              <dd>
                <router-link :to="`/units/${$lease.unit.id}`">
                  {{ $lease.unit.name }}
                </router-link>
              </dd>
            </dl>
            <dl>
              <dt>Property</dt>
              <dd>
                <router-link :to="`/properties/${$lease.property.id}`">
                  {{ $lease.property.name }}
                </router-link>
              </dd>
            </dl>
            <dl>
              <dt>Beds</dt>
              <dd>{{ $lease.unit.bed_count }}</dd>
            </dl>
            <dl>
              <dt>Baths</dt>
              <dd>{{ $lease.unit.bath_count }}</dd>
            </dl>
            <dl>
              <dt>Square Footage</dt>
              <dd>{{ $lease.unit.square_footage }}</dd>
            </dl>
          </div>

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
              <dd>{{ $lease.start_date | moment('M/D/YYYY', true) }}</dd>
            </dl>
            <dl>
              <dt>End Date</dt>
              <dd>{{ $lease.end_date | moment('M/D/YYYY', true) }}</dd>
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

          <!-- Multiple Billing Periods -->

          <div class="periods">
            <div class="header">
              Billing Periods
            </div>
            <period v-for="(period, index) in $lease.periods" :key="index" :model="period" :basePath="`${$lease.url}/periods`" :index="index" />

            <div class="actions">
              <button class="small" @click="addPeriod">Add</button>
            </div>
          </div>

        </div>

      </div>

      <div class="table-container">
        <div class="header">
          Tenants
        </div>

        <tenant v-for="(tenant, index) in $lease.tenants" :key="index" :user="tenant" :lease="$lease" :basePath="`${$lease.url}`" @fetch="fetch" />

      </div>

      <div class="table-container">
        <div class="header">
          Lease Charges
        </div>

        <div v-if="$lease.charges.length">
          <responsive-table :columns="[
            'Type',
            'Date',
            'Description',
            'Amount',
            {
              name: 'Actions',
              class: 'text-right'
            }
          ]">
            <charge-row v-for="(charge, index) in $lease.charges" :key="index" :model="charge" :basePath="`${$lease.url}/charges`" @destroy="fetch" />
          </responsive-table>

          <div class="actions text-center">
            <button @click="showModal('lease_charge')">Add lease charge</button>
          </div>
        </div>

        <empty v-else>
          <div slot="message">There are no lease-wide charges</div>
          <button class="primary" slot="actions" @click="showModal('lease_charge')">Add a charge</button>
        </empty>
      </div>

      <bills-table :basePath="`bills?filter_lease=${$lease.id}`"></bills-table>

      <lease-edit-modal v-if="modals.lease" @close="closeModal('lease')" :confirm="fetch" :model="$lease" />
      <period-modal v-if="modals.period" :path="`${$lease.url}/periods`" @close="closeModal('period')" :confirm="fetch" :lease="$lease" />
      <charge-modal v-if="modals.lease_charge" :path="`${$lease.url}/charges`" @close="closeModal('lease_charge')" :confirm="fetch" />
    </div>
    <loading v-else />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import app from '@/app'
import Lease from '@/models/lease'

// cards
import Period from './period'
import Tenant from './tenant'

// rows
import ChargeRow from './charge_row'

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
      modals: {
        lease: false,
        period: false,
        lease_charge: false,
        tenant_charge: false
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
  methods: {
    async fetch() {
      this.fetched = false
      await this.$lease.fetch()
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
    },
    addPeriod() {
      this.showModal('period')
    },
    addLeaseCharge() {
      this.showModal('lease_charge')
    },
    addTenantCharge() {
      this.showModal('tenant_charge')
    }
  },
  components: {
    BillsTable,
    LeaseEditModal,
    PeriodModal,
    ChargeModal,
    ChargeRow,
    Tenant,
    Period
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
.period {
  margin-top: 10px;
}
.table-container {
  .actions {
    margin-top: 10px;
  }
}
</style>
