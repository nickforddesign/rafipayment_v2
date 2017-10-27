<template>
  <div class="table collection-view">
    <div class="header">
      Admins
    </div>
    <div v-if="fetched">
      <div v-if="collection.length">
        <table>
          <thead>
            <tr>
              <td>Name</td>
              <td>Address</td>
              <td>Created</td>
            </tr>
          </thead>
          <tbody>
            <row v-for="(model, index) in collection" :key="index" :model="model" />
          </tbody>
        </table>
      </div>
      <empty v-else>
        <div slot="message">This {{ $parent.$options.name }} doesn't have any admins yet</div>
        <button class="primary" slot="actions" @click="showModal">Add Admin</button>
      </empty>
    </div>
    <loading v-else type="table" />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { Collection } from 'vue-collections'
import row from './row'

export default {
  name: 'admins-table',
  props: {
    path: String
  },
  data() {
    return {
      fetched: false,
      modal_visible: false
    }
  },
  collection() {
    return new Collection({
      basePath: this.path
      // basePath: `units?filter_property=${this.data.id}`
    })
  },
  async created() {
    await this.$collection.fetch()
    this.fetched = true
  },
  methods: {
    showModal() {
      this.modal_visible = true
    }
  },
  computed: {
    collection() {
      return this.data
    }
  },
  components: {
    row
  }
}
</script>
