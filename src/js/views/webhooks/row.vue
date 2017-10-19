<template>
  <tr @click="test">
    <!-- <td>
      <a :href="$user.urlRoot" @click.prevent>{{ $user.full_name }}</a>
    </td> -->
    <td>{{ model.url }}</td>
    <td>{{ model.created | moment('MM/DD/YYYY') }}</td>
    <td>
      <button class="small" @click.stop="remove">Remove</button>
    </td>
  </tr>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>

export default {
  name: 'row',
  props: ['model'],
  methods: {
    remove() {
      // console.log('remove')
      // console.log()
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
    },
    test() {
      console.log('test')
    }
  }
  // models: {
    // webhook() {
    //   return new webhook({
    //     role: 'superadmin'
    //   })
    // }
  // },
  // created() {
  //   this.$webhook = this.model
  // },
  // methods: {
    // goToModel() {
    //   this.$router.push(this.model.urlRoot)
    // },
    // async remove() {
      // await this.model.destroy()
      // this sux
      // await this.$parent.$collection.reset()
      // await this.$parent.$collection.fetch()
    // }
  // }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
