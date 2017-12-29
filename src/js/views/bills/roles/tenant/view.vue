<template>
  <div class="model-view container sm">
    <div v-if="fetched">
      <header>
        <div class="meta">
          <legend>Bill</legend>
          <h2>{{ $bill.due_date | moment }}</h2>
        </div>
      </header>

      <div class="box">
        <h3>Due Date: {{ $bill.due_date | moment('M/D/YY') }}</h3>

        <div v-if="$bill.type === 'automatic'">
          <charges-automatic  v-for="(tenant, index) in $bill.tenants" :key="index" :user="tenant" />
        </div>
        <div v-else>
          <charges-manual :charges="$bill.charges" :basePath="$bill.url" />
        </div>

        <dl>
          <dt>Total</dt>
          <dd>{{ $bill.total | currency }}</dd>
        </dl>
        <dl>
          <dt>Remaining Balance</dt>
          <dd class="strong">{{ $bill.balance | currency }}</dd>
        </dl>

      </div>

      <transfers-table :model="$bill" @fetch="fetch" />
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import TransfersTable from './transfers'
import ChargesAutomatic from './charges_automatic'
import ChargesManual from './charges_manual'
import UserCard from '@/components/cards/user'
import Bill from '@/models/bill'

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
  async created() {
    await this.fetch()
    this.fetched = true
  },
  computed: {
    type() {
      return this.$bill.type === 'automatic'
        ? 'rent'
        : 'one-time'
    }
  },
  methods: {
    async fetch() {
      await this.$bill.fetch()
    },
    showModal() {
      this.modal_visible = true
    },
    closeModal() {
      this.modal_visible = false
    }
  },
  components: {
    TransfersTable,
    UserCard,
    ChargesAutomatic,
    ChargesManual
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
@import '~%/colors';
@import '~%/breakpoints';

h3 {
  text-align: center;
}

.total {
  font-weight: bold;
  border: 0;
}

@media (max-width: $breakpoint-medium) {
  header {
    display: none;
  }
}
</style>
