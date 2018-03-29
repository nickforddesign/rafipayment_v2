<template>
  <div class="table collection-view">
    <div class="header">
      Units
      <div class="actions">
        <button class="primary small" @click="showModal">Add Unit</button>
      </div>
    </div>
    <div v-if="fetched">
      <div v-if="collection.length">
        <responsive-table :columns="[
          'Unit',
          'Property',
          'Beds',
          'Baths',
          'Current Lease'
        ]">
          <row
            v-for="(model, index) in collection"
            :key="index"
            :model="model"
            @leases-fetched="leasesFetched" />
        </responsive-table>

      </div>
      <empty v-else>
        <div slot="message">This property doesn't have any units yet</div>
        <button class="primary" slot="actions" @click="showModal">Add Unit</button>
      </empty>
    </div>
    <loading v-else type="table" />

    <unit-modal v-if="modal_visible" @close="closeModal" :confirm="confirmModal" :model="data" />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { Collection } from 'vue-collections'
import Unit from '@/models/unit'
import unitModal from '@/components/modals/unit'
import row from './row'

export default {
  name: 'units-table',
  props: {
    data: Object
  },
  data() {
    return {
      fetched: false,
      modal_visible: false,
      units_leases_fetched: []
    }
  },
  collection() {
    return new Collection({
      basePath: `units?filter_property=${this.data.id}`,
      model: Unit
    })
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      this.$collection.reset()
      await this.$collection.fetch()
      this.fetched = true
    },
    showModal() {
      this.modal_visible = true
    },
    closeModal() {
      this.modal_visible = false
    },
    confirmModal() {
      this.fetch()
    },
    leasesFetched(e) {
      this.units_leases_fetched.push(e)
      if (this.units_leases_fetched.length === this.collection.length) {
        this.$emit('leases-fetched', this.units_leases_fetched)
      }
    }
  },
  components: {
    row,
    unitModal
  }
}
</script>
