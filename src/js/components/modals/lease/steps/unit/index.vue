<template>
  <div>
    <h2>Which unit will be leased?</h2>

    <button @click="previous" class="back-button">Back</button>

    <div v-if="type" class="content">
      <component :is="type" />
    </div>

    <div class="grid" v-else>

      <div class="grid__col grid__col--1-of-2" v-if="!this.models.property.isNew">
        <div class="box" @click="setType('existing')">
          An existing unit
        </div>
      </div>

      <div class="grid__col grid__col--1-of-2">
        <div class="box" @click="setType('new')">
          A new unit
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
  name: 'lease-add--unit',
  props: {
    models: Object
  },
  data() {
    return {
      type: null
    }
  },
  created() {
    if (this.models.unit) {
      this.models.unit = null
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
      this.models.unit = model
      this.next()
    },
    next() {
      this.$emit('next')
    },
    previous() {
      return this.type
        ? this.cancel()
        : this.$emit('previous')
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