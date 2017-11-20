<template>
  <div>
    <div v-if="fetched" class="unit-select">
      <div v-if="collection.length">
        <searchable :collection="collection" display="name" v-model="selected" :focus="true" />

        <div class="actions">
          <button v-if="selected" @click="next">Next</button>
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
  name: 'bill-add--unit',
  props: ['models'],
  data() {
    return {
      fetched: false,
      selected: null
    }
  },
  collection() {
    return new Collection({
      basePath: `units?filter_property=${this.models.property.id}`,
      model: Unit
    })
  },
  created() {
    if (this.models.unit) {
      this.models.unit = null
    }
    this.fetch()
  },
  methods: {
    async fetch() {
      await this.$collection.fetch()
      this.fetched = true
    },
    next() {
      this.models.unit = this.selected
      this.complete()
    },
    complete() {
      this.$emit('next')
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">

</style>