<template>
  <div class="tr" @click="goToModel">
    <cell>
      <a :href="$bill.url" @click.prevent>{{ $bill.due_date | moment('M/D/YY', true) }}</a>
    </cell>
    <cell>{{ $bill.target }}</cell>
    <cell>{{ type | capitalize }}</cell>
    <cell class="text-right">{{ $bill.balance | currency }}</cell>

    <div class="mobile-only">
      <div class="main">
        <div class="flexbox">
          <div>{{ type | capitalize }}</div>
          <div class="solid text-right text-color" :class="[message_class]">
            {{ $bill.message }}
          </div>
        </div>
        <div class="text-center">
          <legend>Balance</legend>
          <h2>{{ $bill.balance | currency }}</h2>
        </div>
      </div>
      <button class="primary footer-button" v-if="$bill.balance" @click.stop="showModal">Make a Payment</button>
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import moment from 'moment'
import session from '@/session'
import Bill from '@/models/bill'
import Lease from '@/models/lease'

export default {
  name: 'row',
  props: ['model'],
  models: {
    bill() {
      return new Bill(this.model, {
        basePath: 'account/bills'
      })
    },
    lease() {
      return new Lease({
        id: this.model.lease
      }, {
        basePath: 'account/leases'
      })
    }
  },
  created() {
    this.$lease.fetch()
  },
  computed: {
    type() {
      return this.$bill.type === 'automatic'
        ? `rent - ${moment.utc(this.$bill.due_date).format('MMMM')}`
        : 'one-time'
    },
    message_class() {
      const status = this.$bill.bill_status
      return {
        success: [
          'paid'
        ].includes(status),
        neutral: [
          'future',
          'due'
        ].includes(status),
        danger: [
          'overdue'
        ].includes(status)
      }
    }
  },
  methods: {
    fetch() {
      this.$emit('fetch')
    },
    goToModel() {
      this.$router.push(`/bills/${this.$bill.id}`)
    },
    showModal() {
      const current_period = this.$lease.periods[this.$lease.current_period] || {}
      const me = this.$lease.tenants.find(tenant => tenant.id === session.$user.id)
      const my_period = me.periods.find(period => period.id === current_period.id)
      const amount = my_period && my_period.amount
      this.$emit('showModal', {
        amount,
        model: this.$bill
      })
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
@import '~%/breakpoints';

.mobile-only {
  display: none;

  .main {
    padding: 14px;
    font-size: 0.9em;
  }

  legend {
    text-align: center;
    margin: 0 auto 6px;
    text-transform: uppercase;
  }

  .footer-button {
    width: 100%;
    border-radius: 0;
    font-weight: bold;
  }
}

@media (max-width: $breakpoint-medium) {
  .table {
    .tbody {
      .tr {
        padding: 0;
      }
      .td {
        display: none !important;
      }
    }
  }
  .mobile-only {
    display: block;
  }
}
</style>
