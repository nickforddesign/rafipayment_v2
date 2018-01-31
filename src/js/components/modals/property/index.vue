<template>
  <modal @close="close" :confirm="validate">
    <h1 slot="header">Add Property</h1>
    <div slot="body" class="modal-property--add">
      <new-property v-model="place" ref="property_form" />
    </div>
  </modal>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { Deferred } from '@/utils'
import Property from '@/models/property/new'
import newProperty from '@/components/property/form'

export default {
  name: 'modal-property--add',
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
      return new Property()
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
            this.confirm()
          }
        })
        .catch(error => {
          console.log({error})
        })
    }
  },
  components: {
    newProperty
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style lang="scss">
.modal-property--add {
  .map-container {
    width: calc(100% + 40px) !important;
    margin-left: -20px !important;
    margin-right: -20px !important;
    margin-top: -20px !important;
  }
}
</style>
