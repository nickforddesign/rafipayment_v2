<template>
  <div class="grid__col grid__col--1-of-2">
    <dl>
      <dt>Start Date</dt>
      <dd>{{ lease.periods[active_period].start_date | moment('M/D/YY', true) }}</dd>
    </dl>
    <dl>
      <dt>Total Rent</dt>
      <dd>{{ lease.periods[active_period].amount | currency }}</dd>
    </dl>
    <dl class="coverage" @click="toggleDetails">
      <dt>
        <div class="arrow" :class="details && 'active'" />
        Coverage
      </dt>
      <dd>{{ lease.split_coverage[active_period] }}</dd>
    </dl>

    <div v-if="details">
      <dl v-for="(tenant, index) in lease.tenants" :key="index">
        <dt>
          <tenant :data="tenant" />
        </dt>
        <dd>{{ getSplit(tenant) | currency }}</dd>
      </dl>
    </div>

    <div class="period-actions">
      <button class="x-small" @click="showModal('period')">Edit</button>
      <button class="x-small danger" @click="promptRemove" v-if="lease.periods.length > 1">Delete</button>
    </div>

    <period-modal v-if="modal_visible" :basePath="base_path" @close="closeModal" :confirm="fetch" :model="$period" :lease="lease" />

  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { path } from 'ramda'
import moment from 'moment'

import app from '@/app'

import Period from '@/models/lease/period'
import PeriodModal from '@/components/modals/lease/period'
import Tenant from './tenant'

export default {
  name: 'period-view',
  props: {
    lease: Object,
    active_period: Number
  },
  data() {
    return {
      details: false,
      modal_visible: false
    }
  },
  models: {
    period() {
      return new Period(this.lease.periods[this.active_period], {
        basePath: this.base_path
      })
    }
  },
  watch: {
    active_period() {
      this.$period = this.lease.periods[this.active_period]
    }
  },
  computed: {
    base_path() {
      return `${this.lease.url}/periods`
    }
  },
  methods: {
    fetch() {
      this.$emit('fetch')
    },
    getSplit(tenant) {
      return path(['amount'], tenant.periods[this.active_period])
    },
    toggleDetails() {
      this.details = !this.details
    },
    showModal() {
      this.modal_visible = true
    },
    closeModal() {
      this.modal_visible = false
    },
    promptRemove() {
      app.confirm(
        `Are you sure you want to remove ${moment.utc(this.$period.start_date).format('M/D/YY')}?`,
        this.remove,
        'Remove Period',
        ['OK', 'Cancel'],
        'danger'
      )
    },
    async remove() {
      await this.$period.destroy()
      this.fetch()
    }
  },
  components: {
    Tenant,
    PeriodModal
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
@import '~%/colors';

.coverage {
  user-select: none;

  &:hover {
    cursor: pointer;
  }
}
.period-actions {
  margin-top: 20px;
}
.arrow {
  display: inline-block;
  width: 12px;

  &:after {
    content: '';
    display: inline-block;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 5px 0 5px 6px;
    border-color: transparent transparent transparent $color-text-light;
  }

  &.active {
    &:after {
      border-width: 6px 5px 0 5px;
      border-color: $color-text-light transparent transparent transparent;
    }
  }
}
</style>
