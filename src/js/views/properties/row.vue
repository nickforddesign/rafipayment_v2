<template>
  <div class="tr" @click="goToModel">
    <cell>
      <a :href="`/${$property.urlRoot}`" @click.prevent>{{ $property.name }}</a>
    </cell>
    <cell>{{ $property.address }}</cell>
    <cell>-</cell>
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
  created() {
    this.$property = this.model
  },
  methods: {
    goToModel() {
      this.$router.push(`/${this.$property.urlRoot}`)
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
