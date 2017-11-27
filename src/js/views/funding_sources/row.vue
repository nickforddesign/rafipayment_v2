<template>
  <div class="tr" @click="goToModel">
    <div class="td">{{ model.name }} <span v-if="is_primary" class="flag success">Primary</span></div>
    <div class="td">{{ model.status }}</div>
    <div class="td">{{ model.created | moment('MM/DD/YYYY') }}</div>
    <div class="td text-right">
      <button class="small" @click.stop="set_primary" v-if="!is_balance && !is_primary">Set as Primary</button>
      <button class="small" @click.stop="remove" v-if="!is_balance">Remove</button>
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { path } from 'ramda'

export default {
  name: 'row',
  props: ['model'],
  computed: {
    is_balance() {
      return this.model.type === 'balance'
    },
    is_primary() {
      const primary_id = path(['$parent', '$user', 'payment', 'primary_funding_source'], this.$parent)
      return this.model.id === primary_id
    }
  },
  methods: {
    goToModel() {
      this.$router.push(`/funding_sources/${this.model.id}`)
    },
    async remove() {
      const confirmed = confirm(`Are you sure you want to delete ${this.model.name}?`)
      if (confirmed) {
        await this.$request(`account/funding_sources/${this.model.id}`, {
          method: 'delete'
        })
        await this.$parent.fetch()
      }
    },
    async set_primary() {
      const confirmed = confirm(`Are you sure you want to change your primary payment method to ${this.model.name}`)
      if (confirmed) {
        await this.$request('account/funding_sources', {
          method: 'put',
          body: {
            funding_source: this.model.id
          }
        })
        await this.$parent.$parent.$user.fetch()
      }
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
