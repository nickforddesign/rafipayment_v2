<template>
  <div class="model-view">
    <header>
      <div class="meta">
        <legend>Unit</legend>
        <h2>{{ $unit.address }}</h2>
      </div>
      <div class="actions">
        <button class="link" @click="remove">Delete</button>
        <button class="primary">Edit</button>
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
            <dt>Beds</dt>
            <dd>{{ $unit.bed_count }}</dd>
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
    <leases-table :data="$unit" :path="`leases?filter_unit=${$unit.id}`" @add="showModal" />

    <lease-modal v-if="modal_visible" @close="closeModal" :confirm="confirmModal" :property="$property" :unit="$unit" />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import Unit from '@/models/unit'
import Property from '@/models/property'

import leaseModal from '@/components/modals/lease'
import leasesTable from '@/views/leases/table'

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
      modal_visible: false
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      await this.$unit.fetch()
      this.$property = this.$unit.property
    },
    async remove() {
      const confirmed = confirm(`Are you sure you want to remove ${this.$unit.address}?`)
      if (confirmed) {
        await this.$unit.destroy()
        this.$router.push('/units')
      }
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
    leaseModal,
    leasesTable
  }
}
</script>
