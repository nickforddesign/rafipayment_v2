<template>
  <div>
    <collection name="admins" :$collection="$collection">
      <div slot="actions">
        <button @click="add" class="primary">Add Admin</button>
      </div>

      <responsive-table slot="content" :columns="[
        {
          name: 'Name',
          sort: 'first_name'
        },
        'Email',
        'Created'
      ]">
        <row v-for="(model, index) in collection" :key="index" :model="model" />
      </responsive-table>
      
    </collection>

    <user-modal role="admin" v-if="modal_visible" @close="closeModal" :confirm="confirmModal" />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { Collection } from 'vue-collections'
import row from './row'
import User from '@/models/user'

import userModal from '@/components/modals/user'

export default {
  name: 'admins',
  data() {
    return {
      modal_visible: false
    }
  },
  collection() {
    return new Collection({
      basePath: 'admins',
      model: User
    })
  },
  methods: {
    add() {
      this.modal_visible = true
    },
    closeModal() {
      this.modal_visible = false
    },
    confirmModal() {
      this.$collection.fetch()
    }
  },
  components: {
    row,
    userModal
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
