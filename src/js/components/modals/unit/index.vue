<template>
  <modal @close="close" :confirm="validate">
    <h1 slot="header">Add Unit</h1>
    <div slot="body">
      <field name="name" :errors="errors">
        <input type="text" v-model="name" name="name" v-validate="'required'">
      </field>

      <field name="beds" :errors="errors">
        <number v-model="bed_count" name="beds" align="left" />
      </field>

      <field name="baths" :errors="errors">
        <number v-model="bath_count" name="baths" align="left" />
      </field>

      <field name="square footage" :errors="errors">
        <number v-model="square_footage" name="square footage" align="left" />
      </field>

      <field name="property" :errors="errors">
        <select-menu v-model="property" v-validate="'required'" name="property">
          <option disabled value="">Please select one</option>
          <option 
            v-for="(property, index) in collection"
            :value="property.id"
            :key="index"
            :label="property.address">
            {{ property.address }}
          </option>
        </select-menu>
      </field>
    </div>
  </modal>
</template>

<script>
import { Collection } from 'vue-collections'
import Property from '@/models/property'
import Unit from '@/models/unit/new'

export default {
  name: 'modal-unit--add',
  props: {
    model: Object,
    confirm: Function
  },
  data() {
    return {
      name: '',
      bed_count: '',
      bath_count: '',
      square_footage: '',
      property: ''
    }
  },
  collection() {
    return new Collection({
      basePath: 'properties',
      model: Property
    })
  },
  models: {
    unit() {
      return new Unit()
    }
  },
  async created() {
    await this.$collection.fetch()
    if (this.model) {
      this.property = this.model.id
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    validate() {
      return new Promise(async (resolve, reject) => {
        const passed = await this.$validator.validateAll()
        if (passed) {
          await this.confirmChange()
          resolve()
        } else {
          reject()
        }
      })
    },
    async confirmChange() {
      this.loading = true

      await this.$unit.save(this.$data)
      if (this.confirm) {
        this.confirm()
      }
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style lang="scss" scoped>
.number {
  width: 100%;
}
</style>
