<template>
  <div class="tr" @click.exact="goToModel" @click.ctrl="goToModelNew" @click.meta="goToModelNew">
    <cell>
      <router-link :to="`/${$unit.urlRoot}`">{{ $unit.name }}</router-link>
    </cell>
    <cell>{{ $unit.property_name }}</cell>
    <cell>{{ $unit.bed_count }}</cell>
    <cell>{{ $unit.bath_count }}</cell>
    <cell>
      <div v-if="leases_fetched" class="leases">
        <lease-link v-for="(lease, index) in active_leases" :key="index" :data="lease" />
      </div>
      <loading v-else type="data" />
    </cell>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { Collection } from 'vue-collections'
import Unit from '@/models/unit'
import Lease from '@/models/lease'
import LeaseLink from '@/views/leases/link'
import { smartClick } from '@/utils'

export default {
  name: 'row',
  props: ['model'],
  models: {
    unit() {
      return new Unit()
    }
  },
  collection() {
    return new Collection({
      basePath: `/leases?filter_unit=${this.model.id}`,
      model: Lease
    })
  },
  data() {
    return {
      leases_fetched: false
    }
  },
  async created() {
    this.$unit = this.model
    this.fetchLeases()
  },
  computed: {
    has_active_lease() {
      if (this.collection.length) {
        return 'true'
      }
    },
    active_leases() {
      return this.collection.filter(lease => {
        const model = new Lease(lease)
        if (model.is_active) {
          return lease
        }
      })
    }
  },
  methods: {
    goToModel(e) {
      smartClick(e, () => this.$router.push(`/${this.$unit.urlRoot}`))
    },
    goToModelNew(e) {
      smartClick(e, () => window.open(`/${this.$unit.urlRoot}`))
    },
    async fetchLeases() {
      await this.$collection.fetch()
      this.leases_fetched = true
      this.$emit('leases-fetched', !!this.active_leases.length)
    }
  },
  components: {
    LeaseLink
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
.leases {
  a:not(:last-child) {
    &:after {
      display: inline;
      content: ', ';
    }
  }
}
</style>
