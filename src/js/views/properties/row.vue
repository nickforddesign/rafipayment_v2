<template>
  <div class="tr" @click="goToModel">
    <cell>
      <a :href="`/${$property.urlRoot}`" @click.prevent>{{ $property.name }}</a>
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
    // console.log(count)
  },
  methods: {
    goToModel() {
      this.$router.push(`/${this.$property.urlRoot}`)
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
