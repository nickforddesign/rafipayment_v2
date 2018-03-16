<template>
  <div class="model-view">
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
            <router-link :to="`/units/${$bill.unit.id}`">{{ $bill.target }}</router-link>
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
        Tenants
      </div>

      <dl class="tenant" v-for="(tenant, index) in $bill.tenants" :key="index">
        <dt>
          <tenant :data="tenant" :link="false" />
        </dt>
      </dl>
    </div>

    <div class="table-container">
      <div class="header">
        Details

        <div class="actions">
          <button class="small" @click="showModal('charge')">Add Charge</button>
        </div>
      </div>

      <dl class="toggle" @click="toggle">
        <dt>
          Balance
        </dt>
        <dd>
          <div class="text-color status"
            :class="[$bill.statusClass($bill.getStatus())]">
            {{ $bill.getFriendlyStatus($bill.getStatus()) }}
          </div>
          <div>{{ $bill.balance | currency }}</div>
        </dd>
      </dl>
      
      <collapse :expanded="expanded">
        <responsive-table>
          <charge-row v-for="(charge, index) in $bill.charges" :key="index" :data="charge" />
          <transfer-row v-for="transfer in $bill.transfers" :key="transfer.id" :data="transfer" :avatar="true" :bill="$bill" />
        </responsive-table>
      </collapse>
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
import ChargeRow from './charge_row'
import TransferRow from './transfer_row'
import Tenant from '@/components/cards/user_small'
import ChargeModal from '@/components/modals/bill/charge'

export default {
  name: 'bill',
  props: {
    $bill: Object
  },
  data() {
    return {
      expanded: false,
      modals: {
        charge: false
      }
    }
  },
  methods: {
    fetch() {
      this.$bill.fetch()
    },
    goToTenant(tenant) {
      this.$router.push(`/tenants/${tenant.id}`)
    },
    showModal(modal) {
      this.modals[modal] = true
    },
    closeModal(modal) {
      this.modals[modal] = false
    },
    toggle() {
      this.expanded = !this.expanded
    }
  },
  components: {
    ChargeRow,
    ChargeModal,
    TransferRow,
    Tenant
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
.status {
  margin-bottom: 6px;
  font-size: 0.8em;
}

.tenant, .toggle {
  height: 68px;
  padding: 0 20px;
  user-select: none;

  &:hover {
    cursor: pointer;
  }
}

.total {
  font-weight: bold;
  border: 0;
}

.summary {
  width: 300px;
  float: right;
  margin-right: 20px;
}
</style>
