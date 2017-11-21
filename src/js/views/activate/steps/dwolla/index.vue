<template>
  <div>
    <h2>Setup Autopay</h2>
    <loading v-if="loading" />
    <dwolla-iav @load="loading = false" @complete="save" />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
// import Lease from '@/models/lease'
// import session from '@/session'
import dwollaIav from '@/components/dwolla_iav'

export default {
  name: 'dwolla',
  props: ['step'],
  data() {
    return {
      loading: true
    }
  },
  methods: {
    async validate() {
      this.save()
    },
    async save() {
      this.complete()
    },
    complete() {
      this.step.value = true
      this.$parent.next()
    }
  },
  components: {
    dwollaIav
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
  
</style>