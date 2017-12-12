<template>
  <div>
    <h1 slot="header">Add Property</h1>
    <div slot="body">
      <new-property v-model="place" ref="property_form" />
      <div class="actions">
        <button v-if="place.address" @click="validate">Next</button>
      </div>
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import app from '@/app'
import Property from '@/models/property/new'
import newProperty from '@/components/property/form'

export default {
  name: 'lease-add--property---new',
  data() {
    return {
      place: {}
    }
  },
  models: {
    property() {
      return new Property(null, {
        persist: true
      })
    }
  },
  methods: {
    async validate() {
      const passed = await this.$refs.property_form.validate()
      if (passed) {
        this.$property.save(this.place, {
          query: {
            action_save: false
          }
        })
        .then(() => {
          this.complete()
        })
        .catch(() => {
          app.alert(
            'Could not save',
            null,
            'Validation Failed'
          )
        })
      }
    },
    complete() {
      this.$property = this.place
      this.next()
    },
    next() {
      this.$parent.complete(this.$property)
    }
  },
  components: {
    newProperty
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
