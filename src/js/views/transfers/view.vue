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
              <dt>Status</dt>
              <dd>{{ $transfer.status }}</dd>
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
              <dd>{{ $transfer.status }}</dd>
            </dl>
          </div>
        </div>
      </div>

      <div class="table">
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
            <!-- <pre>{{ transfer }}</pre>
            <pre>{{ bank_transfer }}</pre> -->
          </table>
        </div>

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
  //   return new Collection({
  //     basePath: `${this.$transfer.url}/subtransfers`
  //   })
  // },
  computed: {
    is_cancellable() {
      // return 'cancel' in this.transfer._links
    }
  },
  async created() {
    await this.$transfer.fetch()
    // this.$collection.fetch()
    this.fetched = true
  },
  methods: {
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
