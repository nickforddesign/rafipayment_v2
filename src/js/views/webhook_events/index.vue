<template>
  <div class="collection-view">
    <header>
      <div class="meta">
        <h2>Webhook Events({{ collection.length }})</h2>
      </div>
      <div class="actions">
        <search />
      </div>
    </header>
    <table>
      <thead>
        <tr>
          <td>Created</td>
          <td>Topic</td>
        </tr>
      </thead>
      <tbody>
        <row v-for="(model, index) in collection" :key="index" :model="model" />
      </tbody>
    </table>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { Collection } from 'vue-collections'
import row from './row'

export default {
  name: 'admins',
  data() {
    return {
      modal_visible: false
    }
  },
  collection() {
    return new Collection({
      basePath: 'payment/events'
    })
  },
  created() {
    this.fetch()
  },
  methods: {
    fetch() {
      this.$collection.fetch()
    }
  },
  components: {
    row
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
