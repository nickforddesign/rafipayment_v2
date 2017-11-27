<template>
  <div class="collection-view">
    <header>
      <div class="meta">
        <h2>Webhooks({{ collection.length }})</h2>
      </div>
      <div class="actions">
        <search />
        <button class="primary" @click="add">Add New Subscription</button>
      </div>
    </header>

    <responsive-table :columns="[
      'URL',
      'Created',
      'Paused',
      'Actions'
    ]">
      <row v-for="(model, index) in collection" :key="index" :model="model" />
    </responsive-table>

    <webhook-modal role="admin" v-if="modal_visible" @close="closeModal" :confirm="confirmModal" />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { Collection } from 'vue-collections'
import row from './row'

import webhookModal from '@/components/modals/webhook'

export default {
  name: 'admins',
  data() {
    return {
      modal_visible: false
    }
  },
  collection() {
    return new Collection({
      basePath: 'payment/webhook_subscriptions'
    })
  },
  created() {
    this.fetch()
  },
  methods: {
    fetch() {
      this.$collection.fetch()
    },
    add() {
      this.modal_visible = true
    },
    closeModal() {
      this.modal_visible = false
    },
    confirmModal() {
      this.$collection.fetch()
    }
  },
  components: {
    row,
    webhookModal
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
