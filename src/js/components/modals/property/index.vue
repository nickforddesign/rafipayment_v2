<template>
  <modal @close="close" :confirm="validate">
    <h1 slot="header">Add Property</h1>
    <div slot="body">
      <div v-if="loaded">
        <field name="address" :errors="errors">
          <vue-google-autocomplete
            id="map"
            ref="default"
            placeholder="Start typing"
            v-on:placechanged="getAddressData"
            country="us"
          />
        </field>

        <field name="name">
          <input type="text" v-model="name">
        </field>

        <field name="pay-into account" :errors="errors">
          <input type="radio" id="primary" name="use_primary" :value="true" v-model="use_primary">
          <label for="primary">Primary</label>
          <input type="radio" id="other" name="use_primary" :value="false" v-model="use_primary">
          <label for="other">Use Other</label>

          <select-menu v-if="!use_primary" v-model="funding_source" v-validate="'required'" name="pay-into account">
            <option disabled value="">Please select one</option>
            <option 
              v-for="(funding_source, index) in collection"
              :value="funding_source.id"
              :key="index"
              :label="funding_source.address">
              {{ funding_source.name }}
            </option>
          </select-menu>
        </field>
        {{ funding_source }}
      </div>
    </div>
  </modal>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { isEmpty, mergeDeepRight } from 'ramda'
import { Collection } from 'vue-collections'
import VueGoogleAutocomplete from 'vue-google-autocomplete'

import config from '@/config'
import { Deferred, load } from '@/utils'
import Property from '@/models/property'

let places_loaded = false

export default {
  name: 'modal-property-add',
  props: {
    model: Object,
    confirm: Function
  },
  data() {
    return {
      loaded: false,
      use_primary: true,
      // model data
      name: '',
      place: false,
      funding_source: null
    }
  },
  async beforeMount() {
    if (!places_loaded) {
      await load(`https://maps.googleapis.com/maps/api/js?key=${config.google_api_key}&libraries=places`)
      places_loaded = true
      this.loaded = true
    } else {
      this.loaded = true
    }
  },
  created() {
    this.$collection.fetch()
  },
  collection() {
    return new Collection({
      basePath: 'account/payment/funding_sources'
    })
  },
  models: {
    property() {
      return new Property()
    }
  },
  watch: {
    place(val) {
      if (!isEmpty(val)) {
        this.errors.remove('address')
      }
    },
    use_primary(val) {
      if (val) {
        this.funding_source = null
      }
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    async validate() {
      const deferred = new Deferred()
      // let passed = await this.$validator.validateAll()
      let passed = true
      if (!this.place) {
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

      const data = mergeDeepRight(this.place, { name: this.name })

      if (this.funding_source) {
        data['funding_source'] = this.funding_source
      }

      return this.$property.save(data)
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
    },
    getAddressData(address_data, place_data) {
      const data = {
        address: place_data.name,
        city: address_data.locality,
        state: address_data.administrative_area_level_1,
        country: address_data.country,
        postal_code: address_data.postal_code || '',
        place_id: place_data.place_id
      }
      this.place = data
    }
  },
  components: {
    VueGoogleAutocomplete
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
  
</style>