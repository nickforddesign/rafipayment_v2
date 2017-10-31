<template>
  <modal @close="close" :confirm="validate">
    <h1 slot="header">Add Property</h1>
    <div slot="body">
      <new-property v-model="place" :errors="errors" />
    </div>
  </modal>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { Deferred } from '@/utils'
import Property from '@/models/property'
import newProperty from '@/components/property/new'

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
      let passed = true
      if (!this.place.address) {
        this.$validator.errors.add(
          'address',
          'Please select an address',
          'required'
        )
        passed = false
      }
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
          // this.loading = true
          // app.alert(
          //   'Please check the new email address for a verification link',
          //   this.confirm,
          //   'Verify Email'
          // )
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
