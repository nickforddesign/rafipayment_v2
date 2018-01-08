<template>
  <div>
    <div class="model-view" v-if="fetched">
      <header>
        <div class="meta">
          <legend>Funding Source</legend>
          <h2>{{ $funding_source.name }}</h2>
        </div>
        <div class="actions">
          <button class="link" @click="promptRemove">Delete</button>
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
              <dd>
                <span :class="['text-color', status_class]">
                  {{ $funding_source.status }}
                </span>
              </dd>
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
    <loading v-else />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import app from '@/app'
import FundingSource from '@/models/funding_source'
import NameModal from '@/components/modals/funding_source/name'
import MicrodepositsModal from '@/components/modals/funding_source/microdeposits'

export default {
  name: 'funding-source',
  data() {
    return {
      fetched: false,
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
  async created() {
    await this.$funding_source.fetch()
    this.fetched = true
  },
  computed: {
    status_class() {
      const map = {
        verified: 'success',
        unverified: 'warning'
      }
      return map[this.$funding_source.status]
    }
  },
  methods: {
    showModal(modal) {
      this.modals[modal] = true
    },
    closeModal(modal) {
      this.modals[modal] = false
    },
    promptRemove() {
      app.confirm(
        `Are you sure you want to remove ${this.$funding_source.name}?`,
        this.remove,
        'Delete bank account'
      )
    },
    async remove() {
      await this.$funding_source.destroy()
      this.$router.push(`/leases`)
    }
  },
  components: {
    NameModal,
    MicrodepositsModal
  }
}
</script>
