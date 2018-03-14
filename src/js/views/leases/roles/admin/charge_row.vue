<template>
  <div class="tr">
    <cell>{{ $charge.type | capitalize |  replace }}</cell>
    <cell>{{ date }}</cell>
    <cell>{{ $charge.description | limit }}</cell>
    <cell>
      <!-- <avatar v-if="model.tenant" :initials="model.tenant.first_name[0]" :color="model.tenant.avatar_color" /> -->
      <tenant-avatar v-if="model.tenant" :data="model.tenant" />
      <span v-else>All</span>
    </cell>
    <cell>{{ $charge.amount | currency }}</cell>
    <cell class="text-right">
      <button class="x-small" @click="edit">Edit</button>
      <button class="x-small danger" @click="promptRemove">Delete</button>

      <charge-modal
        v-if="modal_visible"
        @close="closeModal"
        :model="$charge"
        :basePath="basePath" />
    </cell>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import moment from 'moment'
import app from '@/app'
import { prettyCurrency } from '@/utils'
import Charge from '@/models/lease/charge'

import ChargeModal from '@/components/modals/lease/charge'
// import Avatar from '@/components/cards/avatar'

import TenantAvatar from './tenant_avatar'

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
    promptRemove() {
      app.confirm(
        `Are you sure you want to delete the ${this.$charge.type} charge of ${prettyCurrency(this.$charge.amount)}?`,
        this.remove,
        'Remove charge'
      )
    },
    async remove() {
      await this.$charge.destroy()
      this.$emit('destroy')
    },
    confirm() {
      console.log('confirmed')
    }
  },
  components: {
    TenantAvatar,
    ChargeModal
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
// @import '~%/colors';

// .avatar {
//   width: 16px;
//   color: $color-text-light;

//   &:hover {
//     cursor: pointer;
//   }
// }
</style>
