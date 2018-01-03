<template>
  <div class="tr" @click="goToModel">
    <cell>
      <a :href="`/${$user.urlRoot}`" @click.prevent>{{ $user.full_name }}</a>
    </cell>
    <cell>{{ $user.email }}</cell>
    <cell>{{ $user.created | moment('MM/DD/YY') }}</cell>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import session from '@/session'
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
      if (session.$user.role !== 'tenant') {
        this.$router.push(`/${this.$user.urlRoot}`)
      }
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
