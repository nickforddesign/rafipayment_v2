<template>
  <div class="tr" @click.exact="goToModel" @click.ctrl="goToModel" @click.meta="goToModelNew">
    <cell>
      <router-link :to="$user.urlRoot">{{ $user.full_name }}</router-link>
    </cell>
    <cell>{{ $user.email }}</cell>
    <cell>{{ $user.created | moment('MM/DD/YYYY') }}</cell>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import User from '@/models/user'
import { smartClick } from '@/utils'

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
    goToModel(e) {
      smartClick(e, () => this.$router.push(`/${this.$user.urlRoot}`))
    },
    goToModelNew(e) {
      smartClick(e, () => window.open(`/${this.$user.urlRoot}`))
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
