<template>
  <div class="table collection-view">
    <div class="header">
      Leases

      <div class="actions">
        <button class="small" @click="emitAdd">Add Lease</button>
      </div>
    </div>
    <div v-if="fetched">
      <div v-if="collection.length">
        <responsive-table :columns="[
          'Property',
          'Unit',
          'Start Date',
          'End Date',
          'Duration',
          {
            name: ' ',
            sort: false
          },
          {
            name: 'Current Rent',
            class: 'text-right'
          }
        ]">
          <row v-for="(model, index) in collection" :key="index" :model="model" />
        </responsive-table>

        <!-- <div class="actions text-center">
          <button class="primary" slot="actions" @click="emitAdd">Add Lease</button>          
        </div> -->
      </div>
      <empty v-else>
        <div slot="message">This {{ $parent.$options.name }} doesn't have any leases yet</div>
        <button class="primary" slot="actions" @click="emitAdd">Add Lease</button>
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
  name: 'leases-table',
  props: {
    data: Object,
    path: String
  },
  data() {
    return {
      fetched: false
    }
  },
  collection() {
    return new Collection({
      basePath: this.path
    })
  },
  created() {
    this.fetch()
  },
  methods: {
    emitAdd() {
      this.$emit('add')
    },
    async fetch() {
      this.$collection.reset()
      await this.$collection.fetch()
      this.fetched = true
    }
  },
  components: {
    row
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
.actions {
  &.text-center {
    margin-top: 20px;
  }
}
</style>
