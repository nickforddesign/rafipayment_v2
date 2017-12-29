<template>
  <component v-if="fetched" :is="this.$bill.type" :$bill="$bill" />
  <loading v-else />
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
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
    await this.fetch()
    this.fetched = true
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