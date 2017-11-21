<template>
  <form @submit.prevent="validate">
    <h2>Review your lease</h2>

    <div class="grid">
      <div class="grid__col grid__col--1-of-2">
        <h3>Start Date</h3>
        <h4>{{ step.lease.start_date | moment }}</h4>
      </div>
      <div class="grid__col grid__col--1-of-2">
        <h3>End Date</h3>
        <h4>{{ end_date }}</h4>
      </div>
    </div>

    <div class="grid">
      <div class="grid__col grid__col--1-of-1" v-if="step.lease.periods.length === 1">
        <h3>Total Monthly Rent</h3>
        <h4 class="amount">{{ step.lease.periods[0].amount | currency }}</h4>
      </div>

      <div class="grid__col grid__col--1-of-1" v-else v-for="(period, index) in step.lease.periods" :key="index">
        <h3>Billing Period {{ index + 1 }}</h3>
        <h4 class="amount">{{ period.amount | currency }}</h4>
      </div>
    </div>

    <div class="grid">
      <div class="grid__col grid__col--1-of-1 roommates" v-if="roommates.length">
        <h3>Roommates</h3>
        <div v-for="(roommate, index) in roommates" :key="index" class="roommate">
          <span>
            {{ roommate.first_name }} {{ roommate.last_name }}{{ needsComma(index) }}
          </span>
        </div>
      </div>
    </div>

    <div class="actions">
      <button class="primary">Confirm</button>
    </div>

    <div class="note">
      If you believe any of these details are incorrect, <a href="mailto:leasing@rafiproperties.com">email the Rafi Payment Team</a>
    </div>
  </form>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import moment from 'moment'
import session from '@/session'

export default {
  name: 'show-lease',
  props: ['step'],
  computed: {
    roommates() {
      return this.step.lease.tenants.filter(tenant => tenant.id !== session.$user.id)
    },
    end_date() {
      return this.step.lease.end_date
        ? moment.utc(this.step.lease.end_date).format('M/D/YYYY')
        : 'N/A'
    }
  },
  methods: {
    validate() {
      this.complete()
    },
    complete() {
      this.step.value = true
      this.$parent.next()
    },
    needsComma(index) {
      if (index !== this.roommates.length - 1) {
        return ', '
      }
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
.roommates {
  .roommate {
    display: inline-block;
    &:not(:last-child) {
      margin-right: 5px;
    }
  }
  span {
    white-space: nowrap;
  }
}
h4 {
  &.amount {
    margin-top: 20px;
    font-size: 1.7em;
  }
}
</style>