<template>
  <div class="tr" @click="goToModel">
    <div class="td">
      <a :href="$user.urlRoot" @click.prevent>{{ $user.full_name }}</a>
    </div>
    <div class="td">{{ $user.email }}</div>
    <div class="td">{{ $user.created | moment('MM/DD/YYYY') }}</div>
  </div>
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
    this.$user = this.model
  },
  methods: {
    goToModel() {
      this.$router.push(this.$user.urlRoot)
    },
    async remove() {
      await this.$user.destroy()
      // this sux
      await this.$parent.$collection.reset()
      await this.$parent.$collection.fetch()
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
