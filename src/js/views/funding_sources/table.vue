<template>
  <div class="table collection-view">
    <div class="header">
      <div class="meta">
        <slot name="title">
          Bank Accounts
        </slot>
      </div>
      <div class="actions">
        <slot name="actions">
          <button class="small" @click="showModal">Add New</button>
        </slot>
      </div>
    </div>
    <div v-if="fetched">
      <responsive-table v-if="collection.length" :columns="[
        'Name',
        'Status',
        {
          name: 'Actions',
          class: 'text-right',
          label: false
        }
      ]">
        <row v-for="(model, index) in collection" :key="index" :model="model" @refetch="fetch" />
      </responsive-table>

      <empty v-else>
        <div slot="message">You don't have any payment methods yet</div>
        <button class="primary" slot="actions" @click="showModal">Add Payment Method</button>
      </empty>
    </div>
    <loading v-else type="table" />

    <funding-source-modal v-if="modal_visible" @close="closeModal" @complete="fetch" />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { Collection } from 'vue-collections'
import fundingSourceModal from '@/components/modals/funding_source'

import row from './row'

export default {
  name: 'transfers-table',
  props: {
    data: Object
  },
  data() {
    return {
      fetched: false,
      modal_visible: false
    }
  },
  collection() {
    return new Collection({
      basePath: `account/funding_sources`
    })
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      this.fetched = false
      this.$collection.reset()
      await this.$collection.fetch()
      this.fetched = true
    },
    showModal() {
      this.modal_visible = true
    },
    closeModal() {
      this.modal_visible = false
    }
  },
  components: {
    row,
    fundingSourceModal
  }
}
</script>
