<template>
  <div>
    <header>
      <div class="meta">
        <h2>Companies</h2>
      </div>
      <div class="actions">
        <search />
        <button class="primary" @click="add">Add New Company</button>
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
    <company-modal v-if="modal_visible" @close="closeModal" :confirm="confirmModal" />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { Collection } from 'vue-collections'
import row from './row'

import Company from '@/models/company'
import companyModal from '@/components/modals/company'

export default {
  name: 'companies',
  data() {
    return {
      modal_visible: false
    }
  },
  collection() {
    return new Collection({
      basePath: 'companies',
      model: Company
    })
  },
  created() {
    this.$collection.fetch()
  },
  methods: {
    add() {
      console.log('add')
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
    companyModal
  }
  // created() {
  //   console.log(data)
  // }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
