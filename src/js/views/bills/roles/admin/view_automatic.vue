<template>
  <div>
    <header>
      <div class="meta">
        <legend>Bill</legend>
        <h2>#{{ $bill.display_id }} – {{ $bill.due_date | moment('M/D/YY', true) }}</h2>
      </div>
    </header>

    <div class="grid">
      <div class="table-container grid__col grid__col--1-of-2">
        <div class="header">
          Bill Information
        </div>
        <dl>
          <dt>Due Date</dt>
          <dd>{{ $bill.due_date | moment('M/D/YY', true) }}</dd>
        </dl>
        <dl>
          <dt>Type</dt>
          <dd>{{ $bill.type | capitalize }}</dd>
        </dl>
        <dl>
          <dt>Lease</dt>
          <dd>
            <router-link :to="`/leases/${$bill.lease}`">{{ $bill.target }}</router-link>
          </dd>
        </dl>
      </div>

      <div class="table-container grid__col grid__col--1-of-2">
        <div class="header">
          Bill Status
        </div>
        <dl>
          <dt>Active</dt>
          <dd>{{ $bill.active ? 'Yes' : 'No' }}</dd>
        </dl>
        <dl>
          <dt>Total Charges</dt>
          <dd>{{ $bill.total | currency }}</dd>
        </dl>
        <dl>
          <dt>Balance</dt>
          <dd>{{ $bill.balance | currency }}</dd>
        </dl>
      </div>
    </div>

    

    <div class="table-container">
      <div class="header">
        Details
        <div class="actions">
          <button class="small" @click="showModal('charge')">Add Charge</button>
        </div>
      </div>

      <tenant-summary
        v-for="(tenant, index) in $bill.tenants"
        :key="index"
        :tenant="tenant"
        :bill="$bill" />      
    </div>

    <charge-modal
      v-if="modals.charge"
      @close="closeModal('charge')"
      :confirm="fetch"
      :bill="$bill" />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import Indicator from '@/components/indicator'
import Tenant from '@/components/cards/user_small'
import TenantSummary from './tenant_summary'
import ChargeModal from '@/components/modals/bill/charge'

export default {
  name: 'bill',
  props: {
    $bill: Object
  },
  data() {
    return {
      modals: {
        charge: false
      }
    }
  },
  methods: {
    fetch() {
      this.$parent.fetch()
    },
    goToTenant(tenant) {
      this.$router.push(`/tenants/${tenant.id}`)
    },
    showModal(modal) {
      this.modals[modal] = true
    },
    closeModal(modal) {
      this.modals[modal] = false
    }
  },
  components: {
    Indicator,
    Tenant,
    ChargeModal,
    TenantSummary
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
@import '~%/colors';

.tenant {
  background: $color-box-background;
  margin-top: 10px;

  .user-card {
    width: 300px;
    margin: 0;
    box-shadow: none;
  }
}

.total {
  font-weight: bold;
  border: 0;
}

.summary {
  width: 300px;
  margin-right: 20px;
  margin-top: 10px;
  margin-left: calc(100% - 320px);

  dl {
    height: 44px;
  }
}
</style>
