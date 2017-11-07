<template>
  <tr>
    <td>{{ $charge.type | capitalize}}</td>
    <td>{{ $charge.description | limit }}</td>
    <td class="text-right">{{ $charge.amount | currency }}</td>
    <!-- <td>
      <button class="x-small" @click="edit">Edit</button>
      <button class="x-small" @click="remove">Delete</button>
    </td> -->
  </tr>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import moment from 'moment'
import { prettyCurrency } from '@/utils'
import Charge from '@/models/lease/charge'

// import chargeModal from '@/components/modals/lease/charge'

export default {
  name: 'row',
  props: ['model', 'basePath'],
  data() {
    return {
      modal_visible: false
    }
  },
  models: {
    charge() {
      return new Charge(this.model, {
        basePath: this.basePath,
        persist: true
      })
    }
  },
  computed: {
    date() {
      return this.$charge.date
        ? moment.utc(this.$charge.date).format('M/DD/YYYY')
        : '–'
    }
  },
  methods: {
    edit() {
      this.modal_visible = true
    },
    closeModal() {
      this.modal_visible = false
    },
    async remove() {
      const confirmed = confirm(`Are you sure you want to delete the ${this.$charge.type} charge of ${prettyCurrency(this.$charge.amount)}?`)
      if (confirmed) {
        await this.$charge.destroy()
        this.$parent.fetch()
      }
    }
  }
  // components: {
  //   chargeModal
  // }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
