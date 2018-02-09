<template>
  <component v-if="fetched" :is="this.$bill.type" :$bill="$bill" />
  <loading v-else />
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import app from '@/app'
import Bill from '@/models/bill'
import Manual from './view_manual'
import Automatic from './view_automatic'

export default {
  name: 'bill-view',
  models: {
    bill() {
      return new Bill({
        id: this.$route.params.id
      }, {
        basePath: 'bills'
      })
    }
  },
  data() {
    return {
      fetched: false,
      modal_visible: false
    }
  },
  async created() {
    try {
      await this.fetch()
    } catch (error) {
      if (error.error) {
        app.alert(
          error.message,
          null,
          'Not Found',
          'OK',
          'danger'
        )
      }
    } finally {
      this.fetched = true
    }
  },
  methods: {
    async fetch() {
      await this.$bill.fetch()
    }
  },
  components: {
    Manual,
    Automatic
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->