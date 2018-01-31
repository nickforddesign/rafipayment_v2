<template>
  <modal @close="close" :confirm="validate">
    <h1 slot="header">Edit Name</h1>
    <div slot="body">

      <field name="first name" :errors="errors">
        <input type="text" v-model="first_name" v-validate="'required'" name="first name" ref="default">
      </field>

      <field name="last name" :errors="errors">
        <input type="text" v-model="last_name" v-validate="'required'" name="last name">
      </field>

    </div>
  </modal>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { Deferred } from '@/utils'

export default {
  name: 'modal-user--name',
  props: {
    model: Object,
    confirm: Function
  },
  data() {
    return {
      first_name: this.model.first_name,
      last_name: this.model.last_name
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    async validate() {
      const deferred = new Deferred()
      let passed = await this.$validator.validateAll()
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
      const request = this.model.save(data)
      request.then(response => {
        this.confirm()
      })
      .catch(error => {
        console.log({error})
      })
      return request
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
