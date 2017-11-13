<template>
  <div>
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
    </div>
    <loading v-else />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { isEmpty, mergeDeepRight } from 'ramda'
import { Collection } from 'vue-collections'
import VueGoogleAutocomplete from 'vue-google-autocomplete'

import config from '@/config'
import { Deferred, load } from '@/utils'

let places_loaded = false

export default {
  name: 'new-property',
  props: {
    model: Object,
    confirm: Function,
    errors: [Object]
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
  beforeCreate() {
    // HACK: vee-validate creates an instance of itself on all nested components
    // so this.errors is conflicting between the prop and the computed property
    // if (this.errors) {
    delete this.$options.computed.errors
    // }
  },
  async beforeMount() {
    if (!places_loaded) {
      await load(`https://maps.googleapis.com/maps/api/js?key=${config.google_api_key}&libraries=places`)
      places_loaded = true
    }
    this.loaded = true
  },
  created() {
    this.$collection.fetch()
  },
  collection() {
    return new Collection({
      basePath: 'account/funding_sources'
    })
  },
  watch: {
    async place(val) {
      if (!isEmpty(val)) {
        this.errors.remove('address')
        await this.validate()
        this.emit()
      }
    },
    name() {
      this.emit()
    },
    use_primary(val) {
      if (val) {
        this.funding_source = null
      }
    },
    funding_source() {
      this.emit()
    }
  },
  methods: {
    async validate() {
      const deferred = new Deferred()
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
        deferred.resolve()
      } else {
        deferred.reject()
      }
      return deferred.promise
    },
    getAddressData(address_data, place_data) {
      const data = {
        address: place_data.name,
        number: address_data.street_number || '',
        street: address_data.route,
        city: address_data.locality,
        state: address_data.administrative_area_level_1,
        country: address_data.country,
        postal_code: address_data.postal_code || '',
        place_id: place_data.place_id
      }
      this.place = data
    },
    emit() {
      const data = mergeDeepRight(this.place, { name: this.name || this.place.address })

      if (this.funding_source) {
        data['funding_source'] = this.funding_source
      }
      this.$emit('input', data)
    }
  },
  components: {
    VueGoogleAutocomplete
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
