<template>
  <div class="model-view container sm">
    <div class="heightfix" v-if="fetched">
      <div :class="[has_transfers]">
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

      <button v-if="$bill.active && $bill.balance" class="primary footer-button" @click="showModal">Make a Payment</button>
      <transfer-modal :model="$bill" @close="closeModal" v-if="modal_visible" :confirm="fetch" />
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import TransferModal from '@/components/modals/bill/transfer'
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
    },
    has_transfers() {
      if (this.$bill.active && this.$bill.balance) {
        return 'scroll-container'
      }
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
    TransferModal,
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
@import '~%/mixins';

h3 {
  text-align: center;
}

.total {
  font-weight: bold;
  border: 0;
}

.footer-button {
  margin-top: 20px;
}

.model-view, .heightfix {
  height: 100%;
}

@media (max-width: $breakpoint-medium) {
  header {
    display: none;
  }

  .scroll-container {
    position: absolute;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    // bottom: 50px;
    bottom: 0;
    @include vertical_scroll;
  }

  .footer-button {
    position: fixed;
    bottom: -1px;
    left: 0;
    border-radius: 0;
    width: 100%;
  }
}
</style>
