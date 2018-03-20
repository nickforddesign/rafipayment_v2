<template>
  <div>
    <avatar v-if="event.name === 'customer_transfer_created'" :initials="$source.initials" :avatar="$source.avatar_color" />
    <avatar v-else-if="event.name === 'customer_bank_transfer_created'" :initials="destination_initials" avatar="grey" />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import User from '@/models/user'
import Company from '@/models/company'
import Avatar from '@/components/cards/avatar'

export default {
  name: 'status-completed',
  props: {
    event: Object,
    transfer: Object
  },
  computed: {
    destination_initials() {
      return this.$destination.name[0]
    }
  },
  models: {
    source() {
      return new User(this.transfer.source.resolved)
    },
    destination() {
      return new Company(this.transfer.destination.resolved)
    }
  },
  components: {
    Avatar
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
.avatar {
  display: inline-block;
  width: 100px;
}
</style>
