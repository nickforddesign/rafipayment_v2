<template>
  <modal @close="close" :confirm="validate">
    <h1 slot="header">Edit Unit</h1>
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

    </div>
  </modal>
</template>

<script>
import Unit from '@/models/unit/new'

export default {
  name: 'modal-unit--edit',
  props: {
    model: Object,
    confirm: Function
  },
  data() {
    return {
      name: this.model.name,
      bed_count: this.model.bed_count,
      bath_count: this.model.bath_count,
      square_footage: this.model.square_footage
    }
  },
  models: {
    unit() {
      return new Unit({
        id: this.model.id
      })
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
      const data = this.$data

      await this.$unit.save(data)
      if (this.confirm) {
        this.confirm()
      }
    }
  }
}
</script>
