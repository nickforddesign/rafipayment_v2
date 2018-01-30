<template>
  <div>
    <div v-if="fetched" class="property-select">
      <div v-if="collection.length">
        <searchable :collection="collection" display="address" v-model="selected" :focus="true">
          No matches found, <a href="#" @click.prevent="setNew">add a new property</a>?
        </searchable>

        <div class="actions">
          <button class="primary" v-if="selected" @click="complete">Next</button>
        </div>
      </div>
      <empty v-else>
        <div slot="message">You don't have any properties yet</div>
        <button slot="actions" class="primary" @click="$parent.setType('new')">Add a property</button>
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
    },
    setNew() {
      this.$parent.setType('new')
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
