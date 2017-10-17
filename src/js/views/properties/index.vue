<template>
  <div>
    <header>
      <div class="meta">
        <h2>Properties</h2>
      </div>
      <div class="actions">
        <search />
        <button class="primary" @click="add">Add New Property</button>
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
    <property-modal v-if="modal_visible" @close="closeModal" @confirm="confirmModal"></property-modal>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import data from './properties_collection'
import row from './row'

import propertyModal from '@/components/modals/property'

export default {
  name: 'properties',
  data() {
    return {
      modal_visible: false
    }
  },
  computed: {
    collection() {
      return data
    }
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
    }
  },
  components: {
    row,
    propertyModal
  }
  // created() {
  //   console.log(data)
  // }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
