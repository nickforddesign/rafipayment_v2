<template>
  <div class="charges">
    <div class="row">
      <user-card :model="$user" />
      <div class="actions" v-if="basePath">
        <button @click="showModal">Add Charge</button>
      </div>
    </div>
    <responsive-table :columns="[
      'Type',
      'Description',
      {
        name: 'Amount',
        class: 'text-right',
        width: '20%'
      }
    ]">
      <charge-row v-for="(charge, index) in $user.charges" :key="index" :model="charge" :basePath="`${$parent.$bill.url}/charges`" />
    </responsive-table>

    <charge-modal v-if="modal_visible" @close="closeModal" :confirm="fetch" :path="`${$user.url}/charges`" />

  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import User from '@/models/user'
import UserCard from '@/components/cards/user'
import ChargeRow from '@/views/bills/charge_row'
import ChargeModal from '@/components/modals/bill/charge'

export default {
  name: 'charges',
  props: {
    user: Object,
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
      this.$parent.fetch()
    },
    showModal() {
      this.modal_visible = true
    },
    closeModal() {
      this.modal_visible = false
    }
  },
  components: {
    UserCard,
    ChargeRow,
    ChargeModal
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
    padding-right: 20px;
  }
}
.user-card {
  width: 300px;
  margin: 0;
  box-shadow: none;
}
</style>