<template>
  <div class="charges">
    <div class="row" @click="toggle">
      {{ $user.full_name }}
      <!-- <user-card :model="$user" :email="false" /> -->
      <div class="actions">
        <div>{{ total | currency }}</div>
        <div class="description">{{ $user.charges.length | pluralize('charge') }}</div>
      </div>
    </div>
    <collapse :expanded="expanded">
      <responsive-table :columns="[
        'Type',
        'Info',
        {
          name: 'Amount',
          class: 'text-right',
          width: '20%'
        }
      ]">
        <charge-row v-for="(charge, index) in $user.charges" :key="index" :model="charge" :basePath="`${$parent.$bill.url}/charges`" />
      </responsive-table>
    </collapse>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import User from '@/models/user'
import UserCard from '@/components/cards/user'
import ChargeRow from '@/views/bills/charge_row'

export default {
  name: 'charges',
  props: {
    user: Object,
    add: {
      type: Boolean,
      default: true
    },
    basePath: String
  },
  data() {
    return {
      expanded: false
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
  computed: {
    total() {
      return this.$user.charges.reduce((acc, item) => acc + item.amount, 0)
    }
  },
  methods: {
    toggle() {
      this.expanded = !this.expanded
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
  display: flex;
  align-items: center;
  background: $color-box-background;
  text-align: right;

  .actions {
    flex: 2 0 0;
    text-align: right;
    // padding-right: 20px;
  }
}
// .user-card {
//   width: 300px;
//   margin: 0;
//   box-shadow: none;
// }
.description {
  color: #999;
  font-size: 0.8em;
  margin-top: 6px;
  white-space: nowrap;
}
.actions {
  margin: 0;
}
</style>