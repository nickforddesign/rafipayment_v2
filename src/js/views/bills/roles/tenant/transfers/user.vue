<template>
  <div>
    <div class="user-transfers flexbox middle" @click="toggle">
      <user-card :data="model" :email="false" />
      <div class="solid text-right meta">
        <div>{{ total | currency }}</div>
        <div class="description">{{ model.transfers.length | pluralize('Transfer') }}</div>
      </div>
    </div>
    <collapse :expanded="expanded">
      <row v-for="(transfer, index) in model.transfers" :key="index" :model="transfer" />
    </collapse>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import UserCard from '@/components/cards/user'
import Row from './row'

export default {
  name: 'tenant-transfers',
  props: ['model'],
  data() {
    return {
      expanded: false
    }
  },
  computed: {
    total() {
      return this.model.transfers.reduce((acc, item) => {
        return !['customer_transfer_cancelled', 'customer_transfer_failed'].includes(item.status)
          ? acc + item.amount
          : acc
      }, 0)
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