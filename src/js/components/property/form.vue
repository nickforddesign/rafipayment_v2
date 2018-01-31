<template>
  <div>
    <div v-if="loaded" @keyup.enter="validate">
      <google-map :markers="markers" />

      <field name="address" :errors="errors">
        <div v-if="model">
          <input type="checkbox" id="new_address" name="new_address" v-model="new_address">
          <label for="new_address">New Address</label>
        </div>

        <vue-google-autocomplete
          id="map"
          v-if="show_address"
          :enable-geolocation="true"
          @placechanged="getAddressData"
          @inputChange="inputChanged"
          country="us" />
      </field>

      <field name="name">
        <input type="text" v-model="name">
      </field>

      <field name="pay-into account" :errors="errors" v-if="fetched">
        <input type="radio" id="primary" name="use_primary" :value="true" v-model="use_primary">
        <label for="primary">Primary</label>
        <input type="radio" id="other" name="use_primary" :value="false" v-model="use_primary">
        <label for="other">Use Other</label>

        <select-menu v-if="!use_primary" v-model="funding_source" v-validate="'required'" name="pay-into account" class="funding-source">
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
      <loading v-else type="input" />
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
import { load } from '@/utils'

export default {
  name: 'property-form',
  props: {
    model: Object,
    confirm: Function
  },
  data() {
    return {
      loaded: false,
      fetched: false,
      new_address: false,
      use_primary: true,
      // model data
      name: '',
      place: false,
      funding_source: null
    }
  },
  async beforeMount() {
    await load(`https://maps.googleapis.com/maps/api/js?key=${config.google_api_key}&libraries=places`, 'google')
    this.loaded = true
  },
  beforeDestroy() {
    const $pacs = document.querySelectorAll('.pac-container')
    const array = [...$pacs]
    array.map($pac => $pac.remove())
  },
  async created() {
    if (this.model) {
      this.name = this.model.name
      this.place = this.model.place_data
    }
    await this.fetch()
    if (this.model && this.model.funding_source) {
      this.use_primary = false
      this.funding_source = this.model.funding_source
    }
  },
  collection() {
    return new Collection({
      basePath: 'account/funding_sources'
    })
  },
  watch: {
    async place(val) {
      if (!isEmpty(val) && !!val) {
        this.errors.remove('address')
        await this.validate()
        this.emit()
      }
    },
    async new_address(val) {
      this.errors.remove('address')
      this.emit()
    },
    name() {
      this.emit()
    },
    use_primary(val) {
      if (val) {
        this.funding_source = null
      }
    },
    funding_source(val) {
      this.emit()
    }
  },
  methods: {
    async validate() {
      let passed = await this.$validator.validateAll()
      if ((this.model && this.new_address && !this.place) || !this.model && !this.place) {
        this.$validator.errors.add(
          'address',
          'Please select an address',
          'required'
        )
        passed = false
      }
      return passed
    },
    async fetch() {
      await this.$collection.fetch()
      this.fetched = true
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
    },
    inputChanged({ newVal }) {
      if (!newVal) {
        this.place = false
      }
    }
  },
  computed: {
    show_address() {
      return this.model
        ? this.new_address
        : true
    },
    markers() {
      return (!this.model || this.new_address) && this.place
        ? [this.place]
        : this.model
          ? [{ place_id: this.model.place_id }]
          : []
    }
  },
  components: {
    VueGoogleAutocomplete
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
.funding-source {
  margin-top: 10px;
}
#map {
  margin-top: 20px;
}
</style>

