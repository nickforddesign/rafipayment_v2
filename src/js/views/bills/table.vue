<template>
  <div class="table collection-view">
    <div class="header">
      <div class="meta">
        <slot name="title">
          Bills
        </slot>
      </div>
      <div class="actions">
        <slot name="actions">
          <button class="small" @click="showModal">Add Bill</button>
          <button class="small" @click="viewAll">View All</button>
        </slot>
      </div>
    </div>

    <bill-modal v-if="modal_visible" @close="closeModal" :confirm="fetch" :lease="$lease" :property="$lease.property" :unit="$lease.unit" />

    <div v-if="fetched">
      <responsive-table v-if="collection.length" :columns="[
        'Due Date',
        'Target',
        'Type',
        {
          name: 'Balance',
          class: 'text-right'
        }
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
import BillModal from '@/components/modals/bill'
import { Collection } from 'vue-collections'

import row from './row'

export default {
  name: 'bills-table',
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
      basePath: `${this.basePath}&paginator_limit=5`,
      query: {
        sort_due_date: -1
      }
    })
  },
  async created() {
    await this.fetch()
    this.fetched = true
  },
  computed: {
    $lease() {
      return this.$parent.$lease
    }
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
    },
    viewAll() {
      this.$router.push(`/${this.basePath}`)
    }
  },
  components: {
    row,
    BillModal
  }
}
</script>
