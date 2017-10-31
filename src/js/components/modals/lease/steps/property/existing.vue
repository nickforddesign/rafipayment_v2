<template>
  <div>
    <div v-if="fetched" class="property-select">
      <searchable :collection="collection" display="address" v-model="selected" />

      <div class="actions">
        <button v-if="selected" @click="complete">Next</button>
      </div>
    </div>
    <loading v-else />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { Collection } from 'vue-collections'
import Property from '@/models/property'

export default {
  name: 'lease-add--property---existing',
  data() {
    return {
      fetched: false,
      selected: null
    }
  },
  collection() {
    return new Collection({
      basePath: 'properties',
      model: Property
    })
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      await this.$collection.fetch()
      this.fetched = true
    },
    complete() {
      this.next()
    },
    next() {
      this.$parent.complete(this.selected)
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">

.property-select {
  margin-top: 20px;
}

.actions {
  margin-top: 20px;
}

</style>