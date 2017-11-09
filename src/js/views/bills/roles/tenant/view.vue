<template>
  <div class="model-view">
    <div v-if="fetched">
      <header>
        <div class="meta">
          <legend>Bill</legend>
          <h2>{{ $bill.due_date | moment }}</h2>
        </div>
      </header>

      <div class="table">
        <div class="header">
          Basic Information
        </div>
        <div class="grid">
          <div class="grid__col grid__col--1-of-2">
            <dl>
              <dt>Due Date</dt>
              <dd>{{ $bill.due_date | moment('M/DD/YYYY', true) }}</dd>
            </dl>
          </div>
          <div class="grid__col grid__col--1-of-2">
            <dl>
              <dt>Type</dt>
              <dd>{{ $bill.type | capitalize }}</dd>
            </dl>
          </div>
          <div class="grid__col grid__col--1-of-2">
            <dl>
              <dt>Address</dt>
              <dd>{{ $bill.target }}</dd>
            </dl>
          </div>
        </div>
      </div>

      <div class="table">
        <div class="header">
          My Charges
        </div>

        <dl v-for="(charge, index) in my_charges" :key="index">
          <dt>{{ charge.description || 'fee' | capitalize }}</dt>
          <dd>{{ charge.amount | currency }}</dd>
        </dl>
        
      </div>
      <pre>total: {{ $bill.total | currency }}</pre>
      <pre>balance: {{ $bill.balance | currency }}</pre>
      <!-- <pre>{{ $bill.has_transfers }}</pre> -->
      <!-- <pre>{{ $bill.transfers_fetched }}</pre> -->

      <!-- {{ $bill.transfers }} -->

      <transfers-table :model="$bill" />

      <button class="primary" @click="showModal">Make a Payment</button>
      <transfer-modal v-if="modal_visible" :model="$bill" @close="closeModal" :confirm="fetch" />
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import session from '@/session'
import Bill from '@/models/bill'
import transfersTable from './transfers'
// import transfersTable from '@/views/transfers/table'
import splitRow from './split_row'

import transferModal from '@/components/modals/bill/transfer'

export default {
  name: 'bill',
  data() {
    return {
      fetched: false,
      modal_visible: false
    }
  },
  models: {
    bill() {
      return new Bill({
        id: this.$route.params.id
      }, {
        basePath: 'account/bills'
      })
    }
  },
  computed: {
    my_charges() {
      return this.$bill.tenants.find(model => {
        return model.id === session.$user.id
      }).charges
    }
  },
  async created() {
    await this.fetch()
    this.fetched = true
  },
  methods: {
    async fetch() {
      await this.$bill.fetch()
      // if (this.$bill.has_transfers) {
        // this.$bill.fetchTransfers()
      // }
    },
    showModal() {
      this.modal_visible = true
    },
    closeModal() {
      this.modal_visible = false
    }
  },
  components: {
    transfersTable,
    splitRow,
    transferModal
  }
}
</script>
