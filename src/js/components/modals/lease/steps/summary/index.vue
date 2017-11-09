<template>
  <div class="container x-sm">

    <button @click="previous" class="back-button">Back</button>

    <h2>Summary</h2>

    <div class="group">
      <legend>Location</legend>
      <dl>
        <dt>Property</dt>
        <dd>{{ models.property.name }}</dd>
      </dl>
      <dl>
        <dt>Unit</dt>
        <dd>{{ models.unit.name }}</dd>
      </dl>
    </div>

    <div class="group">
      <legend>Terms</legend>
      <dl>
        <dt>Start Date</dt>
        <dd>{{ models.lease.start_date | moment }}</dd>
      </dl>
      <dl>
        <dt>End Date</dt>
        <dd>{{ models.lease.end_date | moment }}</dd>
      </dl>
      <dl>
        <dt>Bill Due Day</dt>
        <dd>{{ models.lease.bill_due_day }}</dd>
      </dl>
      <dl v-if="models.lease.periods.length === 1">
        <dt>Rent</dt>
        <dd>{{ models.lease.periods[0].amount | currency }}</dd>
      </dl>
    </div>

    <div class="group" v-if="models.lease.periods.length > 1">
      <legend>Billing Periods</legend>
      <div v-for="(period, index) in models.lease.periods" :key="index">
        <dl>
          <dt>Start Date</dt>
          <dd>{{ period.start_date | moment }}</dd>
        </dl>
        <dl>
          <dt>Amount</dt>
          <dd>{{ period.amount | currency }}</dd>
        </dl>
      </div>
    </div>

    <div class="group">
      <legend>Tenants</legend>
      <div v-for="(tenant, index) in models.tenants" :key="index">
        <div class="row">
          <user-card :model="tenant" />
        </div>

        <table v-if="tenant.charges.length">
          <thead>
            <tr>
              <td>Type</td>
              <td>Date</td>
              <td>Amount</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(charge, index) in tenant.charges" :key="index">
              <td>
                <span v-if="charge.date">Scheduled</span>
                <span v-else>Recurring</span>
              </td>
              <td>{{ charge.date }}</td>
              <td>{{ charge.amount }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
    </div>

    <div class="group">
      <legend>Fees / Credits</legend>
      <div v-for="(charge, index) in models.lease.charges" :key="index">
        <dl>
          <dt>Amount</dt>
          <dd>{{ charge.amount | currency }}</dd>
        </dl>

        <div v-if="charge.date">
          <dl>
            <dt>Type</dt>
            <dd>Scheduled</dd>
          </dl>

          <dl>
            <dt>Date</dt>
            <dd>{{ charge.date | moment }}</dd>
          </dl>
        </div>

        <div v-else>
          <dl>
            <dt>Type</dt>
            <dd>Recurring</dd>
          </dl>
        </div>

      </div>
    </div>

    <div class="actions">
      <div>
        <button class="primary" @click="complete">Complete</button>
      </div>
    </div>
    
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import UserCard from '@/components/cards/user'

export default {
  name: 'lease-add--summary',
  props: {
    models: Object
  },
  data() {
    return {
      charges: []
    }
  },
  created() {
    console.log(this.models.tenants)
  },
  methods: {
    complete(model) {
      this.next()
    },
    next() {
      this.$emit('next')
    },
    previous() {
      this.$emit('previous')
    }
  },
  components: {
    UserCard
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style lang="scss" scoped>
@import '~%/colors';

.group {
  margin-bottom: 20px;
}
.row {
  background-color: $color-box-background;

  .user-card {
    width: 280px;
    margin: 0;
  }
}
</style>
