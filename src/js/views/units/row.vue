<template>
  <div class="tr" @click="goToModel">
    <cell>
      <a :href="`/${$unit.urlRoot}`" @click.prevent>{{ $unit.name }}</a>
    </cell>
    <cell>{{ $unit.property_name }}</cell>
    <cell>{{ $unit.bed_count }}</cell>
    <cell>{{ $unit.bath_count }}</cell>
    <cell>
      <span v-if="leases_fetched">{{ active_lease_ids.join(', ') }}</span>
      <loading v-else type="data" />
    </cell>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { Collection } from 'vue-collections'
import Unit from '@/models/unit'
import Lease from '@/models/lease'

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
      active_leases: [],
      leases_fetched: false
    }
  },
  async created() {
    this.$unit = this.model
    await this.$collection.fetch()
    this.active_leases = this.getActiveLeases()
    this.leases_fetched = true
  },
  computed: {
    has_active_lease() {
      if (this.collection.length) {
        return 'true'
      }
    },
    active_lease_ids() {
      return this.active_leases.map(lease => `#${lease.display_id}`)
    }
  },
  methods: {
    goToModel() {
      this.$router.push(`/${this.$unit.urlRoot}`)
    },
    getActiveLeases() {
      return this.collection.filter(lease => {
        console.log({lease})
        // const is_current = this.
        const model = new Lease(lease)
        if (model.is_active) {
          return lease
        }
      })
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
