<template>
  <div>
    <h2>Which property is the bill for?</h2>
    <div v-if="fetched" class="property-select">
      <div v-if="collection.length">
        <searchable :collection="collection" display="address" v-model="selected" :focus="true" />

        <div class="actions">
          <button v-if="selected" @click="complete">Next</button>
        </div>
      </div>
      <empty v-else>
        <div slot="message">You don't have any properties yet</div>
      </empty>
    </div>
    <loading v-else />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { Collection } from 'vue-collections'
import Property from '@/models/property'

export default {
  name: 'bill-add--property',
  props: ['models'],
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
    if (this.models.property) {
      this.models.property = null
    }
    this.fetch()
  },
  methods: {
    async fetch() {
      await this.$collection.fetch()
      this.fetched = true
    },
    complete() {
      this.models.property = this.selected
      this.next()
    },
    next() {
      this.$emit('next')
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">

</style>