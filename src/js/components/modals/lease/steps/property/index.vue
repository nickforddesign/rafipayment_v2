<template>
  <div>
    <h2>Where is the unit that will be leased?</h2>

    <div v-if="type" class="content">
      <button @click="previous" class="back-button small">Back</button>
      <component :is="type" />
    </div>

    <div class="grid" v-else>

      <div class="grid__col grid__col--1-of-2">
        <div class="box" @click="setType('existing')">
          An existing property
        </div>
      </div>

      <div class="grid__col grid__col--1-of-2">
        <div class="box"  @click="setType('new')">
          A new property
        </div>
      </div>

    </div>
    
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import Existing from './existing'
import New from './new'

export default {
  name: 'lease-add--property',
  props: {
    models: Object
  },
  data() {
    return {
      type: null
    }
  },
  created() {
    if (this.models.property) {
      // console.log('have property', this.models.property)
      // this.type = 'existing'
      this.models.property = null
    }
  },
  methods: {
    cancel() {
      this.type = null
    },
    setType(type) {
      this.type = type
    },
    complete(model) {
      this.models.property = model
      this.next()
    },
    next() {
      this.$emit('next')
    },
    previous() {
      this.cancel()
    }
  },
  components: {
    Existing,
    New
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
.box {
  &:hover {
    cursor: pointer;
  }
}
</style>