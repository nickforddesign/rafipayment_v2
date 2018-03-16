<template>
  <div class="model-view">

    <div v-if="fetched">

      <header>
        <div class="meta">
          <legend>Transfer</legend>
          <h2>{{ $transfer.amount | currency }}</h2>
        </div>
        <div class="actions">
          <div v-if="$transfer.type !== 'non_electronic'">
            <div v-if="fetched_cancel">
              <button class="danger" @click="cancel" v-if="$transfer.cancellable">Cancel</button>
            </div>
            <loading v-else type="input" />
          </div>
        </div>
      </header>

      <div class="table-container">
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
              <dd>{{ $transfer.created | moment('M/D/YY h:mma') }}</dd>
            </dl>
          </div>
          <div class="grid__col grid__col--1-of-2" v-if="$transfer.scheduled_date">
            <dl>
              <dt>Scheduled</dt>
              <dd>{{ $transfer.scheduled_date | moment('M/D/YY h:mma') }}</dd>
            </dl>
          </div>
          <div class="grid__col grid__col--1-of-2">
            <dl>
              <dt>Type</dt>
              <dd>{{ $transfer.type | replace('_', '-') }}</dd>
            </dl>
          </div>
          <div class="grid__col grid__col--1-of-2">
            <dl>
              <dt>Lease</dt>
              <dd>
                <router-link :to="`/leases/${this.$transfer.lease}`">
                  {{ this.$transfer.address }}
                </router-link>
              </dd>
            </dl>
          </div>

          <div class="grid__col grid__col--1-of-2">
            <dl>
              <dt>Bill</dt>
              <dd>
                <div v-if="bill_fetched">
                  <router-link :to="`/bills/${this.$transfer.bill}`">
                    #{{ $bill.display_id }}
                  </router-link>
                </div>
                <loading type="data" v-else />
              </dd>
            </dl>
          </div>

          <div class="grid__col grid__col--1-of-2">
            <dl>
              <dt>Source</dt>
              <dd>
                <router-link :to="`/${$transfer.source.model}s/${$transfer.source.id}`">
                  {{ $transfer.source_name }}
                </router-link>
              </dd>
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

      <div class="table-container">
        <div class="header">
          Status
        </div>
        <div class="grid">
          <div class="grid__col grid__col--1-of-2">
            <dl>
              <dt>Transfer Status</dt>
              <dd :class="['text-color', $transfer.statusClass($transfer.source_status)]">{{ $transfer.source_status }}</dd>
            </dl>
          </div>
          <div class="grid__col grid__col--1-of-2">
            <dl>
              <dt>Bank Transfer Status</dt>
              <dd :class="['text-color', $transfer.statusClass($transfer.destination_status)]">{{ $transfer.destination_status }}</dd>
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
import Bill from '@/models/bill'

export default {
  name: 'transfer',
  data() {
    return {
      fetched: false,
      fetched_cancel: false,
      bill_fetched: false
    }
  },
  models: {
    transfer() {
      return new Transfer({
        id: this.$route.params.id
      })
    },
    bill() {
      return new Bill()
    }
  },
  async created() {
    await this.$transfer.fetch()
    if (this.$transfer.type !== 'non_electronic') {
      this.checkIfCancellable()
    }
    this.fetchBill()
    this.fetched = true
  },
  methods: {
    async checkIfCancellable() {
      await this.$transfer.fetchCancel()
      this.fetched_cancel = true
    },
    async fetchBill() {
      this.$bill.id = this.$transfer.bill
      await this.$bill.fetch()
      this.bill_fetched = true
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
