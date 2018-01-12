<template>
  <div class="charges">
    <div class="row flexbox">
      <user-card :model="$user" @click="goToModel" />
      <div class="solid text-right splits">
        <div v-for="(period, index) in lease.periods" :key="index" class="split">
          <div v-if="lease.periods.length > 1">
            <span>Start Date:</span> {{ period.start_date | moment }}
          </div>
          <div>
            <span>Split:</span> {{ getAmount(period) }}
          </div>
        </div>
      </div>
    </div>

    <responsive-table v-if="$user.charges.length" :columns="[
      'Type',
      'Date',
      'Description',
      'Amount',
      {
        name: 'Actions',
        class: 'text-right'
      }
    ]">
      <charge-row v-for="(charge, index) in $user.charges" :key="index" :basePath="`${$user.url}/charges`" :model="charge" @destroy="fetch" />
    </responsive-table>

    <div class="actions text-center">
      <button @click="addCharge">Add tenant charge</button>
    </div>

    <charge-modal v-if="modal_visible" :path="`${$user.url}/charges`" @close="closeModal" :confirm="fetch" />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { path } from 'ramda'
import { prettyCurrency } from '@/utils'
import User from '@/models/user'
import UserCard from '@/components/cards/user'
import ChargeModal from '@/components/modals/lease/charge'
import ChargeRow from './charge_row'

export default {
  name: 'charges',
  props: {
    user: Object,
    lease: Object,
    basePath: String
  },
  data() {
    return {
      modal_visible: false
    }
  },
  models: {
    user() {
      return new User(this.user, {
        basePath: `${this.basePath}/tenants`
      })
    }
  },
  watch: {
    user(val) {
      this.$user = val
    }
  },
  methods: {
    fetch() {
      this.$emit('fetch')
    },
    addCharge() {
      this.modal_visible = true
    },
    closeModal() {
      this.modal_visible = false
    },
    goToModel() {
      this.$router.push(`/tenants/${this.user.id}`)
    },
    getAmount(period) {
      const amount = path(['amount'], this.$user.periods.find(user_period => user_period.id === period.id))
      return amount !== undefined
        ? prettyCurrency(amount)
        : '–'
    }
  },
  components: {
    UserCard,
    ChargeModal,
    ChargeRow
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
@import '~%/colors';

.charges {
  margin-top: 10px;
}

.row {
  background: $color-box-background;
  text-align: right;
  align-items: center;
}
.splits {
  padding: 30px;
  font-size: 0.9em;

  span {
    color: $color-text-medium;
  }

  .split:not(:last-child) {
    margin-bottom: 10px;
  }
}
.user-card {
  width: 300px;
  margin: 0;
  box-shadow: none;
}
.actions {
  margin-top: 10px;
}
</style>