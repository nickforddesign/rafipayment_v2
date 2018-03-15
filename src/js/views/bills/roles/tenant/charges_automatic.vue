<template>
  <div class="tenant charges">
    <div class="row" @click="toggle">
      {{ $user.full_name }}
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
      return parseFloat(this.$user.charges.reduce((acc, item) => acc + item.amount, 0).toFixed(2))
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
  border-bottom: 1px solid #aaa;
  margin-bottom: 4px;
  padding-bottom: 8px;;

  .actions {
    flex: 2 0 0;
    text-align: right;
  }
}

.description {
  color: #aaa;
  font-size: 0.8em;
  margin-top: 6px;
  white-space: nowrap;
}
.actions {
  margin: 0;
}
</style>

<style lang="scss">
@import '~%/colors';
@import '~%/breakpoints';

.tenant.charges {
  .table {
    padding: 10px;
    margin-top: 14px;
    border-radius: 4px;
    background: $color-background-dark;

    .thead {
      display: none;
    }

    .tbody {
      .tr {
        display: flex;
        padding: 6px;
        margin: 0;
        background: transparent;
        color: #aaa;
        box-shadow: none;

        .td {
          flex: 1;
          font-size: 1em;
          line-height: 1.5em;
          padding: 0;
          margin: 0;

          &:first-child {
            font-size: 1em;
          }

          &.balance {
            flex: initial;
            width: 100px;
          }
        }
      }
    }
  }
}
</style>
