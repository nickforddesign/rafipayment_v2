<template>
  <div class="tr">
    <div class="td">{{ model.url }}</div>
    <div class="td">{{ model.created | moment('MM/DD/YYYY') }}</div>
    <div class="td">
      {{ model.paused }}
    </div>
    <div class="td">
      <button class="small" @click.stop="toggle">{{ paused_action }}</button>
      <button class="small" @click.stop="remove">Remove</button>
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>

export default {
  name: 'row',
  props: ['model'],
  computed: {
    paused_action() {
      return this.model.paused
        ? 'unpause'
        : 'pause'
    }
  },
  methods: {
    toggle() {
      const body = {
        paused: !this.model.paused
      }
      const confirmed = confirm(`Are you sure you want to ${this.paused_action} ${this.model.url}?`)
      if (confirmed) {
        this.$request(`payment/webhook_subscriptions/${this.model.id}`, {
          method: 'put',
          body
        })
        .then(() => {
          this.$parent.$collection.reset()
          this.$parent.$collection.fetch()
        })
      }
    },
    remove() {
      const confirmed = confirm(`Are you sure you want to remove ${this.model.url}?`)
      if (confirmed) {
        this.$request(`payment/webhook_subscriptions/${this.model.id}`, {
          method: 'delete'
        })
        .then(() => {
          this.$parent.$collection.reset()
          this.$parent.$collection.fetch()
        })
      }
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
