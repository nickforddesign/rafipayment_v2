<template>
  <div>
    <div slot="body">

      <field name="name" :errors="errors">
        <input type="text" v-model="name" name="name" v-validate="'required'">
      </field>

      <field name="beds" :errors="errors">
        <input type="text" v-model="bed_count" name="beds">
      </field>

      <field name="baths" :errors="errors">
        <input type="text" v-model="bath_count" name="baths">
      </field>

      <field name="square footage" :errors="errors">
        <input type="text" v-model="square_footage" name="square footage">
      </field>

      <div class="actions">
        <button v-if="name" @click="validate">Next</button>
      </div>
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import Unit from '@/models/unit/new'

export default {
  name: 'lease-add--unit---new',
  data() {
    return {
      name: null,
      bed_count: null,
      bath_count: null,
      square_footage: null
    }
  },
  models: {
    unit() {
      return new Unit(null, {
        persist: true
      })
    }
  },
  methods: {
    async validate() {
      const passed = await this.$validator.validateAll()
      if (passed) {
        this.complete()
      }
    },
    complete() {
      this.$unit = this.$data
      this.next()
    },
    next() {
      this.$parent.complete(this.$unit)
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
