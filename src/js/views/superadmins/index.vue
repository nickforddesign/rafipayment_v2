<template>
  <div>
    <header>
      <div class="meta">
        <h2>Superadmins({{ collection.length }})</h2>
      </div>
      <div class="actions">
        <search />
        <button class="primary" @click="add">Add New Superadmin</button>
      </div>
    </header>
    <table>
      <thead>
        <tr>
          <td>Name</td>
          <td>Address</td>
          <td>Units</td>
        </tr>
      </thead>
      <tbody>
        <row v-for="(model, index) in collection" :key="index" :model="model" />
      </tbody>
    </table>
    <user-modal role="superadmin" v-if="modal_visible" @close="closeModal" :confirm="confirmModal" />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { Collection } from 'vue-collections'
import row from './row'
import User from '@/models/user'

import userModal from '@/components/modals/user'

export default {
  name: 'superadmins',
  data() {
    return {
      modal_visible: false
    }
  },
  collection() {
    return new Collection({
      basePath: 'superadmins',
      model: User
    })
  },
  created() {
    this.fetch()
  },
  methods: {
    fetch() {
      this.$collection.fetch()
    },
    add() {
      this.modal_visible = true
    },
    closeModal() {
      this.modal_visible = false
    },
    confirmModal() {
      console.log('huh')
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
