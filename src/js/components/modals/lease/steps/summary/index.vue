<template>
  <div>
    <button @click="previous" class="back-button small">Back</button>

    <div class="container x-sm">
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
          <dd>
            <span v-if="models.lease.end_date">{{ models.lease.end_date | moment }}</span>
            <span v-else>–</span>
          </dd>
        </dl>
        <dl>
          <dt>Bill Due Day</dt>
          <dd>{{ models.lease.bill_due_day }}</dd>
        </dl>
        <dl v-if="models.lease.periods.length === 1">
          <dt>Rent</dt>
          <dd>{{ models.lease.periods[0].amount | currency }}</dd>
        </dl>
        <dl v-if="models.lease.security">
          <dt>Security Deposit</dt>
          <dd>{{ models.lease.security | currency }}</dd>
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

          <div class="table" v-if="tenant.charges.length">
            <div class="thead">
              <div class="tr">
                <div class="th">Type</div>
                <div class="th">Date</div>
                <div class="th">Amount</div>
              </div>
            </div>
            <div class="tbody">
              <div class="tr" v-for="(charge, index) in tenant.charges" :key="index">
                <div class="td">
                  <span v-if="charge.date">Scheduled</span>
                  <span v-else>Recurring</span>
                </div>
                <div class="td">{{ charge.date }}</div>
                <div class="td">{{ charge.amount }}</div>
              </div>
            </div>
          </div>
        </div>
        
      </div>

      <div class="group">
        <legend>Fees / Credits</legend>
        <div class="box" v-for="(charge, index) in models.lease.charges" :key="index">
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
              <dt>Description</dt>
              <dd>{{ charge.description }}</dd>
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
