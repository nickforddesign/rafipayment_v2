<template>
  <modal @close="close" :confirm="validate">
    <h1 slot="header">Change Name</h1>
    <div slot="body">
      <form @submit.prevent="validate">
        <field name="name" :errors="errors">
          <input type="text" v-model="name" name="name" v-validate="'required'">
        </field>
      </form>
    </div>
  </modal>
</template>

<script>
import { Deferred } from '@/utils'

export default {
  name: 'modal-password',
  props: {
    model: Object,
    confirm: Function
  },
  data() {
    return {
      name: ''
    }
  },
  created() {
    this.name = this.model.name
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

      const data = {
        name: this.name
      }
      return this.model.save(data)
        .then((response) => {
          this.loading = true
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
