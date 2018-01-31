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
import { Deferred } from '@/utils'
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
    async validate() {
      const deferred = new Deferred()
      const passed = await this.$refs.property_form.validate()
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
      return this.$property.save(this.place)
        .then(response => {
          if (this.confirm) {
            this.close()
            this.confirm()
          }
        })
        .catch(error => {
          console.log({error})
        })
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

