<template>
  <div class="model-view">
    <div v-if="fetched">
      <header>
        <div class="meta">
          <legend>Bill</legend>
          <h2>{{ $bill.due_date | moment }}</h2>
        </div>
      </header>

      <div class="grid">
        <div class="table grid__col grid__col--1-of-2">
          <div class="header">
            Basic Information
          </div>
          <dl>
            <dt>Due Date</dt>
            <dd>{{ $bill.due_date | moment('M/DD/YYYY', true) }}</dd>
          </dl>
          <dl>
            <dt>Type</dt>
            <dd>{{ $bill.type | capitalize }}</dd>
          </dl>
          <dl>
            <dt>Address</dt>
            <dd>{{ $bill.target }}</dd>
          </dl>
          <dl>
            <dt>Balance</dt>
            <dd>{{ $bill.balance | currency }}</dd>
          </dl>
        </div>

        <div class="table grid__col grid__col--1-of-2">
          <div class="header">
            Tenants
          </div>

          <div class="tenant" v-for="(tenant, index) in $bill.tenants" :key="index">
            <user-card :data="tenant" />
          </div>

        </div>
      </div>

      <div class="table charges">
        <div class="header">
          Charges
        </div>

        <charges v-for="(tenant, index) in $bill.tenants" :key="index" :user="tenant" />

        <div class="summary">
          <dl class="total">
            <dt>Total</dt>
            <dd>{{ $bill.total | currency }}</dd>
          </dl>

          <dl class="total">
            <dt>Balance</dt>
            <dd>{{ $bill.balance | currency }}</dd>
          </dl>
        </div>
      </div>

      <!-- <pre>total: {{ $bill.total | currency }}</pre> -->
      <!-- <pre>balance: {{ $bill.balance | currency }}</pre> -->

      <transfers-table :model="$bill" />

      <!-- <button class="primary" @click="showModal">Make a Payment</button> -->
      <!-- <transfer-modal v-if="modal_visible" :model="$bill" @close="closeModal" :confirm="fetch" /> -->
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import Bill from '@/models/bill'
import transfersTable from './transfers'
import splitRow from './split_row'
import charges from '@/components/charges'
import userCard from '@/components/cards/user'

// import transferModal from '@/components/modals/bill/transfer'

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
        basePath: 'bills'
      })
    }
  },
  async created() {
    await this.fetch()
    this.fetched = true
  },
  methods: {
    async fetch() {
      await this.$bill.fetch()
      if (this.$bill.has_transfers) {
        this.$bill.fetchTransfers()
      }
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
    // transferModal,
    userCard,
    charges
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
  }
}

.total {
  font-weight: bold;
  border: 0;
}

.summary {
  width: 300px;
  float: right;
}

.charges {
  &:after {
    content: '';
    display: table;
    clear: both;
  }
}
</style>
