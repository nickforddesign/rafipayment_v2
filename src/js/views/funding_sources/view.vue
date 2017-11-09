<template>
  <div class="model-view">
    <header>
      <div class="meta">
        <legend>Funding Source</legend>
        <h2>{{ $funding_source.name }}</h2>
      </div>
      <div class="actions">
        <button class="link" @click="remove">Delete</button>
        <button class="primary" @click="showModal">Edit</button>
      </div>
    </header>
    <div class="table">
      <div class="header">
        Funding Source Information
      </div>
      <div class="grid">
        <div class="grid__col grid__col--1-of-2">
          <dl>
            <dt>Name</dt>
            <dd>{{ $funding_source.name }}</dd>
          </dl>
        </div>
        <div class="grid__col grid__col--1-of-2">
          <dl>
            <dt>Bank Name</dt>
            <dd>{{ $funding_source.bankName }}</dd>
          </dl>
        </div>
        <div class="grid__col grid__col--1-of-2">
          <dl>
            <dt>Created</dt>
            <dd>{{ $funding_source.created | moment }}</dd>
          </dl>
        </div>
        <div class="grid__col grid__col--1-of-2">
          <dl>
            <dt>Status</dt>
            <dd>{{ $funding_source.status }}</dd>
          </dl>
        </div>
      </div>
      <div v-if="$funding_source.microdeposits">
        <pre>{{ $funding_source.microdeposits_data }}</pre>
      </div>
    </div>
    <funding-source-modal v-if="modal_visible" @close="closeModal" :model="$funding_source" />
    <!-- <leases-table :data="$unit" :path="`leases?filter_unit=${$unit.id}`" /> -->
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import FundingSource from '@/models/funding_source'

import fundingSourceModal from '@/components/modals/funding_source/name'

// import leasesTable from '@/views/leases/table'

export default {
  name: 'funding-source',
  data() {
    return {
      modal_visible: false
    }
  },
  models: {
    funding_source() {
      return new FundingSource({
        id: this.$route.params.id
      })
    }
  },
  created() {
    this.$funding_source.fetch()
  },
  methods: {
    showModal() {
      this.modal_visible = true
    },
    closeModal() {
      this.modal_visible = false
    },
    remove() {
      const confirmed = confirm(`Are you sure you want to remove ${this.$funding_source.name}?`)
      if (confirmed) {
        this.$funding_source.destroy()
        .then(() => {
          this.$router.push('/account')
        })
      }
    }
  },
  components: {
    fundingSourceModal
  }
}
</script>
