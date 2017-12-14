<template>
  <div>
    <h2>Which lease is the bill for?</h2>
    <div v-if="fetched" class="lease-select">
      <div v-if="collection.length">
        <searchable :collection="collection" display="label" v-model="selected" :focus="true" :model="Lease" />

        <div class="actions">
          <button v-if="selected" @click="next">Next</button>
        </div>
      </div>
      <empty v-else>
        <div slot="message">This unit does not have any leases yet</div>
      </empty>
    </div>
    <loading v-else />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { Collection } from 'vue-collections'
import Lease from '@/models/lease'

export default {
  name: 'bill-add--lease',
  props: ['models'],
  data() {
    return {
      fetched: false,
      selected: null
    }
  },
  collection() {
    return new Collection({
      basePath: `leases?filter_unit=${this.models.unit.id}`,
      model: Lease
    })
  },
  created() {
    if (this.models.lease) {
      this.models.lease = null
    }
    this.fetch()
  },
  computed: {
    Lease() {
      return Lease
    }
  },
  methods: {
    async fetch() {
      await this.$collection.fetch()
      this.fetched = true
    },
    next() {
      this.models.lease = this.selected
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