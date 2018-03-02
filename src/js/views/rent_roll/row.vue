<template>
  <div class="tr" @click.exact="goToModel" @click.ctrl="goToModel" @click.meta="goToModelNew">
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
    <cell class="text-right">
      {{ total_rent | currency }}
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
    await this.$collection.fetch()
    this.leases_fetched = true
  },
  computed: {
    has_active_lease() {
      if (this.collection.length) {
        return 'true'
      }
    },
    active_leases() {
      const array = []
      this.collection.map(lease => {
        const model = new Lease(lease)
        if (model.is_active) {
          array.push(model)
        }
      })
      return array
    },
    total_rent() {
      return this.active_leases.reduce((acc, lease) => {
        return acc + lease.periods[lease.current_period].amount
      }, 0)
    }
  },
  methods: {
    goToModel(e) {
      smartClick(e, () => this.$router.push(`/${this.$unit.urlRoot}`))
    },
    goToModelNew(e) {
      smartClick(e, () => window.open(`/${this.$unit.urlRoot}`))
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
