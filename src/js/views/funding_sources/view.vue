<template>
  <div class="model-view">
    <header>
      <div class="meta">
        <legend>Funding Source</legend>
        <h2>{{ $funding_source.name }}</h2>
      </div>
      <div class="actions">
        <button class="link" @click="remove">Delete</button>
        <button class="primary" @click="showModal('name')">Edit</button>
      </div>
    </header>
    <div class="table-container">
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
    </div>
    <div v-if="$funding_source.microdeposits" class="table-container">
      <div class="header">
        Microdeposits
      </div>
      <div v-if="$funding_source.microdeposits_data.status === 'processed'">
        <button @click="showModal('microdeposits')">Confirm Microdeposits</button>
        <microdeposits-modal v-if="modals.microdeposits" @close="closeModal('microdeposits')" :model="$funding_source" />
      </div>
      <div v-else-if="$funding_source.microdeposits_data.status === 'pending'">
        Microdeposits are pending
      </div>
      <div v-else-if="$funding_source.microdeposits_data.status === 'failed'">
        Microdeposits have failed
      </div>
      <div v-else-if="$funding_source.microdeposits_data.status === 'cancelled'">
        Microdeposits were cancelled
      </div>
      <div v-else-if="$funding_source.microdeposits_data.status === 'reclaimed'">
        Microdeposits were reclaimed
      </div>
    </div>
    <name-modal v-if="modals.name" @close="closeModal('name')" :model="$funding_source" />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import FundingSource from '@/models/funding_source'
import nameModal from '@/components/modals/funding_source/name'
import microdepositsModal from '@/components/modals/funding_source/microdeposits'

export default {
  name: 'funding-source',
  data() {
    return {
      modals: {
        name: false,
        microdeposits: false
      }
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
    showModal(modal) {
      this.modals[modal] = true
    },
    closeModal(modal) {
      this.modals[modal] = false
    },
    async remove() {
      const confirmed = confirm(`Are you sure you want to remove ${this.$funding_source.name}?`)
      if (confirmed) {
        await this.$funding_source.destroy()
        this.$router.push('/account')
      }
    }
  },
  components: {
    nameModal,
    microdepositsModal
  }
}
</script>