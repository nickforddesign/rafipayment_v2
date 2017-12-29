<template>
  <div class="charges">
    <charge-row v-for="(charge, index) in charges" :key="index" :model="charge" />

    <!-- <responsive-table :columns="[
      'Type',
      'Info',
      {
        name: 'Amount',
        class: 'text-right',
        width: '20%'
      }
    ]">
      <charge-row v-for="(charge, index) in charges" :key="index" :model="charge" />
    </responsive-table> -->

  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>

import ChargeRow from './charge_row'

export default {
  name: 'charges',
  props: {
    charges: Array,
    basePath: String
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
    ChargeRow
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
@import '~%/colors';

// .charges {
//   margin-top: 10px;
// }

// .row {
//   display: flex;
//   align-items: center;
//   background: $color-box-background;
//   text-align: left;

//   .actions {
//     flex: 2 0 0;
//     text-align: right;
//     padding-right: 20px;
//   }
// }
// .user-card {
//   width: 300px;
//   margin: 0;
//   box-shadow: none;
// }
</style>