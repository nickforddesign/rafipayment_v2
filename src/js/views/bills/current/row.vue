<template>
  <div class="tr" @click.exact="goToModel" @click.ctrl="goToModelNew" @click.meta="goToModelNew">
    <cell>
      <router-link :to="`/${$bill.url}`">{{ $bill.due_date | moment('M/D/YY', true) }}</router-link>
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
      <button class="primary footer-button" v-if="$bill.balance" @click.stop="validate">Make a Payment</button>
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import moment from 'moment'
import app from '@/app'
import session from '@/session'
import Bill from '@/models/bill'
import { smartClick } from '@/utils'

export default {
  name: 'row',
  props: ['model'],
  models: {
    bill() {
      return new Bill(this.model, {
        basePath: 'account/bills'
      })
    }
  },
  computed: {
    me() {
      return this.$bill.tenants.find(model => model.id === session.$user.id)
    },
    my_charges() {
      return this.me.charges.reduce((acc, item) => acc + (item.amount * 100), 0) / 100
    },
    my_transfers() {
      return this.$bill.transfers.filter(transfer => transfer.source.id === session.$user.id) || []
    },
    my_total_transfers() {
      return this.my_transfers.reduce((acc, item) => acc + (item.amount * 100), 0) / 100
    },
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
    goToModel(e) {
      smartClick(e, () => this.$router.push(`/bills/${this.$bill.id}`))
    },
    goToModelNew(e) {
      smartClick(e, () => window.open(`/bills/${this.$bill.id}`))
    },
    validate() {
      if (this.$bill.type === 'automatic' && this.my_charges - this.my_total_transfers <= 0) {
        app.confirm(
          'It looks like you already paid in full, are you sure you want to make another payment?',
          this.showModal,
          'Possible overpayment'
        )
      } else {
        this.showModal()
      }
    },
    showModal() {
      let amount
      if (this.$bill.type === 'automatic') {
        amount = this.my_charges - this.my_total_transfers
      }
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
