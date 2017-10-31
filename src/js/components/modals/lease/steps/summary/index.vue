<template>
  <div class="container x-sm">
    <h2>Summary</h2>

    property
    <pre>{{ models.property.$data }}</pre>
    unit
    <pre>{{ models.unit.$data }}</pre>
    lease
    <pre>{{ models.lease.$data }}</pre>

    <legend>Location</legend>
    <dl>
      <dt>Property</dt>
      <dd>{{ models.property.name }}</dd>
    </dl>
    <dl>
      <dt>Unit</dt>
      <dd>{{ models.unit.name }}</dd>
    </dl>

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

    <div v-else>
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

    <legend>Tenants</legend>
    <div v-for="(tenant, index) in models.tenants" :key="index">
      <dl>
        <dt>Name</dt>
        <dd>{{ tenant.full_name }}</dd>
      </dl>
    </div>

    <legend>Fees / Credits</legend>
    <div v-for="(charge, index) in models.lease.charges" :key="index">
      <dl>
        <dt>Amount</dt>
        <dd>{{ charge.amount | currency }}</dd>
      </dl>

      <dl>
        <dt>Type</dt>
        <dd>{{ charge.type }}</dd>
      </dl>

      <dl v-if="charge.type === 'scheduled'">
        <dt>Date</dt>
        <dd>{{ charge.date | moment }}</dd>
      </dl>
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
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
