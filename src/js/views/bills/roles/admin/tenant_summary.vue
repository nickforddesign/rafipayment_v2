<template>
  <div class="tenant-summary">
    <dl class="toggle" @click="toggle">
      <dt>
        <tenant :data="this.tenant" :link="false" />
      </dt>
      <dd>
        <div class="text-color status"
          :class="[bill.statusClass(bill.getStatus(this.tenant.id))]">
          {{ bill.getFriendlyStatus(bill.getStatus(this.tenant.id)) }}
        </div>
        <div>{{ user_balance | currency }}</div>
      </dd>
    </dl>

    <collapse :expanded="expanded">
      <div class="details">
        <responsive-table>
          <charge-row v-for="(charge, index) in this.tenant.charges" :key="index" :data="charge" />
          <transfer-row v-for="transfer in this.user_transfers" :key="transfer.id" :data="transfer" />
        </responsive-table>

        <div class="summary">
          <dl>
            <dt>Total Charges</dt>
            <dd>{{ user_charges | currency }}</dd>
          </dl>

          <dl class="total">
            <dt>Total Paid</dt>
            <dd>{{ total_transfers | currency }}</dd>
          </dl>

          <dl>
            <dt>Balance</dt>
            <dd>{{ user_balance | currency }}</dd>
          </dl>
        </div>

      </div>
    </collapse>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import Tenant from '@/components/cards/user_small'
import ChargeRow from './charge_row'
import TransferRow from './transfer_row'

export default {
  name: 'tenant-summary',
  props: {
    tenant: Object,
    bill: Object
  },
  data() {
    return {
      expanded: false
    }
  },
  computed: {
    user_balance() {
      return this.user_charges - this.total_transfers
    },
    user_charges() {
      return this.bill.getTotalCharges(this.tenant.id)
    },
    user_transfers() {
      return this.bill.getTransfers(this.tenant.id)
    },
    total_transfers() {
      return this.bill.getTotalTransfers(this.tenant.id)
    }
  },
  methods: {
    toggle() {
      this.expanded = !this.expanded
    }
  },
  components: {
    Tenant,
    ChargeRow,
    TransferRow
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
@import '~%/colors';

.status {
  margin-bottom: 6px;
  font-size: 0.8em;
}

.table-container {
  margin: 0;
}

.toggle {
  height: 68px;
  padding: 0 20px;
  user-select: none;

  &:hover {
    cursor: pointer;
  }
}

.details {
  margin-bottom: 30px;
}

.summary {
  width: 300px;
  margin-top: 10px;
  margin-right: 20px;
  margin-left: calc(100% - 320px);

  dl {
    height: 44px;
    border: 0;
  }
}
</style>
