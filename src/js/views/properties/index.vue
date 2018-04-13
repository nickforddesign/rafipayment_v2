<template>
  <div class="collection-view">
    <collection name="properties" :$collection="$collection" :filter-label="['address']">
      <div slot="actions">
        <button @click="add" class="primary">Add</button>
      </div>

      <google-map slot="subheader" :markers="markers" :clickable="true" />

      <responsive-table slot="content" :columns="[
        'Name',
        'Address',
        {
          name: 'Units',
          sort: false
        }
      ]">
        <row v-for="(model, index) in collection" :key="index" :model="model" />
      </responsive-table>

    </collection>

    <property-modal v-if="modal_visible" @close="closeModal" :confirm="confirmModal" />

  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { Collection } from 'vue-collections'
import Property from '@/models/property'

import row from './row'

import propertyModal from '@/components/modals/property'

export default {
  name: 'properties',
  data() {
    return {
      modal_visible: false
    }
  },
  collection() {
    return new Collection({
      basePath: 'properties',
      model: Property
    })
  },
  computed: {
    markers() {
      return this.collection.map(model => {
        return {
          id: model.id,
          type: 'properties',
          place_id: model.place_id
        }
      })
    }
  },
  methods: {
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
    propertyModal
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
.collection-view {
  .map-container {
    margin: 20px 0 0;
  }
}
</style>