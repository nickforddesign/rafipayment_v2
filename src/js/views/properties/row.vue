<template>
  <div class="tr" @click="goToModel">
    <div class="td">
      <a :href="`/${$property.urlRoot}`" @click.prevent>{{ $property.name }}</a>
    </div>
    <div class="td">{{ $property.address }}</div>
    <div class="td">-</div>
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
