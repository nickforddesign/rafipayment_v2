<template>
  <div class="box period">
    <dl>
      <dt>Start Date</dt>
      <dd>
        <span v-if="is_current" class="flag small neutral">Current</span>
        {{ $period.start_date | moment('MM/DD/YYYY', true) }}
      </dd>
    </dl>
    <dl>
      <dt>Amount</dt>
      <dd>{{ $period.amount | currency }}</dd>
    </dl>
    <!-- <dl>
      <dt>Total Fees</dt>
      <dd>{{ $lease.totals_per_period[index] | currency }}</dd>
    </dl> -->
    <dl>
      <dt>Split Coverage</dt>
      <dd>{{ $lease.split_coverage[index] }}</dd>
    </dl>
    
    <div class="flex">
      <div class="actions">
        <button class="x-small" @click="edit">Edit</button>
        <button class="x-small" @click="remove" v-if="$lease.periods.length > 1">Remove</button>
      </div>
    </div>

    <period-modal v-if="modal_visible" :path="basePath" @close="closeModal" :confirm="fetch" :model="$period" :lease="$lease" />
    
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import Period from '@/models/lease/period'
import periodModal from '@/components/modals/lease/period'

export default {
  name: 'lease-period',
  props: ['model', 'basePath', 'index'],
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
  watch: {
    model(val) {
      this.$period = val
    }
  },
  computed: {
    $lease() {
      return this.$parent.$lease
    },
    is_current() {
      return this.index === this.$lease.current_period
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
.flag {
  margin-right: 8px;
  border-radius: 0;
}
.flex {
  display: flex;
  width: 100%;
  margin-top: 20px;
}
.actions {
  width: 20%;
  flex: 1 0 0;
}
// .is-current {
//   flex: 2 0 0;
//   text-align: right;
// }
</style>