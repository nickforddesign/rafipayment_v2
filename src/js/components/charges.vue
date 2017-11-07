<template>
  <div class="charges">
    <div class="row">
      <user-card :model="$user" />
    </div>
    <table>
      <thead>
        <tr>
          <td>Type</td>
          <td>Description</td>
          <td width="20%" class="text-right">Amount</td>
        </tr>
      </thead>
      <tbody>
        <charge-row v-for="(charge, index) in charges" :key="index" :model="charge" :basePath="`${$parent.$bill.url}/charges`" />
      </tbody>
    </table>
    <!-- <dl v-for="(charge, index) in charges" :key="index">
      <dt>{{ charge.description || 'fee' | capitalize }}</dt>
      <dd>{{ charge.amount | currency }}</dd>
    </dl> -->
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import User from '@/models/user'
import UserCard from '@/components/cards/user'

import ChargeRow from '@/views/bills/roles/admin/charge_row'
export default {
  name: 'charges',
  props: {
    user: Object
  },
  data() {
    return {
      charges: this.user.charges
    }
  },
  models: {
    user() {
      return new User(this.user)
    }
  },
  components: {
    UserCard,
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
}
.user-card {
  width: 300px;
  margin: 0;
}
</style>