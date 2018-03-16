<template>
  <div class="tr">
    <cell>
      <router-link :to="`/${$transfer.url}`">
        <avatar
          v-if="avatar"
          :initials="$transfer.source.full_name[0]"
          :color="user.avatar_color" />

        Payment ({{ $transfer.type | replace('_', '-') }})
      </router-link>
    </cell>
    <cell>
      {{ $transfer.created | moment('M/D/YY h:mma') }}
    </cell>
    <cell class="text-color" :class="[status_class]">
      {{ $transfer.source_status }}
    </cell>
    <cell class="text-right">
      {{ $transfer.amount | currency }}
    </cell>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import Avatar from '@/components/cards/avatar'
import Transfer from '@/models/transfer'

export default {
  name: 'transfer',
  props: {
    data: Object,
    bill: Object,
    avatar: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    status_class() {
      return this.$transfer.statusClass(this.$transfer.source_status)
    },
    user() {
      return this.bill.tenants.find(tenant => tenant.id === this.$transfer.source.id)
    }
  },
  models: {
    transfer() {
      return new Transfer(this.data)
    }
  },
  components: {
    Avatar
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
@import '~%/colors';

.avatar {
  display: inline-block;
  width: 16px;
  margin-right: 6px;
  color: $color-text-light;

  &:hover {
    cursor: pointer;
  }
}
</style>
