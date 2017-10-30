<template>
  <tr>
    <td>{{ period.start_date | moment('M/DD/YYYY', true) }}</td>
    <td></td>
    <td>{{ period.amount | currency }}</td>
    <td>{{ split | currency }}</td>
    <td>
      <button class="small" @click="showModal">Edit Split</button>
      <split-modal
        v-if="modal_visible"
        @close="closeModal"
        :confirm="fetch"
        :path="`account/leases/${lease.id}/periods/${period._id}`"
        :amount="split" />
    </td>
  </tr>
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
      const user = this.lease.tenants.find(model => {
        return model._id === session.$user.id
      })
      if (user.periods) {
        const period = user.periods.find(model => {
          return model._id === this.period._id
        })
        if (period) {
          return period.split
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
