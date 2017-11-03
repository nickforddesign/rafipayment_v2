<template>
  <div class="box period">
    <dl>
      <dt>Start Date</dt>
      <dd>{{ $period.start_date | moment('MM/DD/YYYY', true) }}</dd>
    </dl>
    <dl>
      <dt>Amount</dt>
      <dd>{{ $period.amount | currency }}</dd>
    </dl>
    <div class="actions">
      <button class="x-small" @click="edit">Edit</button>
      <button class="x-small" @click="remove">Remove</button>
    </div>

    <period-modal v-if="modal_visible" :path="basePath" @close="closeModal" :confirm="fetch" :model="$period" />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import Period from '@/models/lease/period'
import periodModal from '@/components/modals/lease/period'

export default {
  name: 'lease-period',
  props: ['model', 'basePath'],
  data() {
    return {
      modal_visible: false
    }
  },
  models: {
    period() {
      return new Period(this.model, {
        basePath: this.basePath
      })
    }
  },
  methods: {
    fetch() {
      this.$parent.fetch()
    },
    closeModal() {
      this.modal_visible = false
    },
    edit() {
      this.modal_visible = true
    },
    async remove() {
      const confirmed = confirm(`Are you sure you want to delete this period?`)
      if (confirmed) {
        await this.$period.destroy()
        this.fetch()
      }
    }
  },
  components: {
    periodModal
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
.actions {
  margin-top: 20px;
}
</style>