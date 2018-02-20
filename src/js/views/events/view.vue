<template>
  <component v-if="fetched" :is="this.$event.type" :$event="$event" />
  <loading v-else />
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import UserEvent from '@/models/event'
import Authentication from './authentication/view'
import Notification from './notification/view'

export default {
  name: 'event',
  data() {
    return {
      fetched: false
    }
  },
  models: {
    event() {
      return new UserEvent({
        id: this.$route.params.id
      })
    }
  },
  mounted() {
    this.fetch()
  },
  methods: {
    async fetch() {
      this.fetched = false
      await this.$event.fetch()
      this.fetched = true
    }
  },
  components: {
    Authentication,
    Notification
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">

</style>
