<template>
  <div class="model-view">
    <header>
      <div class="meta">
        <legend>Bill</legend>
        <h2>{{ $bill.due_date | moment }}</h2>
      </div>
    </header>

    <div class="grid">
      <div class="table-container grid__col grid__col--1-of-2">
        <div class="header">
          Basic Information
        </div>
        <dl>
          <dt>Due Date</dt>
          <dd>{{ $bill.due_date | moment('M/DD/YYYY', true) }}</dd>
        </dl>
        <dl>
          <dt>Type</dt>
          <dd>{{ $bill.type | capitalize }}</dd>
        </dl>
        <dl>
          <dt>Lease</dt>
          <dd>
            <router-link :to="`/leases/${$bill.lease}`">{{ $bill.target }}</router-link>
          </dd>
        </dl>
        <dl>
          <dt>Balance</dt>
          <dd>{{ $bill.balance | currency }}</dd>
        </dl>
      </div>

      <div class="table-container grid__col grid__col--1-of-2">
        <div class="header">
          Tenants
        </div>

        <div class="tenant" v-for="(tenant, index) in $bill.tenants" :key="index">
          <user-card :data="tenant" @click="goToTenant(tenant)" />
        </div>

      </div>
    </div>

    <div class="table-container charges">
      <div class="header">
        Charges
      </div>

      <charges v-for="(tenant, index) in $bill.tenants" :key="index" :user="tenant" :basePath="$bill.url" />

      <div class="summary">
        <dl class="total">
          <dt>Total</dt>
          <dd>{{ $bill.total | currency }}</dd>
        </dl>

        <dl class="total">
          <dt>Balance</dt>
          <dd>{{ $bill.balance | currency }}</dd>
        </dl>
      </div>
    </div>

    <transfers-table :model="$bill" />

  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import transfersTable from './transfers'
import charges from '@/components/charges'
import userCard from '@/components/cards/user'

export default {
  name: 'bill',
  props: {
    $bill: Object
  },
  mounted() {
    console.log(this.$bill)
  },
  methods: {
    goToTenant(tenant) {
      this.$router.push(`/tenants/${tenant.id}`)
    }
  },
  components: {
    transfersTable,
    userCard,
    charges
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
@import '~%/colors';

.tenant {
  background: $color-box-background;
  margin-top: 10px;

  .user-card {
    width: 300px;
    margin: 0;
    box-shadow: none;
  }
}

.total {
  font-weight: bold;
  border: 0;
}

.summary {
  width: 300px;
  float: right;
  margin-right: 20px;
}

.charges {
  &:after {
    content: '';
    display: table;
    clear: both;
  }
}
</style>
