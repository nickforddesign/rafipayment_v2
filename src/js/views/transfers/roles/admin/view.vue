<template>
  <div class="model-view">

    <div v-if="fetched">

      <header>
        <div class="meta">
          <legend>Transfer</legend>
          <h2>{{ $transfer.amount | currency }}</h2>
        </div>
        <div class="actions">
          <button class="danger" @click="cancel" v-if="$transfer.cancellable">Cancel</button>
        </div>
      </header>

      <div class="table">
        <div class="header">
          Transfer Information
        </div>
        <div class="grid">
          <div class="grid__col grid__col--1-of-2">
            <dl>
              <dt>Amount</dt>
              <dd>{{ $transfer.amount | currency }}</dd>
            </dl>
          </div>
          <div class="grid__col grid__col--1-of-2">
            <dl>
              <dt>Created</dt>
              <dd>{{ $transfer.created | moment('MM/DD/YYYY h:mm:ssa') }}</dd>
            </dl>
          </div>
          <div class="grid__col grid__col--1-of-2">
            <dl>
              <dt>Scheduled</dt>
              <dd>{{ $transfer.scheduled_date || '–' }}</dd>
            </dl>
          </div>
          <div class="grid__col grid__col--1-of-2">
            <dl>
              <dt>Type</dt>
              <dd>{{ $transfer.type }}</dd>
            </dl>
          </div>
          <div class="grid__col grid__col--1-of-2">
            <dl>
              <dt>Lease</dt>
              <dd>{{ $transfer.address }}</dd>
            </dl>
          </div>

          <div class="grid__col grid__col--1-of-2">
            <dl>
              <dt>Bill</dt>
              <dd>{{ $transfer.bill }}</dd>
            </dl>
          </div>

          <div class="grid__col grid__col--1-of-2">
            <dl>
              <dt>Source</dt>
              <dd>{{ $transfer.source_name }}</dd>
            </dl>
          </div>
          <div class="grid__col grid__col--1-of-2">
            <dl>
              <dt>Destination</dt>
              <dd>{{ $transfer.destination_name }}</dd>
            </dl>
          </div>
        </div>
      </div>

      <div class="table">
        <div class="header">
          Status
        </div>
        <div class="grid">
          <div class="grid__col grid__col--1-of-2">
            <dl>
              <dt>Transfer Status</dt>
              <dd>{{ $transfer.status }}</dd>
            </dl>
          </div>
          <div class="grid__col grid__col--1-of-2">
            <dl>
              <dt>Bank Transfer Status</dt>
              <dd>{{ $transfer.bank_transfer_status }}</dd>
            </dl>
          </div>
        </div>
        <div>
          {{ $transfer.created_response }}
        </div>
      </div>
    </div>
    <loading v-else />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import Transfer from '@/models/transfer'

export default {
  name: 'transfer',
  data() {
    return {
      fetched: false
    }
  },
  models: {
    transfer() {
      return new Transfer({
        id: this.$route.params.id
      })
    }
  },
  async created() {
    await this.$transfer.fetch()
    this.checkIfCancellable()
    this.fetched = true
  },
  methods: {
    checkIfCancellable() {
      this.$transfer.fetchCancel()
    },
    async cancel() {
      const confirmed = confirm(`Are you sure you want to cancel this transfer?`)
      if (confirmed) {
        await this.$transfer.cancel()
        this.$router.push('/transfers')
      }
    }
  }
}
</script>
