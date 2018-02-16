<template>
  <modal @close="close" :confirm="validate">
    <h1 slot="header">Edit Property</h1>
    <div slot="body" class="modal-property--edit">
      <property-form v-model="place" :model="model" ref="property_form" />
    </div>
  </modal>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import Property from '@/models/property'
import PropertyForm from '@/components/property/form'

export default {
  name: 'modal-property--edit',
  props: {
    model: Object,
    confirm: Function
  },
  data() {
    return {
      place: {}
    }
  },
  models: {
    property() {
      return new Property(this.model.$data)
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
      await this.$property.save(this.place)
      this.close()
      this.confirm()
    }
  },
  components: {
    PropertyForm
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style lang="scss">
.modal-property--edit {
  .map-container {
    width: calc(100% + 40px) !important;
    margin-left: -20px !important;
    margin-right: -20px !important;
    margin-top: -20px !important;
  }
}
</style>

