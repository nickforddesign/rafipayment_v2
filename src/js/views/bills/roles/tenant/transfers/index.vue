<template>
  <div class="table collection-view">
    <div class="header">
      Payments
    </div>
    <div v-if="model.has_transfers">
      <div v-if="model.transfers.length">

        <user v-for="(tenant, index) in tenants_with_transfers" :key="index" :model="tenant" />

        <button v-if="model.active && model.balance" class="primary footer-button" @click="showModal">Make a Payment</button>

      </div>
      <loading v-else type="table" />
    </div>
    <empty v-else>
      <div slot="message">There are no payments on this bill yet</div>
      <button v-if="model.active && model.balance" class="primary" slot="actions" @click="showModal">Make a Payment</button>
    </empty>

    <transfer-modal :model="model" @close="closeModal" v-if="modal_visible" :confirm="fetch" />
    
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import User from './user'

import TransferModal from '@/components/modals/bill/transfer'

export default {
  name: 'transfers-table',
  props: {
    data: Object,
    model: Object
  },
  data() {
    return {
      fetched: false,
      modal_visible: false
    }
  },
  created() {
    this.fetch()
  },
  computed: {
    tenants_map() {
      const map = {}
      this.model.tenants.map(tenant => {
        map[tenant.id] = []
      })
      return map
    },
    transfers_by_tenant() {
      const map = Object.assign({}, this.tenants_map)
      this.model.transfers.map(transfer => {
        map[transfer.source.id].push(transfer)
      })
      return map
    },
    tenants_with_transfers() {
      return this.model.tenants.map(tenant => {
        tenant.transfers = this.transfers_by_tenant[tenant.id]
        return tenant
      })
    }
  },
  methods: {
    async fetch() {
      this.$emit('fetch')
    },
    showModal() {
      this.modal_visible = true
    },
    closeModal() {
      this.modal_visible = false
    }
  },
  components: {
    User,
    TransferModal
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
@import '~%/breakpoints';

.header {
  text-align: center;
}

.footer-button {
  margin-top: 20px;
}

@media (max-width: $breakpoint-medium) {
  .footer-button {
    position: fixed;
    bottom: -1px;
    left: 0;
    border-radius: 0;
    width: 100%;
  }
}
</style>

