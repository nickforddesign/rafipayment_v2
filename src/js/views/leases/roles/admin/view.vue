<template>
  <div class="model-view">
    <header>
      <div class="meta">
        <legend>Lease</legend>
        <h2>{{ $lease.address }}</h2>
      </div>
      <div class="actions">
        <button class="link" @click="remove">Delete</button>
        <button class="primary">Edit</button>
      </div>
    </header>

    <div class="grid">
      <div class="grid__col grid__col--1-of-2">
        <div class="table">
          <div class="header">
            Unit Information
          </div>

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
            <dt>Beds</dt>
            <dd>{{ $lease.unit.bed_count }}</dd>
          </dl>
          <dl>
            <dt>Square Footage</dt>
            <dd>{{ $lease.unit.square_footage }}</dd>
          </dl>
        </div>
        
        <!-- <div class="table" v-if="$lease.periods.length > 1"> -->
        <div class="table">
          <div class="header">
            Lease Terms
          </div>
          <dl>
            <dt>Start Date</dt>
            <dd>{{ $lease.start_date | moment }}</dd>
          </dl>
          <dl>
            <dt>End Date</dt>
            <dd>{{ $lease.end_date | moment }}</dd>
          </dl>
        </div>
      </div>

      <!-- Single Billing Period -->

      <div class="table grid__col grid__col--1-of-2">
        <!-- <div v-if="$lease.periods.length === 1">
          <div class="header">
            Lease Terms
          </div>

          <div v-for="(period, index) in $lease.periods" :key="index">
            <dl>
              <dt>Start Date</dt>
              <dd>{{ period.start_date | moment }}</dd>
            </dl>
            <dl>
              <dt>End Date</dt>
              <dd>{{ $lease.end_date | moment }}</dd>
            </dl>
            <dl>
              <dt>Rent</dt>
              <dd>{{ period.amount | currency }}</dd>
            </dl>
          </div>
          <div class="actions">
            <button class="small" @click="editPeriod(period)">Edit</button>
            <button class="small" @click="addPeriod">Add</button>
          </div>
        </div>  -->


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

    <div class="table">
      <div class="header">
        Lease Charges
      </div>

      <div v-if="$lease.charges.length">
        <table>
          <thead>
            <tr>
              <td>Type</td>
              <td>Date</td>
              <td>Description</td>
              <td>Amount</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            <charge-row v-for="(charge, index) in $lease.charges" :key="index" :model="charge" :basePath="`${$lease.url}/charges`" />
          </tbody>
        </table>
        <div class="actions text-center">
          <button @click="showModal('lease_charge')">Add lease charge</button>
        </div>
      </div>
      
      <empty v-else>
        <div slot="message">There are no lease-wide charges</div>
        <button class="primary" slot="actions" @click="showModal('lease_charge')">Add a charge</button>
      </empty>
    </div>

    <div class="table">
      <div class="header">
        Tenant Charges
      </div>

      <tenant v-for="(tenant, index) in $lease.tenants" :key="index" :user="tenant" :basePath="`${$lease.url}`" />
      
    </div>

    <bills-table :basePath="`bills?filter_lease=${$lease.id}`"></bills-table>

    <period-modal v-if="modals.period" :path="`${$lease.url}/periods`" @close="closeModal('period')" :confirm="fetch" />
    <charge-modal v-if="modals.lease_charge" :path="`${$lease.url}/charges`" @close="closeModal('lease_charge')" :confirm="fetch" />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import Lease from '@/models/lease'

// cards
import period from './period'
import tenant from './tenant'

// rows
import chargeRow from './charge_row'

// modals
import periodModal from '@/components/modals/lease/period'
import chargeModal from '@/components/modals/lease/charge'

// tables
import billsTable from '@/views/bills/table'

export default {
  name: 'lease',
  data() {
    return {
      modals: {
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
    fetch() {
      this.$lease.fetch()
    },
    remove() {
      const confirmed = confirm(`Are you sure you want to remove ${this.$lease.address}?`)
      if (confirmed) {
        this.$lease.destroy()
        .then(() => {
          this.$router.push('/leases')
        })
      }
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
    billsTable,
    periodModal,
    chargeModal,
    chargeRow,
    tenant,
    period
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
.period {
  margin-top: 10px;
}
.table {
  .actions {
    margin-top: 20px;
  }
}
</style>
