<template>
  <div class="tr">
    <cell>{{ model.url }}</cell>
    <cell>{{ model.created | moment('MM/DD/YYYY') }}</cell>
    <cell>{{ model.paused }}</cell>
    <cell>
      <button class="small" @click.stop="promptToggle">{{ paused_action }}</button>
      <button class="small danger" @click.stop="promptRemove">Remove</button>
    </cell>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import app from '@/app'

export default {
  name: 'row',
  props: ['model'],
  computed: {
    $collection() {
      return this.$parent.$parent.$collection
    },
    paused_action() {
      return this.model.paused
        ? 'unpause'
        : 'pause'
    }
  },
  methods: {
    promptToggle() {
      app.confirm(
        `Are you sure you want to ${this.paused_action} ${this.model.url}?`,
        this.toggle,
        `${this.paused_action} subscription`,
        ['OK', 'Cancel'],
        'neutral'
      )
    },
    async toggle() {
      const body = {
        paused: !this.model.paused
      }
      await this.$request(`payment/webhook_subscriptions/${this.model.id}`, {
        method: 'put',
        body
      })
      this.$collection.reset()
      this.$collection.fetch()
    },
    promptRemove() {
      app.confirm(
        `Are you sure you want to remove ${this.model.url}?`,
        this.remove,
        'Delete subscription'
      )
    },
    async remove() {
      this.$request(`payment/webhook_subscriptions/${this.model.id}`, {
        method: 'delete'
      })
      .then(() => {
        this.$collection.reset()
        this.$collection.fetch()
      })
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
