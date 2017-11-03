<template>
  <div class="charges">
    <div class="row">
      <user-card :model="$user" />
    </div>
    <dl v-for="(charge, index) in charges" :key="index">
      <dt>{{ charge.description || 'fee' | capitalize }}</dt>
      <dd>{{ charge.amount | currency }}</dd>
    </dl>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
// import User from '@/models/user'
// import UserCard from '@/components/cards/user'

// export default {
//   name: 'charges',
//   props: {
//     user: Object
//   },
//   data() {
//     return {
//       charges: this.user.charges
//     }
//   },
//   models: {
//     user() {
//       return new User(this.user)
//     }
//   },
//   components: {
//     UserCard
//   }
// }
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