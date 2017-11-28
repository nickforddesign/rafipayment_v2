<template>
  <div class="tr">
    <cell>{{ period.start_date | moment('M/DD/YYYY', true) }}</cell>
    <cell>{{ period.id }}</cell>
    <cell>{{ period.period_amount | currency }}</cell>
    <cell>{{ split | currency }}</cell>
    <cell className="text-right">
      <button class="small" @click="showModal">Edit Split</button>
      <split-modal
        v-if="modal_visible"
        @close="closeModal"
        :confirm="fetch"
        :path="`account/leases/${lease.id}/periods/${period.id}`"
        :amount="split" />
    </cell>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import session from '@/session'
import splitModal from '@/components/modals/lease/split'

export default {
  props: [
    'period',
    'lease'
  ],
  data() {
    return {
      modal_visible: false
    }
  },
  computed: {
    split() {
      const lease_user = this.lease.tenants.find(model => {
        return model.id === session.$user.id
      })
      if (lease_user.periods) {
        const period = lease_user.periods.find(model => {
          return model.id === this.period.id
        })
        if (period) {
          return period.amount
        }
      } else {
        return ''
      }
    }
  },
  methods: {
    fetch() {
      return this.$parent.fetch()
    },
    showModal() {
      this.modal_visible = true
    },
    closeModal() {
      this.modal_visible = false
    }
  },
  components: {
    splitModal
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
