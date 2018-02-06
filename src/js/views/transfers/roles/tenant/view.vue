<template>
  <div class="model-view">

    <div v-if="fetched">

      <header>
        <div class="meta">
          <legend>Transter</legend>
          <h2>{{ $transfer.amount | currency }}</h2>
        </div>
        <div class="actions">
          <div v-if="fetched_cancel">
            <button class="danger" @click="promptCancel" v-if="$transfer.cancellable">Cancel</button>
          </div>
          <loading v-else type="input" />
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
              <dt>Status</dt>
              <dd :class="['text-color', $transfer.statusClass($transfer.source_status)]">{{ $transfer.source_status }}</dd>
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
              <dd>{{ scheduled_date_string }}</dd>
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
              <dd>
                <router-link :to="`/leases/${$transfer.lease}`">
                  {{ $transfer.address }}
                </router-link>
              </dd>
            </dl>
          </div>

          <div class="grid__col grid__col--1-of-2">
            <dl>
              <dt>Bill</dt>
              <dd>#{{ $bill.display_id }}</dd>
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

    </div>
    <loading v-else />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import moment from 'moment'
import app from '@/app'
import Transfer from '@/models/transfer'
import Bill from '@/models/bill'
import { prettyCurrency } from '@/utils'

export default {
  name: 'transfer',
  data() {
    return {
      fetched: false,
      fetched_cancel: false
    }
  },
  models: {
    transfer() {
      return new Transfer({
        id: this.$route.params.id
      }, {
        basePath: 'account/transfers'
      })
    },
    bill() {
      return new Bill(null, {
        basePath: 'account/bills'
      })
    }
  },
  async created() {
    await this.$transfer.fetch()
    this.checkIfCancellable()
    this.$bill.id = this.$transfer.bill
    this.$bill.fetch()
    this.fetched = true
  },
  computed: {
    scheduled_date_string() {
      return this.$transfer.scheduled_date
        ? moment.utc(this.$transfer.scheduled_date).format('MM/DD/YYYY h:mm:ss:a')
        : '–'
    }
  },
  methods: {
    async checkIfCancellable() {
      await this.$transfer.fetchCancel()
      this.fetched_cancel = true
    },
    promptCancel() {
      app.confirm(
        `Are you sure you want to cancel this payment of ${prettyCurrency(this.$transfer.amount)}?`,
        this.cancel,
        'Cancel Payment'
      )
    },
    async cancel() {
      await this.$transfer.cancel()
      this.$router.push('/transfers')
    }
  }
}
</script>
