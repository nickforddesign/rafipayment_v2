<template>
  <div class="tenant-summary">
    <dl class="toggle" @click="toggle">
      <dt>
        <div class="tenant">
          <avatar :initials="$user.initials" :color="$user.avatar_color" />
          {{ $user.full_name }}
        </div>
      </dt>
      <dd>
        <div class="text-color status"
          :class="[bill.statusClass(bill.getTenantStatus(this.tenant.id))]">
          {{ $options.statuses[bill.getTenantStatus(this.tenant.id)] }}
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
import User from '@/models/user'
import Avatar from '@/components/cards/avatar'
import ChargeRow from './charge_row'
import TransferRow from './transfer_row'

export default {
  name: 'tenant-summary',
  props: {
    tenant: Object,
    bill: Object
  },
  statuses: {
    paid: 'Paid in Full',
    overpaid: 'Overpaid',
    balance: 'Balance Remaining',
    unpaid: 'Unpaid',
    credited: 'Credited',
    no_charges: 'No Charges'
  },
  models: {
    user() {
      return new User(this.tenant)
    }
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
      return this.bill.getTenantTotalCharges(this.tenant.id)
    },
    user_transfers() {
      return this.bill.getTenantTransfers(this.tenant.id)
    },
    total_transfers() {
      return this.bill.getTenantTotalTransfers(this.tenant.id)
    }
  },
  methods: {
    toggle() {
      this.expanded = !this.expanded
    }
  },
  components: {
    Avatar,
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

.tenant {
  display: flex;
  align-items: center;

  .avatar {
    display: inline-block;
    width: 30px;
    color: $color-text-light;
    margin-right: 10px;
  }
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
