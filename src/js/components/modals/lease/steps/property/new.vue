<template>
  <div>
    <h1 slot="header">Add Property</h1>
    <div slot="body">
      <new-property v-model="place" :errors="errors" />
      <!-- {{ place }} -->
      <!-- {{ $property }} -->
      <div class="actions">
        <button v-if="place.address" @click="complete">Next</button>
      </div>
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import Property from '@/models/property/new'
import newProperty from '@/components/property/new'

export default {
  name: 'lease-add--property---new',
  data() {
    return {
      place: {}
    }
  },
  models: {
    property() {
      return new Property(null, {
        persist: true
      })
    }
  },
  methods: {
    complete() {
      this.$property = this.place
      this.next()
    },
    next() {
      this.$parent.complete(this.$property)
    }
  },
  components: {
    newProperty
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
