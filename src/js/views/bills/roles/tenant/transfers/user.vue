<template>
  <div>
    <div class="user-transfers flexbox middle" @click="toggle">
      <user-card :data="tenant" :email="false" />
      <div class="solid text-right meta">
        <div>{{ total | currency }}</div>
        <div class="description">{{ tenant.transfers.length | pluralize('Transfer') }}</div>
      </div>
    </div>
    <collapse :expanded="expanded">
      <row v-for="(transfer, index) in tenant.transfers" :key="index" :model="transfer" />
    </collapse>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import UserCard from '@/components/cards/user'
import Row from './row'

export default {
  name: 'tenant-transfers',
  props: ['tenant', 'bill'],
  data() {
    return {
      expanded: false
    }
  },
  computed: {
    total() {
      return this.bill.getTotalTransfers(this.tenant.id)
    }
  },
  methods: {
    toggle() {
      this.expanded = !this.expanded
    }
  },
  components: {
    UserCard,
    Row
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
@import '~%/colors';

.user-transfers {
  background: $color-input-background;
}
.user-card {
  max-width: 100%;
  width: 300px;
  box-shadow: none;
  margin: 0;
}
.meta {
  padding-right: 20px;
  font-size: 0.8em;

  .description {
    margin-top: 6px;
    color: $color-text-medium;
    white-space: nowrap;
  }
}
</style>

<style lang="scss">
@import '~%/breakpoints';

@media (max-width: $breakpoint-medium) {
  .user-transfers {
    .user-card {
      .avatar {
        margin: 14px;
      }
      .details {
        margin: 0;

        h3 {
          margin: 0;
          font-size: 0.9em;
        }
      }
    }
  }
}
</style>
