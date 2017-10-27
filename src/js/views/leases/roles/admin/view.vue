<template>
  <div class="model-view">
    <header>
      <div class="meta">
        <legend>Lease</legend>
        <h2>{{ $lease.address }}</h2>
      </div>
      <div class="actions">
        <button class="link" @click="remove">Delete</button>
        <button class="primary">Edit</button>
      </div>
    </header>
    <div class="table">
      <div class="header">
        Unit Information
      </div>
      <div class="grid">
        <div class="grid__col grid__col--1-of-2">
          <dl>
            <dt>Unit Name</dt>
            <dd>
              <router-link :to="`/units/${$lease.unit._id}`">
                {{ $lease.unit.name }}
              </router-link>
            </dd>
          </dl>
        </div>
        <div class="grid__col grid__col--1-of-2">
          <dl>
            <dt>Property</dt>
            <dd>
              <router-link :to="`/properties/${$lease.property._id}`">
                {{ $lease.property.name }}
              </router-link>
            </dd>
          </dl>
        </div>
        <div class="grid__col grid__col--1-of-2">
          <dl>
            <dt>Beds</dt>
            <dd>{{ $lease.unit.bed_count }}</dd>
          </dl>
        </div>
        <div class="grid__col grid__col--1-of-2">
          <dl>
            <dt>Beds</dt>
            <dd>{{ $lease.unit.bed_count }}</dd>
          </dl>
        </div>
        <div class="grid__col grid__col--1-of-2">
          <dl>
            <dt>Square Footage</dt>
            <dd>{{ $lease.unit.square_footage }}</dd>
          </dl>
        </div>
        <div class="grid__col grid__col--1-of-2">
        </div>
      </div>
    </div>
    <tenants-table :data="$lease.tenants" />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import Lease from '@/models/lease'

import tenantsTable from '@/views/tenants/table'

export default {
  name: 'lease',
  models: {
    lease() {
      return new Lease({
        id: this.$route.params.id
      })
    }
  },
  created() {
    this.$lease.fetch()
  },
  methods: {
    remove() {
      const confirmed = confirm(`Are you sure you want to remove ${this.$lease.address}?`)
      if (confirmed) {
        this.$lease.destroy()
        .then(() => {
          this.$router.push('/leases')
        })
      }
    }
  },
  components: {
    tenantsTable
  }
}
</script>
