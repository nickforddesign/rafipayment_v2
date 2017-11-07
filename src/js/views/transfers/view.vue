<template>
  <div class="model-view">

    <div v-if="fetched">

      <header>
        <div class="meta">
          <legend>Transfer</legend>
          <h2>{{ $transfer.amount.value | currency }}</h2>
        </div>
        <div class="actions">
          <button class="danger" @click="remove" v-if="is_cancellable">Cancel</button>
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
              <dd>{{ $transfer.amount.value | currency }}</dd>
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
              <dt>Source</dt>
              <dd>{{ popId(bank_transfer._links.source.href) }}</dd>
            </dl>
          </div>
          <div class="grid__col grid__col--1-of-2">
            <dl>
              <dt>Destination</dt>
              <dd>{{ popId(transfer._links.destination.href) }}</dd>
            </dl>
          </div>
        </div>
      </div>

      <!-- <div class="table">
        <div class="header">
          Parts
        </div>
          <table>
            <thead>
              <tr>
                <td>Date</td>
                <td>Destination</td>
                <td>Source</td>
                <td>Type</td>
                <td>Status</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ bank_transfer.created | moment('MM/DD/YYYY h:mm:ssa') }}</td>
                <td>{{ popId(bank_transfer._links.destination.href) }}</td>
                <td>{{ popId(bank_transfer._links.source.href) }}</td>
                <td>Bank Transfer</td>
                <td>{{ bank_transfer.status }}</td>
              </tr>
              <tr>
                <td>{{ transfer.created | moment('MM/DD/YYYY h:mm:ssa') }}</td>
                <td>{{ popId(transfer._links.destination.href) }}</td>
                <td>{{ popId(transfer._links.source.href) }}</td>
                <td>Transfer</td>
                <td>{{ transfer.status }}</td>
              </tr>
            </tbody>
          </table>
        </div> -->

      </div>
    <loading v-else />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import Transfer from '@/models/transfer'
// import { Collection } from 'vue-collections'
import row from './row'

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
  // collection() {
    // return new Collection({
    //   basePath: `account/payment/transfers?correlationId=${this.$route.params.id}`
    // })
  // },
  computed: {
    // $transfer() {
    //   return this.transfer
    // },
    // transfer() {
    //   return this.collection.filter(model => {
    //     return model._links.source['resource-type'] === 'customer'
    //   })[0]
    // },
    // bank_transfer() {
    //   return this.collection.filter(model => {
    //     return model._links.source['resource-type'] === 'funding-source'
    //   })[0]
    // },
    is_cancellable() {
      // return 'cancel' in this.transfer._links
    }
  },
  async created() {
    // await this.$collection.fetch()
    await this.$transfer.fetch()
    this.fetched = true
  },
  methods: {
    // popId(url) {
    //   return url.split('/').pop()
    // },
    remove() {
      const confirmed = confirm(`Are you sure you want to cancel this transfer?`)
      if (confirmed) {
        this.$request(`account/payment/transfers/${this.transfer.id}`, {
          method: 'delete'
        })
        .then(() => {
          this.$router.push('/transfers')
        })
      }
    }
  },
  components: {
    row
  }
}
</script>
