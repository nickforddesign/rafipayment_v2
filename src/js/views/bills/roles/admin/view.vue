<template>
  <div v-if="fetched" class="model-view">
    <component  :is="this.$bill.type" :$bill="$bill" />
    <button @click="showModal">Add Non-Electronic Payment</button>
    <non-electronic-modal v-if="modal_visible" :model="$bill" :confirm="fetch" @close="closeModal" />
  </div>
  <loading v-else />
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import app from '@/app'
import Bill from '@/models/bill'
import Manual from './view_manual'
import Automatic from './view_automatic'
import NonElectronicModal from '@/components/modals/bill/non_electronic'

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
    },
    showModal() {
      this.modal_visible = true
    },
    closeModal() {
      this.modal_visible = false
    }
  },
  components: {
    Manual,
    Automatic,
    NonElectronicModal
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->