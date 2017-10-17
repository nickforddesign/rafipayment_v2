<template>
  <tr @click="prompt">
    <td>{{ $user.full_name }}</td>
    <td>{{ $user.email }}</td>
    <td>{{ $user.created | moment('MM/DD/YYYY') }}</td>
  </tr>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import User from '@/models/user'

export default {
  name: 'row',
  props: ['model'],
  models: {
    user() {
      return new User({
        role: 'superadmin'
      })
    }
  },
  created() {
    console.log(this.model)
    this.$user = this.model
  },
  methods: {
    prompt() {
      const accepted = confirm('Are you sure you want to delete?')
      if (accepted) {
        this.remove()
      }
    },
    async remove() {
      await this.$user.destroy()
      // this sux
      await this.$parent.$collection.reset()
      await this.$parent.$collection.fetch()
      // this.$parent.$collection.delete(this.$user.id)
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
