<template>
  <div>
    <div v-if="fetched" class="unit-select">
      <div v-if="collection.length">
        <searchable :collection="collection" display="name" v-model="selected" :focus="true">
          No matches found, <a href="#" @click.prevent="setNew">add a new unit</a>?
        </searchable>

        <div class="actions">
          <button class="primary" v-if="selected" @click="next">Next</button>
        </div>
      </div>
      <empty v-else>
        <div slot="message">This property does not have any units yet</div>
        <button slot="actions" class="primary" @click="$parent.setType('new')">Add a unit</button>
      </empty>
    </div>
    <loading v-else />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { Collection } from 'vue-collections'
import Unit from '@/models/unit'

export default {
  name: 'lease-add--unit---existing',
  data() {
    return {
      fetched: false,
      selected: null
    }
  },
  collection() {
    return new Collection({
      basePath: `units?filter_property=${this.$parent.models.property.id}`,
      model: Unit
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

<style scoped lang="scss">

</style>