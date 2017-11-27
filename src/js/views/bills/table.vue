<template>
  <div class="table collection-view">
    <div class="header">
      <div class="meta">
        <slot name="title">
          Bills
        </slot>
      </div>
      <!-- <div class="actions">
        <slot name="actions">
          <button class="small" @click="showModal">Add Payment Method</button>
        </slot>
      </div> -->
    </div>
    <div v-if="fetched">
      <responsive-table v-if="collection.length" :columns="[
        'Due Date',
        'Target',
        'Type',
        'Balance'
      ]">
        <row v-for="(model, index) in collection" :key="index" :model="model" />
      </responsive-table>

      <empty v-else>
        <div slot="message">This {{ $parent.$options.name }} doesn't have any bills yet</div>
        <button class="primary" slot="actions" @click="showModal">Add Bill</button>
      </empty>
    </div>
    <loading v-else type="table" />

  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { Collection } from 'vue-collections'

import row from './row'

export default {
  name: 'transfers-table',
  props: {
    basePath: String
  },
  data() {
    return {
      fetched: false,
      modal_visible: false
    }
  },
  collection() {
    return new Collection({
      basePath: this.basePath
    })
  },
  async created() {
    await this.fetch()
    this.fetched = true
  },
  methods: {
    async fetch() {
      await this.$collection.fetch()
    },
    showModal() {
      this.modal_visible = true
    },
    closeModal() {
      this.modal_visible = false
    }
  },
  components: {
    row
  }
}
</script>