<template>
  <div class="tr" @click.exact="goToModel" @click.ctrl="goToModel" @click.meta="goToModelNew">
    <cell>
      <router-link :to="`/${$property.urlRoot}`">
        {{ $property.name }}
      </router-link>
    </cell>
    <cell>{{ $property.address }}</cell>
    <cell>
      <span v-if="count_fetched">{{ count }}</span>
      <loading v-else type="data" />
    </cell>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import Property from '@/models/property'
import { smartClick } from '@/utils'

export default {
  name: 'row',
  props: ['model'],
  models: {
    property() {
      return new Property()
    }
  },
  data() {
    return {
      count: null,
      count_fetched: false
    }
  },
  async created() {
    this.$property = this.model
    const { count } = await this.$request(`units/count?filter_property=${this.$property.id}`)
    this.count = count
    this.count_fetched = true
  },
  methods: {
    goToModel(e) {
      smartClick(e, () => this.$router.push(`/${this.$property.urlRoot}`))
    },
    goToModelNew(e) {
      smartClick(e, () => window.open(`/${this.$property.urlRoot}`))
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
