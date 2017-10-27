<template>
  <div class="model-view">
    <div v-if="fetched">
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
          Basic Information
        </div>
        <div class="grid">
          <div class="grid__col grid__col--1-of-2">
            <dl>
              <dt>Start Date</dt>
              <dd>{{ $lease.start_date | moment('M/DD/YYYY', true) }}</dd>
            </dl>
          </div>
          <div class="grid__col grid__col--1-of-2">
            <dl>
              <dt>End Date</dt>
              <dd>{{ $lease.end_date | moment('M/DD/YYYY', true) }}</dd>
            </dl>
          </div>
          <div class="grid__col grid__col--1-of-2">
            <dl>
              <dt>Duration</dt>
              <dd>{{ $lease.length.auto }}</dd>
            </dl>
          </div>
        </div>
      </div>

      <!-- <div class="table" v-if="$lease.periods.length < 1"> -->
      <div class="table">
        <div class="header">
          Billing Periods
        </div>
        <table>
          <thead>
            <tr>
              <td>Start Date</td>
              <td>End Date</td>
              <td>Amount</td>
              <td>Your Split</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            <split-row v-for="(period, index) in $lease.periods" :lease="$lease" :period="period" :key="index" />
          </tbody>
        </table>
      </div>

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
      <!-- <pre>{{ $lease }}</pre> -->
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import Lease from '@/models/lease'
import tenantsTable from '@/views/tenants/table'
import splitRow from './split_row'

export default {
  name: 'lease',
  data() {
    return {
      fetched: false
    }
  },
  models: {
    lease() {
      return new Lease({
        id: this.$route.params.id
      }, {
        basePath: 'account/leases'
      })
    }
  },
  async created() {
    await this.fetch()
    this.fetched = true
  },
  methods: {
    async fetch() {
      return this.$lease.fetch()
    },
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
    tenantsTable,
    splitRow
  }
}
</script>