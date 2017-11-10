<template>
  <tr @click="goToModel">
    <td>
      <a :href="`/${$transfer.url}`" @click.prevent>{{ $transfer.created | moment('MM/DD/YYYY h:mm:ssa') }}</a>
    </td>
    <td>{{ $transfer.destination_name }}</td>
    <td>{{ $transfer.source_name }}</td>
    <td>{{ $transfer.type }}</td>
    <td>{{ $transfer.status }}</td>
    <td align="right">{{ $transfer.amount | currency }}</td>
  </tr>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import Transfer from '@/models/transfer'

export default {
  name: 'row',
  props: ['model'],
  models: {
    transfer() {
      return new Transfer(this.model)
    }
  },
  methods: {
    goToModel() {
      this.$router.push(`/${this.$transfer.urlRoot}`)
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
