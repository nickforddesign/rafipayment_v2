<template>
  <div>
    <div class="model-view" v-if="fetched">
      <header>
        <div class="meta">
          <legend>Property</legend>
          <h2>{{ $property.name }}</h2>
        </div>
        <div class="actions">
          <button class="link" @click="promptRemove">Delete</button>
          <button class="primary" @click="showModal">Edit</button>
        </div>
      </header>
      <div class="table-container">
        <google-map :markers="[{ place_id: $property.place_id }]" />

        <div class="header">
          Property Information
        </div>
        <div class="grid">
          <div class="grid__col grid__col--1-of-2">
            <dl>
              <dt>Address</dt>
              <dd>{{ $property.address }}</dd>
            </dl>
          </div>
          <div class="grid__col grid__col--1-of-2">
            <dl>
              <dt>Name</dt>
              <dd>{{ $property.name }}</dd>
            </dl>
          </div>
          <div class="grid__col grid__col--1-of-2">
            <dl>
              <dt>Units</dt>
              <dd>{{ unit_count }}</dd>
            </dl>
          </div>
          <div class="grid__col grid__col--1-of-2">
            <dl>
              <dt>Vacancies</dt>
              <dd>{{ vacancies }}</dd>
            </dl>
          </div>
          <div class="grid__col grid__col--1-of-2">
            <dl>
              <dt>Bank Account</dt>
              <dd v-if="banks_fetched">
                {{ funding_source }}
              </dd>
              <loading type="data" v-else />
            </dl>
          </div>
          <div class="grid__col grid__col--1-of-2" />
        </div>
      </div>

      <units-table :data="this.$property" v-if="fetched" @leases-fetched="leasesFetched" />

      <property-modal v-if="modal_visible" @close="closeModal" :confirm="confirmModal" :model="$property" />

    </div>
    <loading v-else />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import app from '@/app'
import { path } from 'ramda'
import { Collection } from 'vue-collections'
import Property from '@/models/property'

import PropertyModal from '@/components/modals/property/edit'
import UnitsTable from '@/views/units/table'

export default {
  name: 'property',
  data() {
    return {
      fetched: false,
      fetched_units: false,
      banks_fetched: false,
      leases_fetched: false,
      modal_visible: false,
      unit_count: null,
      leases: null,
      vacancies: undefined
    }
  },
  models: {
    property() {
      return new Property({
        id: this.$route.params.id
      })
    }
  },
  collection() {
    return new Collection({
      basePath: 'account/funding_sources'
    })
  },
  async created() {
    await this.fetch()
    const { count } = await this.$request(`units/count?filter_property=${this.$property.id}`)
    this.unit_count = count
    this.fetched_units = true
    await this.$request(`leases?filter_property=${this.$property.id}`)
  },
  computed: {
    funding_source() {
      const match = this.collection.find(model => {
        return model.id === this.$property.funding_source
      })
      return path(['name'], match) || 'Primary'
    }
  },
  methods: {
    fetch() {
      this.fetched = false
      this.$property.fetch()
        .then(() => {
          this.fetched = true
        })
      this.$collection.fetch()
        .then(() => {
          this.banks_fetched = true
        })
    },
    leasesFetched(units_statuses) {
      this.vacancies = units_statuses.reduce((acc, item) => !item ? acc + 1 : acc, 0)
      this.leases_fetched = true
    },
    promptRemove() {
      app.confirm(
        `Are you sure you want to remove ${this.$property.address}?`,
        this.remove,
        'Delete property'
      )
    },
    async remove() {
      await this.$property.destroy()
      this.$router.push(`/properties`)
    },
    showModal() {
      this.modal_visible = true
    },
    closeModal() {
      this.modal_visible = false
    },
    confirmModal() {
      this.fetch()
    }
  },
  components: {
    UnitsTable,
    PropertyModal
  }
}
</script>
