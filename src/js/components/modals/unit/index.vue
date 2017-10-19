<template>
  <modal @close="close" :confirm="validate">
    <h1 slot="header">Add Unit</h1>
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
      </form>
    </div>
  </modal>
</template>

<script>
import { Deferred } from '@/utils'
import { Collection } from 'vue-collections'
import Property from '@/models/property'
import Unit from '@/models/unit'

export default {
  name: 'modal-password',
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
  created() {
    this.$collection.fetch()
  },
  watch: {
    password() {
      const name = 'password'
      if (this.errors.has(name)) {
        this.errors.remove(name)
      }
    },
    password_confirm() {
      const name = 'password_confirm'
      if (this.errors.has(name)) {
        this.errors.remove(name)
      }
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    async validate() {
      const deferred = new Deferred()
      const passed = await this.$validator.validateAll()
      if (passed) {
        await this.confirmChange()
        deferred.resolve()
      } else {
        deferred.reject()
      }
      return deferred.promise
    },
    async confirmChange() {
      this.loading = true

      const data = this.$data
      return this.$unit.save(data)
        .then((response) => {
          this.loading = false
          if (this.confirm) {
            this.confirm()
          }
          // app.alert(
          //   'Please check the new email address for a verification link',
          //   this.confirm,
          //   'Verify Email'
          // )
        })
    }
  }
}
</script>
