<template>
  <modal @close="close" :confirm="validate">
    <h1 slot="header">Add Property</h1>
    <div slot="body" class="modal-property--add">
      <new-property v-model="place" />
    </div>
  </modal>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
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
