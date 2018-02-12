<template>
  <div class="charges">
    <div class="header">
      Charges
      <div class="actions" v-if="basePath">
        <button class="small" @click="showModal" v-if="add">Add Charge</button>
      </div>
    </div>
    <responsive-table :columns="[
      'Type',
      {
        name: 'Amount',
        class: 'text-right',
        width: '20%'
      }
    ]">
      <charge-row v-for="(charge, index) in charges" :key="index" :model="charge" :basePath="`${$parent.$bill.url}/charges`" />
    </responsive-table>

    <charge-modal v-if="add && modal_visible" @close="closeModal" :confirm="fetch" :path="`${basePath}/charges`" />

  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import UserCard from '@/components/cards/user'
import ChargeRow from '@/views/bills/charge_row'
import ChargeModal from '@/components/modals/bill/charge'

export default {
  name: 'charges',
  props: {
    charges: Array,
    basePath: String,
    add: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      modal_visible: false
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