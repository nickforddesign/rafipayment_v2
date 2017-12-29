<template>
  <div>
    <div class="box flexbox middle" @click="toggle">
      <user-card :data="model" :email="false" />
      <div class="solid text-right meta">
        <div>{{ total | currency }}</div>
        <div class="description">{{ model.transfers.length | pluralize('Transfer') }}</div>
      </div>
    </div>
    <div v-if="expanded">
      <row v-for="(transfer, index) in model.transfers" :key="index" :model="transfer" />
    </div>
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
      return this.model.transfers.reduce((acc, item) => acc + item.amount, 0)
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

.box {
  width: 100%;
}
.user-card {
  max-width: 100%;
  width: 300px;
  box-shadow: none;
  margin: 0;
}
.meta {
  font-size: 0.9em;

  .description {
    margin-top: 6px;
    color: $color-text-medium;
  }
}
</style>