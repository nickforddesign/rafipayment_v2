<template>
  <div>
    <div class="model-view" v-if="fetched">
      <header>
        <div class="meta">
          <legend>Unit</legend>
          <h2>{{ $unit.address }}</h2>
        </div>
        <div class="actions">
          <button class="link" @click="promptRemove">Delete</button>
          <button class="primary" @click="showModal('unit')">Edit</button>
        </div>
      </header>
      <div class="table-container">
        <div class="header">
          Unit Information
        </div>
        <div class="grid">
          <div class="grid__col grid__col--1-of-2">
            <dl>
              <dt>Unit Name</dt>
              <dd>{{ $unit.name }}</dd>
            </dl>
          </div>
          <div class="grid__col grid__col--1-of-2">
            <dl>
              <dt>Property</dt>
              <dd>
                <router-link :to="`/properties/${$unit.property.id}`">
                  {{ $unit.property_name }}
                </router-link>
              </dd>
            </dl>
          </div>
          <div class="grid__col grid__col--1-of-2">
            <dl>
              <dt>Beds</dt>
              <dd>{{ $unit.bed_count }}</dd>
            </dl>
          </div>
          <div class="grid__col grid__col--1-of-2">
            <dl>
              <dt>Baths</dt>
              <dd>{{ $unit.bath_count }}</dd>
            </dl>
          </div>
          <div class="grid__col grid__col--1-of-2">
            <dl>
              <dt>Square Footage</dt>
              <dd>{{ $unit.square_footage }}</dd>
            </dl>
          </div>
          <div class="grid__col grid__col--1-of-2">
          </div>
        </div>
      </div>
      <leases-table :data="$unit" :path="`leases?filter_unit=${$unit.id}`" @add="showModal('lease')" ref="leases_table" />

      <lease-modal v-if="modals.lease" @close="closeModal('lease')" :confirm="confirmModal" :property="$property" :unit="$unit" />
      <unit-modal v-if="modals.unit" @close="closeModal('unit')" :confirm="confirmModal" :model="$unit.$data" />
    </div>
    <loading v-else />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import app from '@/app'
import Unit from '@/models/unit'
import Property from '@/models/property'

import UnitModal from '@/components/modals/unit/edit'
import LeaseModal from '@/components/modals/lease'
import LeasesTable from '@/views/leases/table'

export default {
  name: 'unit',
  models: {
    unit() {
      return new Unit({
        id: this.$route.params.id
      })
    },
    property() {
      return new Property()
    }
  },
  data() {
    return {
      fetched: false,
      modals: {
        lease: false,
        unit: false
      }
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      await this.$unit.fetch()
      this.$property = this.$unit.property
      this.fetched = true
    },
    promptRemove() {
      app.confirm(
        `Are you sure you want to remove ${this.$unit.address}?`,
        this.remove,
        'Delete unit'
      )
    },
    async remove() {
      await this.$unit.destroy()
      this.$router.push(`/properties/${this.$property.id}`)
    },
    showModal(modal) {
      this.modals[modal] = true
    },
    closeModal(modal) {
      this.modals[modal] = false
    },
    async confirmModal() {
      await this.fetch()
      this.$refs.leases_table.fetch()
    }
  },
  components: {
    LeaseModal,
    LeasesTable,
    UnitModal
  }
}
</script>
