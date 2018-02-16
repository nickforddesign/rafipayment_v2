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

      await this.model.save(this.$data)
      this.confirm()
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
