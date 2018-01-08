<template>
  <div class="tr" @click="goToModel">
    <cell>
      <a :href="$bill.url" @click.prevent>{{ $bill.due_date | moment }}</a>
    </cell>
    <cell>{{ $bill.target }}</cell>
    <cell>{{ type | capitalize }}</cell>
    <cell class="text-right">
      <span :class="['text-color', status_class]">{{ $bill.balance | currency }}</span>
    </cell>

    <div class="mobile-only">
      <div class="flexbox">
        <div class="date">{{ $bill.due_date | moment('MMM YYYY') }}</div>
        <div class="flex target text-center">{{ $bill.target }}</div>
        <div class="flex balance background-color" :class="[status_class]">
          {{ $bill.balance | currency }}
        </div>
      </div>
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
// import session from '@/session'
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
        ? 'rent'
        : 'one-time'
    },
    status_class() {
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
    font-size: 0.9em;

    .flexbox {
      & > div {
        white-space: nowrap;
        padding: 16px;
      }
      .date {
        width: 90px;
      }
      .flex {
        padding: 16px 10px;
      }
      .target {
        flex: 1;
      }
      .balance {
        width: 100px;
        text-align: center
      }
    }
  }
}
</style>
