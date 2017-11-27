<template>
  <div class="table collection-view">
    <div class="header">
      Units
    </div>
    <div v-if="fetched">
      <div v-if="collection.length">
        <responsive-table :columns="[
          'Unit',
          'Property',
          'Current Lease',
          'Beds',
          'Baths'
        ]">
          <row v-for="(model, index) in collection" :key="index" :model="model" />
        </responsive-table>

      </div>
      <empty v-else>
        <div slot="message">This property doesn't have any units yet</div>
        <button class="primary" slot="actions" @click="showModal">Add Unit</button>
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
  name: 'units-table',
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
      basePath: `units?filter_property=${this.data.id}`
    })
  },
  async created() {
    await this.$collection.fetch()
    this.fetched = true
  },
  methods: {
    showModal() {
      this.modal_visible = true
    }
  },
  components: {
    row
  }
}
</script>
