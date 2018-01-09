<template>
  <div class="charges">
    <div class="row">
      <user-card :model="$user" @click="goToModel" />
    </div>

    <responsive-table v-if="$user.charges.length" :columns="[
      'Type',
      'Date',
      'Description',
      'Amount',
      'Actions'
    ]">
      <charge-row v-for="(charge, index) in $user.charges" :key="index" :basePath="`${$user.url}/charges`" :model="charge" />
    </responsive-table>

    <div class="actions text-center">
      <button @click="addCharge">Add tenant charge</button>
    </div>

    <charge-modal v-if="modal_visible" :path="`${$user.url}/charges`" @close="closeModal" :confirm="fetch" />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import User from '@/models/user'
import UserCard from '@/components/cards/user'

import chargeModal from '@/components/modals/lease/charge'

// import chargeRow from './tenant_charge_row'
import chargeRow from './charge_row'

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
    addCharge() {
      this.modal_visible = true
    },
    closeModal() {
      this.modal_visible = false
    },
    goToModel() {
      this.$router.push(`/tenants/${this.user.id}`)
    }
  },
  components: {
    UserCard,
    chargeModal,
    chargeRow
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
  box-shadow: none;
}
.actions {
  margin-top: 10px;
}
</style>