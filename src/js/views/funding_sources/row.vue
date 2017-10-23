<template>
  <tr>
    <td>{{ model.name }} <span v-if="is_primary" class="flag success">Primary</span></td>
    <td>{{ model.status }}</td>
    <td>{{ model.created | moment('MM/DD/YYYY') }}</td>
    <td>
      <button class="small" @click.stop v-if="!is_balance && !is_primary">Set as Primary</button>
      <button class="small" @click.stop="remove" v-if="!is_balance">Remove</button>
    </td>
  </tr>
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
      const primary_id = path(['$user', 'payment', 'primary_funding_source'], this.$parent)
      return this.model.id === primary_id
    }
  },
  methods: {
    async remove() {
      const confirmed = confirm(`Are you sure you want to delete ${this.model.name}?`)
      if (confirmed) {
        await this.$request(`account/payment/funding_sources/${this.model.id}`, {
          method: 'delete'
        })
        // this sux
        // await this.$parent.$user.reset()
        await this.$parent.$user.fetch()
      }
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
